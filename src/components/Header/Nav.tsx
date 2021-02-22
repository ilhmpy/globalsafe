import React, { FC } from "react";
import {
  HeaderNav,
  List,
  ListItem,
  StyledLink,
  LinkButton,
} from "./Header.elements";
import { Link } from "react-router-dom";
import { HashLink } from "react-router-hash-link";

type Props = {
  onClose: () => void;
  handleClick: () => void;
  user: null | false | string;
  logOut: () => void;
  location: string;
};

export const Nav: FC<Props> = ({
  onClose,
  handleClick,
  user,
  logOut,
  location,
}: Props) => {
  return (
    <HeaderNav>
      <List>
        <ListItem mob>
          {location === "/" ? (
            <LinkButton onClick={handleClick}>Личный кабинет</LinkButton>
          ) : user ? (
            <LinkButton onClick={logOut}>Выйти</LinkButton>
          ) : (
            <LinkButton onClick={handleClick}>Личный кабинет</LinkButton>
          )}
        </ListItem>

        <ListItem>
          <StyledLink smooth to="/#banner" onClick={onClose}>
            Емко и по-делу
          </StyledLink>
        </ListItem>
        <ListItem>
          <StyledLink to="/#tariffs" smooth onClick={onClose}>
            Тарифы
          </StyledLink>
        </ListItem>
        <ListItem>
          <StyledLink to="/#about" smooth onClick={onClose}>
            О нас
          </StyledLink>
        </ListItem>
        <ListItem>
          <StyledLink to="/#contact" smooth onClick={onClose}>
            Контакты
          </StyledLink>
        </ListItem>
      </List>
    </HeaderNav>
  );
};
