import styled from 'styled-components/macro';
import { animated } from 'react-spring';

export const TabBar = styled.div`
  display: flex;
  position: relative;
`;

export const Tab = styled.div`
  margin: 5px;
  padding: 10px;
  cursor: pointer;
  user-select: none;
`;

export const Underline = styled(animated.div)`
  position: absolute;
  height: 2px;
  bottom: 0;
  background-color: #0094ff;
`;
