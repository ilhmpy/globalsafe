import React, { useContext, useState, useEffect, FC } from 'react';
import Highcharts from 'highcharts/highstock';
import HighchartsReact from 'highcharts-react-official';
import { Container } from '../../../../components/UI/Container';
import { LeftIcon } from '../../../PrivateArea/Styles.elements';
import * as S from './S.elements';
import { Collection, RootChange } from '../../../../types/currency';
import moment from 'moment';
import 'moment/locale/ru';
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
  data: Collection[];
  type: string;
  fetchMGCWD: (d: string) => void;
  fetchGCWD: (d: string) => void;
  fetchDIAMOND: (d: string) => void;
  fetchGLOBAL: (d: string) => void;
};

export const ChartActiv: FC<Props> = ({
  data,
  type,
  fetchMGCWD,
  fetchGCWD,
  fetchDIAMOND,
  fetchGLOBAL,
}: Props) => {
  localStorage.getItem('i18nextLng') === 'ru' ? opt(Highcharts) : opt1(Highcharts);
  moment.locale(localStorage.getItem('i18nextLng') || 'ru');
  const size = useWindowSize();

  const data1 = () => {
    if (type === 'GCWD') {
      return data.map((i) => [new Date(i.date).valueOf(), i.latestBid / 100000]);
    } else if (type === 'MGCWD') {
      return data.map((i) => [new Date(i.date).valueOf(), i.latestBid / 100000]);
    } else if (type === 'DIAMOND') {
      return data.map((i) => [new Date(i.date).valueOf(), i.latestBid / 1000]);
    } else {
      return data.map((i) => [new Date(i.date).valueOf(), i.latestBid]);
    }
  };

  const [date, setDate] = useState(0);
  const [valCWD, setValCWD] = useState(0);

  const state = {
    options: {
      series: [
        {
          data: data1(),
          color: '#0094FF',
          type: 'spline',
        },
      ],
      chart: {
        marginLeft: size < 768 ? 0 : 50,
        marginRight: size < 768 ? 30 : 5,
        backgroundColor: '#F7F8FA',
        height: size < 768 ? 288 : 345,
        // spacingTop: 50,
        spacingBottom: 0,
      },
      tooltip: {
        borderRadius: 4,
        shape: 'rect',
        padding: 10,
        backgroundColor: '#fff',
        // enabled: false,
        formatter: function () {
          if (size < 767) {
            setDate((this as any).x);
            setValCWD((this as any).y);
            return '';
          }

          return `
          <b style="font-size: 18px; font-weight: bold; line-height: 24px; font-family: 'Roboto', sans-serif;">${
            (this as any).y
          }  CWD </b> <br/> <b style="font-size: 12px; font-weight: normal; line-height: 14px; font-family: 'Roboto', sans-serif;">${moment(
            (this as any).x
          ).format('DD.MM.YYYY, dddd, hh:mm')} </b>
          
          `;
        },
      },
      plotOptions: {
        series: {
          lineWidth: 2,
          marker: {
            fillColor: '#3F3E4E',
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
        enabled: size < 768 ? false : true,
        adaptToUpdatedData: true,
        maskFill: 'rgba(0, 148, 255, 0.2)',
        maskInside: true,
        outlineWidth: 0,
        marginBottom: 0,
        handles: {
          backgroundColor: '#FFFFFF',
          borderColor: '#9E9EB8',
        },
        series: {
          type: 'areaspline',
          fillOpacity: 0.1,
          lineWidth: 0,
        },
        credits: {
          enabled: false,
        },
        xAxis: {
          gridLineWidth: 0,
          height: 10,
          top: 2,
          tickColor: '#DCDCE8',
          lineColor: '#fff',
          gridLineColor: '#FF0000',
          lineWidth: 0,
        },
        yAxis: {
          lineColor: '#fff',
          gridLineWidth: 0,
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
        left: size < 768 ? '100%' : 0,
        opposite: false,
        gridLineDashStyle: 'Dash',
        labels: {
          align: 'left',
          x: 0,
          y: -2,
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
        tickColor: '#DCDCE8',
        lineColor: '#F7F8FA',
      },
    },
  };

  const btns = ['День', 'Месяц', 'Квартал', 'Год', 'Все время'];

  const [selected, setSelected] = useState(btns[0]);
  const [active, setActive] = useState('День');

  const changeValue = (data: Collection[]) => {
    const currValue = data[data.length - 1].latestBid;

    const filterPrevValues = data.filter((item) => item.latestBid !== currValue);
    const value =
      ((currValue - filterPrevValues[filterPrevValues.length - 1].latestBid) / currValue) * 100;
    if (value > 0) {
      return (
        <S.Price green>
          <Arrow />
          {value.toFixed(2)} &nbsp;%
        </S.Price>
      );
    } else {
      return (
        <S.Price red>
          <Arrow />
          {value.toFixed(2)}&nbsp;%
        </S.Price>
      );
    }
  };

  const typesBalanceInfo = (type: string) => {
    switch (type) {
      case 'GCWD':
        return (
          <S.PriceChangesWrap>
            <S.PriceChanges>
              <S.Price>GCWD - CWD</S.Price>&nbsp;
              <S.Price>
                {(data[data.length - 1].latestBid / 100000).toLocaleString('ru-RU', {
                  maximumFractionDigits: 2,
                })}
              </S.Price>
              {changeValue(data)}
            </S.PriceChanges>
            <S.Date>{moment(data[data.length - 1].date).format('DD.MM.YYYY, dddd, hh:mm')}</S.Date>
          </S.PriceChangesWrap>
        );
      case 'MGCWD':
        return (
          <S.PriceChangesWrap>
            <S.PriceChanges>
              <S.Price>MGCWD - CWD</S.Price>&nbsp;
              <S.Price>
                {(data[data.length - 1].latestBid / 100000).toLocaleString('ru-RU', {
                  maximumFractionDigits: 2,
                })}
              </S.Price>
              {changeValue(data)}
            </S.PriceChanges>
            <S.Date>{moment(data[data.length - 1].date).format('DD.MM.YYYY, dddd, hh:mm')}</S.Date>
          </S.PriceChangesWrap>
        );
      case 'DIAMOND':
        return (
          <S.PriceChangesWrap>
            <S.PriceChanges>
              <S.Price>DIAMOND - CWD</S.Price>&nbsp;
              <S.Price>
                {(data[data.length - 1].latestBid / 100).toLocaleString('ru-RU', {
                  maximumFractionDigits: 2,
                })}
              </S.Price>
              {changeValue(data)}
            </S.PriceChanges>
            <S.Date>{moment(data[data.length - 1].date).format('DD.MM.YYYY, dddd, hh:mm')}</S.Date>
          </S.PriceChangesWrap>
        );
      case 'GLOBAL':
        return (
          <S.PriceChangesWrap>
            <S.PriceChanges>
              <S.Price>GLOBAL - CWD</S.Price>&nbsp;
              <S.Price>
                {(data[data.length - 1].latestBid / 10000).toLocaleString('ru-RU', {
                  maximumFractionDigits: 2,
                })}
              </S.Price>
              {changeValue(data)}
            </S.PriceChanges>
            <S.Date>{moment(data[data.length - 1].date).format('DD.MM.YYYY, dddd, hh:mm')}</S.Date>
          </S.PriceChangesWrap>
        );
    }
  };

  const dateFetch = (day: string) => {
    switch (day) {
      case 'День':
        return moment().subtract(1, 'days').format();
      case 'Месяц':
        return moment().subtract(1, 'months').format();
      case 'Квартал':
        return moment().subtract(3, 'months').format();
      case 'Год':
        return moment().subtract(1, 'years').format();
      case 'Все время':
        return moment().subtract(1, 'years').format();
      default:
        return moment().subtract(1, 'days').format();
    }
  };

  const typeSelected = (str: string) => {
    console.log('str', str);
    setActive(str);
    setSelected(str);
    if (type === 'GCWD') {
      console.log('gcwd');
      fetchGCWD(dateFetch(str));
    } else if (type === 'MGCWD') {
      fetchMGCWD(dateFetch(str));
    } else if (type === 'DIAMOND') {
      fetchDIAMOND(dateFetch(str));
    } else if (type === 'GLOBAL') {
      fetchGLOBAL(dateFetch(str));
    }
  };

  return (
    <>
      <S.ChartContainer>
        <S.ChartHeader>
          {data.length ? typesBalanceInfo(type) : null}

          <S.ButtonsList>
            <Dropdown selected={selected} setSelected={typeSelected} options={btns} />
          </S.ButtonsList>
          <S.MobTooltips>
            <S.TooltipsDate>
              {date ? moment(date).format('DD.MM.YYYY, dd, hh:mm') : ''}
            </S.TooltipsDate>
            <S.TooltipsValue>{valCWD ? valCWD.toLocaleString() + ' CWD' : ''}</S.TooltipsValue>
          </S.MobTooltips>
          <S.Buttons>
            {btns.map((i) => (
              <S.Button active={i === active} key={i} onClick={() => typeSelected(i)}>
                {i}
              </S.Button>
            ))}
          </S.Buttons>
        </S.ChartHeader>
        <S.MobChartBlock mob>
          <MobChart data={data1()} setDate={setDate} setValCWD={setValCWD} />
        </S.MobChartBlock>
        <S.MobChartBlock>
          <HighchartsReact
            constructorType={'stockChart'}
            highcharts={Highcharts}
            options={state.options}
          />
        </S.MobChartBlock>
      </S.ChartContainer>
    </>
  );
};
