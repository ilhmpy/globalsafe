﻿import moment from 'moment';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { Scrollbars } from 'react-custom-scrollbars';
import { useTranslation } from 'react-i18next';
import { CSSTransition } from 'react-transition-group';
import styled from 'styled-components/macro';
import burgerGroup from '../../assets/img/burgerGroup.png';
import { ReactComponent as Exit } from '../../assets/svg/exit.svg';
import { Button } from '../../components/Button/Button';
import { Select } from '../../components/Select/Select2';
import { TestInput } from '../../components/UI/DayPicker';
import { Loading } from '../../components/UI/Loading';
import { Content, Tab } from '../../components/UI/Tabs';
import { UpTitle } from '../../components/UI/UpTitle';
import { AppContext } from '../../context/HubContext';
import { LangualeContext } from '../../context/LangualeContext';
import { ThemeContext } from '../../context/ThemeContext';
import { Card } from '../../globalStyles';
import useOnClickOutside from '../../hooks/useOutsideHook';
import useWindowSize from '../../hooks/useWindowSize';
import { OpenDate } from '../../types/dates';
import { CollectionListDeposits, ListDeposits } from '../../types/deposits';
import {
  CollectionCharges,
  PaymentsCollection,
  RootCharges,
  RootPayments,
} from '../../types/payments';
import { SelectValues, SortingType } from '../../types/sorting';
import { PaymentsList, PaymentsListPay } from './AdminPay/DepositList';
import { Analitics } from './AdminPayments/components/Analitics/Analitics';
import { Approval } from './AdminPayments/components/Approval/Approval';
import { Chart } from './AdminPayments/components/Chart/Chart';
import { Delayed } from './AdminPayments/components/Delayed';
import { Pagination } from './Pagination';
import * as Styled from './Styled.elements';
import {
  BurgerButton,
  BurgerImg,
  SortingItem,
  SortingWindow,
  WindowBody,
  WindowTitle,
} from './Styled.elements';

export const AdminPay = () => {
  const [active, setActive] = useState(0);
  const sizes = useWindowSize();
  const [sum, setSum] = useState<number[] | null>(null);

  const appContext = useContext(AppContext);
  const themeContext = useContext(ThemeContext);
  const theme = themeContext.theme;
  const hubConnection = appContext.hubConnection;
  const logOut = appContext.logOut;
  const user = appContext.user;

  const [totalDeposits, setTotalDeposits] = useState(0);

  const [totalPayDeposits, setTotalPayDeposits] = useState(0);

  const [depositPayList, setDepositPayList] = useState<any>([]);
  const [paymentsList, setPaymentsList] = useState<any>([]);
  const [totalPayments, setTotalPayments] = useState(0);

  const [next, setNext] = useState(true);
  const [procent, setProcent] = useState('');

  const [loading, setLoading] = useState(true);
  const [openDate, setOpenDate] = useState<OpenDate>({
    from: undefined,
    to: undefined,
  });

  const [openFilter, setOpenFilter] = useState(false);
  const [checkList, setCheckList] = useState<any>([]);
  const [checkListApproval, setCheckListApproval] = useState<any>([]);
  const [name, setName] = useState('');
  const [pageLength, setPageLength] = useState<number>(10);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageLengthPay, setPageLengthPay] = useState<number>(10);
  const [currentPagePay, setCurrentPagePay] = useState<number>(1);
  const [pageLengthDeposit, setPageLengthDeposit] = useState<number>(10);
  const [currentPageDeposit, setCurrentPageDeposit] = useState<number>(1);

  const [listDeposits, setListDeposits] = useState<CollectionListDeposits[]>([]);
  const backDay: any = moment().add(90, 'days').format();
  const [depositsDate, setDepositsDate] = useState<OpenDate>({
    from: new Date(),
    to: backDay,
  });
  const [stats, setStats] = useState<any[]>([]);
  const { lang } = useContext(LangualeContext);
  const { t } = useTranslation();

  const sortings = [
    t('userSort'),
    t('userSort2'),
    t('nameSort'),
    t('nameSort2'),
    t('descendDatePay'),
    t('ascendDatePay'),
    t('descendSumСontribution'),
    t('ascendSumContribution'),
  ];

  const getPaymentsOverview = () => {
    if (hubConnection) {
      hubConnection
        .invoke('GetPaymentsOverview')
        .then((res) => {
          setSum(res);
        })
        .catch((err: Error) => console.log(err));
    }
  };

  useEffect(() => {
    if (hubConnection) {
      hubConnection
        .invoke<ListDeposits>('GetAllPublicDeposits', null, false, 0, 100, [])
        .then((res) => {
          setListDeposits(res.collection);
        })
        .catch((err: Error) => console.log(err));
    }
  }, [hubConnection]);

  const [sortingWindowOpen, setSortingWindowOpen] = useState(false);
  const [sorting, setSorting] = useState<SortingType[]>([]);

  const [listForSorting, setListForSorting] = useState<SelectValues[]>([
    {
      id: 0,
      active: false,
      OrderType: 1,
      FieldName: 'userId',
    },
    {
      id: 1,
      active: false,
      OrderType: 2,
      FieldName: 'userId',
    },
    {
      id: 2,
      active: false,
      OrderType: 2,
      FieldName: 'DepositId',
    },
    {
      id: 3,
      active: false,
      OrderType: 1,
      FieldName: 'DepositId',
    },
    {
      id: 4,
      active: false,
      OrderType: 2,
      FieldName: 'creationDate',
    },
    {
      id: 5,
      active: false,
      OrderType: 1,
      FieldName: 'creationDate',
    },
    {
      id: 6,
      active: false,
      OrderType: 2,
      FieldName: 'baseAmount',
    },
    {
      id: 7,
      active: false,
      OrderType: 1,
      FieldName: 'baseAmount',
    },
  ]);

  const [sortingWindowOpenForPay, setSortingWindowOpenForPay] = useState(false);
  const sortingWindowRefForPay = useRef<HTMLDivElement | null>(null);

  useOnClickOutside(sortingWindowRefForPay, () => setSortingWindowOpenForPay(false));

  const [sortingForPay, setSortingForPay] = useState<SortingType[]>([]);

  const [listForSortingForPay, setListForSortingForPay] = useState<SelectValues[]>([
    {
      id: 0,
      active: false,
      OrderType: 1,
      FieldName: 'userId',
    },
    {
      id: 1,
      active: false,
      OrderType: 2,
      FieldName: 'userId',
    },
    {
      id: 2,
      active: false,
      OrderType: 2,
      FieldName: 'DepositId',
    },
    {
      id: 3,
      active: false,
      OrderType: 1,
      FieldName: 'DepositId',
    },
    {
      id: 4,
      active: false,
      OrderType: 2,
      FieldName: 'creationDate',
    },
    {
      id: 5,
      active: false,
      OrderType: 1,
      FieldName: 'creationDate',
    },
    {
      id: 6,
      active: false,
      OrderType: 2,
      FieldName: 'baseAmount',
    },
    {
      id: 7,
      active: false,
      OrderType: 1,
      FieldName: 'baseAmount',
    },
  ]);

  const namesProgram = checkList.map((i: any) => i.safeId);
  const idProgram = listDeposits.filter((i) => namesProgram.includes(i.safeId));
  const searchSafeID = idProgram.map((i) => i.safeId);
  const backDays: any = moment().subtract(30, 'days');
  const [usersListVisible, setUsersListVisible] = useState(true);

  const namesProgramApproval = checkListApproval.map((i: any) => i.safeId);
  const idProgramApproval = listDeposits.filter((i) => namesProgramApproval.includes(i.safeId));
  const searchSafeIDApproval = idProgramApproval.map((i) => i.safeId);
  const depositState = checkList.length ? checkList.map((i: any) => i.id) : [5, 6];

  const handleClick = (id: number) => {
    if (id !== active) {
      setActive(id);
    }
  };

  useEffect(() => {
    if (hubConnection && active === 2) {
      console.log(sortingForPay);

      setLoading(true);
      setPaymentsList([]);
      hubConnection
        .invoke<RootPayments>(
          'GetUsersDeposits',
          [5],
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          (currentPage - 1) * pageLength,
          pageLength,
          sortingForPay
        )
        .then((res) => {
          console.log(res);
          setTotalPayments(res.totalRecords);
          setPaymentsList(res.collection);
        })
        .catch((err: Error) => {
          setLoading(false);
          console.log(err);
        });
    }
  }, [hubConnection, active, currentPage, pageLength, sortingForPay]);

  useEffect(() => {
    if (hubConnection && active === 1) {
      setLoading(true);
      setDepositPayList([]);

      // GetDepositsCharges Model
      // Task<CollectionResult> GetDepositsCharges(
      //   string? userName,
      //   DateTime? from,
      //   DateTime? to,
      //   string[]? usersDepositsSafeIds,
      //   string[]? depositsSafeIds,
      //   BalanceOperationKind[] kinds,
      //   long skip,
      //   long take);

      // const modifiedSorting: SortingType[] = [];
      // if(openDate.from || openDate.to) {
      //     modifiedSorting.push({
      //       ConditionWeight: 1,
      //       OrderType: 1,
      //       FieldName: 'paymentDate',
      //     })
      // };
      hubConnection
        .invoke<RootCharges>(
          'GetDepositsCharges',
          name ? name.toLowerCase() : null,
          openDate.from
            ? moment(openDate.from)
                .utcOffset('+00:00')
                .set({ hour: 0, minute: 0, second: 0 })
                .toDate()
            : null,
          openDate.to
            ? moment(openDate.to)
                .utcOffset('+00:00')
                .set({ hour: 23, minute: 59, second: 59 })
                .toDate()
            : null,
          null,
          searchSafeID.length ? searchSafeID : null,
          [7, 8],
          (currentPagePay - 1) * pageLengthPay,
          pageLengthPay
        )
        .then((res) => {
          setTotalPayDeposits(res.totalRecords);
          if (res.collection.length) {
            setDepositPayList(res.collection);
          }
          setLoading(false);
        })
        .catch((err: Error) => {
          setLoading(false);
          console.log(err);
        });
    }
  }, [hubConnection, active, currentPagePay, pageLengthPay]);

  useEffect(() => {
    getPaymentsOverview();
  }, [hubConnection]);

  // console.log(
  //   openDate.from
  //     ? moment(openDate.from).utcOffset('+00:00').set({ hour: 0, minute: 0, second: 0 }).toDate()
  //     : null,
  //   openDate.to
  //     ? moment(openDate.to).utcOffset('+00:00').set({ hour: 23, minute: 59, second: 59 }).toDate()
  //     : openDate.from
  //     ? moment(openDate.from).utcOffset('+00:00').set({ hour: 23, minute: 59, second: 59 }).toDate()
  //     : null
  // );

  const submit = () => {
    console.log({
      NAME: name,
      openDate,
      searchSafeID,
    });
    console.log(
      openDate.from
        ? moment(openDate.from).utcOffset('+00:00').set({ hour: 0, minute: 0, second: 0 }).toDate()
        : null,
      openDate.to
        ? moment(openDate.to).utcOffset('+00:00').set({ hour: 23, minute: 59, second: 59 }).toDate()
        : openDate.from
        ? moment(openDate.from)
            .utcOffset('+00:00')
            .set({ hour: 23, minute: 59, second: 59 })
            .toDate()
        : null
    );
    if (hubConnection) {
      setLoading(true);
      setCurrentPagePay(1);
      setDepositPayList([]);
      // const modifiedSorting: SortingType[] = [];
      // if(openDate.from || openDate.to) {
      //     modifiedSorting.push({
      //       ConditionWeight: 1,
      //       OrderType: 1,
      //       FieldName: 'paymentDate',
      //     })
      // };

      hubConnection
        .invoke<RootCharges>(
          'GetDepositsCharges',
          name ? name.toLowerCase() : null,
          openDate.from
            ? moment(openDate.from)
                .utcOffset('+00:00')
                .set({ hour: 0, minute: 0, second: 0 })
                .toDate()
            : null,
          openDate.to
            ? moment(openDate.to)
                .utcOffset('+00:00')
                .set({ hour: 23, minute: 59, second: 59 })
                .toDate()
            : null,
          null,
          searchSafeID.length ? searchSafeID : null,
          [7, 8],
          (currentPagePay - 1) * pageLengthPay,
          pageLengthPay
        )
        .then((res) => {
          setLoading(false);
          if (res.collection.length) {
            setTotalPayDeposits(res.totalRecords);
            setDepositPayList(res.collection);
          }
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
          'GetPayoutsEstimateStats',
          depositsDate.from ? depositsDate.from : new Date(),
          depositsDate.to ? depositsDate.to : backDay
        )
        .then((res) => {
          setStats(res);
        })
        .catch((e) => console.log(e));
    }
  }, [depositsDate, hubConnection, lang]);

  const getActiveSort = (index: number) => {
    setSorting([
      {
        ConditionWeight: 1,
        OrderType: listForSorting[index].OrderType,
        FieldName: listForSorting[index].FieldName,
      },
    ]);

    setListForSorting((prev) => {
      return prev.map((one, i) => {
        if (one.active === true && index === i) {
          setSorting([]);
          return {
            ...one,
            active: false,
          };
        } else if (index === i) {
          return {
            ...one,
            active: true,
          };
        } else {
          return {
            ...one,
            active: false,
          };
        }
      });
    });
  };

  const getActiveSortForPay = (index: number) => {
    setSortingForPay([
      {
        ConditionWeight: 1,
        OrderType: listForSortingForPay[index].OrderType,
        FieldName: listForSortingForPay[index].FieldName,
      },
    ]);

    setListForSortingForPay((prev) => {
      return prev.map((one, i) => {
        if (one.active === true && index === i) {
          setSortingForPay([]);
          return {
            ...one,
            active: false,
          };
        } else if (index === i) {
          return {
            ...one,
            active: true,
          };
        } else {
          return {
            ...one,
            active: false,
          };
        }
      });
    });
  };

  const [dateOfCreateDepositVisible, setDateOfCreateDepositVisible] = useState(true);
  const [depositVisible, setDepositVisible] = useState(true);

  return (
    <>
      <Styled.HeadBlock>
        <SelfUpTitle small>{t('adminPay.uptitle')}</SelfUpTitle>
        <Styled.UserName>
          <span>{user}</span>
          <Exit onClick={logOut} />
        </Styled.UserName>
      </Styled.HeadBlock>
      {active === 4 && (
        <Chart depositsDate={depositsDate} setDepositsDate={setDepositsDate} stats={stats} />
      )}
      {active !== 4 && (
        <Card>
          <Styled.PayList>
            <Styled.PayItem>
              <Styled.PayItemHead mb>
                <SelfUpTitle small>{t('adminPay.title1')}</SelfUpTitle>
              </Styled.PayItemHead>
              <Styled.Radial
                bg={theme === 'light' ? 'rgba(255, 65, 110, 0.2)' : 'rgba(255, 65, 110, 1)'}
              >
                <span>
                  {sum
                    ? (sum[2] / 100000).toLocaleString('ru-RU', {
                        maximumFractionDigits: 1,
                      })
                    : '-'}
                </span>
                <span>CWD</span>
              </Styled.Radial>
            </Styled.PayItem>
            <Styled.PayItem>
              <Styled.PayItemHead mb>
                <SelfUpTitle small>{t('adminPay.title2')}</SelfUpTitle>
              </Styled.PayItemHead>

              <Styled.Radial
                bg={theme === 'light' ? 'rgba(188, 212, 118, 0.2)' : 'rgba(188, 212, 118, 1)'}
              >
                <span>
                  {sum
                    ? (sum[0] / 100000).toLocaleString('ru-RU', {
                        maximumFractionDigits: 0,
                      })
                    : '-'}
                </span>
                <span>CWD</span>
              </Styled.Radial>
            </Styled.PayItem>
            <Styled.PayItem>
              <Styled.PayItemHead mb>
                <SelfUpTitle small>{t('adminPay.title3')}</SelfUpTitle>
              </Styled.PayItemHead>
              <Styled.Radial
                bg={theme === 'light' ? 'rgba(109, 185, 255, 0.2)' : 'rgba(109, 185, 255, 1)'}
              >
                <span>
                  {sum
                    ? (sum[1] / 100000).toLocaleString('ru-RU', {
                        maximumFractionDigits: 0,
                      })
                    : '-'}
                </span>
                <span>CWD</span>
              </Styled.Radial>
            </Styled.PayItem>
            <Styled.PayItem></Styled.PayItem>
          </Styled.PayList>
        </Card>
      )}
      <Card>
        <Tabs>
          <PayTab onClick={() => handleClick(0)} active={active === 0}>
            {t('adminPay.title3')}
          </PayTab>
          <Tab onClick={() => handleClick(1)} active={active === 1}>
            {t('adminPay.title2')}
          </Tab>
          <Tab onClick={() => handleClick(2)} active={active === 2}>
            {t('adminPay.title1')}
          </Tab>
          <Tab onClick={() => handleClick(3)} active={active === 3}>
            {t('adminPay.delayed.title')}
          </Tab>
          <Tab onClick={() => handleClick(4)} active={active === 4}>
            {t('adminPay.analitics.analitic')}
          </Tab>
        </Tabs>
      </Card>

      <Content active={active === 0}>
        <Approval
          getPaymentsOverview={getPaymentsOverview}
          listDeposits={listDeposits}
          setProcent={setProcent}
          procent={procent}
          setPaymentsList={setPaymentsList}
          setTotalPayments={setTotalPayments}
        />
      </Content>

      <Content active={active === 1}>
        <Styled.FilterBlock>
          <Styled.FilterHeader>
            <Styled.FilterName>{t('adminDeposit.filter')}</Styled.FilterName>
            <Styled.ShowHide onClick={() => setOpenFilter(!openFilter)}>
              {openFilter ? t('hide') : t('show')}
            </Styled.ShowHide>
          </Styled.FilterHeader>
          <CSSTransition in={openFilter} timeout={200} classNames="filter" unmountOnExit>
            <Styled.SelectContainer>
              <Styled.SelectContainerInnerPaid>
                <Styled.SelectWrap style={{ minWidth: 263 }}>
                  <Styled.Label>{t('adminPay.filter.user')}</Styled.Label>
                  <Styled.Input
                    value={name}
                    onChange={(e) => setName(e.target.value.toLowerCase())}
                  />
                </Styled.SelectWrap>
                <Styled.SelectWrap>
                  <TestInput
                    setOpenDate={setOpenDate}
                    openDate={openDate}
                    label={t('adminPay.table.datePay')}
                  />
                </Styled.SelectWrap>
                <Styled.SelectWrap style={{ minWidth: 263 }}>
                  <Styled.Label>{t('adminPay.filter.deposit')}</Styled.Label>
                  <Select checkList={checkList} setCheckList={setCheckList} values={listDeposits} />
                </Styled.SelectWrap>
              </Styled.SelectContainerInnerPaid>
              <Button danger onClick={submit}>
                {t('adminUsers.apply')}
              </Button>
            </Styled.SelectContainer>
          </CSSTransition>
        </Styled.FilterBlock>
        <Card>
          <PaymentsTable>
            <TableHead>
              <TableHeadItemPaid>{t('adminPay.table.user')}</TableHeadItemPaid>
              <TableHeadItemPaid>{t('adminPay.table.name')}</TableHeadItemPaid>
              <TableHeadItemPaid>{t('adminPay.table.datePay')}</TableHeadItemPaid>
              <TableHeadItemPaid>{t('adminPay.table.category')}</TableHeadItemPaid>
              <TableHeadItemPaid>{t('adminPay.table.contribution')}</TableHeadItemPaid>
              <TableHeadItemPaid>{t('adminPay.table.payments')}</TableHeadItemPaid>
              <TableHeadItemPaid>{/* <Filter /> */}</TableHeadItemPaid>
              {/*
              <TableHeadItemPaid>
                 <BurgerButton>
                  <BurgerImg
                    src={burgerGroup}
                    alt="burger"
                    onClick={() => setSortingWindowOpen((prev) => !prev)}
                  />
                </BurgerButton>
              </TableHeadItemPaid>
              <Window ref={sortingWindowRef} open={sortingWindowOpen}>
                <WindowTitle>Сортировка</WindowTitle>
                <WindowBody>
                  {listForSorting.map((obj, index) => (
                    <SortingItem
                      active={listForSorting[index].active}
                      key={index}
                      onClick={() => getActiveSort(index)}>
                      {obj.text}
                    </SortingItem>
                  ))}
                </WindowBody>
              </Window> */}
            </TableHead>
            {depositPayList.length ? (
              <Scrollbars style={{ height: '500px' }}>
                {depositPayList.map((item: CollectionCharges) => (
                  <PaymentsListPay key={item.safeId} data={item} />
                ))}
              </Scrollbars>
            ) : loading ? (
              <Loading />
            ) : (
              <NotFound>{t('notFound')}</NotFound>
            )}
          </PaymentsTable>
        </Card>

        <Pagination
          pageLength={pageLengthPay}
          setPageLength={setPageLengthPay}
          currentPage={currentPagePay}
          setCurrentPage={setCurrentPagePay}
          totalLottery={totalPayDeposits}
        />
      </Content>

      <Content active={active === 2}>
        <Card>
          <PaymentsTable>
            <TableHead>
              <TableHeadItemPaid>{t('adminPay.table.user')}</TableHeadItemPaid>
              <TableHeadItemPaid>{t('adminPay.table.name')}</TableHeadItemPaid>
              <TableHeadItemPaid>{t('adminPay.table.datePay')}</TableHeadItemPaid>
              <TableHeadItemPaid>{t('adminPay.table.category')}</TableHeadItemPaid>
              <TableHeadItemPaid>{t('adminPay.table.contribution')}</TableHeadItemPaid>
              <TableHeadItemPaid>{t('adminPay.table.payments')}</TableHeadItemPaid>
              <TableHeadItemPaid>
                <BurgerButton>
                  <BurgerImg
                    src={burgerGroup}
                    alt="burger"
                    onClick={() => setSortingWindowOpenForPay((prev) => !prev)}
                  />
                </BurgerButton>
              </TableHeadItemPaid>
              <Window ref={sortingWindowRefForPay} open={sortingWindowOpenForPay}>
                <WindowTitle>{t('sorting')}</WindowTitle>
                <WindowBody>
                  {listForSortingForPay.map((obj, index) => (
                    <Sort
                      active={listForSortingForPay[index].active}
                      key={index}
                      onClick={() => getActiveSortForPay(index)}
                    >
                      {sortings[obj.id]}
                    </Sort>
                  ))}
                </WindowBody>
              </Window>
            </TableHead>
            {paymentsList.length ? (
              <Scrollbars style={{ height: '500px' }}>
                {paymentsList.map((item: PaymentsCollection) => (
                  <PaymentsList key={item.safeId} data={item} />
                ))}
              </Scrollbars>
            ) : loading ? (
              <Loading />
            ) : (
              <NotFound>{t('notFound')}</NotFound>
            )}
          </PaymentsTable>
        </Card>

        <Pagination
          pageLength={pageLength}
          setPageLength={setPageLength}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          totalLottery={totalPayments}
        />
      </Content>

      <Content active={active === 3}>
        {active === 3 ? <Delayed listDeposits={listDeposits} /> : null}
      </Content>

      <Content active={active === 4}>
        {active === 4 ? <Analitics listDeposits={listDeposits} /> : null}
      </Content>
    </>
  );
};

const Window = styled(SortingWindow)`
  right: 65px;
  top: 415px;
  @media (max-width: 992px) {
    top: 423px;
  }
  @media (max-width: 768px) {
    top: 628px;
    right: 50px;
  }
  @media (max-width: 576px) {
    top: 464px;
    right: 50px;
  }
  @media (max-width: 400px) {
    top: 504px;
  }
  @media (max-width: 338px) {
    top: 518px;
  }
`;

const Sort = styled(SortingItem)`
  &:nth-child(1) {
    @media (max-width: 768px) {
      display: none;
    }
  }
  &:nth-child(2) {
    @media (max-width: 768px) {
      display: none;
    }
  }
  &:nth-child(3) {
    @media (max-width: 768px) {
      display: none;
    }
  }
  &:nth-child(4) {
    @media (max-width: 768px) {
      display: none;
    }
  }
  &:nth-child(7) {
    @media (max-width: 1100px) {
      display: none;
    }
  }
  &:nth-child(8) {
    @media (max-width: 1100px) {
      display: none;
    }
  }
`;

const SelfUpTitle = styled(UpTitle)`
  @media (max-width: 768px) {
    &:before {
      width: 13px;
    }
  }
`;

const NotFound = styled.div`
  font-weight: normal;
  font-size: 12px;
  line-height: 21px;
  padding: 30px;
  letter-spacing: 0.1px;
  min-height: 250px;
`;

const PayTab = styled(Tab)`
  width: 135px;
  @media (max-width: 992px) {
    width: 100px !important;
  }
  @media (max-width: 768px) {
    width: 110px !important;
    margin-right: 10px;
  }
  @media (max-width: 576px) {
    width: 100px !important;
  }
`;

const PaymentsTable = styled.div`
  padding: 30px;
  height: 600px;
`;

const TableHead = styled.ul`
  list-style: none;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 6px;
  border-bottom: 1px solid rgba(81, 81, 114, 0.2);
`;

const TableHeadItem = styled.li`
  font-weight: normal;
  font-size: 12px;
  line-height: 14px;
  letter-spacing: 0.1px;
  color: ${(props) => props.theme.thHead};
  width: 100%;
  &:nth-child(1) {
    max-width: 30px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  &:nth-child(2) {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 97px;
    @media (max-width: 768px) {
      display: none;
    }
  }
  &:nth-child(3) {
    max-width: 94px;
  }
  &:nth-child(4) {
    max-width: 110px;
    @media (max-width: 992px) {
      display: none;
    }
  }
  &:nth-child(5) {
    max-width: 90px;
    @media (max-width: 1100px) {
      display: none;
    }
  }
  &:nth-child(6) {
    max-width: 85px;
    @media (max-width: 992px) {
      display: none;
    }
  }
  &:nth-child(7) {
    max-width: 100px;
    @media (max-width: 1100px) {
      /* display: none; */
    }
  }
  &:nth-child(8) {
    max-width: 84px;
    @media (max-width: 576px) {
      display: none;
    }
  }
  &:nth-child(9) {
    max-width: 110px;
    @media (max-width: 576px) {
      max-width: 80px;
    }
  }
  &:last-child {
    max-width: 120px;
    text-align: right;
    @media (max-width: 992px) {
      max-width: 60px;
    }
    @media (max-width: 576px) {
      max-width: 30px;
    }
  }
`;

const TableHeadItemPaid = styled(TableHeadItem)`
  &:nth-child(1) {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 97px;
    @media (max-width: 768px) {
      display: none;
    }
  }
  &:nth-child(2) {
    max-width: 170px;
    @media (max-width: 576px) {
      padding-right: 10px;
    }
  }
  &:nth-child(4) {
    max-width: 170px;
  }
  &:nth-child(5) {
    max-width: 112px;
  }
  &:nth-child(6) {
    max-width: 100px;
    text-align: left;
    @media (max-width: 992px) {
      display: block;
      text-align: center;
    }
  }
  &:nth-child(7) {
    max-width: 50px;
    text-align: right;
  }
`;

const Tabs = styled.div`
  display: flex;
  padding: 12px 20px 0;
  ${Tab} {
    &:nth-child(2),
    &:nth-child(3) {
      width: 90px;
      @media (max-width: 768px) {
        width: 80px;
      }
    }
  }
  @media (max-width: 992px) {
    align-items: flex-end;
    padding-top: 0;
    ${Tab} {
      width: 90px;
    }
  }
  @media (max-width: 768px) {
    padding: 0px 10px 0;
    flex-wrap: wrap;
    ${Tab} {
      width: 80px;
      &:first-child {
        text-align: left;
        width: 100px;
      }
      &:last-child {
        text-align: right;
        &:before {
          left: 10px;
        }
      }
    }
  }
`;
