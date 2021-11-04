import styled from 'styled-components';

export const Name = styled.div`
  font-weight: bold;
  font-size: 24px;
  line-height: 28px;
  color: ${(props) => props.theme.v2.text};
  margin-bottom: 10px;

  @media (max-width: 768px) {
    font-size: 16px;
    line-height: 20px;
  }
`;
