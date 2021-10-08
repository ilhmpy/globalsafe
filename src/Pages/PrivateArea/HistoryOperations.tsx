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
import { Loading, NotItems, Spinner } from "./components/Loading/Loading";
import formatRelativeWithOptions from 'date-fns/esm/fp/formatRelativeWithOptions/index.js';
import { isObject } from 'highcharts';
import { isTemplateSpan } from 'typescript';

export const HistoryOperations = () => {
    const history = useHistory();
    const [activeFilter, setActiveFilter] = useState<'active' | 'archived' | 'hold'>('active');
    const months = ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"];
    const [buttons, setButtons] = useState<any[]>([
        { text: "Все типы", active: "active" }, 
        { text: "Пополнение", active: "hold" }, 
        { text: "Списание", active: "archived" }
    ]);
    const appContext = useContext(AppContext);
    const user = appContext.user;
    const balance = appContext.balance;
    const hubConnection = appContext.hubConnection;
    const balances = appContext.balanceList;
    const { t } = useTranslation();
    const [loading, setLoading] = useState<boolean>(false);
    const [allCurrency, setAllCurrency] = useState<boolean>(true);
    const [nowMonth, setNowMonth] = useState<boolean>(true);
    const [not, setNot] = useState<boolean>(false);
    const [newItems, setNewItems] = useState<boolean>(true);
    const [emptyItems, setEmptyItems] = useState<boolean>(false);

    const filter = [1, 2];

    const operation = (id: number) => {
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
            return "Регулировка балансировки"
        } else if (id === 10) {
            return "Приз"
        } else if (id === 11) {
            return "Комиссия сети от суммы транзакции";
        } else if (id === 12) {
            return "Комиссия сервиса от суммы транзакции";
        } else if (id === 13) {
            return "Депозитный заем.";
        } else if (id === 14) {
            return "Перевод между балансами.";
        } else if (id === 15) {
            return "Обменный депозит.";
        };
    };

    const [operations, setOperations] = useState<any[] | null>(null);
    const [statusNew, setStatusNew] = useState<any>();

    /*    /// NA.
    Null,

    /// Top-up operation.
    TopUp, 1
 
    /// Withdraw operation.
    Withdraw, 2

    /// Balance rollback due to transaction failure.
    Rollback, 3

    /// Promo balance adjustment.
    Promo, 4

    /// Affiliate charges.
    AffiliateCharges, 5 

    /// Open new user deposit.
    DepositOpen, 6

    /// Deposit charges.
    DepositPayments, 7

    /// Return deposit body on expiry.
    DepositClose, 8

    /// Balance operation adjustemnt.
    Adjustment, 9

    /// Balance prize adjustment.
    Prize, 10

    /// Network commission from the transaction amount
    TransactionNetworkFee, 11

    /// Service commission from the transaction amount
    TransactionServiceFee, 12

    /// Deposit loan.
    DepositLoan, 13

    /// Transfer between balances.
    BalanceExchange, 14

    /// Exchange deposit.
    DepositExchange, 15
    */ 

    useEffect(() => {
        if (hubConnection) {
            setNewItems(true);
            const date = new Date();
            setLoading(true);
            hubConnection.invoke(
                "GetBalanceLog", 
                [1], 
                getFilter(activeFilter), 
                nowMonth ? new Date(date.getFullYear(), date.getMonth(), 1, 0, 0) : new Date(2013, 5, 13, 10, 0, 0),
                new Date(), 
                0, 10
            )
              .then(res => {
                setLoading(false);
                console.log("res", res.collection);
                if (allCurrency) {
                   setOperations(items => res.collection.map((i: any) => {
                       return {
                         ...i,
                         new: false
                       };
                   }));
                } else {
                    if (balances) {
                        setOperations(res.collection.map((i: any) => {
                            if (Number(i.balanceSafeId) === balances[1].id) {
                                return {
                                    ...i,
                                    new: false
                                };
                            };
                        }));
                    };
                };
                if (res.collection.length > 0) {
                    setEmptyItems(false);
                } else {
                    setEmptyItems(true);
                };
              })
              .catch(err => {
                console.log(err);
                setLoading(false);
              });
        };
    }, [activeFilter, hubConnection, nowMonth, allCurrency]);

    function changeNew() {
        setOperations(items => items && items.map((i: any) => {
            return {
                ...i,
                new: false 
            };
        }))
    }

    function addMore() {
        if (hubConnection) {
            const date = new Date();
            hubConnection.invoke(
                "GetBalanceLog", 
                [1], 
                getFilter(activeFilter), 
                nowMonth ? new Date(date.getFullYear(), date.getMonth(), 1, 0, 0) : new Date(2013, 5, 13, 10, 0, 0),
                new Date(), 
                operations && operations.length + 1, 5
            )
              .then(res => {
                console.log("rees", res);
                changeNew();
                if (allCurrency) {
                    setOperations((data: any) => [...data.map((i: any) => {
                        return { ...i, new: false }
                    }), ...res.collection.map((i: any) => {
                        return { ...i, new: true }
                    })]);
                } else {
                    if (balances) {
                        setOperations((data: any) => [...data.map((i: any) => {
                            return { ...i, new: false }
                        }), ...res.collection.map((i: any) => {
                            if (Number(i.balanceSafeId) === balances[1].id) {
                                return { ...i, new: true }
                            }
                        })]);
                    };
                };
                setStatusNew(setTimeout(() => changeNew(), 1000));
                if (res.collection.length > 0) {
                    setNewItems(true);
                } else {
                    setNewItems(false);
                }
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

    function getCurrency(id: number) {
        if (balances) {
            for (let i = 0; i < balances.length; i++) {
                if (Number(id) == balances[i].id) {
                    return Balance[balances[i].balanceKind];
                };
            };
        };
    };

    return (
        <Container>
            <Heading title="История операций" withoutBtn />
            <Styled.FilterAllBlock>
                <Styled.FilterDivision>
                    <FilterS.Button active={nowMonth} onClick={() => setNowMonth(!nowMonth)}>{months[moment().month()]} {new Date().getFullYear()}</FilterS.Button>
                </Styled.FilterDivision>
                <Styled.FilterDivision>
                    <FilterS.Button active={allCurrency} onClick={() => setAllCurrency(!allCurrency)}>Все валюты</FilterS.Button>
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
                                    {operations && operations.map((item, idx) => (
                                        <Styled.TableItem item key={idx} newItem={item.new}>
                                            <Styled.TableInnerItem item>{moment(item.operationDate).format("DD.MM.YYYY")} в {moment(item.operationDate).format("HH:MM")}</Styled.TableInnerItem>
                                            <Styled.TableInnerItem item>{operation(item.operationKind)}</Styled.TableInnerItem>
                                            <Styled.TableInnerItem item income={item.balanceDelta > 0}>
                                                {item.balanceDelta > 0 && (<>{sign(item.balanceDelta)} </>)} {(item.balanceDelta).toLocaleString("ru-RU", { maximumFractionDigits: 2 })} {item.balanceSafeId && getCurrency(item.balanceSafeId)}
                                            </Styled.TableInnerItem>
                                        </Styled.TableItem>
                                    ))}
                                </Styled.TableMap>
                            </>
                        ) : (
                            <NotItems text="Нету операций." />
                        )}
                    </>
                ) : ( <Loading /> )}
            </Styled.Table>
          <Styled.Button onClick={addMore} newItems={operations && operations.length > 0 ? newItems : false}>
                {operations && operations[operations.length - 1] && operations[operations.length - 1].new ? 
                    <Spinner style={{ width: 25, height: 25, borderTop: "2px solid #fff", margin: "0 auto" }} /> 
                    : "Показать ещё"}
          </Styled.Button>
        </Container>
    )
}    