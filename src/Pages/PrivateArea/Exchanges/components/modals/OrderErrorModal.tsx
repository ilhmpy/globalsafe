import React, { FC } from 'react';
import { useHistory } from 'react-router';
import styled from 'styled-components';

import { Button as BaseButton } from '../../../../../components/Button/V2/Button';
import { Modal } from '../../../../../components/ModalAnimated';
import { routers } from '../../../../../constantes/routers';
import { Text } from '../../../components/ui';
import * as S from './S.el';

type Props = {
  onClose: () => void;
  open: boolean;
  message?: string;
  onlyCloseAction?: boolean;
};

export const OrderErrorModal: FC<Props> = ({ onClose, open, message, onlyCloseAction = false }: Props) => {
  const history = useHistory();

  return (
    <>
      {open && (
        <Modal onClose={onClose} open={open}>
          <S.SmallContainer>
            <S.BlackTitle>Ошибка публикации ордера</S.BlackTitle>

            <Text size={14} lH={20} black mB={10}>
              Ордер не был опубликован по причине:
            </Text>
            {
              !!message
              ?
                <Text size={14} lH={20} error mB={20}>
                  {message}
                </Text>
              :
                null
            }
            {
              onlyCloseAction
              ?
                <Button primary onClick={onClose}>
                  Закрыть
                </Button>
            :
                <Button primary onClick={() => history.replace(routers.certificates)}>
                  Выбрать сертификат
                </Button>
            }
          </S.SmallContainer>
        </Modal>
      )}
    </>
  );
};

const Button = styled(BaseButton)`
  text-transform: none;
  font-weight: 500;
  font-size: 14px;
  line-height: 16px;
`;
