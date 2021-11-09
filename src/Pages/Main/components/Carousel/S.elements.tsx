import styled from 'styled-components/macro';
import { Button } from '../../../../components/Button/V2/Button';

export const SliderContainer = styled.div`
  margin-top: 94px;
  @media (max-width: 767px) {
    margin-top: 87px;
  }
  @media (max-width: 767px) {
    margin-top: 61px;
  }
  li.slick-active div {
    width: 20px !important;
    height: 6px !important;
    background: #fff !important;
    border-radius: 6px !important;
    @media (max-width: 576px) {
      background: #0094ff !important;
    }
  }
  ul {
    list-style: none;
  }
  .dots {
    position: absolute;
    bottom: 216px;
    left: 0px;
    width: 100%;
    max-width: 1128px;
    margin: 0 auto;
    padding: 0 34px;
    right: 0;
    justify-content: flex-start;
    display: flex !important;
    @media (max-width: 992px) {
      bottom: 170px;
    }
    @media (max-width: 870px) {
      bottom: 114px;
    }
    @media (max-width: 576px) {
      justify-content: center;
      bottom: 10px;
    }

    .dots_item {
      width: 6px;
      height: 6px;
      background: rgba(255, 255, 255, 0.4);
      border-radius: 6px;
      margin-right: 20px;
      cursor: pointer;
      transition: all 300ms ease;
      @media (max-width: 576px) {
        background: #9e9eb8;
      }
    }
    .dots_item_click {
      height: 5px;
      width: 20px;
      cursor: pointer;
      margin-right: 16px;
      margin-top: -5px;
      background: transparent !important;
      border: none;
    }
  }
`;

export const SlideItemWrap = styled.div`
  padding-bottom: 170px;
  @media (max-width: 1100px) {
    padding-bottom: 124px;
  }
  @media (max-width: 992px) {
    padding-bottom: 94px;
  }
  @media (max-width: 870px) {
    padding-bottom: 80px;
  }
  @media (max-width: 576px) {
    padding-bottom: 46px;
  }
`;

export const SlideItem = styled.div<{ bg: string }>`
  width: 100%;
  height: 724px;
  position: relative;
  background: #3f3e4e url(${(props) => props.bg}) no-repeat center;
  background-size: cover;
  padding-top: 204px;
  @media (max-width: 1100px) {
    height: 610px;
  }
  @media (max-width: 992px) {
    height: 490px;
    padding-top: 130px;
  }
  @media (max-width: 870px) {
    height: 388px;
    padding-top: 46px;
  }
  @media (max-width: 576px) {
    height: 240px;
  }
  @media (max-width: 520px) {
    ${Button} {
      display: none;
    }
  }
  @media (max-width: 375px) {
    height: 160px;
    padding-top: 30px;
  }
`;

export const SlideBlock = styled.div``;

export const Title = styled.h2`
  font-weight: 900;
  font-size: 48px;
  line-height: 56px;
  color: #fff;
  margin-bottom: 20px;
  @media (max-width: 870px) {
    font-size: 36px;
    line-height: 42px;
  }
  @media (max-width: 576px) {
    font-size: 18px;
    line-height: 21px;
  }
  @media (max-width: 375px) {
    margin-bottom: 9px;
  }
`;

export const Description = styled.p`
  max-width: 430px;
  width: 100%;
  font-weight: normal;
  font-size: 14px;
  line-height: 20px;
  color: #ffffff;
  margin-bottom: 40px;
  @media (max-width: 870px) {
    width: 296px;
    margin-bottom: 20px;
  }
  @media (max-width: 576px) {
    font-size: 12px;
    line-height: 18px;
  }
  @media (max-width: 520px) {
    width: 180px;
  }
`;

export const Image = styled.img`
  position: absolute;
  right: -45px;
  bottom: -500px;
  max-width: 1036px;
  @media (max-width: 1100px) {
    right: -40px;
    bottom: -336px;
    max-width: 884px;
  }
  @media (max-width: 992px) {
    right: -30px;
    bottom: -236px;
    max-width: 692px;
  }
  @media (max-width: 870px) {
    right: 57px;
    bottom: -200px;
    max-width: 558px;
  }
  @media (max-width: 767px) {
    right: -20px;
    bottom: -200px;
  }
  @media (max-width: 660px) {
    bottom: -150px;
    max-width: 488px;
  }
  @media (max-width: 576px) {
    right: -24px;
    bottom: -110px;
    max-width: 342px;
  }
  @media (max-width: 375px) {
    right: -39px;
    bottom: -44px;
    max-width: 236px;
  }
`;
