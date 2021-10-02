import React, { useContext, useState, useEffect, FC, useRef } from 'react';
import Highcharts from 'highcharts/highstock';
import HighchartsReact from 'highcharts-react-official';
import { Container } from '../../../../components/UI/Container';
import { LeftIcon } from '../../../PrivateArea/Styles.elements';
import * as S from './S.elements';
import { Collection, RootChange } from '../../../../types/currency';
import moment from 'moment';
import 'moment/locale/ru';
import momenttz from 'moment-timezone';
import { ReactComponent as Arrow } from '../../../../assets/v2/svg/arrow-exchange.svg';
import { SmallChart } from './SmallChart';
import useWindowSize from '../../../../hooks/useWindowSize';
import { Dropdown } from './components/Dropdown';
import { MobChart } from './MobChart';

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
  const [update, setUpdate] = useState(false);

  useEffect(() => {
    setUpdate(!update);
  }, [data]);

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
        backgroundColor: '#fff',
        // enabled: false,
        formatter: function () {
          return `
          <b style="font-size: 18px; font-weight: bold; line-height: 24px; font-family: 'Roboto', sans-serif; color: #3F3E4E;">${
            (this as any).y
          }  CWD </b> <br/> <b style="font-size: 12px; font-weight: normal; line-height: 14px; font-family: 'Roboto', sans-serif; color: #000000">${moment(
            (this as any).x
          ).format('DD.MM.YYYY, dddd, HH:mm')} MCK</b>
          
          `;
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
        maskFill: 'rgba(0, 148, 255, 0.2)',
        maskInside: true,
        outlineWidth: 0,
        marginBottom: 0,
        handles: {
          backgroundColor: '#FFFFFF',
          borderColor: '#9E9EB8',
        },
        series: {
          id: 'nav',
          type: 'areaspline',
          fillOpacity: 0.1,
          lineWidth: 0,

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
              color: '#888',
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
              color: 'rgba(115, 113, 115, 0.2)',
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
        gridLineDashStyle: 'Dash',
        labels: {
          align: 'left',

          x: 0,
          y: 0,
          style: {
            fontSize: '12px',
            color: '#3F3E4E',
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
        lineColor: '#F7F8FA',
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
            color: '#3F3E4E',
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
        <HighchartsReact
          allowChartUpdate={update}
          ref={ref}
          highcharts={Highcharts}
          options={state.options}
        />
      </S.MobChartBlock>
    </>
  );
};
