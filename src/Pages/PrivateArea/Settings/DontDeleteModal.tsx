import React, { FC, useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import styled, { css } from 'styled-components';
import { ReactComponent as Close } from '../../../assets/svg/close.svg';
import { ModalMob } from '../../../components/ModalMob';
import { routers } from '../../../constantes/routers';
import { Button } from '../../../components/Button/V2/Button';
import { Device } from '../consts';

interface IProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export const DontDeleteModal: FC<IProps> = ({ open, setOpen }: IProps) => {
  const history = useHistory();

  const handleClose = () => {
    setOpen(false);
    history.push(routers.settings);
  };

  return (
    <ModalMob open={open} onClose={handleClose}>
      <SmallContainer mobileWFull>
        <Title>Ошибка удаления платежного метода</Title>
        <MobileContent>
          <ContentWrapper>
            <InnerBlock>Платежный метод не был удален по причине:</InnerBlock>
            <InnerBlock error>Платежный метод используется в незавершенном обмене</InnerBlock>
          </ContentWrapper>

          <ButtonWrapper>
            <Button bigSize fullWidth primary onClick={handleClose}>
              Ок
            </Button>
          </ButtonWrapper>
        </MobileContent>
      </SmallContainer>
    </ModalMob>
  );
};

const InnerBlock = styled.div<{ error?: boolean }>`
  display: flex;
  flex-direction: column;
  gap: 10px;
  font-size: 14px;
  line-height: 20px;
  color: ${(props) => (props.error ? '#FF4A31' : '#000000')};
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
    color: ${(props) => props.theme.v2.text};
  } ;
`;

export const SmallContainer = styled.div<{ wFull?: boolean; mobileWFull?: boolean }>`
  width: 420px;
  background: #ffffff;
  padding: 40px;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  @media (max-width: 767px) {
    margin-top: 60px;
    width: 100%;
    padding: 0;
    border-radius: 0;
    margin-bottom: 60px;
    background: transparent;
  }
`;

export const MobileContent = styled.div`
  display: flex;
  flex-direction: column;
  @media ${Device.mobile} {
    background: #ffffff;
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
