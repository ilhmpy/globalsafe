import React, { FC } from 'react';
import { Modal } from '../../../../components/ModalAnimated';
import { MarketCertificate } from '../../../../types/certificates';
import * as S from './S.el';

type Props = {
  onClose: () => void;
  open: boolean;
  data: MarketCertificate;
};

export const SuccessModal: FC<Props> = ({ onClose, open, data }: Props) => {
  return (
    <>
      {open && (
        <Modal onClose={onClose} open={open}>
          <S.SmallContainer>
            <S.BlackTitle>Сертификат успешно куплен</S.BlackTitle>
            <S.Desc>Сертификат “{data.certificate.name}” успешно куплен</S.Desc>
          </S.SmallContainer>
        </Modal>
      )}
    </>
  );
};
