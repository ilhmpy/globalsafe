import styled from 'styled-components/macro';

export const Container = styled.div<{ without?: boolean; }>`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;

  ${({ without }) => {
    if (without) {
      return `
        margin-bottom: 0px;
      `;
    };
  }}
`;

export const Button = styled.button<{ active?: boolean }>`
  appearance: none;
  cursor: pointer;
  font-size: 12px;
  line-height: 14px;
  padding: 6px 10px;
  font-family: 'Roboto', sans-serif;
  color: ${(props) => (props.active ? '#000' : 'rgba(0, 0, 0, .6)')};
  border: 1px solid ${(props) => (props.active ? '#EBEBF2' : '#DFDFE9')};
  box-sizing: border-box;
  border-radius: 2px;
  user-select: none;
  background: ${(props) => (props.active ? '#EBEBF2' : 'transparent')};
  transition: 0.5s;
`;

export const Buttons = styled.div`
  display: flex;
  ${Button} {
    margin-right: 10px;
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
