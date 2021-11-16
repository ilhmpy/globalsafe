import styled from 'styled-components/macro';
import { ReactComponent as CloseIcon } from '../../assets/v2/svg/close.svg';

export const Close = styled(CloseIcon)`
  position: absolute;
  cursor: pointer;
  top: 20px;
  right: 20px;
  @media (max-width: 767px) {
    display: none;
  }
`;

export const Wrap = styled.div<{ open: boolean }>`
  background-color: ${(props) => (props.open ? 'rgba(63, 62, 78, .4)' : 'transparent')};
  pointer-events: ${(props) => (props.open ? 'auto' : 'none')};
  position: fixed;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 99999;
  @media (max-width: 767px) {
    background-color: transparent;
    min-height: calc(100vh);
    width: 100vw;
  }
  .anim {
    overflow-y: auto;
    position: relative;
    @media (max-width: 767px) {
      height: 100%;
    }
  }
`;

export const ModalWrapper = styled.div`
  min-height: calc(100vh);
  width: 100vw;
  flex-direction: column;
  display: flex;
  align-items: center;
  background-color: #f8f9fb;
  overflow: auto;
`;

export const ChildWrap = styled.div`
  margin-top: 60px;
`;

export const Footer = styled.div`
  width: 100%;
  height: 320px;
  background: #3f3e4e;
`;
