import React from "react";
import { Container } from "../../../../globalStyles";
import { H1 } from "../../../../components/UI/MainStyled";
import { Page } from "../../../../components/UI/Page";
import { UpTitle } from "../../../../components/UI/UpTitle";
import img1 from "../../../../assets/img/1.png";
import img2 from "../../../../assets/img/2.png";
import img3 from "../../../../assets/img/3.png";
import { useTranslation } from "react-i18next";
import * as Styled from "./About.elements";
import { ReactComponent as Tlg } from "../../../../assets/svg/tg.svg";

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

      <Container>
        <Styled.Text>
          <span>{t("about.brand")}</span> - {t("about.desc")}
        </Styled.Text>
      </Container>
      {/* <Container>
        <Styled.ButtonIcon blue>
          К обсуждению
          <Tlg />
        </Styled.ButtonIcon>
      </Container> */}

      <Styled.BlockContainer>
        <Styled.BlockItem>
          <Styled.Img src={img1} alt="" />
          <Styled.BlockInner>
            <Styled.BlockTitle>
              {t("about.name3")} <Styled.Dot /> {t("about.position")}
            </Styled.BlockTitle>
            <Styled.BlockSubtitle>
              {/* {t("about.desc1")}
              <br /> {t("about.desc2")} */}
            </Styled.BlockSubtitle>
          </Styled.BlockInner>
        </Styled.BlockItem>

        <Styled.BlockItem>
          <Styled.Img src={img2} alt="" />
          <Styled.BlockInner mod>
            <Styled.BlockTitle>
              {t("about.name1")}
              <Styled.Dot />
              <br /> {t("about.position1")}
            </Styled.BlockTitle>
            <Styled.BlockSubtitle>
              {t("about.self1")}
              <br /> {t("about.impement")}
            </Styled.BlockSubtitle>
          </Styled.BlockInner>
        </Styled.BlockItem>

        <Styled.BlockItem>
          <Styled.Img src={img3} alt="" />
          <Styled.BlockInner>
            <Styled.BlockTitle>
              {t("about.name2")} <Styled.Dot /> {t("about.position")}
            </Styled.BlockTitle>
            <Styled.BlockSubtitle>
              {/* {t("about.desc1")}
              <br /> {t("about.desc2")} */}
            </Styled.BlockSubtitle>
          </Styled.BlockInner>
        </Styled.BlockItem>
      </Styled.BlockContainer>
    </Page>
  );
};
