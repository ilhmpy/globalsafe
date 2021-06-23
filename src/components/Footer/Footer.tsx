import React from "react";
import { Container } from "../../globalStyles";
import styled from "styled-components/macro";

export const Footer = () => {
  return (
    <DIV>
      <Container>
        <Text>Поддержка пользователей в официальном <A href="https://t.me/joinchat/E_Acz5BKQnJlNTVi">телеграм канале</A></Text>
        <Text>InvestFond © 2021</Text>
      </Container>
    </DIV>
  );
};

export const Text = styled.p`
  display: block;
  font-size: .80em;
  font-weight: 400;
  line-height: 22px;

`;

export const A = styled.a`
  color: #515172;
  text-decoration: underline;
`;

export const DIV = styled.div`
  width: 100%;
  display: block;
  & >* {
    display: block;
  }
`;
