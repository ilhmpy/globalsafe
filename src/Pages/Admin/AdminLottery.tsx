import React, { useState, useContext, useEffect } from "react";
import * as Styled from "./Styled.elements";
import styled, { css } from "styled-components/macro";
import { Card } from "../../globalStyles";
import { CSSTransition } from "react-transition-group";
import { useTranslation } from "react-i18next";
import InfiniteScroll from "react-infinite-scroller";
import { Scrollbars } from "react-custom-scrollbars";
import { Loading } from "../../components/UI/Loading";
import { AppContext } from "../../context/HubContext";
import { UpTitle } from "../../components/UI/UpTitle";
import { Select } from "../../components/Select/Select";
import { Select as SelectTwo } from "../../components/Select/Select2";
import { TestInput } from "../../components/UI/DayPicker";
import { Button } from "../../components/Button/Button";
import { OpenDate } from "../../types/dates";
import { DateInput } from "../../components/UI/DatePicker";
import { SliderComponent } from "../../components/Slider/Slider";
import { LotteryTable } from "./AdminPay/Table";
import {
  RootLottery,
  CollectionLottery,
  RootGetDraw,
  CollectionGetDraw,
} from "../../types/lottery";
import moment from "moment";
import { FakeInput } from "../../components/UI/FakeInput";
import { Writing } from "./AdminPay/Writing";

type LotteryTable = {
  [elemName: string]: CollectionLottery[];
};

export const AdminLottery = () => {
  const [openFilter, setOpenFilter] = useState(true);
  const [openFilterOne, setOpenFilterOne] = useState(true);
  const [name, setName] = useState("");
  const [checkList, setCheckList] = useState<any>([]);
  const [openDate, setOpenDate] = useState<OpenDate>({
    from: undefined,
    to: undefined,
  });
  const [count, setCount] = useState(true);
  const [lotteryArrList, setLotteryArrList] = useState<CollectionLottery[]>([]);
  const [lotteryList, setLotteryList] = useState<LotteryTable | null>(null);
  const [loading, setLoading] = useState(true);
  const [totalLottery, setTotalLottery] = useState(0);
  const [num, setNum] = useState(20);
  const [sliderValue, setSliderValue] = useState(79);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [drawList, setDrawList] = useState<CollectionGetDraw[]>([]);
  const appContext = useContext(AppContext);
  const hubConnection = appContext.hubConnection;
  const { t } = useTranslation();
  const lang = localStorage.getItem("i18nextLng") || "ru";
  const languale = lang === "ru" ? 1 : 0;

  const list = [t("win.one"), t("win.two"), t("win.three")];

  const drawListEdited = (item: CollectionGetDraw) => {
    const key = drawList.findIndex((i) => i.safeId === item.safeId);
    setDrawList([...drawList.slice(0, key), item, ...drawList.slice(key + 1)]);
  };

  useEffect(() => {
    if (hubConnection) {
      hubConnection
        .invoke<RootGetDraw>("GetDraws", [1], 0, 20)
        .then((res) => {
          console.log("GetDraws", res);
          setDrawList(res.collection);
        })
        .catch((e) => console.log(e));
    }
  }, [hubConnection]);

  useEffect(() => {
    if (hubConnection) {
      setLotteryList(null);
      setLotteryArrList([]);
      hubConnection
        .invoke<RootLottery>(
          "GetAllPrizes",
          name ? name : null,
          openDate.from ? openDate.from : null,
          openDate.to ? openDate.to : null,
          checkList.length ? checkList.map((i: any) => i.id) : null,
          0,
          20
        )
        .then((res) => {
          console.log("res", res);
          setTotalLottery(res.totalRecords);
          setLoading(false);
          setNum(20);
          if (res.collection.length) {
            setLotteryArrList(res.collection);

            let result: LotteryTable = {};
            for (let key in res.collection) {
              const newArr = res.collection[key];
              const d = moment(res.collection[key].drawLog.drawDate).format(
                "DD MMMM YYYY"
              );
              if (result[d]) {
                result[d].push(newArr);
              } else {
                result[d] = [newArr];
              }
              setLotteryList(result);
            }
          } else {
            setLotteryList(null);
          }
        })
        .catch((e) => console.log(e));
    }
  }, [hubConnection, languale]);

  const submit = () => {
    if (hubConnection) {
      setLotteryList(null);
      setLotteryArrList([]);
      hubConnection
        .invoke<RootLottery>(
          "GetAllPrizes",
          name ? name : null,
          openDate.from ? openDate.from : null,
          openDate.to ? openDate.to : null,
          checkList.length ? checkList.map((i: any) => i.id) : null,
          0,
          20
        )
        .then((res) => {
          console.log("res", res);
          setTotalLottery(res.totalRecords);
          setLoading(false);
          setNum(20);
          if (res.collection.length) {
            setLotteryArrList(res.collection);

            let result: LotteryTable = {};
            for (let key in res.collection) {
              const newArr = res.collection[key];
              const d = moment(res.collection[key].drawLog.drawDate).format(
                "DD MMMM YYYY"
              );
              if (result[d]) {
                result[d].push(newArr);
              } else {
                result[d] = [newArr];
              }
              setLotteryList(result);
            }
          } else {
            setLotteryList(null);
          }
        })
        .catch((e) => console.log(e));
    }
  };

  // console.log("lotteryArrList", lotteryArrList);

  const myLoad = () => {
    setCount(false);
    if (hubConnection && lotteryArrList.length < totalLottery) {
      hubConnection
        .invoke<RootLottery>(
          "GetAllPrizes",
          name ? name : null,
          openDate.from ? openDate.from : null,
          openDate.to ? openDate.to : null,
          null,
          num,
          20
        )
        .then((res) => {
          // console.log("res load", res);
          setLoading(false);
          if (res.collection.length) {
            if (res.collection.length) {
              setLotteryArrList([...lotteryArrList, ...res.collection]);
              let result: LotteryTable = {};
              for (let key in res.collection) {
                const newArr = res.collection[key];
                const d = moment(res.collection[key].drawLog.drawDate).format(
                  "DD MMMM YYYY"
                );
                if (result[d]) {
                  result[d].push(newArr);
                } else {
                  result[d] = [newArr];
                }
              }
              setLotteryList(Object.assign(lotteryList, result));
            } else {
              setLotteryList(null);
            }
            setCount(true);
            setNum(num + 20);
          }
        })
        .catch((e) => console.log(e));
    }
  };
  const onAfterChange = (value: any) => {
    setSliderValue(value);
  };

  const createNewLottery = () => {
    if (hubConnection) {
      hubConnection
        .invoke("CreateDraw", moment.utc(startDate), sliderValue)
        .then((res) => {
          console.log("CreateDraw", res);
          setDrawList([res, ...drawList]);
        })
        .catch((e) => console.log(e));
    }
  };

  console.log("lotteryList ", lotteryList);

  return (
    <div>
      <div>
        <Styled.FilterBlock>
          <Styled.FilterHeader>
            <Styled.FilterName>{t("newLottery")}</Styled.FilterName>
            <Styled.ShowHide onClick={() => setOpenFilter(!openFilter)}>
              {openFilter ? t("hide") : t("show")}
            </Styled.ShowHide>
          </Styled.FilterHeader>
          <CSSTransition
            in={openFilter}
            timeout={200}
            classNames="filter"
            unmountOnExit
          >
            <>
              <Styled.SelectContainerLottery>
                <Styled.SliderContainerInner>
                  <Styled.SelectWrap>
                    <DateInput
                      startDate={startDate}
                      setStartDate={setStartDate}
                      label={t("writting.startDate")}
                    />
                  </Styled.SelectWrap>
                  <Styled.SelectWrap style={{ minWidth: 180 }}>
                    <FakeInput
                      hours={sliderValue}
                      label={t("writting.repeat")}
                    />
                  </Styled.SelectWrap>
                  <Styled.SliderWrap>
                    <SliderComponent
                      value={sliderValue}
                      onAfterChange={onAfterChange}
                    />
                  </Styled.SliderWrap>
                  <Styled.SelectWrap>
                    <DateInput
                      startDate={startDate}
                      setStartDate={setStartDate}
                      label={t("writting.next")}
                    />
                  </Styled.SelectWrap>
                </Styled.SliderContainerInner>
                <Button danger onClick={createNewLottery}>
                  {t("adminUsers.apply")}
                </Button>
              </Styled.SelectContainerLottery>
              <Styled.WritingBlock>
                <Styled.WritingTitle>{t("write")}</Styled.WritingTitle>
                <Scrollbars style={{ height: "250px" }}>
                  {drawList.length
                    ? drawList.map((item) => (
                        <Writing
                          drawListEdited={drawListEdited}
                          data={item}
                          key={item.safeId}
                        />
                      ))
                    : ""}
                </Scrollbars>
              </Styled.WritingBlock>
            </>
          </CSSTransition>
        </Styled.FilterBlock>

        <Styled.FilterBlock>
          <Styled.FilterHeader>
            <Styled.FilterName>{t("adminDeposit.filter")}</Styled.FilterName>
            <Styled.ShowHide onClick={() => setOpenFilterOne(!openFilterOne)}>
              {openFilterOne ? t("hide") : t("show")}
            </Styled.ShowHide>
          </Styled.FilterHeader>
          <CSSTransition
            in={openFilterOne}
            timeout={200}
            classNames="filter"
            unmountOnExit
          >
            <Styled.SelectContainer>
              <Styled.SelectContainerInnerPaid>
                <Styled.SelectWrap style={{ minWidth: 240 }}>
                  <Styled.Label>{t("winner")}</Styled.Label>
                  <Styled.Input
                    value={name}
                    onChange={(e) => setName(e.target.value.toLowerCase())}
                  />
                </Styled.SelectWrap>
                <Styled.SelectWrap input>
                  <TestInput
                    setOpenDate={setOpenDate}
                    openDate={openDate}
                    label={t("adminPay.filter.date")}
                  />
                </Styled.SelectWrap>
                <Styled.SelectWrap style={{ minWidth: 240 }}>
                  <Styled.Label>{t("lotteryTable.typeWin")}</Styled.Label>
                  <Select
                    checkList={checkList}
                    setCheckList={setCheckList}
                    values={list}
                  />
                </Styled.SelectWrap>
              </Styled.SelectContainerInnerPaid>
              <Button danger onClick={submit}>
                {t("adminUsers.apply")}
              </Button>
            </Styled.SelectContainer>
          </CSSTransition>
        </Styled.FilterBlock>
        <Card style={{ height: "600px" }} smallBorder>
          <Styled.LotteryTable>
            <>
              <Styled.Table>
                <Styled.Thead>
                  <Styled.Tr>
                    <Styled.Th scope="col">{t("lotteryTable.date")}</Styled.Th>
                    <Styled.Th scope="col">
                      {t("lotteryTable.typeWin")}
                    </Styled.Th>
                    <Styled.Th scope="col">
                      {t("lotteryTable.sumWin")}
                    </Styled.Th>
                    <Styled.Th scope="col">
                      {t("lotteryTable.winners")}
                    </Styled.Th>
                    <Styled.Th scope="col">
                      {t("lotteryTable.status")}
                    </Styled.Th>
                  </Styled.Tr>
                </Styled.Thead>
              </Styled.Table>
              {lotteryList ? (
                <Scrollbars style={{ height: "500px" }}>
                  <InfiniteScroll
                    pageStart={20}
                    loadMore={myLoad}
                    hasMore={count}
                    useWindow={false}
                    loader={
                      <div className="loader" key={0}>
                        Loading ...
                      </div>
                    }
                  >
                    <Styled.Table>
                      {Object.keys(lotteryList).map((key, idx) => (
                        <tbody key={idx}>
                          <Styled.Tr
                            style={{
                              textAlign: "center",
                              display: "table-row",
                            }}
                          >
                            <td colSpan={5}>
                              <Styled.DataListDate>{key}</Styled.DataListDate>
                            </td>
                          </Styled.Tr>
                          {lotteryList[key].map((item, idx) => (
                            <LotteryTable key={item.safeId} data={item} />
                          ))}
                        </tbody>
                      ))}
                    </Styled.Table>
                  </InfiniteScroll>
                </Scrollbars>
              ) : loading ? (
                <Loading />
              ) : (
                <Styled.NotFound>{t("notFound")}</Styled.NotFound>
              )}
            </>
          </Styled.LotteryTable>
        </Card>
      </div>
    </div>
  );
};
