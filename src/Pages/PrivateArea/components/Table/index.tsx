import React from 'react';
import * as S from './S.el';
import { Collection } from '../../../../types/info';
import moment from 'moment';
import { Balance } from '../../../../types/balance';

interface TableProps {
  depositsList: Collection[];
};

export const Table = ({
  depositsList
}: TableProps) => {
  
  return (
    <S.Wrapper>
      {/* <thead>
        <tr>
          <th>Программа депозита</th>
          <th>Сумма депозита</th>
          <th>Дата ближайшей выплаты</th>
          <th>Сумма ближайшей выплаты</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Vanila</td>
          <td>5 000 000 CWD</td>
          <td>02.10.2011</td>
          <td>200 000 CWD</td>
        </tr>
      </tbody> */}

      <S.Table>
        <S.Header>
          <S.Cell>Программа депозита </S.Cell>
          <S.Cell>Сумма депозита</S.Cell>
          <S.Cell>Дата ближайшей выплаты</S.Cell>
          <S.Cell>Сумма ближайшей выплаты</S.Cell>
        </S.Header>

          {
            depositsList.length > 0 &&
            depositsList.map((deposit, i) => (
              <S.Row key={`${deposit.safeId}-${i}`}>
                <S.Cell>
                  {deposit.deposit.name}
                  <br /> 
                  <span>
                    {`${moment(new Date(deposit.creationDate)).format('DD.MM.YYYY')} - ${moment(new Date(deposit.endDate)).format('DD.MM.YYYY')}`}
                  </span>
                </S.Cell>
                <S.Cell>{`${deposit.amountView} ${Balance[deposit.deposit.asset]}`}</S.Cell>
                <S.Cell>{deposit.paymentDate ? moment(deposit.paymentDate).format('DD.MM.YYYY') : '-'}</S.Cell>
                <S.Cell> 
                  {
                    deposit.paymentAmountView
                    ? deposit.paymentAmountView.toString().length > 15
                      ? `${deposit.paymentAmountView.toLocaleString('ru-RU', {
                          maximumFractionDigits: 7,
                        })} ${Balance[deposit.deposit.asset]}`
                      : `${deposit.paymentAmountView} ${Balance[deposit.deposit.asset]}`
                    : '-'
                  }
                </S.Cell>
              </S.Row>
            ))
          }
      </S.Table>
    </S.Wrapper>
  );
};
