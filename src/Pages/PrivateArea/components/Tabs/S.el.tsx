import styled from 'styled-components/macro';
import { animated } from 'react-spring';

export const TabBar = styled.div`
  display: flex;
  position: relative;
`;

export const Tab = styled.div<{ active?: boolean }>`
  padding: 0 1px 12px;
  font-size: 14px;
  line-height: 16px;
  cursor: pointer;
  font-weight: ${(props) => (props.active ? 500 : 400)};
  user-select: none;
  margin-right: 40px;
  &:last-child {
    margin-right: 0;
  }
`;

export const Underline = styled(animated.div)`
  position: absolute;
  height: 2px;
  bottom: 0;
  background-color: #0094ff;
`;
