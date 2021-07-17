import styled from 'styled-components/macro';
import { Button } from '../../../../components/Button/Button';
import { Container } from '../../../../globalStyles';

export const BlockBody = styled.div``;

export const BlockOne = styled.div`
  font-size: 14px;
  font-weight: 400;
  font-style: normal;
  text-align: center;
  letter-spacing: normal;
  line-height: normal;
  margin-bottom: 15px;
  p {
    padding-bottom: 10px;
  }
`;

export const BlockTitle = styled.div`
  font-size: 18px;
  font-weight: 900;
  font-style: normal;
  letter-spacing: normal;
  line-height: normal;
  margin-bottom: 20px;
`;

export const DescContainer = styled(Container)`
  margin-bottom: 27px;
  p {
    margin-right: auto;
    font-size: 14px;
    font-weight: 400;
    font-style: normal;
  }
  span {
    text-transform: uppercase;
  }
`;

export const DescContainerInner = styled(DescContainer)`
  p {
    padding-left: 6px;
  }
`;

export const BlockContainers = styled(Container)`
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  justify-content: start;
  @media (max-width: 992px) {
    display: none;
  }
`;

export const BlockItem = styled.div`
  width: 340px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 20px 10px;
  height: auto;
  background-color: ${(props) => props.theme.card.backgroundAlfa};
  border: 1px solid ${(props) => props.theme.card.border};
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  border-radius: 20px;
  padding-top: 40px;
  padding-bottom: 40px;
  padding-left: 30px;
  padding-right: 30px;
  ${Button} {
    margin-top: auto;
    max-width: 100%;
  }
`;

export const Text = styled.p`
  font-size: 14px;
  font-weight: 400;
  font-style: normal;
  text-align: center;
  letter-spacing: normal;
  line-height: normal;
  margin-bottom: 15px;
  p {
    padding-bottom: 10px;
  }
`;

export const SwiperContainer = styled(Container)`
  display: none;
  @media (max-width: 992px) {
    display: block;
  }
  ${BlockItem} {
    margin: 0px auto 35px;
    width: 100%;
    max-width: 340px;
    min-height: 280px;
  }
  .swiper-pagination-bullet {
    display: inline-block;
    width: 10px;
    height: 10px;
    font-size: 14px;
    line-height: 10px;
    background-color: transparent;
    border: 1px solid #515172;
    border-radius: 50%;
    margin-right: 10px;
    margin-top: 20px !important;
  }
  .swiper-pagination-bullet-active {
    background-color: #bad275;
  }
  .swiper-container-horizontal > .swiper-pagination-bullets {
    bottom: 0px;
  }
`;

export const ModalBlock = styled.div`
  max-width: 300px;
  width: 100%;
  margin: 0 auto;
  padding: 50px 0px;
  span {
    color: ${(props) => props.theme.text3};
    position: absolute;
    right: 20px;
    top: 20px;
    cursor: pointer;
    z-index: 9999;
    font-size: 18px;
    &:hover {
      color: #000;
    }
  }
  @media (max-width: 992px) {
    padding: 50px 20px;
    max-width: 280px;
  }
`;

export const ModalBlockBody = styled.div`
  padding: 0 45px;
  display: grid;
  justify-content: center;
  @media (max-width: 992px) {
    padding: 0 30px;
  }
  @media (max-width: 576px) {
    padding: 0 20px;
  }
`;

export const ModalButton = styled(Button)`
  min-width: 100%;
`;

export const ModalTitle = styled.h4`
  font-weight: 500;
  font-size: 24px;
  line-height: 28px;
  text-align: center;
  margin-bottom: 20px;
  width: 100%;
`;

export const PartnerProgramContainer = styled.div`
  width: 90%;
  margin: 0 auto;

  .swiper-pagination-bullets {
    align-items: center;
    display: flex;
    justify-content: center;
    margin-top: 30px;
  }

  .swiper-pagination-bullet {
    width: 7px;
    height: 7px;
    background: #c4c4c4;
    border-radius: 50%;
  }

  .swiper-pagination-bullet-active {
    width: 30px;
    height: 3px;
    border-radius: 4px;
    background: #ff416e;
  }
`;

export const PartnerProgramTitle = styled.h3<{ phone?: boolean }>`
  font-size: 1.7em;
  font-weight: 500;
  margin-bottom: 20px;
  text-align: center;
  color: ${({ theme }) => theme.partnerProgram.titleColor};
  display: ${({ phone }) => (phone != undefined ? 'none' : 'inline')};

  @media only screen and (max-device-width: 480px) {
    font-size: 1.5em;
    display: ${({ phone }) => (phone ? 'inline' : 'none')};
    color: ${({ theme }) => theme.partnerProgram.titlePhoneColor};
  }
`;

export const PartnerProgramData = styled.div`
  width: 100%;
  display: block;
`;

export const PartnerProgramHeader = styled.header`
  width: 100%;
  & > div {
    display: flex;
    align-items: center;
    padding-left: 181px;
    margin-bottom: 25px;
    padding-top: 25px;
  }
`;

export const PartnerProgramHeaderItem = styled.h3<{
  green?: boolean;
  red?: boolean;
  blue?: boolean;
  color?: string;
}>`
  color: ${({ green, red, blue, color }) => {
    if (!color) {
      if (green) return '#BCD476';
      if (blue) return '#6DB9FF';
      if (red) return '#FF416E';
    } else return color;
  }};
  text-transform: uppercase;
  display: block;
  margin-right: 5px;
  width: 35%;
  font-size: 1.3em;
  font-weight: bold;
`;

export const PartnerProgramLine = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  min-height: 30px;
  margin-bottom: 3px;

  &:nth-child(2n) {
    background: ${({ theme }) => theme.partnerProgram.nthItemBG};
  }

  & > div {
    display: flex;
  }

  &:last-child {
    margin-bottom: 30px;
  }

  .inner {
    width: 100%;
    display: flex;
  }

  @media only screen and (max-device-width: 1024px) {
    &:last-child {
      margin-bottom: 50px;
    }
  }
`;

export const PartnerProgramLineNumber = styled.header`
  width: 40%;
  max-width: 126px;
  color: ${({ theme }) => theme.partnerProgram.lineNumberColor};
`;

export const PartnerProgramLineItem = styled.div`
  margin-right: 5px;
  color: ${({ theme }) => theme.partnerProgram.lineItemColor};

  &:nth-child(1),
  &:nth-child(2) {
    width: 35%;
  }
`;

export const PartnerProgramBlock = styled.div<{ phone?: boolean }>`
  width: 100%;
  border-radius: 20px;
  background: ${({ theme }) => theme.partnerProgram.background};
  color: ${({ theme }) => theme.partnerProgram.color};
  padding-top: 26px;
  display: ${({ phone }) => (phone ? 'none' : 'block')};

  @media only screen and (max-device-width: 1024px) {
    margin-top: 20px;
    padding-top: 20px;
    display: ${({ phone }) => (phone ? 'block' : 'none')};
    border: 1px solid #000;
    max-width: 340px;

    ${PartnerProgramHeaderItem} {
      text-align: center;
      font-size: 1.35em;
      margin: 0 auto;
      margin-bottom: 20px;
      line-height: 41px;
    }

    ${PartnerProgramLine} {
      margin-left: 19px;
      &:nth-child(2n) {
        background: 0;
      }
    }

    ${PartnerProgramLineNumber} {
      width: 64%;
    }

    @media only screen and (min-device-width: 481px) and (max-device-width: 900px) {
      max-width: 300px;
    }
  }
`;

export const PartnerProgramPagination = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  margin-top: 13px;
`;

export const PartnerProgramPaginationItem = styled.span<{ active?: boolean }>`
  margin-right: 5px;
  display: block;

  ${({ active }) => {
    if (active) {
      return `
        width: 30px;
        height: 3px;
        border-radius: 4px;
        background: #FF416E;
      `;
    } else
      return `
        width: 7px;
        height: 7px;
        background: #C4C4C4;
        border-radius: 50%;
    `;
  }}
`;
