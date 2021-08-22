import Switch from 'react-switch';
import styled from 'styled-components';

export const SwitcherUI = styled(Switch)<{ checked: boolean }>`
  > div.react-switch-bg {
    background: ${(props) => (props.checked ? '#DBE7F1 !important' : '#ff416e !important')};
    height: 18px !important;
    width: 28px !important;
  }
  > div.react-switch-handle {
    box-shadow: 0px 3px 8px rgba(0, 0, 0, 0.15), 0px 3px 1px rgba(0, 0, 0, 0.06) !important;
    height: 16px !important;
    width: 16px !important;
    top: 1px !important;
    left: 1px !important;
    transform: ${(props) =>
      props.checked ? 'translateX(0px) !important' : 'translateX(10px) !important'};
  }
`;
 