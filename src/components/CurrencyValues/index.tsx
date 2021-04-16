import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import styled from "styled-components/macro";
import moment from "moment";
import { Container, Card } from "../../globalStyles";
import lineRed from "../../assets/svg/lineRed.svg";
import lineBlue from "../../assets/svg/lineBlue.svg";
import lineGreen from "../../assets/svg/lineGreen.svg";

export const CurrencyValues = () => {
  const [active, setActive] = useState(0);
  return (
    <div>
      <Container>
        <Wrapper>
          <ChartItems>
            <ChartItem alfa>
              <ChartItemInner>
                <ChartItemName>GCWD</ChartItemName>
                <ChartItemValue red>707.39 CWD</ChartItemValue>
              </ChartItemInner>
              <img src={lineBlue} alt="" />
            </ChartItem>
            <ChartItem alfa>
              <ChartItemInner>
                <ChartItemName>MGCWD</ChartItemName>
                <ChartItemValue blue>437.39 CWD</ChartItemValue>
              </ChartItemInner>
              <img src={lineRed} alt="" />
            </ChartItem>
            <ChartItem alfa>
              <ChartItemInner>
                <ChartItemName>DIAMOND</ChartItemName>
                <ChartItemValue green>489.21 CWD</ChartItemValue>
              </ChartItemInner>
              <img src={lineGreen} alt="" />
            </ChartItem>
          </ChartItems>
          <Charts alfa>
            <ApexChart />
          </Charts>
        </Wrapper>
      </Container>
    </div>
  );
};

const ApexChart = () => {
  const data = {
    series: [
      {
        name: "STOCK ABC",
        data: ["12", "18"],
      },
    ],
    options: {
      chart: {
        type: "area",
        zoom: {
          enabled: false,
        },
        toolbar: {
          show: false,
        },
      },
      colors: ["#FF416E"],
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "smooth",
        width: 2,
      },
      labels: ["Сегодня", "18"],
      xaxis: {
        type: "category",
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
      },
      yaxis: {
        labels: {
          show: false,
        },
      },
      grid: {
        show: false,
      },
      legend: {
        horizontalAlign: "center",
      },
      tooltip: {
        custom: function ({ series, seriesIndex, dataPointIndex, w }: any) {
          return `
          <div class="column-toltip">
          <div class="column-toltip-light">fgh21</div>
            <div class="column-toltip-bold">dfhdfgh</div>
          </div>
          `;
        },
      },
      fill: {
        colors: ["#FF416E", "rgba(255, 255, 255, 0.4)"],
        type: "gradient",
        gradient: {
          shadeIntensity: 1,
          opacityFrom: 0.5,
          opacityTo: 0.6,
          stops: [0, 90, 100],
        },
      },
    },
  };

  return (
    <div id="chart">
      <Chart
        options={data.options}
        series={data.series}
        type="area"
        height={280}
      />
    </div>
  );
};

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  @media (max-width: 768px) {
    flex-wrap: wrap;
  }
`;

const Charts = styled(Card)`
  padding: 10px 36px;
  height: 300px;
  max-width: 700px;
  width: 100%;
  border: 1px solid #ffffff;
  @media (max-width: 768px) {
    max-width: 100%;
    height: auto;
    padding: 6px 0px;
  }
`;

const ChartItems = styled.div`
  width: 340px;
  margin-right: 20px;
  flex: none;
  @media (max-width: 768px) {
    width: 100%;
    margin-right: 0px;
  }
`;

const ChartItemInner = styled.div``;

const ChartItem = styled(Card)`
  text-align: left;
  margin: 0 auto;
  padding: 6px 18px;
  margin-bottom: 20px;
  display: flex;
  border: 1px solid #ffffff;
  justify-content: space-between;
  align-items: center;
`;

const ChartItemName = styled.div`
  font-weight: 500;
  font-size: 18px;
  margin-bottom: 10px;
  line-height: 21px;
  color: #515172;
`;

type Colors = {
  blue?: boolean;
  red?: boolean;
  green?: boolean;
};

const ChartItemValue = styled.div<Colors>`
  font-weight: 500;
  font-size: 36px;
  line-height: 42px;
  color: #ff416e;
  @media (max-width: 768px) {
    font-size: 24px;
    line-height: 28px;
  }
  ${(props) => {
    if (props.blue) {
      return `
            color:rgba(109, 185, 255, 1);
          `;
    }
    if (props.red) {
      return `
            color:rgba(255, 65, 110, 1);
          `;
    }
    if (props.green) {
      return `
            color:rgba(188, 212, 118, 1);
          `;
    } else {
      return `color:rgba(109, 185, 255, 1);`;
    }
  }}
`;
