import React, { FC } from 'react';

import { Button } from '../../../../../components/Button/V2/Button';
import { Modal } from '../../../../../components/ModalAnimated';
import { Text } from '../../../components/ui';
import * as S from './S.el';

type Props = {
  onClose: () => void;
  open: boolean; 
};

export const DeleteOrderErrorModal: FC<Props> = ({
  onClose,
  open,
}: Props) => {
    return (
        <>
        {open && (
            <Modal onClose={onClose} open={open}>
                <S.SmallContainer mobileWFull>
                    <S.Title>Ошибка удаления ордера</S.Title>

                    <S.MobileContent>
                        <Text size={14} lH={20} mB={10}>Ордер не был удален по причине:</Text>
                        <Text size={14} lH={20} error mB={20}>Присутствуют не завершенные обмены</Text>

                        <Button primary fullWidth onClick={onClose}>
                            Ок
                        </Button>
                    </S.MobileContent>
                </S.SmallContainer>
            </Modal>
        )}
        </>
    );
};