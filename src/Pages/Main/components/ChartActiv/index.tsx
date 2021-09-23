import React, { useContext, useState, useEffect, useCallback } from 'react';
import { SliderChart } from './Slider';
import * as S from './S.elements';
import { Container } from '../../../../components/UI/Container';
import { AppContext } from '../../../../context/HubContext';
import { Collection, RootChange } from '../../../../types/currency';
import moment from 'moment';
import { ChartActiv } from './ChartActiv';
import { SmallChart } from './SmallChart';

export const ExchangeChart = () => {
  const [active, setActive] = useState(0);
  const [listDIAMOND, setListDIAMOND] = useState<Collection[]>([]);
  const [listGLOBAL, setListGLOBAL] = useState<Collection[]>([]);
  const [listMGCWD, setListMGCWD] = useState<Collection[]>([]);
  const [listGCWD, setListGCWD] = useState<Collection[]>([]);
  const [numDIAMOND, setNumDIAMOND] = useState<number>(0);
  const [numMGCWD, setNumMGCWD] = useState(0);
  const [numGCWD, setNumGCWD] = useState(0);

  const appContext = useContext(AppContext);
  const hubConnection = appContext.hubConnection;

  useEffect(() => {
    const dateFrom: any = moment().subtract(3, 'years');
    if (hubConnection) {
      hubConnection
        .invoke<RootChange>('GetMarket', 14, dateFrom._d, new Date(), 0, 100)
        .then((res) => {
          console.log('res listGLOBAL', res);
          if (res.totalRecords > listGLOBAL.length) {
            // setNumMGCWD((numMGCWD) => numMGCWD + 100);
          }
          setListGLOBAL((listGLOBAL) => [...listGLOBAL, ...res.collection]);
        })
        .catch((e) => console.log(e));
    }
  }, [hubConnection]);

  const fetchDIAMOND = useCallback(
    async (date: string) => {
      let arrList: Collection[] = [];
      let isFetching = true;
      let totalNum = 0;
      if (hubConnection) {
        while (isFetching) {
          try {
            const res = await hubConnection.invoke<RootChange>(
              'GetMarket',
              4,
              date,
              new Date(),
              totalNum,
              100
            );
            if (res) {
              if (arrList.length < res.totalRecords) {
                totalNum += 100;
                arrList = [...arrList, ...res.collection];
              } else {
                isFetching = false;
                break;
              }
            }
          } catch (e) {
            console.log(e);
          }
        }
        setListDIAMOND(arrList);
      }
    },
    [hubConnection]
  );

  useEffect(() => {
    const dateFrom = moment().subtract(1, 'years').format();
    if (hubConnection) {
      fetchDIAMOND(dateFrom);
    }
  }, [hubConnection]);

  const fetchMGCWD = useCallback(
    async (date: string) => {
      let arrList: Collection[] = [];
      let isFetching = true;
      let totalNum = 0;
      if (hubConnection) {
        while (isFetching) {
          try {
            const res = await hubConnection.invoke<RootChange>(
              'GetMarket',
              2,
              date,
              new Date(),
              totalNum,
              100
            );
            if (res) {
              if (arrList.length < res.totalRecords) {
                totalNum += 100;
                arrList = [...arrList, ...res.collection];
              } else {
                isFetching = false;
                break;
              }
            }
          } catch (e) {
            console.log(e);
          }
        }
        setListMGCWD(arrList);
      }
    },
    [hubConnection]
  );

  useEffect(() => {
    const dateFrom = moment().subtract(7, 'days').format();
    if (hubConnection) {
      fetchMGCWD(dateFrom);
    }
  }, [hubConnection]);

  const fetchGCWD = useCallback(
    async (date: string) => {
      let arrList: Collection[] = [];
      let isFetching = true;
      let totalNum = 0;
      if (hubConnection) {
        while (isFetching) {
          try {
            const res = await hubConnection.invoke<RootChange>(
              'GetMarket',
              3,
              date,
              new Date(),
              totalNum,
              100
            );
            if (res) {
              if (arrList.length < res.totalRecords) {
                totalNum += 100;
                arrList = [...arrList, ...res.collection];
              } else {
                isFetching = false;
                break;
              }
            }
          } catch (e) {
            console.log(e);
          }
        }
        setListGCWD(arrList);
      }
    },
    [hubConnection]
  );

  useEffect(() => {
    const dateFrom = moment().subtract(7, 'days').format();
    if (hubConnection) {
      fetchGCWD(dateFrom);
    }
  }, [hubConnection]);

  useEffect(() => {
    const cb = (data: Collection) => {
      console.log('MarketNotification', data);
      if (data.assetKind === 3) {
        setListGCWD((listGCWD) => [...listGCWD, data]);
      } else if (data.assetKind === 2) {
        setListMGCWD((listMGCWD) => [...listMGCWD, data]);
      } else {
        setListDIAMOND((listDIAMOND) => [...listDIAMOND, data]);
      }
    };
    if (hubConnection) {
      hubConnection.on('MarketNotification', cb);
    }
    return () => {
      hubConnection?.off('MarketNotification', cb);
    };
  }, [hubConnection]);

  return (
    <>
      <SliderChart
        listDIAMOND={listDIAMOND}
        listGLOBAL={listGLOBAL}
        listMGCWD={listMGCWD}
        listGCWD={listGCWD}
      />
    </>
  );
};
