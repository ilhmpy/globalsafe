import React, { FC } from 'react';
import { Button } from '../../../../../components/Button/V2/Button';
import { Modal } from '../../../../../components/ModalAnimated';
import * as S from './S.el';

type Props = {
  onClose: () => void;
  open: boolean;
};

export const ExchangeRequestErrorModal: FC<Props> = ({ onClose, open }: Props) => {
  return (
    <>
      {open && (
        <Modal onClose={onClose} open={open}>
          <S.Container>
            <S.Title>Ошибка отправления заявки</S.Title>
            <S.Desc>Ваша заявка на покупку не была отправлена на обмен по причине:</S.Desc>
            <S.Reason>Владелец удалил ордер</S.Reason>
            <Button fullWidth bigSize primary>
              Список объявлений
            </Button>
          </S.Container>
        </Modal>
      )}
    </>
  );
};
