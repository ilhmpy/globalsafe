import React, { Component } from "react";
import { Doughnut } from "react-chartjs-2";
const Chart = require("react-chartjs-2").Chart;

var originalDoughnutDraw = Chart.controllers.doughnut.prototype.draw;
Chart.helpers.extend(Chart.controllers.doughnut.prototype, {
  draw: function () {
    originalDoughnutDraw.apply(this, arguments);

    var chart = this.chart.chart;
    var ctx = chart.ctx;
    var width = chart.width - 60;
    var height = chart.height;

    var fontSize = (height / 114).toFixed(2);
    ctx.font = fontSize + "em Verdana";

    ctx.textBaseline = "middle";

    var text = chart.config.data.text,
      textX = Math.round((width - ctx.measureText(text).width) / 2),
      textY = (height + 40) / 2;

    ctx.fillText(text, textX, textY);
  },
});

const chartOptions = {
  plugins: {
    outlabels: {
      display: false,
    },
  },
  legend: {
    display: true,
    position: "right",
    onClick: null,
    color: "rgba(0, 0, 0, 0.4)",
    labels: {
      boxWidth: 15,
      boxHeight: 15,
      fontSize: 18,
      textAlign: "center",
      padding: 20,
      borderRadius: 14,
      usePointStyle: true,
    },
  },
  tooltips: {
    callbacks: {
      label: function (tooltipItem: any, data: any) {
        const { datasetIndex, index } = tooltipItem;
        const dataset = data.datasets[datasetIndex];

        let value = dataset.data[index];

        if (index === 0) {
          value = dataset.data[0] + dataset.data[1];
        }

        return value;
      },
      title: function (tooltipItem: any, data: any) {
        return data.labels[tooltipItem[0].index];
      },
    },
    backgroundColor: "#FFF",
    titleFontSize: 16,
    titleFontColor: "rgba(0, 0, 0, 0.4)",
    bodyFontColor: "#000",
    bodyFontSize: 14,
    displayColors: false,
  },
};

const data = {
  labels: [
    "Депозит #1",
    "Депозит #2",
    "Депозит #3",
    "Депозит #4",
    "Депозит #5",
  ],
  datasets: [
    {
      data: [5, 5, 5, 5, 5],
      backgroundColor: [
        "rgba(255, 65, 110, 1)",
        "rgba(255, 65, 110, .8)",
        "rgba(255, 65, 110, .6)",
        "rgba(255, 65, 110, .25)",
        "rgba(255, 65, 110, .1)",
      ],
    },
  ],
  text: "101 000",
};

export const RoundChart = () => {
  return <Doughnut data={data} options={chartOptions} />;
};
