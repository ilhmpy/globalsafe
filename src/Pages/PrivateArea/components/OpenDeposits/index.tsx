import React, { FC, useState } from 'react';
import { Dropdown } from '../Dropdown';
import { Chip } from '../ui/Chip';
import { Field } from '../ui/Field';
import { ReactComponent as Info } from '../../../../assets/svg/question14.svg';
import * as S from './S.el';
import { Checkbox } from '../Checkbox';
import { Button } from '../../../../components/Button/V2/Button';
import {
  LeftSide,
  RightSide,
  Name,
  ProgramDescTitle,
  ChipWrap,
  ProgramDesc,
  TitleWrap,
} from '../ui';

export const OpenDeposit: FC = () => {
  const [select, setSelect] = useState<string | null>('Vanila');
  const selected = (str: string) => {
    setSelect(str);
  };
  return (
    <S.Container>
      <LeftSide>
        <Name>Vanila</Name>
        <ChipWrap>
          <Chip>Новый депозит</Chip>
        </ChipWrap>
        <ProgramDescTitle>Описание программы:</ProgramDescTitle>
        <ProgramDesc>4 мес 70/30 депозит заморожен. Выплата процентов 1 раз в месяц</ProgramDesc>
      </LeftSide>
      <RightSide>
        <TitleWrap>
          <ProgramDescTitle>Программа депозита:</ProgramDescTitle>
        </TitleWrap>
        <S.DropdownWrapper>
          <Dropdown options={['Vanila']} setSelectedOption={selected} selectedOption={select} />
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
          <S.TextValue>Нет</S.TextValue>
        </S.BlockWrapper>

        <S.BlockWrapper>
          <TitleWrap small>
            <ProgramDescTitle>
              Замороженый депозит: <Info />
            </ProgramDescTitle>
          </TitleWrap>
          <S.TextValue>Да</S.TextValue>
        </S.BlockWrapper>

        <S.BlockWrapper>
          <TitleWrap small>
            <ProgramDescTitle>Выплата процентов:</ProgramDescTitle>
          </TitleWrap>
          <S.TextValue>1 раз в месяц</S.TextValue>
        </S.BlockWrapper>
        <TitleWrap>
          <ProgramDescTitle>Сумма депозита (min 20 000 - max 1 000 000):</ProgramDescTitle>
        </TitleWrap>
        <S.FieldContainer>
          <Field placeholder="Введите сумму" />
        </S.FieldContainer>
        <S.BlockWrapper>
          <Checkbox>
            <S.Agree>
              Соглашаюсь с <a href="/">правилами</a> открытия депозитов
            </S.Agree>
          </Checkbox>
        </S.BlockWrapper>
        <Button bigSize primary>
          Открыть депозит
        </Button>
      </RightSide>
    </S.Container>
  );
};
