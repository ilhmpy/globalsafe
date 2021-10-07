import styled from 'styled-components/macro';
import { animated } from 'react-spring';

export const TabBar = styled.div`
  display: flex;
  position: relative;
`;

export const Tab = styled.div<{ active?: boolean }>`
  margin: 5px;
  padding: 10px;
  font-size: 14px;
  line-height: 16px;
  cursor: pointer;
  font-weight: ${(props) => (props.active ? 500 : 400)};
  user-select: none;
`;

export const Underline = styled(animated.div)`
  position: absolute;
  height: 2px;
  bottom: 0;
  background-color: #0094ff;
`;
