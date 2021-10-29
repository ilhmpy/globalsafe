import styled from 'styled-components/macro';

export const LeftSide = styled.div<{ bg?: string }>`
  width: 360px;
  flex: none;
  padding: 40px;
  background: ${(props) => (props.bg ? props.bg : '#ebebf2')};
  @media (max-width: 992px) {
    width: 310px;
  }
  @media (max-width: 768px) {
    width: 100%;
  }
  @media only screen and (min-device-width: 768px) and (max-device-width: 1024px) {
    width: 33%;
    padding-left: 35px;
    padding-right: 35px;
  }
`;
