import React, { useContext, useState, useEffect, FC, useRef } from 'react';
import Highcharts from 'highcharts/highstock';
import HighchartsReact from 'highcharts-react-official';
import * as S from './S.elements';
import moment from 'moment';
import 'moment/locale/ru';
import momenttz from 'moment-timezone';
import { MobChart } from './MobChart';
import { ThemeContext } from '../../../../context/ThemeContext';

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

type Props = {
  data: number[][];
  setDate: (str: number) => void;
  setValCWD: (str: number) => void;
};

export const ChartDesctop: FC<Props> = ({ data, setDate, setValCWD }: Props) => {
  localStorage.getItem('i18nextLng') === 'ru' ? opt(Highcharts) : opt1(Highcharts);
  moment.locale(localStorage.getItem('i18nextLng') || 'ru');
  const ref = useRef<any>();

  const themeContext = useContext(ThemeContext);
  const theme = themeContext.theme;

  const bg = theme === 'light' ? '#fff' : '#28282F';
  const glc = theme === 'light' ? '#DCDCE8' : '#515172';
  const bgTooltip = theme === 'light' ? '#fff' : '#19191C';
  const tcolor = theme === 'light' ? '#3F3E4E' : '#fff';
  const lineColor = theme === 'light' ? '#F7F8FA' : '#28282F';
  const handlesBg = theme === 'light' ? '#fff' : '#787887';
  const handlesBrd = theme === 'light' ? '#9E9EB8' : '#DADAEB';
  const mask = theme === 'light' ? 'rgba(0, 148, 255, 0.2)' : 'rgba(247, 248, 250, 0.05)';
  const navigatorBg = theme === 'light' ? 'rgba(0, 148, 255, 0.2)' : 'rgba(158, 158, 184, 0.4)';
  const colorNav = theme === 'light' ? '#9E9EB8' : '#fff';

  const state = {
    options: {
      series: [
        {
          data: data,
          color: '#0094FF',
        },
      ],
      chart: {
        marginLeft: 50,
        marginRight: 5,
        height: 358,
        spacingBottom: 0,
        spacingRight: 0,
        animation: false,
        backgroundColor: bg,
        style: {
          fontFamily: 'Roboto',
        },
      },
      legend: {
        enabled: false,
      },
      title: {
        text: '',
      },
      tooltip: {
        borderRadius: 4,
        shape: 'rect',
        crosshairs: true,
        padding: 10,
        backgroundColor: bgTooltip,
        className: 'chart-toolt',
        // enabled: false,
        formatter: function () {
          return theme === 'light'
            ? `
          <b style="font-size: 18px; font-weight: bold; line-height: 24px; font-family: 'Roboto', sans-serif; color: #3F3E4E ;">${
            (this as any).y
          }  CWD </b> <br/> <b style="font-size: 12px; font-weight: normal; line-height: 14px; font-family: 'Roboto', sans-serif; color: #000000">${moment(
                (this as any).x
              ).format('DD.MM.YYYY, dddd, HH:mm')} MCK</b>
          `
            : `<b style="font-size: 18px; font-weight: bold; line-height: 24px; font-family: 'Roboto', sans-serif; color: #ffffff ;">${
                (this as any).y
              }  CWD </b> <br/> <b style="font-size: 12px; font-weight: normal; line-height: 14px; font-family: 'Roboto', sans-serif; color: #ffffff">${moment(
                (this as any).x
              ).format('DD.MM.YYYY, dddd, HH:mm')} MCK</b>`;
        },
      },
      plotOptions: {
        series: {
          lineWidth: 2,
          marker: {
            enabled: false,
            fillColor: ' #3F3E4E',
            lineWidth: 2,
            lineColor: '#DCDCE8',
            radius: 3,
            states: {
              hover: {
                fillColor: '#3F3E4E',
                lineWidth: 2,
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
      scrollbar: {
        enabled: false,
      },
      navigator: {
        enabled: true,
        adaptToUpdatedData: false,
        maskFill: mask,
        maskInside: true,
        outlineWidth: 0,
        marginBottom: 0,
        outlineColor: '#fff',
        handles: {
          backgroundColor: handlesBg,
          borderColor: handlesBrd,
        },
        series: {
          id: 'nav',
          type: 'areaspline',
          fillOpacity: 1,
          lineWidth: 0,
          color: navigatorBg,
          fillColor: navigatorBg,
          dataGrouping: {
            anchor: 'start',
            forced: true,
            dateTimeLabelFormats: {
              day: '%e  %b',
            },
          },
        },
        credits: {
          enabled: true,
        },
        xAxis: {
          type: 'datetime',
          // min: data[0][0],
          // max: data[data.length - 1][0],
          // range: data[0][0] - data[data.length - 1][0],
          gridLineWidth: 0,
          height: 10,
          top: 0,
          tickColor: '#DCDCE8',
          lineColor: '#fff',
          gridLineColor: '#FF0000',
          lineWidth: 0,
          width: '100%',
          labels: {
            style: {
              color: colorNav,
            },
            y: -15,
          },
          dateTimeLabelFormats: {
            day: '%e  %b',
          },
        },
        yAxis: {
          lineColor: '#fff',
          gridLineWidth: 0,
          dateTimeLabelFormats: {
            day: {
              main: '%e %b',
            },
          },
          plotBands: [
            {
              color: '#fff',
              from: 0,
              to: 1,
            },
          ],
        },
      },
      exporting: { enabled: false },
      yAxis: {
        left: '0',
        opposite: false,
        gridLineColor: glc,
        gridLineDashStyle: 'Dash',
        labels: {
          align: 'left',
          x: 0,
          y: 0,
          style: {
            fontSize: '12px',
            color: tcolor,
          },
        },
        plotBands: [
          {
            color: 'rgba(68, 170, 213, 0.2)',
            label: {
              text: '',
            },
          },
        ],
      },
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
          color: '#DCDCE8',
          snap: true,
          width: 3,
          zIndex: 2,
        },
        labels: {
          style: {
            color: tcolor,
            fontSize: '12px',
            fontFamily: 'Roboto',
          },
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
    },
  };

  return (
    <>
      <S.MobChartBlock mob>
        <MobChart data={data} setDate={setDate} setValCWD={setValCWD} />
      </S.MobChartBlock>
      <S.MobChartBlock>
        <HighchartsReact ref={ref} highcharts={Highcharts} options={state.options} />
      </S.MobChartBlock>
    </>
  );
};
