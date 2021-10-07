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

export const OrderSellModal: FC<Props> = ({
  onClose,
  open,
}: Props) => {
    const history = useHistory();

    return (
        <>
        {open && (
            <Modal onClose={onClose} open={open}>
                <S.SmallContainer>
                    <S.BlackTitle>Публикация ордера</S.BlackTitle>

                    <S.DataList>
                        <S.DataListItem>
                            <Text size={14} lH={20}>Направление:</Text>
                            <S.ListItemDivider />
                            <Text size={14} lH={20} weight={700}>Продажа</Text>
                        </S.DataListItem>

                        <S.DataListItem>
                            <Text size={14} lH={20}>Валюта продажи:</Text>
                            <S.ListItemDivider />
                            <Text size={14} lH={20} weight={700}>CWD</Text>
                        </S.DataListItem>

                        <S.DataListItem>
                            <Text size={14} lH={20}>Кол-во продажи:</Text>
                            <S.ListItemDivider />
                            <Text size={14} lH={20} weight={700}>100 000</Text>
                        </S.DataListItem>

                        <S.DataListItem>
                            <Text size={14} lH={20}>Валюта обмена:</Text>
                            <S.ListItemDivider />
                            <Text size={14} lH={20} weight={700}>RUB</Text>
                        </S.DataListItem>

                        <S.DataListItem>
                            <Text size={14} lH={20}>Курс:</Text>
                            <S.ListItemDivider />
                            <Text size={14} lH={20} weight={700}>109.44</Text>
                        </S.DataListItem>

                        <S.DataListItem>
                            <Text size={14} lH={20}>Платежные методы:</Text>
                            <S.ListItemDivider />
                            <Text size={14} lH={20} weight={700}>АО «Альфа-Банк»</Text>
                        </S.DataListItem>
                            <>
                                <S.DataListItem spaceBetween>
                                    <Text size={14} lH={20} weight={300}>Номер карты:</Text>
                                    <Text size={14} lH={20} weight={700}>5536 9137 9922 7240</Text>
                                </S.DataListItem>
                            </>
                            <>
                                <S.DataListItem spaceBetween  mb={20}>
                                    <Text size={14} lH={20} weight={300}>Держатель карты:</Text>
                                    <Text size={14} lH={20} weight={700}>VYACHESLAV TROSCHIN</Text>
                                </S.DataListItem>
                            </>

                        <S.DataListItem justifyEnd>
                            <Text size={14} lH={20} weight={700}>АО «Тинькофф Банк»</Text>
                        </S.DataListItem>
                            <>
                                <S.DataListItem spaceBetween>
                                    <Text size={14} lH={20} weight={300}>Номер карты:</Text>
                                    <Text size={14} lH={20} weight={700}>5536 9137 9922 7240</Text>
                                </S.DataListItem>
                            </>
                            <>
                                <S.DataListItem spaceBetween>
                                    <Text size={14} lH={20} weight={300}>Держатель карты:</Text>
                                    <Text size={14} lH={20} weight={700}>VYACHESLAV TROSCHIN</Text>
                                </S.DataListItem>
                            </>


                       


                        <S.DataListItem>
                            <Text size={14} lH={20}>Лимиты:</Text>
                            <S.ListItemDivider />
                            <Text size={14} lH={20} weight={700}>1 000 - 49 900</Text>
                        </S.DataListItem>

                        <S.DataListItem>
                            <Text size={14} lH={20}>Время на обмен:</Text>
                            <S.ListItemDivider />
                            <Text size={14} lH={20} weight={700}>20 минут</Text>
                        </S.DataListItem>
                    </S.DataList>

                    <Space>
                        <Button primary fullWidth onClick={onClose}>
                            Опубликовать
                        </Button>
                        <Button outlinePrimary fullWidth onClick={onClose}>
                            Отмена
                        </Button>
                    </Space>
                </S.SmallContainer>
            </Modal>
        )}
        </>
    );
};