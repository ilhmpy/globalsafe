import React, { FC } from 'react';
import { Button } from '../../../../components/Button/V2/Button';
import { Modal } from '../../../../components/ModalAnimated';
import * as S from './S.el';

type Props = {
  onClose: () => void;
  open: boolean;
};

export const SuccessOpenDeposit: FC<Props> = ({ onClose, open }: Props) => {
  return (
    <>
      {open && (
        <Modal onClose={onClose} open={open}>
          <S.Container>
            <S.Title>Успешное открытие депозита</S.Title>
            <S.TextWrap big>
              <S.Text>
                Депозит по программе <a href="/">Vanila</a> на сумму <br />
                90 000 GSFUTURE6 успешно открыт.
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
