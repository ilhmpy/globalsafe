import styled from "styled-components/macro";

export const Tabs = styled.div`
  overflow: hidden;
  background: #fff;
  padding-left: 90px;
  border-top: 1px solid rgba(196, 196, 196, 0.2);
  border-radius: 0 0 20px 20px;
  @media (max-width: 575px) {
    padding-left: 20px;
    display: flex;
    justify-content: space-between;
  }
`;

export const Tab = styled.button<{ active: boolean }>`
  border: none;
  outline: none;
  cursor: pointer;
  position: relative;
  font-weight: ${(props) => (props.active ? "600" : "400")};
  font-size: 14px;
  line-height: 16px;
  padding: 12px 0;
  width: 120px;
  color: #0e0d3d;
  text-align: left;
  background: transparent;
  @media (max-width: 992px) {
    padding-left: 0px;
    width: 80px;

    &:first-child {
      width: 100px;
    }
    &:last-child {
      padding-right: 0px;
    }
  }
  &:hover {
    background-color: white;
  }
  &:before {
    content: "";
    position: absolute;
    bottom: 0;
    display: ${(props) => (props.active ? "block" : "none")};
    left: 0;
    height: 1px;
    width: 46px;
    background: #ff416e;
    border-radius: 0px 2px 2px 0px;
  }
`;

export const Content = styled.div<{ active?: boolean }>`
  ${(props) => (props.active ? "" : "display:none")};
  /* @media (max-width: 992px) {
    height: 100%;
    min-height: 350px;
  } */
`;
