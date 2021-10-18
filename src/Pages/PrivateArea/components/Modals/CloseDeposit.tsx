import React, { FC, useContext } from 'react';
import { Button } from '../../../../components/Button/V2/Button';
import { Modal } from '../../../../components/ModalAnimated';
import { AppContext } from '../../../../context/HubContext';
import { BalanceKind } from '../../../../enums/balanceKind';
import { Balance } from '../../../../types/balance';
import { IBalanceExchange } from '../../Converting/ConvertingModal';
import * as S from './S.el';

type Props = {
  onClose: (isAgreed: boolean) => void;
  open: boolean;
  deposit: any;
  calculated?: IBalanceExchange;
};

export const CloseDeposit: FC<Props> = ({ onClose, open, deposit, calculated }: Props) => {
console.log('deposit', deposit)
  const { hubConnection } = useContext(AppContext);

  const depositExchange = async (amountId: string, kind: number) => {
    console.log('DepositExchange', amountId, kind);
    if (hubConnection) {
      try {
        const res = await hubConnection.invoke('DepositExchange', amountId, kind);
        console.log('res', res);
        onClose(true);
        // history.push('/info/deposits');
      } catch (e) {
        console.log(e);
      }
    }
  };
  return (
    <>
      {open && (
        <Modal onClose={() => onClose(false)} open={open}>
          <S.Container>
            <S.Title>Закрытие депозита</S.Title>
            <S.TextWrap>
              <S.Text>
                В случае досрочного закрытия депозита - тело депозита и оставшиеся проценты будут
                сконвертированы в токен MULTICS:
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
            <S.TextWrap big>
              <S.List>
                <S.ListItem>
                  <S.Text>
                    К зачислению:{' '}
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
            </S.TextWrap>
            <S.Buttons>
              <Button
                bigSize
                primary
                onClick={() => {
                  depositExchange(deposit.safeId, Balance.MULTICS);
                }}
              >
                Закрыть депозит
              </Button>
              <Button bigSize outlinePrimary onClick={() => onClose(false)}>
                Отмена
              </Button>
            </S.Buttons>
          </S.Container>
        </Modal>
      )}
    </>
  );
};
