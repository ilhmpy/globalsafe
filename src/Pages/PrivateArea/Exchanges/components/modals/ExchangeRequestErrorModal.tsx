import React, { FC } from 'react';
import { useHistory } from 'react-router-dom';
import { Button } from '../../../../../components/Button/V2/Button';
import { Modal } from '../../../../../components/ModalAnimated';
import { routers } from '../../../../../constantes/routers';
import * as S from './S.el';

type Props = {
  onClose: () => void;
  open: boolean;
  message?: string;
  withAction?: boolean;
}; 

export const ExchangeRequestErrorModal: FC<Props> = ({ 
  onClose, 
  open, 
  message, 
  withAction = true
}: Props) => {
  const history = useHistory();

  const handleGoToList = () => {
    history.replace(routers.p2pchanges);
  };

  return (
    <>
      {open && (
        <Modal onClose={onClose} open={open}>
          <S.Container mobileWFull>
            <S.Title>Ошибка отправления заявки</S.Title>
            <S.MobileContent>
              <S.Desc>Ваша заявка на покупку не была отправлена на обмен по причине:</S.Desc>
              {!!message && <S.Reason>{message}</S.Reason>}
              {
                withAction && (
                  <Button fullWidth bigSize primary onClick={handleGoToList}>
                    Список ордеров
                  </Button>
                )
              }
            </S.MobileContent>
          </S.Container>
        </Modal>
      )}
    </>
  );
};
