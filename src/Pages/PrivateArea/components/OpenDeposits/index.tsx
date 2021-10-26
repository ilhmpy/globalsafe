import { FC, useContext, useEffect, useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { ReactComponent as Info } from '../../../../assets/svg/question14.svg';
import { Button } from '../../../../components/Button/V2/Button';
import { AppContext } from '../../../../context/HubContext';
import useOnClickOutside from '../../../../hooks/useOutsideHook';
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
          console.log('.then ~ res', res);
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

  const [delayed, setDelayed] = useState<boolean>(false);
  const [freezed, setFreezed] = useState<boolean>(false);
  const ref = useRef(null);
  const handleClickOutside = () => {
    setFreezed(false);
    setDelayed(false);
  };

  useOnClickOutside(ref, handleClickOutside);

  const showInfo = (index: number) => {
    if (index === 1) {
      setDelayed(!delayed);
      setFreezed(false);
    } else {
      setFreezed(!freezed);
      setDelayed(false);
    }
  };

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
        <ProgramDesc>
          <div dangerouslySetInnerHTML={{ __html: activeDeposit?.description as string }} />
        </ProgramDesc>
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
              Отложенная выплата: <QuestionIcon ref={ref} onClick={() => showInfo(1)} />
              <QuestionInfo show={delayed}>Пояснение, что такое замороженный депозит</QuestionInfo>
            </ProgramDescTitle>
          </TitleWrap>
          <S.TextValue>{activeDeposit?.isInstant ? 'Да' : 'Нет'}</S.TextValue>
        </S.BlockWrapper>

        <S.BlockWrapper>
          <TitleWrap small>
            <ProgramDescTitle>
              Замороженый депозит: <QuestionIcon ref={ref} onClick={() => showInfo(2)} />
              <QuestionInfo ref={ref} show={freezed}>
                Пояснение, что такое замороженный депозит
              </QuestionInfo>
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

const QuestionIcon = styled(Info)`
  cursor: pointer;
  position: relative;
`;

const QuestionInfo = styled.div<{ show?: boolean }>`
  position: absolute;
  top: -84px;
  right: -81px;
  display: ${(props) => (props.show ? 'block' : 'none')};
  width: 177px;
  height: 87px;
  padding: 20px;
  font-weight: normal;
  font-size: 12px;
  line-height: 20px;

  background-image: url("data:image/svg+xml,%3Csvg width='221' height='131' viewBox='0 0 221 99' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cg filter='url(%23filter0_d)'%3E%3Cmask id='path-1-inside-1' fill='white'%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M26 6C23.7909 6 22 7.79086 22 10V82C22 84.2091 23.7909 86 26 86H100.779C102.558 86 103.943 87.6417 105.201 88.8995L108.101 91.799C109.702 93.4003 112.298 93.4003 113.899 91.799L116.799 88.8995C118.057 87.6417 119.442 86 121.221 86H195C197.209 86 199 84.2091 199 82V10C199 7.79086 197.209 6 195 6H26Z'/%3E%3C/mask%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M26 6C23.7909 6 22 7.79086 22 10V82C22 84.2091 23.7909 86 26 86H100.779C102.558 86 103.943 87.6417 105.201 88.8995L108.101 91.799C109.702 93.4003 112.298 93.4003 113.899 91.799L116.799 88.8995C118.057 87.6417 119.442 86 121.221 86H195C197.209 86 199 84.2091 199 82V10C199 7.79086 197.209 6 195 6H26Z' fill='white'/%3E%3Cpath d='M23 10C23 8.34315 24.3431 7 26 7V5C23.2386 5 21 7.23858 21 10H23ZM23 82V10H21V82H23ZM26 85C24.3431 85 23 83.6569 23 82H21C21 84.7614 23.2386 87 26 87V85ZM100.779 85H26V87H100.779V85ZM108.808 91.0919L105.908 88.1924L104.494 89.6066L107.393 92.5061L108.808 91.0919ZM113.192 91.0919C111.982 92.3027 110.018 92.3027 108.808 91.0919L107.393 92.5061C109.385 94.498 112.615 94.498 114.607 92.5061L113.192 91.0919ZM116.092 88.1924L113.192 91.0919L114.607 92.5061L117.506 89.6066L116.092 88.1924ZM195 85H121.221V87H195V85ZM198 82C198 83.6569 196.657 85 195 85V87C197.761 87 200 84.7614 200 82H198ZM198 10V82H200V10H198ZM195 7C196.657 7 198 8.34315 198 10H200C200 7.23858 197.761 5 195 5V7ZM26 7H195V5H26V7ZM117.506 89.6066C118.182 88.9306 118.768 88.2836 119.431 87.7658C120.077 87.2605 120.652 87 121.221 87V85C120.011 85 119.004 85.5603 118.199 86.1903C117.409 86.8078 116.674 87.6105 116.092 88.1924L117.506 89.6066ZM100.779 87C101.348 87 101.923 87.2605 102.569 87.7658C103.232 88.2836 103.818 88.9306 104.494 89.6066L105.908 88.1924C105.326 87.6105 104.591 86.8078 103.801 86.1903C102.996 85.5603 101.989 85 100.779 85V87Z' fill='%23DCDCE8' mask='url(%23path-1-inside-1)'/%3E%3C/g%3E%3Cdefs%3E%3Cfilter id='filter0_d' x='0' y='0' width='221' height='131' filterUnits='userSpaceOnUse' color-interpolation-filters='sRGB'%3E%3CfeFlood flood-opacity='0' result='BackgroundImageFix'/%3E%3CfeColorMatrix in='SourceAlpha' type='matrix' values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0' result='hardAlpha'/%3E%3CfeMorphology radius='8' operator='erode' in='SourceAlpha' result='effect1_dropShadow'/%3E%3CfeOffset dy='16'/%3E%3CfeGaussianBlur stdDeviation='15'/%3E%3CfeComposite in2='hardAlpha' operator='out'/%3E%3CfeColorMatrix type='matrix' values='0 0 0 0 0.862745 0 0 0 0 0.862745 0 0 0 0 0.909804 0 0 0 0.5 0'/%3E%3CfeBlend mode='normal' in2='BackgroundImageFix' result='effect1_dropShadow'/%3E%3CfeBlend mode='normal' in='SourceGraphic' in2='effect1_dropShadow' result='shape'/%3E%3C/filter%3E%3C/defs%3E%3C/svg%3E%0A");

  background-repeat: no-repeat;
  background-position: center;

  color: #3f3e4e;
`;
