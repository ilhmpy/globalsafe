import styled, { css } from 'styled-components/macro';
import { Device } from '../../consts';

type Props = {
  size?: number;
  lH?: number;
  mB?: number;
  mL?: number;
  weight?: number;
  textGrey?: boolean;
  unone?: boolean;
  grey?: boolean;
  black?: boolean;
  error?: boolean;
  smHidden?: boolean;
  sizeMobile?: number;
  lHMobile?: number;
  mBMobile?: number;
  weightMobile?: number;
  center?: boolean;
  detail?: boolean;
  phoneFWB?: boolean;
  publish?: boolean;
};

export const Text = styled.p<Props>`
  font-weight: ${(props) => (props.weight ? props.weight : 'normal')};
  font-size: ${(props) => (props.size ? props.size : 0)}px;
  line-height: ${(props) => (props.lH ? props.lH : 16)}px;
  margin-bottom: ${(props) => (props.mB ? props.mB : 0)}px;
  margin-left: ${(props) => (props.mL ? props.mL : 0)}px;
  user-select: ${(props) => (props.unone ? 'none' : 'text')};
  color: ${(props) => (props.black ? props.theme.black : props.error ? '#FF4A31' : '#000')};
  line-break: anywhere;
  @media only screen and (max-device-width: 480px) {
    margin-bottom: 4px;
    font-size: 14px;
    font-weight: 300;
  }
  @media ${Device.mobile} {
    display: ${props => props.smHidden ? 'none' : 'block'};
    ${props => props.sizeMobile && css`font-size: ${props.sizeMobile}px`};
    ${props => props.lHMobile && css`line-height: ${props.lHMobile}px`};
    ${props => props.mBMobile && css`margin-bottom: ${props.mBMobile}px`};
    ${props => props.weightMobile && css`font-weight: ${props.weightMobile}`};
  };
  ${({ center }) => {
    if (center) {
      return `
        text-align: center;
        font-weight: 400;
        font-size: 12px;
        line-height: 14px;
        margin-bottom: 20px;
        margin-top: 0;
      `;
    };
  }}
  ${({ detail }) => {
    if (detail) {
      return `
        font-size: 12px;
        font-weight: 300;
        margin-bottom: 20px;
      `;
    };
  }}
  ${({ publish }) => {
    if (publish) {
      return `
        margin-bottom: 20px !important;
        font-weight: 400 !important;
      `;
    };
  }}
  ${({ phoneFWB }) => {
    if (phoneFWB) {
      return `
        @media only screen and (max-device-width: 480px) {
          font-weight: 500;
        }
      `;
    };
  }}
`;
