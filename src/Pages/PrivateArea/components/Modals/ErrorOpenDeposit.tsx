import React, { FC } from 'react';
import { Button } from '../../../../components/Button/V2/Button';
import { Modal } from '../../../../components/ModalAnimated';
import { Balance } from '../../../../types/balance';
import { CollectionListDeposits } from '../../../../types/deposits';
import * as S from './S.el';

type Props = {
  onClose: () => void;
  open: boolean;
  deposit?: CollectionListDeposits;
  sumValue: string;
};

export const ErrorOpenDeposit: FC<Props> = ({ onClose, open, deposit, sumValue }: Props) => {
  return (
    <>
      {open && (
        <Modal onClose={onClose} open={open}>
          <S.Container>
            <S.Title>Ошибка открытия депозита</S.Title>
            <S.TextWrap>
              <S.Text>
                Депозит по программе <a href="/">{deposit?.name}</a> {' '}
                {`на сумму ${sumValue} ${Balance[deposit?.asset as number]} не был открыт
                по причине:`}
              </S.Text>
            </S.TextWrap>

            <S.TextWrap big>
              <S.Text red>На балансе аккаунта недостаточно средств</S.Text>
            </S.TextWrap>
            <S.Buttons>
              <Button bigSize primary onClick={onClose}>
                Пополнить баланс
              </Button>
              <Button bigSize outlinePrimary onClick={onClose}>
                Отмена
              </Button>
            </S.Buttons>
          </S.Container>
        </Modal>
      )}
    </>
  );
};
