import styled from 'styled-components/macro';

export const Page = styled.div<{ margin?: boolean; abs?: boolean; smallPad?: boolean }>`
  padding-bottom: ${(props) => (props.smallPad ? 40 : 60)}px;
  @media (max-width: 992px) {
    padding-bottom: ${(props) => (props.smallPad ? 20 : 40)}px;
  }
  ${({ margin }) => {
    if (margin) {
      return `
        margin-bottom: 120px;
      `;
    }
  }}
  @media (max-width: 767px) {
    padding-bottom: 20px;
  }
  /* @media (max-width: 576px) {
    margin-top: 30px;
  } */
  @media only screen and (max-device-width: 767px) {
    position: relative;
  }
`;
