import styled from 'styled-components/macro';

export const LeftSide = styled.div<{ bg?: string }>`
  width: 360px;
  flex: none;
  padding: 40px;
  background: ${(props) => (props.bg ? props.bg : '#ebebf2')};
  @media (max-width: 992px) {
    max-width: 310px;
    width: 100%;
    padding: 40px 35px;
  }
  @media (max-width: 576px) {
    width: 100%;
    padding: 20px;
  }
  /* @media only screen and (min-device-width: 768px) and (max-device-width: 1024px) {
    width: 33%;
    padding-left: 35px;
    padding-right: 35px;
  } */
`;
