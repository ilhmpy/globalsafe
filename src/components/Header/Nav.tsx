import React, { FC } from "react";
import {
  HeaderNav,
  List,
  ListItem,
  StyledLink,
  LinkButton,
} from "./Header.elements";
import { Link } from "react-router-dom";

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
          <StyledLink
            to="banner"
            spy={true}
            smooth={true}
            offset={-50}
            duration={500}
            onClick={onClose}
          >
            Емко и по-делу
          </StyledLink>
        </ListItem>
        <ListItem>
          <StyledLink
            to="tariffs"
            spy={true}
            smooth={true}
            offset={-50}
            duration={500}
            onClick={onClose}
          >
            Тарифы
          </StyledLink>
        </ListItem>
        <ListItem>
          <StyledLink
            to="about"
            spy={true}
            smooth={true}
            offset={-50}
            duration={500}
            onClick={onClose}
          >
            О нас
          </StyledLink>
        </ListItem>
        <ListItem>
          <StyledLink
            to="contact"
            spy={true}
            smooth={true}
            offset={-50}
            duration={500}
            onClick={onClose}
          >
            Контакты
          </StyledLink>
        </ListItem>
      </List>
    </HeaderNav>
  );
};
