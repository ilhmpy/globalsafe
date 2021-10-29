import styled from 'styled-components/macro';

export const Page = styled.div<{
  margin?: boolean;
  abs?: boolean;
  smallPad?: boolean;
  pBottom?: boolean;
}>`
  padding-top: ${(props) => (props.smallPad ? 40 : 60)}px;
  padding-bottom: ${(props) => (props.pBottom ? 60 : 0)}px;
  @media (max-width: 992px) {
    padding-top: ${(props) => (props.smallPad ? 20 : 40)}px;
    padding-bottom: ${(props) => (props.pBottom ? 40 : 0)}px;
  }
  ${({ margin }) => {
    if (margin) {
      return `
        margin-bottom: 120px;
      `;
    }
  }}
  @media (max-width: 767px) {
    padding-top: 20px;
  }

  @media only screen and (max-device-width: 767px) {
    position: relative;
  }

  @media only screen and (max-device-width: 480px) {
    ${({ abs }) => {
      if (abs) {
        return `
          & > * {
            padding-right: 0px;
            padding-left: 0px;
          }
        `;
      };
    }}
  }
`;
