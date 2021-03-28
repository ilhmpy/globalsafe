import React, { useState, useEffect, useContext, FC } from "react";
import * as Styled from "./Styled.elements";
import styled, { css } from "styled-components/macro";
import { SideNavbar } from "../../components/SideNav";
import { Card } from "../../globalStyles";
import { UpTitle } from "../../components/UI/UpTitle";
import { ReactComponent as Exit } from "../../assets/svg/exit.svg";
import { ReactComponent as Filter } from "../../assets/svg/filter.svg";
import { Select } from "../../components/Select/Select";
import useWindowSize from "../../hooks/useWindowSize";
import { TestInput } from "../../components/UI/DayPicker";
import { Button } from "../../components/Button/Button";
// import { Checkbox } from "../../components/UI/Checkbox";
import { AppContext } from "../../context/HubContext";
import { OpenDate } from "../../types/dates";
import {
  DepositStats,
  ListDeposits,
  CollectionListDeposits,
} from "../../types/deposits";
import { Header } from "../../components/Header/Header";
import { RootUsers, CollectionUsers } from "../../types/users";
import { Loading } from "../../components/UI/Loading";
import { Scrollbars } from "react-custom-scrollbars";
import InfiniteScroll from "react-infinite-scroller";
import { ModalUsers } from "./AdminPay/Payments";
import { CSSTransition } from "react-transition-group";
import { Redirect } from "react-router-dom";
import moment from "moment";
import { LockButton, UnLockButton } from "../../components/UI/RoundButton";

type PropsTable = {
  lockAccount: (id: string) => void;
  unLockAccount: (id: string) => void;
  data: CollectionUsers;
};

const UserTable: FC<PropsTable> = ({ data, unLockAccount, lockAccount }) => {
  const [lock, setLock] = useState(
    data.lockoutEnd &&
      moment(data.lockoutEnd).valueOf() >= moment.utc().valueOf()
  );
  const [open, setOpen] = useState(false);

  const onClose = () => {
    setOpen(false);
  };

  const modalOpen = (e: React.MouseEvent) => {
    e.stopPropagation();
    setOpen(true);
  };
  const sizes = useWindowSize();
  const size = sizes < 992;

  const locked = (e: any, id: string) => {
    e.preventDefault();
    e.stopPropagation();
    setLock(true);
    lockAccount(id);
  };

  const unLocked = (e: any, id: string) => {
    e.preventDefault();
    e.stopPropagation();
    setLock(false);
    unLockAccount(id);
  };

  return (
    <div>
      <CSSTransition in={open} timeout={300} classNames="modal" unmountOnExit>
        <ModalUsers
          onClose={onClose}
          data={data}
          lock={lock}
          unLocked={unLocked}
          locked={locked}
        />
      </CSSTransition>
      <TableBody onClick={modalOpen}>
        <TableBodyItem>{data.name}</TableBodyItem>
        <TableBodyItem>
          {data.balances.length
            ? (data.balances[0].volume / 100000).toLocaleString()
            : "-"}
        </TableBodyItem>
        <TableBodyItem>
          {data.roles.length ? data.roles[0].name : "-"}
        </TableBodyItem>
        <TableBodyItem>
          {moment(data.creationDate).format("DD/MM/YYYY")}
        </TableBodyItem>
        <TableBodyItem>Русский</TableBodyItem>
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
              }}
            >
              Разблокировать
            </Button>
          ) : (
            <Button
              dangerOutline
              onClick={(e) => {
                locked(e, data.safeId);
              }}
            >
              Заблокировать
            </Button>
          )}
        </TableBodyItem>
      </TableBody>
    </div>
  );
};

export const AdminUsers = () => {
  const [name, setName] = useState("");
  const [openDate, setOpenDate] = useState<OpenDate>({
    from: undefined,
    to: undefined,
  });
  const [listDeposits, setListDeposits] = useState<CollectionUsers[]>([]);
  const [count, setCount] = useState(true);
  const [num, setNum] = useState(20);
  const [loading, setLoading] = useState(true);
  const [totalUsers, seTotalUsers] = useState(0);
  const appContext = useContext(AppContext);
  const hubConnection = appContext.hubConnection;
  const admin = appContext.isAdmin;
  const logOut = appContext.logOut;
  const user = appContext.user;

  useEffect(() => {
    if (hubConnection) {
      hubConnection
        .invoke<RootUsers>(
          "GetUsers",
          name || null,
          openDate.from || null,
          openDate.to || null,
          0,
          20
        )
        .then((res) => {
          setLoading(false);
          setNum(20);
          seTotalUsers(res.totalRecords);
          setListDeposits(res.collection);
        })
        .catch((err: Error) => {
          setLoading(false);
          console.log(err);
        });
    }
  }, [hubConnection]);

  const submit = () => {
    if (hubConnection) {
      hubConnection
        .invoke<RootUsers>(
          "GetUsers",
          name || null,
          openDate.from || null,
          openDate.to || null,
          0,
          20
        )
        .then((res) => {
          setListDeposits([]);
          setLoading(false);
          setNum(20);
          seTotalUsers(res.totalRecords);
          setListDeposits(res.collection);
        })
        .catch((err: Error) => {
          setLoading(false);
          console.log(err);
        });
    }
  };

  const myLoad = () => {
    setCount(false);
    if (hubConnection && listDeposits.length < totalUsers) {
      hubConnection
        .invoke<RootUsers>(
          "GetUsers",
          name || null,
          openDate.from || null,
          openDate.to || null,
          num,
          20
        )
        .then((res) => {
          if (res.collection.length) {
            setLoading(false);
            setListDeposits([...listDeposits, ...res.collection]);
            setCount(true);
            setNum(num + 20);
          }
        })
        .catch((err: Error) => console.log(err));
    }
  };

  const lockAccount = (id: string) => {
    if (hubConnection) {
      hubConnection
        .invoke("LockAccount", id)
        .then((res) => {
          console.log("LockAccount", res);
        })
        .catch((err: Error) => console.log(err));
    }
  };

  const unLockAccount = (id: string) => {
    if (hubConnection) {
      hubConnection
        .invoke("UnlockAccount", id)
        .then((res) => {
          console.log("UnlockAccount", res);
        })
        .catch((err: Error) => console.log(err));
    }
  };

  // if (admin === false) {
  //   return <Redirect to="/" />;
  // }

  return (
    <>
      <Styled.HeadBlock>
        <UpTitle small>Пользователи</UpTitle>
        <Styled.UserName>
          <span>{user}</span>
          <Exit onClick={logOut} />
        </Styled.UserName>
      </Styled.HeadBlock>
      <Styled.FilterBlock>
        <Styled.SelectContainer>
          <Styled.SelectWrap>
            <Styled.Label>Пользователь</Styled.Label>
            <Input value={name} onChange={(e) => setName(e.target.value)} />
          </Styled.SelectWrap>
          <Styled.InputsWrap>
            <TestInput
              setOpenDate={setOpenDate}
              openDate={openDate}
              label="Дата создания"
            />
          </Styled.InputsWrap>

          <Button danger onClick={submit}>
            Применить
          </Button>
        </Styled.SelectContainer>
      </Styled.FilterBlock>
      <Card>
        <PaymentsTable>
          <TableHead>
            <TableHeadItem>Пользователь</TableHeadItem>
            <TableHeadItem>Баланс</TableHeadItem>
            <TableHeadItem>Роль</TableHeadItem>
            <TableHeadItem>Дата создания</TableHeadItem>
            <TableHeadItem>Язык</TableHeadItem>
            <TableHeadItem>{/* <Filter /> */}</TableHeadItem>
          </TableHead>
          {listDeposits.length ? (
            <Scrollbars style={{ height: "500px" }}>
              <InfiniteScroll
                pageStart={0}
                loadMore={myLoad}
                hasMore={count}
                useWindow={false}
                loader={
                  <div className="loader" key={0}>
                    Loading ...
                  </div>
                }
              >
                {listDeposits.map((item) => (
                  <UserTable
                    data={item}
                    key={item.safeId}
                    unLockAccount={unLockAccount}
                    lockAccount={lockAccount}
                  />
                ))}
              </InfiniteScroll>
            </Scrollbars>
          ) : loading ? (
            <Loading />
          ) : (
            <NotFound>
              Данные не обнаружены. Попробуйте изменить параметры поиска.
            </NotFound>
          )}
        </PaymentsTable>
      </Card>
      {/* </Styled.Content>
      </Styled.Wrapper> */}
    </>
  );
};

const NotFound = styled.div`
  font-weight: normal;
  font-size: 12px;
  line-height: 21px;
  padding: 30px;
  letter-spacing: 0.1px;
  min-height: 250px;
  color: #0e0d3d;
`;

const InputsWrapItem = styled.div`
  margin-right: 10px;
  width: 100%;
  @media (max-width: 576px) {
    margin-right: 0px;
  }
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
  color: #515172;
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
  color: rgba(81, 81, 114, 0.6);
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
    max-width: 130px;
    text-align: right;
    @media (max-width: 992px) {
      max-width: 40px;
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
  color: #515172;
`;

const TableBodyItem = styled(TableHeadItem)`
  ${TableBodyItemCss}
`;
