import React from "react";
import { Container } from "../../globalStyles";
import styled from "styled-components/macro";
import { useTranslation } from 'react-i18next';

export const Footer = () => {
  const { t } = useTranslation();

  return (
    <DIV>
      <Container>
        <Text>{t("footer.title")} <A href="https://t.me/joinchat/E_Acz5BKQnJlNTVi">{t("footer.link")}</A></Text>
        <Text>GLOBALSAFE © 2021</Text>
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
  display: flex;
  align-items: center;
  border-top: 1px solid #FFFFFF;

  & >* {
    display: block;
  }

  ${Container} {
    padding-top: 30px;
  }

  ${Text}:nth-child(2) {
    margin-bottom: 20px;
  }
`;
