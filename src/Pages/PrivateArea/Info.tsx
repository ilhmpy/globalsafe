import React, { useState, useContext, useEffect, useRef } from 'react';
import * as Styled from './Styles.elements';
import { Card, Container } from '../../globalStyles';
import { Redirect } from 'react-router-dom';
import { AppContext } from '../../context/HubContext';
import { TestChart } from '../../components/Charts/Test';
import { CSSTransition } from 'react-transition-group';
import useWindowSize from '../../hooks/useWindowSize';
import { Collection, RootList } from '../../types/info';
import { Modal } from '../../components/Modal/Modal';
import { ReactComponent as Left } from '../../assets/svg/arrowLeftModal.svg';
import moment from 'moment';
import { ModalRangeInput } from '../../components/UI/DayPicker';
import { Input } from '../../components/UI/Input';
import { OpenDate } from '../../types/dates';
import { RootDeposits, DepositsCollection } from '../../types/info';
import { DepositListModal } from './Modals';
import { Loading } from '../../components/UI/Loading';
import { useTranslation } from 'react-i18next';

type Obj = {
  id: string;
  operationKind: number;
  balance: number;
};

type Deposit = {
  [elemName: string]: Obj[];
};

export const Info = () => {
  const [activeDeposite, setActiveDeposite] = useState(0);
  const [card, setCard] = useState(0);
  const [card2, setCard2] = useState(0);
  const [activMob, setActiveMob] = useState(0);
  const [list, setList] = useState<Collection[]>([]);
  const [nextDate, setNextDate] = useState<null | Date>(null);
  const [balanceLog, setBalanceLog] = useState<Deposit | null>(null);
  const [depositTabs, setDepositTabs] = useState(0);
  const [balanceLogs, setBalanceLogs] = useState([0, 1, 2, 3, 4, 5, 6, 7, 8]);
  const [open, setOpen] = useState(false);
  const [withdraw, setWithdraw] = useState(false);
  const [addDeposit, setAddDeposit] = useState(false);
  const [withdrawValue, setWithdrawValue] = useState('');
  const [addDepositValue, setAddDepositValue] = useState('');
  const [depositListModal, setDepositListModal] = useState(false);
  const [selectedYear, setSelectedYear] = useState<any>('2021');
  const [selectedMonth, setSelectedMonth] = useState<any>('3');
  const [depositTotal, setDepositTotal] = useState(0);
  const [totalPayed, setTotalPayed] = useState(0);
  const [depositSelect, setDepositSelect] = useState<null | DepositsCollection>(null);
  const [depositsList, setDepositsList] = useState<DepositsCollection[] | null>(null);
  const [openDate, setOpenDate] = useState<OpenDate>({
    from: new Date('2019-01-01T00:47:45'),
    to: new Date(),
  });
  const { t, i18n } = useTranslation();

  const sizes = useWindowSize();
  const size = sizes < 992;
  const appContext = useContext(AppContext);
  const user = appContext.user;
  const balance = appContext.balance;
  const hubConnection = appContext.hubConnection;
  const [loadDeposit, setLoadDeposit] = useState(false);
  const inputRef = useRef<any>(null);

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

  useEffect(() => {
    if (withdrawValue || addDepositValue) {
      inputRef.current.focus();
    }
  }, [withdrawValue, addDepositValue]);

  useEffect(() => {
    if (hubConnection) {
      hubConnection
        .invoke<RootList>('GetUserDeposits', null, [1, 2, 3, 4, 5, 6, 7, 8], 0, 20, [])
        .then((res) => {
          setList(res.collection);
        })
        .catch((err: Error) => console.log(err));
    }
  }, [hubConnection]);

  useEffect(() => {
    if (hubConnection) {
      hubConnection
        .invoke('GetUserNextPaymentDate')
        .then((res) => {
          setNextDate(res);
        })
        .catch((err: Error) => console.log(err));
    }
  }, [hubConnection]);

  useEffect(() => {
    if (hubConnection) {
      hubConnection
        .invoke('GetActiveDepositsCount')
        .then((res: any) => {
          setActiveDeposite(res);
        })
        .catch((err: Error) => console.log(err));
    }
  }, [hubConnection]);

  if (user === null) {
    return null;
  }

  if (user === false) {
    return <Redirect to="/" />;
  } 

  const onClose = () => {
    setOpen(false);
  };

  return (
    <>
      <>
        {loadDeposit && (
          <Styled.Loader>
            <Loading />
          </Styled.Loader>
        )}
        <Container>
          <Card>
            <Styled.Deposit>
              <Styled.DepositItem>
                <Styled.DepositName>{t('privateArea.openDeposits')}</Styled.DepositName>
                <Styled.DepositValue>{activeDeposite ? activeDeposite : '-'}</Styled.DepositValue>
              </Styled.DepositItem>
              <Styled.DepositItem>
                <Styled.DepositName>{t('privateArea.sumDeposits')}</Styled.DepositName>
                <Styled.DepositValue>
                  {(depositTotal / 100000).toLocaleString()}
                </Styled.DepositValue>
              </Styled.DepositItem>
              <Styled.DepositItem>
                <Styled.DepositName>{t('privateArea.allPay')}</Styled.DepositName>
                <Styled.DepositValue>{(totalPayed / 100000).toLocaleString()}</Styled.DepositValue>
              </Styled.DepositItem>
            </Styled.Deposit>
          </Card>
        </Container>
        {!size && (
          <Styled.ContainerRow>
            <Styled.Half>
              <Styled.HalfHead>
                <Styled.HalfTitle>{t('privateArea.pay')}</Styled.HalfTitle>
                <Styled.HalfTabs>
                  <Styled.HalfTab onClick={() => setCard(0)} card={card === 0}>
                    %
                  </Styled.HalfTab>
                  <Styled.HalfTab>/</Styled.HalfTab>
                  <Styled.HalfTab onClick={() => setCard(1)} card={card === 1}>
                    CWD
                  </Styled.HalfTab>
                </Styled.HalfTabs>
              </Styled.HalfHead>
              <Styled.HalfContent card={card === 0}>
                <CSSTransition in={card === 0} timeout={300} classNames="chart" unmountOnExit>
                  <TestChart
                    percent
                    labels={list.length ? list.map((i: any) => i.deposit.name) : ['']}
                    series={list.length ? list.map((i: any) => i.payedAmountView) : ['']}
                  />
                </CSSTransition>
                <Styled.NextPay>
                  {t('privateArea.nextPay')}:{' '}
                  <Styled.Date>
                    {nextDate ? moment(nextDate).format('DD MMMM YYYY') : '-'}
                  </Styled.Date>
                </Styled.NextPay>
              </Styled.HalfContent>
              <Styled.HalfContent card={card === 1}>
                <CSSTransition in={card === 1} timeout={300} classNames="chart" unmountOnExit>
                  <TestChart
                    labels={list.length ? list.map((i: any) => i.deposit.name) : ['']}
                    series={list.length ? list.map((i: any) => i.payedAmountView) : ['']}
                  />
                </CSSTransition>
                <Styled.NextPay>
                  {t('privateArea.nextPay')}:{' '}
                  <Styled.Date>
                    {nextDate ? moment(nextDate).format('DD MMMM YYYY') : '-'}
                  </Styled.Date>
                </Styled.NextPay>
              </Styled.HalfContent>
            </Styled.Half>

            <Styled.Half>
              <Styled.HalfHead>
                <Styled.HalfTitle>{t('privateArea.take')}</Styled.HalfTitle>
                <Styled.HalfTabs>
                  <Styled.HalfTab onClick={() => setCard2(0)} card={card2 === 0}>
                    %
                  </Styled.HalfTab>
                  <Styled.HalfTab>/</Styled.HalfTab>
                  <Styled.HalfTab onClick={() => setCard2(1)} card={card2 === 1}>
                    CWD
                  </Styled.HalfTab>
                </Styled.HalfTabs>
              </Styled.HalfHead>
              <Styled.HalfContent card={card2 === 0}>
                <CSSTransition in={card2 === 0} timeout={300} classNames="chart" unmountOnExit>
                  <TestChart
                    percent
                    labels={list.length ? list.map((i: any) => i.deposit.name) : ['']}
                    series={list.length ? list.map((i: any) => i.baseAmountView) : ['']}
                  />
                </CSSTransition>
              </Styled.HalfContent>
              <Styled.HalfContent card={card2 === 1}>
                <CSSTransition in={card2 === 1} timeout={300} classNames="chart" unmountOnExit>
                  <TestChart
                    labels={list.length ? list.map((i: any) => i.deposit.name) : ['']}
                    series={list.length ? list.map((i: any) => i.baseAmountView) : ['']}
                  />
                </CSSTransition>
              </Styled.HalfContent>
            </Styled.Half>
          </Styled.ContainerRow>
        )}

        {size && (
          <Container>
            <Card>
              <Styled.HalfTabs>
                <Styled.MobHalfTab onClick={() => setActiveMob(0)} card={activMob === 0}>
                  {t('privateArea.pay')}
                </Styled.MobHalfTab>
                <Styled.MobHalfTab onClick={() => setActiveMob(1)} card={activMob === 1}>
                  {t('privateArea.take')}
                </Styled.MobHalfTab>
              </Styled.HalfTabs>
              <Styled.Content active={activMob === 0}>
                <CSSTransition in={activMob === 0} timeout={300} classNames="chart" unmountOnExit>
                  <>
                    <Styled.HalfTabs>
                      <Styled.HalfTab onClick={() => setCard(0)} card={card === 0}>
                        %
                      </Styled.HalfTab>
                      <Styled.HalfTab>/</Styled.HalfTab>
                      <Styled.HalfTab onClick={() => setCard(1)} card={card === 1}>
                        CWD
                      </Styled.HalfTab>
                    </Styled.HalfTabs>
                    <Styled.HalfContent card={card === 0}>
                      <CSSTransition in={card === 0} timeout={300} classNames="chart" unmountOnExit>
                        <TestChart
                          percent
                          mobHeight={list.length ? 150 : 0}
                          labels={list.length ? list.map((i: any) => i.deposit.name) : ['']}
                          series={list.length ? list.map((i: any) => i.payedAmountView) : ['']}
                        />
                      </CSSTransition>
                      <Styled.NextPay>
                        <Styled.Date></Styled.Date>
                      </Styled.NextPay>
                    </Styled.HalfContent>

                    <Styled.HalfContent card={card === 1}>
                      <CSSTransition in={card === 1} timeout={300} classNames="chart" unmountOnExit>
                        <TestChart
                          mobHeight={list.length ? 150 : 0}
                          labels={list.length ? list.map((i: any) => i.deposit.name) : ['']}
                          series={list.length ? list.map((i: any) => i.payedAmountView) : ['']}
                        />
                      </CSSTransition>
                    </Styled.HalfContent>
                    <Styled.NextPay>
                      {t('privateArea.nextPay')}:{' '}
                      <Styled.Date>
                        {nextDate ? moment(nextDate).format('DD MMMM YYYY') : '-'}
                      </Styled.Date>
                    </Styled.NextPay>
                  </>
                </CSSTransition>
              </Styled.Content>
              <Styled.Content active={activMob === 1}>
                <CSSTransition in={activMob === 1} timeout={300} classNames="chart" unmountOnExit>
                  <>
                    <Styled.HalfTabs>
                      <Styled.HalfTab onClick={() => setCard2(0)} card={card2 === 0}>
                        %
                      </Styled.HalfTab>
                      <Styled.HalfTab>/</Styled.HalfTab>
                      <Styled.HalfTab onClick={() => setCard2(1)} card={card2 === 1}>
                        CWD
                      </Styled.HalfTab>
                    </Styled.HalfTabs>

                    <Styled.HalfContent card={card2 === 0}>
                      <CSSTransition
                        in={card2 === 0}
                        timeout={300}
                        classNames="chart"
                        unmountOnExit
                      >
                        <TestChart
                          percent
                          mobHeight={list.length ? 150 : 0}
                          labels={list.length ? list.map((i: any) => i.deposit.name) : ['']}
                          series={list.length ? list.map((i: any) => i.baseAmountView) : ['']}
                        />
                      </CSSTransition>
                      <Styled.NextPay>
                        <Styled.Date></Styled.Date>
                      </Styled.NextPay>
                    </Styled.HalfContent>

                    <Styled.HalfContent card={card2 === 1}>
                      <CSSTransition
                        in={card2 === 1}
                        timeout={300}
                        classNames="chart"
                        unmountOnExit
                      >
                        <TestChart
                          mobHeight={list.length ? 150 : 0}
                          labels={list.length ? list.map((i: any) => i.deposit.name) : ['']}
                          series={list.length ? list.map((i: any) => i.baseAmountView) : ['']}
                        />
                      </CSSTransition>
                      <Styled.NextPay>
                        <Styled.Date></Styled.Date>
                      </Styled.NextPay>
                    </Styled.HalfContent>
                  </>
                </CSSTransition>
              </Styled.Content>
            </Card>
          </Container>
        )}
      </>
    </>
  );
};
