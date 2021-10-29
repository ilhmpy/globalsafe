import React, { FC } from 'react';
import { Portal } from '../../../../../components/Portal/Portal';
import * as Styled from './S.el';
import styled from 'styled-components/macro';

type Props = {
  onClose: () => void;
  image: string;
};

export const ModalShowImage: React.FC<Props> = ({ onClose, image }: Props) => {
  const handleContainerClick = (e: React.MouseEvent) => {
    if (e.currentTarget === e.target) {
      onClose();
    }
  };

  return (
    <Portal>
      <ModalContainer>
        <Center onClick={handleContainerClick}>
          <ModalComponent>
            <ModalComponentInner>
              <Styled.ImageContainer>
                <span className="close" onClick={onClose}>
                  &times;
                </span>
                <img src={image} alt="" />
              </Styled.ImageContainer>
            </ModalComponentInner>
          </ModalComponent>
        </Center>
      </ModalContainer>
    </Portal>
  );
};

const Center = styled.div`
  min-height: 100vh;
  margin: auto;
  display: flex;
  align-items: center;
  transition: 0.3s;
  position: relative;
`;

const ModalContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  display: block;
  transition: 0.3s;
  z-index: 9999;
  overflow: auto;
`;

const ModalComponentInner = styled.div<{ nBr?: boolean }>`
  margin: 0;
  border-radius: ${(props) => (props.nBr ? '0' : '8px')};
  position: relative;
  img {
    max-width: 350px;
  }

  @media (max-width: 768px) {
    img {
      max-width: 300px;
    }
  }
`;

const ModalComponent = styled.div<{ width?: number; mobMarg?: boolean }>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: auto;
  cursor: auto;
  width: 98%;

  position: relative;
  span {
    position: absolute;
    right: 20px;
    top: 15px;
    cursor: pointer;
    z-index: 9999;
    font-size: 18px;
    color: #fff;
    @media (max-width: 576px) {
      right: 15px;
      top: 10px;
    }
  }
  @media (max-width: 768px) {
    margin: ${(props) => (props.mobMarg ? '50px 20px' : 'auto')};
  }
`;
