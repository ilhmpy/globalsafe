import React, { FC } from 'react';
import { Modal } from '../../../../components/ModalAnimated';
import { MarketCertificate } from '../../../../types/certificates';
import * as S from './S.el';

type Props = {
  onClose: () => void;
  open: boolean;
  data: MarketCertificate;
};

export const ErrorModal: FC<Props> = ({ onClose, open, data }: Props) => {
  return (
    <>
      {open && (
        <Modal onClose={onClose} open={open}>
          <S.SmallContainer>
            <S.BlackTitle>Ошибка покупки сертификата</S.BlackTitle>
            <S.Desc>Сертификат “{data.certificate.name}” не был приобретен по причине:</S.Desc>
            <S.Reason>На балансе аккаунта недостаточно средств</S.Reason>
          </S.SmallContainer>
        </Modal>
      )}
    </>
  );
};
