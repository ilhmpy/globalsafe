import styled from 'styled-components/macro';

export const Title = styled.h3<{ small?: boolean; mB?: number; lH?: number; main?: boolean; }>`
  font-weight: bold;
  font-size: ${(props) => (props.small ? 18 : 24)}px;
  line-height: ${(props) => (props.small ? 21 : props.lH ? props.lH : 38)}px;
  margin-bottom: ${ props => props.mB !== undefined ? `${props.mB}px` : '20px'};
  color: ${(props) => props.theme.v2.text};
  @media only screen and (min-device-width: 481px) and (max-device-width: 1024px) {
    font-size: 18px;
  }
  ${({ main }) => { 
    if (main) {
      return `
        font-size: 24px;
        @media only screen and (min-device-width: 481px) and (max-device-width: 1024px)  {
          font-size: 24px;
        }
      `;
    };
  }}
`;
