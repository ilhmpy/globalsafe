import React from "react";
import { Container } from "../../../../globalStyles";
import { H1 } from "../../../../components/UI/MainStyled";
import { Page } from "../../../../components/UI/Page";
import { UpTitle } from "../../../../components/UI/UpTitle";
import styled from "styled-components/macro";
import img1 from "../../../../assets/img/img1.jpg";
import img2 from "../../../../assets/img/img2.jpg";
import img3 from "../../../../assets/img/img3.jpg";
import { useTranslation } from "react-i18next";

export const About = () => {
  const { t } = useTranslation();
  return (
    <Page id="about">
      <Container>
        <UpTitle>{t("about.uptitle")}</UpTitle>
      </Container>
      <Container>
        <H1>{t("about.H1")}</H1>
      </Container>
      <BlockContainer>
        <BlockItem>
          <Img src={img1} alt="" />
          <BlockInner>
            <BlockTitle>{t("about.name1")}</BlockTitle>
            <BlockSubtitle>{t("about.position")}</BlockSubtitle>
          </BlockInner>
        </BlockItem>

        <BlockItem>
          <Img src={img2} alt="" />
          <BlockInner>
            <BlockTitle>{t("about.name2")}</BlockTitle>
            <BlockSubtitle>{t("about.position")}</BlockSubtitle>
          </BlockInner>
        </BlockItem>

        <BlockItem>
          <Img src={img3} alt="" />
          <BlockInner>
            <BlockTitle>{t("about.name3")}</BlockTitle>
            <BlockSubtitle>{t("about.position")}</BlockSubtitle>
          </BlockInner>
        </BlockItem>
      </BlockContainer>
      <Container>
        <Text>
          <span>{t("about.brand")}</span> - {t("about.desc")}
        </Text>
      </Container>
    </Page>
  );
};

const BlockContainer = styled(Container)`
  display: flex;
  justify-content: center;
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
  font-size: 18px;
  font-weight: 900;
  font-style: normal;
  letter-spacing: normal;
  line-height: normal;
  margin-bottom: 10px;
`;

const BlockSubtitle = styled.p`
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
  font-size: 14px;
  font-weight: 400;
  font-style: normal;
  letter-spacing: normal;
  line-height: 20px;
  span {
    font-weight: 500;
  }
`;
