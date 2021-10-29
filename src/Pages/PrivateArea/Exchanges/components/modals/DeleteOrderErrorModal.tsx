import React, { FC } from 'react';
import { useHistory } from 'react-router';

import { Button } from '../../../../../components/Button/V2/Button';
import { Modal } from '../../../../../components/ModalAnimated';
import { routers } from '../../../../../constantes/routers';
import { Space, Text } from '../../../components/ui';
import * as S from './S.el';

type Props = {
  onClose: () => void;
  open: boolean;
};

export const DeleteOrderErrorModal: FC<Props> = ({
  onClose,
  open,
}: Props) => {
    const history = useHistory();

    return (
        <>
        {open && (
            <Modal onClose={onClose} open={open}>
                <S.SmallContainer>
                    <S.BlackTitle>Ошибка удаления ордера</S.BlackTitle>

                    <Text size={14} lH={20} black mB={10}>Ордер не был удален по причине:</Text>
                    <Text size={14} lH={20} error mB={10}>Присутствуют не завершенные обмены</Text>

                </S.SmallContainer>
            </Modal>
        )}
        </>
    );
};