import React, { useState, useEffect, useContext, FC } from "react";
import styled from "styled-components/macro";
import logo from "../../assets/svg/logo.svg";
import logoWhite from "../../assets/svg/logoWhite.svg";
import { ReactComponent as DashBoard } from "../../assets/svg/dashboard.svg";
import { ReactComponent as Peppa } from "../../assets/svg/peppa.svg";
import { ReactComponent as Wallet } from "../../assets/svg/wallet.svg";
import { ReactComponent as Users } from "../../assets/svg/users.svg";
import { ReactComponent as Briefcase } from "../../assets/svg/briefcase.svg";
import { ReactComponent as Exit } from "../../assets/svg/exit.svg";
import { ReactComponent as DarkTheme } from "../../assets/svg/theme.svg";
import { ReactComponent as LightTheme } from "../../assets/svg/themeLight.svg";
import { NavLink, Link } from "react-router-dom";
import { AppContext } from "../../context/HubContext";
import { ThemeContext } from "../../context/ThemeContext";
import { useTranslation } from "react-i18next";
import usa from "../../assets/svg/usa.svg";
import ru from "../../assets/svg/russia.svg";
import { Languale } from "../Header/Header.elements";

type Props = {
  navWidth: boolean;
  navShow: (e: React.MouseEvent) => void;
};

export const SideNavbar: FC<Props> = ({ navWidth, navShow }) => {
  const appContext = useContext(AppContext);
  const themeContext = useContext(ThemeContext);
  const theme = themeContext.theme;
  const swithTheme = themeContext.toggleTheme;
  const logOut = appContext.logOut;
  const { t, i18n } = useTranslation();
  const lang = localStorage.getItem("i18nextLng") || "ru";

  return (
    <SideNav small={navWidth}>
      <NavHead>
        <Burger onClick={navShow}>
          <span></span>
          <span></span>
          <span></span>
        </Burger>
        <Link to="/">
          <LogoBrand>
            {theme === "light" ? (
              <img src={logo} alt="" />
            ) : (
              <img src={logoWhite} alt="" />
            )}
          </LogoBrand>
        </Link>
      </NavHead>
      <SideInner>
        <Ul>
          <Li>
            <StyledLink to="/admin" exact>
              <DashBoard />
              <Text>{t("sideNav.mainScreen")}</Text>
            </StyledLink>
          </Li>
          <Li>
            <StyledLink to="/admin/deposit">
              <Peppa />
              <Text>{t("sideNav.deposits")}</Text>
            </StyledLink>
          </Li>
          <Li>
            <StyledLink to="/admin/payments">
              <Wallet />
              <Text>{t("sideNav.pay")}</Text>
            </StyledLink>
          </Li>
          <Li>
            <StyledLink to="/admin/users">
              <Users />
              <Text>{t("sideNav.users")}</Text>
            </StyledLink>
          </Li>
          <Li>
            <StyledLink to="/admin/portfolio">
              <Briefcase />
              <Text>{t("sideNav.portfolio")}</Text>
            </StyledLink>
          </Li>
        </Ul>
        <div>
          <Theme onClick={swithTheme}>
            {theme === "light" ? (
              <>
                <DarkTheme />
                <Text>{t("themeDark")}</Text>
              </>
            ) : (
              <>
                <LightTheme />
                <Text>{t("themeLight")}</Text>
              </>
            )}
          </Theme>
          <Logout onClick={logOut}>
            <Exit />
            <Text>{t("logout")}</Text>
            {lang === "ru" ? (
              <Languale
                onClick={(e) => {
                  e.stopPropagation();
                  i18n.changeLanguage("en");
                }}
              >
                en
                <img src={usa} alt="en" />
              </Languale>
            ) : (
              <Languale
                onClick={(e) => {
                  e.stopPropagation();
                  i18n.changeLanguage("ru");
                }}
              >
                ru
                <img src={ru} alt="ru" />
              </Languale>
            )}
          </Logout>
        </div>
      </SideInner>
    </SideNav>
  );
};

const SideInner = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: calc(100% - 80px);
  /* @media (max-width: 1200px) {
    height: calc(100%);
    justify-content: flex-start;
  } */
`;

const SideNav = styled.div<{ small: boolean }>`
  width: ${(props) => (props.small ? "56px" : "243px")};
  min-height: 100vh;
  overflow: hidden;
  height: 100vh;
  position: fixed;
  flex: none;
  background: ${(props) => props.theme.card.background};
  transition: 0.3s;
  @media (max-width: 1200px) {
    z-index: 9999;
    box-shadow: 0px 1px 3px rgb(0 0 0 / 25%);
  }
  @media (max-width: 992px) {
    display: none;
  }
`;

const NavHead = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 23px 27px 20px;
`;

const Burger = styled.div`
  padding: 5px;
  cursor: pointer;
  span {
    display: block;
    height: 2px;
    width: 14px;
    background: #ff416e;
    border-radius: 4px;
    margin-bottom: 3px;
  }
`;

const LogoBrand = styled.div`
  width: 163px;
  flex: none;
  margin-left: 20px;
`;

const Ul = styled.ul`
  list-style: none;
  font-size: 0;
`;

const Li = styled.li`
  display: flex;
  white-space: nowrap;
  align-items: center;
  &:last-child {
    margin-top: auto;
  }
`;

const Text = styled.p`
  font-weight: normal;
  font-size: 14px;
  line-height: 21px;
  letter-spacing: 0.1px;
  padding-left: 15px;
  color: ${(props) => props.theme.text};
  transition: all 0.3s;
`;

const activeclassname = "active";

const StyledLink = styled(NavLink).attrs({ activeclassname })`
  display: flex;
  align-items: center;
  padding: 11px 20px;
  position: relative;
  width: 100%;
  transition: all 0.3s;
  &.${activeclassname} {
    background: rgba(255, 65, 110, 0.07);
    ${Text} {
      color: #ff416e;
    }
    svg path {
      stroke: #ff416e;
    }
    &:after {
      content: "";
      position: absolute;
      height: 100%;
      width: 2px;
      background: #ff416e;
      border-radius: 4px;
      left: 0;
    }
  }
  svg {
    flex: none;
  }
  svg path {
    stroke: ${(props) => props.theme.text2};
  }
  &:hover {
    transition: all 0.3s;
    background: rgba(255, 65, 110, 0.07);
    ${Text} {
      color: #ff416e;
    }
    svg path {
      stroke: #ff416e;
      transition: all 0.3s;
    }
    &:after {
      content: "";
      position: absolute;
      height: 100%;
      width: 2px;
      background: #ff416e;
      border-radius: 4px;
      left: 0;
    }
  }
`;

const Logout = styled.div`
  display: flex;
  cursor: pointer;
  white-space: nowrap;
  align-items: center;
  padding: 11px 20px;
  svg {
    width: 24px;
    height: 24px;
    flex: none;
    path {
      stroke: ${(props) => props.theme.text};
    }
  }
  ${Languale} {
    margin-left: auto;
  }
`;

const Theme = styled.div`
  display: flex;
  cursor: pointer;
  white-space: nowrap;
  align-items: center;
  padding: 11px 20px;
  svg {
    flex: none;
  }
`;
