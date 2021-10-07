import styled from 'styled-components/macro';

type Props = {
  size?: number;
  lH?: number;
  mB?: number;
  weight?: number;
  textGrey?: boolean;
  unone?: boolean;
  grey?: boolean;
  black?: boolean;
  error?: boolean;
};

export const Text = styled.p<Props>`
  font-weight: ${(props) => (props.weight ? props.weight : 'normal')};
  font-size: ${(props) => (props.size ? props.size : 0)}px;
  line-height: ${(props) => (props.lH ? props.lH : 16)}px;
  margin-bottom: ${(props) => (props.mB ? props.mB : 0)}px;
  user-select: ${(props) => (props.unone ? 'none' : 'text')};
  color: ${(props) => (props.black ? props.theme.black : props.error ? '#FF4A31' : '#000')};
`;
