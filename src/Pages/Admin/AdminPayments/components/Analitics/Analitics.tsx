import React, { useContext, useEffect, useState, FC } from "react";
import { Scrollbars } from "react-custom-scrollbars";
import InfiniteScroll from "react-infinite-scroller";
import { useTranslation } from "react-i18next";
import { AppContext } from "../../../../../context/HubContext";
import { Card } from "../../../../../globalStyles";
import { TestInput } from "../../../../../components/UI/DayPicker";
import { Select } from "../../../../../components/Select/Select2";
import { Button } from "../../../../../components/Button/Button";
import moment from "moment";
import {
  FilterBlock,
  FilterHeader,
  ShowHide,
  FilterName,
  SelectContainer,
  SelectWrap,
  SelectContainerInnerPaid,
  Label,
  Input,
} from "../../../Styled.elements";

import { OpenDate } from "../../../../../types/dates";
import {
  CollectionListDeposits,
  ListDeposits,
} from "../../../../../types/deposits";
import { Loading } from "../../../../../components/UI/Loading";
import { CSSTransition } from "react-transition-group";
import * as Styled from "./Styled.elements";
import {
  RootAnalitics,
  CollectionAnalitics,
} from "../../../../../types/analitics";
import { ModalAnalitic } from "../../../AdminPay/Payments";

type Props = {
  listDeposits: CollectionListDeposits[];
};

export const Analitics: FC<Props> = ({ listDeposits }) => {
  const [loading, setLoading] = useState(true);
  const [openDate, setOpenDate] = useState<OpenDate>({
    from: undefined,
    to: undefined,
  });
  const [list, setList] = useState<CollectionAnalitics[]>([]);
  const [openFilterOne, setOpenFilterOne] = useState(false);
  const [checkList, setCheckList] = useState<any>([]);
  const [count, setCount] = useState(true);
  const [num, setNum] = useState(20);
  const [totalList, setTotalList] = useState(0);
  const [open, setOpen] = useState<CollectionAnalitics | null>(null);
  const appContext = useContext(AppContext);
  const hubConnection = appContext.hubConnection;

  useEffect(() => {
    if (hubConnection) {
      hubConnection
        .invoke<RootAnalitics>(
          "GetPayoutsEstimate",
          searchSafeID.length ? searchSafeID : null,
          openDate.from ? openDate.from : null,
          openDate.to ? openDate.to : null,
          0,
          20
        )
        .then((res) => {
          setLoading(false);
          setList(res.collection);
          setTotalList(res.totalRecords);
          console.log("list", res.collection);
        })
        .catch((e) => {
          console.log(e);
        });
    }
  }, [hubConnection]);

  const myLoad = () => {
    setCount(false);
    if (hubConnection && list.length < totalList) {
      hubConnection
        .invoke<RootAnalitics>(
          "GetPayoutsEstimate",
          searchSafeID.length ? searchSafeID : null,
          openDate.from ? openDate.from : null,
          openDate.to ? openDate.to : null,
          num,
          20
        )
        .then((res) => {
          if (res.collection.length) {
            setList([...list, ...res.collection]);
            setNum(num + 20);
            setCount(true);
          }
        })
        .catch((err: Error) => console.log(err));
    }
  };

  const submit = () => {
    setList([]);
    if (hubConnection) {
      hubConnection
        .invoke<RootAnalitics>(
          "GetPayoutsEstimate",
          searchSafeID.length ? searchSafeID : null,
          openDate.from ? openDate.from : null,
          openDate.to ? openDate.to : null,
          0,
          20
        )
        .then((res) => {
          setList(res.collection);
          setTotalList(res.totalRecords);
          setNum(20);
        })
        .catch((e) => {
          console.log(e);
        });
    }
  };

  const { t } = useTranslation();

  const namesProgram = checkList.map((i: any) => i.safeId);
  const idProgram = listDeposits.filter((i) => namesProgram.includes(i.safeId));
  const searchSafeID = idProgram.map((i) => i.safeId);

  const onClose = () => {
    setOpen(null);
  };

  return (
    <div>
      <FilterBlock>
        <FilterHeader>
          <FilterName>{t("adminDeposit.filter")}</FilterName>
          <ShowHide onClick={() => setOpenFilterOne(!openFilterOne)}>
            {openFilterOne ? t("hide") : t("show")}
          </ShowHide>
        </FilterHeader>
        <CSSTransition
          in={openFilterOne}
          timeout={200}
          classNames="filter"
          unmountOnExit
        >
          <SelectContainer>
            <SelectContainerInnerPaid>
              <SelectWrap style={{ minWidth: 263 }}>
                <Label>{t("adminPay.filter.deposit")}</Label>
                <Select
                  checkList={checkList}
                  setCheckList={setCheckList}
                  values={listDeposits}
                />
              </SelectWrap>
              <SelectWrap input>
                <TestInput
                  setOpenDate={setOpenDate}
                  openDate={openDate}
                  label={t("adminPay.filter.date")}
                />
              </SelectWrap>
            </SelectContainerInnerPaid>
            <Button danger onClick={submit}>
              {t("adminUsers.apply")}
            </Button>
          </SelectContainer>
        </CSSTransition>
      </FilterBlock>
      <Card>
        <CSSTransition
          in={!!open}
          timeout={300}
          classNames="modal"
          unmountOnExit
        >
          <>{open && <ModalAnalitic onClose={onClose} data={open} />}</>
        </CSSTransition>
        <Styled.PaymentsTable>
          <Styled.TableHead>
            <Styled.TableHeadItemPaid>№</Styled.TableHeadItemPaid>
            <Styled.TableHeadItemPaid>
              {t("adminPay.table.name")}
            </Styled.TableHeadItemPaid>
            <Styled.TableHeadItemPaid>
              {t("adminPay.analitics.data")}
            </Styled.TableHeadItemPaid>
            <Styled.TableHeadItemPaid>
              {t("adminPay.analitics.amount")}
            </Styled.TableHeadItemPaid>
            <Styled.TableHeadItemPaid>
              {t("adminPay.analitics.sum")}
            </Styled.TableHeadItemPaid>
            <Styled.TableHeadItemPaid>
              {/* <Filter /> */}
            </Styled.TableHeadItemPaid>
          </Styled.TableHead>
          {list.length ? (
            <Scrollbars style={{ height: "500px" }}>
              <InfiniteScroll
                pageStart={10}
                loadMore={myLoad}
                hasMore={count}
                useWindow={false}
                loader={
                  <div className="loader" key={0}>
                    Loading ...
                  </div>
                }
              >
                {/* {list.map((item) => (
                    <PaymentsList key={item.safeId} data={item} />
                  ))} */}
                {list.map((item, idx) => (
                  <Styled.TableBody
                    key={item.safeId}
                    onClick={() => setOpen(item)}
                  >
                    <Styled.TableBodyItem>{idx + 1}</Styled.TableBodyItem>
                    <Styled.TableBodyItem>
                      {item.deposit.name}
                    </Styled.TableBodyItem>
                    <Styled.TableBodyItem>
                      {moment(item.payoutDate).format("DD/MM/YYYY")}
                    </Styled.TableBodyItem>
                    <Styled.TableBodyItem>{item.count}</Styled.TableBodyItem>
                    <Styled.TableBodyItem>
                      {(item.amount / 100000).toLocaleString("ru-RU", {
                        maximumFractionDigits: 2,
                      })}
                    </Styled.TableBodyItem>
                    <Styled.TableBodyItem></Styled.TableBodyItem>
                  </Styled.TableBody>
                ))}
              </InfiniteScroll>
            </Scrollbars>
          ) : loading ? (
            <Loading />
          ) : (
            <Styled.NotFound>{t("notFound")}</Styled.NotFound>
          )}
        </Styled.PaymentsTable>
      </Card>
    </div>
  );
};
