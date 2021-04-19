import React from "react";
import styled from "styled-components/macro";
import { Portal } from "../Portal/Portal";

type ModalProps = {
  onClose: () => void;
  width?: number;
  zIndex?: string;
};

export const Modal: React.FC<ModalProps> = ({
  children,
  onClose,
  width,
  zIndex = "99999",
}) => {
  const handleContainerClick = (e: React.MouseEvent) => {
    if (e.currentTarget === e.target) {
      onClose();
    }
  };

  return (
    <Portal>
      <ModalContainer zIndex={zIndex}>
        <Center onClick={handleContainerClick}>
          <ModalComponent width={width}>
            <span className="close" onClick={onClose}>
              &times;
            </span>
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
`;

const ModalContainer = styled.div<{ zIndex: string }>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.2);
  display: block;
  z-index: ${(props) => props.zIndex};
  overflow: auto;
`;

const ModalComponent = styled.div<{ width?: number }>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 50px auto;
  cursor: auto;
  background: #fafafa;
  border-radius: 10px;
  padding: 1rem;
  max-width: ${(props) => (props.width ? props.width + "px" : "400px")};
  width: 100%;
  position: relative;
  span {
    color: #333;
    position: absolute;
    right: 20px;
    top: 15px;
    cursor: pointer;
    z-index: 9999;
    font-size: 18px;
    &:hover {
      color: #000;
    }
  }
`;
