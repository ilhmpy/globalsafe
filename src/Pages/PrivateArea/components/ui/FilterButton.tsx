import styled from 'styled-components';

export const FilterButton = styled.button<{ active?: boolean; big?: boolean; }>`
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
  margin: 0 10px 10px 9px;
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
`;
