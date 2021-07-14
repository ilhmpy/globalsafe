import moment from 'moment';
import React, { FC, useCallback, useContext, useEffect, useState } from 'react';
import { Scrollbars } from 'react-custom-scrollbars';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';
import styled, { css } from 'styled-components/macro';
import burgerGroup from '../../assets/img/burgerGroup.png';
import { ReactComponent as Exit } from '../../assets/svg/exit.svg';
import { Button } from '../../components/Button/Button';
import { TestInput } from '../../components/UI/DayPicker';
import { Loading } from '../../components/UI/Loading';
import { LockButton, UnLockButton } from '../../components/UI/RoundButton';
import { UpTitle } from '../../components/UI/UpTitle';
// import { Checkbox } from "../../components/UI/Checkbox";
import { AppContext } from '../../context/HubContext';
import { Card } from '../../globalStyles';
import useWindowSize from '../../hooks/useWindowSize';
import { OpenDate } from '../../types/dates';
import {
  CollectionCharges,
  PaymentsCollection,
  RootCharges,
  RootPayments,
} from '../../types/payments';
import { SelectValues, SortingType } from '../../types/sorting';
import { CollectionUsers, RootUsers } from '../../types/users';
import { ModalUsers } from './AdminPay/Payments';
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

type PropsTable = {
  lockAccount: (id: string) => void;
  unLockAccount: (id: string) => void;
  data: CollectionUsers;
};

const UserTable: FC<PropsTable> = ({ data, unLockAccount, lockAccount }) => {
  const [lock, setLock] = useState(
    data.lockoutEnd &&
      moment(data.lockoutEnd).valueOf() >= moment.utc().valueOf(),
  );
  const [open, setOpen] = useState(false);
  const [dataOne, setDataOne] = useState<CollectionCharges[]>([]);
  const [dataTwo, setDataTwo] = useState<PaymentsCollection[]>([]);
  const appContext = useContext(AppContext);
  const hubConnection = appContext.hubConnection;
  const { t } = useTranslation();
  const history = useHistory();
  const onClose = () => {
    setOpen(false);
  };

  const onClick = () => {
    if (window.innerWidth < 992) {
      history.push(`/admin/users/${data.name}`);
    } else {
      setOpen(true);
    }
  };

  const getDepositsCharges = useCallback(() => {
    if (hubConnection) {
      hubConnection
        .invoke<RootCharges>(
          'GetDepositsCharges',
          data.name.toLowerCase(),
          null,
          null,
          null,
          null,
          [7],
          0,
          80,
        )
        .then((res) => {
          setDataOne(res.collection);
        })
        .catch((err: Error) => {
          console.log(err);
        });
    }
  }, [hubConnection]);

  const getUsersDeposits = useCallback(() => {
    if (hubConnection) {
      hubConnection
        .invoke<RootPayments>(
          'GetUsersDeposits',
          [1, 2, 3, 4, 5, 6],
          data.name.toLowerCase(),
          null,
          null,
          null,
          null,
          null,
          null,
          0,
          80,
        )
        .then((res) => {
          setDataTwo(res.collection);
        })
        .catch((err: Error) => {
          console.log(err);
        });
    }
  }, [hubConnection]);

  useEffect(() => {
    getDepositsCharges();
    getUsersDeposits();
  }, [getDepositsCharges, getUsersDeposits]);

  const modalOpen = (e: React.MouseEvent) => {
    e.stopPropagation();
    onClick();
  };
  const sizes = useWindowSize();
  const size = sizes < 992;

  const locked = (e: any, id: string) => {
    e.stopPropagation();
    setLock(true);
    lockAccount(id);
  };

  const unLocked = (e: any, id: string) => {
    e.stopPropagation();
    setLock(false);
    unLockAccount(id);
  };

  const adjustBalanceAsync = (
    userSafeId: string,
    delta: number,
    safeOperationId: string,
  ) => {
    if (hubConnection) {
      hubConnection
        .invoke('AdjustBalanceAsync', userSafeId, delta, safeOperationId)
        .then((res) => {
          getDepositsCharges();
          getUsersDeposits();
        })
        .catch((e) => console.log(e));
    }
  };

  const balance = data.balances
    ? data.balances.filter((item) => item.balanceKind === 1)
    : null;

  return (
    <div>
      <CSSTransition in={open} timeout={300} classNames="modal" unmountOnExit>
        <ModalUsers
          onClose={onClose}
          data={data}
          lock={lock}
          unLocked={unLocked}
          locked={locked}
          dataOne={dataOne}
          dataTwo={dataTwo}
          adjustBalanceAsync={adjustBalanceAsync}
        />
      </CSSTransition>
      <TableBody onClick={modalOpen}>
        <TableBodyItem>{data.name}</TableBodyItem>
        <TableBodyItem>
          {balance?.length
            ? (balance[0].volume / 100000).toLocaleString('ru-RU', {
                maximumFractionDigits: 2,
              })
            : '-'}
        </TableBodyItem>
        <TableBodyItem>
          {data.roles.length ? data.roles[0].name : '-'}
        </TableBodyItem>
        <TableBodyItem>
          {moment(data.creationDate).format('DD/MM/YYYY')}
        </TableBodyItem>
        <TableBodyItem>Русский</TableBodyItem>
        <TableBodyItem>{data.depositsAmount}</TableBodyItem>
        <TableBodyItem>
          {size ? (
            lock ? (
              <UnLockButton onClick={(e) => unLocked(e, data.safeId)} />
            ) : (
              <LockButton onClick={(e) => locked(e, data.safeId)} />
            )
          ) : lock ? (
            <Button
              greenOutline
              onClick={(e) => {
                unLocked(e, data.safeId);
              }}>
              {t('adminUsers.table.unlock')}
            </Button>
          ) : (
            <Button
              dangerOutline
              onClick={(e) => {
                locked(e, data.safeId);
              }}>
              {t('adminUsers.table.lock')}
            </Button>
          )}
        </TableBodyItem>
      </TableBody>
    </div>
  );
};

export const AdminUsers = () => {
  const [name, setName] = useState('');
  const [openDate, setOpenDate] = useState<OpenDate>({
    from: undefined,
    to: undefined,
  });
  const [listDeposits, setListDeposits] = useState<CollectionUsers[]>([]);
  const [count, setCount] = useState(true);
  const [num, setNum] = useState(20);
  const [loading, setLoading] = useState(true);
  const [totalUsers, seTotalUsers] = useState(0);
  const [open, setOpen] = useState(false);
  const appContext = useContext(AppContext);
  const hubConnection = appContext.hubConnection;
  const logOut = appContext.logOut;
  const user = appContext.user;
  const { t } = useTranslation();
  const backDays: any = moment().subtract(30, 'days');
  const [pageLength, setPageLength] = useState<number>(10);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const [sortingWindowOpen, setSortingWindowOpen] = useState(false);
  const [sorting, setSorting] = useState<SortingType[]>([]);
  const [listForSorting, setListForSorting] = useState<SelectValues[]>([
    {
      text: 'Пользователь: От А до Я',
      active: false,
      OrderType: 1,
      FieldName: 'name',
    },
    {
      text: 'Пользователь: От Я до А',
      active: false,
      OrderType: 2,
      FieldName: 'name',
    },
    {
      text: 'По убыванию баланса',
      active: false,
      OrderType: 2,
      FieldName: 'balances',
    },
    {
      text: 'По возрастанию баланса',
      active: false,
      OrderType: 1,
      FieldName: 'balances',
    },
    {
      text: 'По убыванию даты создания',
      active: false,
      OrderType: 2,
      FieldName: 'creationDate',
    },
    {
      text: 'По возрастанию даты создания',
      active: false,
      OrderType: 1,
      FieldName: 'creationDate',
    },

    {
      text: 'По убыванию суммы депозита',
      active: false,
      OrderType: 2,
      FieldName: 'depositsAmount',
    },
    {
      text: 'По возрастанию суммы депозита',
      active: false,
      OrderType: 1,
      FieldName: 'depositsAmount',
    },
  ]);

  useEffect(() => {
    if (hubConnection) {
      setLoading(true);
      hubConnection
        .invoke<RootUsers>(
          'GetUsers',
          name.toLowerCase() || null,
          openDate.from ? openDate.from : null,
          openDate.to ? openDate.to : null,
          (currentPage - 1) * pageLength,
          pageLength,
          sorting,
        )
        .then((res) => {
          setLoading(false);
          setNum(20);
          console.log('USERS', res.collection);
          seTotalUsers(res.totalRecords);
          setListDeposits(res.collection);
          setLoading(false);
        })
        .catch((err: Error) => {
          setLoading(false);
          console.error(err);
        });
    }
  }, [hubConnection, currentPage, pageLength, sorting]);

  const submit = () => {
    if (hubConnection) {
      setLoading(true);
      setCurrentPage(1);
      hubConnection
        .invoke<RootUsers>(
          'GetUsers',
          name.toLowerCase() || null,
          openDate.from ? openDate.from : null,
          openDate.to ? openDate.to : null,
          (currentPage - 1) * pageLength,
          pageLength,
          sorting,
        )
        .then((res) => {
          setListDeposits([]);
          setNum(20);
          seTotalUsers(res.totalRecords);
          setListDeposits(res.collection);
          setLoading(false);
        })
        .catch((err: Error) => {
          setLoading(false);
          console.log(err);
        });
    }
  };

  const lockAccount = (id: string) => {
    if (hubConnection) {
      hubConnection
        .invoke('LockAccount', id)
        .then((res) => {
          console.log('LockAccount', res);
        })
        .catch((err: Error) => console.log(err));
    }
  };

  const unLockAccount = (id: string) => {
    if (hubConnection) {
      hubConnection
        .invoke('UnlockAccount', id)
        .then((res) => {
          console.log('UnlockAccount', res);
        })
        .catch((err: Error) => console.log(err));
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
      <Styled.HeadBlock>
        <UpTitle small>{t('adminUsers.uptitle')}</UpTitle>
        <Styled.UserName>
          <span>{user}</span>
          <Exit onClick={logOut} />
        </Styled.UserName>
      </Styled.HeadBlock>
      <Styled.FilterBlock>
        <Styled.FilterHeader>
          <Styled.FilterName>{t('adminDeposit.filter')}</Styled.FilterName>
          <Styled.ShowHide onClick={() => setOpen(!open)}>
            {open ? t('hide') : t('show')}
          </Styled.ShowHide>
        </Styled.FilterHeader>
        <CSSTransition
          in={open}
          timeout={200}
          classNames="filter"
          unmountOnExit>
          <Styled.SelectContainer>
            <Styled.SelectContainerInnerUsers>
              <Styled.SelectWrap style={{ minWidth: 280 }}>
                <Styled.Label>{t('adminUsers.labelUser')}</Styled.Label>
                <Input
                  value={name}
                  onChange={(e) => setName(e.target.value.toLowerCase())}
                />
              </Styled.SelectWrap>
              <Styled.SelectWrap input>
                <TestInput
                  setOpenDate={setOpenDate}
                  openDate={openDate}
                  label={t('adminUsers.labelCreate')}
                />
              </Styled.SelectWrap>
            </Styled.SelectContainerInnerUsers>
            <Button danger onClick={submit}>
              {t('adminUsers.apply')}
            </Button>
          </Styled.SelectContainer>
        </CSSTransition>
      </Styled.FilterBlock>
      <Card smallBorder>
        <PaymentsTable>
          <TableHead>
            <TableHeadItem>{t('adminUsers.table.user')}</TableHeadItem>
            <TableHeadItem>{t('adminUsers.table.balans')}</TableHeadItem>
            <TableHeadItem>{t('adminUsers.table.role')}</TableHeadItem>
            <TableHeadItem>{t('adminUsers.table.dataCreate')}</TableHeadItem>
            <TableHeadItem>{t('adminUsers.table.lang')}</TableHeadItem>
            <TableHeadItem>{t('adminUsers.table.depositSum')}</TableHeadItem>
            <TableHeadItem>
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
                      onClick={() => getActiveSort(index)}>
                      {obj.text}
                    </Sort>
                  ))}
                </WindowBody>
              </Window>
            </TableHeadItem>
          </TableHead>
          {listDeposits.length ? (
            <Scrollbars style={{ height: '500px' }}>
              {listDeposits.map((item) => (
                <UserTable
                  data={item}
                  key={item.safeId}
                  unLockAccount={unLockAccount}
                  lockAccount={lockAccount}
                />
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
        totalLottery={totalUsers}
      />
    </>
  );
};

const Window = styled(SortingWindow)`
  right: 64px;
  top: 226px;
  @media (max-width: 992px) {
    top: 230px;
  }
  @media (max-width: 768px) {
    top: 210px;
    right: 50px;
  }
`;
const Sort = styled(SortingItem)`
  &:nth-child(3) {
    @media (max-width: 992px) {
      display: none;
    }
  }
  &:nth-child(4) {
    @media (max-width: 992px) {
      display: none;
    }
  }
`;

const InputsWrapItem = styled.div`
  margin-right: 10px;
  width: 100%;
  @media (max-width: 576px) {
    margin-right: 0px;
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

const Input = styled.input`
  width: 100%;
  border: 1px solid rgba(86, 101, 127, 0.3);
  box-sizing: border-box;
  border-radius: 2px;
  min-height: 40px;
  padding: 8px;
  font-weight: normal;
  font-size: 14px;
  line-height: 21px;
  letter-spacing: 0.1px;
  background: transparent;
  color: ${(props) => props.theme.text2};
  &:focus {
    outline: none;
  }
`;

const PaymentsTable = styled.div`
  padding: 30px;
`;

const TableHead = styled.ul`
  list-style: none;
  display: flex;
  align-items: center;
  width: 100%;
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
    max-width: 97px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  &:nth-child(2) {
    max-width: 110px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    @media (max-width: 992px) {
      display: none;
    }
  }
  &:nth-child(3) {
    max-width: 110px;
    @media (max-width: 768px) {
      max-width: 80px;
    }
    @media (max-width: 576px) {
      display: none;
    }
  }
  &:nth-child(4) {
    max-width: 100px;
  }
  &:nth-child(5) {
    max-width: 90px;
    @media (max-width: 992px) {
      max-width: 80px;
    }
    @media (max-width: 768px) {
      display: none;
    }
  }
  &:nth-child(6) {
    max-width: 100px;
    @media (max-width: 992px) {
      max-width: 40px;
      display: none;
    }
  }
  &:nth-child(7) {
    max-width: 130px;
    text-align: right;
    @media (max-width: 992px) {
      max-width: 80px;
    }
  }
  &:last-child {
    @media only screen and (max-device-width: 992px) {
      text-align: center;
    }
  }
`;

const TableBody = styled(TableHead)`
  padding: 10px 0;
  cursor: pointer;
  transition: 0.3s;
  &:hover {
    background: rgba(66, 139, 202, 0.109);
  }
`;

const TableBodyItemCss = css`
  font-weight: normal;
  font-size: 14px;
  line-height: 16px;
  color: ${(props) => props.theme.text2};
`;

const TableBodyItem = styled(TableHeadItem)`
  ${TableBodyItemCss}
`;
