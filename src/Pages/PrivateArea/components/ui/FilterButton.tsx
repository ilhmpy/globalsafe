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
  background: ${(props) => (props.active ? '#EBEBF2' : 'transparent')};
  margin: ${props => props.noMargin ? '0' : '0 10px 10px 9px'};
  &:first-child {
    margin-left: 0;
  }
  ${({ big }) => {
    if (big) {
      return `
        width: 50%;
        font-weight: 400;
        height: 26px;
        min-width: 140px;
      `;
    };
  }}
  ${({ switchLeft, wFull, switchRight }) => {
    if (switchLeft) {
      return `
        margin-right: ${switchLeft ? 0 : '10px'};
      `;
    };
    if (wFull) {
      return `
        width: ${wFull ? '100%' : 'auto'};
      `;
    };
    if (switchRight) {
      return `
        margin-left: ${switchRight ? 0 : '9px'};
        border-left-width: ${switchRight ? '0px' : '1px'};
      `;
    };
  }}
  @media ${Device.mobile} {
    width ${props => props.smHalfWidth ? '50%' : props.wFull ? '100%' : 'auto'}
  };
`;
