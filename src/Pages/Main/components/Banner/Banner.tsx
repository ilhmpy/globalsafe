import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-scroll';
import styled from 'styled-components/macro';
import { ReactComponent as Arrow } from '../../../../assets/svg/arrow.svg';
import { Button } from '../../../../components/Button/Button';
import { CurrencyValues } from '../../../../components/CurrencyValues';
import { H1 } from '../../../../components/UI/MainStyled';
import { UpTitle } from '../../../../components/UI/UpTitle';
import { Container } from '../../../../globalStyles';

export const Banner = () => {
  const { t } = useTranslation();

  return (
    <>
      <Container id="banner">
        {/* <UpTitle small>Емко и по-делу</UpTitle> */}
        <UpTitle small>{t('banner.uptitle')}</UpTitle>
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
      <Container>
        <ButtonIcon as="button" danger>
          <Link
            to="tariffs"
            spy={true}
            smooth={true}
            offset={-50}
            duration={500}>
            {t('banner.toProgramm')} <ArrowIcon />
          </Link>
        </ButtonIcon>
      </Container>
      <CurrencyValues />
      {/* <Container>
        <ButtonIcon danger>
          Попробуйте бесплатно <ArrowIcon />
        </ButtonIcon>
      </Container> */}
      {/* <ScrollContainer>
        <Scroll />
      </ScrollContainer> */}
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
  max-width: 611px;
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
