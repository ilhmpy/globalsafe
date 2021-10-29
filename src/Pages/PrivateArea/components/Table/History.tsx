import moment from 'moment';
import { FC } from 'react';
import { Balance } from '../../../../types/balance';
import { Collection } from '../../../../types/balanceHistory';
import * as S from './S.el';

interface IProps {
  accrualHistory: Collection[];
}

export const TableHistory: FC<IProps> = ({ accrualHistory }: IProps) => {
  return (
    <S.Wrapper>
      <S.Table>
        <S.RowHeader>
          <S.Cell>Дата выплаты</S.Cell>
          <S.Cell>Сумма выплаты</S.Cell>
        </S.RowHeader>

        {accrualHistory.length ? (
          accrualHistory.map((item) => (
            <S.RowHistory key={item.id}>
              <S.Cell>{moment(item.operationDate).format('DD.MM.YYYY')}</S.Cell>
              <S.Cell>
                {item.operationKind} {Balance[item.operationKind]}
              </S.Cell>
            </S.RowHistory>
          ))
        ) : (
          <S.RowHistory>
            <S.Cell>-</S.Cell>
            <S.Cell>-</S.Cell>
          </S.RowHistory>
        )}
      </S.Table>
    </S.Wrapper>
  );
};
