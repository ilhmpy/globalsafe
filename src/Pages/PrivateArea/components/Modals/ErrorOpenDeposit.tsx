import React, { FC } from 'react';
import { Button } from '../../../../components/Button/V2/Button';
import { Modal } from '../../../../components/ModalAnimated';
import * as S from './S.el';

type Props = {
  onClose: () => void;
  open: boolean;
};

export const ErrorOpenDeposit: FC<Props> = ({ onClose, open }: Props) => {
  return (
    <>
      {open && (
        <Modal onClose={onClose} open={open}>
          <S.Container>
            <S.Title>Подтверждение открытия депозита</S.Title>
            <S.TextWrap>
              <S.Text>
                Депозит по программе <a href="/">Vanila</a> на сумму 90 000 GSFUTURE6 не был открыт
                по причине:
              </S.Text>
            </S.TextWrap>

            <S.TextWrap big>
              <S.Text red>На балансе аккаунта недостаточно средств</S.Text>
            </S.TextWrap>
            <S.Buttons>
              <Button bigSize primary>
                Пополнить баланс
              </Button>
              <Button bigSize outlinePrimary>
                Отмена
              </Button>
            </S.Buttons>
          </S.Container>
        </Modal>
      )}
    </>
  );
};
