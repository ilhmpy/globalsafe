import React, { FC } from 'react';
import { useHistory } from 'react-router';

import { Button } from '../../../../../components/Button/V2/Button';
import { Modal } from '../../../../../components/ModalAnimated';
import { routers } from '../../../../../constantes/routers';
import { Text } from '../../../components/ui';
import * as S from './S.el';

type Props = {
  onClose: () => void;
  open: boolean;
};

export const ExchangeRejectModal: FC<Props> = ({
  onClose,
  open,
}: Props) => {
    const history = useHistory();

    return (
        <>
        {open && (
            <Modal onClose={onClose} open={open}>
                <S.SmallContainer>
                    <S.BlackTitle>Обмен отменен</S.BlackTitle>

                    <S.DataList>
                        <S.DataListItem>
                            <Text size={14} lH={20}>
                                Покупатель отменил обмен CWD на RUB:
                            </Text>
                        </S.DataListItem>

                        <S.DataListItem>
                            <Text size={14} lH={20}>Количество CWD:</Text>
                            <S.ListItemDivider />
                            <Text size={14} lH={20} weight={700}>482.40</Text>
                        </S.DataListItem>

                        <S.DataListItem>
                            <Text size={14} lH={20}>Стоимость RUB:</Text>
                            <S.ListItemDivider />
                            <Text size={14} lH={20} weight={700}>49 900</Text>
                        </S.DataListItem>
                    </S.DataList>

                    <Button primary fullWidth onClick={() => history.replace(routers.p2pchangesOwn)}>
                        К списку обменов
                    </Button>
                </S.SmallContainer>
            </Modal>
        )}
        </>
    );
};