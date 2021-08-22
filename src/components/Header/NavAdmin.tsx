import React, { FC, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import ru from '../../assets/svg/russia.svg';
import { ReactComponent as DarkTheme } from '../../assets/svg/theme.svg';
import { ReactComponent as LightTheme } from '../../assets/svg/themeLight.svg';
import usa from '../../assets/svg/usa.svg';
import { ThemeContext } from '../../context/ThemeContext';
import { Languale, List, ListItem, StyledLink, Switch, SwitchTheme } from './Header.elements';

type Props = {
  onClose: () => void;
  lang: string;
};

export const NavAdmin: FC<Props> = ({ onClose, lang }: Props) => {
  const { t, i18n } = useTranslation();
  const themeContext = useContext(ThemeContext);
  const swithTheme = themeContext.toggleTheme;
  const theme = themeContext.theme;

  return (
    <List>
      <ListItem>
        <StyledLink to="/admin" onClick={onClose}>
          {t('sideNav.mainScreen')}
        </StyledLink>
      </ListItem>
      <ListItem>
        <StyledLink to="/admin/deposit" onClick={onClose}>
          {t('sideNav.deposits')}
        </StyledLink>
      </ListItem>
      <ListItem>
        <StyledLink to="/admin/payments" onClick={onClose}>
          {t('sideNav.pay')}
        </StyledLink>
      </ListItem>
      <ListItem>
        <StyledLink to="/admin/users" onClick={onClose}>
          {t('sideNav.users')}
        </StyledLink>
      </ListItem>
      <ListItem>
        <StyledLink to="/admin/portfolio" onClick={onClose}>
          {t('sideNav.portfolio')}
        </StyledLink>
      </ListItem>
      <ListItem>
        <StyledLink to="/admin/lottery" onClick={onClose}>
          {t('sideNav.lottery')}
        </StyledLink>
      </ListItem>
      <ListItem>
        <StyledLink to="/admin/depositsPrograms" onClick={onClose}>
          {t('sideNav.depositsPrograms')}
        </StyledLink>
      </ListItem>
      <ListItem>
        <StyledLink to="/admin/wallets" onClick={onClose}>
          {t('sideNav.wallets')}
        </StyledLink>
      </ListItem>
      <ListItem last>
        <StyledLink to="/" onClick={onClose}>
          {t('sideNav.toHome')}
        </StyledLink>
      </ListItem>
      <Switch>
        <ListItem mob without>
          <SwitchTheme mob onClick={swithTheme}>
            {theme === 'light' ? (
              <div>
                <DarkTheme />
              </div>
            ) : (
              <div>
                <LightTheme />
              </div>
            )}
          </SwitchTheme>
        </ListItem>
        <ListItem without>
          {lang === 'ru' ? (
            <Languale onClick={() => i18n.changeLanguage('en')}>
              EN
              <img src={usa} alt="en" />
            </Languale>
          ) : (
            <Languale onClick={() => i18n.changeLanguage('ru')}>
              RU
              <img src={ru} alt="ru" />
            </Languale>
          )}
        </ListItem>
      </Switch>
    </List>
  );
};
