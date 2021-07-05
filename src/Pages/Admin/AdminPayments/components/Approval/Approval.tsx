import React, { FC, useContext, useEffect, useState } from 'react';
import { Scrollbars } from 'react-custom-scrollbars';
import { useTranslation } from 'react-i18next';
import ReactNotification from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';
import { CSSTransition } from 'react-transition-group';
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
import {
  PaymentsCollection,
  RootPayments,
} from '../../../../../types/payments';
import { DepositList } from '../../../AdminPay/DepositList';
import { Pagination } from '../../../Pagination';
import {
  FilterBlock,
  FilterHeader,
  FilterName,
  Input,
  Label,
  SelectContainer,
  SelectContainerInnerPaid,
  SelectWrapTwo,
  ShowHide,
} from '../../../Styled.elements';
import * as Styled from './Styled.elements';

type Props = {
  listDeposits: CollectionListDeposits[];
  getPaymentsOverview: () => void;
  procent: string;
  setProcent: (e: string) => void;
};

export const Approval: FC<Props> = ({
  listDeposits,
  getPaymentsOverview,
  setProcent,
  procent,
}) => {
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

  const depositState = checkList.length
    ? checkList.map((i: any) => i.id)
    : [5, 6];

  const namesProgramApproval = checkListApproval.map((i: any) => i.safeId);
  const idProgramApproval = listDeposits.filter((i) =>
    namesProgramApproval.includes(i.safeId),
  );
  const searchSafeIDApproval = idProgramApproval.map((i) => i.safeId);

  const [sortingWindowOpen, setSortingWindowOpen] = useState(false);
  const [sorting, setSorting] = useState([
    // {
    //   ConditionWeight: 1,
    //   OrderType: 0,
    //   FieldName: 'userName',
    // },
    // {
    //   ConditionWeight: 1,
    //   OrderType: 1,
    //   FieldName: 'deposit.name',
    // },
    // {
    // ConditionWeight: 1,
    // OrderType: 0,
    // FieldName: 'payAmount',
    // },
    // {
    //   ConditionWeight: 1,
    //   OrderType: 1,
    //   FieldName: 'baseAmount',
    // },
    // {
    //   ConditionWeight: 1,
    //   OrderType: 1,
    //   FieldName: 'paymentDate',
    // },
    // {
    //   ConditionWeight: 1,
    //   OrderType: 1,
    //   FieldName: 'deposit.paymentRatio',
    // },
    // {
    //   ConditionWeight: 1,
    //   OrderType: 1,
    //   FieldName: 'creationDate',
    // },
    // {
    //   ConditionWeight: 1,
    //   OrderType: 1,
    //   FieldName: 'baseAmountView',
    // },
    // {
    //   ConditionWeight: 1,
    //   OrderType: 1,
    //   FieldName: 'payAmount',
    // },
  ]);

  const resorting = (name: string) => {
    const one = sorting.find((item: any) => item.FieldName === name);

    if (one) {
      setSorting((prev: any) => {
        return prev?.map((item: any) => {
          if (item.FieldName === name) {
            return {
              ...item,
              ConditionWeight: 2,
              OrderType: item.OrderType === 1 ? 2 : 1,
            };
          } else {
            return {
              ...item,
              ConditionWeight: 1,
            };
          }
        });
      });
    } else {
      setSorting((prev: any) => {
        const newPrev = prev?.map((item: any) => ({
          ...item,
          ConditionWeight: 1,
        }));
        newPrev.push({
          ConditionWeight: 2,
          OrderType: 1,
          FieldName: name,
        });
        return newPrev;
      });
    }
  };

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
          (currentPage - 1) * pageLength,
          pageLength,
          sorting,
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

    if (hubConnection && depositList.length < totalDeposits) {
      console.log(1111);
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
          null,
          (currentPage - 1) * pageLength,
          pageLength,
          sorting,
        )
        .then((res) => {
          console.log('~~~~~~~~~~~~~~~~~~~~~~~~', res);
          setTotalDeposits(res.totalRecords);
          if (res.collection.length) {
            setDepositList([...res.collection]);
            setCount(true);
            setNum(num + 20);
          }
        })
        .catch((err: Error) => console.log(err));
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
          null,
          (currentPage - 1) * pageLength,
          pageLength,
        )
        .then((res) => {
          setDepositList([]);
          setTotalDeposits(res.totalRecords);
          if (res.collection.length) {
            setDepositList(res.collection);
            setTotalDeposits(res.totalRecords);
          }
        })
        .catch((err: Error) => console.log(err));
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
    if (depositList.some((item) => item.state === 6)) {
      if (hubConnection) {
        hubConnection
          .invoke(
            'ConfirmAllDepositsPayment',
            nameApproval ? nameApproval.toLowerCase() : null,
            openDateApproval.from ? openDateApproval.from : null,
            openDateApproval.to ? openDateApproval.to : null,
            searchSafeIDApproval.length ? searchSafeIDApproval : null,
            procent ? +procent / 100 : null,
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
    console.log('clear');
    setNameApproval('');
    setOpenDateApproval({
      from: undefined,
      to: undefined,
    });
    setCheckListApproval([]);
    setCheckList([]);
  };

  type Values = { text: string; active: boolean };
  type ListForSortingType = {
    userHigh: Values;
    userLow: Values;
    nameHigh: Values;
    nameLow: Values;
    openDate: Values;
    closeDate: Values;
    descendingAmount: Values;
  };
  const [listForSorting, setListForSorting] = useState<any>([
    { text: 'Пользователь: От А до Я', active: false },
    { text: 'Пользователь: От Я до А', active: false },
    { text: 'Название: От А до Я', active: false },
    { text: 'Название: От Я до А', active: false },
    { text: 'По дате открытия', active: false },
    { text: 'По дате закрытия', active: false },
    { text: 'По убыванию суммы вклада', active: false },
  ]);

  const getActiveSort = (index: number) => {
    setListForSorting((prev: any) => {
      return prev.map((one: any, i: number) => {
        return {
          ...one,
          active: index === i ? true : false,
        };
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
            if (
              e.target.value.match(/^[\d]*\.?[\d]*$/g) ||
              e.target.value === ''
            )
              setProcent(e.target.value);
          }}
          label={t('adminPay.procentPay')}
        />
      </Styled.ButtonWrap>

      <FilterBlock>
        <FilterHeader>
          <FilterName>{t('adminDeposit.filter')}</FilterName>
          <ShowHide onClick={() => setOpenFilterOne(!openFilterOne)}>
            {openFilterOne ? t('hide') : t('show')}
          </ShowHide>
        </FilterHeader>
        <CSSTransition
          in={openFilterOne}
          timeout={200}
          classNames="filter"
          unmountOnExit>
          <SelectContainer>
            <SelectContainerInnerPaid>
              <SelectWrapTwo mWidth="154px">
                <Label>{t('adminPay.filter.user')}</Label>
                <Input
                  value={nameApproval}
                  onChange={(e) =>
                    setNameApproval(e.target.value.toLowerCase())
                  }
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
                  values={[
                    t('adminPay.filter.disagree'),
                    t('adminPay.filter.agree'),
                  ]}
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
            <Styled.TableHeadItem onClick={() => resorting('userName')}>
              {t('adminPay.table.user')}
            </Styled.TableHeadItem>
            <Styled.TableHeadItem>
              {t('adminPay.table.name')}
            </Styled.TableHeadItem>
            <Styled.TableHeadItem>
              {t('adminPay.table.procent')}
            </Styled.TableHeadItem>
            <Styled.TableHeadItem onClick={() => resorting('paymentDate')}>
              {t('adminPay.table.datePay')}
            </Styled.TableHeadItem>
            <Styled.TableHeadItem>
              {t('adminPay.table.profit')}
            </Styled.TableHeadItem>
            <Styled.TableHeadItem onClick={() => resorting('creationDate')}>
              {t('adminPay.table.openDate')}
            </Styled.TableHeadItem>
            <Styled.TableHeadItem onClick={() => resorting('BaseAmountпо')}>
              {t('adminPay.table.contribution')}
            </Styled.TableHeadItem>
            <Styled.TableHeadItem onClick={() => resorting('payAmount')}>
              {t('adminPay.table.payments')}
            </Styled.TableHeadItem>
            <Styled.BurgerButton>
              <Styled.BurgerImg
                src={burgerGroup}
                alt="burger"
                onClick={() => setSortingWindowOpen((prev) => !prev)}
              />
            </Styled.BurgerButton>
            <Styled.SortingWindow open={sortingWindowOpen}>
              <Styled.WindowTitle>Сортировка</Styled.WindowTitle>
              <Styled.WindowBody>
                {/* <Styled.SortingItem>Пользователь: От А до Я</Styled.SortingItem>
                <Styled.SortingItem>Пользователь: От Я до А</Styled.SortingItem>
                <Styled.SortingItem>Название: От А до Я</Styled.SortingItem>
                <Styled.SortingItem>Название: От Я до А</Styled.SortingItem>
                <Styled.SortingItem>По дате открытия</Styled.SortingItem>
                <Styled.SortingItem>По дате закрытия</Styled.SortingItem>
                <Styled.SortingItem>
                  По убыванию суммы вклада
                </Styled.SortingItem> */}

                {listForSorting.map((obj: any, index: number) => (
                  <Styled.SortingItem
                    active={listForSorting[index].active}
                    key={index}
                    onClick={() => getActiveSort(index)}>
                    {obj.text}
                  </Styled.SortingItem>
                ))}
              </Styled.WindowBody>
            </Styled.SortingWindow>
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
          <Notification onDelete={onDelete} data={notifications} />
        </Styled.PaymentsTable>
      </Card>

      <Pagination
        pageLength={pageLength}
        setPageLength={setPageLength}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalLottery={totalDeposits}
      />
    </>
  );
};
