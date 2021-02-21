import React from "react";
import { UpTitle } from "../../../../components/UI/UpTitle";
import { Container } from "../../../../globalStyles";
import styled from "styled-components/macro";
import { Button } from "../../../../components/Button/Button";
import { ReactComponent as Arrow } from "../../../../assets/svg/arrow.svg";
import { ReactComponent as Scroll } from "../../../../assets/svg/scroll.svg";
import { H1 } from "../../../../components/UI/MainStyled";

export const Banner = () => {
  return (
    <>
      <Container id="banner">
        <UpTitle small>Емко и по-делу</UpTitle>
      </Container>
      <Container>
        <H1>Приумножайте правильно!</H1>
      </Container>
      <Container>
        <TextBlock>
          <p>
            <span>GlobalSafe</span> - Это современный Криптофонд для управления
            вашими средствами и их приумножения под контролем наших лучших
            специалистов!!
          </p>
        </TextBlock>
      </Container>
      {/* <Container>
        <ButtonIcon danger>
          Попробуйте бесплатно <ArrowIcon />
        </ButtonIcon>
      </Container> */}
      <ScrollContainer>
        <Scroll />
      </ScrollContainer>
    </>
  );
};

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

  }
`;

const ScrollContainer = styled(Container)`
  padding-top: 140px;
  padding-bottom: 140px;
  @media (max-width: 1060px) {
    display: none;
  }
`;
