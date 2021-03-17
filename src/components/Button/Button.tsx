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
  border-color: #0e0d3d;
  box-sizing: border-box;
  border-radius: 24px;
  margin-bottom: ${(props) => (props.mb ? "20px" : "0")};
  cursor: pointer;
  transition: all 0.3s ease 0s;
  -webkit-appearance: button;
  -moz-appearance: button;
  appearance: button;
  &:hover {
    box-shadow: 0px 4px 10px #0e0d3d;
    border-color: #0e0d3d;
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
      `;
    } else if (props.dangerOutline) {
      return `
      background: transparent;
      color: rgba(14, 13, 61, 1);
      border-color: #FF416E;
      &:hover{
        box-shadow: 0px 4px 10px #FF416E;
        border-color: #FF416E;
      }
      `;
    } else if (props.green) {
      return `
      background-color: #bcd476;
      color: #fff;
      border-color: #bcd476;
      min-width: 165px;
      &:hover{
        border-color: rgba(188, 212, 118, 0.7);
        box-shadow: 0px 4px 10px #bcd476;
        background-color: rgba(188, 212, 118, 0.7);
      }
     `;
    } else if (props.greenOutline) {
      return `
        background: transparent;
        color: rgba(14, 13, 61, 1);
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
      background-color: #ec87e2;
      color: #fff;
      border-color: #ec87e2;
      min-width: 165px;
      &:hover{
        box-shadow: 0px 4px 10px #ec87e2;
        border-color: rgba(236, 135, 226, .7);
        background-color: rgba(236, 135, 226, .7);
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
