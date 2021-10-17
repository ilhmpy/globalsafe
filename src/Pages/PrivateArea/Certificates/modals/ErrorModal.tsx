import React, { FC } from 'react';
import { Modal } from '../../../../components/ModalAnimated';
import { MarketCertificate } from '../../../../types/certificates';
import * as S from './S.el';

type Props = {
  onClose: () => void;
  open: boolean;
  data: MarketCertificate;
  errorType: string;
};

export const ErrorModal: FC<Props> = ({ onClose, open, data, errorType }: Props) => {
  return (
    <>
      {open && (
        <Modal onClose={onClose} open={open}>
          <S.SmallContainer>
            <S.BlackTitle>Ошибка покупки сертификата</S.BlackTitle>
            <S.Desc>Сертификат “{data.certificate.name}” не был приобретен по причине:</S.Desc>
            <S.Reason>{errorType}</S.Reason>
          </S.SmallContainer>
        </Modal>
      )}
    </>
  );
};
