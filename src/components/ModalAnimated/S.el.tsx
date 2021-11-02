import styled, { css } from 'styled-components/macro';
import { ReactComponent as CloseIcon } from '../../assets/v2/svg/close.svg';
import { Device } from '../../Pages/PrivateArea/consts';

export const Close = styled(CloseIcon)`
  position: absolute;
  cursor: pointer;
  top: 20px;
  right: 20px;

  @media ${Device.mobile} {
    display: none;
  }
`;


export const ModalContainerMobile = css`
  min-height: calc(100%);
  position: fixed;
  top: 60px;
  left: 0;
  width: 100%;
  min-width: 100vw;
  height: 100%;
  background-color: #f8f9fa;
  display: block;
  transition: 0.3s;
  z-index: 8888;
  overflow: auto;
`;

export const CenterMobile = css`
  min-width: 100vw;
  margin: 0;
  display: flex;
  flex-direction: column;
  transition: 0.3s;
  padding-bottom: 60px;
  background: #f8f9fa;
`;

export const ContentMobile = css`
  background-color: #f8f9fa;
  box-sizing: border-box;
  width: 100%;
  min-width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  flex: 1;
  margin: 0;
  margin-bottom: 40px;
  border: none;
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

  @media ${Device.mobile} {
    ${ModalContainerMobile};
  }
`;

export const Center = styled.div`
  min-height: calc(100% - 3.5rem);
  margin: 1.75rem auto;
  display: flex;
  align-items: center;
  transition: 0.3s;

  @media ${Device.mobile} {
    ${CenterMobile};
  }
`;

export const Content = styled.div`
  margin: 0 20px;
  background: #fff;
  border: 1px solid rgba(255, 255, 255, 0.5);
  box-sizing: border-box;
  border-radius: 8px;
  /* width: 480px; */
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px;
  position: relative;
  @media (max-width: 576px) {
    padding: 40px 20px 20px;
  }

  @media ${Device.mobile} {
    ${ContentMobile};
  }
`;
