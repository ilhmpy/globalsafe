import styled from 'styled-components';
import { Swiper } from 'swiper/react';
import { Program } from '../components/Program';
import { BlockBox } from '../components/Tiles/styled';
import { Container as MainContainer } from '../../../components/UI/Container';

export const Container = styled.div`
  margin-bottom: 50px;
  @media (max-width: 1024px) {
    margin-bottom: 40px;
  }
`;

export const NotDeposits = styled.div`
  font-weight: normal;
  font-size: 14px;
  line-height: 20px;
  margin: 20px 0;
`;

export const StyledProgram = styled(Program)`
  padding: 0;
`;

export const SwiperUI = styled(Swiper)`
  /* max-height: 290px; */
  height: 100%;
`;

export const SwiperContainer = styled(MainContainer)`
  display: none;
  @media (max-width: 992px) {
    display: block;
  }
  ${BlockBox} {
    margin: 0px auto 35px;
    width: 100%;
    max-width: 340px;
    min-height: 260px;
  }
  .swiper-slide {
    display: flex;
    justify-content: center;
  }
  .swiper-pagination-bullet {
    width: 7px;
    height: 7px;
    background: #9e9eb8;
    border-radius: 50%;
  }
  .swiper-pagination-bullet-active {
    width: 20px;
    height: 6px;
    background: #0094ff;
    border-radius: 6px;
  }
  .swiper-container-horizontal > .swiper-pagination-bullets {
    bottom: 0px;
  }
`;

export const ProgressBar = styled.div`
  position: absolute;
  width: 240px;
  height: 4px;
  left: 20px;
  top: 98%;
  background: #ebebf2;
  border: 1px solid #ffffff;
  border-radius: 2px;
  @media (min-width: 768px) {
    width: 210px;
  }
`;

export const Bar = styled.p<{ percent?: number }>`
  position: relative;
  max-width: 100%;
  height: 2px;
  width: ${(props) => (props.percent ? props.percent : 100)}%;
  background: #0094ff;
  border-radius: 2px;
`;
