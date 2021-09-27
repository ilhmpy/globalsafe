import React, { FC } from 'react';
import { Button } from '../../../../components/Button/V2/Button';
import { Modal } from '../../../../components/ModalAnimated';
import * as S from './S.el';

type Props = {
  onClose: () => void;
  open: boolean;
};

export const CloseDeposit: FC<Props> = ({ onClose, open }: Props) => {
  return (
    <>
      {open && (
        <Modal onClose={onClose} open={open}>
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
            <S.TextWrap big>
              <S.List>
                <S.ListItem>
                  <S.Text>
                    К зачислению: <strong>279 000 MULTICS</strong>
                  </S.Text>
                </S.ListItem>
              </S.List>
            </S.TextWrap>
            <S.Buttons>
              <Button bigSize primary>
                Закрыть депозит
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
