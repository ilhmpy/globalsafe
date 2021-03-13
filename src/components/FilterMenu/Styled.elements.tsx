import styled from "styled-components/macro";

export const Container = styled.div`
  position: absolute;
  z-index: 999;
  right: -30px;
  top: 20px;
  background: #ffffff;
  border: 1px solid rgba(86, 101, 127, 0.3);
  box-sizing: border-box;
  border-radius: 0px 0px 4px 4px;
  padding: 20px;
`;

export const Title = styled.h3`
  font-weight: 500;
  font-size: 18px;
  line-height: 21px;
  letter-spacing: 0.1px;
  color: #515172;
  padding-bottom: 15px;
`;

export const List = styled.ul`
  list-style: none;
`;

export const Item = styled.li`
  font-weight: normal;
  font-size: 14px;
  line-height: 16px;
  text-align: left;
  letter-spacing: 0.1px;
  color: #515172;
  padding-bottom: 10px;
  cursor: pointer;
  &:last-child {
    padding-bottom: 0px;
  }
`;
