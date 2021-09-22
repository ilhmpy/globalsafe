import styled from 'styled-components/macro';

export const H1 = styled.div`
  font-weight: 900;
  font-size: 96px;
  line-height: normal;
  margin-bottom: 40px;
  margin-right: auto;
  @media (max-width: 1060px) {
    font-size: calc(36px + 60 * ((100vw - 320px) / 740));
  }
`;

export const H2 = styled.h2<{ center?: boolean }>`
  font-weight: 500;
  font-size: 48px;
  line-height: 57px;
  text-align: left;
  margin-right: auto;
  margin-bottom: 30px;
  @media (max-width: 1060px) {
    font-size: calc(26px + 60 * ((100vw - 320px) / 740));
  }
  color: ${(props) => props.theme.titles};
  @media (max-width: 576px) {
    margin-bottom: 10px;
  }

  @media only screen and (max-device-width: 767px) {
    ${({ center }) => {
      if (center) {
        return `
          margin: 0 auto;
          margin-bottom: 1px;
          font-weight: 700;
          font-size: 18px;
        `;
      }
    }}
  }
`;
