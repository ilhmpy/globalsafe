import React, { FC } from 'react';
import { useHistory } from 'react-router';

import { Button } from '../../../../../components/Button/V2/Button';
import { Modal } from '../../../../../components/ModalAnimated';
import { routers } from '../../../../../constantes/routers';
import { ViewExchangeModel } from '../../../../../types/exchange';
import { Text } from '../../../components/ui';
import * as S from './S.el';
import { Balance } from "../../../../../types/balance";
import { FiatKind } from "../../../../../types/fiatKind";
import { countVolumeToShow } from "../../../utils";

type Props = {
  onClose: () => void;
  open: boolean;
  exchange: any;
};

export const ExchangeRejectModal: FC<Props> = ({
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
                    <S.BlackTitle>Обмен отменен</S.BlackTitle>

                    <S.DataList>
                        <S.DataListItem>
                            <Text size={14} lH={20}>
                                Покупатель отменил обмен {Balance[exchange.assetKind]} на {FiatKind[exchange.exchangeAssetKind]}:
                            </Text>
                        </S.DataListItem>

                        <S.DataListItem>
                            <Text size={14} lH={20}>Количество CWD:</Text>
                            <S.ListItemDivider />
                            <Text size={14} lH={20} weight={700}>
                                {(countVolumeToShow(exchange.volume, exchange.assetKind)).toLocaleString('ru-RU', { maximumFractionDigits: 5 })}
                            </Text>
                        </S.DataListItem>

                        <S.DataListItem>
                            <Text size={14} lH={20}>Стоимость {FiatKind[exchange.exchangeAssetKind]}:</Text>
                            <S.ListItemDivider />
                            <Text size={14} lH={20} weight={700}>
                                {(countVolumeToShow(exchange.exchangeVolume, exchange.assetKind)).toLocaleString('ru-RU', { maximumFractionDigits: 5 })}
                            </Text>
                        </S.DataListItem>
                    </S.DataList>

                    <Button primary bigSize fullWidth onClick={() => history.replace(routers.p2pchangesOwn)}>
                        К списку обменов
                    </Button>
                </S.SmallContainer>
            </Modal>
        )}
        </>
    );
};