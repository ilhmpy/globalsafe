import styled from "styled-components/macro";

export const Page = styled.div<{ margin?: boolean; abs?: boolean; }>`
  padding-top: 100px;
  @media (max-width: 992px) {
    padding-top: 75px;
  }
  ${({ margin }) => {
    if (margin) {
      return `
        margin-bottom: 120px;
      `;
    };
  }}
  /* @media (max-width: 768px) {
    margin-top: 60px;
  } */
  /* @media (max-width: 576px) {
    margin-top: 30px;
  } */
  @media only screen and (max-device-width: 767px) {
    position: relative;
  }
`;
