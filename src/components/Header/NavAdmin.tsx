import React, { FC } from "react";
import {
  HeaderNav,
  List,
  ListItem,
  StyledLink,
  LinkButton,
} from "./Header.elements";

type Props = {
  onClose: () => void;
};

export const NavAdmin: FC<Props> = ({ onClose }) => {
  return (
    <List>
      <ListItem>
        <StyledLink smooth to="/admin" onClick={onClose}>
          Главный экран
        </StyledLink>
      </ListItem>
      <ListItem>
        <StyledLink smooth to="/admin/deposit" onClick={onClose}>
          Депозиты
        </StyledLink>
      </ListItem>
      <ListItem>
        <StyledLink smooth to="/admin/payments" onClick={onClose}>
          Выплаты
        </StyledLink>
      </ListItem>
      <ListItem>
        <StyledLink smooth to="/admin/users" onClick={onClose}>
          Пользователи
        </StyledLink>
      </ListItem>
      <ListItem>
        <StyledLink smooth to="/admin/portfolio" onClick={onClose}>
          Портфель
        </StyledLink>
      </ListItem>
      <ListItem>
        <StyledLink smooth to="/" onClick={onClose}>
          На главную
        </StyledLink>
      </ListItem>
    </List>
  );
};
