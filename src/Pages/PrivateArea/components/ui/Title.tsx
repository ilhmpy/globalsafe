import styled from 'styled-components/macro';

export const Title = styled.h3<{ small?: boolean; mB?: number; lH?: number;}>`
  font-weight: bold;
  font-size: ${(props) => (props.small ? 18 : 24)}px;
  line-height: ${(props) => (props.small ? 21 : props.lH ? props.lH : 38)}px;
  margin-bottom: ${ props => props.mB !== undefined ? `${props.mB}px` : '20px'};
  color: ${(props) => props.theme.v2.text};
`;
