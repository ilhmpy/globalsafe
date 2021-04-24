import React, { FC } from "react";
import {
  HeaderNav,
  List,
  ListItem,
  StyledLink,
  LinkButton,
  Languale,
  SwitchTheme,
} from "./Header.elements";
import { useTranslation } from "react-i18next";
import usa from "../../assets/svg/usa.svg";
import ru from "../../assets/svg/russia.svg";

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

  return (
    <HeaderNav>
      <List>
        <ListItem mob>
          {location === "/" ? (
            <LinkButton onClick={handleClick}>
              {t("headerButton.personalArea")}
            </LinkButton>
          ) : user ? (
            <LinkButton onClick={logOut}>{t("logout")}</LinkButton>
          ) : (
            <LinkButton onClick={handleClick}>
              {t("headerButton.personalArea")}
            </LinkButton>
          )}
        </ListItem>
        {admin && (
          <ListItem mob>
            <StyledLink to="/admin" onClick={onClose}>
              {t("headerButton.admin")}
            </StyledLink>
          </ListItem>
        )}

        <ListItem>
          <StyledLink to="/#banner" onClick={onClose}>
            {t("header.item1")}
          </StyledLink>
        </ListItem>
        <ListItem>
          <StyledLink to="/#tariffs" onClick={onClose}>
            {t("header.item2")}
          </StyledLink>
        </ListItem>
        <ListItem>
          <StyledLink to="/#about" onClick={onClose}>
            {t("header.item3")}
          </StyledLink>
        </ListItem>
        <ListItem>
          <StyledLink to="/#contact" onClick={onClose}>
            {t("header.item4")}
          </StyledLink>
        </ListItem>
        <ListItem>
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
        </ListItem>
        <ListItem>
          <SwitchTheme></SwitchTheme>
        </ListItem>
      </List>
    </HeaderNav>
  );
};
