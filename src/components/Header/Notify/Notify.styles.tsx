import styled, { keyframes } from 'styled-components/macro';
import { ReactComponent as Done } from '../../../assets/svg/done.svg';

export const BallContainer = styled.div<{ notChecked: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 95px;
  position: relative;
  & > svg {
    cursor: pointer;
  }
  &::before {
    content: '';
    display: ${({ notChecked }) => (notChecked ? 'block' : 'none')};
    width: 5px;
    height: 5px;
    border-radius: 50%;
    background: #ff4a31;
    position: absolute;
    margin-left: 17px;
    margin-top: -15px;
  }
  @media (max-width: 768px) {
    margin-right: 45px;
    width: 50px;
  }
  @media only screen and (max-device-width: 330px) {
    width: 35px;
  }
`;

export const NotifiesBlock = styled.div<{
  block: boolean;
  auth?: boolean;
  admin?: boolean;
  empty: boolean;
  load: boolean;
  inPA?: boolean;
}>`
  width: 80%;
  max-width: 420px;
  height: ${({ empty }) => (empty ? '80px' : '584px')};
  ${({ load }) => {
    if (load) {
      return `
                height: 230px;  
            `;
    }
  }}
  background: #fff;
  border-radius: 4px;
  position: absolute;
  transition: 0.3s;
  ${({ admin }) => {
    if (admin) {
      return `
            right: 140px;
            @media only screen and (max-device-width: 767px) {
                right: 0px;
            }
            `;
    }
    if (!admin) {
      return `
            right: 48px;
            @media only screen and (max-device-width: 767px) {
                right: 0px;
            }
            `;
    }
  }}
  top: ${({ block }) => (block ? '50px' : '1200px')};
  @media only screen and (max-device-width: 1024px) {
    top: ${({ block }) => (block ? '50px' : '8000px')};
  }
  border: 1px solid #dcdce8;
  z-index: 0;
  background: #fff;
  box-shadow: 0px 40px 40px -40px rgba(220, 220, 232, 0.5);
  padding: 20px 8px 1px 0px;
  &::before {
    content: '';
    width: 14px;
    height: 14px;
    background: #fff;
    display: block;
    border-radius: 3px;
    border-bottom-left-radius: 0px;
    border-top-right-radius: 0px;
    transform: rotate(45deg);
    position: absolute;
    right: 0;
    left: 0;
    top: -8px;
    border-top: 1px solid #dcdce8;
    border-left: 1px solid #dcdce8;
    margin: auto;
    @media only screen and (min-device-width: 481px) and (max-device-width: 1024px) {
      right: 125px;
    }
  }
  & > .scrollbars > div {
    right: -1px !important;
  }
  @media only screen and (min-device-width: 481px) and (max-device-width: 1024px) {
    right: 0;
  }
`;

export const Notify = styled.div<{
  notChecked: boolean;
  empty?: boolean;
  click?: boolean;
  notclb?: boolean;
}>`
  width: 100%;
  background: #f9fafb;
  margin-bottom: 10px;
  padding: 10px;
  padding-left: 29px;
  position: relative;
  cursor: pointer;
  transition: 0.5s;
  ${({ click }) => {
    if (click) {
      return `
                opacity: 10%;
            `;
    }
    if (click === false) {
      return `
                display: none;
            `;
    }
  }}
  &::before {
    content: '';
    display: ${({ notChecked }) => (notChecked ? 'block' : 'none')};
    background: #ff4a31;
    width: 5px;
    height: 5px;
    border-radius: 50%;
    left: 12px;
    top: 17px;
    position: absolute;
  }
  ${({ empty }) => {
    if (empty) {
      return `
                height: 40px;
                margin-bottom: 10px;
                display: flex;
                align-items: center;
            `;
    }
  }}
  ${({ notclb }) => {
    if (notclb) {
      return `
                cursor: initial;  
            `;
    }
  }}
`;

export const NotifyItem = styled.h3<{
  grey?: boolean;
  bold?: boolean;
  link?: string;
  notclb?: boolean;
}>`
  font-weight: 400;
  font-size: 12px;
  line-height: 20px;
  color: #3f3e4e;
  & > a {
    color: inherit;
    line-height: inherit;
    font-size: inherit;
    font-weight: inherit;
    ${({ link }) => {
      if (link == '0') {
        return `
                    pointer-events: none; 
                    cursor: default;
                `;
      }
    }}
  }
  margin-bottom: 4px;
  max-width: 360px;
  word-wrap: break-word;
  &:last-child {
    margin-bottom: 0px;
  }
  ${({ grey, bold }) => {
    if (grey) {
      return `
               opacity: 60%;
            `;
    }
    if (bold) {
      return `
                font-weight: 700;
            `;
    }
  }}

  ${({ notclb }) => {
    if (notclb) {
      return `
                cursor: initial;
            `;
    }
  }}
`;

export const Scrollbar = styled.div`
  width: 3px !important;
  height: 203px !important;
  background: #93a1c1;
  border-radius: 2px;
`;

export const DoneNotify = styled(Done)`
  margin: 10px 0px 0px 0px;
`;
