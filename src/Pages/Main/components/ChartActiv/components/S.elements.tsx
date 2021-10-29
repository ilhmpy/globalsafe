import styled from 'styled-components/macro';
import { ReactComponent as ArrowIcon } from '../../../../../assets/v2/svg/arrow.svg';

export const Actions = styled.div`
  display: flex;
  align-items: center;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  padding: 15px 0;
  z-index: 9;
  user-select: none;
`;

export const ActionMenu = styled.ul<{ open?: boolean }>`
  position: absolute;
  list-style: none;
  top: 30px;
  left: 0;
  right: 0;
  margin: 0 auto;
  padding: 13px 0;
  background: #fff;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.2);
  border-radius: 0px 0px 5px 5px;
  max-height: ${(props) => (props.open ? '300px' : 0)};
  opacity: ${(props) => (props.open ? 1 : 0)};
  z-index: 99999;
  pointer-events: ${(props) => (props.open ? 'auto' : 'none')};
`;

export const ActionMenuDate = styled(ActionMenu)`
  padding: 0;
  font-size: 0;
  max-height: 234px;
`;

export const ActionMenuItem = styled.li`
  padding: 14px 16px;
  max-width: 100vw;
  text-decoration: none;
  display: flex;
  /* align-items: center; */
  text-align: left;
  &:hover {
    background: rgba(90, 143, 213, 0.15);
  }
  &:focus {
    outline: none;
  }
`;

export const ActionItem = styled.div<{ mN?: boolean }>`
  display: flex;
  align-items: center;
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
  font-size: 14px;
  line-height: 16px;
  position: relative;
  margin-bottom: 8px;

  &:focus {
    outline: none;
  }
  /* &:focus ${ActionMenu}, &:active ${ActionMenu}, &:focus {
    opacity: 1;
    outline: none;
    max-height: 500px;
    pointer-events: auto;
  } */
  ${(props) => {
    if (props.mN) {
      return `
        margin: 0;
      `;
    }
  }}
`;

export const Head = styled.div<{ blue?: boolean }>`
  font-weight: ${(props) => (props.blue ? 500 : 400)};
  position: relative;
  font-size: 12px;
  color: #fff;
  &:focus {
    outline: none;
  }
`;

export const Header = styled.div`
  background: #0094ff;
  border-radius: 4px;
  display: flex;
  align-items: center;
  padding: 5px 10px;
  min-width: 75px;
  justify-content: space-between;
`;

export const Arrow = styled(ArrowIcon)`
  width: 8px;
  height: 4px;
  margin-left: 6px;
`;

export const Reset = styled.span`
  padding-left: 6px;
  cursor: pointer;
  position: absolute;
  right: 8px;
  line-height: 1;
  top: 0;
  z-index: 999;
`;

export const DateWrap = styled.div`
  position: relative;
`;
