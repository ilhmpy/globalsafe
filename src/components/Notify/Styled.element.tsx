import styled from 'styled-components/macro';

export const Container = styled.div`
  margin: 0px 33px 0 0;
  position: sticky;
  width: 100%;
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
  opacity: 80%;
  background: ${(props) => props.error ? '#ED4C5C' : '#BCD476'};
  position: relative;
`;

export const NotificationInner = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 9px 20px 9px 30px;
`;

export const Text = styled.div<{ error?: boolean; }>`
  font-size: 14px;
  line-height: 16px;
  display: flex;
  color: ${({ error }) => error ? "#fff" : "#0E0D3D"};
  font-weight: 500;
  align-items: center;
  letter-spacing: 0.1px;
  margin-top: 3px;
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
  color: #fff;
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
