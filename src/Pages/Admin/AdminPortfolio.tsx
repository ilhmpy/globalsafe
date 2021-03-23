import React, { useState, useEffect, useContext, FC, useRef } from "react";
import * as Styled from "./Styled.elements";
import styled, { css } from "styled-components/macro";
import { SideNavbar } from "../../components/SideNav";
import { Card } from "../../globalStyles";
import { UpTitle } from "../../components/UI/UpTitle";
import { ReactComponent as Exit } from "../../assets/svg/exit.svg";
import { ReactComponent as Filter } from "../../assets/svg/filter.svg";
import { Select } from "../../components/Select/Select";
import { TestInput } from "../../components/UI/DayPicker";
import { Button } from "../../components/Button/Button";
import { Checkbox } from "../../components/UI/Checkbox";
import useWindowSize from "../../hooks/useWindowSize";
import { TestChart } from "../../components/Charts/Test";
import { CSSTransition } from "react-transition-group";
import { Tab, Content } from "../../components/UI/Tabs";
import { AppContext } from "../../context/HubContext";
import { Header } from "../../components/Header/Header";
import {
  Portfolio,
  RootPortfolio,
  CollectionPortfolio,
} from "../../types/portfolio";
import { Balance } from "../../types/balance";
import moment from "moment";
import InfiniteScroll from "react-infinite-scroller";
import { Scrollbars } from "react-custom-scrollbars";
import { ModalPortfolio } from "./AdminPay/Payments";
import { Loading } from "../../components/UI/Loading";

const TableList: FC<{ data: CollectionPortfolio }> = ({ data }) => {
  const [open, setOpen] = useState(false);

  const onClose = () => {
    setOpen(false);
  };

  const modalOpen = (e: React.MouseEvent) => {
    e.stopPropagation();
    setOpen(true);
  };

  return (
    <div>
      <CSSTransition in={open} timeout={300} classNames="modal" unmountOnExit>
        <ModalPortfolio onClose={onClose} data={data} />
      </CSSTransition>
      <TableBody onClick={modalOpen}>
        <TableBodyItem>
          {moment(data.creationDate).format("DD/MM/YYYY")}
        </TableBodyItem>
        <TableBodyItem>{data.initialVolume}</TableBodyItem>
        <TableBodyItem>
          {(data.unitPrice / 100000).toFixed(2).toLocaleString()}
        </TableBodyItem>
        <TableBodyItem>{data.volume}</TableBodyItem>
        <TableBodyItem></TableBodyItem>
      </TableBody>
    </div>
  );
};

export const AdminPortfolio = () => {
  const [card, setCard] = useState(0);
  const [active, setActive] = useState(3);
  const [basket, setBasket] = useState<Portfolio>({
    GCWD: 0,
    DIAMOND: 0,
    MGCWD: 0,
  });
  const [basketGCWD, setBasketGCWD] = useState<CollectionPortfolio[]>([]);
  const [basketMGCWD, setBasketMGCWD] = useState<CollectionPortfolio[]>([]);
  const [basketDIAMOND, setBasketDIAMOND] = useState<CollectionPortfolio[]>([]);
  const [countGCWD, setCountGCWD] = useState(true);
  const [countDIAMOND, setCountDIAMOND] = useState(true);
  const [countMGCWD, setCountMGCWD] = useState(true);
  const [numGCWD, setNumGCWD] = useState(20);
  const [numMGCWD, setNumMGCWD] = useState(20);
  const [numDIAMOND, setNumDIAMOND] = useState(20);
  const [loading, setLoading] = useState(true);
  const appContext = useContext(AppContext);
  const hubConnection = appContext.hubConnection;
  const logOut = appContext.logOut;
  const user = appContext.user;
  const scrollGCWD = useRef<any>(null);
  const sizes = useWindowSize();
  const header = sizes < 992;
  const myLoadGCWD = () => {
    if (hubConnection) {
      setCountGCWD(false);
      hubConnection
        .invoke<RootPortfolio>("GetBaskets", 3, numGCWD, 20)
        .then((res) => {
          if (res.collection.length) {
            console.log("loadMoreItems", res);
            setBasketGCWD([...basketGCWD, ...res.collection]);
            setCountGCWD(true);
            setNumGCWD(numGCWD + 20);
          }
        })
        .catch((err: Error) => console.log(err));
    }
  };

  const myLoadMGCWD = () => {
    if (hubConnection) {
      setCountMGCWD(false);
      hubConnection
        .invoke<RootPortfolio>("GetBaskets", 2, numMGCWD, 20)
        .then((res) => {
          if (res.collection.length) {
            console.log("loadMoreItems", res);
            setBasketMGCWD([...basketMGCWD, ...res.collection]);
            setCountMGCWD(true);
            setNumMGCWD(numMGCWD + 20);
          }
        })
        .catch((err: Error) => console.log(err));
    }
  };

  const myLoadDIAMOND = () => {
    if (hubConnection) {
      setCountDIAMOND(false);
      hubConnection
        .invoke<RootPortfolio>("GetBaskets", 4, numDIAMOND, 20)
        .then((res) => {
          if (res.collection.length) {
            console.log("loadMoreItems", res);
            setBasketDIAMOND([...basketDIAMOND, ...res.collection]);
            setCountDIAMOND(true);
            setNumDIAMOND(numDIAMOND + 20);
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

  useEffect(() => {
    if (hubConnection) {
      hubConnection
        .invoke<Portfolio>("GetBasketsOverview")
        .then((res) => {
          setBasket(res);
        })
        .catch((err: Error) => console.log(err));
    }
  }, [hubConnection]);

  useEffect(() => {
    if (hubConnection) {
      hubConnection
        .invoke<RootPortfolio>("GetBaskets", 3, 0, 20)
        .then((res) => {
          setLoading(false);
          setBasketGCWD(res.collection);
          setNumGCWD(20);
        })
        .catch((err: Error) => console.log(err));
    }
  }, [hubConnection]);

  useEffect(() => {
    if (hubConnection) {
      hubConnection
        .invoke<RootPortfolio>("GetBaskets", 2, 0, 20)
        .then((res) => {
          setLoading(false);
          console.log("res", res);
          setBasketMGCWD(res.collection);
          setNumMGCWD(20);
        })
        .catch((err: Error) => console.log(err));
    }
  }, [hubConnection]);

  useEffect(() => {
    if (hubConnection) {
      hubConnection
        .invoke<RootPortfolio>("GetBaskets", 4, 0, 20)
        .then((res) => {
          setLoading(false);
          setBasketDIAMOND(res.collection);
          setNumDIAMOND(20);
        })
        .catch((err: Error) => console.log(err));
    }
  }, [hubConnection]);

  return (
    <>
      {header && <Header admPanel />}
      <Styled.Wrapper>
        <SideNavbar />
        <Styled.Content>
          <Styled.HeadBlock>
            <UpTitle small>Портфель</UpTitle>
            <Styled.UserName>
              <span>{user}</span>
              <Exit onClick={logOut} />
            </Styled.UserName>
          </Styled.HeadBlock>
          <ChartContainer>
            <Styled.PayList>
              <Styled.PayItem>
                <Styled.PayItemHead mb>
                  <UpTitle small>GCWD</UpTitle>
                </Styled.PayItemHead>
                <Styled.Radial bg={"rgba(255, 65, 110, 0.2)"}>
                  <span>{basket.GCWD}</span>
                  <span></span>
                </Styled.Radial>
              </Styled.PayItem>
              <Styled.PayItem>
                <Styled.PayItemHead mb>
                  <UpTitle small>MGCWD</UpTitle>
                </Styled.PayItemHead>

                <Styled.Radial bg={"rgba(188, 212, 118, 0.2)"}>
                  <span>{basket.MGCWD}</span>
                  <span></span>
                </Styled.Radial>
              </Styled.PayItem>
              <Styled.PayItem>
                <Styled.PayItemHead mb>
                  <UpTitle small>DIAMOND</UpTitle>
                  {/* {sizes > 768 && <CalendarInput />} */}
                </Styled.PayItemHead>
                <Styled.Radial bg={"rgba(109, 185, 255, 0.2)"}>
                  <span>{basket.MGCWD}</span>
                  <span></span>
                </Styled.Radial>
              </Styled.PayItem>
              <Styled.PayItem></Styled.PayItem>
            </Styled.PayList>
            {/* <HalfHead>
            <HalfTitle>Размер портфеля</HalfTitle>
            <HalfTabs>
              <HalfTab onClick={() => setCard(0)} card={card === 0}>
                %
              </HalfTab>
              <HalfTab>/</HalfTab>
              <HalfTab onClick={() => setCard(1)} card={card === 1}>
                CWD
              </HalfTab>
            </HalfTabs>
          </HalfHead>
          <HalfContent card={card === 0}>
            <CSSTransition
              in={card === 0}
              timeout={300}
              classNames="chart"
              unmountOnExit
            >
              <TestChart
                percent
                labels={Object.keys(basket)}
                series={Object.values(basket)}
                mobHeight={150}
                mobLegend={120}
              />
            </CSSTransition>
          </HalfContent>
          <HalfContent card={card === 1}>
            <CSSTransition
              in={card === 1}
              timeout={300}
              classNames="chart"
              unmountOnExit
            >
              <TestChart
                labels={Object.keys(basket)}
                series={Object.values(basket)}
                mobHeight={150}
                mobLegend={120}
              />
            </CSSTransition>
          </HalfContent> */}
          </ChartContainer>
          <TabsCard>
            <Tabs>
              <Tab onClick={() => handleClick(3)} active={active === 3}>
                GCWD
              </Tab>
              <Tab onClick={() => handleClick(2)} active={active === 2}>
                MGCWD
              </Tab>
              <Tab onClick={() => handleClick(4)} active={active === 4}>
                DIAMOND
              </Tab>
            </Tabs>
          </TabsCard>
          {/* <FilterWrap>
          <FilterLeft>
            <Styled.FilterBlock>
              <Styled.SelectContainer>
                <Styled.SelectWrap>
                  <Styled.Label>Тип операции</Styled.Label>
                  <Select /> 
                </Styled.SelectWrap>
                <Styled.InputsWrap>
                  <TestInput label="Дата" /> 
                </Styled.InputsWrap>
                <Button danger>Применить</Button>
              </Styled.SelectContainer>
            </Styled.FilterBlock>
          </FilterLeft>
          <FilterRight>
             <Select placeholder="Введите операцию" /> 
            <ButtonWrap>
              <Button danger>Добавить</Button>
              <Button dangerOutline>Удалить</Button>
            </ButtonWrap>
          </FilterRight>
        </FilterWrap> */}
          <Content active={active === 3}>
            <CardTable>
              <PaymentsTable>
                <TableHead>
                  <TableHeadItem>Дата покупки</TableHeadItem>
                  <TableHeadItem>Первичное количество</TableHeadItem>
                  <TableHeadItem>Стоимость за единицу, CWD</TableHeadItem>
                  <TableHeadItem>Текущее количество</TableHeadItem>
                  <TableHeadItem>{/* <Filter /> */}</TableHeadItem>
                </TableHead>
                {basketGCWD.length ? (
                  <Scrollbars style={{ height: "500px" }}>
                    <InfiniteScroll
                      pageStart={0}
                      loadMore={myLoadGCWD}
                      hasMore={countGCWD}
                      useWindow={false}
                      loader={
                        <div className="loader" key={0}>
                          Loading ...
                        </div>
                      }
                    >
                      {basketGCWD.map((item, idx) => (
                        <TableList key={item.safeId} data={item} />
                      ))}
                    </InfiniteScroll>
                  </Scrollbars>
                ) : loading ? (
                  <Loading />
                ) : (
                  <Styled.NotFound>
                    Данные не обнаружены. Попробуйте изменить параметры поиска.
                  </Styled.NotFound>
                )}
              </PaymentsTable>
            </CardTable>
          </Content>
          <Content active={active === 2}>
            <CardTable>
              <PaymentsTable>
                <TableHead>
                  <TableHeadItem>Дата покупки</TableHeadItem>
                  <TableHeadItem>Первичное количество</TableHeadItem>
                  <TableHeadItem>Стоимость за единицу, CWD</TableHeadItem>
                  <TableHeadItem>Текущее количество</TableHeadItem>
                  <TableHeadItem>{/* <Filter /> */}</TableHeadItem>
                </TableHead>
                {basketMGCWD.length ? (
                  <Scrollbars style={{ height: "500px" }}>
                    <InfiniteScroll
                      pageStart={0}
                      loadMore={myLoadMGCWD}
                      hasMore={countMGCWD}
                      useWindow={false}
                      loader={
                        <div className="loader" key={0}>
                          Loading ...
                        </div>
                      }
                    >
                      {basketMGCWD.map((item, idx) => (
                        <TableList key={item.safeId} data={item} />
                      ))}
                    </InfiniteScroll>
                  </Scrollbars>
                ) : (
                  <Styled.NotFound>
                    Данные не обнаружены. Попробуйте изменить параметры поиска.
                  </Styled.NotFound>
                )}
              </PaymentsTable>
            </CardTable>
          </Content>
          <Content active={active === 4}>
            <CardTable>
              <PaymentsTable>
                <TableHead>
                  <TableHeadItem>Дата покупки</TableHeadItem>
                  <TableHeadItem>Первичное количество</TableHeadItem>
                  <TableHeadItem>Стоимость за единицу, CWD</TableHeadItem>
                  <TableHeadItem>Текущее количество</TableHeadItem>
                  <TableHeadItem>{/* <Filter /> */}</TableHeadItem>
                </TableHead>
                {basketDIAMOND.length ? (
                  <Scrollbars style={{ height: "500px" }}>
                    <InfiniteScroll
                      pageStart={0}
                      loadMore={myLoadDIAMOND}
                      hasMore={countDIAMOND}
                      useWindow={false}
                      loader={
                        <div className="loader" key={0}>
                          Loading ...
                        </div>
                      }
                    >
                      {basketDIAMOND.map((item, idx) => (
                        <TableList key={item.safeId} data={item} />
                      ))}
                    </InfiniteScroll>
                  </Scrollbars>
                ) : (
                  <Styled.NotFound>
                    Данные не обнаружены. Попробуйте изменить параметры поиска.
                  </Styled.NotFound>
                )}
              </PaymentsTable>
            </CardTable>
          </Content>
        </Styled.Content>
      </Styled.Wrapper>
    </>
  );
};

const CardTable = styled(Card)`
  height: 600px;
`;

const PaymentsTable = styled.div`
  padding: 30px;
`;

const TableHead = styled.ul`
  list-style: none;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding-bottom: 6px;
  border-bottom: 1px solid rgba(81, 81, 114, 0.2);
  @media (max-width: 992px) {
    justify-content: space-between;
  }
`;

const TableHeadItem = styled.li`
  font-weight: normal;
  font-size: 12px;
  line-height: 14px;
  letter-spacing: 0.1px;
  color: rgba(81, 81, 114, 0.6);
  width: 100%;
  @media (max-width: 992px) {
    padding-right: 5px;
  }
  &:nth-child(1) {
    max-width: 150px;
    @media (max-width: 576px) {
      max-width: 80px;
    }
  }
  &:nth-child(2) {
    max-width: 200px;
    @media (max-width: 576px) {
      display: none;
    }
  }
  &:nth-child(3) {
    max-width: 200px;
    @media (max-width: 768px) {
      max-width: 80px;
    }
    @media (max-width: 576px) {
      max-width: 90px;
      text-align: center;
    }
  }
  &:nth-child(4) {
    max-width: 200px;
    @media (max-width: 576px) {
      display: none;
      max-width: 20px;
      margin-left: 0;
    }
  }
  &:nth-child(5) {
    max-width: 80px;
    @media (max-width: 992px) {
      max-width: 30px;
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

const FilterLeft = styled.div`
  max-width: 675px;
  width: 100%;
  margin-right: 20px;
  @media (max-width: 992px) {
    max-width: 100%;
    margin-right: 0px;
    ${Styled.InputsWrap} {
      margin: 0;
    }
  }
  ${Button} {
    width: 160px;
  }
  ${Styled.SelectContainer} {
    flex-wrap: wrap;
  }
`;

const FilterRight = styled(Card)`
  max-width: 432px;
  width: 100%;
  padding: 20px;
  @media (max-width: 992px) {
    max-width: 100%;
  }
`;

const ButtonWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 22px;
  ${Button} {
    width: 160px;
    margin: 0 10px 0px;
    @media (max-width: 576px) {
      margin: 0 20px 20px;
    }
  }
  @media (max-width: 576px) {
    flex-wrap: wrap;
  }
`;

const FilterWrap = styled.div`
  display: flex;
  @media (max-width: 992px) {
    flex-wrap: wrap;
  }
`;

const TabsCard = styled(Card)`
  margin-bottom: 30px;
`;

const ChartContainer = styled(Card)`
  margin-bottom: 20px;
  padding: 30px;
  .apexcharts-legend-series {
    text-align: left !important;
    width: auto !important;
  }
  @media (max-width: 768px) {
    padding: 15px 0;
  }
`;

const HalfHead = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  @media (max-width: 576px) {
    justify-content: flex-end;
  }
`;

const Tabs = styled.div`
  display: flex;
  padding: 12px 20px 0;
  @media (max-width: 768px) {
    ${Tab} {
      width: 80px;
      text-align: left;
      &:first-child {
        text-align: left;
      }
      &:last-child {
        text-align: right;
        &:before {
          left: 14px;
        }
      }
    }
  }
`;

const HalfTitle = styled.span`
  font-weight: 500;
  font-size: 20px;
  line-height: 23px;
  color: #0e0d3d;
  padding-right: 110px;
  @media (max-width: 576px) {
    display: none;
  }
`;

const HalfTabs = styled.div`
  display: flex;
  align-items: center;
`;

const HalfTab = styled.span<{ card?: boolean }>`
  font-weight: ${(props) => (props.card ? "600" : "400")};
  font-size: 20px;
  line-height: 14px;
  color: #0e0d3d;
  cursor: pointer;
  padding: 0 5px;
  text-decoration: uppercase;
`;

const MobHalfTab = styled(HalfTab)`
  border-bottom: ${(props) =>
    props.card ? "1px solid #FF416E" : "1px solid #FFF"};
  padding-bottom: 6px;
  padding-top: 20px;
  width: 50%;
  text-align: center;
`;

const HalfContent = styled.div<{ card: boolean }>`
  ${(props) => (props.card ? "" : "display:none")};
  width: 100%;
  max-width: 440px;
  margin: 0 auto;
  @media (max-width: 576px) {
    max-width: 100%;
  }
  .chart-enter {
    opacity: 0;
  }
  .chart-enter-active {
    opacity: 1;
    transform: translateX(0);
    transition: opacity 300ms;
  }
  .chart-exit {
    opacity: 1;
  }
  .chart-exit-active {
    opacity: 0;
    transform: scale(0.9);
    transition: opacity 300ms, transform 300ms;
  }
`;
