import React, { FC } from 'react';
import { ModalMob } from '../../../../components/ModalMob';
import { MarketCertificate } from '../../../../types/certificates';
import { Button } from '../../../../components/Button/V2/Button';
import * as S from './S.el';

type Props = {
  open: boolean;
  onClose: () => void;
  data: MarketCertificate | null;
};

export const SuccessModal: FC<Props> = ({ onClose, data, open }: Props) => {
  return (
    <ModalMob onClose={onClose} open={open}>
      <div>
        {data ? (
          <S.SmallContainer>
            <S.SmallContainerInner>
              <S.BlackTitle>Сертификат успешно куплен</S.BlackTitle>
              <S.Desc>Сертификат “{data.certificate.name}” успешно куплен</S.Desc>
              <Button primary bigSize onClick={onClose}>
                Ок
              </Button>
            </S.SmallContainerInner>
          </S.SmallContainer>
        ) : null}
      </div>
    </ModalMob>
  );
};
