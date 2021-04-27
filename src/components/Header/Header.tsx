import React, { useState, useEffect, useContext, FC } from "react";
import { Container } from "../../globalStyles";
import { ReactComponent as Logo } from "../../assets/svg/logo.svg";
import {
  MenuBtn,
  HeaderWrap,
  HeaderInner,
  HeaderLogo,
  HeaderMenu,
  Languale,
  SwitchTheme,
  AdminButton,
} from "./Header.elements";
import { Button } from "../Button/Button";
import { Nav } from "./Nav";
import { useHistory, useLocation } from "react-router-dom";
import styled from "styled-components/macro";
import { AppContext } from "../../context/HubContext";
import { ThemeContext } from "../../context/ThemeContext";
import { NavAdmin } from "./NavAdmin";
import usa from "../../assets/svg/usa.svg";
import ru from "../../assets/svg/russia.svg";
import { useTranslation } from "react-i18next";

export const Header: FC<{ admPanel?: boolean }> = ({ admPanel }) => {
  const [header, setHeader] = useState(false);
  const [open, setOpen] = useState(false);
  const appContext = useContext(AppContext);
  const themeContext = useContext(ThemeContext);
  const swithTheme = themeContext.toggleTheme;
  const user = appContext.user;
  const logOut = appContext.logOut;
  const admin = appContext.isAdmin;
  let history = useHistory();
  let location = useLocation();
  const { t, i18n } = useTranslation();

  function handleClick() {
    if (!user) {
      history.push("/login");
    } else {
      history.push("/info");
    }
  }

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setHeader(true);
      } else {
        setHeader(false);
      }
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [open]);

  const onClose = () => {
    setOpen(false);
  };

  const toAdmin = () => {
    history.push("/admin");
  };
  const lang = localStorage.getItem("i18nextLng") || "ru";
  return (
    <HeaderWrap header={header}>
      <Container>
        <HeaderInner>
          <HeaderLogo href="/">
            <Logo />
          </HeaderLogo>
          <MenuBtn open={open} onClick={() => setOpen(!open)}>
            <span></span>
            <span></span>
          </MenuBtn>
          <HeaderMenu open={open}>
            {admPanel ? (
              <NavAdmin onClose={onClose} />
            ) : (
              <Nav
                onClose={onClose}
                handleClick={handleClick}
                user={user}
                logOut={logOut}
                location={location.pathname}
                admin={admin}
                lang={lang}
              />
            )}
          </HeaderMenu>
          <SwitchTheme onClick={swithTheme}></SwitchTheme>
          {lang === "ru" ? (
            <Languale onClick={() => i18n.changeLanguage("en")}>
              en
              <img src={usa} alt="en" />
            </Languale>
          ) : (
            <Languale onClick={() => i18n.changeLanguage("ru")}>
              ru
              <img src={ru} alt="ru" />
            </Languale>
          )}
          {admin && (
            <AdminButton danger onClick={toAdmin}>
              {t("headerButton.admin")}
            </AdminButton>
          )}
          {location.pathname === "/" ? (
            <Button onClick={handleClick}>
              {t("headerButton.personalArea")}
            </Button>
          ) : user ? (
            <Button onClick={logOut}>{t("logout")}</Button>
          ) : (
            <>
              <Button onClick={handleClick}>
                {t("headerButton.personalArea")}
              </Button>
            </>
          )}
        </HeaderInner>
      </Container>
    </HeaderWrap>
  );
};

const Btn = styled(Button)``;

const LinkButton = styled(Btn)``;
