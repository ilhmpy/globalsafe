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
  color: #000000;
  width: 300px;
  font-weight: 500;
  &:focus {
    outline: none;
  }
  &::placeholder {
    color: rgba(0, 0, 0, 0.4);
  }
  @media (max-width: 768px) {
    width: 100%;
  }
`;
