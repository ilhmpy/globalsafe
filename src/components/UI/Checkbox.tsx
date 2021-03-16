import React, { FC, ReactElement, ChangeEvent } from "react";
import styled from "styled-components/macro";
import icon from "../../assets/svg/checkicon.svg";
import lockopen from "../../assets/svg/lockopen.svg";
import lockclose from "../../assets/svg/lockclose.svg";

type Props = {
  checked?: boolean;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  name?: string;
  value?: string;
  id?: string;
  icon?: boolean;
};

export const Checkbox: FC<Props> = (props: Props): ReactElement => {
  const { checked, onChange, icon, ...rest } = props;

  return (
    <LabelContainer>
      <CheckboxInput
        type="checkbox"
        checked={checked}
        onChange={onChange}
        icon={icon}
        {...rest}
      />
      <CheckboxIcon icon={icon} />
    </LabelContainer>
  );
};

export const CheckboxIcon = styled.span<{ icon?: boolean }>`
  background: transparent;
  border: 2px solid #ff416e;
  border-radius: 50%;
  display: block;
  height: 24px;
  width: 24px;
  left: 0;
  position: relative;
  top: 0;
  -webkit-transition: all 0.2s ease;
  -moz-transition: all 0.2s ease;
  -o-transition: all 0.2s ease;
  transition: all 0.2s ease;
  box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.2);
  &:after {
    content: "";
    left: 6px;
    position: absolute;
    top: 7px;
    width: 9px;
    height: 6px;
    ${(props) => {
      if (props.icon) {
        return `
        background: url(${lockclose}) no-repeat center;
        left: 5px;
        position: absolute;
        top: 3px;
        width: 10px;
        height: 13px;
        `;
      } else {
        return `
        background: url(${icon}) no-repeat center;
        background-size: cover;
        `;
      }
    }}

    transition-duration: 0.1s;
    transition-property: border-color;
    transition-timing-function: cubic-bezier(0.33, 0.96, 0.49, 1.01);
  }
  @media (max-width: 992px) {
    cursor: initial;
  }
`;

export const CheckboxInput = styled.input<{ icon?: boolean }>`
  cursor: pointer;
  height: 0;
  opacity: 0;
  position: absolute;
  width: 0;
  &:checked ~ ${CheckboxIcon} {
    ${(props) => {
      if (props.icon) {
        return `
        &:after{
          background: url(${lockopen}) no-repeat center;
        }
        
        border-color: #bcd476;
        `;
      } else {
        return `
        background: #bcd476;
        border-color: #bcd476;
        `;
      }
    }}
  }
  @media (max-width: 992px) {
    cursor: initial;
  }
`;

export const LabelContainer = styled.label`
  cursor: pointer;
  position: relative;
  height: 24px;
  width: 24px;
  display: inline-block;
  @media (max-width: 992px) {
    cursor: initial;
  }
`;
