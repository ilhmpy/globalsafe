import styled from 'styled-components/macro';

export const Field = styled.input`
  background: #f9fafb;
  border: 1px solid #edf0f7;
  box-sizing: border-box;
  border-radius: 4px;
  padding: 12px;
  font-size: 14px;
  line-height: 16px;
  font-family: 'Roboto', sans-serif;
  color: ${(props) => props.theme.lkMain.navLink};
  width: 300px;
  font-weight: 500;
  background: ${(props) => props.theme.lkMain.selectBack};
  border: ${(props) => props.theme.lkMain.selectBorder};
  &:focus {
    outline: none;
  }
  &::placeholder {
    color: ${(props) => props.theme.lkMain.inputPlaceholder};
  }
  @media (max-width: 768px) {
    width: 100%;
  }
`;
