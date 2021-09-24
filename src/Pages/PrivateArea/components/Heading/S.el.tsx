import styled from 'styled-components/macro';

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
`;

export const Title = styled.h3`
  font-weight: bold;
  font-size: 24px;
  line-height: 38px;
  color: ${(props) => props.theme.v2.text};
`;
