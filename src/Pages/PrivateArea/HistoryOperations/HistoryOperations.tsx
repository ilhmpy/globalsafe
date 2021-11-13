import moment from 'moment';
import 'moment/locale/ru';
import { FC, useContext, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Container } from '../../../components/UI/Container';
import { AppContext } from '../../../context/HubContext';
import useWindowSize from '../../../hooks/useWindowSize';
import { Balance } from '../../../types/balance';
import { ViewExchangeModel } from '../../../types/exchange';
import { Filter } from '../components/Filter/index';
import * as FilterS from '../components/Filter/S.el';
import { Heading } from '../components/Heading';
import { Loading, NotItems, Spinner } from '../components/Loading/Loading';
import { FilterButton } from '../components/ui';
import * as S from '../Exchanges/S.el';
import * as Styled from '../Styles.history';
import { countVolumeToShow } from '../utils';
import { MobileFiltersModal } from './MobileFiltersModal';

export const HistoryOperations: FC = () => {
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
  const screen = useWindowSize();
  const [buttons] = useState<{ text: string; active: string }[]>([
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
  const [showMobileFilters, setShowMobileFilters] = useState(false);

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
          const collection = getFirstElements(sortCollection, screen > 768 ? 10 : 5);
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

  const paymentMethodsKinds = useMemo<{ label: string }[]>(
    () => [
      { label: `${months[moment().month()]} ${new Date().getFullYear()}` },
      { label: 'Все валюты' },
    ],
    []
  );

  return (
    <>
      <Container mbNone>
        <MobileFiltersModal
          open={showMobileFilters}
          onClose={() => setShowMobileFilters(false)}
          methodsList={paymentMethodsKinds}
          setNowMonth={setNowMonth}
          nowMonth={nowMonth}
          setAllCurrency={setAllCurrency}
          allCurrency={allCurrency}
        />
        <Heading title="История операций" withoutBtn />
        <Styled.FilterAllBlock mbNone>
          {screen > 768 ? (
            <>
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
            </>
          ) : (
            <S.Filters hidden smVisible>
              <FilterButton
                noMargin
                wFull
                switchLeft
                active={false}
                onClick={() => setShowMobileFilters(true)}
              >
                {`Фильтры (${paymentMethodsKinds.length})`}
              </FilterButton>
            </S.Filters>
          )}

          <Filter
            activeFilter={activeFilter}
            setActiveFilter={setActiveFilter}
            withoutViewType
            withCustomButtons
            withoutContainer
            buttons={buttons}
            btnsFullWidth
            fullWidth
          />
        </Styled.FilterAllBlock>
      </Container>
      <Container pTabletNone>
        {screen > 768 ? (
          <Styled.Table none={not}>
            <Styled.TableItem head>
              <Styled.TableInnerItem head mrLarger>
                Дата и время
              </Styled.TableInnerItem>
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
                            <Styled.TableInnerItem item mrLarger>
                              {moment(item.operationDate).format('DD.MM.YYYY')} в{' '}
                              {getLocaleTime(item.operationDate)}
                            </Styled.TableInnerItem>
                            <Styled.TableInnerItem item mrLarger>
                              {operation(item.operationKind, item.referenceSafeId)}
                            </Styled.TableInnerItem>
                            <Styled.TableInnerItem item mrLarger income={item.balanceDelta > 0}>
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
        ) : operations ? (
          !emptyItems ? (
            <Styled.MobWrapper>
              {operations &&
                operations.map((item: any, idx) => (
                  <>
                    <Styled.MobTab key={idx}>
                      <Styled.TabRow green={item.balanceDelta > 0}>
                        <span>
                          {moment(item.operationDate).format('DD.MM.YYYY')} в{' '}
                          {getLocaleTime(item.operationDate)}
                        </span>
                        <span>
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
                        </span>
                      </Styled.TabRow>
                      <Styled.TabRow>
                        <span>{operation(item.operationKind, item.referenceSafeId)}</span>
                      </Styled.TabRow>
                    </Styled.MobTab>
                  </>
                ))}
            </Styled.MobWrapper>
          ) : (
            <NotItems text="Операции отсутствуют" />
          )
        ) : (
          <Loading />
        )}
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
