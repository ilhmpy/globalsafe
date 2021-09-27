import React from 'react';
import { Container } from '../../globalStyles';
import styled from 'styled-components/macro';
import { useTranslation } from 'react-i18next';
import { ReactComponent as FooterLogo } from "../../assets/svg/whiteFooterLogo.svg";
import { ReactComponent as Tg } from "../../assets/svg/tg2.svg";

export const Footer = () => {
  const { t } = useTranslation();

  return (
    <FooterBlock>
      <Container>
        <FooterHeader>
          <FooterLogo className="logo" />
          <FooterLinks>
            <FooterLink href="/#banner">Тарифы и программы</FooterLink>
            <FooterLink href="/#lottery">Розыгрыши</FooterLink>
            <FooterLink href="/#lottery">Обмены</FooterLink>
            <FooterLink>Правила</FooterLink>
          </FooterLinks>
        </FooterHeader>
        <FooterDesc>2021 © Globalsafe v2.0. Все права защищены.</FooterDesc>
        <a target="_blank" href="::t.me/joinchat/E_Acz5BKQnJlNTVi"><Tg className="tg" /></a>
      </Container>
    </FooterBlock>
  );
};


const FooterBlock = styled.footer`
  width: 100%;
  min-height: 217px;
  background: #3F3E4E;
  padding-top: 40px;
  padding-bottom: 40px;

  @media only screen and (min-device-width: 481px) and (max-device-width: 1024px) {
    padding-left: 20px;
  }

  @media only screen and (max-device-width: 480px) {
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

const FooterLink = styled.a`
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
    width: 178px;
  }

  @media only screen and (max-device-width: 480px) {
    text-align: center;
    width: 178px;
    margin: 0 auto;
    margin-top: 20px;
  }
`;