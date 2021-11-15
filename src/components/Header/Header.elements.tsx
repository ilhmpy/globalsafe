import { NavHashLink } from 'react-router-hash-link';
import styled from 'styled-components';
import { Button } from '../Button/V2/Button';

export const Text = styled.p`
  font-weight: 500;
  font-size: 14px;
  line-height: 21px;
  letter-spacing: 0.1px;
  padding-left: 15px;
  color: ${(props) => props.theme.text};
  transition: all 0.3s;
`;

export const SwitchTheme = styled.div<{ mob?: boolean; admin?: boolean; auth?: boolean }>`
  width: 20px;
  height: 20px;
  margin-right: 20px;
  border-radius: 50%;
  cursor: pointer;

  ${({ admin, auth }) => {
    if (!auth || (auth && !admin)) {
      return `
        margin-right: 40px;
      `;
    }
  }}
  @media (max-width: 768px) {
    display: none;
  }
  @media (max-width: 1100px) {
    margin-right: 40px;
    div {
      display: flex;
      align-items: center;
      svg {
        flex: none;
      }
    }
  }
`;

export const Btn = styled(Button)<{ hide?: boolean }>`
  padding: 12px 20px;
  display: ${(props) => (props.hide ? 'none' : 'inline-block')};
  text-transform: uppercase;

  @media (max-width: 1100px) {
    display: none;
  }
`;

export const AdminButton = styled(Btn)`
  padding: 12px 12px;
  margin-right: 28px;
  text-transform: uppercase;

  @media (max-width: 1100px) {
    display: none;
  }
`;

export const ButtonsRev = styled.div`
  width: auto;
  margin-right: 28px;
  @media (max-width: 767px) {
    display: none;
  }
`;

export const Languale = styled.div<{ auth?: boolean; admin?: boolean }>`
  display: flex;
  align-items: center;
  font-weight: 500;
  font-size: 12px;
  line-height: 14px;
  color: ${(props) => props.theme.text};
  cursor: pointer;
  ${({ auth, admin }) => {
    if (!auth) {
      return `
        margin-right: 40px;
      `;
    }
    if (auth && admin) {
      return `
        margin-right: 0px;
      `;
    }
  }}
  @media (max-width: 1100px) {
    margin-left: auto;
  }
  @media (max-width: 768px) {
    display: none;
  }
  img {
    margin-left: 6px;
    border-radius: 50%;
    width: 28px;
    height: 28px;
    border: 1px solid #0e0d3d;
  }
`;

export const HeaderWrap = styled.header<{ header?: boolean }>`
  width: 100%;
  margin: 0 auto;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9999;
  padding: 30px 0;
  height: 98px;
  transition: all 0.3s ease 0s;
  background: ${(props) => props.theme.v2.header.background};
  /* background: ${(props) =>
    props.header ? props.theme.header : props.theme.v2.header.background}; */
  @media (max-width: 768px) {
    height: 60px;
    padding: 15px 0;

    & > div {
      padding: 0 20px;
    }
  }
`;

export const HeaderInner = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  position: relative;
  @media (max-width: 1100px) {
    ${Button} {
      margin-right: 70px;
    }
  }
  @media (max-width: 767px) {
    ${Button} {
      display: none;
    }
  }
`;

export const HeaderLogo = styled.a`
  text-decoration: none;
  cursor: pointer;
  z-index: 5;
  margin-top: 10px;
  @media (max-width: 767px) {
    margin-top: 8px;
  }
  .logo {
    fill: ${(props) => props.theme.text};
  }
`;

export const HeaderMenu = styled.div<{ open?: boolean }>`
  ${SwitchTheme} {
    display: none;
  }
  margin-left: auto;
  @media (max-width: 1100px) {
    ${SwitchTheme} {
      display: block;
    }
    position: fixed;
    background: ${(props) => props.theme.modal};
    width: 100%;
    height: 100%;
    left: ${(props) => (props.open ? '0' : '-100%')};
    top: 61px;
    padding: 0 50px;
    overflow: auto;
    z-index: 4;
    transition: all 0.3s ease 0s;
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
  @media (max-width: 1100px) {
    display: block;
  }
  span {
    transition: all 0.3s ease 0s;
    top: calc(50% - 1px);
    right: 0px;
    position: absolute;
    background-color: ${(props) => props.theme.v2.header.burger};
  }
  span:first-child {
    top: ${(props) => (props.open ? 'calc(50% - 2px)' : '0px')};
    width: 24px;
    height: 3px;
    border-radius: 2px;
    transform: ${(props) => (props.open ? 'rotate(-45deg)' : 'rotate(0deg)')};
  }
  span:last-child {
    top: auto;
    bottom: ${(props) => (props.open ? 'calc(50% - 1px)' : '0px')};
    width: ${(props) => (props.open ? '24px' : '12px')};
    height: 3px;
    border-radius: 2px;
    transform: ${(props) => (props.open ? 'rotate(45deg)' : 'rotate(0deg)')};
  }
  @media only screen and (min-device-width: 481px) and (max-device-width: 1024px) {
    position: relative;
    margin-left: 10px;
  }
  @media (max-width: 768px) {
    position: absolute;
    margin-left: 0px;
  }
`;

export const HeaderNav = styled.nav``;

export const List = styled.ul`
  list-style: none;
  display: flex;
  align-items: center;
  @media (max-width: 1100px) {
    flex-direction: column;
    align-items: flex-start;
    padding-top: 20px;
    padding-bottom: 40px;
  }
`;

export const ListItem = styled.li<{ mob?: boolean }>`
  display: ${(props) => props.mob && 'none'};
  position: relative;
  padding-right: 40px;
  ${Languale} {
    display: none;
  }
  &:nth-child(4) {
    padding-right: 0;
  }
  &:last-child {
    display: none;
  }
  @media (max-width: 1100px) {
    display: ${(props) => props.mob && 'none'};
    width: 100%;
    padding: 20px 0px;
    border-top: 1px solid ${(props) => props.theme.listBorder};
    text-align: center;
    ${Languale} {
      display: flex;
      cursor: initial;
    }
    ${SwitchTheme} {
      display: block;
      cursor: initial;
    }
  }
  @media (max-width: 767px) {
    display: ${(props) => props.mob && 'block'};
    &:last-child {
      display: block;
    }
  }
`;

const activeclassname = 'active';

export const StyledLink = styled(NavHashLink).attrs({ activeclassname })`
  &.${activeclassname} {
    color: red;
  }
  color: #3f3e4e;
  font-weight: 500;
  font-size: 12px;
  line-height: 14px;
  cursor: pointer;
  transition: all 0.3s ease 0s;
  text-transform: uppercase;
`;

export const LinkButton = styled.div`
  font-weight: 500;
  font-size: 12px;
  line-height: 14px;
  color: ${(props) => props.theme.text};
  text-transform: uppercase;
`;

export const Switch = styled.div`
  display: flex;
  position: absolute;
  bottom: 5px;
  align-items: center;
  @media (max-width: 992px) {
    position: relative;
  }
`;

export const AdminLink = styled(StyledLink)`
  padding: 12px 12px;
  text-transform: uppercase;

  @media (max-width: 1100px) {
    display: none;
  }
`;
