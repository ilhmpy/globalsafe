import { FC, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { ThemeContext } from '../../context/ThemeContext';
import { HeaderNav, LinkButton, List, ListItem, StyledLink } from './Header.elements';

type Props = {
  onClose: () => void;
  handleClick: () => void;
  user: null | false | string;
  logOut: () => void;
  location: string;
  admin: boolean | null;
  lang: string;
};

export const Nav: FC<Props> = ({
  onClose,
  handleClick,
  user,
  logOut,
  location,
  admin,
  lang,
}: Props) => {
  const { t, i18n } = useTranslation();
  const themeContext = useContext(ThemeContext);
  const swithTheme = themeContext.toggleTheme;
  const theme = themeContext.theme;

  const scrollWidthOffset = (el: any) => {
    const yCoordinate = el.getBoundingClientRect().top + window.pageYOffset;
    const yOffset = -80;
    window.scrollTo({ top: yCoordinate + yOffset, behavior: 'smooth' });
  };

  return (
    <HeaderNav>
      <List>
        <ListItem>
          <StyledLink to="/#deposits" onClick={onClose} scroll={(el) => scrollWidthOffset(el)}>
            {t('header.item1')}
          </StyledLink>
        </ListItem>
        <ListItem>
          <StyledLink to="/#lottery" onClick={onClose} scroll={(el) => scrollWidthOffset(el)}>
            {t('header.item2')}
          </StyledLink>
        </ListItem>
        <ListItem>
          <StyledLink to="/#" onClick={onClose} scroll={(el) => scrollWidthOffset(el)}>
            {t('header.item3')}
          </StyledLink>
        </ListItem>
        <ListItem mob>
          <StyledLink to="/#lottery" onClick={onClose}>
            {t('header.item4')}
          </StyledLink>
        </ListItem>
        <ListItem mob>
          {location === '/' ? (
            <LinkButton onClick={handleClick}>{t('headerButton.personalArea')}</LinkButton>
          ) : user ? (
            <LinkButton onClick={logOut}>{t('logout')}</LinkButton>
          ) : (
            <LinkButton onClick={handleClick}>{t('headerButton.personalArea')}</LinkButton>
          )}
        </ListItem>
        {admin && (
          <ListItem mob>
            <StyledLink to="/admin" onClick={onClose}>
              {t('headerButton.admin')}
            </StyledLink>
          </ListItem>
        )}
      </List>
    </HeaderNav>
  );
};
