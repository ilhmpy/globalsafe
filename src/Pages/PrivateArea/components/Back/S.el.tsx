import styled from 'styled-components/macro';

export const GoBack = styled.div`
  display: flex;
  align-items: center;

  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 16px;
  display: flex;
  align-items: center;
  cursor: pointer;
  color: ${props => props.theme.v2.blackText};
`;

export const Container = styled.div`
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  line-height: 16px;
  color: ${props => props.theme.v2.blackText};
  svg {
    margin-right: 10px;
  }
`;
