import styled from 'styled-components/macro';

export const CheckboxIcon = styled.span<{ dis?: boolean }>`
  background: transparent;
  border: 1px solid #000;
  border-radius: 50%;
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
    content: '';
    height: 8px;
    left: 2px;
    position: absolute;
    top: 2px;
    margin: auto;
    border-radius: 50%;
    width: 8px;
    background: #fff;
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
    background: #0094ff;
  }
  &:checked ~ ${CheckboxIcon} {
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

export const CheckboxLabel = styled.div<{checked: boolean}>`
  font-weight: 500;
  font-size: 14px;
  line-height: 20px;
  color: ${props => props.checked ? '#0094FF' : '#000000'};
  margin-left: 10px;

  &:hover {
    color: ${props => props.checked ? '#0094FF' : '#52515F'};
  }
`;
