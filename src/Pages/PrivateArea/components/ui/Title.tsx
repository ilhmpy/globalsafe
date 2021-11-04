import styled, { css } from 'styled-components';
import { Device } from '../../consts';

interface TitleProps {
  small?: boolean;
  mB?: number;
  lH?: number;
  main?: boolean;
  mbMobile?: number;
  heading2?: boolean;
  heading3?: boolean;
  fS?: number;
  fW?: number;
}

const Heading2 = css`
  font-size: 18px;
  line-height: 21px;
  font-weight: 900;
`;

const Heading3 = css`
  font-weight: 500;
  font-size: 14px;
  line-height: 20px;
  color: ${(props) => props.theme.black};
`;

export const Title = styled.h3<TitleProps>`
  font-weight: bold;
  font-size: ${(props) => (props.small ? 18 : 24)}px;
  line-height: ${(props) => (props.small ? 21 : props.lH ? props.lH : 38)}px;
  font-weight: bold;
  margin-bottom: ${(props) => (props.mB !== undefined ? `${props.mB}px` : '20px')};
  color: ${(props) => props.theme.v2.text};
  @media only screen and (min-device-width: 768px) and (max-device-width: 1024px) {
    font-size: 24px;
  }
  @media only screen and (max-device-width: 480px) {
    font-size: 14px;
    font-weight: 500;
  }
  ${({ main }) => {
    if (main) {
      return `
        font-size: 24px;
        @media only screen and (min-device-width: 481px) and (max-device-width: 1024px)  {
          font-size: 24px;
        }
        @media only screen and (max-device-width: 480px) {
          font-weight: 900;
          font-size: 18px;
        }
      `;
    }
  }}
  ${({ fS }) => {
    if (fS) {
      return `
        font-size: ${fS}px;
        @media only screen and (max-device-width: 3000px) {
          font-size: ${fS}px;
        }
      `;
    }
  }}
  ${({ fW }) => {
    if (fW) {
      return `
        font-weight: ${fW};
        @media only screen and (max-device-width: 3000px) {
          font-weight: ${fW};
        }
      `;
    }
  }};
  @media ${Device.mobile} {
    ${(props) => props.heading2 && Heading2};
    ${(props) => props.heading3 && Heading3};
    ${(props) =>
      props.mbMobile !== undefined &&
      css`
        margin-bottom: ${props.mbMobile}px;
      `};
  } ;
`;
