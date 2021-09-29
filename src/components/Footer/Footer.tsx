import { FC } from 'react';
import { Container } from '../../globalStyles';
import styled from 'styled-components/macro';
import { useTranslation } from 'react-i18next';
import { ReactComponent as FooterLogo } from "../../assets/svg/whiteFooterLogo.svg";
import { ReactComponent as Tg } from "../../assets/svg/tg2.svg";
import { Link } from 'react-scroll';
import { NavHashLink } from 'react-router-hash-link';

type FooterType = {
  other?: boolean;
}

export const Footer: FC<FooterType> = ({ other }: FooterType) => {
  const { t } = useTranslation();

  const scrollWidthOffset = (el: any) => {
    const yCoordinate = el.getBoundingClientRect().top + window.pageYOffset;
    const yOffset = -80;
    window.scrollTo({ top: yCoordinate + yOffset, behavior: 'smooth' });
  };

  return (
    <FooterBlock other={other}>
      <Container>
        <FooterHeader>
          <FooterLogo className="logo" />
          <FooterLinks>
            <FooterLink to="/#deposits" scroll={(el) => scrollWidthOffset(el)}>Тарифы и программы</FooterLink>
            <FooterLink to="/#lottery" scroll={(el) => scrollWidthOffset(el)}>Розыгрыши</FooterLink>
            <FooterLink to="/#lottery" scroll={(el) => scrollWidthOffset(el)}>Обмены</FooterLink>
            <FooterLink to="/#banner" scroll={(el) => scrollWidthOffset(el)}>Правила</FooterLink>
          </FooterLinks>
        </FooterHeader>
        <FooterDesc>2021 © Globalsafe v2.0. Все права защищены.</FooterDesc>
        <a target="_blank" href="::t.me/joinchat/E_Acz5BKQnJlNTVi"><Tg className="tg" /></a>
      </Container>
    </FooterBlock>
  );
};


const FooterBlock = styled.footer<{ other?: boolean; }>`
  width: 100%;
  min-height: 217px;
  max-height: 217px;
  background: #3F3E4E;
  padding-top: 40px;
  padding-bottom: 40px;

  @media only screen and (min-device-width: 481px) and (max-device-width: 1024px) {
    padding-left: 20px;
    min-height: 188px;
    max-height: 188px;
  }

  @media only screen and (max-device-width: 480px) {
    min-height: 320px;
    max-height: 320px;
    
    .logo {
      display: none;
    }
    
    .tg {
      position: absolute;
      margin-left: auto;
      margin-right: auto;
      right: 0;
      left: 0;
      bottom: 100px;
    }
  }

  ${({ other }) => {
    if (other) {
      return `
        @media only screen and (min-device-width: 320px) and (max-device-width: 429px) {
          .tg {
            bottom: 15px;
          }
        }
      
        @media only screen and (min-device-width: 430px) and (max-device-width: 480px) {
          .tg {
            bottom: -126px;
          }
        }
      `;
    };
  }}
`;

const FooterHeader = styled.header`
  width: 100%;
  display: flex;
  position: relative;
  margin-bottom: 38px;

  @media only screen and (max-device-width: 480px) {
    margin: 0 auto;
    margin-bottom: 38px;
    max-width: 145px;
  }

  @media only screen and (min-device-width: 481px) and (max-device-width: 1024px) {
    margin-bottom: 20px;
  }
`;

const FooterLinks = styled.div`
  display: flex;
  position: absolute;
  right: 0;

  @media only screen and (max-device-width: 480px) {
    position: relative;
    flex-wrap: wrap;
    text-align: center;
    margin: 0 auto;
  }
`;

const FooterLink = styled(NavHashLink)`
  color: #fff;
  font-weight: 500;
  font-size: 14px;
  line-height: 17px;
  text-decoration: underline;
  margin-right: 38px;
  cursor: pointer;

  @media only screen and (max-device-width: 480px) {
    text-align: center;
    display: block;
    width: 145px;
    margin-bottom: 20px;
  }
`;

const FooterDesc = styled.h3`
  margin-bottom: 38px;
  color: #fff;
  font-weight: 400;
  font-size: 14px;
  line-height: 17px;
  
  @media only screen and (min-device-width: 481px) and (max-device-width: 1024px) {
    width: 170px;
    margin-bottom: 20px;
  }

  @media only screen and (max-device-width: 480px) {
    text-align: center;
    width: 170px;
    margin: 0 auto;
    margin-top: 20px;
  }
`;