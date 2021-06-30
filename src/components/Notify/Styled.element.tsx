import styled from "styled-components/macro";

export const Container = styled.div`
  position: fixed;
  width: 100%;
  max-width: 500px;
  right: 0;
  bottom: 0;
  z-index: 999;
`;

export const ContainerInner = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const Notification = styled.div<{ error?: boolean }>`
  margin-bottom: 10px;
  box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
  background: ${(props) => props.theme.card.background};
  position: relative;
  &:before {
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    width: 10px;
    content: "";
    background: ${(props) =>
      props.error ? "rgba(237, 76, 92, 0.8)" : "rgba(188, 212, 118, .8)"};
    border-radius: 8px 0px 0px 8px;
  }
`;

export const NotificationInner = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 9px 20px 9px 45px;
`;

export const Text = styled.div`
  font-size: 14px;
  line-height: 16px;
  display: flex;
  align-items: center;
  letter-spacing: 0.1px;
  color: #515172;
`;

export const CountContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  margin: auto;
  height: 30px;
  width: 30px;
`;

export const CountValue = styled.p<{ strokeColor: string }>`
  color: ${(props) => props.strokeColor};
  font-size: 12px;
  padding-top: 7px;
  padding-left: 5px;
`;

export const Svg = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  margin: 0 auto;
  transform: rotateY(-180deg) rotateZ(-90deg);
  overflow: visible;
`;
