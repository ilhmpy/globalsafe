import React, { FC, useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';
import styled from 'styled-components';
import { ReactComponent as Close } from '../../../assets/svg/close.svg';
import { Modal } from '../../../components/Modal/Modal';
import { routers } from '../../../constantes/routers';
import { AppContext } from '../../../context/HubContext';

interface IProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export const DeleteNotification: FC<IProps> = ({ open, setOpen }: IProps) => {
  const { t } = useTranslation();
  const [fromSum, setFromSum] = useState('');
  const [toSum, setToSum] = useState('');
  const [fromCurrency, setFromCurrency] = useState('');
  const [toCurrency, setToCurrency] = useState('');
  const appContext = useContext(AppContext);
  const hubConnection = appContext.hubConnection;
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
          <ModalTitle>Платежный метод удален</ModalTitle>
          <CloseButton
            onClick={() => {
              setOpen(false);
              history.push(routers.settings);
            }}
          />

          <ContentWrapper>
            <InnerBlock>
              <Row>Успешно удален платежный метод:</Row>
              <Row>
                <b>Банковский перевод АО «Тинькофф Банк»</b>
              </Row>
              <Row>
                <strong>VYACHESLAV TROSCHIN</strong>
              </Row>
              <Row>
                <b>5536 9137 9922 7240</b>
              </Row>
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
