import React, { FC, useState, useContext, useEffect } from 'react';
import { AppContext } from './HubContext';
import { Collection, RootChange } from '../types/currency';
import moment from 'moment'; 

type Context = {
  fetchGLOBAL: (type: string) => void;
  fetchGCWD: (type: string) => void;
  fetchMGCWD: (type: string) => void;
  fetchDIAMOND: (type: string) => void;
  daylistGLOBAL: Collection[];
  setDayListGLOBAL: (daylistGLOBAL: Collection[]) => void;
  monthlistGLOBAL: Collection[];
  setMonthListGLOBAL: (daylistGLOBAL: Collection[]) => void;
  threeMonthlistGLOBAL: Collection[];
  setThreeMonthListGLOBAL: (daylistGLOBAL: Collection[]) => void;
  yearMonthlistGLOBAL: Collection[];
  setYearMonthListGLOBAL: (daylistGLOBAL: Collection[]) => void;
  daylistGCWD: Collection[];
  setDayListGCWD: (daylistGLOBAL: Collection[]) => void;
  monthlistGCWD: Collection[];
  setMonthListGCWD: (daylistGLOBAL: Collection[]) => void;
  threeMonthlistGCWD: Collection[];
  setThreeMonthListGCWD: (daylistGLOBAL: Collection[]) => void;
  yearMonthlistGCWD: Collection[];
  setYearMonthListGCWD: (daylistGLOBAL: Collection[]) => void;
  daylistMGCWD: Collection[];
  setDayListMGCWD: (daylistGLOBAL: Collection[]) => void;
  monthlistMGCWD: Collection[];
  setMonthListMGCWD: (daylistGLOBAL: Collection[]) => void;
  threeMonthlistMGCWD: Collection[];
  setThreeMonthListMGCWD: (daylistGLOBAL: Collection[]) => void;
  yearMonthlistMGCWD: Collection[];
  setYearMonthListMGCWD: (daylistGLOBAL: Collection[]) => void;
  daylistDIAMOND: Collection[];
  setDayListDIAMOND: (daylistGLOBAL: Collection[]) => void;
  monthListDIAMOND: Collection[];
  setMonthListDIAMOND: (daylistGLOBAL: Collection[]) => void;
  threeMonthListDIAMOND: Collection[];
  setThreeMonthListDIAMOND: (daylistGLOBAL: Collection[]) => void;
  yearListDIAMOND: Collection[];
  setYearListDIAMOND: (daylistGLOBAL: Collection[]) => void;
  activeTab: string;
  setActiveTab: (str: string) => void;
  listDIAMOND: Collection[];
  listGLOBAL: Collection[];
  listMGCWD: Collection[];
  listGCWD: Collection[];
  loadDIAMOND: boolean;
  loadGLOBAL: boolean;
  loadMGCWD: boolean;
  loadGCWD: boolean;
};

export const ChartContext = React.createContext<Context>({
  fetchGLOBAL: (type: string) => undefined,
  fetchGCWD: (type: string) => undefined,
  fetchMGCWD: (type: string) => undefined,
  fetchDIAMOND: (type: string) => undefined,
  daylistGLOBAL: [],
  setDayListGLOBAL: (daylistGLOBAL: Collection[]) => undefined,
  monthlistGLOBAL: [],
  setMonthListGLOBAL: (daylistGLOBAL: Collection[]) => undefined,
  threeMonthlistGLOBAL: [],
  setThreeMonthListGLOBAL: (daylistGLOBAL: Collection[]) => undefined,
  yearMonthlistGLOBAL: [],
  setYearMonthListGLOBAL: (daylistGLOBAL: Collection[]) => undefined,
  daylistGCWD: [],
  setDayListGCWD: (daylistGLOBAL: Collection[]) => undefined,
  monthlistGCWD: [],
  setMonthListGCWD: (daylistGLOBAL: Collection[]) => undefined,
  threeMonthlistGCWD: [],
  setThreeMonthListGCWD: (daylistGLOBAL: Collection[]) => undefined,
  yearMonthlistGCWD: [],
  setYearMonthListGCWD: (daylistGLOBAL: Collection[]) => undefined,
  daylistMGCWD: [],
  setDayListMGCWD: (daylistGLOBAL: Collection[]) => undefined,
  monthlistMGCWD: [],
  setMonthListMGCWD: (daylistGLOBAL: Collection[]) => undefined,
  threeMonthlistMGCWD: [],
  setThreeMonthListMGCWD: (daylistGLOBAL: Collection[]) => undefined,
  yearMonthlistMGCWD: [],
  setYearMonthListMGCWD: (daylistGLOBAL: Collection[]) => undefined,
  daylistDIAMOND: [],
  setDayListDIAMOND: (daylistGLOBAL: Collection[]) => undefined,
  monthListDIAMOND: [],
  setMonthListDIAMOND: (daylistGLOBAL: Collection[]) => undefined,
  threeMonthListDIAMOND: [],
  setThreeMonthListDIAMOND: (daylistGLOBAL: Collection[]) => undefined,
  yearListDIAMOND: [],
  setYearListDIAMOND: (daylistGLOBAL: Collection[]) => undefined,
  activeTab: 'day',
  setActiveTab: (str: string) => undefined,

  listDIAMOND: [],
  listGLOBAL: [],
  listMGCWD: [],
  listGCWD: [],
  loadDIAMOND: false,
  loadGLOBAL: false,
  loadMGCWD: false,
  loadGCWD: false,
});

export const ChartProvider: FC = ({ children }: any) => {
  const [daylistDIAMOND, setDayListDIAMOND] = useState<Collection[]>([]);
  const [monthListDIAMOND, setMonthListDIAMOND] = useState<Collection[]>([]);
  const [threeMonthListDIAMOND, setThreeMonthListDIAMOND] = useState<Collection[]>([]);
  const [yearListDIAMOND, setYearListDIAMOND] = useState<Collection[]>([]);

  const [daylistGLOBAL, setDayListGLOBAL] = useState<Collection[]>([]);
  const [monthlistGLOBAL, setMonthListGLOBAL] = useState<Collection[]>([]);
  const [threeMonthlistGLOBAL, setThreeMonthListGLOBAL] = useState<Collection[]>([]);
  const [yearMonthlistGLOBAL, setYearMonthListGLOBAL] = useState<Collection[]>([]);

  const [daylistMGCWD, setDayListMGCWD] = useState<Collection[]>([]);
  const [monthlistMGCWD, setMonthListMGCWD] = useState<Collection[]>([]);
  const [threeMonthlistMGCWD, setThreeMonthListMGCWD] = useState<Collection[]>([]);
  const [yearMonthlistMGCWD, setYearMonthListMGCWD] = useState<Collection[]>([]);

  const [daylistGCWD, setDayListGCWD] = useState<Collection[]>([]);
  const [monthlistGCWD, setMonthListGCWD] = useState<Collection[]>([]);
  const [threeMonthlistGCWD, setThreeMonthListGCWD] = useState<Collection[]>([]);
  const [yearMonthlistGCWD, setYearMonthListGCWD] = useState<Collection[]>([]);
  const [activeTab, setActiveTab] = useState('День');

  const [listDIAMOND, setListDIAMOND] = useState<Collection[]>([]);
  const [listGLOBAL, setListGLOBAL] = useState<Collection[]>([]);
  const [listMGCWD, setListMGCWD] = useState<Collection[]>([]);
  const [listGCWD, setListGCWD] = useState<Collection[]>([]);

  const [loadDIAMOND, setLoadDIAMOND] = useState(false);
  const [loadGLOBAL, setLoadGLOBAL] = useState(false);
  const [loadMGCWD, setLoadMGCWD] = useState(false);
  const [loadGCWD, setLoadGCWD] = useState(false);

  const appContext = useContext(AppContext);
  const hubConnection = appContext.hubConnection;

  const fetchDIAMOND = async (type: string) => {
    let date;
    if (type === 'day' && daylistDIAMOND.length) {
      setListDIAMOND(daylistDIAMOND);
      return;
    }
    if (type === 'months' && monthListDIAMOND.length) {
      setListDIAMOND(monthListDIAMOND);
      return;
    }
    if (type === '3months' && threeMonthListDIAMOND.length) {
      setListDIAMOND(threeMonthListDIAMOND);
      return;
    }
    if (type === 'year' && yearListDIAMOND.length) {
      setListDIAMOND(yearListDIAMOND);
      return;
    }
    if (type === 'day') {
      date = moment().subtract(1, 'days').format();
    } else if (type === 'months') {
      date = moment().subtract(1, 'months').format();
    } else if (type === '3months') {
      date = moment().subtract(3, 'months').format();
    } else if (type === 'year') {
      date = moment().subtract(1, 'years').format();
    } else {
      date = moment().subtract(1, 'days').format();
    }
    let arrList: Collection[] = [];
    let isFetching = true;
    let totalNum = 0;
    let total = -1;
    if (hubConnection) {
      setLoadDIAMOND(true);
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
              total = res.totalRecords;
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
      if (type === 'day') {
        setListDIAMOND(arrList);
        setDayListDIAMOND(arrList);
      }
      if (type === 'months') {
        setMonthListDIAMOND(arrList);
        setListDIAMOND(arrList);
      }
      if (type === '3months') {
        setThreeMonthListDIAMOND(arrList);
        setListDIAMOND(arrList);
      }
      if (type === 'year') {
        setYearListDIAMOND(arrList);
        setListDIAMOND(arrList);
      }
      setLoadDIAMOND(false);
    }
  };

  const fetchMGCWD = async (type: string) => {
    let date;
    if (type === 'day' && daylistMGCWD.length) {
      setListMGCWD(daylistMGCWD);
      return;
    }
    if (type === 'months' && monthlistMGCWD.length) {
      setListMGCWD(monthlistMGCWD);
      return;
    }
    if (type === '3months' && threeMonthlistMGCWD.length) {
      setListMGCWD(threeMonthlistMGCWD);
      return;
    }
    if (type === 'year' && yearMonthlistMGCWD.length) {
      setListMGCWD(yearMonthlistMGCWD);
      return;
    }
    if (type === 'day') {
      date = moment().subtract(1, 'days').format();
    } else if (type === 'months') {
      date = moment().subtract(1, 'months').format();
    } else if (type === '3months') {
      date = moment().subtract(3, 'months').format();
    } else if (type === 'year') {
      date = moment().subtract(1, 'years').format();
    } else {
      date = moment().subtract(1, 'days').format();
    }
    let arrList: Collection[] = [];
    let isFetching = true;
    let totalNum = 0;
    let total = -1;
    if (hubConnection) {
      setLoadMGCWD(true);
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
              total = res.totalRecords;
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
      if (type === 'day') {
        setListMGCWD(arrList);
        setDayListMGCWD(arrList);
      }
      if (type === 'months') {
        setMonthListMGCWD(arrList);
        setListMGCWD(arrList);
      }
      if (type === '3months') {
        setThreeMonthListMGCWD(arrList);
        setListMGCWD(arrList);
      }
      if (type === 'year') {
        setYearMonthListMGCWD(arrList);
        setListMGCWD(arrList);
      }
      setLoadMGCWD(false);
    }
  };

  const fetchGCWD = async (type: string) => {
    let date;

    if (type === 'day' && daylistGCWD.length) {
      setListGCWD(daylistGCWD);
      return;
    }
    if (type === 'months' && monthlistGCWD.length) {
      setListGCWD(monthlistGCWD);
      return;
    }
    if (type === '3months' && threeMonthlistGCWD.length) {
      setListGCWD(threeMonthlistGCWD);
      return;
    }
    if (type === 'year' && yearMonthlistGCWD.length) {
      setListGCWD(yearMonthlistGCWD);
      return;
    }
    if (type === 'day') {
      date = moment().subtract(1, 'days').format();
    } else if (type === 'months') {
      date = moment().subtract(1, 'months').format();
    } else if (type === '3months') {
      date = moment().subtract(3, 'months').format();
    } else if (type === 'year') {
      date = moment().subtract(1, 'years').format();
    } else {
      date = moment().subtract(1, 'days').format();
    }
    let arrList: Collection[] = [];
    let isFetching = true;
    let total = -1;
    let totalNum = 0;
    if (hubConnection) {
      setLoadGCWD(true);
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
              total = res.totalRecords;
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
      if (type === 'day') {
        setListGCWD(arrList);
        setDayListGCWD(arrList);
      }
      if (type === 'months') {
        setMonthListGCWD(arrList);
        setListGCWD(arrList);
      }
      if (type === '3months') {
        setThreeMonthListGCWD(arrList);
        setListGCWD(arrList);
      }
      if (type === 'year') {
        setYearMonthListGCWD(arrList);
        setListGCWD(arrList);
      }
      setLoadGCWD(false);
    }
  };

  const fetchGLOBAL = async (type: string) => {
    let date;
    if (type === 'day' && daylistGLOBAL.length) {
      setListGLOBAL(daylistGLOBAL);
      return;
    }
    if (type === 'months' && monthlistGLOBAL.length) {
      setListGLOBAL(monthlistGLOBAL);
      return;
    }
    if (type === '3months' && threeMonthlistGLOBAL.length) {
      setListGLOBAL(threeMonthlistGLOBAL);
      return;
    }
    if (type === 'year' && yearMonthlistGLOBAL.length) {
      setListGLOBAL(yearMonthlistGLOBAL);
      return;
    }
    if (type === 'day') {
      date = moment().subtract(1, 'days').format();
    } else if (type === 'months') {
      date = moment().subtract(1, 'months').format();
    } else if (type === '3months') {
      date = moment().subtract(3, 'months').format();
    } else if (type === 'year') {
      date = moment().subtract(1, 'years').format();
    } else {
      date = moment().subtract(1, 'days').format();
    }

    let arrList: Collection[] = [];
    let isFetching = true;
    let totalNum = 0;
    let total = -1;
    if (hubConnection) {
      setLoadGLOBAL(true);
      while (isFetching) {
        try {
          const res = await hubConnection.invoke<RootChange>(
            'GetMarket',
            43,
            date,
            new Date(),
            totalNum,
            100
          );
          if (res) {
            if (arrList.length < res.totalRecords) {
              total = res.totalRecords;
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
      if (type === 'day') {
        setListGLOBAL(arrList);
        setDayListGLOBAL(arrList);
      }
      if (type === 'months') {
        setListGLOBAL(arrList);
        setMonthListGLOBAL(arrList);
      }
      if (type === '3months') {
        setThreeMonthListGLOBAL(arrList);
        setListGLOBAL(arrList);
      }
      if (type === 'year') {
        setYearMonthListGLOBAL(arrList);
        setListGLOBAL(arrList);
      }
      setLoadGLOBAL(false);
    }
  };

  useEffect(() => {
    const cb = (data: Collection) => {
      console.log('MarketNotification', data);
      if (data.assetKind === 3) {
        setListGCWD((listGCWD) => [...listGCWD, data]);
      } else if (data.assetKind === 2) {
        setListMGCWD((listMGCWD) => [...listMGCWD, data]);
      } else if (data.assetKind === 43) {
        setListGLOBAL((listGlobal) => [...listGlobal, data]);
      } else if (data.assetKind === 4) {
        setListDIAMOND((listDIAMOND) => [...listDIAMOND, data]);
      } else {
        return;
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
    <ChartContext.Provider
      value={{
        fetchGLOBAL,
        fetchGCWD,
        fetchMGCWD,
        fetchDIAMOND,
        daylistGLOBAL,
        setDayListGLOBAL,
        monthlistGLOBAL,
        setMonthListGLOBAL,
        threeMonthlistGLOBAL,
        setThreeMonthListGLOBAL,
        yearMonthlistGLOBAL,
        setYearMonthListGLOBAL,
        daylistGCWD,
        setDayListGCWD,
        monthlistGCWD,
        setMonthListGCWD,
        threeMonthlistGCWD,
        setThreeMonthListGCWD,
        yearMonthlistGCWD,
        setYearMonthListGCWD,
        daylistMGCWD,
        setDayListMGCWD,
        monthlistMGCWD,
        setMonthListMGCWD,
        threeMonthlistMGCWD,
        setThreeMonthListMGCWD,
        yearMonthlistMGCWD,
        setYearMonthListMGCWD,
        daylistDIAMOND,
        setDayListDIAMOND,
        monthListDIAMOND,
        setMonthListDIAMOND,
        threeMonthListDIAMOND,
        setThreeMonthListDIAMOND,
        yearListDIAMOND,
        setYearListDIAMOND,
        activeTab,
        setActiveTab,
        listDIAMOND,
        listGLOBAL,
        listMGCWD,
        listGCWD,
        loadDIAMOND,
        loadGLOBAL,
        loadMGCWD,
        loadGCWD,
      }}
    >
      {children}
    </ChartContext.Provider>
  );
};
