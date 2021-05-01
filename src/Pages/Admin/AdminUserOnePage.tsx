import React, { useState, useEffect, useContext, FC } from "react";
import * as Styled from "./Styled.elements";
import styled, { css } from "styled-components/macro";
import { UpTitle } from "../../components/UI/UpTitle";
import { ReactComponent as Exit } from "../../assets/svg/exit.svg";
import { Card, Container, ContainerRow } from "../../globalStyles";
import { AppContext } from "../../context/HubContext";
import moment from "moment";
import { RouteComponentProps, useLocation, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Tab, Tabs } from "../../components/UI/Tabs";
import { ModalUsersContent } from "./AdminPay/Payments";
import { RootUsers, CollectionUsers } from "../../types/users";
import {
  RootPayments,
  PaymentsCollection,
  RootCharges,
  CollectionCharges,
} from "../../types/payments";

type PropsMatch = {
  slug: string;
};

export const AdminUserOnePage = ({
  match,
}: RouteComponentProps<PropsMatch>) => {
  const [active, setActive] = useState(0);
  const [dataOne, setDataOne] = useState<CollectionCharges[]>([]);
  const [data, setData] = useState<CollectionUsers[]>([]);
  const [dataTwo, setDataTwo] = useState<PaymentsCollection[]>([]);
  const [lock, setLock] = useState(false);
  const appContext = useContext(AppContext);
  const hubConnection = appContext.hubConnection;
  const logOut = appContext.logOut;
  const user = appContext.user;
  const location = useLocation();
  const safeId = match.params.slug;
  const { t } = useTranslation();

  const handleClick = (id: number) => {
    if (id !== active) {
      setActive(id);
    }
  };

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

  const adjustBalanceAsync = (
    userSafeId: string,
    delta: number,
    safeOperationId: string
  ) => {
    if (hubConnection) {
      hubConnection
        .invoke("AdjustBalanceAsync", userSafeId, delta, safeOperationId)
        .then((res) => {
          console.log("AdjustBalanceAsync", res);
        })
        .catch((e) => console.log(e));
    }
  };

  useEffect(() => {
    if (hubConnection) {
      hubConnection
        .invoke<RootUsers>("GetUsers", safeId, null, null, 0, 1)
        .then((res) => {
          if (res.collection.length) {
            setData(res.collection);
            setLock(
              res.collection[0].lockoutEnd
                ? moment(res.collection[0].lockoutEnd).valueOf() >=
                    moment.utc().valueOf()
                : false
            );
          }
        })
        .catch((err: Error) => {
          console.log(err);
        });
    }
  }, [hubConnection]);

  useEffect(() => {
    if (hubConnection) {
      hubConnection
        .invoke<RootCharges>(
          "GetDepositsCharges",
          safeId,
          null,
          null,
          null,
          null,
          [7],
          0,
          80
        )
        .then((res) => {
          setDataOne(res.collection);
        })
        .catch((err: Error) => {
          console.log(err);
        });
    }
  }, [hubConnection]);

  useEffect(() => {
    if (hubConnection) {
      hubConnection
        .invoke<RootPayments>(
          "GetUsersDeposits",
          [1, 2, 3, 4, 5, 6],
          safeId,
          null,
          null,
          null,
          null,
          null,
          null,
          0,
          80
        )
        .then((res) => {
          setDataTwo(res.collection);
        })
        .catch((err: Error) => {
          console.log(err);
        });
    }
  }, [hubConnection]);

  return (
    <>
      <Styled.HeadBlock>
        <UpTitle small>{t("sideNav.users")}</UpTitle>
        <Styled.UserName>
          <span>{user}</span>
          <Exit onClick={logOut} />
        </Styled.UserName>
      </Styled.HeadBlock>
      <Styled.TitleHead>{t("sideNav.users")}</Styled.TitleHead>
      <Container pNone>
        <Styled.Back to="/admin/users">
          <Styled.LeftIcon />
          {t("backTo")}
        </Styled.Back>
      </Container>
      <Container pNone>
        <Card>
          <SelfTabs>
            <Tab onClick={() => handleClick(0)} active={active === 0}>
              {t("usersTabs.mainInfo")}
            </Tab>
            <Tab onClick={() => handleClick(1)} active={active === 1}>
              {t("usersTabs.deposits")}
            </Tab>
          </SelfTabs>
        </Card>
      </Container>
      <Container pNone>
        {data && data.length && (
          <ModalUsersContent
            data={data[0]}
            dataOne={dataOne}
            adjustBalanceAsync={adjustBalanceAsync}
            unLocked={unLocked}
            locked={locked}
            lock={lock}
            active={active}
            setActive={setActive}
            dataTwo={dataTwo}
            wide={true}
          />
        )}
      </Container>
    </>
  );
};

const SelfTabs = styled(Tabs)`
  border-radius: 10px;
  ${Tab}:first-child {
    width: 155px;
  }
`;
