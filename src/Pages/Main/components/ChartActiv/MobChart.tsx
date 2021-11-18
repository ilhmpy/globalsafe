import React, { FC, useContext } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import moment from 'moment';
import 'moment/locale/ru';
import { ThemeContext } from '../../../../context/ThemeContext';

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

  const themeContext = useContext(ThemeContext);
  const theme = themeContext.theme;
  const bg = theme === 'light' ? '#fff' : '#28282F';
  const glc = theme === 'light' ? '#DCDCE8' : '#515172';
  const tcolor = theme === 'light' ? '#3F3E4E' : '#fff';
  const lineColor = theme === 'light' ? '#F7F8FA' : '#28282F';

  const state = {
    series: [
      {
        data: data,
        type: 'line',
        color: '#0094FF',
      },
    ],
    chart: {
      marginLeft: 0,
      spacingRight: 10,
      backgroundColor: bg,
      height: 288,
      animation: false,
      spacingBottom: 5,
    },
    legend: {
      enabled: false,
    },
    exporting: {
      enabled: false,
    },
    // xAxis: {
    //   type: 'datetime',
    //   min: null,
    //   max: null,
    //   title: {
    //     text: '',
    //   },
    // },
    xAxis: {
      ordinal: false,
      startOnTick: false,
      type: 'datetime',
      min: null,
      max: null,
      title: {
        text: '',
      },
      tickColor: '#DCDCE8',
      lineColor: lineColor,
      dateTimeLabelFormats: {
        day: {
          main: '%e %b',
        },
      },
      crosshair: {
        borderRadius: 4,
        color: '#DCDCE8',
        // dashStyle:Solid,
        snap: true,
        width: 3,
        zIndex: 2,
      },
      labels: {
        style: {
          color: tcolor,
          fontSize: '12px',
        },
      },
    },
    yAxis: {
      gridLineDashStyle: 'Dash',
      gridLineColor: glc,
      left: 0,
      opposite: true,
      labels: {
        align: 'left',
        x: 10,
        y: 0,
        style: {
          color: tcolor,
          fontSize: '14px',
        },
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
    time: {
      useUTC: false,
      getTimezoneOffset: function (timestamp: any) {
        const zone = 'Europe/Moscow';
        const timezoneOffset = -moment.tz(timestamp, zone).utcOffset();
        return timezoneOffset;
      },
    },
  };
  return (
    <div>
      <HighchartsReact highcharts={Highcharts} options={state} />
    </div>
  );
};
