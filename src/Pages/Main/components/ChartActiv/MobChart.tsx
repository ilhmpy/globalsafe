import React, { FC } from 'react';
import ReactDOM from 'react-dom';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { Collection } from '../../../../types/currency';
import moment from 'moment';
import 'moment/locale/ru';

type Props = {
  data: number[][];
  type?: string;
  setDate: (str: number) => void;
  setValCWD: (str: number) => void;
};

require('highcharts/modules/exporting')(Highcharts);

function opt(H: any) {
  H.setOptions({
    lang: {
      loading: 'Загрузка...',
      months: [
        'Январь',
        'Февраль',
        'Март',
        'Апрель',
        'Май',
        'Июнь',
        'Июль',
        'Август',
        'Сентябрь',
        'Октябрь',
        'Ноябрь',
        'Декабрь',
      ],
      weekdays: ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'],
      shortMonths: [
        'Янв',
        'Фев',
        'Март',
        'Апр',
        'Май',
        'Июнь',
        'Июль',
        'Авг',
        'Сент',
        'Окт',
        'Нояб',
        'Дек',
      ],
    },
    credits: {
      enabled: false,
    },
  });
}

function opt1(H: any) {
  H.setOptions({
    lang: {
      loading: 'Загрузка...',
      months: [
        'Январь',
        'Февраль',
        'Март',
        'Апрель',
        'Май',
        'Июнь',
        'Июль',
        'Август',
        'Сентябрь',
        'Октябрь',
        'Ноябрь',
        'Декабрь',
      ],
      weekdays: ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'],
      shortMonths: [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec',
      ],
    },
    credits: {
      enabled: false,
    },
  });
}

export const MobChart: FC<Props> = ({ data, type, setValCWD, setDate }: Props) => {
  localStorage.getItem('i18nextLng') === 'ru' ? opt(Highcharts) : opt1(Highcharts);
  moment.locale(localStorage.getItem('i18nextLng') || 'ru');
  //   const data1 = () => {
  //     if (type === 'GCWD') {
  //       return data.map((i) => [new Date(i.date).valueOf(), i.latestBid / 100000]);
  //     } else if (type === 'MGCWD') {
  //       return data.map((i) => [new Date(i.date).valueOf(), i.latestBid / 100000]);
  //     } else if (type === 'DIAMOND') {
  //       return data.map((i) => [new Date(i.date).valueOf(), i.latestBid / 1000]);
  //     } else {
  //       return data.map((i) => [new Date(i.date).valueOf(), i.latestBid]);
  //     }
  //   };
  const state = {
    series: [
      {
        data: data,
        type: 'spline',
        color: '#0094FF',
      },
    ],
    chart: {
      marginLeft: 0,
      marginRight: 30,
      backgroundColor: '#F7F8FA',
      height: 288,
      // spacingTop: 50,
      spacingBottom: 5,
    },
    legend: {
      enabled: false,
    },
    exporting: {
      enabled: false,
    },
    xAxis: {
      type: 'datetime',
      min: null,
      max: null,
      title: {
        text: '',
      },
    },
    yAxis: {
      gridLineDashStyle: 'Dash',
      left: '100%',
      opposite: false,
      labels: {
        align: 'left',
        x: 0,
        y: -2,
      },
      title: {
        text: '',
      },
    },
    title: {
      text: '',
    },
    plotOptions: {
      series: {
        lineWidth: 2,
        marker: {
          enabled: false,
          fillColor: '#3F3E4E',
          lineWidth: 2,
          lineColor: '#DCDCE8',
          radius: 3,
          states: {
            hover: {
              fillColor: '#3F3E4E',
              lineWidth: 0,
              lineColor: '#DCDCE8',
            },
          },
        },
      },
    },
    rangeSelector: {
      enabled: false,
      buttonPosition: {
        align: 'right',
        x: 0,
        y: 0,
      },
      buttonSpacing: 10,
      labelStyle: {
        visibility: 'hidden',
      },
    },
    tooltip: {
      borderRadius: 4,
      shape: 'rect',
      padding: 0,
      backgroundColor: '#fff',
      crosshairs: false,
      followTouchMove: false,
      borderWidth: 0,
      shadow: false,
      // enabled: false,
      formatter: function () {
        setDate((this as any).x);
        setValCWD((this as any).y);
        return '';
      },
    },
  };
  return (
    <div>
      <HighchartsReact highcharts={Highcharts} options={state} />
    </div>
  );
};
