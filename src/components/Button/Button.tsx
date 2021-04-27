import styled from "styled-components/macro";

type Props = {
  danger?: boolean;
  primary?: boolean;
  dangerOutline?: boolean;
  greenOutline?: boolean;
  green?: boolean;
  blue?: boolean;
  red?: boolean;
  pink?: boolean;
  purple?: boolean;
  yellow?: boolean;
  aqua?: boolean;
  avocado?: boolean;
  mb?: boolean;
};

export const Button = styled.a<Props>`
  padding: 12px 24px;
  max-width: 180px;
  font-weight: 500;
  font-size: 14px;
  line-height: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  border: 1px solid;
  border-color: ${(props) => props.theme.buttonBorder};
  box-sizing: border-box;
  border-radius: 24px;
  margin-bottom: ${(props) => (props.mb ? "20px" : "0")};
  cursor: pointer;
  transition: all 0.3s ease 0s;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  &:hover {
    box-shadow: 0px 4px 10px ${(props) => props.theme.buttonBorder};
    border-color: ${(props) => props.theme.buttonBorder};
  }
  &:focus,
  &:active {
    outline: none;
    border-radius: 24px;
    background: inherit;
  }
  ${(props) => {
    if (props.danger) {
      return `
      background: #FF416E;
      color: #fff;
      border-color: #FF416E;
      min-width: 165px;
      &:hover,
      &:focus{
        outline: none;
        background: #FF416E;
        border-color: #FF416E;
        box-shadow: 0px 4px 10px #FF416E;
      }
      &:disabled {
        background: rgba(14, 13, 61, .2);
        box-shadow: none;
        color: #fff ;
        border-color: rgba(14, 13, 61, .1);
        outline: none;
      }
      @media (max-width: 768px){
        font-weight: 400;
      }
      `;
    } else if (props.dangerOutline) {
      return `
      background: transparent;
      color:  ${(props: any) => props.theme.text};
      border-color: #FF416E;
      &:hover{
        box-shadow: 0px 4px 10px #FF416E;
        border-color: #FF416E;
      }
      `;
    } else if (props.green) {
      return `
      background-color: #bcd576;
      color: #fff;
      border-color: #bcd576;
      min-width: 165px;
      &:hover{
        border-color: rgba(188, 212, 118, 0.7);
        box-shadow: 0px 4px 10px #bcd476;
        background-color: rgba(188, 212, 118, 0.7);
      }
     `;
    } else if (props.avocado) {
      return `
      background-color: #78EBD6;
      color: #fff;
      border-color: #78EBD6;
      box-shadow: 0px 20px 30px -10px rgba(167, 140, 242, 0.3);
      min-width: 165px;
      &:hover{
        border-color: rgba(120,235,214, 0.7);
        box-shadow: 0px 4px 10px #78EBD6;
        background-color: rgba(120,235,214, 0.7);
      }
     `;
    } else if (props.aqua) {
      return `
      background-color: #84DDF9;;
      color: #fff;
      border-color: #84DDF9;;
      box-shadow: 0px 20px 30px -10px rgba(242, 140, 232, 0.3);
      min-width: 165px;
      &:hover{
        border-color: rgba(132,221,249, 0.7);
        box-shadow: 0px 4px 10px #84DDF9;;
        background-color: rgba(132,221,249, 0.7);
      }
     `;
    } else if (props.greenOutline) {
      return `
        background: transparent;
        color:  ${(props: any) => props.theme.text};
        border-color: #BCD476;
        &:hover{
        border-color: rgba(188,212,118, 0.7);
        box-shadow: 0px 4px 10px #bcd476;
      }
        `;
    } else if (props.blue) {
      return `
      background-color: #6db9ff;
      color: #fff;
      border-color: #6db9ff;
      min-width: 165px;
      &:hover{
        box-shadow: 0px 4px 10px #6db9ff;
        border-color: rgba(109, 185, 255, 0.7);
        background-color:rgba(109, 185, 255, 0.7);
      }
      &:active,
      &:focus{
        background:rgba(109, 185, 255, 0.7) !important;
      }
      &:disabled{
        background: #ccc;
        border-color: #ccc;
        box-shadow: none;
      }
      `;
    } else if (props.red) {
      return `
      background-color: #ff416e;
      color: #fff;
      border-color: #ff416e;
      min-width: 165px;
      &:hover{
        box-shadow: 0px 4px 10px #ff416e;
        border-color: rgba(255, 65, 110, 0.7);
        background-color: rgba(255, 65, 110, 0.7);
      }
      `;
    } else if (props.pink) {
      return `
      background-color: #F28CE8;
      color: #fff;
      border-color: #F28CE8;
      min-width: 165px;
      &:hover{
        box-shadow: 0px 4px 10px #F28CE8;
        border-color: rgba(242,140,232, .7);
        background-color: rgba(242,140,232, .7);
      }
      `;
    } else if (props.purple) {
      return `
      background-color: #A78CF2;
      color: #fff;
      border-color: #A78CF2;
      min-width: 165px;
      &:hover{
        box-shadow: 0px 4px 10px #A78CF2;
        border-color: rgba(167, 140, 242, .7);
        background-color: rgba(167, 140, 242, .7);
      }
      `;
    } else if (props.yellow) {
      return `
      background-color: #FFB23E;
      color: #fff;
      border-color: #FFB23E;
      min-width: 165px;
      &:hover{
        box-shadow: 0px 4px 10px #FFB23E;
        border-color: rgba(255, 178, 62, .7);
        background-color: rgba(255, 178, 62, .7);
      }
      `;
    }
  }}
  @media (max-width: 992px) {
    padding-left: 3px;
    padding-right: 3px;
  }
  @media (max-width: 768px) {
    cursor: initial;
  }
`;
