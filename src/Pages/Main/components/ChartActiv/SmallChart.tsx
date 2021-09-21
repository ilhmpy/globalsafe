import React, { FC } from 'react';
import Chart from 'react-apexcharts';

type ChartProps = {
  values: number[];
  height?: number;
};

export const SmallChart: FC<ChartProps> = ({ values }: ChartProps) => {
  const data = {
    series: [
      {
        data: values,
      },
    ],
    options: {
      chart: {
        type: 'area',
        sparkline: {
          enabled: false,
        },
        animations: {
          enabled: true,
          easing: 'linear',
          speed: 150,
          animateGradually: {
            enabled: true,
            delay: 100,
          },
          dynamicAnimation: {
            enabled: true,
            speed: 350,
          },
        },
        labels: {
          show: false,
        },
        zoom: {
          enabled: false,
        },
        toolbar: {
          show: false,
        },
        noData: {
          text: 'Loading...',
        },
      },
      colors: ['#3F3E4E'],
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: 'smooth',
        width: 2,
      },
      labels: [''],
      xaxis: {
        tooltip: {
          enabled: false,
        },
        labels: {
          show: false,
        },
        type: 'category',
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
      },
      yaxis: {
        show: false,
        tooltip: {
          enabled: false,
        },
        labels: {
          show: false,
        },
        crosshairs: {
          show: false,
        },
      },
      grid: {
        show: false,
        padding: {
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
        },
      },
      legend: {
        show: false,
      },
      tooltip: {
        enabled: false,
      },
      fill: {
        enabled: false,
        opacity: 0,
        gradient: {
          shadeIntensity: 1,
          opacityFrom: 0,
          opacityTo: 0,
          stops: [0, 0, 0],
        },
      },
    },
  };

  return (
    <div id="chart">
      <Chart options={data.options as any} series={data.series as any} type="area" height={75} />
    </div>
  );
};
