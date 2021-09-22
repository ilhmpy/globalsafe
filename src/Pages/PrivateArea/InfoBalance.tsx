import moment from 'moment';
import React, { FC, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { Scrollbars } from 'react-custom-scrollbars';
import { useTranslation } from 'react-i18next';
import InfiniteScroll from 'react-infinite-scroller';
import { CSSTransition } from 'react-transition-group';
import { StackedColumn } from '../../components/Charts/StackedColumn';
import { Modal } from '../../components/Modal/Modal';
import { Select } from '../../components/Select/Select4';
import { ModalRangeInput } from '../../components/UI/DayPicker';
import { Input } from '../../components/UI/Input';
import { Loading } from '../../components/UI/Loading';
import { AppContext } from '../../context/HubContext';
import { Card, Container } from '../../globalStyles';
import { Balance } from '../../types/balance';
import { RootBalanceList, Collection } from '../../types/balanceHistory';
import { OpenDate } from '../../types/dates';
import { ModalDividends } from './Modals';
import * as Styled from './Styles.elements';

type Obj = {
  id: string;
  operationKind: number;
  balance: number;
};

type Deposit = {
  [elemName: string]: Obj[];
};

type BalanceTableProps = {
  balanceLog: any;
};

const BalanceTable: FC<BalanceTableProps> = ({ balanceLog }: BalanceTableProps) => {
  const [divModal, setDivModal] = useState(false);
  const { t } = useTranslation();

  const operation = (id: number) => {
    if (id === 6) {
      return t('operation.open');
    } else if (id === 7) {
      return t('operation.divedents');
    } else if (id === 8) {
      return t('operation.close');
    } else if (id === 2) {
      return t('operation.withdraw');
    } else if (id === 1) {
      return t('operation.add');
    } else if (id === 3) {
      return t('operation.rollback');
    } else if (id === 4) {
      return t('operation.balance');
    } else if (id === 5) {
      return t('operation.partners');
    } else if (id === 9) {
      return t('operation.adjustemnt');
    } else if (id === 10) {
      return t('operation.prizeAdjustment');
    } else if (id === 11) {
      return t('operation.transactionNetworkFee');
    } else if (id === 12) {
      return t('operation.transactionNetworkFee');
    } else if (id === 13) {
      return t('operation.depositLoan');
    } else if (id === 14) {
      return t('operation.balanceExchange');
    } else if (id === 15) {
      return t('operation.depositExchange');
    }
  };

  const dividentModal = (id: number) => {
    if (id === 7) {
      setDivModal(true);
    }
  };

  const onClose = () => {
    setDivModal(false);
  };

  return (
    <>
      <div>
        {divModal && <ModalDividends open={divModal} data={balanceLog} onClose={onClose} />}
        <Styled.DataListItem
          divident={balanceLog.operationKind === 7}
          onClick={() => dividentModal(balanceLog.operationKind)}
        >
          <Styled.DataListName>{operation(balanceLog.operationKind)}</Styled.DataListName>
          <Styled.DataListSum plus={balanceLog.balance >= 0}>
            {balanceLog.balance < 0 ? '' : balanceLog.operationKind !== 6 ? '+' : '-'}{' '}
            {(balanceLog.asset === 1
              ? balanceLog.balance / 100000
              : balanceLog.asset === 43
              ? balanceLog.balance / 10000
              : balanceLog.balance
            ).toLocaleString('ru-RU', {
              maximumFractionDigits: 5,
            })}
            <br />
            {balanceLog.asset ? Balance[balanceLog.asset] : 'CWD'}
          </Styled.DataListSum>
        </Styled.DataListItem>
      </div>
    </>
  );
};

export const InfoBalance = () => {
  const [balanceLog, setBalanceLog] = useState<Deposit | null>(null);
  const [depositTabs, setDepositTabs] = useState(0);
  const [balanceLogs, setBalanceLogs] = useState([
    0, 1, 2, 3, 4, 5, 6, 7, 8, 10, 11, 12, 13, 14, 15,
  ]);
  const [open, setOpen] = useState(false);
  const [openDate, setOpenDate] = useState<OpenDate>({
    from: new Date('2020-12-02T00:47:45'),
    to: new Date(),
  });
  const { t } = useTranslation();
  const [selected, setSelected] = useState<string | never>(t('privateArea.allTime'));
  const appContext = useContext(AppContext);
  const hubConnection = appContext.hubConnection;
  const balance = appContext.balance;
  const balanceList = appContext.balanceList;
  const [depositTotal, setDepositTotal] = useState(0);
  const [totalPayed, setTotalPayed] = useState(0);
  const [count, setCount] = useState(true);
  const [num, setNum] = useState(100);
  const [loading, setLoading] = useState(true);
  const [addBalance, setAddBalance] = useState(false);
  const [balanceValue, setBalanceValue] = useState('');
  const [currencyValue, setCurrencyValue] = useState<string | Balance>('');
  const [loadDeposit, setLoadDeposit] = useState(false);
  const [totalDeposit, setTotalDeposit] = useState(0);
  const [depositList, setDepositList] = useState<any>([]);
  const [chartList, setChartList] = useState<any>({});
  const inputRef = useRef<any>(null);

  // Get Balance Kinds List as an Array
  const balancesList = useMemo(() => {
    return ['CWD', 'GLOBAL', 'GF', 'FF', 'GF5', 'GF6', 'FF5', 'FF6'];
  }, []);

  const bType = useMemo(() => {
    return balanceList?.map((i) => i.balanceKind);
  }, [balanceList]);

  useEffect(() => {
    if (hubConnection) {
      hubConnection
        .invoke('GetTotalPayedAmount')
        .then((res) => {
          setTotalPayed(res);
        })
        .catch((err: Error) => console.log(err));
    }
  }, [hubConnection]);

  useEffect(() => {
    if (hubConnection) {
      hubConnection
        .invoke('GetTotalDepositsAmount')
        .then((res) => {
          setDepositTotal(res);
        })
        .catch((err: Error) => console.log(err));
    }
  }, [hubConnection]);

  const lang = localStorage.getItem('i18nextLng') || 'ru';
  const languale = lang === 'ru' ? 1 : 0;

  const yearSelected = () => {
    const year = moment().format('YYYY');
    const yearStart: any = moment(year, 'YYYY').startOf('month');
    const yearEnd: any = moment(year, 'YYYY').endOf('year');
    setOpenDate({
      from: yearStart._d,
      to: yearEnd._d,
    });
    setSelected(`${t('privateArea.at')} ${moment().format('YYYY')}`);
    onClose();
  };

  const monthSelected = () => {
    const currentMonth = moment().format('MMYYYY');
    const currentMonthStart: any = moment(currentMonth, 'M.YYYY').startOf('month');
    const currentMonthEnd: any = moment(currentMonth, 'M.YYYY').endOf('month');
    setOpenDate({
      from: currentMonthStart._d,
      to: currentMonthEnd._d,
    });
    setSelected(`${t('privateArea.at')} ${moment().format('MMMM YYYY')}`);
    onClose();
  };

  const rangeDate = (from: Date, to: Date) => {
    setOpenDate({
      from: from,
      to: moment(to).utcOffset('+00:00').set({ hour: 23, minute: 59, second: 59 }).toDate(),
    });
    setSelected(`${moment(from).format('DD.MM.YY')} - ${moment(to).format('DD.MM.YY')}`);
    onClose();
  };

  const allDate = () => {
    setOpenDate({
      from: new Date('2020-12-02T00:47:45'),
      to: new Date(),
    });
    setSelected(t('privateArea.allTime'));
    onClose();
  };

  useEffect(() => {
    if (selected === 'За все время' || selected === 'For all the time') {
      setSelected(t('privateArea.allTime'));
      allDate();
    } else {
      monthSelected();
    }
  }, [languale]);

  useEffect(() => {
    if (addBalance) {
      inputRef.current.focus();
    }
  }, [addBalance]);

  useEffect(() => {
    setBalanceLog(null);
    const bType = balanceList ? balanceList.map((i) => i.balanceKind) : [];
    if (hubConnection && bType.length) {
      setLoading(true);
      hubConnection
        .invoke<RootBalanceList>(
          'GetBalanceLog',
          bType,
          balanceLogs,
          openDate.from || new Date('2020-12-02T00:47:45'),
          openDate.to || new Date(),
          0,
          100
        )
        .then((res: any) => {
          setTotalDeposit(res.totalRecords);
          setNum(100);

          function getFormatedDate(dateStr: Date) {
            const date = moment(dateStr).format('DD MMMM YYYY');
            return date;
          }
          if (res.collection.length) {
            setDepositList(res.collection);
            const result: any = {};
            res.collection.forEach((item: Collection) => {
              const d = getFormatedDate(item.operationDate);
              const balAsset = balanceList?.filter((i) => i.safeId === item.balanceSafeId);
              const obj = {
                id: item.safeId,
                operationKind: item.operationKind,
                balance: item.balanceDelta,
                date: item.operationDate,
                asset: balAsset?.length ? balAsset[0].balanceKind : 1,
              };

              if (result[d]) {
                result[d].push(obj);
              } else {
                result[d] = [obj];
              }
            });
            setBalanceLog(result);
          } else {
            setBalanceLog(null);
          }
          setLoading(false);
        })
        .catch((err: Error) => {
          setLoading(false);
          console.log(err);
        });
    }
  }, [hubConnection, openDate, balanceLogs, languale, balanceList]);

  // console.log('depositList', depositList);

  const myLoad = () => {
    setCount(false);
    // console.log('load');

    if (hubConnection && depositList.length < totalDeposit) {
      hubConnection
        .invoke<RootBalanceList>(
          'GetBalanceLog',
          bType,
          balanceLogs,
          openDate.from || new Date('2020-12-02T00:47:45'),
          openDate.to || new Date(),
          num,
          100
        )
        .then((res) => {
          // console.log('load', res);
          setLoading(false);
          if (res.collection.length) {
            if (res.collection.length) {
              setDepositList([...depositList, ...res.collection]);
              const result: any = { ...balanceLog };

              res.collection.forEach((item: any) => {
                const balAsset = balanceList?.filter((i) => i.safeId === item.balanceSafeId);
                const d = moment(item.operationDate).format('DD MMMM YYYY');
                const obj = {
                  id: item.safeId,
                  operationKind: item.operationKind,
                  balance: item.balanceDelta,
                  date: item.operationDate,
                  asset: balAsset?.length ? balAsset[0].balanceKind : 1,
                };

                if (result[d]) {
                  result[d].push(obj);
                } else {
                  result[d] = [obj];
                }
              });
              setNum(num + 100);
              setBalanceLog(result);
            } else {
              setBalanceLog(null);
            }
          }
          setCount(true);
        })
        .catch((err: Error) => {
          setLoading(false);
          console.log(err);
        });
    }
  };

  useEffect(() => {
    if (hubConnection) {
      hubConnection
        .invoke(
          'GetBalanceStats',
          openDate.from,
          openDate.to,
          balanceLogs,
          [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
        )
        .then((res) => {
          const result: any = {};
          // eslint-disable-next-line max-len
          for (const key in res) {
            if (res) {
              const newArr =
                res[key].length > 0
                  ? res[key].map((i: any) => ({
                      operationKind: i[0],
                      type: i[1],
                      balance: i[2],
                      date: key,
                    }))
                  : [
                      {
                        date: key,
                        operationKind: 0,
                        type: null,
                        balance: 0,
                      },
                    ];

              const d = moment(key).format('DD MMMM YYYY');
              if (result[d]) {
                result[d].push(...newArr);
              } else {
                result[d] = [...newArr];
              }
            }
          }
          setChartList(result);
        })
        .catch((err: Error) => {
          console.log(err);
        });
    }
  }, [hubConnection, openDate, balanceLogs, languale]);

  const handleBalance = (id: number) => {
    if (id !== depositTabs) {
      setDepositTabs(id);
      if (id === 0) {
        setBalanceLogs([0, 1, 2, 3, 4, 5, 6, 7, 8, 10, 11, 12, 13, 14, 15]);
      } else if (id === 1) {
        setBalanceLogs([1, 7, 8]);
      } else if (id === 2) {
        setBalanceLogs([2]);
      }
    }
  };

  const onClose = () => {
    setOpen(false);
  };

  const minOffset = 0;
  const maxOffset = 10;
  const thisYear = new Date().getFullYear();
  const thisMonth = moment.months();
  const options = [];

  for (let i = minOffset; i <= maxOffset; i++) {
    const year = thisYear - i;
    options.push(<option value={year}>{year}</option>);
  }

  const getTopUp = () => {
    // GetTopUpUrl(BalanceKind balanceKind, ulong volume)
    const newWindow = window.open();
    if (hubConnection) {
      hubConnection
        .invoke(
          'GetTopUpUrl',
          Balance[currencyValue as keyof typeof Balance],
          currencyValue === 'CWD'
            ? +balanceValue * 100000
            : currencyValue === 'GLOBAL'
            ? +balanceValue * 10000
            : +balanceValue
        )
        .then((res: string) => {
          newWindow && (newWindow.location.href = res);
        })
        .catch((err: Error) => {
          console.log(err);
          newWindow && newWindow.close();
        });
    }
  };

  const onChangeBalanceValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    const pattern = /^[1-9][0-9]*$/;
    if (e.target.value === '' || pattern.test(e.target.value)) {
      setBalanceValue(e.target.value);
    }
  };

  const onChangeCurrencyValue = (balanceKind: null | (string | Balance)) => {
    if (!balanceKind) {
      setCurrencyValue('');
      return;
    }

    setCurrencyValue(balanceKind);
  };

  const handleCloseAddBalanceModal = () => {
    setAddBalance(false);
    setBalanceValue('');
    setCurrencyValue('');
  };

  return (
    <>
      {loadDeposit && (
        <Styled.Loader>
          <Loading />
        </Styled.Loader>
      )}
      <Container>
        <Styled.BalanceWrap>
          <Styled.TopUpButton blue onClick={() => setAddBalance(true)}>
            {t('privateArea.topUpBalance')}
          </Styled.TopUpButton>
          <Styled.BalanceList>
            <Styled.BalanceItem>
              <Styled.BalanceItemName>{t('privateArea.balance')}</Styled.BalanceItemName>
              <Styled.BalanceItemValue pink>
                {balance ? (balance / 100000).toLocaleString() : '0'}
              </Styled.BalanceItemValue>
            </Styled.BalanceItem>

            <Styled.BalanceItem>
              <Styled.BalanceItemName>{t('privateArea.take')}</Styled.BalanceItemName>
              <Styled.BalanceItemValue pink>
                {(depositTotal / 100000).toLocaleString()}
              </Styled.BalanceItemValue>
            </Styled.BalanceItem>

            <Styled.BalanceItem>
              <Styled.BalanceItemName>{t('privateArea.findings')}</Styled.BalanceItemName>
              <Styled.BalanceItemValue>
                {(totalPayed / 100000).toLocaleString()}
              </Styled.BalanceItemValue>
            </Styled.BalanceItem>
          </Styled.BalanceList>

          <Styled.DateButton onClick={() => setOpen(true)}>
            <span>{selected}</span>
          </Styled.DateButton>
        </Styled.BalanceWrap>
      </Container>

      <Container>
        <Card>
          <Styled.BalanceTabHead>
            <Styled.BalanceTabItem onClick={() => handleBalance(0)} active={depositTabs === 0}>
              {t('privateArea.allOperation')}
            </Styled.BalanceTabItem>
            <Styled.BalanceTabItem onClick={() => handleBalance(1)} active={depositTabs === 1}>
              {t('privateArea.take')}
            </Styled.BalanceTabItem>
            <Styled.BalanceTabItem onClick={() => handleBalance(2)} active={depositTabs === 2}>
              {t('privateArea.findings')}
            </Styled.BalanceTabItem>
          </Styled.BalanceTabHead>
        </Card>
      </Container>
      <Styled.ContainerChart>
        <Styled.InnerChart>{chartList && <StackedColumn values={chartList} />}</Styled.InnerChart>
      </Styled.ContainerChart>
      <Container>
        <Styled.InnerTable>
          <Styled.DataListWrap>
            <Styled.DataList>
              <Styled.DataListHead>
                <Styled.DataListItem>
                  <Styled.DataListName>{t('privateArea.name')}</Styled.DataListName>
                  <Styled.DataListName>{t('privateArea.sum')}</Styled.DataListName>
                </Styled.DataListItem>
              </Styled.DataListHead>
              {balanceLog && !loading ? (
                <Scrollbars style={{ height: '500px' }}>
                  <InfiniteScroll
                    pageStart={0}
                    loadMore={myLoad}
                    hasMore={count}
                    useWindow={false}
                    loader={
                      <div className="loader" key={0}>
                        Loading ...
                      </div>
                    }
                  >
                    {Object.keys(balanceLog).map((key) => (
                      <div key={key}>
                        <Styled.DataListDate>{key}</Styled.DataListDate>

                        {balanceLog[key].map((item, idx) => (
                          <BalanceTable key={item.id} balanceLog={item} />
                        ))}
                      </div>
                    ))}
                  </InfiniteScroll>
                </Scrollbars>
              ) : loading ? (
                <Loading />
              ) : (
                <Styled.NotFound>{t('notFound')}</Styled.NotFound>
              )}
            </Styled.DataList>
          </Styled.DataListWrap>
        </Styled.InnerTable>
      </Container>

      <CSSTransition in={open} timeout={300} classNames="modal" unmountOnExit>
        <Styled.ModalWrap>
          <Modal onClose={onClose}>
            <Styled.ModalContent>
              <Styled.ModalTitle>{t('privateArea.selectPeriod')}</Styled.ModalTitle>
              <Styled.ModalItem>
                <Styled.DateTitle>{t('privateArea.thisMonth')}</Styled.DateTitle>
                <Styled.DateText onClick={monthSelected}>
                  {moment().format('MMMM YYYY')}
                </Styled.DateText>
              </Styled.ModalItem>
              <Styled.ModalItem>
                <Styled.DateTitle>{t('privateArea.thisYear')}</Styled.DateTitle>
                <Styled.DateText onClick={yearSelected}>{moment().format('YYYY')}</Styled.DateText>
              </Styled.ModalItem>
              <Styled.ModalItem>
                <Styled.DateTitle></Styled.DateTitle>
                <Styled.DateText onClick={allDate}>{t('privateArea.allTime')}</Styled.DateText>
              </Styled.ModalItem>
            </Styled.ModalContent>
            <ModalRangeInput onClose={onClose} openDate={openDate} setOpenDate={rangeDate} />
          </Modal>
        </Styled.ModalWrap>
      </CSSTransition>

      <CSSTransition in={addBalance} timeout={300} classNames="modal" unmountOnExit>
        <Modal onClose={handleCloseAddBalanceModal}>
          <Styled.ModalBlock>
            <Styled.ModalTitle>{t('privateArea.topUpBalance')}</Styled.ModalTitle>
            <Select
              placeholder={t('privateArea.selectCurrency')}
              options={balancesList}
              selectedOption={currencyValue}
              setSelectedOption={onChangeCurrencyValue}
            />
            <Input
              onChange={onChangeBalanceValue}
              placeholder={t('privateArea.amountEnter')}
              type="text"
              ref={inputRef}
              value={balanceValue}
            />
            <Styled.ModalButton
              as="button"
              disabled={!balanceValue || !currencyValue}
              onClick={getTopUp}
              danger
            >
              {t('privateArea.topUp')}
            </Styled.ModalButton>
          </Styled.ModalBlock>
        </Modal>
      </CSSTransition>
    </>
  );
};
