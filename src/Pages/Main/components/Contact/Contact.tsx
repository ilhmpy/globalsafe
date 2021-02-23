import React from "react";
import styled from "styled-components/macro";
import { Container } from "../../../../globalStyles";
import { H1 } from "../../../../components/UI/MainStyled";
import { Page } from "../../../../components/UI/Page";
import { UpTitle } from "../../../../components/UI/UpTitle";

export const Contact = () => {
  return (
    <Page>
      <Container id="contact">
        <UpTitle>Контакты</UpTitle>
      </Container>
      <Container>
        <H1>Для связи</H1>
      </Container>
      <BlockContainer>
        <BlockItem>
          <SiteLink>https://www.globalsafe.me</SiteLink>
          <p>Сайт</p>
        </BlockItem>
        <BlockItem>
          <LinkBlock>
            <Link as="a" href="https://t.me/irinaganina3110">
              @irinaganina3110
            </Link>
            <span>Ирина Ганина</span>
          </LinkBlock>

          <LinkBlock>
            <Link as="a" href="https://t.me/smansurskaya">
              @smansurskaya
            </Link>
            <span>Светлана Мансурская</span>
          </LinkBlock>

          <LinkBlock>
            <Link as="a" href="https://t.me/sporttanets8">
              @sporttanets8
            </Link>
            <span>Максим Спортанец</span>
          </LinkBlock>
        </BlockItem>
      </BlockContainer>
    </Page>
  );
};

const BlockContainer = styled(Container)`
  display: flex;
  justify-content: flex-start;
  @media (max-width: 578px) {
    flex-wrap: wrap;
  }
`;

const BlockItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 50%;
  padding-right: 40px;
  @media (max-width: 578px) {
    width: 100%;
  }
  p {
    color: #0e0d3d;
    font-size: 14px;
    font-weight: 400;
    font-style: normal;
    letter-spacing: normal;
    line-height: normal;
    margin-bottom: 40px;
  }
`;

const SiteLink = styled.div`
  color: #0e0d3d;
  font-size: 18px;
  font-weight: 900;
  font-style: normal;
  letter-spacing: normal;
  line-height: normal;
  white-space: nowrap;
  margin-bottom: 10px;
  @media (max-width: 1060px) {
    font-size: calc(14px + 4 * ((100vw - 320px) / 740));
  }
`;

const LinkBlock = styled.div`
  margin-bottom: 40px;
  display: flex;
  flex-direction: column;
  span {
    color: #0e0d3d;
    font-size: 14px;
    font-weight: 400;
    font-style: normal;
    letter-spacing: normal;
    line-height: normal;
  }
`;

const Link = styled(SiteLink)`
  color: #00e;
`;
