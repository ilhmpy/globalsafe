import React, { FC } from "react";
import {
  HeaderNav,
  List,
  ListItem,
  StyledLink,
  LinkButton,
} from "./Header.elements";
import { useTranslation } from "react-i18next";

type Props = {
  onClose: () => void;
  handleClick: () => void;
  user: null | false | string;
  logOut: () => void;
  location: string;
  admin: boolean | null;
};

export const Nav: FC<Props> = ({
  onClose,
  handleClick,
  user,
  logOut,
  location,
  admin,
}: Props) => {
  const { t } = useTranslation();

  return (
    <HeaderNav>
      <List>
        <ListItem mob>
          {location === "/" ? (
            <LinkButton onClick={handleClick}>
              {t("headerButton.personalArea")}
            </LinkButton>
          ) : user ? (
            <LinkButton onClick={logOut}>{t("headerButton.logout")}</LinkButton>
          ) : (
            <LinkButton onClick={handleClick}>
              {t("headerButton.personalArea")}
            </LinkButton>
          )}
        </ListItem>
        {admin && (
          <ListItem mob>
            <StyledLink smooth to="/admin" onClick={onClose}>
              {t("headerButton.admin")}
            </StyledLink>
          </ListItem>
        )}

        <ListItem>
          <StyledLink smooth to="/#banner" onClick={onClose}>
            {t("header.item1")}
          </StyledLink>
        </ListItem>
        <ListItem>
          <StyledLink to="/#tariffs" smooth onClick={onClose}>
            {t("header.item2")}
          </StyledLink>
        </ListItem>
        <ListItem>
          <StyledLink to="/#about" smooth onClick={onClose}>
            {t("header.item3")}
          </StyledLink>
        </ListItem>
        <ListItem>
          <StyledLink to="/#contact" smooth onClick={onClose}>
            {t("header.item4")}
          </StyledLink>
        </ListItem>
      </List>
    </HeaderNav>
  );
};
