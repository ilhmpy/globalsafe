import styled, { css } from 'styled-components/macro';
import { Container as Wrap } from '../../../components/UI/Container';
import { Button } from '../../../components/Button/V2/Button';

export const Container = styled.div`
  padding-bottom: 40px;
`;

const style = css`
  background: #ffffff;
  box-shadow: 0px 40px 40px -40px rgba(220, 220, 232, 0.5);
  border-radius: 4px;
`;

const swiper = css`
  .swiper-slide {
    display: flex;
    align-content: stretch;
    padding-bottom: 40px;
  }

  .swiper-container-horizontal > .swiper-pagination-bullets .swiper-pagination-bullet {
    width: 6px;
    height: 6px;
    background: #9e9eb8;
    border-radius: 6px;
    margin-right: 16px;
    cursor: pointer;
    transition: all 300ms ease;
  }
  .swiper-container-horizontal > .swiper-pagination-bullets .swiper-pagination-bullet-active {
    width: 20px;
    height: 6px;
    border-radius: 6px;
    background: #0094ff;
  }
`;

export const SubHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 20px;
`;

export const ActiveCertWrapper = styled.div`
  margin: 0 auto;
  ${swiper};
`;

export const ActiveCert = styled.div`
  ${style};
  padding: 40px;
  display: flex;
  justify-content: space-between;
  margin-bottom: 40px;
  box-shadow: 0px 40px 40px -20px rgba(220, 220, 232, 0.5);
  border-radius: 4px;
  @media (max-width: 992px) {
    padding: 40px 20px;
  }
  @media (max-width: 767px) {
    flex-wrap: wrap;
    padding: 20px;
    margin-bottom: 0px;
  }
`;

export const ActiveCertItem = styled.div`
  flex: 1;
  padding-left: 20px;
  @media (max-width: 768px) {
    flex: none;
    padding-bottom: 20px;
    width: 100%;
  }
`;

export const AvilableCertificates = styled(Wrap)`
  display: flex;
  align-items: stretch;
  justify-content: flex-start;
  max-width: 1148px;
  flex-wrap: wrap;
  ${swiper};
`;

export const AvilableCertificatesItem = styled.div`
  padding: 40px;
  max-width: 340px;
  min-width: 300px;
  width: 100%;
  flex: 1;
  ${style};
  margin: 10px;
  flex-direction: column;
  display: flex;
  box-shadow: 0px 40px 40px -20px rgba(220, 220, 232, 0.5);
  border-radius: 4px;
  ${Button} {
    margin-top: auto;
  }
  @media (max-width: 992px) {
    padding: 20px;
    min-width: 220px;
  }
  @media (max-width: 767px) {
    max-width: 100%;
    margin: 10px 0;
  }
`;

export const SwiperContainer = styled.div`
  width: 100%;
`;

export const Tabs = styled.div`
  display: none;
  width: 100%;
  margin-bottom: 20px;
  @media (max-width: 767px) {
    display: flex;
  }
`;

export const Tab = styled.div<{ active: boolean }>`
  width: 50%;
  text-align: center;
  padding: 6px 20px;
  font-weight: normal;
  font-size: 12px;
  line-height: 14px;
  color: ${(props) => (props.active ? '#000' : 'rgba(0, 0, 0, .6)')};
  border: 1px solid #ebebf2;
  border-radius: 0px 2px 2px 0px;
  transition: 0.2s;
  background: ${(props) => (props.active ? '#EBEBF2;' : 'transparent')};
  cursor: pointer;
`;

export const Heading = styled.div`
  display: flex;
  flex-direction: column;
  @media (max-width: 768px) {
    flex-direction: column-reverse;
  }
`;
