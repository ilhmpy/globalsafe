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
};

export const ChartActiv: FC<Props> = ({ data, type }: Props) => {
  localStorage.getItem('i18nextLng') === 'ru' ? opt(Highcharts) : opt1(Highcharts);
  moment.locale(localStorage.getItem('i18nextLng') || 'ru');
  const size = useWindowSize();
  const data1 = () => {
    const value = data.map((i) => [new Date(i.date).valueOf(), i.latestBid / 100]);
    return value;
  };

  const [date, setDate] = useState(0);
  const [valCWD, setValCWD] = useState(0);

  const state = {
    options: {
      series: [
        {
          data: data1(),
          color: '#0094FF',
        },
      ],
      chart: {
        marginLeft: size < 768 ? 0 : 50,
        marginRight: size < 768 ? 30 : 10,
        backgroundColor: '#F7F8FA',
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
        line: {
          color: '#000',
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
        },
        yAxis: {
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
    },
  };

  const btns = ['День', 'Месяц', 'Квартал', 'Год', 'Все время'];

  const [selected, setSelected] = useState(btns[0]);
  const [active, setActive] = useState(0);

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

  return (
    <>
      <S.ChartContainer>
        <S.ChartHeader>
          {data.length && typesBalanceInfo(type)}

          <S.ButtonsList>
            <Dropdown selected={selected} setSelected={setSelected} options={btns} />
          </S.ButtonsList>
          <S.MobTooltips>
            <S.TooltipsDate>
              {date ? moment(date).format('DD.MM.YYYY, dddd, hh:mm') : ''}
            </S.TooltipsDate>
            <S.TooltipsValue>{valCWD ? valCWD.toLocaleString() + ' CWD' : ''}</S.TooltipsValue>
          </S.MobTooltips>
          <S.Buttons>
            {btns.map((i, id) => (
              <S.Button active={id === active} key={id} onClick={() => setActive(id)}>
                {i}
              </S.Button>
            ))}
          </S.Buttons>
        </S.ChartHeader>

        <HighchartsReact
          constructorType={'stockChart'}
          highcharts={Highcharts}
          options={state.options}
        />
      </S.ChartContainer>
    </>
  );
};
