import React, { FC } from "react";
import Chart from "react-apexcharts";
import styled from "styled-components/macro";
import moment from "moment";

type Props = {
  series: number[];
  labels: string[];
  percent?: boolean;
  mobHeight?: number;
  mobLegend?: number;
};

export const TestChart: FC<Props> = ({
  series,
  labels,
  percent = false,
  mobHeight = 400,
  mobLegend = 240,
}: Props) => {
  const data = {
    series: series,
    options: {
      chart: {
        // width: 500,
        type: "donut",
      },
      dataLabels: {
        enabled: false,
      },
      plotOptions: {
        pie: {
          width: 500,
          donut: {
            labels: {
              show: true,
              total: {
                showAlways: true,
                show: true,
                label: "CWD",
                offsetY: 60,
                formatter: function (w: any) {
                  return `${w.globals.seriesTotals
                    .reduce((a: any, b: any) => {
                      return a + b;
                    }, 0)
                    .toLocaleString()}`;
                },
              },
              value: {
                show: true,
                fontSize: "24px",
                fontFamily: "Roboto, sans-serif",
                fontWeight: 500,
                color: "#0E0D3D",
                offsetY: -10,
              },
              name: {
                show: true,
                fontSize: "22px",
                fontFamily: "Roboto, sans-serif",
                fontWeight: 600,
                color: undefined,
                offsetY: 30,
              },
            },
          },
        },
      },
      labels: labels,
      legend: {
        // position: "right",
        fontSize: "18px",
        fontFamily: "Roboto, sans-serif",
        fontWeight: 400,
        markers: {
          width: 15,
          height: 15,
          radius: 15,
          offsetX: 10,
        },
        itemMargin: {
          horizontal: 10,
          vertical: 10,
        },
      },
      // colors: colors,
      tooltip: {
        enabled: true,
        theme: "light",
        followCursor: true,
        custom: function ({ series, seriesIndex, dataPointIndex, w }: any) {
          if (percent) {
            return `
            <div class="chart-toltip">
            <div class="chart-tottip-light">${
              w.config.labels[seriesIndex]
            }</div> 
              <div>${(
                (series[seriesIndex] /
                  w.globals.seriesTotals.reduce((a: any, b: any) => {
                    return a + b;
                  }, 0)) *
                100
              ).toFixed(2)} %</div>
            </div> 
            `;
          } else {
            return `
          <div class="chart-toltip">
          <div class="chart-tottip-light">${w.config.labels[seriesIndex]}</div> 
            <div class="chart-tottip-bold">${series[
              seriesIndex
            ].toLocaleString()} CWD</div>
          </div> 
          `;
          }
        },
      },
      responsive: [
        {
          breakpoint: 990,
          options: {
            chart: {
              // width: 500,
              height: 800,
            },
            legend: {
              width: mobLegend,
              height: mobHeight,
              // show: false,
              horizontalAlign: "center",
              position: "bottom",
            },
          },
        },
      ],
    },
  };

  return (
    <div className="app">
      <div className="row">
        <ChartWrap>
          <Chart options={data.options} series={data.series} type="donut" />
        </ChartWrap>
      </div>
    </div>
  );
};

const ChartWrap = styled.div`
  margin-top: 30px;
  .apexcharts-legend-series {
    width: 125px;
    text-align: right;
    @media (max-width: 992px) {
      width: auto;
    }
  }
`;

type PropsColumn = {
  date: string[];
  value: number[] | string[];
};

export const ColumnChart: FC<PropsColumn> = ({ date, value }) => {
  const data = {
    series: [
      {
        data: value,
      },
    ],

    options: {
      chart: {
        type: "bar",
        events: {
          click: function (chart: any, w: any, e: any) {},
        },
        toolbar: {
          show: false,
        },
      },
      fill: {
        colors: ["#6DB9FF"],
      },
      states: {
        normal: {
          filter: {
            type: "none",
            value: 0,
          },
        },
        hover: {
          filter: {
            type: "darken",
            value: 0.5,
          },
        },
      },
      xaxis: {
        categories: date,
        labels: {
          show: false,
        },
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
      },
      yaxis: {
        fillColor: "#B3F7CA",
        labels: {
          background: "#775DD0",
          formatter: function (value: any) {
            if (value >= 1000000) {
              return (value / 1000000).toFixed(1) + "M";
            } else if (value >= 1000 && value < 1000000) {
              return (value / 1000).toFixed(1) + "k";
            } else {
              return value;
            }
          },
          style: {
            colors: [],
            fontSize: "10px",
            fontFamily: "Roboto, sans-serif",
            fontWeight: 400,
            cssClass: "apexcharts-yaxis-label",
          },
        },
      },
      tooltip: {
        custom: function ({ series, seriesIndex, dataPointIndex, w }: any) {
          return `
          <div class="column-toltip">
          <div class="column-toltip-light">${moment(
            w.globals.labels[dataPointIndex]
          ).format("DD MMMM YYYY")}</div>
            <div class="column-toltip-bold">${w.globals.stackedSeriesTotals[
              dataPointIndex
            ].toLocaleString()}</div>
          </div>
          `;
        },
        // enabled: false,
        fixed: {
          enabled: true,
          position: "topLeft", // topRight, topLeft, bottomRight, bottomLeft
          offsetY: 0,
          offsetX: 110,
        },
      },
      legend: {
        horizontalAlign: "center",
        offsetX: 0,
        show: false,
      },
      grid: {
        show: false,
      },
      plotOptions: {
        bar: {
          borderRadius: 6,
          columnWidth: "45%",
          distributed: false,
        },
      },
      dataLabels: {
        enabled: false,
      },
    },
  };

  return (
    <div id="chart1" style={{ position: "relative" }}>
      <Chart
        options={data.options}
        series={data.series}
        type="bar"
        height={287}
      />
    </div>
  );
};

export const ColumnChartCwd: FC<PropsColumn> = ({
  date = [""],
  value = [""],
}) => {
  const data = {
    series: [
      {
        data: value,
      },
    ],
    options: {
      chart: {
        type: "bar",
        events: {
          click: function (chart: any, w: any, e: any) {},
        },
        toolbar: {
          show: false,
        },
      },
      fill: {
        colors: ["#6DB9FF"],
      },
      states: {
        normal: {
          filter: {
            type: "none",
            value: 0,
          },
        },
        hover: {
          filter: {
            type: "darken",
            value: 0.5,
          },
        },
      },
      xaxis: {
        categories: date,
        labels: {
          show: false,
        },
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
      },
      yaxis: {
        fillColor: "#B3F7CA",
        labels: {
          background: "#775DD0",
          formatter: function (value: any) {
            if (value >= 1000000) {
              return (value / 1000000).toFixed(1) + "M";
            } else if (value >= 1000 && value < 1000000) {
              return (value / 1000).toFixed(1) + "k";
            } else {
              return value;
            }
          },
          style: {
            colors: [],
            fontSize: "10px",
            fontFamily: "Roboto, sans-serif",
            fontWeight: 400,
            cssClass: "apexcharts-yaxis-label",
          },
        },
      },
      tooltip: {
        custom: function ({ series, seriesIndex, dataPointIndex, w }: any) {
          return `
          <div class="column-toltip">
          <div class="column-toltip-light">${moment(
            w.globals.labels[dataPointIndex]
          ).format("DD MMMM YYYY")}</div>
            <div class="column-toltip-bold">${w.globals.stackedSeriesTotals[
              dataPointIndex
            ].toLocaleString()}</div>
          </div>
          `;
        },
        // enabled: false,
        fixed: {
          enabled: true,
          position: "topLeft", // topRight, topLeft, bottomRight, bottomLeft
          offsetY: 0,
          offsetX: 110,
        },
      },
      legend: {
        horizontalAlign: "center",
        offsetX: 0,
        show: false,
      },
      grid: {
        show: false,
      },
      plotOptions: {
        bar: {
          borderRadius: 6,
          columnWidth: "45%",
          distributed: false,
        },
      },
      dataLabels: {
        enabled: false,
      },
    },
  };

  return (
    <div id="chart1" style={{ position: "relative" }}>
      <Chart
        options={data.options}
        series={data.series}
        type="bar"
        height={287}
      />
    </div>
  );
};

export const ColumnChartThree: FC<PropsColumn> = ({ date, value }) => {
  const data = {
    series: [
      {
        data: value,
      },
    ],
    options: {
      chart: {
        type: "bar",
        height: 350,
        toolbar: {
          show: false,
        },
      },
      grid: {
        show: false,
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: "45%",
          endingShape: "rounded",
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        show: true,
        width: 2,
        colors: ["transparent"],
      },
      xaxis: {
        categories: date,
        labels: {
          show: false,
          style: {
            fontSize: "10px",
          },
          offsetY: -4,
        },
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
      },
      fill: {
        colors: ["#6DB9FF"],
      },
      states: {
        normal: {
          filter: {
            type: "none",
            value: 0,
          },
        },
        hover: {
          filter: {
            type: "darken",
            value: 0.5,
          },
        },
      },
      tooltip: {
        custom: function ({ series, seriesIndex, dataPointIndex, w }: any) {
          return `
          <div class="column-toltip">
          <div class="column-toltip-light">${moment(
            w.globals.labels[dataPointIndex]
          ).format("DD MMMM YYYY")}</div>
            <div class="column-toltip-bold">${w.globals.stackedSeriesTotals[
              dataPointIndex
            ].toLocaleString()} CWD</div>
          </div>
          `;
        },
        // enabled: false,
        fixed: {
          enabled: true,
          position: "topLeft",
          offsetY: 0,
          offsetX: 110,
        },
      },
      yaxis: {
        fillColor: "#B3F7CA",
        labels: {
          background: "#775DD0",
          formatter: function (value: any) {
            if (value >= 1000000) {
              return (value / 1000000).toFixed(1) + "M";
            } else if (value >= 1000 && value < 1000000) {
              return (value / 1000).toFixed(1) + "k";
            } else {
              return value;
            }
          },
          style: {
            colors: [],
            fontSize: "10px",
            fontFamily: "Roboto, sans-serif",
            fontWeight: 400,
            cssClass: "apexcharts-yaxis-label",
          },
        },
      },
    },
  };

  return (
    <div id="chart1" style={{ position: "relative" }}>
      <Chart
        options={data.options}
        series={data.series}
        type="bar"
        height={287}
      />
    </div>
  );
};

export const ColumnChartTwo: FC<PropsColumn> = ({ date, value }) => {
  const data = {
    series: [
      {
        data: value,
      },
    ],

    options: {
      chart: {
        height: 350,
        type: "bar",
        events: {
          click: function (chart: any, w: any, e: any) {
            // console.log(chart, w, e)
          },
        },
        toolbar: {
          show: false,
        },
      },
      fill: {
        colors: ["#BCD476"],
      },
      states: {
        normal: {
          filter: {
            type: "none",
            value: 0,
          },
        },
        hover: {
          filter: {
            type: "darken",
            value: 0.5,
          },
        },
      },
      xaxis: {
        categories: date,
        labels: {
          show: false,
          style: {
            fontSize: "10px",
          },
          offsetY: -4,
        },
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
      },
      yaxis: {
        show: true,
        showAlways: true,
        showForNullSeries: true,
        seriesName: undefined,
        opposite: false,
        reversed: false,
        logarithmic: false,
        tickAmount: 6,
        forceNiceScale: false,
        floating: false,
        decimalsInFloat: undefined,
        labels: {
          show: true,
          offsetX: 0,
          offsetY: 0,
          rotate: 0,
          formatter: function (value: any) {
            if (value >= 1000000) {
              return (value / 1000000).toFixed(1) + "M";
            } else if (value >= 1000 && value < 1000000) {
              return (value / 1000).toFixed(1) + "k";
            } else {
              return value;
            }
          },
        },
      },
      tooltip: {
        custom: function ({ series, seriesIndex, dataPointIndex, w }: any) {
          // console.log("series", seriesIndex);
          // console.log("w", w);
          return `
          <div class="column-toltip">
          <div class="column-toltip-light">${moment(
            w.globals.labels[dataPointIndex]
          ).format("DD MMMM YYYY")}</div>
            <div class="column-toltip-bold">${w.globals.stackedSeriesTotals[
              dataPointIndex
            ].toLocaleString()} CWD</div>
          </div>
          `;
        },
        // enabled: false,
        fixed: {
          enabled: true,
          position: "topLeft",
          offsetY: 0,
          offsetX: 110,
        },
      },
      legend: {
        horizontalAlign: "center",
        offsetX: 0,
        show: false,
      },
      grid: {
        show: false,
      },
      plotOptions: {
        bar: {
          borderRadius: 6,
          columnWidth: "45%",
          distributed: false,
        },
      },
      dataLabels: {
        enabled: false,
      },
    },
  };

  return (
    <div id="chart2" style={{ position: "relative" }}>
      <Chart
        options={data.options}
        series={data.series}
        type="bar"
        height={287}
      />
    </div>
  );
};

export const RadialBar = () => {
  const data = {
    series: [10000000000000],
    options: {
      chart: {
        height: 350,
        type: "radialBar",
      },
      colors: ["rgba(188, 212, 118, .2)"],
      plotOptions: {
        radialBar: {
          hollow: {
            size: "70%",
          },
        },
      },
      labels: ["Cricket"],
    },
  };

  return (
    <div id="chart2" style={{ position: "relative" }}>
      <Chart
        options={data.options}
        series={data.series}
        type="radialBar"
        height={145}
      />
    </div>
  );
};

export const RadialBarRound = () => {
  const data = {
    series: [100],
    options: {
      chart: {
        type: "radialBar",
      },
      stroke: {
        lineCap: "round",
      },
      colors: ["#BCD476"],
      plotOptions: {
        radialBar: {
          // startAngle: -35,
          // endAngle: 325,
          hollow: {
            size: "70%",
            background: "#fff",
          },
        },
      },
      labels: ["1 700 000"],
    },
  };

  return (
    <div
      id="chart2"
      style={{
        position: "absolute",
        height: 182,
        right: "0",
        borderRadius: "50%",
      }}
    >
      <Chart
        options={data.options}
        series={data.series}
        type="radialBar"
        height="100%"
        width={122}
      />
    </div>
  );
};

export const RadialBarHalf = () => {
  const data = {
    series: [67],
    options: {
      chart: {
        type: "radialBar",
      },
      stroke: {
        lineCap: "round",
      },
      colors: ["#BCD476"],
      plotOptions: {
        radialBar: {
          startAngle: -205,
          endAngle: 140,
          hollow: {
            size: "70%",
            background: "#fff",
          },
        },
      },
      labels: ["Cricket"],
    },
  };

  return (
    <div id="chart2" style={{ position: "relative", height: 182 }}>
      <Chart
        options={data.options}
        series={data.series}
        type="radialBar"
        height="100%"
        width={122}
      />
    </div>
  );
};