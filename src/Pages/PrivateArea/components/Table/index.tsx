import moment from 'moment';
import React, { FC, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { routers } from '../../../../constantes/routers';
import { AppContext } from '../../../../context/HubContext';
import { Balance } from '../../../../types/balance';
import { Collection } from '../../../../types/info';
import * as S from './S.el';

interface TableProps {
  depositsList: Collection[];
}

export const Table: FC<TableProps> = ({ depositsList }: TableProps) => {
  const history = useHistory();
  const appContext = useContext(AppContext);
  const setChosenDepositView = appContext.setChosenDepositView;

  return (
    <S.Wrapper>
      <S.Table>
        <S.Header>
          <S.Cell>Программа депозита </S.Cell>
          <S.Cell>Сумма депозита</S.Cell>
          <S.Cell>Дата ближайшей выплаты</S.Cell>
          <S.Cell>Сумма ближайшей выплаты</S.Cell>
        </S.Header>

        {depositsList.length > 0 &&
          depositsList.map((deposit, i) => (
            <S.Row
              key={`${deposit.safeId}-${i}`}
              onClick={() => {
                setChosenDepositView(deposit);
                history.push(routers.depositsView);
              }}
            >
              <S.Cell>
                {deposit.deposit.name}
                <br />
                <span>
                  {`${moment(new Date(deposit.creationDate)).format('DD.MM.YYYY')} - ${moment(
                    new Date(deposit.endDate)
                  ).format('DD.MM.YYYY')}`}
                </span>
              </S.Cell>
              <S.Cell>{`${deposit.amountView} ${Balance[deposit.deposit.asset]}`}</S.Cell>
              <S.Cell>
                {deposit.paymentDate ? moment(deposit.paymentDate).format('DD.MM.YYYY') : '-'}
              </S.Cell>
              <S.Cell>
                {deposit.paymentAmountView
                  ? deposit.paymentAmountView.toString().length > 15
                    ? `${deposit.paymentAmountView.toLocaleString('ru-RU', {
                        maximumFractionDigits: 7,
                      })} ${Balance[deposit.deposit.asset]}`
                    : `${deposit.paymentAmountView} ${Balance[deposit.deposit.asset]}`
                  : '-'}
              </S.Cell>
            </S.Row>
          ))}
      </S.Table>
    </S.Wrapper>
  );
};
