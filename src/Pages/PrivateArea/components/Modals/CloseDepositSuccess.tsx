import React, { FC } from 'react';
import { Button } from '../../../../components/Button/V2/Button';
import { Modal } from '../../../../components/ModalAnimated';
import * as S from './S.el';

type Props = {
  onClose: () => void;
  open: boolean;
};

export const CloseDepositSuccess: FC<Props> = ({ onClose, open }: Props) => {
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
                  Оставшиеся проценты: <strong>38 %</strong>
                </S.Text>
              </S.ListItem>
              <S.ListItem>
                <S.Text>
                  Курс конвертации: <strong>2.14 MULTICS</strong>
                </S.Text>
              </S.ListItem>
            </S.List>
            <S.List>
              <S.ListItem>
                <S.Text>
                  Зачислено: <strong>279 000 MULTICS</strong>
                </S.Text>
              </S.ListItem>
            </S.List>
          </S.Container>
        </Modal>
      )}
    </>
  );
};
