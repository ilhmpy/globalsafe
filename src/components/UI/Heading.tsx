import styled from 'styled-components/macro';

export const H2 = styled.h2<{ center?: boolean; mb?: boolean; }>` 
  font-weight: 500;
  font-size: 48px;
  line-height: 56px;
  color: ${(props) => props.theme.v2.text};
  margin-bottom: 40px;
  @media (max-width: 870px) {
    font-size: 36px;
    line-height: 42px;
  }
  @media (max-width: 576px) {
    font-size: 18px;
    line-height: 21px;
    margin-bottom: 10px;
    font-weight: 700;
  }

  ${({ mb }) => {
    if (mb) {
      return `
        margin-bottom: 20px;
      `;
    };
  }}

  @media only screen and (max-device-width: 767px) {
    ${({ center }) => {
      if (center) {
        return `
          margin: 0 auto;
          text-align: center;
          margin-bottom: 20px;
          font-weight: 700;
          font-size: 18px;
        `;
      }
    }}
  }
`;


export const H3 = styled.h3<{ center?: boolean; }>`
  font-weight: 700;
  font-size: 24px;
  line-height: 28px;
  color: #3F3E4E;

  ${({ center }) => {
    if (center) {
      return `
        text-align: center;
        margin-top: 32px;
        margin-bottom: 32px;
      `;
    };
  }}
`;
