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

export const SuccessOpenDeposit: FC<Props> = ({ onClose, open, deposit, sumValue }: Props) => {
  return (
    <>
      {open && (
        <Modal onClose={onClose} open={open}>
          <S.Container>
            <S.Title>Успешное открытие депозита</S.Title>
            <S.TextWrap big>
              <S.Text>
              {`Депозит по программе ${deposit?.name} на сумму`} <br />
                {`${sumValue} ${Balance[deposit?.asset as number]} успешно открыт`}.
              </S.Text>
            </S.TextWrap>

            <Button fullWidth bigSize primary onClick={onClose}>
              Мои депозиты
            </Button>
          </S.Container>
        </Modal>
      )}
    </>
  );
};
