import React, { FC } from 'react';
import { useHistory } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';
import styled, { css } from 'styled-components';
import { ReactComponent as Close } from '../../../assets/svg/close.svg';
import { Modal } from '../../../components/ModalAnimated';
import { routers } from '../../../constantes/routers';
import { payList } from './utils';
import { CollectionPayMethod } from '../../../types/paymentMethodKind';
import { FiatKind } from '../../../types/fiatKind';
import { Device } from '../consts';
import { Button } from '../../../components/Button/V2/Button';

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

  const handleClose = () => {
    setOpen(false);
    history.push(routers.settings);
  };

  return (
      <Modal
        open={open}
        onClose={handleClose}
      >
          <SmallContainer mobileWFull>
              <Title>Платежный метод удален</Title>

                <MobileContent>
                  <ContentWrapper>
                    <InnerBlock>
                      <Row>Успешно удален платежный метод:</Row>
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

                  <ButtonWrapper>
                    <Button
                      bigSize
                      fullWidth
                      primary
                      onClick={handleClose}
                    >
                      Ок
                    </Button>
                </ButtonWrapper>
              </MobileContent>
          </SmallContainer>
      </Modal>
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



export const Title = styled.h3`
  font-weight: bold;
  font-size: 24px;
  line-height: 28px;
  text-align: center;
  color: ${(props) => props.theme.v2.text};
  margin-bottom: 40px;

  @media ${Device.mobile} {
    margin-bottom: 0;
    text-align: left;
    font-weight: 900;
    font-size: 18px;
    line-height: 21px;
    padding: 20px;
    background-color: #f8f9fa;
    color: ${props => props.theme.v2.text};
  };
`;

export const SmallContainer = styled.div<{wFull?: boolean; mobileWFull?: boolean}>`
  width: ${props => props.wFull ? '100%' : '340px'};
  background: #fff;
  display: flex;
  flex-direction: column;

  @media ${Device.mobile} {
    ${props => props.mobileWFull !== undefined && css`width: 100%;`};
  };
`;


export const MobileContent = styled.div`
  display: flex;
  flex-direction: column;
  @media ${Device.mobile} {
    background: #FFFFFF;
    box-shadow: 0px 40px 40px -40px rgba(220, 220, 232, 0.5);
    padding: 20px;
  }
`;

const ButtonWrapper = styled.div`
  margin-top: 20px;
  width: 100%;
  display: none;

  @media ${Device.mobile} {
    display: flex;
  }
`;
