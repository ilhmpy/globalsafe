import moment from 'moment';
import 'moment/locale/ru';
import React, { FC, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { NavLink, Redirect, Route, Switch, useHistory } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';
import { Container } from '../../components/UI/Container';
import * as Styled from "./Styles.history";
import { Heading } from './components/Heading';
import * as FilterS from './components/Filter/S.el';
import { Filter } from "./components/Filter/index";
import { AppContext } from '../../context/HubContext';
import { Balance } from "../../types/balance";
import { Loading, NotItems } from "./components/Loading/Loading";

export const HistoryOperations = () => {
    const history = useHistory();
    const [activeFilter, setActiveFilter] = useState<'active' | 'archived' | 'hold'>('active');
    const months = ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"];
    const [buttons, setButtons] = useState<any[]>([
        { text: "Все типы", active: "active" }, { text: "Пополнение", active: "hold" }, { text: "Списание", active: "archived" }
    ]);
    const appContext = useContext(AppContext);
    const user = appContext.user;
    const balance = appContext.balance;
    const hubConnection = appContext.hubConnection;
    const balances = appContext.balanceList;
    const { t } = useTranslation();
    const [add, setAdd] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    const filter = [1, 2];
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
            return t('operation.failed');
        } else if (id === 4) {
            return t('operation.balance');
        } else if (id === 5) {
            return t('operation.partners');
        } else if (id === 9) {
            return "Регулировка балансировки"
        } else if (id === 10) {
            return "Приз"
        }
    };

    const [operations, setOperations] = useState<any[]>([]);

    /*    /// NA.
    Null,

    /// Top-up operation.
    TopUp,

    /// Withdraw operation.
    Withdraw,

    /// Balance rollback due to transaction failure.
    Rollback,

    /// Promo balance adjustment.
    Promo,

    /// Affiliate charges.
    AffiliateCharges,

    /// Open new user deposit.
    DepositOpen,

    /// Deposit charges.
    DepositPayments,

    /// Return deposit body on expiry.
    DepositClose,

    /// Balance operation adjustemnt.
    Adjustment,

    /// Balance prize adjustment.
    Prize,

    /// Network commission from the transaction amount
    TransactionNetworkFee,

    /// Service commission from the transaction amount
    TransactionServiceFee,

    /// Deposit loan.
    DepositLoan,

    /// Transfer between balances.
    BalanceExchange,

    /// Exchange deposit.
    DepositExchange, */

    function reqHistory() {
        if (hubConnection) {
          setLoading(true);
          console.log("WORK")
          hubConnection.invoke(
              "GetBalanceLog", 
              [1], 
              [], 
              new Date(2018, 5, 13, 10, 0, 0),
              new Date(), 
              0, 10
          )
            .then(res => {
              setLoading(false);
              console.log("rees", res, balances);
              let add: any[] = [];
              const addField = res.collection.map((item: any) => {
                if (balances) {
                    for (let i = 0; i < balances.length; i++) {
                        if (Number(item.balanceSafeId) == balances[i].id) {
                            add = [...add, {
                                balanceDelta: item.balanceDelta,
                                operationDate: item.operationDate,
                                operationKind: item.operationKind,
                                currency: Balance[balances[i].balanceKind]
                            }];
                        };
                    };
                };
              });
              setOperations(add);
     
            })
            .catch(err => {
                console.log(err);
                setLoading(false);
            });
      };
  }
  
  useEffect(() => {
     // reqHistory();
  }, []);

    function addMore() {
        if (hubConnection) {
            hubConnection.invoke(
                "GetBalanceLog", 
                [1], 
                getFilter(activeFilter), 
                new Date(2018, 5, 13, 10, 0, 0),
                new Date(), 
                operations.length + 1, 5
            )
              .then(res => {
                console.log("rees", res);
                let add: any[] = [];
                const addField = res.collection.map((item: any) => {
                    if (balances) {
                        for (let i = 0; i < balances.length; i++) {
                            if (Number(item.balanceSafeId) == balances[i].id) {
                                add = [...add, {
                                    balanceDelta: item.balanceDelta,
                                    operationDate: item.operationDate,
                                    operationKind: item.operationKind,
                                    currency: Balance[balances[i].balanceKind]
                                }];
                            };
                        };
                    };
                  });
                setOperations((data: any) => [...data, ...add]);
              })
              .catch(err => {
                  console.log(err);
              });
        };
    };

    function sign (x: number) {
        if (x >= 0) {
            return "+";
        } else {
            return "";
        };
    };

    const getFilter = (key: 'active' | 'archived' | 'hold') => {
        if(key === 'active') {
          return [];
        }
        if(key === 'archived') {
          return [2];
        }
        if(key === 'hold') {
          return [1];
        }
      }

    useEffect(() => {
        if (hubConnection) {
            setLoading(true);
            hubConnection.invoke(
                "GetBalanceLog", 
                [1], 
                getFilter(activeFilter), 
                new Date(2018, 5, 13, 10, 0, 0),
                new Date(), 
                0, 10
            )
              .then(res => {
                setLoading(false);
                console.log(res.collection, activeFilter);
                let add: any[] = [];
                const addField = res.collection.map((item: any) => {
                  if (balances) {
                      for (let i = 0; i < balances.length; i++) {
                          if (Number(item.balanceSafeId) == balances[i].id) {
                              add = [...add, {
                                  balanceDelta: item.balanceDelta,
                                  operationDate: item.operationDate,
                                  operationKind: item.operationKind,
                                  currency: Balance[balances[i].balanceKind]
                              }];
                          };
                      };
                  };
                });
                setOperations(add);
       
              })
              .catch(err => {
                console.log(err);
                setLoading(false);
              });
        };
    }, [activeFilter, hubConnection]);

    useEffect(() => {
        console.log(loading)
    }, [loading]);

    if (loading) {
        return (
            <Loading />
        )
    };

    return (
        <Container>
            <Heading title="История операций" withoutBtn />
            <Styled.FilterAllBlock>
                <Styled.FilterDivision>
                    <FilterS.Button active={true}>{months[moment().month()]} {new Date().getFullYear()}</FilterS.Button>
                </Styled.FilterDivision>
                <Styled.FilterDivision>
                    <FilterS.Button active={true}>Все валюты</FilterS.Button>
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
            <Styled.Table>
                <Styled.TableItem head>
                    <Styled.TableInnerItem head>Дата и время</Styled.TableInnerItem>
                    <Styled.TableInnerItem head>Категория</Styled.TableInnerItem>
                    <Styled.TableInnerItem head>Сумма</Styled.TableInnerItem>
                </Styled.TableItem>
                <Styled.TableMap>
                    {operations.map((item, idx) => (
                        <Styled.TableItem item key={idx}>
                            <Styled.TableInnerItem item>{moment(item.operationDate).format("DD.MM.YYYY")} в {moment(item.operationDate).format("HH:MM")}</Styled.TableInnerItem>
                            <Styled.TableInnerItem item>{operation(item.operationKind)}</Styled.TableInnerItem>
                            <Styled.TableInnerItem item income={item.balanceDelta >= 0}>
                                {sign(item.balanceDelta)} {(item.balanceDelta).toLocaleString("ru-RU", { maximumFractionDigits: 2 })} {item.currency}
                            </Styled.TableInnerItem>
                        </Styled.TableItem>
                    ))}
                </Styled.TableMap>
            </Styled.Table>
            <Styled.Button onClick={addMore}>Показать ещё</Styled.Button>
        </Container>
    )
}    