import moment from 'moment';
import 'moment/locale/ru';
import React, { FC, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { NavLink, Redirect, Route, Switch, useHistory } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';
import { Container } from '../../../components/UI/Container';
import * as Styled from '../Styles.history';
import { Heading } from '../components/Heading';
import * as FilterS from '../components/Filter/S.el';
import { Filter } from '../components/Filter/index';
import { AppContext } from '../../../context/HubContext';
import { Balance } from '../../../types/balance';
import { Loading, NotItems, Spinner } from '../components/Loading/Loading';
import formatRelativeWithOptions from 'date-fns/esm/fp/formatRelativeWithOptions/index.js';
import { isObject } from 'highcharts';
import { InternalSymbolName, isTemplateSpan } from 'typescript';
import { countVolumeToShow } from '../utils';
import { ViewExchangeModel } from '../../../types/exchange';
import { endOfYesterday, isFirstDayOfMonth } from 'date-fns/esm';
import { PaymentMethods } from "../Exchanges/components/modals/PaymentMethods";
import { FilterButton } from '../components/ui';
import { RageOfDatesModal } from "./RageOfDatesModal";

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
  const balances = appContext.balanceList;
  const { account, hubConnection } = appContext;
  const { t } = useTranslation();
  const [loading, setLoading] = useState<boolean>(false);
  const [allCurrency, setAllCurrency] = useState<boolean>(true);
  const [nowMonth, setNowMonth] = useState<boolean>(true);
  const [not, setNot] = useState<boolean>(false);
  const [newItems, setNewItems] = useState<boolean>(true);
  const [emptyItems, setEmptyItems] = useState<boolean>(false);
  const [allState, setAllState] = useState<ViewExchangeModel[]>([]);
  const [currenciesModal, setCurrenciesModal] = useState<boolean>(false);
  const [start, setStart] = useState<Date | undefined>();
  const [end, setEnd] = useState<Date | undefined>();
  const [operations, setOperations] = useState<any[] | null>(null);
  const [statusNew, setStatusNew] = useState<any>();
  const [totalRecords, setTotalRecords] = useState<number | null>(null);
  const [selectedCurrencies, setSelectedCurrencies] = useState<number[]>([]);
  const [currencies, setCurrencies] = useState<number[]>([]);
  const [rageOfDatesModalShow, setRageOfDatesModalShow] = useState<boolean>(false);

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
          [],
          start ? start : new Date(2013, 1, 1),
          end ? end : new Date(),
          0,
          100
        )
        .then((res) => {
          console.log('res', res);
          setLoading(false);
          setTotalRecords(res.totalRecords);
          
          const sortCollection = res.collection.sort((x: any, y: any) => {
            const a = new Date(x.operationDate);
            const b = new Date(y.operationDate);
            return a > b ? -1 : a < b ? 1 : 0;
          });
          
          let collection;
          let filterCollection = sortCollection;
          
          if (activeFilter === "active") {
            collection = getFirstElements(sortCollection, 10);
          } else if (activeFilter === "hold") {
            filterCollection = sortCollection.filter((i: any) => i.balanceDelta > 0);
            collection = getFirstElements(filterCollection, 10);
          } else {
            filterCollection = sortCollection.filter((i: any) => i.balanceDelta < 0);
            collection = getFirstElements(filterCollection, 10);
          };
          
          if (selectedCurrencies.length > 0) {
            filterCollection = filterCollection.filter((f: any) => {
              for (let i = 0; i < selectedCurrencies.length; i++) {
                if (Number(f.balanceSafeId) === selectedCurrencies[i]) {
                  return f;
                };
              };
            });
            collection = getFirstElements(filterCollection, 10);
          };
          
          setAllState(filterCollection);
          setOperations(collection);
          setEmptyItems(!(collection.length > 0));
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
    }
  }

  useEffect(() => {
    getBalanceLog();
  }, [activeFilter, hubConnection, start, end, currencies, totalRecords]);

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

  const balanceList = balances?.map((i) => ({
    methodName: Balance[i.balanceKind],
    kind: i.id
  }));

  function getLocaleTime(date: Date) {
    const utc = moment.utc(date);
    const local = utc.local();
    return local.format('HH:MM');
  }

  function handleAccept() {
    setCurrenciesModal(false);
    setCurrencies(selectedCurrencies);
  };

  function handleClose() {
    setCurrenciesModal(false);
  };

  function resetFilters() {
    handleClose();
    setCurrencies([]);
    setSelectedCurrencies([]);
    setStart(undefined);
    setEnd(undefined);
    setActiveFilter("active");
  };

  return (
    <>
      <Container>
        <Heading title="История операций" withoutBtn />
        <Styled.FilterAllBlock style={{ position: "relative" }}>
          <Styled.FilterDivision>
            <FilterS.Button active={nowMonth} onClick={() => setRageOfDatesModalShow(true)}>
              {end ? `${months[moment(end).month()]} ${moment(end).year()}` : `${months[moment().month()]} ${new Date().getFullYear()}`}
            </FilterS.Button>
          </Styled.FilterDivision>
          <Styled.FilterDivision>
            <FilterS.Button active={currenciesModal} onClick={() => setCurrenciesModal(true)}>
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
          {currencies.length > 0 || (start != undefined || end != undefined) && (
            <FilterButton 
              style={{ position: 'absolute', right: '0px' }}
              onClick={resetFilters}
            >
              Очистить фильтр
            </FilterButton>
          )}
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
      {balanceList && (
        <PaymentMethods 
          text="Выбор валют"
          selectedPaymentMethods={selectedCurrencies}
          setSelectedPaymentMethods={setSelectedCurrencies}
          methodsList={balanceList}
          onAccept={handleAccept}
          onClose={handleClose}
          open={currenciesModal}
          objectsArray
        />
      )}
      <RageOfDatesModal 
        open={rageOfDatesModalShow} 
        setStart={setStart}
        setEnd={setEnd}
        onClose={() => setRageOfDatesModalShow(false)} 
      />
    </>
  );
};
