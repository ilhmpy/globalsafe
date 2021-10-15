import React, { FC } from 'react';
import { Button } from '../../../../components/Button/V2/Button';
import { Modal } from '../../../../components/ModalAnimated';
import { BalanceKind } from '../../../../enums/balanceKind';
import { IBalanceExchange } from '../../ConvertingModal';
import * as S from './S.el';

type Props = {
  onClose: () => void;
  open: boolean;
  deposit: any;
  calculated?: IBalanceExchange;
};

export const CloseDepositSuccess: FC<Props> = ({ onClose, open, deposit, calculated }: Props) => {
  return (
    <>
      {open && (
        <Modal onClose={onClose} open={open}>
          <S.Container>
            <S.Title>Депозит успешно закрыт</S.Title>
            <S.TextWrap>
              <S.Text>
                Ваш депозит досрочно закрыт. Тело депозита и оставшиеся проценты были
                сконвертированы в токен MSC и зачислены на баланс личного кабинета.
              </S.Text>
            </S.TextWrap>
            <S.List>
              <S.ListItem>
                <S.Text>
                  Программа депозита: <strong>{deposit.name}</strong>
                </S.Text>
              </S.ListItem>
              <S.ListItem>
                <S.Text>
                  Тело депозита:{' '}
                  <strong>
                    {deposit?.payedAmountView} {BalanceKind[deposit?.depositKind]}
                  </strong>
                </S.Text>
              </S.ListItem>
              <S.ListItem>
                <S.Text>
                  Оставшиеся проценты: <strong>{deposit.paymentRatio} %</strong>
                </S.Text>
              </S.ListItem>
              <S.ListItem>
                <S.Text>
                  Курс конвертации:{' '}
                  <strong>
                    {calculated && calculated.calculatedAmount > 0
                      ? (
                          calculated.calculatedAmount /
                          calculated.targetAmount /
                          1000
                        ).toLocaleString('ru-RU', {
                          maximumFractionDigits: 2,
                        })
                      : 0}{' '}
                    MULTICS
                  </strong>
                </S.Text>
              </S.ListItem>
            </S.List>
            <S.List>
              <S.ListItem>
                <S.Text>
                  Зачислено:{' '}
                  <strong>
                    {calculated && calculated.targetAmount > 0
                      ? (calculated.targetAmount / 100)
                          .toString()
                          .replace(/(\d)(?=(\d{3})+$)/g, '$1 ')
                      : 0}{' '}
                    MULTICS
                  </strong>
                </S.Text>
              </S.ListItem>
            </S.List>
          </S.Container>
        </Modal>
      )}
    </>
  );
};
