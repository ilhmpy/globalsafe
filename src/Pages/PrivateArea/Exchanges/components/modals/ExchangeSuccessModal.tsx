import React, { FC } from 'react';
import { useHistory } from 'react-router';

import { Button } from '../../../../../components/Button/V2/Button';
import { Modal } from '../../../../../components/ModalAnimated';
import { routers } from '../../../../../constantes/routers';
import { Balance } from "../../../../../types/balance";
import { FiatKind } from "../../../../../types/fiatKind";
import { getVolume } from "../../../../../functions/getVolume";
import { Text } from '../../../components/ui';
import * as S from './S.el';
import { countVolumeToShow } from "../../../utils";

type Props = {
  onClose: () => void;
  open: boolean;
  exchange: any;
};

export const ExchangeSuccessModal: FC<Props> = ({
  onClose,
  open,
  exchange
}: Props) => {
    const history = useHistory();

    return (
        <>
        {open && (
            <Modal onClose={onClose} open={open}>
                <S.SmallContainer>
                    <S.BlackTitle>Обмен успешно завершен</S.BlackTitle>

                    <S.DataList>
                        <S.DataListItem>
                            <Text size={14} lH={20}>{exchange.owner === "seller" ? "Продано" : "Куплено"} {Balance[exchange.assetKind]}:</Text>
                            <S.ListItemDivider />
                            <Text size={14} lH={20} weight={700}>
                                {(countVolumeToShow(exchange.volume, exchange.assetKind)).toLocaleString("ru-RU", { maximumFractionDigits: 2 })}
                            </Text>
                        </S.DataListItem> 

                        <S.DataListItem>
                            <Text size={14} lH={20}>Стоимость {FiatKind[exchange.exchangeAssetKind]}:</Text>
                            <S.ListItemDivider />
                            <Text size={14} lH={20} weight={700}>
                                {(countVolumeToShow(exchange.exchangeVolume, exchange.assetKind)).toLocaleString("ru-RU", { maximumFractionDigits: 5 })}
                            </Text>
                        </S.DataListItem>

                        <S.DataListItem>
                            <Text size={14} lH={20}>Ваша оценка {exchange.owner === "seller" ? "покупателю" : "продавцу"}:</Text>
                            <S.ListItemDivider />
                            <Text size={14} lH={20} weight={700}>{(Number(exchange.feedback)).toFixed(1)}</Text>
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