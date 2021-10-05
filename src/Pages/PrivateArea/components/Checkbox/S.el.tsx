import styled from 'styled-components/macro';

export const CheckboxIcon = styled.span<{ dis?: boolean }>`
  background: transparent;
  border: 1px solid #000;
  border-radius: 3px;
  display: block;
  height: 14px;
  width: 14px;
  left: 0;
  position: relative;
  top: 0;
  transition: all 0.2s ease;
  ${(props) => {
    if (props.dis) {
      return `
      border: 1px solid rgba(0, 0, 0, 0.2);
      box-sizing: border-box;
      border-radius: 2px;
      `;
    }
  }}
  &:after {
    border-color: transparent;
    border-style: solid;
    border-width: 0 1px 1px 0;
    content: '';
    height: 8px;
    left: 4px;
    position: absolute;
    top: 0px;
    transform: rotate(45deg);
    width: 4px;
    transition-duration: 0.1s;
    transition-property: border-color;
    transition-timing-function: cubic-bezier(0.33, 0.96, 0.49, 1.01);
  }
`;

export const CheckboxInput = styled.input`
  cursor: pointer;
  height: 0;
  opacity: 0;
  position: absolute;
  width: 0;
  &:checked ~ ${CheckboxIcon}:after {
    border-color: #fff;
  }
  &:checked ~ ${CheckboxIcon} {
    background: #0094ff;
    border-color: #0094ff;
  }
`;

export const LabelContainer = styled.label`
  align-items: center;
  cursor: pointer;
  display: flex;
  position: relative;
  width: 100%;
  user-select: none;
`;
