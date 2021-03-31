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
};

export const NavAdmin: FC<Props> = ({ onClose }) => {
  const { t } = useTranslation();
  return (
    <List>
      <ListItem>
        <StyledLink smooth to="/admin" onClick={onClose}>
          {t("sideNav.mainScreen")}
        </StyledLink>
      </ListItem>
      <ListItem>
        <StyledLink smooth to="/admin/deposit" onClick={onClose}>
          {t("sideNav.deposits")}
        </StyledLink>
      </ListItem>
      <ListItem>
        <StyledLink smooth to="/admin/payments" onClick={onClose}>
          {t("sideNav.pay")}
        </StyledLink>
      </ListItem>
      <ListItem>
        <StyledLink smooth to="/admin/users" onClick={onClose}>
          {t("sideNav.users")}
        </StyledLink>
      </ListItem>
      <ListItem>
        <StyledLink smooth to="/admin/portfolio" onClick={onClose}>
          {t("sideNav.portfolio")}
        </StyledLink>
      </ListItem>
      <ListItem>
        <StyledLink smooth to="/" onClick={onClose}>
          {t("sideNav.toHome")}
        </StyledLink>
      </ListItem>
    </List>
  );
};
