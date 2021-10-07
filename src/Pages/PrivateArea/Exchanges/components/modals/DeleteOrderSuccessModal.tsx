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

export const DeleteOrderSuccessModal: FC<Props> = ({
  onClose,
  open,
}: Props) => {
    const history = useHistory();

    return (
        <>
        {open && (
            <Modal onClose={onClose} open={open}>
                <S.SmallContainer>
                    <S.BlackTitle>Ордер успешно удален</S.BlackTitle>

                    <S.DataList>
                        <S.DataListItem>
                            <Text size={14} lH={20}>Номер ордера:</Text>
                            <S.ListItemDivider />
                            <Text size={14} lH={20} weight={700}>4799646829</Text>
                        </S.DataListItem>

                        <S.DataListItem>
                            <Text size={14} lH={20}>Направление:</Text>
                            <S.ListItemDivider />
                            <Text size={14} lH={20} weight={700}>Покупка</Text>
                        </S.DataListItem>

                        <S.DataListItem>
                            <Text size={14} lH={20}>Валюта:</Text>
                            <S.ListItemDivider />
                            <Text size={14} lH={20} weight={700}>CWD</Text>
                        </S.DataListItem>

                        <S.DataListItem>
                            <Text size={14} lH={20}>Кол-во (CWD):</Text>
                            <S.ListItemDivider />
                            <Text size={14} lH={20} weight={700}>5 000 000</Text>
                        </S.DataListItem>

                        <S.DataListItem>
                            <Text size={14} lH={20}>Курс (CWD-RUB):</Text>
                            <S.ListItemDivider />
                            <Text size={14} lH={20} weight={700}>103.44</Text>
                        </S.DataListItem>

                        <S.DataListItem>
                            <Text size={14} lH={20}>На сумму (RUB):</Text>
                            <S.ListItemDivider />
                            <Text size={14} lH={20} weight={700}>4 500 000</Text>
                        </S.DataListItem>

                        <S.DataListItem>
                            <Text size={14} lH={20}>Кол-во успешных обменов:</Text>
                            <S.ListItemDivider />
                            <Text size={14} lH={20} weight={700}>14</Text>
                        </S.DataListItem>
                    </S.DataList>

                    <Button primary fullWidth onClick={() => history.replace(routers.p2pchangesOwn)}>
                        К списку объявлений
                    </Button>
                </S.SmallContainer>
            </Modal>
        )}
        </>
    );
};