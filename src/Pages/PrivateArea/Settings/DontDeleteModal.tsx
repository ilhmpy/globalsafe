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
}

export const DontDeleteModal: FC<IProps> = ({ open, setOpen }: IProps) => {
  const history = useHistory();

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
          <ModalTitle>Ошибка</ModalTitle>
          <CloseButton
            onClick={() => {
              setOpen(false);
            }}
          />

          <ContentWrapper>
            <InnerBlock>У вас имеется незавершенный обмен с этим платежным методом</InnerBlock>
          </ContentWrapper>
        </Container>
      </Modal>
    </CSSTransition>
  );
};

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
  cursor: pointer;
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
