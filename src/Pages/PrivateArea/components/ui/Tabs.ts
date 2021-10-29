import styled from "styled-components/macro";
import { NavLink } from "react-router-dom";

export const TabsBlock = styled.div`
  display: flex;
  align-items: center;
`;

export const TabNavItem = styled(NavLink)`
  color: ${(props) => props.theme.black};
  opacity: 0.6;
  font-size: 14px;
  line-height: 16px;
  padding-bottom: 10px;
  margin-right: 20px;
  &:last-child{
    margin-right: 0;
  }
  &.active {
    font-weight: 500;
    opacity: 1;
    border-bottom: 2px solid ${(props) => props.theme.blue};
  }
`;
