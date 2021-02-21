import { Link } from "react-scroll";
import styled from "styled-components/macro";
import { Button } from "../Button/Button";

export const HeaderWrap = styled.header<{ header?: boolean }>`
  width: 100%;
  margin: 0 auto;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9999;
  padding: 28px 0;
  transition: all 0.3s ease 0s;
  background: ${(props) =>
    props.header
      ? `linear-gradient(
  0deg
  , rgba(0, 0, 0, 0.05), rgba(0, 0, 0, 0.05)), linear-gradient( 
  82.3deg
  , #effff9 3.67%, #f3f9ff 22.57%, #fffdf0 44.98%, #fff0f0 73%, #f0f0ff 95.88% ), #ffffff`
      : "transparent"};
`;

export const HeaderInner = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  position: relative;
  @media (max-width: 992px) {
    ${Button} {
      display: none;
    }
  }
`;

export const HeaderLogo = styled.a`
  text-decoration: none;
  cursor: pointer;
  z-index: 5;
`;

export const HeaderMenu = styled.div<{ open?: boolean }>`
  @media (max-width: 992px) {
    position: fixed;
    background: #fff;
    width: 100%;
    height: 100%;
    left: ${(props) => (props.open ? "0" : "-100%")} ;
    top: 0;
    padding: 0 50px;
    overflow: auto;
    background: #fff;
    z-index: 4;
    -webkit-transition: all 0.3s ease 0s;
    -o-transition: all 0.3s ease 0s;
    transition: all 0.3s ease 0s;
}
  }
`;

export const MenuBtn = styled.span<{ open?: boolean }>`
  position: absolute;
  margin-top: -3px;
  right: 0px;
  width: 24px;
  height: 8px;
  cursor: pointer;
  z-index: 5;
  display: none;
  @media (max-width: 992px) {
    display: block;
  }
  span {
    transition: all 0.3s ease 0s;
    top: calc(50% - 1px);
    right: 0px;
    position: absolute;
  }
  span:first-child {
    top: ${(props) => (props.open ? "calc(50% - 2px)" : "0px")};
    width: 24px;
    height: 3px;
    border-radius: 2px;
    background-color: #ff416e;
    transform: ${(props) => (props.open ? "rotate(-45deg)" : "rotate(0deg)")};
  }
  span:last-child {
    top: auto;
    bottom: ${(props) => (props.open ? "calc(50% - 1px)" : "0px")};
    width: ${(props) => (props.open ? "24px" : "12px")};
    height: 3px;
    border-radius: 2px;
    background-color: #ff416e;
    transform: ${(props) => (props.open ? "rotate(45deg)" : "rotate(0deg)")};
  }
`;

export const HeaderNav = styled.nav``;

export const List = styled.ul`
  list-style: none;
  display: flex;
  align-items: center;
  @media (max-width: 992px) {
    flex-direction: column;
    align-items: flex-start;
    padding-top: 90px;
    padding-bottom: 40px;
  }
`;

export const ListItem = styled.li<{ mob?: boolean }>`
  padding: 0 30px;
  display: ${(props) => props.mob && "none"};
  position: relative;
  @media (max-width: 992px) {
    display: ${(props) => props.mob && "block"};
    &:before {
      content: "";
      display: inline-block;
      width: 100%;
      height: 1px;
      border-radius: 2px;
      background-color: rgba(81, 81, 114, 0.2);
      margin-bottom: 20px;
    }
  }
`;

const activeClass = "active";

export const StyledLink = styled(Link).attrs({ activeClass })`
  &.${activeClass} {
    color: red;
  }
  font-weight: 500;
  font-size: 14px;
  line-height: 16px;
  cursor: pointer;
  transition: all 0.3s ease 0s;
  &:hover {
    color: #ff416e;
  }
`;
