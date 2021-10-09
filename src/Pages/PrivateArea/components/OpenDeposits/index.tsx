import { FC, useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { ReactComponent as Info } from '../../../../assets/svg/question14.svg';
import { Button } from '../../../../components/Button/V2/Button';
import { AppContext } from '../../../../context/HubContext';
import { CollectionListDeposits, ListDeposits } from '../../../../types/deposits';
import { Checkbox } from '../Checkbox';
import { Dropdown } from '../Dropdown';
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
}

export const OpenDeposit: FC<IProps> = ({ goBackClick }) => {
  const [depositProgramsList, setDepositProgramsList] = useState<CollectionListDeposits[]>([]);
  const [activeDeposite, setActiveDeposite] = useState<CollectionListDeposits>();
  const [selected, setSelected] = useState<string | null>(setActiveDeposite?.name);
  const [isAgree, setIsAgree] = useState<boolean>(false);
  const [sum, setSum] = useState('');
  const history = useHistory();

  const { hubConnection } = useContext(AppContext);

  const setSelectedOption = (str: string) => {
    setActiveDeposite(depositProgramsList.find((it) => it.name === str));
  };

  const pathnameArray = window.location.pathname.split('/');

  const getPrograms = () => {
    if (hubConnection) {
      hubConnection
        .invoke<ListDeposits>('GetDeposits', 1, true, 0, 100)
        .then((res) => {
          if (res.collection.length) {
            setDepositProgramsList(res.collection);
            setActiveDeposite(
              res.collection.find((it) => it.id === +pathnameArray[pathnameArray.length - 1])
            );
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

  console.log(depositProgramsList);
  console.log(activeDeposite);

  const openDepost = () => {
    if (
      hubConnection &&
      isAgree &&
      activeDeposite &&
      +sum >= activeDeposite?.minAmount &&
      +sum <=
        (activeDeposite?.maxAmount ? activeDeposite?.maxAmount : activeDeposite?.minAmount * 10)
    ) {
      console.log('CreateUserDeposit', +sum, activeDeposite?.safeId);
      hubConnection
        .invoke<any>('CreateUserDeposit', +sum * 100000, activeDeposite?.safeId)
        .then((res) => {
          goBackClick();
          console.log('.then ~ res', res);
        })
        .catch((err: Error) => {
          console.log(err);
        });
    }
  };

  return (
    <S.Container>
      <LeftSide>
        <Name>{activeDeposite?.name}</Name>
        <ChipWrap>
          <Chip>Новый депозит</Chip>
        </ChipWrap>
        <ProgramDescTitle>Описание программы:</ProgramDescTitle>
        <ProgramDesc>{activeDeposite?.description}</ProgramDesc>
      </LeftSide>
      <RightSide>
        <TitleWrap>
          <ProgramDescTitle>Программа депозита:</ProgramDescTitle>
        </TitleWrap>
        <S.DropdownWrapper>
          <Dropdown
            options={depositProgramsList
              .filter((it) => it.name !== activeDeposite?.name)
              .map((it) => it.name)}
            setSelectedOption={setSelectedOption}
            selectedOption={activeDeposite ? activeDeposite?.name : ''}
          />
        </S.DropdownWrapper>
        <S.BlockWrapper>
          <TitleWrap small>
            <ProgramDescTitle>Валюта депозита:</ProgramDescTitle>
          </TitleWrap>
          <S.TextValue>GSFUTURE6</S.TextValue>
        </S.BlockWrapper>

        <S.BlockWrapper>
          <TitleWrap small>
            <ProgramDescTitle>
              Отложенная выплата: <Info />
            </ProgramDescTitle>
          </TitleWrap>
          <S.TextValue>{activeDeposite?.isInstant ? 'Да' : 'Нет'}</S.TextValue>
        </S.BlockWrapper>

        <S.BlockWrapper>
          <TitleWrap small>
            <ProgramDescTitle>
              Замороженый депозит: <Info />
            </ProgramDescTitle>
          </TitleWrap>
          <S.TextValue>{activeDeposite?.isActive ? 'Да' : 'Нет'}</S.TextValue>
        </S.BlockWrapper>

        <S.BlockWrapper>
          <TitleWrap small>
            <ProgramDescTitle>Выплата процентов:</ProgramDescTitle>
          </TitleWrap>
          <S.TextValue>{`1 раз в ${activeDeposite?.paymentInterval} дней`}</S.TextValue>
        </S.BlockWrapper>
        <TitleWrap>
          <ProgramDescTitle>{`Сумма депозита (min ${activeDeposite?.minAmount
            .toString()
            .replace(/(\d)(?=(\d{3})+$)/g, '$1 ')} - max ${
            activeDeposite?.maxAmount
              ? activeDeposite?.maxAmount.toString().replace(/(\d)(?=(\d{3})+$)/g, '$1 ')
              : activeDeposite?.minAmount &&
                (activeDeposite?.minAmount * 10).toString().replace(/(\d)(?=(\d{3})+$)/g, '$1 ')
          }):`}</ProgramDescTitle>
        </TitleWrap>
        <S.FieldContainer>
          <Field
            placeholder="Введите сумму"
            value={sum.toString().replace(/(\d)(?=(\d{3})+$)/g, '$1 ')}
            onChange={(e) => setSum(e.target.value)}
          />
        </S.FieldContainer>
        <S.BlockWrapper>
          <Checkbox checked={isAgree} onChange={() => setIsAgree(!isAgree)}>
            <S.Agree>
              Соглашаюсь с <a href="/">правилами</a> открытия депозитов
            </S.Agree>
          </Checkbox>
        </S.BlockWrapper>
        <Button bigSize primary onClick={openDepost}>
          Открыть депозит
        </Button>
      </RightSide>
    </S.Container>
  );
};
