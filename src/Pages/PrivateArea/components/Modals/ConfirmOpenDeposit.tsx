import React, { FC } from 'react';
import { Button } from '../../../../components/Button/V2/Button';
import { Modal } from '../../../../components/ModalAnimated';
import * as S from './S.el';

type Props = {
  onClose: () => void;
  open: boolean;
};

export const ConfirmOpenDeposit: FC<Props> = ({ onClose, open }: Props) => {
  return (
    <>
      {open && (
        <Modal onClose={onClose} open={open}>
          <S.Container>
            <S.Title>Подтверждение открытия депозита</S.Title>
            <S.TextWrap>
              <S.Text>
                Списание средств произойдет с баланса личного кабинета сразу после подтверждения
                открытия депозита.
              </S.Text>
            </S.TextWrap>
            <S.List>
              <S.ListItem>
                <S.Text>
                  Программа депозита: <strong>VANILA</strong>
                </S.Text>
              </S.ListItem>
              <S.ListItem>
                <S.Text>
                  Тело депозита: <strong>90 000 GSFUTURE6</strong>
                </S.Text>
              </S.ListItem>
              <S.ListItem>
                <S.Text>
                  Отложенная выплата: <strong>НЕТ</strong>
                </S.Text>
              </S.ListItem>
              <S.ListItem>
                <S.Text>
                  Замороженый депозит: <strong>ДА</strong>
                </S.Text>
              </S.ListItem>
              <S.ListItem>
                <S.Text>
                  Дата открытия депозита: <strong>19.09.2021</strong>
                </S.Text>
              </S.ListItem>
              <S.ListItem>
                <S.Text>
                  Дата закрытия депозита: <strong>19.09.2021</strong>
                </S.Text>
              </S.ListItem>
              <S.ListItem>
                <S.Text>
                  Сумма выплаты: <strong>380 000 CWD</strong>
                </S.Text>
              </S.ListItem>
            </S.List>
            <S.TextWrap big>
              <S.List>
                <S.ListItem>
                  <S.Text>
                    К списанию: <strong>90 000 GSFUTURE6</strong>
                  </S.Text>
                </S.ListItem>
              </S.List>
            </S.TextWrap>
            <S.Buttons>
              <Button bigSize primary>
                Открыть депозит
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
