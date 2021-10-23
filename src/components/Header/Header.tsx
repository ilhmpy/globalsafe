import React, { FC, useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory, useLocation } from 'react-router-dom';
import { ReactComponent as Ball } from '../../assets/svg/ball.svg';
import { ReactComponent as LightTheme } from '../../assets/svg/themeLight.svg';
import { ReactComponent as DarkTheme } from '../../assets/v2/svg/dark-theme.svg';
import { ReactComponent as Logo } from '../../assets/v2/svg/logo.svg';
import { Container } from '../../components/UI/Container';
import { routers } from '../../constantes/routers';
import { AppContext } from '../../context/HubContext';
import { ThemeContext } from '../../context/ThemeContext';
import {
  AdminButton,
  Btn,
  ButtonsRev,
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
import { Notify } from './Notify/Notify';
import * as Notifies from './Notify/Notify.styles';

type Props = {
  admPanel?: boolean;
};

export const Header: FC<Props> = ({ admPanel }: Props) => {
  const [header, setHeader] = useState(false);
  const [open, setOpen] = useState(false);
  const [notify, setNotify] = useState<boolean>(false);
  const [checkeds, setCheckeds] = useState<boolean>(false);

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
  function onClose() {
    setOpen(false);
  }
  const toAdmin = () => {
    history.push('/admin');
  };
  const lang = localStorage.getItem('i18nextLng') || 'ru';
  function onBall(e: any) {
    setNotify(!notify);
  }
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
              <Languale
                auth={user ? true : false}
                admin={admin ? true : false}
                onClick={() => i18n.changeLanguage('en')}
              >
                EN
              </Languale>
            ) : (
              <Languale
                auth={user ? true : false}
                admin={admin ? true : false}
                onClick={() => i18n.changeLanguage('ru')}
              >
                RU
              </Languale>
            )}
            {user && (
              <>
                <Notifies.BallContainer notChecked={checkeds}>
                  <Ball onClick={onBall} style={{ height: '20px' }} />
                </Notifies.BallContainer>
                <Notify
                  block={notify}
                  setBlock={setNotify}
                  setCheckeds={setCheckeds}
                  admin={admin ? true : false}
                />
              </>
            )}
            <SwitchTheme
              admin={admin ? true : false}
              auth={user ? true : false}
              onClick={swithTheme}
            >
              {theme === 'light' ? <DarkTheme /> : <LightTheme />}
            </SwitchTheme>
            <ButtonsRev className={user === null || admin === null ? 'is-placeholder' : ''}>
              <AdminButton onClick={toAdmin}>{t('headerButton.admin')}</AdminButton>

              {/* {location.pathname === '/' ? (
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
               
              )} */}
            </ButtonsRev>
            <Btn
              className={user === null || admin === null ? 'is-placeholder' : ''}
              hide={user === null}
              onClick={handleClick}
            >
              {t('headerButton.personalArea')}
            </Btn>
          </HeaderInner>
        </Container>
      </HeaderWrap>
    </>
  );
};
