import styled from 'styled-components/macro';
import { ReactComponent as CloseIcon } from '../../assets/v2/svg/close.svg';

export const Close = styled(CloseIcon)`
  position: absolute;
  cursor: pointer;
  top: 20px;
  right: 20px;
`;

export const Center = styled.div`
  min-height: calc(100% - 3.5rem);
  margin: 1.75rem auto;
  display: flex;
  align-items: center;
  transition: 0.3s;
`;

export const ModalContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(38, 50, 56, 0.5);
  display: block;
  transition: 0.3s;
  z-index: 99999;
  overflow: auto;
`;

export const Content = styled.div`
  margin: 0 20px;
  background: #f2f2f2;
  border: 1px solid rgba(255, 255, 255, 0.5);
  box-sizing: border-box;
  border-radius: 8px;
  /* width: 480px; */
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px;
  position: relative;
  /* @media (max-width: 768px) {
    width: 380px;
  } */
  @media (max-width: 576px) {
    padding: 40px 20px 20px;
  }
`;
