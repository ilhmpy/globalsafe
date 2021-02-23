import React, { useState, MouseEvent, useContext, useEffect } from "react";
import { Header } from "../../components/Header/Header";
import styled from "styled-components/macro";
import { Card, Container, ContainerRow } from "../../globalStyles";
import { UpTitle } from "../../components/UI/UpTitle";
import { Redirect } from "react-router-dom";
import { Button } from "../../components/Button/Button";
import { Doughnut } from "react-chartjs-2";
import { AppContext } from "../../context/HubContext";
import { RoundChart } from "../../components/Charts/Chart";
import { Tables } from "../../components/Table/Table";
const Chart = require("react-chartjs-2").Chart;

var originalDoughnutDraw = Chart.controllers.doughnut.prototype.draw;
Chart.helpers.extend(Chart.controllers.doughnut.prototype, {
  draw: function () {
    originalDoughnutDraw.apply(this, arguments);

    var chart = this.chart.chart;
    var ctx = chart.ctx;
    var width = chart.width;
    var height = chart.height;

    var fontSize = (height / 114).toFixed(2);
    ctx.font = fontSize + "em Verdana";
    ctx.textBaseline = "middle";

    var text = chart.config.data.text,
      textX = Math.round((width - ctx.measureText(text).width) / 2),
      textY = height / 2;

    ctx.fillText(text, textX, textY);
  },
});

const data = {
  labels: [
    "Депозит #1",
    "Депозит #2",
    "Депозит #3",
    "Депозит #4",
    "Депозит #5",
  ],
  datasets: [
    {
      data: [100, 100, 100, 100, 100],
      backgroundColor: [
        "rgba(255, 65, 110, 1)",
        "rgba(255, 65, 110, .8)",
        "rgba(255, 65, 110, .6)",
        "rgba(255, 65, 110, .25)",
        "rgba(255, 65, 110, .1)",
      ],
      hoverBackgroundColor: [
        "#FF6384",
        "#36A2EB",
        "#FFCE56",
        "#36A2EB",
        "#FFCE56",
      ],
    },
  ],
  text: "101 000",
};

const opt = {
  tooltips: {
    backgroundColor: "#FFF",
    titleFontSize: 16,
    titleFontColor: "#0066ff",
    bodyFontColor: "#000",
    bodyFontSize: 14,
    displayColors: false,
  },
};
export const Info = () => {
  const [active, setActive] = useState(1);
  const [card, setCard] = useState(0);
  const [list, setList] = useState<any>([]);
  const appContext = useContext(AppContext);
  const user = appContext.user;

  const hubConnection = appContext.hubConnection;
  const loading = appContext.loading;

  useEffect(() => {
    if (hubConnection) {
      hubConnection
        .invoke("GetUserDeposits", [1, 2, 3, 4], 0, 20)
        .then((res: any) => {
          setList(res.collection);
        })
        .catch((err: Error) => console.log(err));
    }
  }, [hubConnection]);

  const handleClick = (id: number) => {
    if (id !== active) {
      setActive(id);
    }
  };

  if (user === null) {
    return null;
  }

  if (user === false) {
    return <Redirect to="/" />;
  }

  return (
    <>
      <Header />
      <Page>
        <Container>
          <UpTitle>Личный кабинет</UpTitle>
        </Container>
        <Container>
          <Card>
            <InfoWrap>
              <InfoTitle>{user}</InfoTitle>
              {/* <InfoButtons>
                <Button dangerOutline>Новый депозит</Button>
                <Button danger>Вывести деньги</Button>
              </InfoButtons> */}
            </InfoWrap>
            <Tabs>
              {/* <Tab active={active === 0}>Информация</Tab> */}
              <Tab onClick={() => handleClick(1)} active={active === 1}>
                Депозиты
              </Tab>
              {/* <Tab onClick={() => handleClick(2)} active={active === 2}>
                Баланс
              </Tab> */}
            </Tabs>
          </Card>
        </Container>

        <>
          <Content active={active === 0}>
            <Container>
              <Card>
                <Deposit>
                  <DepositItem>
                    <DepositName>Открытые депозиты</DepositName>
                    <DepositValue>5</DepositValue>
                  </DepositItem>
                  <DepositItem>
                    <DepositName>Сумма в депозитах</DepositName>
                    <DepositValue>120 000</DepositValue>
                  </DepositItem>
                  <DepositItem>
                    <DepositName>Планируемая доходность</DepositName>
                    <DepositValue>230 000</DepositValue>
                  </DepositItem>
                </Deposit>
              </Card>
            </Container>
            <ContainerRow>
              <Half>
                <HalfHead>
                  <HalfTitle>Выплаты</HalfTitle>
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
                  {/* <Doughnut options={opt} data={data} /> */}
                  <RoundChart />
                </HalfContent>
                <HalfContent card={card === 1}>Card2</HalfContent>
              </Half>

              <Half>
                <HalfHead>
                  <HalfTitle>Выплаты</HalfTitle>
                  <HalfTabs>
                    <HalfTab onClick={() => setCard(2)} card={card === 2}>
                      %
                    </HalfTab>
                    <HalfTab>/</HalfTab>
                    <HalfTab onClick={() => setCard(3)} card={card === 3}>
                      CWD
                    </HalfTab>
                  </HalfTabs>
                </HalfHead>
                <HalfContent card={card === 2}>Card3</HalfContent>
                <HalfContent card={card === 3}>Card4</HalfContent>
              </Half>
            </ContainerRow>
          </Content>
          <Content active={active === 1}>
            <Container>
              <Card>
                <Tables list={list} />
              </Card>
            </Container>
          </Content>
          <Content active={active === 2}>{/* <h1>Content 3</h1> */}</Content>
        </>
      </Page>
    </>
  );
};

const Page = styled.div`
  margin-top: 100px;
`;

const InfoWrap = styled.div`
  padding: 30px 90px 15px;
  display: flex;
  align-items: flex-start;
  @media (max-width: 992px) {
    padding: 20px;
  }
`;

const InfoTitle = styled.h4`
  font-weight: 500;
  font-size: 18px;
  line-height: 21px;
  color: #0e0d3d;
`;

const InfoButtons = styled.div`
  margin-left: auto;
  display: flex;
  flex-direction: column;
  width: 180px;
  ${Button} {
    margin-bottom: 15px;
  }
  @media (max-width: 992px) {
    width: 130px;
  }
`;

const Tabs = styled.div`
  overflow: hidden;
  background: #fff;
  padding-left: 90px;
  border-top: 1px solid rgba(196, 196, 196, 0.2);
  border-radius: 0 0 20px 20px;
  @media (max-width: 575px) {
    padding-left: 20px;
    display: flex;
    justify-content: space-between;
  }
`;

const Tab = styled.button<{ active: boolean }>`
  border: none;
  outline: none;
  cursor: pointer;
  position: relative;
  font-weight: ${(props) => (props.active ? "600" : "400")};
  font-size: 14px;
  line-height: 16px;
  padding: 12px 0;
  width: 120px;
  color: #0e0d3d;
  text-align: left;
  background: transparent;
  @media (max-width: 992px) {
    padding-left: 0px;
    width: 80px;
    text-align: center;
    &:first-child {
      width: 90px;
    }
    &:last-child {
      padding-right: 0px;
    }
  }
  &:hover {
    background-color: white;
  }
  &:before {
    content: "";
    position: absolute;
    bottom: 0;
    display: ${(props) => (props.active ? "block" : "none")};
    left: 0;
    height: 1px;
    width: 46px;
    background: #ff416e;
    border-radius: 0px 2px 2px 0px;
  }
`;
const Content = styled.div<{ active: boolean }>`
  ${(props) => (props.active ? "" : "display:none")}
`;

const Deposit = styled.div`
  display: flex;
  align-items: center;
  padding: 50px;
  justify-content: space-around;
  @media (max-width: 992px) {
    flex-wrap: wrap;
  }
`;

const DepositItem = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 230px;
  @media (max-width: 992px) {
    margin-bottom: 40px;
  }
`;

const DepositName = styled.h4`
  font-weight: 500;
  font-size: 20px;
  line-height: 23px;
  text-align: center;
  color: #0e0d3d;
  margin-bottom: 20px;
`;

const DepositValue = styled.h4`
  font-weight: 500;
  font-size: 36px;
  line-height: 42px;
  text-align: center;
  color: #ff416e;
`;

const Half = styled(Card)`
  flex: 1;
  margin: 10px;
  padding: 30px;
`;

const HalfHead = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const HalfTitle = styled.span`
  font-weight: 500;
  font-size: 20px;
  line-height: 23px;
  color: #0e0d3d;
  padding-right: 110px;
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

const HalfContent = styled.div<{ card: boolean }>`
  ${(props) => (props.card ? "" : "display:none")}
`;
