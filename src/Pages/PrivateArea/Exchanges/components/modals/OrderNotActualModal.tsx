import React, { FC } from 'react';
import { useHistory } from 'react-router';

import { Modal } from '../../../../../components/ModalAnimated';
import { Button } from '../../../../../components/Button/V2/Button';

import * as S from './S.el';
import { routers } from '../../../../../constantes/routers';

type Props = {
  onClose: () => void;
  open: boolean;
};

export const OrderNotActualModal: FC<Props> = ({ onClose, open }: Props) => {
  const history = useHistory();

  return (
    <>
      {open && (
        <Modal onClose={onClose} open={open}>
          <S.SmallContainer>
            <S.BlackTitle>Ордер больше недействителен</S.BlackTitle>

            <Button primary fullWidth onClick={() => history.replace(routers.p2pchanges)}>
              К списку ордеров
            </Button>
          </S.SmallContainer>
        </Modal>
      )}
    </>
  );
};