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
        <Text>Globalsafe © 2021</Text>
      </Container>
    </DIV>
  );
};

export const Text = styled.p`
  display: block;
  font-size: .80em;
  font-weight: 300;
  line-height: 22px;
  color: ${({ theme }) => theme.footer.color};
`;

export const A = styled.a`
  color: ${({ theme }) => theme.footer.color};
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
