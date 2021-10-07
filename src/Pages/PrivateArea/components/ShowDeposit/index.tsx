import moment from 'moment';
import React, { FC } from 'react';
import { Button } from '../../../../components/Button/V2/Button';
import { BalanceKind } from '../../../../enums/balanceKind';
import {
  ChipWrap,
  LeftSide,
  Name,
  ProgramDesc,
  ProgramDescTitle,
  RightSide,
  TextValue,
  TitleWrap,
} from '../ui';
import { Chip } from '../ui/Chip';
import * as S from './S.el';

export const ShowDeposit: FC<{ chosenDepositView: any }> = ({ chosenDepositView }) => {
  const { deposit } = chosenDepositView;

  return (
    <S.Container>
      <LeftSide bg="#EFECFF">
        <Name>{deposit?.name}</Name>
        <ChipWrap small>
          <Chip>{deposit?.isActive ? 'Активный депозит' : 'С отложенной выплатой'}</Chip>
        </ChipWrap>
        <TitleWrap small>
          <ProgramDescTitle>Сумма депозита:</ProgramDescTitle>
        </TitleWrap>
        <TitleWrap big>
          <Name>
            {chosenDepositView?.amount?.toString().replace(/(\d)(?=(\d{3})+$)/g, '$1 ')} GLOBAL
          </Name>
        </TitleWrap>
        <ProgramDescTitle>Описание и условия депозита:</ProgramDescTitle>
        <ChipWrap>
          <ProgramDesc>{deposit?.description}</ProgramDesc>
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
              <TextValue>{moment(chosenDepositView?.creationDate).format('DD.MM.YYYY')}</TextValue>
            </S.BlockItem>
            <S.BlockItem>
              <TitleWrap small>
                <ProgramDescTitle>Дата закрытия депозита:</ProgramDescTitle>
              </TitleWrap>
              <TextValue>{moment(chosenDepositView?.endDate).format('DD.MM.YYYY')}</TextValue>
            </S.BlockItem>
          </S.Block>
          <S.Block>
            <S.BlockItem>
              <TitleWrap small>
                <ProgramDescTitle>Всего выплачено:</ProgramDescTitle>
              </TitleWrap>
              {console.log(BalanceKind[deposit?.depositKind])}
              <TextValue>
                {chosenDepositView?.payedAmountView} {BalanceKind[deposit?.depositKind]}
              </TextValue>
            </S.BlockItem>
          </S.Block>

          <S.Block>
            <S.BlockItem>
              <TitleWrap small>
                <ProgramDescTitle>Дата ближайшей выплаты:</ProgramDescTitle>
              </TitleWrap>
              <TextValue>
                {moment(chosenDepositView?.paymentDate).format('DD.MM.YYYY')}
                {`(через ${moment
                  .duration(
                    moment(
                      moment(chosenDepositView?.paymentDate).format('YYYY-MM-DD'),
                      'YYYY-MM-DD'
                    ).diff(moment().startOf('day'))
                  )
                  .asDays()} дней)`}
              </TextValue>
            </S.BlockItem>
            <S.BlockItem>
              <TitleWrap small>
                <ProgramDescTitle>Сумма ближайшей выплаты:</ProgramDescTitle>
              </TitleWrap>
              <TextValue>
                {chosenDepositView?.payAmountView} {BalanceKind[deposit?.depositKind]}
              </TextValue>
            </S.BlockItem>
          </S.Block>
        </S.Blocks>
      </RightSide>
    </S.Container>
  );
};
