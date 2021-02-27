import React from "react";
import { Container } from "../../../../globalStyles";
import { H1 } from "../../../../components/UI/MainStyled";
import { Page } from "../../../../components/UI/Page";
import { UpTitle } from "../../../../components/UI/UpTitle";
import styled from "styled-components/macro";
import img1 from "../../../../assets/img/img1.jpg";
import img2 from "../../../../assets/img/img2.jpg";
import img3 from "../../../../assets/img/img3.jpg";

export const About = () => {
  return (
    <Page>
      <Container id="about">
        <UpTitle>О нас</UpTitle>
      </Container>
      <Container>
        <H1>В деталях</H1>
      </Container>
      <BlockContainer>
        <BlockItem>
          <Img src={img1} alt="" />
          <BlockInner>
            <BlockTitle>Максим</BlockTitle>
            <BlockSubtitle>Учредитель</BlockSubtitle>
          </BlockInner>
        </BlockItem>

        <BlockItem>
          <Img src={img2} alt="" />
          <BlockInner>
            <BlockTitle>Светлана</BlockTitle>
            <BlockSubtitle>Учредитель</BlockSubtitle>
          </BlockInner>
        </BlockItem>

        <BlockItem>
          <Img src={img3} alt="" />
          <BlockInner>
            <BlockTitle>Ирина</BlockTitle>
            <BlockSubtitle>Учредитель</BlockSubtitle>
          </BlockInner>
        </BlockItem>
      </BlockContainer>
      <Container>
        <Text>
          <span>Global Safe</span> - это продукт, который создан специально для
          тех, кто не готов постоянно следить за котировками на бирже и
          самостоятельно работать на ней. Опытные трейдеры Фонда берут на себя
          заботы по приумножению ваших сбережений и инвестируют в самые
          высокодоходные активы платформы.
        </Text>
      </Container>
    </Page>
  );
};

const BlockContainer = styled(Container)`
  display: flex;
  justify-content: flex-start;
  @media (max-width: 768px) {
    flex-wrap: wrap;
  }
`;

const BlockItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 160px;
  margin: 20px 50px;
  &:first-child {
    margin-left: 0;
  }
  @media (max-width: 768px) {
    width: 100%;
    flex-direction: row;
    margin: 20px 0px;
  }
`;

const BlockInner = styled.div`
  @media (max-width: 768px) {
    margin-left: 20px;
  }
`;

const Img = styled.img`
  border-radius: 50%;
  margin-bottom: 20px;
  @media (max-width: 768px) {
    margin-bottom: 0px;
  }
  @media (max-width: 576px) {
    width: 80px;
    height: 80px;
  }
`;

const BlockTitle = styled.h4`
  color: #0e0d3d;
  font-size: 18px;
  font-weight: 900;
  font-style: normal;
  letter-spacing: normal;
  line-height: normal;
  margin-bottom: 10px;
`;

const BlockSubtitle = styled.p`
  color: #0e0d3d;
  font-size: 14px;
  font-weight: 400;
  font-style: normal;
  letter-spacing: normal;
  line-height: normal;
  white-space: nowrap;
`;

const Text = styled.p`
  width: 100%;
  text-align: left;
  margin-top: 41px;
  margin-bottom: 41px;
  color: #0e0d3d;
  font-size: 14px;
  font-weight: 400;
  font-style: normal;
  letter-spacing: normal;
  line-height: 20px;
  span {
    font-weight: 500;
  }
`;
