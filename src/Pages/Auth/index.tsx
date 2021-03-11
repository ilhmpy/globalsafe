import React from "react";
import { UpTitle } from "../../components/UI/UpTitle";
import { Container } from "../../globalStyles";
import styled from "styled-components/macro";
import { Page } from "../../components/UI/Page";
import { Header } from "../../components/Header/Header";
import { LoginComponent } from "../../components/Login";

export const Authentication = () => {
  return (
    <AuthPage>
      <Header />
      <Container>
        <UpTitle>Личный кабинет</UpTitle>
      </Container>
      <LoginComponent />
    </AuthPage>
  );
};

const AuthPage = styled(Page)`
  height: 100vh;
`;
