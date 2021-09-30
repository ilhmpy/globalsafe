import React, { useContext, useState, useEffect, FC } from 'react';
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
import { Dropdown } from './components/Dropdown';
import { ChartDesctop } from './ChartDesctop';
import { ChartContext } from '../../../../context/ChartContext';
import { MobChart } from './MobChart';

require('highcharts/modules/exporting')(Highcharts);

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
  const { activeTab, setActiveTab, loadDIAMOND, loadGLOBAL, loadMGCWD, loadGCWD } =
    useContext(ChartContext);

  moment.locale(localStorage.getItem('i18nextLng') || 'ru');
  console.log('data', data);
  const data1 = () => {
    if (type === 'GCWD') {
      return data.map((i) => [
        momenttz.utc(i.date).tz('Europe/Moscow').valueOf(),
        i.latestBid / 100000,
      ]);
    } else if (type === 'MGCWD') {
      return data.map((i) => [
        momenttz.utc(i.date).tz('Europe/Moscow').valueOf(),
        i.latestBid / 100000,
      ]);
    } else if (type === 'DIAMOND') {
      return data.map((i) => [
        momenttz.utc(i.date).tz('Europe/Moscow').valueOf(),
        i.latestBid / 1000,
      ]);
    } else {
      return data.map((i) => [momenttz.utc(i.date).tz('Europe/Moscow').valueOf(), i.latestBid]);
    }
  };

  const [chartData, setChartData] = useState<number[][]>();

  // useEffect(() => {
  //   if (!data) return;
  //   setChartData(data1());
  // }, [data]);

  const [date, setDate] = useState(0);

  const [valCWD, setValCWD] = useState(0);

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
            <S.Date>
              {momenttz
                .utc(data[data.length - 1].date)
                .tz('Europe/Moscow')
                .format('DD.MM.YYYY, dddd, HH:mm')}
              MCK
            </S.Date>
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
            <S.Date>
              {momenttz
                .utc(data[data.length - 1].date)
                .tz('Europe/Moscow')
                .format('DD.MM.YYYY, dddd, HH:mm')}{' '}
              MCK
            </S.Date>
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
            <S.Date>
              {momenttz
                .utc(data[data.length - 1].date)
                .tz('Europe/Moscow')
                .format('DD.MM.YYYY, dddd, HH:mm')}{' '}
              MCK
            </S.Date>
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
            <S.Date>
              {momenttz
                .utc(data[data.length - 1].date)
                .tz('Europe/Moscow')
                .format('DD.MM.YYYY, dddd, HH:mm')}{' '}
              MCK
            </S.Date>
          </S.PriceChangesWrap>
        );
    }
  };

  const returnValues = () => {
    switch (type) {
      case 'GCWD':
        return (data[data.length - 1].latestBid / 100000).toLocaleString('ru-RU', {
          maximumFractionDigits: 2,
        });
      case 'MGCWD':
        return (data[data.length - 1].latestBid / 100000).toLocaleString('ru-RU', {
          maximumFractionDigits: 2,
        });
      case 'DIAMOND':
        return (data[data.length - 1].latestBid / 100).toLocaleString('ru-RU', {
          maximumFractionDigits: 2,
        });
      case 'GLOBAL':
        return (data[data.length - 1].latestBid / 10000).toLocaleString('ru-RU', {
          maximumFractionDigits: 2,
        });
    }
  };

  const dateFetch = (day: string) => {
    switch (day) {
      case 'День':
        return 'day';
      case 'Месяц':
        return 'months';
      case 'Квартал':
        return '3months';
      case 'Год':
        return 'year';
      case 'Все время':
        return 'year';
      default:
        return 'day';
    }
  };

  const typeSelected = (str: string) => {
    setActive(str);
    setSelected(str);
    setActiveTab(str);
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
  const loader = !loadDIAMOND && !loadGLOBAL && !loadMGCWD && !loadGCWD;
  console.log('loader', loader);
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
              {date > 1
                ? momenttz.utc(date).tz('Europe/Moscow').format('DD.MM.YYYY, dd, HH:mm')
                : data.length
                ? momenttz
                    .utc(data[data.length - 1].date)
                    .tz('Europe/Moscow')
                    .format('DD.MM.YYYY, dd, HH:mm')
                : null}
              &nbsp; MCK
            </S.TooltipsDate>
            <S.TooltipsValue>
              {valCWD ? valCWD.toLocaleString() : data.length ? returnValues() : 0} CWD
            </S.TooltipsValue>
          </S.MobTooltips>
          <S.Buttons>
            {btns.map((i) => (
              <S.Button active={i === active} key={i} onClick={() => typeSelected(i)}>
                {i}
              </S.Button>
            ))}
          </S.Buttons>
        </S.ChartHeader>
        {/* <ChartDesctop data={data1()} setDate={setDate} setValCWD={setValCWD} /> */}
        {activeTab === 'День' ? (
          <ChartDesctop data={data1()} setDate={setDate} setValCWD={setValCWD} />
        ) : null}
        {activeTab === 'Месяц' ? (
          <ChartDesctop data={data1()} setDate={setDate} setValCWD={setValCWD} />
        ) : null}
        {activeTab === 'Квартал' ? (
          <ChartDesctop data={data1()} setDate={setDate} setValCWD={setValCWD} />
        ) : null}
        {activeTab === 'Год' ? (
          <ChartDesctop data={data1()} setDate={setDate} setValCWD={setValCWD} />
        ) : null}
        {activeTab === 'Все время' ? (
          <ChartDesctop data={data1()} setDate={setDate} setValCWD={setValCWD} />
        ) : null}
        {/* <S.MobChartBlock mob>
          <MobChart data={data1()} setDate={setDate} setValCWD={setValCWD} />
        </S.MobChartBlock> */}
      </S.ChartContainer>
    </>
  );
};
