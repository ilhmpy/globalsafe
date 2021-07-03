import styled, { css, keyframes } from "styled-components/macro";
import { ReactComponent as Close } from "../../../../assets/svg/close.svg";
import { Card } from "../../../../globalStyles";
import { Button } from "../../../../components/Button/Button";

export const CloseIcon = styled(Close)`
  position: absolute;
  cursor: pointer;
  right: 18px;
  top: 18px;
  color: ${(props) => props.theme.text3};
  path {
    fill: ${(props) => props.theme.text3};
    &:hover {
      fill: ${(props) => props.theme.text3Hover};
    }
  }
`;

export const TimerContainer = styled.div`
  position: relative;
  margin: 40px auto;
  background: ${(props) => props.theme.card.backgroundAlfa};
  border: 1px solid rgba(86, 101, 127, 0.05);
  box-sizing: border-box;
  border-radius: 20px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  padding: 24px;
  text-align: center;
  width: 340px;
  @media (max-width: 768px) {
    width: 300px;
  }
`;

export const TimerTitle = styled.div`
  font-weight: normal;
  font-size: 18px;
  line-height: 21px;
  display: flex;
  align-items: center;
  justify-content: center;
  letter-spacing: 0.1px;
  color: ${(props) => props.theme.text2};
  margin-bottom: 10px;
  @media (max-width: 576px) {
    font-weight: normal;
    font-size: 14px;
    line-height: 16px;
  }
`;

const Move = keyframes`
0% {
  opacity: 1;
  }
50% {
  opacity: .6;
  }
100% {
  opacity: 1;
  }
`;

const MyCss = css`
  position: relative;
  border-radius: 5px;
  opacity: 1;
  visibility: hidden;
  overflow: hidden;
  content: "&nbsp;";
  color: transparent;
  &:after {
    position: absolute;
    content: "";
    height: 100%;
    width: 100%;
    visibility: visible;
    left: 0;
    top: 0;
    background-color: rgba(0, 0, 0, 0.075);
    animation: ${Move} 1.5s infinite;
  }
`;

export const TimerValue = styled.div<{ nodata?: boolean }>`
  font-weight: 500;
  font-size: 28px;
  line-height: 42px;
  height: 42px;
  display: flex;
  align-items: center;
  justify-content: center;
  letter-spacing: 0.1px;
  color: #ff416e;
  ${(props) => {
    if (props.nodata) {
      return MyCss;
    }
  }}
  @media (max-width: 576px) {
    font-weight: normal;
    font-size: 25px;
    line-height: 29px;
  }
`;

export const WheelWrap = styled.div`
  padding-top: 40px;
`;

export const Present = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  letter-spacing: 0.1px;
  border: 1px solid rgba(86, 101, 127, 0.05);
  box-sizing: border-box;
  border-radius: 20px;
  padding: 12px;
  font-weight: 500;
  font-size: 36px;
  line-height: 42px;
  color: #ff416e;
  box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.25);
  transition: 0.3s ease-in-out;
  text-align: center;
  svg {
    margin-right: 10px;
  }
  @media (max-width: 768px) {
    font-size: 18px;
    line-height: 21px;
    box-shadow: none;
    border: none;
    padding: 16px 45px;
  }
`;

export const PresentInner = styled.div<{ show?: boolean }>`
  opacity: ${(props) => (props.show ? "1" : "0")};
`;

export const WheelContainer = styled.div`
  width: 360px;
  height: 360px;
  position: relative;
  img {
    max-width: 100%;
  }
  @media (max-width: 992px) {
    margin-bottom: 40px;
    margin-left: auto;
    margin-right: auto;
  }
  @media (max-width: 576px) {
    width: 250px;
    height: 250px;
  }
`;

export const Wheel = styled.div`
  width: 100%;
  transition: all 10s cubic-bezier(0.4, 0.09, 0, 1);
  img {
    transition: none;
    transform: rotate(17deg);
  }
`;

export const Arrow = styled.div`
  position: absolute;
  top: -33px;
  left: 50%;
  margin-left: -15px;
  width: 33px;
  height: 93px;
`;

export const Center = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 170px;
  height: 170px;
  margin-top: -85px;
  margin-left: -85px;
  @media (max-width: 576px) {
    width: 120px;
    height: 120px;
    margin-top: -60px;
    margin-left: -60px;
  }
`;

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  /* background: linear-gradient(180deg, #ffffff 0%, rgba(255, 255, 255, 0) 100%),
    linear-gradient(113.23deg, #ffffff 25.61%, #f3f4f5 60.51%); */
  max-width: 1060px;
  margin: 0px auto 10px;
  height: 500px;
  @media (max-width: 1070px) {
    height: auto;
    min-height: 330px;
  }
  @media (max-width: 950px) {
    margin: 0px auto 25px;
  }
`;

export const ContainerItem = styled.div`
  width: 460px;
  margin: 0 30px;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  .modals-enter {
    opacity: 0;
    /* transform: scale(0.9); */
  }
  .modals-enter-active {
    opacity: 1;
    /* transform: translateX(0); */
    transition: all 300ms linear;
  }
  .modals-exit {
    opacity: 1;
  }
  .modals-exit-active {
    opacity: 0;
    /* transform: scale(0.9); */
    transition: all 300ms linear;
  }
  .alert-enter {
    opacity: 0;
  }
  .alert-enter-active {
    opacity: 1;
    transition: opacity 5000ms;
  }
  .alert-exit {
    opacity: 1;
  }
  .alert-exit-active {
    opacity: 0;
    transition: opacity 5000ms;
  }
  @media (max-width: 576px) {
    max-width: 260px;
    margin: 0 10px;
    ${TimerContainer} {
      width: 250px;
    }
  }
`;

export const Inside = styled.div<{ red?: boolean }>`
  background: ${(props) => props.theme.card.background};
  color: ${(props) => (props.red ? "#FF416E" : "#9D9D9D")};
  font-size: 21px;
  line-height: 25px;
`;

export const SlotCenter = styled.div`
  width: 100%;
  height: 28px;
  border-top: 0.5px solid #a4a6a6;
  border-bottom: 0.5px solid #a4a6a6;
  position: absolute;
  top: 42%;
  z-index: 999;
`;

export const Box = styled.div<{ sh?: boolean }>`
  background: ${(props) => props.theme.card.background};
  border: 1px solid rgba(86, 101, 127, 0.05);
  box-sizing: border-box;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  border-radius: 20px;
  padding: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-top: 20px;
  height: 100%;
  max-width: 460px;
  width: 100%;
  transition: 3s ease-in;
  @media (max-width: 1070px) {
    margin-top: 60px;
  }
`;

export const SlotTitle = styled.div`
  font-weight: normal;
  font-size: 36px;
  line-height: 42px;
  display: flex;
  align-items: center;
  letter-spacing: 0.1px;
  color: ${(props) => props.theme.text2};
  margin-bottom: 60px;
  @media (max-width: 950px) {
    margin-bottom: 20px;
  }
`;

export const Wrapper = styled.div`
  overflow: hidden;
  width: 320px;
  height: 180px;
  margin-bottom: 40px;
  position: relative;
  @media (max-width: 576px) {
    width: 260px;
  }
`;

export const Drum = styled.div`
  width: 320px;
  height: 180px;
  position: relative;
  font-family: sans-serif;
  position: relative;
  perspective: 0;
  transform-origin: 50% 50%;
  transition: 5s;
  transform-style: preserve-3d;
  @media (max-width: 576px) {
    width: 260px;
  }
`;

export const WinContainer = styled(Card)`
  max-width: 540px;
  padding: 40px;
  @media (max-width: 992px) {
    margin: 0 auto;
  }
  @media (max-width: 576px) {
    padding: 20px 10px;
    border: none;
    box-shadow: none;
  }
`;

export const WinTitle = styled.div<{ sub?: boolean }>`
  font-weight: ${(props) => (props.sub ? 400 : 500)};
  font-size: 36px;
  line-height: 42px;
  margin-bottom: ${(props) => (props.sub ? "17px" : "8px")};
  text-align: center;
  letter-spacing: 0.1px;
  color: ${(props) => (props.sub ? props.theme.text2 : "#FF416E")};
  @media (max-width: 576px) {
    font-size: ${(props) => (props.sub ? "28px" : "16px")};
    line-height: ${(props) => (props.sub ? "32px" : "19px")};
  }
`;

export const WinDesc = styled.div`
  color: ${(props) => props.theme.thHead};
  letter-spacing: 0.1px;
  font-weight: normal;
  text-align: center;
  font-size: 18px;
  line-height: 21px;
`;

export const WinBrand = styled.p`
  text-transform: uppercase;
  color: #ff416e;
  font-size: 18px;
  line-height: 21px;
`;

export const ModalCongratsWrap = styled.div`
  display: flex;
  justify-content: flex-start;
  position: relative;
  width: 100%;
  padding: 40px 50px;
  @media (max-width: 992px) {
    flex-direction: column;
    padding: 20px 10px;
    justify-content: center;
  }
`;

export const BrandImg = styled.div`
  width: 97px;
  margin: 0 80px 0 20px;
  @media (max-width: 992px) {
    margin-bottom: 20px;
  }
  @media (max-width: 768px) {
    margin-right: auto;
    margin-left: auto;
    margin-top: 10px;
    margin-bottom: 10px;
  }
`;

export const ModalButton = styled(Button)`
  margin: 37px auto 0;
`;

export const TimerHistoryInner = styled.div`
  margin-right: 80px;
  @media (max-width: 768px) {
    margin-right: 0px;
  }
`;

export const TimerHistoryValue = styled.div<{ nodata?: boolean }>`
  font-weight: 500;
  font-size: 36px;
  line-height: 42px;
  letter-spacing: 0.1px;
  color: #ff416e;
  ${(props) => {
    if (props.nodata) {
      return MyCss;
    }
  }}
  @media (max-width: 576px) {
    font-size: 25px;
    line-height: 29px;
  }
`;

export const TimerHisroryTitle = styled.div`
  font-weight: normal;
  font-size: 18px;
  line-height: 21px;
  letter-spacing: 0.1px;
  margin-bottom: 10px;
  @media (max-width: 576px) {
    font-size: 14px;
    line-height: 17px;
  }
`;

export const BrandImgAbs = styled(BrandImg)`
  position: absolute;
  top: 40px;
  left: 40px;
  @media (max-width: 768px) {
    top: 13px;
    left: 0;
    text-align: center;
    right: 0;
    width: 100%;
  }
`;
