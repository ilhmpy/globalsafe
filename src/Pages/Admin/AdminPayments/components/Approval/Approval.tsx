import moment from 'moment';
import React, { FC, useContext, useEffect, useState } from 'react';
import { Scrollbars } from 'react-custom-scrollbars';
import { useTranslation } from 'react-i18next';
import ReactNotification from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';
import { CSSTransition } from 'react-transition-group';
import styled from 'styled-components';
import burgerGroup from '../../../../../assets/img/burgerGroup.png';
import { Button } from '../../../../../components/Button/Button';
import { Notification } from '../../../../../components/Notify/Notification';
import { Select as SelectOne } from '../../../../../components/Select/Select';
import { Select } from '../../../../../components/Select/Select2';
import { TestInput } from '../../../../../components/UI/DayPicker';
import { Loading } from '../../../../../components/UI/Loading';
import { ProcentInput } from '../../../../../components/UI/ProcentInput';
import { AppContext } from '../../../../../context/HubContext';
import { Card } from '../../../../../globalStyles';
import { OpenDate } from '../../../../../types/dates';
import { CollectionListDeposits } from '../../../../../types/deposits';
import { Notify } from '../../../../../types/notify';
import { PaymentsCollection, RootPayments } from '../../../../../types/payments';
import { SelectValues, SortingType } from '../../../../../types/sorting';
import { DepositList } from '../../../AdminPay/DepositList';
import { Pagination } from '../../../Pagination';
import {
  BurgerButton,
  BurgerImg,
  FilterBlock,
  FilterHeader,
  FilterName,
  Input,
  Label,
  SelectContainer,
  SelectContainerInnerPaid,
  SelectWrapTwo,
  ShowHide,
  SortingItem,
  SortingWindow,
  WindowBody,
  WindowTitle,
} from '../../../Styled.elements';
import * as Styled from './Styled.elements';

type Props = {
  listDeposits: CollectionListDeposits[];
  getPaymentsOverview: () => void;
  procent: string;
  setProcent: (e: string) => void;
  setModal: (boolean: boolean) => void;
  setPaymentsList: (value: any) => void;
  setTotalPayments: (value: any) => void;
};

export const Approval: FC<Props> = ({
  listDeposits,
  getPaymentsOverview,
  setProcent,
  procent,
  setModal,
  setPaymentsList,
  setTotalPayments,
}: Props) => {
  const [depositList, setDepositList] = useState<PaymentsCollection[]>([]);
  const [totalDeposits, setTotalDeposits] = useState(0);
  const [count, setCount] = useState(true);
  const [num, setNum] = useState(20);
  const [nameApproval, setNameApproval] = useState('');
  const [checkList, setCheckList] = useState<any>([]);
  const [loading, setLoading] = useState(true);
  const [checkListApproval, setCheckListApproval] = useState<any>([]);
  const [openDateApproval, setOpenDateApproval] = useState<OpenDate>({
    from: undefined,
    to: undefined,
  });
  const [notifications, setNotifications] = useState<Notify[]>([]);
  const [openFilterOne, setOpenFilterOne] = useState(false);

  const [pageLength, setPageLength] = useState<number>(10);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const appContext = useContext(AppContext);
  const hubConnection = appContext.hubConnection;
  const { t } = useTranslation();

  const depositState = checkList.length ? checkList.map((i: any) => i.id) : [5, 6];

  const namesProgramApproval = checkListApproval.map((i: any) => i.safeId);
  const idProgramApproval = listDeposits.filter((i) => namesProgramApproval.includes(i.safeId));
  const searchSafeIDApproval = idProgramApproval.map((i) => i.safeId);

  const [sortingWindowOpen, setSortingWindowOpen] = useState(false);
  const [sorting, setSorting] = useState<SortingType[]>([]);
  const [listForSorting, setListForSorting] = useState<SelectValues[]>([
    {
      text: 'Пользователь: От А до Я',
      active: false,
      OrderType: 1,
      FieldName: 'userName',
    },
    {
      text: 'Пользователь: От Я до А',
      active: false,
      OrderType: 2,
      FieldName: 'userName',
    },
    {
      text: 'Название: От А до Я',
      active: false,
      OrderType: 2,
      FieldName: 'DepositId',
    },
    {
      text: 'Название: От Я до А',
      active: false,
      OrderType: 1,
      FieldName: 'DepositId',
    },
    {
      text: 'По убыванию даты открытия',
      active: false,
      OrderType: 2,
      FieldName: 'creationDate',
    },
    {
      text: 'По возрастанию даты открытия',
      active: false,
      OrderType: 1,
      FieldName: 'creationDate',
    },
    {
      text: 'По убыванию суммы вклада',
      active: false,
      OrderType: 2,
      FieldName: 'baseAmount',
    },
    {
      text: 'По возрастанию суммы вклада',
      active: false,
      OrderType: 1,
      FieldName: 'baseAmount',
    },
  ]);

  const deposites = () => {
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
          null,
          null,
          null,
          (currentPage - 1) * pageLength,
          pageLength,
          []
        )
        .then((res) => {
          setTotalDeposits(res.totalRecords);
          setDepositList(res.collection);
          setLoading(false);
        })
        .catch((err: Error) => {
          setLoading(false);
          console.log(err);
        });
    }
  };

  const loadMoreItems = () => {
    setCount(false);
    setDepositList([]);
    setLoading(true);

    if (hubConnection && depositList.length < totalDeposits) {
      hubConnection
        .invoke<RootPayments>(
          'GetUsersDeposits',
          depositState,
          nameApproval ? nameApproval.toLowerCase() : null,
          searchSafeIDApproval.length ? searchSafeIDApproval : null,
          openDateApproval.from
            ? moment(openDateApproval.from)
                .utcOffset('+00:00')
                .set({ hour: 0, minute: 0, second: 0 })
                .toDate()
            : null,
          openDateApproval.to
            ? moment(openDateApproval.to)
                .utcOffset('+00:00')
                .set({ hour: 23, minute: 59, second: 59 })
                .toDate()
            : openDateApproval.from
            ? moment(openDateApproval.from)
                .utcOffset('+00:00')
                .set({ hour: 23, minute: 59, second: 59 })
                .toDate()
            : null,
          null,
          null,
          null,
          null,
          null,
          null,
          (currentPage - 1) * pageLength,
          pageLength,
          sorting
        )
        .then((res) => {
          setTotalDeposits(res.totalRecords);
          if (res.collection.length) {
            setDepositList([...res.collection]);
            setCount(true);
            setNum(num + 20);
            setLoading(false);
          }
        })
        .catch((err: Error) => {
          console.log(err);
          setLoading(false);
        });
    }
  };

  useEffect(() => {
    deposites();
  }, [hubConnection]);

  const confirmPay = (id: string) => {
    if (hubConnection) {
      hubConnection
        .invoke('ConfirmDepositPayment', id)
        .then((res) => {
          const key = depositList.findIndex((i) => i.safeId === id);

          if (key !== -1) {
            const item = depositList.filter((i) => i.safeId === id)[0];
            setDepositList([
              ...depositList.slice(0, key),
              { ...item, state: 5 },
              ...depositList.slice(key + 1),
            ]);
          }

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
          const key = depositList.findIndex((i) => i.safeId === id);

          if (key !== -1) {
            const item = depositList.filter((i) => i.safeId === id)[0];
            setDepositList([
              ...depositList.slice(0, key),
              { ...item, state: 6 },
              ...depositList.slice(key + 1),
            ]);
          }
          getPaymentsOverview();
        })
        .catch((err: Error) => {
          console.log(err);
        });
    }
  };

  const createNotify = (item: Notify) => {
    setNotifications([item]);
  };

  useEffect(() => {
    loadMoreItems();
  }, [currentPage, hubConnection, pageLength, sorting]);

  const submitApproval = () => {
    if (hubConnection) {
      setCurrentPage(1);
      setDepositList([]);
      setLoading(true);
      hubConnection
        .invoke<RootPayments>(
          'GetUsersDeposits',
          depositState,
          nameApproval ? nameApproval.toLowerCase() : null,
          searchSafeIDApproval.length ? searchSafeIDApproval : null,
          // openDateApproval.from
          //   ? moment(openDateApproval.from).set({ hour: 0, minute: 0, second: 0 }).toDate()
          //   : null,
          // openDateApproval.to
          //   ? moment(openDateApproval.to).set({ hour: 23, minute: 59, second: 59 }).toDate()
          //   : moment(openDateApproval.from).set({ hour: 23, minute: 59, second: 59 }).toDate() ||
          //       null,

          openDateApproval.from
            ? moment(openDateApproval.from)
                .utcOffset('+00:00')
                .set({ hour: 0, minute: 0, second: 0 })
                .toDate()
            : null,
          openDateApproval.to
            ? moment(openDateApproval.to)
                .utcOffset('+00:00')
                .set({ hour: 23, minute: 59, second: 59 })
                .toDate()
            : openDateApproval.from
            ? moment(openDateApproval.from)
                .utcOffset('+00:00')
                .set({ hour: 23, minute: 59, second: 59 })
                .toDate()
            : null,

          null,
          null,
          null,
          null,
          null,
          null,
          (currentPage - 1) * pageLength,
          pageLength,
          sorting
        )
        .then((res) => {
          setTotalDeposits(res.totalRecords);
          if (res.collection.length) {
            setDepositList(res.collection);
            setTotalDeposits(res.totalRecords);
            setLoading(false);
          }
        })
        .catch((err: Error) => {
          console.log(err);
          setLoading(false);
        });
    }
  };

  const adjustPay = (id: string, amount: number) => {
    if (hubConnection) {
      hubConnection
        .invoke('AdjustDepositPayment', id, amount)
        .then((res) => {
          getPaymentsOverview();
        })
        .catch((err: Error) => {
          console.log(err);
        });
    }
  };

  const paymentsConfirm = () => {
    // setModal(true);
    if (depositList.some((item) => item.state === 6)) {
      if (hubConnection) {
        hubConnection
          .invoke(
            'ConfirmAllDepositsPayment',
            nameApproval ? nameApproval.toLowerCase() : null,
            openDateApproval.from ? openDateApproval.from : null,
            openDateApproval.to ? openDateApproval.to : null,
            searchSafeIDApproval.length ? searchSafeIDApproval : null,
            procent ? +procent / 100 : null
          )
          .then((res) => {
            createNotify({
              text: t('adminPay.success'),
              error: false,
              timeleft: 5,
              id: notifications.length,
            });

            getPaymentsOverview();
            submitApproval();
          })
          .catch((err: Error) => {
            console.log(err);
            createNotify({
              text: t('adminPay.error'),
              error: true,
              timeleft: 5,
              id: notifications.length,
            });
          });
      }
    } else {
      createNotify({
        text: t('adminPay.notPays'),
        error: true,
        timeleft: 5,
        id: notifications.length,
      });
    }
  };

  const onDelete = (id: number) => {
    setNotifications(notifications.filter((i) => i.id !== id));
  };

  const clear = () => {
    setNameApproval('');
    setOpenDateApproval({
      from: undefined,
      to: undefined,
    });
    setCheckListApproval([]);
    setCheckList([]);

    if (hubConnection) {
      setCurrentPage(1);
      setDepositList([]);
      setLoading(true);
      hubConnection
        .invoke<RootPayments>(
          'GetUsersDeposits',
          depositState,
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
          sorting
        )
        .then((res) => {
          setTotalDeposits(res.totalRecords);
          if (res.collection.length) {
            setDepositList(res.collection);
            setTotalDeposits(res.totalRecords);
            setLoading(false);
          }
        })
        .catch((err: Error) => {
          console.log(err);
          setLoading(false);
        });
    }
  };

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

  return (
    <>
      <ReactNotification />

      <Styled.ButtonWrap>
        <Button dangerOutline mb onClick={paymentsConfirm}>
          {t('adminPay.confirmButton')}
        </Button>
        <ProcentInput
          placeholder="—"
          value={procent}
          onChange={(e) => {
            if (e.target.value.match(/^[\d]*\.?[\d]*$/g) || e.target.value === '')
              setProcent(e.target.value);
          }}
          label={t('adminPay.procentPay')}
          maxLng={6}
        />
      </Styled.ButtonWrap>

      <FilterBlock>
        <FilterHeader>
          <FilterName>{t('adminDeposit.filter')}</FilterName>
          <ShowHide onClick={() => setOpenFilterOne(!openFilterOne)}>
            {openFilterOne ? t('hide') : t('show')}
          </ShowHide>
        </FilterHeader>
        <CSSTransition in={openFilterOne} timeout={200} classNames="filter" unmountOnExit>
          <SelectContainer>
            <SelectContainerInnerPaid>
              <SelectWrapTwo mWidth="154px">
                <Label>{t('adminPay.filter.user')}</Label>
                <Input
                  value={nameApproval}
                  onChange={(e) => setNameApproval(e.target.value.toLowerCase())}
                />
              </SelectWrapTwo>
              <SelectWrapTwo mWidth="210px">
                <TestInput
                  setOpenDate={setOpenDateApproval}
                  openDate={openDateApproval}
                  label={t('adminPay.filter.date')}
                />
              </SelectWrapTwo>
              <SelectWrapTwo mWidth="184px">
                <Label>{t('adminPay.filter.deposit')}</Label>
                <Select
                  checkList={checkListApproval}
                  setCheckList={setCheckListApproval}
                  values={listDeposits}
                />
              </SelectWrapTwo>
              <SelectWrapTwo mWidth="184px" mNone>
                <Label>{t('adminPay.status')}</Label>
                <SelectOne
                  checkList={checkList}
                  setCheckList={setCheckList}
                  idx={6}
                  values={[t('adminPay.filter.disagree'), t('adminPay.filter.agree')]}
                />
              </SelectWrapTwo>
            </SelectContainerInnerPaid>
            <Styled.Buttons>
              <Button danger onClick={submitApproval}>
                {t('adminUsers.apply')}
              </Button>
              <Button dangerOutline onClick={clear}>
                {t('adminUsers.reset')}
              </Button>
            </Styled.Buttons>
          </SelectContainer>
        </CSSTransition>
      </FilterBlock>

      <Card>
        <Styled.PaymentsTable>
          <Styled.TableHead>
            <Styled.TableHeadItem>№</Styled.TableHeadItem>
            <Styled.TableHeadItem>{t('adminPay.table.user')}</Styled.TableHeadItem>
            <Styled.TableHeadItem>{t('adminPay.table.name')}</Styled.TableHeadItem>
            <Styled.TableHeadItem>{t('adminPay.table.procent')}</Styled.TableHeadItem>
            <Styled.TableHeadItem>{t('adminPay.table.datePay')}</Styled.TableHeadItem>
            <Styled.TableHeadItem>{t('adminPay.table.profit')}</Styled.TableHeadItem>
            <Styled.TableHeadItem>{t('adminPay.table.openDate')}</Styled.TableHeadItem>
            <Styled.TableHeadItem>{t('adminPay.table.contribution')}</Styled.TableHeadItem>
            <Styled.TableHeadItem>{t('adminPay.table.payments')}</Styled.TableHeadItem>
            <Styled.TableHeadItem>
              <BurgerButton>
                <BurgerImg
                  src={burgerGroup}
                  alt="burger"
                  onClick={() => setSortingWindowOpen((prev) => !prev)}
                />
              </BurgerButton>
              <Window open={sortingWindowOpen}>
                <WindowTitle>Сортировка</WindowTitle>
                <WindowBody>
                  {listForSorting.map((obj, index) => (
                    <Sort
                      active={listForSorting[index].active}
                      key={index}
                      onClick={() => getActiveSort(index)}
                    >
                      {obj.text}
                    </Sort>
                  ))}
                </WindowBody>
              </Window>
            </Styled.TableHeadItem>
          </Styled.TableHead>
          {depositList.length ? (
            <Scrollbars style={{ height: '500px' }}>
              {depositList.map((item: PaymentsCollection, idx: number) => (
                <DepositList
                  idx={idx + (currentPage - 1) * pageLength}
                  key={item.safeId}
                  data={item}
                  adjustPay={adjustPay}
                  confirmPay={confirmPay}
                  unConfirmPay={unConfirmPay}
                />
              ))}
            </Scrollbars>
          ) : loading ? (
            <Loading />
          ) : (
            <Styled.NotFound>{t('notFound')}</Styled.NotFound>
          )}
        </Styled.PaymentsTable>
      </Card>

      <Pagination
        pageLength={pageLength}
        setPageLength={setPageLength}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalLottery={totalDeposits}
      />
      <Notification onDelete={onDelete} data={notifications} />
    </>
  );
};

const Window = styled(SortingWindow)`
  right: 30px;
  top: 64px;
  @media (min-width: 576px) and (max-width: 992px) {
    top: 50px;
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
  &:nth-child(5) {
    @media (max-width: 1100px) {
      display: none;
    }
  }
  &:nth-child(6) {
    @media (max-width: 1100px) {
      display: none;
    }
  }
  &:nth-child(7) {
    @media (max-width: 576px) {
      display: none;
    }
  }
  &:nth-child(8) {
    @media (max-width: 576px) {
      display: none;
    }
  }
`;
