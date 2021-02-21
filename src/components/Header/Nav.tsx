import React, { FC } from "react";
import { HeaderNav, List, ListItem, StyledLink } from "./Header.elements";

type Props = {
  onClose: () => void;
};

export const Nav: FC<Props> = ({ onClose }: Props) => {
  return (
    <HeaderNav>
      <List>
        <ListItem mob>
          <a href="/">Личный кабинет</a>
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
