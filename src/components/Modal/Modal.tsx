import React from "react";
import styled from "styled-components/macro";
import { Portal } from "../Portal/Portal";

type ModalProps = {
  onClose: () => void;
};

export const Modal: React.FC<ModalProps> = ({ children, onClose }) => {
  const handleContainerClick = (e: React.MouseEvent) => {
    if (e.currentTarget === e.target) {
      onClose();
    }
  };

  return (
    <Portal>
      <ModalContainer onClick={handleContainerClick}>
        <ModalComponent>{children}</ModalComponent>
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

const ModalContainer = styled.div`
  width: 100%;
  height: 100vh;
  position: fixed;
  left: 0;
  top: 0;
  background: rgba(0, 0, 0, 0.2);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 300;
  cursor: pointer;
`;

const ModalComponent = styled.div`
  cursor: auto;
  background: #fafafa;
  border-radius: 0.25rem;
  padding: 1rem;
  max-height: 80vh;
  max-width: 400px;
  width: 100%;
  position: relative;
  overflow: auto;
`;
