import React, { FC } from 'react';
import { Button } from '../../../../components/Button/V2/Button';
import { ModalMob } from '../../../../components/ModalMob';
import { Text } from '../../components/ui';
import { MarketCertificate } from '../../../../types/certificates';
import { Balance } from '../../../../types/balance';
import * as S from './S.el';

type Props = {
  open: boolean;
  onClose: () => void;
  data: MarketCertificate | null;
  purchase: (data: MarketCertificate) => void;
};

export const BuyCertificateModal: FC<Props> = ({ onClose, data, purchase, open }: Props) => {
  return (
    <ModalMob onClose={onClose} open={open}>
      <div>
        {data ? (
          <S.SmallContainer>
            <S.BlackTitle>Покупка сертификата</S.BlackTitle>
            <S.SmallContainerInner>
              <S.Desc>Вы собираетесь купить сертифкат &quot;{data.certificate.name}&quot;:</S.Desc>
              <S.DataList>
                <S.DataListItem>
                  <Text size={14} lH={20}>
                    Лимит {Balance[data.certificate.assetKind]}/24ч:
                  </Text>
                  <S.ListItemDivider />
                  <Text size={14} lH={20} weight={700}>
                    {(data.certificate.dailyVolume / 100000).toLocaleString('en-US', {
                      maximumFractionDigits: 2,
                    })}
                  </Text>
                </S.DataListItem>

                <S.DataListItem>
                  <Text size={14} lH={20}>
                    Срок действия (В днях):
                  </Text>
                  <S.ListItemDivider />
                  <Text size={14} lH={20} weight={700}>
                    {data.certificate.duration}
                  </Text>
                </S.DataListItem>

                <S.DataListItem>
                  <Text size={14} lH={20}>
                    Стоимость CWD:
                  </Text>
                  <S.ListItemDivider />
                  <Text size={14} lH={20} weight={700}>
                    {(data.price / 100000).toLocaleString('en-US', {
                      maximumFractionDigits: 2,
                    })}
                  </Text>
                </S.DataListItem>
              </S.DataList>

              <S.Buttons>
                <Button bigSize primary onClick={() => purchase(data)}>
                  Купить
                </Button>
                <Button bigSize outlinePrimary onClick={onClose}>
                  Отмена
                </Button>
              </S.Buttons>
            </S.SmallContainerInner>
          </S.SmallContainer>
        ) : null}
      </div>
    </ModalMob>
  );
};
