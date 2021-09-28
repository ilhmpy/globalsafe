import styled from 'styled-components/macro';

export const Title = styled.h3<{ small?: boolean }>`
  font-weight: bold;
  font-size: ${(props) => (props.small ? 18 : 24)}px;
  line-height: ${(props) => (props.small ? 21 : 38)}px;
  margin-bottom: 20px;
  color: ${(props) => props.theme.v2.text};
`;
