import React from "react";
import { UpTitle } from "../../components/UI/UpTitle";
import { Container } from "../../globalStyles";
import styled from "styled-components/macro";
import { Page } from "../../components/UI/Page";
import { Header } from "../../components/Header/Header";
import { LoginComponent } from "../../components/Login";
import { RegisterComponent } from "../../components/Register/Register";
import { useTranslation } from "react-i18next";
import { Footer } from "../../components/Footer/Footer";

export const Authentication = ({ match }: any) => {
  const { t } = useTranslation();
  const id = match.params.depositId;
  return (
    <AuthPage>
      <Header />
      <LoginComponent id={id} />
      <Footer other />
    </AuthPage>
  );
};

export const Register = () => {
  const { t } = useTranslation();
  return (
    <AuthPage>
      <Header />
      {/* <Container>
        <UpTitle>{t("headerButton.register")}</UpTitle>
      </Container> */}
      <RegisterComponent />
      <Footer other />
    </AuthPage>
  );
};

const AuthPage = styled(Page)`
  height: 100vh;
  display: flex;
  flex-direction: column;
`;
