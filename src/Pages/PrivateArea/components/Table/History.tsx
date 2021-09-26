import React from 'react';
import * as S from './S.el';

export const TableHistory = () => {
  return (
    <S.Wrapper>
      <S.Table>
        <S.RowHeader>
          <S.Cell>Дата выплаты</S.Cell>
          <S.Cell>Сумма выплаты</S.Cell>
        </S.RowHeader>
        <S.RowHistory>
          <S.Cell>15.03.2022</S.Cell>
          <S.Cell>10 000 CWD</S.Cell>
        </S.RowHistory>
        <S.RowHistory>
          <S.Cell>15.03.2022</S.Cell>
          <S.Cell>10 000 CWD</S.Cell>
        </S.RowHistory>
      </S.Table>
    </S.Wrapper>
  );
};
