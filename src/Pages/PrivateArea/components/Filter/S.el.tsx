import styled from 'styled-components/macro';

export const Container = styled.div<{ without?: boolean; fullWidth?: boolean }>`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
  @media (max-width: 768px) {
    width: ${(props) => (props.fullWidth ? '100%' : 'auto')};
  }

  ${({ without }) => {
    if (without) {
      return `
        margin-bottom: 0px;
      `;
    }
  }}
`;

export const Button = styled.button<{ active?: boolean; btnsFullWidth?: boolean }>`
  appearance: none;
  cursor: pointer;
  font-size: 12px;
  line-height: 14px;
  padding: 6px 10px;
  font-family: 'Roboto', sans-serif;
  color: ${(props) => (props.active ? props.theme.lkMain.activeChip : props.theme.lkMain.chip)};
  border: 1px solid ${(props) => (props.active ? '#EBEBF2' : '#DFDFE9')};
  border: 1px solid
    ${(props) =>
      props.active ? props.theme.lkMain.activeChipBorder : props.theme.lkMain.chipBorder};
  box-sizing: border-box;
  border-radius: 2px;
  user-select: none;
  background: ${(props) => (props.active ? props.theme.lkMain.activeChipBckgr : 'transparent')};
  white-space: nowrap;
  @media (max-width: 768px) {
    width: ${(props) => (props.btnsFullWidth ? '100%' : 'auto')};
  }
`;

export const Buttons = styled.div`
  display: flex;
  ${Button} {
    margin-right: 10px;
    @media (max-width: 1024px) {
      margin-right: -1px;
    }
    &:last-child {
      margin-right: 0;
    }
  }
`;

export const FilterTypeList = styled.div`
  margin-right: 10px;
  cursor: pointer;
`;

export const FilterTypeTile = styled.div`
  cursor: pointer;
`;

export const FilterTypes = styled.div`
  display: flex;
  align-items: center;
`;
