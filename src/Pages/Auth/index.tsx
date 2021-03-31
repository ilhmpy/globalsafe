import React from "react";
import { UpTitle } from "../../components/UI/UpTitle";
import { Container } from "../../globalStyles";
import styled from "styled-components/macro";
import { Page } from "../../components/UI/Page";
import { Header } from "../../components/Header/Header";
import { LoginComponent } from "../../components/Login";
import { useTranslation } from "react-i18next";

export const Authentication = () => {
  const { t } = useTranslation();
  return (
    <AuthPage>
      <Header />
      <Container>
        <UpTitle>{t("headerButton.personalArea")}</UpTitle>
      </Container>
      <LoginComponent />
    </AuthPage>
  );
};

const AuthPage = styled(Page)`
  height: 100vh;
`;
