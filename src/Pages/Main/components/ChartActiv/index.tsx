import React, { useContext, useState, useEffect, useCallback } from 'react';
import { SliderChart } from './Slider';
import * as S from './S.elements';
import { Container } from '../../../../components/UI/Container';
import { AppContext } from '../../../../context/HubContext';
import { Collection, RootChange } from '../../../../types/currency';
import moment from 'moment';
import { ChartActiv } from './ChartActiv';
import { SmallChart } from './SmallChart';
import { Page } from '../../../../components/UI/Page';
import { ChartContext } from '../../../../context/ChartContext';

export const ExchangeChart = () => {
  // const [listDIAMOND, setListDIAMOND] = useState<Collection[]>([]);

  // const [listGLOBAL, setListGLOBAL] = useState<Collection[]>([]);
  // const [listMGCWD, setListMGCWD] = useState<Collection[]>([]);
  // const [listGCWD, setListGCWD] = useState<Collection[]>([]);

  const appContext = useContext(AppContext);
  const hubConnection = appContext.hubConnection;
  const {
    fetchGLOBAL,
    listDIAMOND,
    listGLOBAL,
    listMGCWD,
    listGCWD,
    fetchDIAMOND,
    fetchGCWD,
    fetchMGCWD,
  } = useContext(ChartContext);

  // const fetchGLOBAL = async (date: string) => {
  //   let arrList: Collection[] = [];
  //   let isFetching = true;
  //   let totalNum = 0;
  //   if (hubConnection) {
  //     while (isFetching) {
  //       try {
  //         const res = await hubConnection.invoke<RootChange>(
  //           'GetMarket',
  //           43,
  //           date,
  //           new Date(),
  //           totalNum,
  //           100
  //         );
  //         if (res) {
  //           if (arrList.length < res.totalRecords) {
  //             totalNum += 100;
  //             arrList = [...arrList, ...res.collection];
  //           } else {
  //             isFetching = false;
  //             break;
  //           }
  //         }
  //       } catch (e) {
  //         console.log(e);
  //       }
  //     }
  //     setListGLOBAL(arrList);
  //   }
  // };

  useEffect(() => {
    if (hubConnection) {
      fetchGLOBAL('day');
      fetchDIAMOND('day');
      fetchGCWD('day');
      fetchMGCWD('day');
    }
  }, [hubConnection]);

  // const fetchDIAMOND = async (date: string) => {
  //   let arrList: Collection[] = [];
  //   let isFetching = true;
  //   let totalNum = 0;
  //   if (hubConnection) {
  //     while (isFetching) {
  //       try {
  //         const res = await hubConnection.invoke<RootChange>(
  //           'GetMarket',
  //           4,
  //           date,
  //           new Date(),
  //           totalNum,
  //           100
  //         );
  //         if (res) {
  //           if (arrList.length < res.totalRecords) {
  //             totalNum += 100;
  //             arrList = [...arrList, ...res.collection];
  //           } else {
  //             isFetching = false;
  //             break;
  //           }
  //         }
  //       } catch (e) {
  //         console.log(e);
  //       }
  //     }
  //     setListDIAMOND(arrList);
  //   }
  // };

  // useEffect(() => {
  //   const dateFrom = moment().subtract(1, 'days').format();
  //   if (hubConnection) {
  //     fetchDIAMOND(dateFrom);
  //   }
  // }, [hubConnection]);

  // const fetchMGCWD = async (date: string) => {
  //   let arrList: Collection[] = [];
  //   let isFetching = true;
  //   let totalNum = 0;
  //   if (hubConnection) {
  //     while (isFetching) {
  //       try {
  //         const res = await hubConnection.invoke<RootChange>(
  //           'GetMarket',
  //           2,
  //           date,
  //           new Date(),
  //           totalNum,
  //           100
  //         );
  //         if (res) {
  //           if (arrList.length < res.totalRecords) {
  //             totalNum += 100;
  //             arrList = [...arrList, ...res.collection];
  //           } else {
  //             isFetching = false;
  //             break;
  //           }
  //         }
  //       } catch (e) {
  //         console.log(e);
  //       }
  //     }
  //     setListMGCWD(arrList);
  //   }
  // };

  // useEffect(() => {
  //   const dateFrom = moment().subtract(1, 'days').format();
  //   if (hubConnection) {
  //     fetchMGCWD(dateFrom);
  //   }
  // }, [hubConnection]);

  // const fetchGCWD = async (date: string) => {
  //   let arrList: Collection[] = [];
  //   let isFetching = true;
  //   let totalNum = 0;
  //   if (hubConnection) {
  //     while (isFetching) {
  //       try {
  //         const res = await hubConnection.invoke<RootChange>(
  //           'GetMarket',
  //           3,
  //           date,
  //           new Date(),
  //           totalNum,
  //           100
  //         );
  //         if (res) {
  //           if (arrList.length < res.totalRecords) {
  //             totalNum += 100;
  //             arrList = [...arrList, ...res.collection];
  //           } else {
  //             isFetching = false;
  //             break;
  //           }
  //         }
  //       } catch (e) {
  //         console.log(e);
  //       }
  //     }
  //     setListGCWD(arrList);
  //   }
  // };

  // useEffect(() => {
  //   const dateFrom = moment().subtract(1, 'days').format();
  //   if (hubConnection) {
  //     fetchGCWD(dateFrom);
  //   }
  // }, [hubConnection]);

  // useEffect(() => {
  //   const dateFrom = moment().subtract(1, 'months').format();
  //   if (hubConnection) {
  //     hubConnection
  //       .invoke('GetMarketForDiagram', 3, 0, dateFrom, new Date(), 0, 100)
  //       .then((res) => {
  //         console.log('new res', res);
  //       })
  //       .catch((e) => console.log(e));
  //   }
  // }, [hubConnection]);

  // useEffect(() => {
  //   const cb = (data: Collection) => {
  //     console.log('MarketNotification', data);
  //     if (data.assetKind === 3) {
  //       setListGCWD((listGCWD) => [...listGCWD, data]);
  //     } else if (data.assetKind === 2) {
  //       setListMGCWD((listMGCWD) => [...listMGCWD, data]);
  //     } else {
  //       setListDIAMOND((listDIAMOND) => [...listDIAMOND, data]);
  //     }
  //   };
  //   if (hubConnection) {
  //     hubConnection.on('MarketNotification', cb);
  //   }
  //   return () => {
  //     hubConnection?.off('MarketNotification', cb);
  //   };
  // }, [hubConnection]);

  return (
    <>
      <SliderChart
        listDIAMOND={listDIAMOND}
        listGLOBAL={listGLOBAL}
        listMGCWD={listMGCWD}
        listGCWD={listGCWD}
        fetchMGCWD={fetchMGCWD}
        fetchGCWD={fetchGCWD}
        fetchDIAMOND={fetchDIAMOND}
        fetchGLOBAL={fetchGLOBAL}
      />
    </>
  );
};
