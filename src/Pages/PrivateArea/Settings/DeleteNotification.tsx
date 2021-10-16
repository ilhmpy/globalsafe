import React, { FC, useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';
import styled from 'styled-components';
import { ReactComponent as Close } from '../../../assets/svg/close.svg';
import { Modal } from '../../../components/Modal/Modal';
import { routers } from '../../../constantes/routers';
import { payList } from './utils';
import { PaymentMethodKind, CollectionPayMethod } from '../../../types/paymentMethodKind';
import { FiatKind } from '../../../types/fiatKind';

interface IProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  data: CollectionPayMethod;
}

type PayMethod = {
  bankNumber?: string;
  name?: string;
  bankName?: string;
  paymentAddress?: string;
  assetKind?: number;
};

export const DeleteNotification: FC<IProps> = ({ open, setOpen, data }: IProps) => {
  const history = useHistory();

  const payMethod: PayMethod = JSON.parse(data.data);

  return (
    <CSSTransition in={open} timeout={300} unmountOnExit>
      <Modal
        onClose={() => {
          setOpen(false);
          history.push(routers.settings);
        }}
        width={420}
      >
        <Container>
          <ModalTitle>Платежный метод удален</ModalTitle>
          <CloseButton
            onClick={() => {
              setOpen(false);
              history.push(routers.settings);
            }}
          />

          <ContentWrapper>
            <InnerBlock>
              <Row>
                <b>
                  {payList[data.kind]}, {FiatKind[data.assetKind]}
                </b>
              </Row>
              {payMethod.name ? (
                <Row>
                  <strong>{payMethod.name}</strong>
                </Row>
              ) : null}
              {payMethod.bankNumber ? (
                <Row>
                  <b>{payMethod.bankNumber}</b>
                </Row>
              ) : null}
              {payMethod.paymentAddress ? (
                <Row>
                  <b>{payMethod.paymentAddress}</b>
                </Row>
              ) : null}
            </InnerBlock>
          </ContentWrapper>
        </Container>
      </Modal>
    </CSSTransition>
  );
};

const Row = styled.div`
  font-weight: normal;
  font-size: 14px;
  line-height: 20px;

  color: #000000;
`;

const InnerBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  position: relative;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const CloseButton = styled(Close)`
  position: absolute;
  right: 19px;
  top: 19px;
`;

const ModalTitle = styled.h2`
  font-style: normal;
  font-weight: 500;
  font-size: 24px;
  line-height: 28px;
  text-align: center;
  margin-bottom: 20px;

  color: #3f3e4e;
`;
