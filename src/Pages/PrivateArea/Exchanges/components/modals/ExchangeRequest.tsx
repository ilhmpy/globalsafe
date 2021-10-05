import React, { FC } from 'react';
import { Button } from '../../../../../components/Button/V2/Button';
import { Modal } from '../../../../../components/ModalAnimated';
import * as S from './S.el';

type Props = {
  onClose: () => void;
  open: boolean;
};

export const ExchangeRequestModal: FC<Props> = ({ onClose, open }: Props) => {
  return (
    <>
      {open && (
        <Modal onClose={onClose} open={open}>
          <S.Container>
            <S.Title>Выбор методов оплаты</S.Title>
            <S.List>
              <S.Listitem>
                <S.ListitemName>Покупка CWD:</S.ListitemName>
                <S.Line />
                <S.ListitemValue>482.40</S.ListitemValue>
              </S.Listitem>
              <S.Listitem>
                <S.ListitemName>Курс (CWD-USDT):</S.ListitemName>
                <S.Line />
                <S.ListitemValue>0.95</S.ListitemValue>
              </S.Listitem>
              <S.Listitem>
                <S.ListitemName>Стоимость USDT:</S.ListitemName>
                <S.Line />
                <S.ListitemValue>458.28</S.ListitemValue>
              </S.Listitem>
              <S.Listitem>
                <S.ListitemName>Рейтинг продавца:</S.ListitemName>
                <S.Line />
                <S.ListitemValue>5.0</S.ListitemValue>
              </S.Listitem>
            </S.List>
            <S.Buttons>
              <Button bigSize primary>
                Подтвердить
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
