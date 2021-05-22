import styled, { css, keyframes } from "styled-components/macro";
import { ReactComponent as Close } from "../../../../assets/svg/close.svg";

export const CloseIcon = styled(Close)`
  position: absolute;
  cursor: pointer;
  right: 18px;
  top: 18px;
`;

export const TimerContainer = styled.div`
  position: relative;
  margin: 40px auto;
  background: rgba(255, 255, 255, 0.9);
  border: 1px solid rgba(86, 101, 127, 0.05);
  box-sizing: border-box;
  border-radius: 20px;
  padding: 24px;
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
  letter-spacing: 0.1px;
  color: #515172;
  margin-bottom: 10px;
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
  font-size: 36px;
  line-height: 42px;
  height: 42px;
  display: flex;
  align-items: center;
  letter-spacing: 0.1px;
  color: #ff416e;
  ${(props) => {
    if (props.nodata) {
      return MyCss;
    }
  }}
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
  svg {
    margin-right: 10px;
  }
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
  /* transition: all 10s ease-out; */
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
  margin: 40px auto;
  padding: 13px 0px 28px;
  height: 470px;
  @media (max-width: 992px) {
    height: auto;
  }
`;

export const ContainerItem = styled.div`
  width: 400px;
  margin: 0 30px;
  @media (max-width: 576px) {
    max-width: 260px;
    margin: 0 15px;
  }
`;

export const Inside = styled.div<{ red?: boolean }>`
  background: #fff;
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

export const Box = styled.div`
  background: #ffffff;
  border: 1px solid rgba(86, 101, 127, 0.05);
  box-sizing: border-box;
  border-radius: 20px;
  padding: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  max-width: 460px;
  width: 100%;
`;

export const SlotTitle = styled.div`
  font-weight: normal;
  font-size: 36px;
  line-height: 42px;
  display: flex;
  align-items: center;
  letter-spacing: 0.1px;
  color: #515172;
  margin-bottom: 40px;
`;

export const Wrapper = styled.div`
  overflow: hidden;
  width: 320px;
  height: 180px;
  position: relative;
  @media (max-width: 576px) {
    width: 300px;
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
    width: 300px;
  }
`;
