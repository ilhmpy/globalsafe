import React from 'react';
import Highcharts from 'highcharts/highstock';
import HighchartsReact from 'highcharts-react-official';
import { Container } from '../../../../components/UI/Container';
import { LeftIcon } from '../../../PrivateArea/Styles.elements';

export const ChartActiv = () => {
  const state = {
    options: {
      chart: {
        events: {
          redraw() {
            console.log('redraw');
          },
        },
      },
      series: [
        {
          data: Array.from({ length: 50 }, () => Math.floor(Math.random() * 50)),
        },
      ],
      yAxis: {
        left: 0,
        opposite: false,
        labels: {
          align: 'left',
          x: 6,
          y: -2,
        },
      },
    },
  };

  return (
    <Container>
      <HighchartsReact
        constructorType={'stockChart'}
        highcharts={Highcharts}
        options={state.options}
      />
    </Container>
  );
};
