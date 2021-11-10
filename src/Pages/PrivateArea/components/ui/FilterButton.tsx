import styled from 'styled-components';
import { Device } from '../../consts';

interface FilterButtonProps {
  active?: boolean;
  smHalfWidth?: boolean;
  switchLeft?: boolean;
  switchRight?: boolean;
  wFull?: boolean;
  noMargin?: boolean;
  big?: boolean;
}
export const FilterButton = styled.button<FilterButtonProps>`
  height: 26px;
  appearance: none;
  cursor: pointer;
  font-size: 12px;
  line-height: 12px;
  padding: 6px 10px;
  font-family: 'Roboto', sans-serif;
  color: ${(props) => (props.active ? '#000' : 'rgba(0, 0, 0, .6)')};
  border: 1px solid ${(props) => (props.active ? '#EBEBF2' : '#DFDFE9')};
  box-sizing: border-box;
  border-radius: 2px;
  user-select: none;
  background: ${(props) => (props.active ? '#EBEBF2' : 'rgba(0, 0, 0, 0)')};
  margin: ${(props) => (props.noMargin ? '0' : '0 10px 10px 9px')};
  &:first-child {
    margin-left: 0;
  }
  width: ${(props) => (props.wFull ? '100%' : 'auto')};
  transition: all 0.3s ease 0s;

  margin-right: ${(props) => (props.switchLeft ? 0 : '10px')};
  margin-left: ${(props) => (props.switchRight ? 0 : '9px')};
  border-left-width: ${(props) => (props.switchRight ? '0px' : '1px')};

  @media ${Device.desktop} {
    &:hover {
      color: rgba(0, 0, 0, .8);
      background: rgba(0, 0, 0, 0);
      border-color: #C9C9D2;
    }
  }

  @media ${Device.mobile} {
    width: ${(props) => (props.smHalfWidth ? '50%' : props.wFull ? '100%' : 'auto')};
  }
  ${(props) => {
    if (props.big) {
      return `
        width: 50%;
        font-weight: 400;
        height: 26px;
        min-width: 140px;
      `;
    }
  }}
`;
