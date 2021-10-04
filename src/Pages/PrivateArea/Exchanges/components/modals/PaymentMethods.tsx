import React, { FC } from 'react';
import { Button } from '../../../../../components/Button/V2/Button';
import { Modal } from '../../../../../components/ModalAnimated';
import { Checkbox } from '../../../components/Checkbox';
import { Dropdown } from '../../../components/Dropdown';
import * as S from './S.el';

type Props = {
  onClose: () => void;
  open: boolean;
};

export const PaymentMethods: FC<Props> = ({ onClose, open }: Props) => {
  return (
    <>
      {open && (
        <Modal onClose={onClose} open={open}>
          <S.Container>
            <S.Title>Выбор методов оплаты</S.Title>
            <S.DropdonwConatainer big>
              <Checkbox>АО «Альфа-Банк», USD</Checkbox>
            </S.DropdonwConatainer>
            <Button fullWidth primary>
              Применить
            </Button>
          </S.Container>
        </Modal>
      )}
    </>
  );
};
