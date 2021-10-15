import { FC, useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { ReactComponent as Info } from '../../../../assets/svg/question14.svg';
import { Button } from '../../../../components/Button/V2/Button';
import { AppContext } from '../../../../context/HubContext';
import { Balance } from '../../../../types/balance';
import { CollectionListDeposits, ListDeposits } from '../../../../types/deposits';
import { Checkbox } from '../Checkbox';
import { Dropdown } from '../Dropdown';
import { ErrorOpenDeposit } from '../Modals/ErrorOpenDeposit';
import { SuccessOpenDeposit } from '../Modals/Success';
import {
  ChipWrap,
  LeftSide,
  Name,
  ProgramDesc,
  ProgramDescTitle,
  RightSide,
  TitleWrap,
} from '../ui';
import { Chip } from '../ui/Chip';
import { Field } from '../ui/Field';
import * as S from './S.el';

interface IProps {
  goBackClick: () => void;
  setIsConfirmOpenDeposit: (open: boolean) => void;
  setSumValue: (value: string) => void;

  isConfirm: boolean;
}

export const OpenDeposit: FC<IProps> = ({
  goBackClick,
  setIsConfirmOpenDeposit,
  isConfirm,
  setSumValue,
}) => {
  const [depositProgramsList, setDepositProgramsList] = useState<CollectionListDeposits[]>([]);
  const [activeDeposit, setActiveDeposit] = useState<CollectionListDeposits>();
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [isFailed, setIsFailed] = useState<boolean>(false);
  const [isAgree, setIsAgree] = useState<boolean>(false);
  const [sum, setSum] = useState('');
  const history = useHistory();

  const { hubConnection, setSelectedDeposit } = useContext(AppContext);

  const setSelectedOption = (str: string) => {
    const deposit = depositProgramsList.find((it) => it.name === str);
    setActiveDeposit(deposit);
    setSelectedDeposit(deposit as CollectionListDeposits);
  };

  const pathnameArray = window.location.pathname.split('/');

  const getPrograms = () => {
    if (hubConnection) {
      hubConnection
        .invoke<ListDeposits>('GetDeposits', 1, true, 0, 100)
        .then((res) => {
          if (res.collection.length) {
            setDepositProgramsList(res.collection);
            const found = res.collection.find(
              (it) => it.safeId === pathnameArray[pathnameArray.length - 1]
            );
            setActiveDeposit(found);
            setSelectedDeposit(found);
          }
        })
        .catch((err: Error) => {
          console.log(err);
        });
    }
  };

  useEffect(() => {
    getPrograms();
  }, []);

  const openDeposit = () => {
    if (hubConnection) {
      hubConnection
        .invoke<any>('CreateUserDeposit', +sum, activeDeposit?.safeId)
        .then((res) => {
          setIsSuccess(true);
        })
        .catch((err: Error) => {
          setIsFailed(true);
          console.log(err);
        });
    }
  };

  const checkPossibility = () =>
    isAgree &&
    activeDeposit &&
    +sum >= activeDeposit?.minAmount / 100000 &&
    +sum <=
      (activeDeposit?.maxAmount
        ? activeDeposit?.maxAmount / 100000
        : activeDeposit?.minAmount / 1000);

  const openConfirm = () => {
    checkPossibility() && setIsConfirmOpenDeposit(true);
  };

  useEffect(() => {
    isConfirm && openDeposit();
  }, [isConfirm]);

  return (
    <S.Container>
      <SuccessOpenDeposit
        onClose={() => {
          goBackClick();
          setIsSuccess(false);
        }}
        open={isSuccess}
        deposit={activeDeposit}
        sumValue={sum}
      />
      <ErrorOpenDeposit
        onClose={() => {
          goBackClick();
          setIsFailed(false);
        }}
        open={isFailed}
        deposit={activeDeposit}
        sumValue={sum}
      />
      <LeftSide>
        <Name>{activeDeposit?.name}</Name>
        <ChipWrap>
          <Chip>Новый депозит</Chip>
        </ChipWrap>
        <ProgramDescTitle>Описание программы:</ProgramDescTitle>
        <ProgramDesc>{activeDeposit?.description}</ProgramDesc>
      </LeftSide>
      <RightSide>
        <TitleWrap>
          <ProgramDescTitle>Программа депозита:</ProgramDescTitle>
        </TitleWrap>
        <S.DropdownWrapper>
          <Dropdown
            options={depositProgramsList
              .filter((it) => it.name !== activeDeposit?.name)
              .map((it) => it.name)}
            setSelectedOption={setSelectedOption}
            selectedOption={activeDeposit ? activeDeposit?.name : ''}
          />
        </S.DropdownWrapper>
        <S.BlockWrapper>
          <TitleWrap small>
            <ProgramDescTitle>Валюта депозита:</ProgramDescTitle>
          </TitleWrap>
          <S.TextValue>{Balance[activeDeposit?.asset as number]}</S.TextValue>
        </S.BlockWrapper>

        <S.BlockWrapper>
          <TitleWrap small>
            <ProgramDescTitle>
              Отложенная выплата: <Info />
            </ProgramDescTitle>
          </TitleWrap>
          <S.TextValue>{activeDeposit?.isInstant ? 'Да' : 'Нет'}</S.TextValue>
        </S.BlockWrapper>

        <S.BlockWrapper>
          <TitleWrap small>
            <ProgramDescTitle>
              Замороженый депозит: <Info />
            </ProgramDescTitle>
          </TitleWrap>
          <S.TextValue>{activeDeposit?.isActive ? 'Да' : 'Нет'}</S.TextValue>
        </S.BlockWrapper>

        <S.BlockWrapper>
          <TitleWrap small>
            <ProgramDescTitle>Выплата процентов:</ProgramDescTitle>
          </TitleWrap>
          <S.TextValue>{`1 раз в ${activeDeposit?.paymentInterval} дней`}</S.TextValue>
        </S.BlockWrapper>
        <TitleWrap>
          <ProgramDescTitle>{`Сумма депозита (min ${
            activeDeposit?.minAmount &&
            (activeDeposit?.minAmount / 100000).toString().replace(/(\d)(?=(\d{3})+$)/g, '$1 ')
          } - max ${
            activeDeposit?.maxAmount
              ? (activeDeposit?.maxAmount / 100000).toString().replace(/(\d)(?=(\d{3})+$)/g, '$1 ')
              : activeDeposit?.minAmount &&
                (activeDeposit?.minAmount / 1000).toString().replace(/(\d)(?=(\d{3})+$)/g, '$1 ')
          }):`}</ProgramDescTitle>
        </TitleWrap>
        <S.FieldContainer>
          <Field
            placeholder="Введите сумму"
            value={sum.toString().replace(/(\d)(?=(\d{3})+$)/g, '$1 ')}
            onChange={({ target: { value } }) => {
              const correctValue = value.replaceAll(/\D/g, '');
              setSum(correctValue);
              setSumValue(correctValue);
            }}
          />
        </S.FieldContainer>
        <S.BlockWrapper>
          <Checkbox checked={isAgree} onChange={() => setIsAgree(!isAgree)}>
            <S.Agree>
              Соглашаюсь с <a href="/">правилами</a> открытия депозитов
            </S.Agree>
          </Checkbox>
        </S.BlockWrapper>
        <Button bigSize primary onClick={openConfirm} disabled={!checkPossibility()}>
          Открыть депозит
        </Button>
      </RightSide>
    </S.Container>
  );
};
