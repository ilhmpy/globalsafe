import { Link } from 'react-scroll';
import styled from 'styled-components/macro';
import { Button } from '../Button/Button';
import { NavHashLink } from 'react-router-hash-link';
import { ReactComponent as DarkTheme } from '../../assets/svg/theme.svg';

export const Text = styled.p`
  font-weight: 500;
  font-size: 14px;
  line-height: 21px;
  letter-spacing: 0.1px;
  padding-left: 15px;
  color: ${(props) => props.theme.text};
  transition: all 0.3s;
`;

export const SwitchTheme = styled.div<{ mob?: boolean }>`
  width: 28px;
  height: 28px;

  border-radius: 50%;
  /* background: ${(props) => props.theme.switch}; */

  cursor: pointer;
  @media (max-width: 1100px) {
    width: 100%;
    div {
      display: flex;
      align-items: center;
      width: 100%;
      svg {
        flex: none;
      }
    }

    ${({ mob }) => {
      if (mob) {
        return `
          & > div > svg {
            width: 28px;
            height: 28px;
          }
        `;
      }
    }}
  }
`;

export const AdminButton = styled(Button)`
  min-width: 110px;
  max-width: 110px;
  padding: 12px 0px;
`;

export const Languale = styled.div`
  display: flex;
  align-items: center;
  font-weight: 500;
  font-size: 14px;
  line-height: 16px;
  margin-right: 10px;
  color: ${(props) => props.theme.text};
  cursor: pointer;
  @media (max-width: 1100px) {
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
  z-index: 99999;
  padding: 28px 0;
  transition: all 0.3s ease 0s;
  background: ${(props) => (props.header ? props.theme.header : 'transparent')};
`;

export const HeaderInner = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  position: relative;
  @media (max-width: 1100px) {
    ${Button} {
      display: none;
    }
    ${SwitchTheme} {
      display: none;
    }
  }
`;

export const HeaderLogo = styled.a`
  text-decoration: none;
  cursor: pointer;
  z-index: 5;
  margin-top: 5px;
  .logo {
    fill: ${(props) => props.theme.text};
  }
`;

export const HeaderMenu = styled.div<{ open?: boolean }>`
  ${SwitchTheme} {
    display: none;
  }
  @media (max-width: 1100px) {
    ${SwitchTheme} {
      display: block;
    }
    position: fixed;
    background: ${(props) => props.theme.modal};
    width: 100%;
    height: 100%;
    left: ${(props) => (props.open ? '0' : '-100%')};
    top: 0;
    padding: 0 50px;
    overflow: auto;
    z-index: 4;
    -webkit-transition: all 0.3s ease 0s;
    -o-transition: all 0.3s ease 0s;
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
  }
  span:first-child {
    top: ${(props) => (props.open ? 'calc(50% - 2px)' : '0px')};
    width: 24px;
    height: 3px;
    border-radius: 2px;
    background-color: #ff416e;
    transform: ${(props) => (props.open ? 'rotate(-45deg)' : 'rotate(0deg)')};
  }
  span:last-child {
    top: auto;
    bottom: ${(props) => (props.open ? 'calc(50% - 1px)' : '0px')};
    width: ${(props) => (props.open ? '24px' : '12px')};
    height: 3px;
    border-radius: 2px;
    background-color: #ff416e;
    transform: ${(props) => (props.open ? 'rotate(45deg)' : 'rotate(0deg)')};
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
    padding-top: 90px;
    padding-bottom: 40px;
  }
`;

export const ListItem = styled.li<{ mob?: boolean; without?: boolean; last?: boolean }>`
  padding: 0px 12px;
  display: ${(props) => props.mob && 'none'};
  position: relative;
  ${Languale} {
    display: none;
  }
  &:last-child {
    display: none;
  }
  @media (max-width: 1100px) {
    &:last-child {
      display: block;
    }
    display: ${(props) => props.mob && 'block'};
    width: 100%;
    padding: 20px 0px;
    border-top: 1px solid ${(props) => props.theme.listBorder};
    ${Languale} {
      display: flex;
      cursor: initial;
    }
    ${SwitchTheme} {
      display: block;
      cursor: initial;
    }
    ${({ mob }) => {
      if (mob) {
        return `
          max-width: 30px;
          margin-right: 10px;
        `;
      }
    }}

    ${({ without }) => {
      if (without) {
        return `
          border-top: 0;
        `;
      }
    }}

    ${({ last }) => {
      if (last) {
        return `
          border-bottom: 1px solid ${({ theme }: any) => theme.listBorder};
        `;
      }
    }}
  }
`;

const activeclassname = 'active';

export const StyledLink = styled(NavHashLink).attrs({ activeclassname })`
  &.${activeclassname} {
    color: red;
  }
  color: ${(props) => props.theme.text};
  font-weight: 500;
  font-size: 14px;
  line-height: 16px;
  cursor: pointer;
  transition: all 0.3s ease 0s;
  &:hover {
    color: #ff416e;
  }
`;

export const LinkButton = styled.div`
  font-weight: 500;
  font-size: 14px;
  line-height: 16px;
  color: ${(props) => props.theme.text};
`;

export const Switch = styled.div`
  display: flex;
  position: absolute;
  bottom: 5px;
  align-items: center;
`;
