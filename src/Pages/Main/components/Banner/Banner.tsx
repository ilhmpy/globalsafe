import React, { useEffect, useState } from "react";
import { UpTitle } from "../../../../components/UI/UpTitle";
import { Container } from "../../../../globalStyles";
import styled, { keyframes } from "styled-components/macro";
import { Button } from "../../../../components/Button/Button";
import { ReactComponent as Arrow } from "../../../../assets/svg/arrow.svg";
import { ReactComponent as Scroll } from "../../../../assets/svg/scroll.svg";
import { H1 } from "../../../../components/UI/MainStyled";
import { useTranslation } from "react-i18next";

export const Banner = () => {
  const { t } = useTranslation();
  const [scroll, setScroll] = useState(true);
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setScroll(false);
      } else {
        setScroll(true);
      }
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    <>
      <Container id="banner">
        <UpTitle small>{t("banner.uptitle")}</UpTitle>
      </Container>
      <Container>
        <H1>{t("banner.H1")}</H1>
      </Container>
      <Container>
        <TextBlock>
          <p>
            <span>{t("banner.brand")}</span> - {t("banner.desc")}
          </p>
        </TextBlock>
      </Container>
      {/* <Container>
        <ButtonIcon danger>
          Попробуйте бесплатно <ArrowIcon />
        </ButtonIcon>
      </Container> */}
      <ScrollContainer>{scroll && <ScrollIcon />}</ScrollContainer>
    </>
  );
};

const move = keyframes`
0% {
    transform: translate(0%,-3px);
    opacity: 1;
  }
  50% {
    /* transform: translate(0%,2px); */
    /* opacity: 1; */
  }
  100% {
    transform: translate(0%,6px);
    opacity: 0;
  }
`;

const ButtonIcon = styled(Button)`
  max-width: 252px;
  width: 100%;
  margin-right: auto;
  margin-bottom: 40px;
`;

const ArrowIcon = styled(Arrow)`
  margin-left: 10px;
`;

const TextBlock = styled.div`
  max-width: 622px;
  margin-right: auto;
  color: #515172;
  margin-bottom: 60px;
  line-height: 28px;
  span {
    font-weight: 500;
  }
  @media (max-width: 1060px) {
    margin-bottom: calc(40px + 38 * ((100vw - 320px) / 740));
    font-size: calc(12px + 4 * ((100vw - 320px) / 740));
    line-height: calc(18px + 10 * ((100vw - 320px) / 740));
  }
`;

const ScrollIconWrap = styled.div``;

const ScrollIcon = styled(Scroll)`
  .scroll {
    /* animation-name: ${move};
    animation-duration: 2s;
    animation-iteration-count: infinite; */
    animation: ${move} 2s linear infinite;
  }
`;

const ScrollContainer = styled(Container)`
  padding-top: 140px;
  padding-bottom: 140px;
  @media (max-width: 1060px) {
    display: none;
  }
`;
