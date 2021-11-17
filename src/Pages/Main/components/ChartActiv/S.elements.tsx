import styled from 'styled-components/macro';

export const ChartContainer = styled.div`
  padding: 40px;
  background: ${({ theme }) => theme.main.blocksBackground}; 
  box-shadow: 0px 80px 80px -40px rgba(220, 220, 232, 0.5);
  border-radius: 4px;
  margin-bottom: 20px;
  @media (max-width: 992px) {
    padding: 20px 15px 60px 15px;
  }
  @media (max-width: 767px) {
    padding: 20px 0;
    margin-bottom: 9px;
  }
`;

export const ChartHeader = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  @media (max-width: 992px) {
    padding-left: 5px;
    padding-right: 5px;
  }
  @media (max-width: 767px) {
    flex-wrap: wrap;
    padding-left: 0;
    padding-right: 0;
  }
`;

export const PriceChanges = styled.div`
  display: flex;
  margin-bottom: 10px;
  @media (max-width: 767px) {
    width: 100%;
    padding: 0 20px;
    margin-bottom: 8px;
  }
`;

export const PriceChangesWrap = styled.div`
  margin-bottom: 7px;
  @media (max-width: 767px) {
    width: 100%;
    margin-bottom: 0;
  }
`;

export const Price = styled.span<{ red?: boolean; green?: boolean }>`
  font-weight: bold;
  font-size: 18px;
  line-height: 24px;
  color: ${(props) => props.theme.v2.text};
  svg {
    margin-right: 5px;
  }
  &:last-child {
    margin-left: 20px;
  }
  @media (max-width: 767px) {
    font-size: 14px;
    line-height: 20px;
    text-align: center;
    &:last-child {
      margin-left: auto;
    }
  }
  ${(props) => {
    if (props.red) {
      return `
      color: #FF5454;
      svg{
        transform: rotate(180deg);
        path{
          fill: #FF5454;
        }
      }
      `;
    }
    if (props.green) {
      return `
      color: #92BF58;
      `;
    }
  }}
`;

export const Date = styled.div`
  font-size: 12px;
  line-height: 14px;
  color: #000000;
  @media (max-width: 767px) {
    padding: 0 20px 20px;
    border-bottom: 1px solid #eaeff8;
    text-align: left;
    margin: 0 auto 8px;
    width: 100%;
  }
`;

export const Buttons = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 40px;
  @media (max-width: 992px) {
    display: none;
  }
`;

export const ButtonsList = styled.div`
  display: none;
  @media (max-width: 992px) {
    display: block;
  }
  @media (max-width: 767px) {
    margin: 0 auto;
    width: 100%;
    display: flex;
    margin: 0 auto;
    justify-content: center;
  }
`;

export const ButtonsDropdown = styled.div``;

export const Button = styled.button<{ active: boolean }>`
  appearance: none;
  display: inline-block;
  border: none;
  font-weight: normal;
  font-size: 12px;
  line-height: 14px;
  cursor: pointer;
  color: ${(props) => (props.active ? '#fff' : props.theme.v2.text)};
  background: ${(props) => (props.active ? ' #0094FF' : props.theme.charts.chartButtonBg)};
  border-radius: 4px;
  padding: 5px 10px;
  opacity: ${(props) => props.active ? "100%" : props.theme.charts.chartOpacityBtn};
  margin-right: 10px;
  &:last-child {
    margin-right: 0;
  }
  &:focus {
    outline: none;
  }
`;

export const ChartList = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const ChartItem = styled.div<{ active?: boolean }>`
  background: #ffff;
  border-radius: 4px;
  padding: 20px;
  cursor: pointer;
  height: 94px;
  user-select: none;
  position: relative;
  ${(props) => {
    if (props.active) {
      return `
      border: 1px solid #0094FF;
      box-shadow: 0px 16px 30px -8px rgba(220, 220, 232, 0.5);
      `;
    }
  }}
`;

export const ChartName = styled.div`
  font-size: 12px;
  line-height: 14px;
  color: #000000;
  margin-bottom: 2px;
`;

export const ChartValue = styled.div`
  font-weight: bold;
  font-size: 18px;
  line-height: 24px;
  margin-bottom: 2px;
  @media (max-width: 992px) {
    font-size: 16px;
    line-height: 22px;
  }
`;

export const ChartProcent = styled.div<{ red: boolean }>`
  font-size: 12px;
  line-height: 14px;
  color: ${(props) => (props.red ? '#FF5454' : '#92BF58')};
`;

export const ChartGraph = styled.div`
  width: 60px;
  position: absolute;
  right: 16px;
  top: 4px;
  @media (max-width: 992px) {
    display: none;
  }
  @media (max-width: 767px) {
    display: block;
    width: 100px;
  }
`;

export const SliderNav = styled.div`
  .slick-slide > div {
    margin-right: 20px;
  }
  .slick-slide:last-child > div {
    margin-right: 0;
  }
  .slick-current > div {
    border: 1px solid #0094ff;
    box-sizing: border-box;
    box-shadow: 0px 16px 30px -8px rgba(220, 220, 232, 0.5);
    border-radius: 4px;
  }
`;

export const SwiperContainer = styled.div`
  .thumb {
    border: 1px solid #fff;
  }
  .mySwiper .swiper-slide-thumb-active {
    border: 1px solid #0094ff;
    box-sizing: border-box;
    box-shadow: 0px 16px 30px -8px rgba(220, 220, 232, 0.5);
    border-radius: 4px;
  }

  .swiper-container-horizontal > .swiper-pagination-bullets .swiper-pagination-bullet-active {
    background: #0094ff !important;
    border-radius: 6px !important;
    width: 20px !important;
    height: 6px !important;
  }
  .swiper-container-horizontal > .swiper-pagination-bullets .swiper-pagination-bullet {
    width: 6px;
    height: 6px;
    background: #9e9eb8;
    border-radius: 50%;
    transition: all 300ms ease;
  }
  .swiper-pagination {
    display: none;
    @media (max-width: 767px) {
      display: block;
      bottom: 14px;
    }
  }
`;

export const SubChartMob = styled.div`
  display: none;
  @media (max-width: 767px) {
    display: block;
    margin: 0 20px;
    padding-bottom: 46px;
  }
`;

export const ThumbSlider = styled.div`
  @media (max-width: 767px) {
    display: none;
  }
`;

export const MobTooltips = styled.div`
  display: none;
  width: 100%;
  text-align: center;
  margin: 0 auto 10px;
  @media (max-width: 767px) {
    display: block;
  }
`;

export const TooltipsDate = styled.div`
  font-size: 12px;
  line-height: 14px;
  margin-bottom: 5px;
`;

export const TooltipsValue = styled.div`
  font-size: 18px;
  line-height: 24px;
`;

export const MobChartBlock = styled.div<{ mob?: boolean }>`
  display: ${(props) => (props.mob ? 'none' : 'block')};
  @media (max-width: 767px) {
    display: ${(props) => (props.mob ? 'block' : 'none')};
  }
  .highcharts-plot-background {
    fill: #f7f8fa;
  }
  .highcharts-yaxis-labels,
  .highcharts-xaxis-labels {
    font-family: 'Roboto', sans-serif;
  }
`;
