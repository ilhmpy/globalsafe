import React from 'react';
import * as S from './S.el';

export const Table = () => {
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

        <S.Row>
          <S.Cell>
            Vanila
            <br /> <span>16.09.2021 - 16.09.2022</span>
          </S.Cell>
          <S.Cell>5 000 000 CWD</S.Cell>
          <S.Cell>02.10.2011</S.Cell>
          <S.Cell>200 000 CWD</S.Cell>
        </S.Row>

        <S.Row>
          <S.Cell>
            Vanila
            <br /> <span>16.09.2021 - 16.09.2022</span>
          </S.Cell>
          <S.Cell>5 000 000 CWD</S.Cell>
          <S.Cell>02.10.2011</S.Cell>
          <S.Cell>200 000 CWD</S.Cell>
        </S.Row>
      </S.Table>
    </S.Wrapper>
  );
};
