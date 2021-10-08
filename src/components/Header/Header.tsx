import React, { FC, useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory, useLocation } from 'react-router-dom';
import styled from 'styled-components/macro';
import { ReactComponent as Logo } from '../../assets/v2/svg/logo.svg';
import ru from '../../assets/svg/russia.svg';
import { ReactComponent as DarkTheme } from '../../assets/v2/svg/dark-theme.svg';
import { ReactComponent as LightTheme } from '../../assets/svg/themeLight.svg';
import usa from '../../assets/svg/usa.svg';
import { AppContext } from '../../context/HubContext';
import { ThemeContext } from '../../context/ThemeContext';
import { Container } from '../../components/UI/Container';
import { Button } from '../Button/V2/Button';
import {
  AdminButton,
  HeaderInner,
  HeaderLogo,
  HeaderMenu,
  HeaderWrap,
  Languale,
  MenuBtn,
  SwitchTheme,
} from './Header.elements';
import { Nav } from './Nav';
import { NavAdmin } from './NavAdmin';
import { routers } from '../../constantes/routers';
import { Notify } from "./Notify/Notify";
import * as Notifies from "./Notify/Notify.styles";
import { ReactComponent as Ball } from "../../assets/svg/ball.svg";

type Props = {
  admPanel?: boolean;
};

export const Header: FC<Props> = ({ admPanel }: Props) => {
  const [header, setHeader] = useState(false);
  const [open, setOpen] = useState(false);
  const [notify, setNotify] = useState<boolean>(true);

  const appContext = useContext(AppContext);
  const themeContext = useContext(ThemeContext);
  const swithTheme = themeContext.toggleTheme;
  const theme = themeContext.theme;
  const user = appContext.user;
  const logOut = appContext.logOut;
  const admin = appContext.isAdmin;
  const history = useHistory();
  const location = useLocation();
  const { t, i18n } = useTranslation();

  function handleClick() {
    if (!user) {
      history.push('/login/0');
    } else {
      history.push(routers.deposits);
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

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [open]);

  const onClose = () => {
    setOpen(false);
  };

  const toAdmin = () => {
    history.push('/admin');
  };
  const lang = localStorage.getItem('i18nextLng') || 'ru';
  function onBall(e: any) {
    setNotify(!notify);
  };
  return (
    <>
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
                <NavAdmin lang={lang} onClose={onClose} />
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

            {lang === 'ru' ? (
              <Languale onClick={() => i18n.changeLanguage('en')}>EN</Languale>
            ) : (
              <Languale onClick={() => i18n.changeLanguage('ru')}>RU</Languale>
            )}
            {user && (
              <>
                <Notifies.BallContainer notChecked={true}>
                    <Ball onClick={onBall} style={{ height: "20px" }} />
                </Notifies.BallContainer>
                <Notify block={notify} auth={admin ? true : false} /> 
              </>
            )}
            <SwitchTheme onClick={swithTheme}>
              {theme === 'light' ? <DarkTheme /> : <LightTheme />}
            </SwitchTheme>
            {admin && <AdminButton onClick={toAdmin}>{t('headerButton.admin')}</AdminButton>}
            {location.pathname === '/' ? (
              <Button primary onClick={handleClick}>
                {t('headerButton.personalArea')}
              </Button>
            ) : user ? (
              // <Button primary onClick={logOut}>
              //   {t('logout')}
              // </Button>
              <Button primary onClick={handleClick}>
                {t('headerButton.personalArea')}
              </Button>
            ) : (
              <Button primary onClick={handleClick}>
                {t('headerButton.personalArea')}
              </Button>
            )}
          </HeaderInner> 
        </Container>
      </HeaderWrap>
    </>
  );
};

const Btn = styled(Button)``;

const LinkButton = styled(Btn)``;
