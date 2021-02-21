import React from "react";
import { Header } from "../../components/Header/Header";
import { Page } from "../../components/UI/Page";
import styled from "styled-components/macro";
import { Banner } from "./components/Banner/Banner";
import { Tariffs } from "./components/Tariffs/Tariffs";
import { About } from "./components/About/About";
import { Footer } from "../../components/Footer/Footer";
import { Contact } from "./components/Contact/Contact";

export const Main = () => {
  return (
    <div>
      <Header />
      <MainPage>
        <Banner />
        <Tariffs />
        <About />
        <Contact />
        <Footer />
      </MainPage>
    </div>
  );
};

const MainPage = styled(Page)`
  margin-top: 200px;
  @media (max-width: 1060px) {
    margin-top: 140px;
  }
  @media (max-width: 768px) {
    margin-top: 100px;
  }
`;
