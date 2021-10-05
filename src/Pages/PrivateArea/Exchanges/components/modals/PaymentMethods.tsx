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
              <Checkbox dis>
                <S.Label dis>АО «Альфа-Банк», USD</S.Label>
              </Checkbox>
            </S.DropdonwConatainer>
            <S.DropdonwConatainer big>
              <Checkbox dis>
                <S.Label dis>АО «Тинькофф Банк», USD</S.Label>
              </Checkbox>
            </S.DropdonwConatainer>
            <S.DropdonwConatainer big>
              <Checkbox dis>
                <S.Label dis>ПАО Сбербанк, USD</S.Label>
              </Checkbox>
            </S.DropdonwConatainer>
            <S.DropdonwConatainer big>
              <S.Hr />
            </S.DropdonwConatainer>
            <S.DropdonwConatainer big>
              <Checkbox dis>
                <S.Label dis>ERC 20</S.Label>
              </Checkbox>
            </S.DropdonwConatainer>
            <S.DropdonwConatainer big>
              <Checkbox dis>
                <S.Label dis>TRC 20</S.Label>
              </Checkbox>
            </S.DropdonwConatainer>
            <S.DropdonwConatainer big>
              <Checkbox dis>
                <S.Label dis>BEP 20</S.Label>
              </Checkbox>
            </S.DropdonwConatainer>
            <Button bigSize fullWidth primary>
              Применить
            </Button>
          </S.Container>
        </Modal>
      )}
    </>
  );
};
