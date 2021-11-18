import React, { FC } from 'react';
import { Button } from '../../../../components/Button/V2/Button';
import { ModalMob } from '../../../../components/ModalMob';
import { MarketCertificate } from '../../../../types/certificates';
import * as S from './S.el';

type Props = {
  open: boolean;
  onClose: () => void;
  data: MarketCertificate | null;
  errorType: string;
};

export const ErrorModal: FC<Props> = ({ onClose, data, errorType, open }: Props) => {
  return (
    <ModalMob onClose={onClose} open={open}>
      <div>
        {data ? (
          <S.SmallContainer>
            <S.BlackTitle>Ошибка покупки сертификата</S.BlackTitle>
            <S.SmallContainerInner>
              <S.Desc>Сертификат “{data.certificate.name}” не был приобретен по причине:</S.Desc>
              <S.Reason>{errorType}</S.Reason>
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
