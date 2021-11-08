import { FC, useContext, useEffect, useState } from 'react';
import {
  TilesContainer,
  BottomValue,
  BottomTitle,
  BottomSide,
  TopSide,
  DateRange,
  BoxAmount,
  BoxTitle,
  BlockBox,
} from './styled';
import { Collection } from '../../../../types/info';
import { useHistory } from 'react-router-dom';
import { AppContext } from '../../../../context/HubContext';
import { routers } from '../../../../constantes/routers';
import { Balance } from '../../../../types/balance';
import moment from 'moment';
import { BalanceKind } from '../../../../enums/balanceKind';
import { Bar, ProgressBar } from '../../Deposits/S.elements';
import { getPercentage } from '../../Deposits/helpers';

interface IProps {
  depositsList: Collection[];
}

export const Tiles: FC<IProps> = ({ depositsList }: IProps) => {
  const history = useHistory();
  const { setChosenDepositView } = useContext(AppContext);

  return (
    <TilesContainer>
      {depositsList &&
        depositsList.map((deposit, i) => {
          return (
            <BlockBox
              key={`${deposit.safeId}-${i}`}
              onClick={() => {
                setChosenDepositView(deposit);
                history.push(routers.depositsView);
              }}
            >
              <TopSide>
                <BoxTitle>{deposit.deposit.name}</BoxTitle>
                <BoxAmount>{`${deposit.amountView} ${Balance[deposit.deposit.asset]}`}</BoxAmount>
                <DateRange>{`${moment(new Date(deposit.creationDate)).format(
                  'DD.MM.YYYY'
                )} - ${moment(new Date(deposit.endDate)).format('DD.MM.YYYY')}`}</DateRange>
                <ProgressBar>
                  <Bar percent={getPercentage(deposit.creationDate, deposit.endDate)} />
                </ProgressBar>
              </TopSide>
              <BottomSide>
                <div>
                  <BottomTitle>Ближайшая выплата:</BottomTitle>
                  <BottomValue>
                    {moment(deposit.paymentDate).format('DD.MM.YYYY')}
                    {`(через ${moment
                      .duration(
                        moment(moment(deposit.paymentDate).format('YYYY-MM-DD'), 'YYYY-MM-DD').diff(
                          moment().startOf('day')
                        )
                      )
                      .asDays()} дней)`}
                  </BottomValue>
                </div>
                <div>
                  <BottomTitle>Сумма ближайшей выплаты:</BottomTitle>
                  <BottomValue>
                    {deposit.paymentAmountView} {BalanceKind[deposit.deposit.asset]}
                  </BottomValue>
                </div>
              </BottomSide>
            </BlockBox>
          );
        })}
    </TilesContainer>
  );
};
