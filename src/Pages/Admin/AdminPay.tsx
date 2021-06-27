import moment from 'moment';
import React, { useContext, useEffect, useState } from 'react';
import { Scrollbars } from 'react-custom-scrollbars';
import { useTranslation } from 'react-i18next';
import ReactNotification, { store } from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';
import { CSSTransition } from 'react-transition-group';
import styled from 'styled-components/macro';
import { ReactComponent as Exit } from '../../assets/svg/exit.svg';
import { Button } from '../../components/Button/Button';
import { Select as SelectOne } from '../../components/Select/Select';
import { Select } from '../../components/Select/Select2';
import { TestInput } from '../../components/UI/DayPicker';
import { Loading } from '../../components/UI/Loading';
import { Content, Tab } from '../../components/UI/Tabs';
import { UpTitle } from '../../components/UI/UpTitle';
import { AppContext } from '../../context/HubContext';
import { ThemeContext } from '../../context/ThemeContext';
import { Card } from '../../globalStyles';
import useWindowSize from '../../hooks/useWindowSize';
import { OpenDate } from '../../types/dates';
import { CollectionListDeposits, ListDeposits } from '../../types/deposits';
import {
  CollectionCharges,
  PaymentsCollection,
  RootCharges,
  RootPayments,
} from '../../types/payments';
import {
  DepositList,
  PaymentsList,
  PaymentsListPay,
} from './AdminPay/DepositList';
import { Analitics } from './AdminPayments/components/Analitics/Analitics';
import { Approval } from './AdminPayments/components/Approval/Approval';
import { Chart } from './AdminPayments/components/Chart/Chart';
import { Pagination } from './Pagination';
import * as Styled from './Styled.elements';

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
  const [depositList, setDepositList] = useState<any>([]);
  const [totalPayDeposits, setTotalPayDeposits] = useState(0);
  const [openFilterOne, setOpenFilterOne] = useState(false);

  const [depositPayList, setDepositPayList] = useState<any>([]);
  const [paymentsList, setPaymentsList] = useState<any>([]);
  const [totalPayments, setTotalPayments] = useState(0);

  const [countPay, setPayCount] = useState(true);
  const [numPayments, setNumPayments] = useState(20);

  const [numPay, setPayNum] = useState(20);
  const [next, setNext] = useState(true);
  const [procent, setProcent] = useState('');
  const [loading, setLoading] = useState(true);
  const [openDate, setOpenDate] = useState<OpenDate>({
    from: undefined,
    to: undefined,
  });
  const [openDateApproval, setOpenDateApproval] = useState<OpenDate>({
    from: undefined,
    to: undefined,
  });

  const [openFilter, setOpenFilter] = useState(false);
  const [num, setNum] = useState(20);

  const [checkList, setCheckList] = useState<any>([]);
  const [checkListApproval, setCheckListApproval] = useState<any>([]);
  const [name, setName] = useState('');
  const [nameApproval, setNameApproval] = useState('');
  const [selectedOption, setSelectedOption] = useState<null | string>(null);
  const [pageLength, setPageLength] = useState<number>(10);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageLengthPay, setPageLengthPay] = useState<number>(10);
  const [currentPagePay, setCurrentPagePay] = useState<number>(1);
  const [pageLengthDeposit, setPageLengthDeposit] = useState<number>(10);
  const [currentPageDeposit, setCurrentPageDeposit] = useState<number>(1);

  const [listDeposits, setListDeposits] = useState<CollectionListDeposits[]>(
    [],
  );
  const backDay: any = moment().add(90, 'days').format();
  const [depositsDate, setDepositsDate] = useState<OpenDate>({
    from: new Date(),
    to: backDay,
  });
  const [stats, setStats] = useState<any[]>([]);

  const { t } = useTranslation();

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
        .invoke<ListDeposits>('GetAllPublicDeposits', 1, false, 0, 40)
        .then((res) => {
          // console.log("GetDeposits", res);
          setListDeposits(res.collection);
        })
        .catch((err: Error) => console.log(err));
    }
  }, [hubConnection]);

  const namesProgram = checkList.map((i: any) => i.safeId);
  const idProgram = listDeposits.filter((i) => namesProgram.includes(i.safeId));
  const searchSafeID = idProgram.map((i) => i.safeId);
  const backDays: any = moment().subtract(30, 'days');

  const namesProgramApproval = checkListApproval.map((i: any) => i.safeId);
  const idProgramApproval = listDeposits.filter((i) =>
    namesProgramApproval.includes(i.safeId),
  );
  const searchSafeIDApproval = idProgramApproval.map((i) => i.safeId);
  const depositState = checkList.length
    ? checkList.map((i: any) => i.id)
    : [5, 6];

  const myLoad = () => {
    setNext(false);
    if (hubConnection && depositPayList.length < totalPayDeposits) {
      hubConnection
        .invoke<RootCharges>(
          'GetDepositsCharges',
          name ? name.toLowerCase() : null,
          openDate.from ? openDate.from : backDays._d,
          openDate.to ? openDate.to : new Date(),
          searchSafeID.length ? searchSafeID : null,
          null,
          [7, 8],
          numPay,
          20,
        )
        .then((res) => {
          if (res.collection.length) {
            // console.log("myLoad", res);
            setDepositPayList([...depositPayList, ...res.collection]);
            setPayNum(numPay + 20);
            setNext(true);
          }
        })
        .catch((err: Error) => console.log(err));
    }
  };

  const handleClick = (id: number) => {
    if (id !== active) {
      setActive(id);
    }
  };

  const confirmPay = (id: string) => {
    if (hubConnection) {
      hubConnection
        .invoke('ConfirmDepositPayment', id)
        .then((res) => {
          console.log('ConfirmDepositPayment', res);
          getPaymentsOverview();
        })
        .catch((err: Error) => {
          console.log(err);
        });
    }
  };

  const unConfirmPay = (id: string) => {
    if (hubConnection) {
      hubConnection
        .invoke('UnconfirmDepositPayment', id)
        .then((res) => {
          console.log('UnconfirmDepositPayment', res);
          getPaymentsOverview();
        })
        .catch((err: Error) => {
          console.log(err);
        });
    }
  };

  useEffect(() => {
    if (hubConnection) {
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
          (currentPage - 1) * pageLength,
          pageLength,
        )
        .then((res) => {
          setTotalPayments(res.totalRecords);
          setPaymentsList(res.collection);
          setNumPayments(20);
          setLoading(false);
        })
        .catch((err: Error) => {
          setLoading(false);
          console.log(err);
        });
    }
  }, [hubConnection, active, currentPage, pageLength]);

  useEffect(() => {
    if (hubConnection) {
      setLoading(true);
      setDepositList([]);
      hubConnection
        .invoke<RootPayments>(
          'GetUsersDeposits',
          [5, 6],
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          (currentPageDeposit - 1) * pageLengthDeposit,
          pageLengthDeposit,
        )
        .then((res) => {
          setLoading(false);
          setTotalDeposits(res.totalRecords);
          setDepositList(res.collection);
          setNum(20);
          setLoading(false);
        })
        .catch((err: Error) => {
          setLoading(false);
          console.log(err);
        });
    }
  }, [hubConnection, active, currentPageDeposit, pageLengthDeposit]);

  useEffect(() => {
    if (hubConnection) {
      setLoading(true);

      setDepositPayList([]);
      hubConnection
        .invoke<RootCharges>(
          'GetDepositsCharges',
          name ? name.toLowerCase() : null,
          openDate.from ? openDate.from : backDays._d,
          openDate.to ? openDate.to : new Date(),
          searchSafeID.length ? searchSafeID : null,
          null,
          [7, 8],
          (currentPagePay - 1) * pageLengthPay,
          pageLengthPay,
        )
        .then((res) => {
          // console.log("GetDepositsCharges", res);
          setLoading(false);
          if (res.collection.length) {
            setTotalPayDeposits(res.totalRecords);
            setDepositPayList(res.collection);
            setPayNum(20);
            setLoading(false);
          }
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

  const loadMorePayments = () => {
    setPayCount(false);
    if (hubConnection && paymentsList.length < totalPayments) {
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
          numPayments,
          20,
        )
        .then((res) => {
          if (res.collection.length) {
            setPaymentsList([...paymentsList, ...res.collection]);
            setNumPayments(numPayments + 20);
            setPayCount(true);
          }
        })
        .catch((err: Error) => console.log(err));
    }
  };

  const alert = (
    title: string,
    message: string,
    type: 'success' | 'default' | 'warning' | 'info' | 'danger',
  ) => {
    store.addNotification({
      title: title,
      message: message,
      type: type,
      insert: 'top',
      container: 'top-right',
      animationIn: ['animate__animated', 'animate__fadeIn'],
      animationOut: ['animate__animated', 'animate__fadeOut'],
      dismiss: {
        duration: 5000,
      },
    });
  };

  const adjustPay = (id: string, amount: number) => {
    if (hubConnection) {
      hubConnection
        .invoke('AdjustDepositPayment', id, amount)
        .then((res) => {
          getPaymentsOverview();
          alert('Успешно', 'Подтверждено', 'success');
        })
        .catch((err: Error) => {
          alert('Ошибка', 'Произошла ошибка', 'danger');
        });
    }
  };

  const paymentsConfirm = () => {
    if (hubConnection) {
      console.log(procent);
      
      hubConnection
        .invoke(
          'ConfirmAllDepositsPayment',
          nameApproval ? nameApproval.toLowerCase() : null,
          openDate.from ? openDate.from : backDays._d,
          openDate.to ? openDate.to : new Date(),
          searchSafeID.length ? searchSafeID : null,
          procent ? +procent / 100 : null,
        )
        .then((res) => {
          console.log('ConfirmAllDepositsPayment~~~~~~~', res);
          alert('Успешно', '', 'success');
          getPaymentsOverview();
        })
        .catch((err: Error) => {
          alert('Ошибка', 'Произошла ошибка', 'danger');
        });
    }
  };

  const submit = () => {
    if (hubConnection) {
      setDepositPayList([]);
      hubConnection
        .invoke<RootCharges>(
          'GetDepositsCharges',
          name ? name.toLowerCase() : null,
          openDate.from ? openDate.from : backDays._d,
          openDate.to ? openDate.to : new Date(),
          searchSafeID.length ? searchSafeID : null,
          null,
          [7, 8],
          0,
          20,
        )
        .then((res) => {
          // console.log("res", res);
          setLoading(false);
          if (res.collection.length) {
            setTotalPayDeposits(res.totalRecords);
            setDepositPayList(res.collection);
            setPayNum(20);
          }
        })
        .catch((err: Error) => {
          setLoading(false);
          console.log(err);
        });
    }
  };

  useEffect(() => {
    getPayoutsEstimateStats();
  }, [depositsDate]);

  const getPayoutsEstimateStats = () => {
    if (hubConnection) {
      hubConnection
        .invoke(
          'GetPayoutsEstimateStats',
          depositsDate.from ? depositsDate.from : backDays,
          depositsDate.to ? depositsDate.to : new Date(),
        )
        .then((res) => {
          setStats(res);
        })
        .catch((e) => console.log(e));
    }
  };

  const submitApproval = () => {
    if (hubConnection) {
      hubConnection
        .invoke<RootPayments>(
          'GetUsersDeposits',
          depositState,
          nameApproval ? nameApproval.toLowerCase() : null,
          searchSafeIDApproval.length ? searchSafeIDApproval : null,
          openDateApproval.from ? openDateApproval.from : null,
          openDateApproval.to ? openDateApproval.to : null,
          null,
          null,
          null, //
          0,
          20,
        )
        .then((res) => {
          setDepositList([]);
          if (res.collection.length) {
            setDepositList(res.collection);
            setTotalDeposits(res.totalRecords);
            setNum(20);
          }
        })
        .catch((err: Error) => console.log(err));
    }
  };

  return (
    <>
      <ReactNotification />
      <Styled.HeadBlock>
        <SelfUpTitle small>{t('adminPay.uptitle')}</SelfUpTitle>
        <Styled.UserName>
          <span>{user}</span>
          <Exit onClick={logOut} />
        </Styled.UserName>
      </Styled.HeadBlock>
      {active === 3 && (
        <Chart
          depositsDate={depositsDate}
          setDepositsDate={setDepositsDate}
          stats={stats}
        />
      )}
      {active !== 3 && (
        <Card>
          <Styled.PayList>
            <Styled.PayItem>
              <Styled.PayItemHead mb>
                <SelfUpTitle small>{t('adminPay.title1')}</SelfUpTitle>
              </Styled.PayItemHead>
              <Styled.Radial
                bg={
                  theme === 'light'
                    ? 'rgba(255, 65, 110, 0.2)'
                    : 'rgba(255, 65, 110, 1)'
                }>
                <span>
                  {sum ? (sum[2] / 100000).toLocaleString('ru-RU') : '-'}
                </span>
                <span>CWD</span>
              </Styled.Radial>
            </Styled.PayItem>
            <Styled.PayItem>
              <Styled.PayItemHead mb>
                <SelfUpTitle small>{t('adminPay.title2')}</SelfUpTitle>
              </Styled.PayItemHead>

              <Styled.Radial
                bg={
                  theme === 'light'
                    ? 'rgba(188, 212, 118, 0.2)'
                    : 'rgba(188, 212, 118, 1)'
                }>
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
                bg={
                  theme === 'light'
                    ? 'rgba(109, 185, 255, 0.2)'
                    : 'rgba(109, 185, 255, 1)'
                }>
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
            {t('adminPay.analitics.analitic')}
          </Tab>
        </Tabs>
      </Card>

      <Content active={active === 0}>
        <Approval
          paymentsConfirm={paymentsConfirm}
          adjustPay={adjustPay}
          confirmPay={confirmPay}
          unConfirmPay={unConfirmPay}
          listDeposits={listDeposits}
          setProcent={setProcent}
          procent={procent}
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
          <CSSTransition
            in={openFilter}
            timeout={200}
            classNames="filter"
            unmountOnExit>
            <Styled.SelectContainer>
              <Styled.SelectContainerInnerPaid>
                <Styled.SelectWrap style={{ minWidth: 263 }}>
                  <Styled.Label>{t('adminPay.filter.user')}</Styled.Label>
                  <Styled.Input
                    value={name}
                    onChange={(e) => setName(e.target.value.toLowerCase())}
                  />
                </Styled.SelectWrap>
                <Styled.SelectWrap input>
                  <TestInput
                    setOpenDate={setOpenDate}
                    openDate={openDate}
                    label={t('adminPay.filter.date')}
                  />
                </Styled.SelectWrap>
                <Styled.SelectWrap style={{ minWidth: 263 }}>
                  <Styled.Label>{t('adminPay.filter.deposit')}</Styled.Label>
                  <Select
                    checkList={checkList}
                    setCheckList={setCheckList}
                    values={listDeposits}
                  />
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
              <TableHeadItemPaid>
                {t('adminPay.table.datePay')}
              </TableHeadItemPaid>
              <TableHeadItemPaid>
                {t('adminPay.table.category')}
              </TableHeadItemPaid>
              <TableHeadItemPaid>
                {t('adminPay.table.contribution')}
              </TableHeadItemPaid>
              <TableHeadItemPaid>
                {t('adminPay.table.payments')}
              </TableHeadItemPaid>
              <TableHeadItemPaid>{/* <Filter /> */}</TableHeadItemPaid>
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
          totalLottery={totalDeposits}
        />
      </Content>

      <Content active={active === 2}>
        <Card>
          <PaymentsTable>
            <TableHead>
              <TableHeadItemPaid>{t('adminPay.table.user')}</TableHeadItemPaid>
              <TableHeadItemPaid>{t('adminPay.table.name')}</TableHeadItemPaid>
              <TableHeadItemPaid>
                {t('adminPay.table.datePay')}
              </TableHeadItemPaid>
              <TableHeadItemPaid>
                {t('adminPay.table.category')}
              </TableHeadItemPaid>
              <TableHeadItemPaid>
                {t('adminPay.table.contribution')}
              </TableHeadItemPaid>
              <TableHeadItemPaid>
                {t('adminPay.table.payments')}
              </TableHeadItemPaid>
              <TableHeadItemPaid>{/* <Filter /> */}</TableHeadItemPaid>
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
        {active === 3 ? <Analitics listDeposits={listDeposits} /> : null}
      </Content>
    </>
  );
};

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
      display: none;
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
  &:nth-child(10) {
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
