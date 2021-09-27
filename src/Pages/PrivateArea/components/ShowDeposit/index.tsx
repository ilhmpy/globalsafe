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
  TextValue,
} from '../ui';

export const ShowDeposit: FC = () => {
  return (
    <S.Container>
      <LeftSide bg="#EFECFF">
        <Name>Vanila</Name>
        <ChipWrap small>
          <Chip>Активный депозит</Chip>
        </ChipWrap>
        <TitleWrap small>
          <ProgramDescTitle>Сумма депозита:</ProgramDescTitle>
        </TitleWrap>
        <TitleWrap big>
          <Name>70 000 GLOBAL</Name>
        </TitleWrap>
        <ProgramDescTitle>Описание и условия депозита:</ProgramDescTitle>
        <ChipWrap>
          <ProgramDesc>4 мес 70/30 депозит заморожен. Выплата процентов 1 раз в месяц</ProgramDesc>
        </ChipWrap>
        <Button bigSize primary>
          Закрыть депозит
        </Button>
      </LeftSide>
      <RightSide>
        <S.Blocks>
          <S.Block>
            <S.BlockItem>
              <TitleWrap small>
                <ProgramDescTitle>Дата открытия депозита:</ProgramDescTitle>
              </TitleWrap>
              <TextValue>15.09.2021</TextValue>
            </S.BlockItem>
            <S.BlockItem>
              <TitleWrap small>
                <ProgramDescTitle>Дата закрытия депозита:</ProgramDescTitle>
              </TitleWrap>
              <TextValue>15.01.2022</TextValue>
            </S.BlockItem>
          </S.Block>
          <S.Block>
            <S.BlockItem>
              <TitleWrap small>
                <ProgramDescTitle>Всего выплачено:</ProgramDescTitle>
              </TitleWrap>
              <TextValue>30 000 CWD</TextValue>
            </S.BlockItem>
          </S.Block>

          <S.Block>
            <S.BlockItem>
              <TitleWrap small>
                <ProgramDescTitle>Дата ближайшей выплаты:</ProgramDescTitle>
              </TitleWrap>
              <TextValue>15.10.2011 (через 9 дней)</TextValue>
            </S.BlockItem>
            <S.BlockItem>
              <TitleWrap small>
                <ProgramDescTitle>Сумма ближайшей выплаты:</ProgramDescTitle>
              </TitleWrap>
              <TextValue>63 840 CWD</TextValue>
            </S.BlockItem>
          </S.Block>
        </S.Blocks>
      </RightSide>
    </S.Container>
  );
};
