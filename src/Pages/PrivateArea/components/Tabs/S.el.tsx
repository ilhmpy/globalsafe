import styled from 'styled-components/macro';
import { animated } from 'react-spring';

export const TabBar = styled.div`
  display: flex;
  position: relative;
  padding-bottom: 3px;
  border: 1px solid green;
`;

export const Tab = styled.div`
  margin: 5px;
  padding: 10px;
  cursor: pointer;
`;

export const Underline = styled(animated.div)`
  position: absolute;
  height: 3px;
  bottom: 0;
  background-color: red;
`;
