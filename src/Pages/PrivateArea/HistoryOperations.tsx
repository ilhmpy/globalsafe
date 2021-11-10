import moment from 'moment';
import 'moment/locale/ru';
import React, { FC, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { NavLink, Redirect, Route, Switch, useHistory } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';
import { Container } from '../../components/UI/Container';
import * as Styled from './Styles.history';
import { Heading } from './components/Heading';
import * as FilterS from './components/Filter/S.el';
import { Filter } from './components/Filter/index';
import { AppContext } from '../../context/HubContext';
import { Balance } from '../../types/balance';
import { Loading, NotItems, Spinner } from './components/Loading/Loading';
import formatRelativeWithOptions from 'date-fns/esm/fp/formatRelativeWithOptions/index.js';
import { isObject } from 'highcharts';
import { InternalSymbolName, isTemplateSpan } from 'typescript';
import { countVolumeToShow } from './utils';
import { ViewExchangeModel } from '../../types/exchange';
import { isFirstDayOfMonth } from 'date-fns/esm';

export const HistoryOperations = () => {
  const [activeFilter, setActiveFilter] = useState<'active' | 'archived' | 'hold'>('active');
  const months = [
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
  ];
  const [buttons, setButtons] = useState<any[]>([
    { text: 'Все типы', active: 'active' },
    { text: 'Пополнение', active: 'hold' },
    { text: 'Списание', active: 'archived' },
  ]);
  const appContext = useContext(AppContext);
  const hubConnection = appContext.hubConnection;
  const balances = appContext.balanceList;
  const { t } = useTranslation();
  const [loading, setLoading] = useState<boolean>(false);
  const [allCurrency, setAllCurrency] = useState<boolean>(true);
  const [nowMonth, setNowMonth] = useState<boolean>(true);
  const [not, setNot] = useState<boolean>(false);
  const [newItems, setNewItems] = useState<boolean>(true);
  const [emptyItems, setEmptyItems] = useState<boolean>(false);
  const [allState, setAllState] = useState<ViewExchangeModel[]>([]);

  const operation = (id: number, link: string) => {
    if (id === 1) {
      return t('operation.add');
    } else if (id === 2) {
      return t('operation.withdraw');
    } else if (id === 3) {
      return t('operation.failed');
    } else if (id === 4) {
      return t('operation.balance');
    } else if (id === 5) {
      return t('operation.partners');
    } else if (id === 6) {
      return t('operation.open');
    } else if (id === 7) {
      return t('operation.divedents');
    } else if (id === 8) {
      return t('operation.close');
    } else if (id === 9) {
      return 'Регулировка баланса';
    } else if (id === 10) {
      return 'Приз';
    } else if (id === 11) {
      return 'Комиссия сети от суммы транзакции';
    } else if (id === 12) {
      return 'Комиссия сервиса от суммы транзакции';
    } else if (id === 13) {
      return 'Депозитный заем.';
    } else if (id === 14) {
      return 'Перевод между балансами.';
    } else if (id === 15) {
      return 'Обменный депозит.';
    } else if (id === 16) {
      return <Styled.Link href={`p2p-changes/orders/${link}`}>Создан ордер на продажу</Styled.Link>;
    } else if (id === 17) {
      return (
        <Styled.Link href={`p2p-changes/orders/${link}`}>Ордер на продажу отменен</Styled.Link>
      );
    } else if (id === 18) {
      1;
      return <Styled.Link href={`p2p-changes/${link}`}>Обмен начался</Styled.Link>;
    } else if (id === 19) {
      return <Styled.Link href={`p2p-changes/${link}`}>Обмен завершен</Styled.Link>;
    } else if (id === 20) {
      return <Styled.Link href={`p2p-changes/${link}`}>Обмен отменен</Styled.Link>;
    } else if (id === 21) {
      return 'Куплен сертификат';
    }
  };

  const [operations, setOperations] = useState<any[] | null>(null);
  const [statusNew, setStatusNew] = useState<any>();
  const [totalRecords, setTotalRecords] = useState<number | null>(null);

  /*    /// NA.
        /// <summary>
        /// NA.
        /// </summary>
        Null, 0

        /// <summary>
        /// Top-up operation.
        /// </summary>
        TopUp, 1

        /// <summary>
        /// Withdraw operation.
        /// </summary>
        Withdraw, 2

        /// <summary>
        /// Balance rollback due to transaction failure.
        /// </summary>
        Rollback, 3

        /// <summary>
        /// Promo balance adjustment.
        /// </summary>
        Promo, 4

        /// <summary>
        /// Affiliate charges.
        /// </summary>
        AffiliateCharges, 5

        /// <summary>
        /// Open new user deposit.
        /// </summary>
        DepositOpen, 6

        /// <summary>
        /// Deposit charges.
        /// </summary>
        DepositPayments, 7

        /// <summary>
        /// Return deposit body on expiry.
        /// </summary>
        DepositClose, 8

        /// <summary>
        /// Balance operation adjustemnt.
        /// </summary>
        Adjustment, 9

        /// <summary>
        /// Balance prize adjustment.
        /// </summary>
        Prize, 10

        /// <summary>
        /// Network commission from the transaction amount
        /// </summary>
        TransactionNetworkFee, 11

        /// <summary>
        /// Service commission from the transaction amount
        /// </summary>
        TransactionServiceFee, 12

        /// <summary>
        /// Deposit loan.
        /// </summary>
        DepositLoan, 13

        /// <summary>
        /// Transfer between balances.
        /// </summary>
        BalanceExchange, 14
 
        /// <summary>
        /// Exchange deposit.
        /// </summary>
        DepositExchange, 15

        /// <summary>
        /// Funds reservation for sell order creation.
        /// </summary>
        SellOrderCreation, 16
 
        /// <summary>
        /// Refund on sell order cancelation.
        /// </summary>
        SellOrderCancelation, 17

        /// <summary>
        /// Exchange funds keep.
        /// </summary>
        Exchange, 18

        /// <summary>
        /// Exchange completion.
        /// </summary>
        ExchangeCompletion, 19

        /// <summary>
        /// Return funds due to exchange cancelation.
        /// </summary>
        ExchangeCancelation, 20
        
        /// <summary>
        /// Purchase new certificate.
        /// </summary>
        CertificatePurchase, 21
    */

  function getFirstElements(collection: ViewExchangeModel[], elms: number) {
    return collection.filter((i, idx) => {
      if (idx < elms) {
        return i;
      }
    });
  }

  function getBalanceLog() {
    if (hubConnection) {
      setNewItems(true);
      const date = new Date();
      setLoading(true);
      hubConnection
        .invoke(
          'GetBalanceLog',
          [1],
          getFilter(activeFilter),
          nowMonth
            ? new Date(date.getFullYear(), date.getMonth(), 1, 0, 0)
            : new Date(2013, 5, 13, 10, 0, 0),
          new Date(),
          0,
          100
        )
        .then((res) => {
          setLoading(false);
          console.log('res', res);
          setTotalRecords(res.totalRecords);
          const sortCollection = res.collection.sort((x: any, y: any) => {
            const a = new Date(x.operationDate);
            const b = new Date(y.operationDate);
            return a > b ? -1 : a < b ? 1 : 0;
          });
          setAllState(sortCollection);
          const collection = getFirstElements(sortCollection, 10);
          console.log(collection);
          if (allCurrency) {
            setOperations(() => {
              return collection
                .map((i: any) => ({ ...i, new: false }))
                .sort((x: any, y: any) => {
                  const a = new Date(x.operationDate);
                  const b = new Date(y.operationDate);
                  return a > b ? -1 : a < b ? 1 : 0;
                });
            });
          } else {
            if (balances) {
              setOperations(() => {
                return collection
                  .filter((i: any) => {
                    if (Number(i.id) === balances[1].id) {
                      return { ...i, new: false };
                    }
                  })
                  .sort((x: any, y: any) => {
                    const a = new Date(x.operationDate);
                    const b = new Date(y.operationDate);
                    return a > b ? -1 : a < b ? 1 : 0;
                  });
              });
            }
          }
          setEmptyItems(!(res.collection.length > 0));
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
    }
  }

  useEffect(() => {
    getBalanceLog();
  }, [activeFilter, hubConnection, nowMonth, allCurrency, totalRecords]);

  function changeNew() {
    setOperations(
      (items) =>
        items &&
        items.map((i: any) => {
          return {
            ...i,
            new: false,
          };
        })
    );
  }

  function addMore() {
    if (operations && operations.length <= allState.length) {
      changeNew();
      let items: any[] = [];
      for (let i = 0; i < 5; i++) {
        if (allState[operations.length + i]) {
          items = [...items, { ...allState[operations.length + i], new: true }];
        }
      }
      if (items.length) {
        setOperations(
          [...operations, ...items].sort((x: any, y: any) => {
            const a = new Date(x.operationDate);
            const b = new Date(y.operationDate);
            return a > b ? -1 : a < b ? 1 : 0;
          })
        );
        setStatusNew(setTimeout(() => changeNew(), 2000));
      }
    }
  }

  function sign(x: number) {
    if (x >= 0) {
      return '+';
    } else {
      return '';
    }
  }

  const getFilter = (key: 'active' | 'archived' | 'hold') => {
    if (key === 'active') {
      return [];
    }
    if (key === 'archived') {
      return [2];
    }
    if (key === 'hold') {
      return [1];
    }
  };

  function getCurrency(id: number, type: 'string' | 'number' = 'number') {
    if (balances) {
      if (type === 'string') {
        for (let i = 0; i < balances.length; i++) {
          if (Number(id) == balances[i].id) {
            return Balance[balances[i].balanceKind];
          }
        }
      } else {
        for (let i = 0; i < balances.length; i++) {
          if (Number(id) == balances[i].id) {
            return balances[i].balanceKind;
          }
        }
      }
    }
  }

  function getLocaleTime(date: Date) {
    const utc = moment.utc(date);
    const local = utc.local();
    return local.format('HH:MM');
  }

  return (
    <>
      <Container>
        <Heading title="История операций" withoutBtn />
        <Styled.FilterAllBlock>
          <Styled.FilterDivision>
            <FilterS.Button active={nowMonth} onClick={() => setNowMonth(!nowMonth)}>
              {months[moment().month()]} {new Date().getFullYear()}
            </FilterS.Button>
          </Styled.FilterDivision>
          <Styled.FilterDivision>
            <FilterS.Button active={allCurrency} onClick={() => setAllCurrency(!allCurrency)}>
              Все валюты
            </FilterS.Button>
          </Styled.FilterDivision>
          <Filter
            activeFilter={activeFilter}
            setActiveFilter={setActiveFilter}
            withoutViewType
            withCustomButtons
            withoutContainer
            buttons={buttons}
          />
        </Styled.FilterAllBlock>
      </Container>
      <Container pTabletNone>
        <Styled.Table none={not}>
          <Styled.TableItem head>
            <Styled.TableInnerItem head>Дата и время</Styled.TableInnerItem>
            <Styled.TableInnerItem head>Категория</Styled.TableInnerItem>
            <Styled.TableInnerItem head>Сумма</Styled.TableInnerItem>
          </Styled.TableItem>
          {operations ? (
            <>
              {!emptyItems ? (
                <>
                  <Styled.TableMap>
                    {operations &&
                      operations.map((item: any, idx) => (
                        <Styled.TableItem item key={idx} newItem={item.new && item.new}>
                          <Styled.TableInnerItem item>
                            {moment(item.operationDate).format('DD.MM.YYYY')} в{' '}
                            {getLocaleTime(item.operationDate)}
                          </Styled.TableInnerItem>
                          <Styled.TableInnerItem item>
                            {operation(item.operationKind, item.referenceSafeId)}
                          </Styled.TableInnerItem>
                          <Styled.TableInnerItem item income={item.balanceDelta > 0}>
                            {item.balanceDelta > 0 && (
                              <>
                                {sign(
                                  countVolumeToShow(
                                    item.balanceDelta,
                                    getCurrency(item.balanceSafeId, 'number')
                                  )
                                )}{' '}
                              </>
                            )}{' '}
                            {item.balanceSafeId &&
                              countVolumeToShow(
                                item.balanceDelta,
                                getCurrency(item.balanceSafeId, 'number')
                              ).toLocaleString('ru-RU', { maximumFractionDigits: 2 })}{' '}
                            {item.balanceSafeId && getCurrency(item.balanceSafeId, 'string')}
                          </Styled.TableInnerItem>
                        </Styled.TableItem>
                      ))}
                  </Styled.TableMap>
                </>
              ) : (
                <NotItems text="Операции отсутствуют" />
              )}
            </>
          ) : (
            <Loading />
          )}
        </Styled.Table>
        <Styled.Button
          onClick={addMore}
          newItems={operations && operations.length > 0 ? newItems : false}
        >
          {operations && operations.some((item: any) => item.new === true) ? (
            <Spinner
              style={{ width: 25, height: 25, borderTop: '2px solid #fff', margin: '0 auto' }}
            />
          ) : (
            'Показать ещё'
          )}
        </Styled.Button>
      </Container>
    </>
  );
};
