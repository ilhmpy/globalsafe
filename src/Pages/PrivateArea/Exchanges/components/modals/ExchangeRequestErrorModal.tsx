import React, { FC } from 'react';
import { useHistory } from 'react-router';
import { Button } from '../../../../../components/Button/V2/Button';
import { Modal } from '../../../../../components/ModalAnimated';
import { routers } from '../../../../../constantes/routers';
import * as S from './S.el';

type Props = {
  onClose: () => void;
  open: boolean;
};

export const ExchangeRequestErrorModal: FC<Props> = ({ onClose, open }: Props) => {
  const history = useHistory();

  const handleGoToList = () => {
    history.replace(routers.p2pchanges);
  };

  return (
    <>
      {open && (
        <Modal onClose={onClose} open={open}>
          <S.Container>
            <S.Title>Ошибка отправления заявки</S.Title>
            <S.Desc>Ваша заявка на покупку не была отправлена на обмен по причине:</S.Desc>
            {/* <S.Reason>Владелец удалил ордер</S.Reason> */}
            <Button fullWidth bigSize primary onClick={handleGoToList}>
              Список ордеров
            </Button>
          </S.Container>
        </Modal>
      )}
    </>
  );
};
