import React, { ReactNode } from 'react';
import styled from 'styled-components/macro';
import { Portal } from '../Portal/Portal';

type ModalProps = {
  onClose: () => void;
  width?: number;
  zIndex?: string;
  mobMarg?: boolean;
  children: ReactNode;
  paddingTop?: number;
};

export const Modal: React.FC<ModalProps> = ({
  children,
  onClose,
  width,
  zIndex = '99999',
  mobMarg,
  paddingTop
}: ModalProps) => {
  const handleContainerClick = (e: React.MouseEvent) => {
    if (e.currentTarget === e.target) {
      onClose();
    }
  };

  return (
    <Portal>
      <ModalContainer zIndex={zIndex}>
        <Center onClick={handleContainerClick}>
          <ModalComponent width={width} mobMarg={mobMarg} paddingTop={paddingTop}>
            <span className="close" onClick={onClose}>&times;</span>
            {children}
          </ModalComponent>
        </Center>
      </ModalContainer>
    </Portal>
  );
};

const Main = styled.div`
  min-height: 125vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Center = styled.div`
  min-height: calc(100% - 3.5rem);
  margin: 1.75rem auto;
  display: flex;
  align-items: center;
  transition: 0.3s;
`;

const ModalContainer = styled.div<{ zIndex: string }>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.2);
  display: block;
  transition: 0.3s;
  z-index: ${(props) => props.zIndex};
  overflow: auto;
  @media (max-width: 576px) {
    padding: 20px;
  }
`;

const ModalComponent = styled.div<{ width?: number; mobMarg?: boolean; paddingTop?: number; }>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 50px auto;
  cursor: auto;
  background: ${(props) => props.theme.modal};
  border-radius: 10px;
  padding: 1rem;
  max-width: ${(props) => (props.width ? props.width + 'px' : '400px')};
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  position: relative;
  /* padding: 20px; */
  ${({ paddingTop }) => {
    if (paddingTop) {
      return `
        padding-top: ${paddingTop}px;
      `;
    }
  }}

  & > span {
    color: ${(props) => props.theme.text3};
    position: absolute;
    right: 15px;
    top: -2px;
    cursor: pointer;
    z-index: 9999;
    font-size: 36px;
    opacity: 40%;
    font-weight: 100;
    &:hover {
      color: ${(props) => props.theme.text3Hover};
    }
  }


  @media (max-width: 768px) {
    margin: ${(props) => (props.mobMarg ? '50px 20px' : '50px auto')};
    padding: ${(props) => (props.mobMarg ? '0' : '1rem')};
  }
`;
