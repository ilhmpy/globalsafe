import React, { useState, useEffect, useContext } from "react";
import { Header } from "../../components/Header/Header";
import * as Styled from "./Styles.elements";
import { Card, Container, ContainerRow } from "../../globalStyles";
import { UpTitle } from "../../components/UI/UpTitle";
import { Redirect } from "react-router-dom";
import { Button } from "../../components/Button/Button";
import { Doughnut } from "react-chartjs-2";
import { AppContext } from "../../context/HubContext";
import { RoundChart } from "../../components/Charts/Chart";
import { Tables } from "../../components/Table/Table";
import { InfoBlock } from "../../components/Table/TableModal";
import { RouteComponentProps, useLocation, Link } from "react-router-dom";
import { ReactComponent as Left } from "../../assets/svg/left.svg";

type PropsMatch = {
  slug: string;
};

export const OnePage = ({ match }: RouteComponentProps<PropsMatch>) => {
  const [active, setActive] = useState(1);
  const [list, setList] = useState<any>([]);
  const [card, setCard] = useState(0);
  const appContext = useContext(AppContext);
  const user = appContext.user;
  const hubConnection = appContext.hubConnection;
  const location = useLocation();
  const safeId = match.params.slug;
  console.log("safeId", safeId);
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

  const data = list.filter((item: any) => item.safeId === safeId);

  console.log("data", data);

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
      <Styled.Page>
        <Container>
          <UpTitle>Личный кабинет</UpTitle>
        </Container>
        <Container>
          <Card>
            <Styled.InfoWrap>
              <Styled.InfoTitle>{user}</Styled.InfoTitle>
              {/* <InfoButtons>
                <Button dangerOutline>Новый депозит</Button>
                <Button danger>Вывести деньги</Button>
              </InfoButtons> */}
            </Styled.InfoWrap>
            <Styled.Tabs>
              {/* <Styled.Tab active={active === 0}>Информация</Styled.Tab> */}
              <Styled.Tab onClick={() => handleClick(1)} active={active === 1}>
                Депозиты
              </Styled.Tab>
              {/* <Styled.Tab onClick={() => handleClick(2)} active={active === 2}>
                Баланс
              </Styled.Tab> */}
            </Styled.Tabs>
          </Card>
        </Container>

        <>
          <Styled.Content active={active === 0}>
            <Container>
              <Card>
                <Styled.Deposit>
                  <Styled.DepositItem>
                    <Styled.DepositName>Открытые депозиты</Styled.DepositName>
                    <Styled.DepositValue>5</Styled.DepositValue>
                  </Styled.DepositItem>
                  <Styled.DepositItem>
                    <Styled.DepositName>Сумма в депозитах</Styled.DepositName>
                    <Styled.DepositValue>120 000</Styled.DepositValue>
                  </Styled.DepositItem>
                  <Styled.DepositItem>
                    <Styled.DepositName>
                      Планируемая доходность
                    </Styled.DepositName>
                    <Styled.DepositValue>230 000</Styled.DepositValue>
                  </Styled.DepositItem>
                </Styled.Deposit>
              </Card>
            </Container>
            <ContainerRow>
              <Styled.Half>
                <Styled.HalfHead>
                  <Styled.HalfTitle>Выплаты</Styled.HalfTitle>
                  <Styled.HalfTabs>
                    <Styled.HalfTab
                      onClick={() => setCard(0)}
                      card={card === 0}
                    >
                      %
                    </Styled.HalfTab>
                    <Styled.HalfTab>/</Styled.HalfTab>
                    <Styled.HalfTab
                      onClick={() => setCard(1)}
                      card={card === 1}
                    >
                      CWD
                    </Styled.HalfTab>
                  </Styled.HalfTabs>
                </Styled.HalfHead>
                <Styled.HalfContent card={card === 0}>
                  {/* <Doughnut options={opt} data={data} /> */}
                  <RoundChart />
                </Styled.HalfContent>
                <Styled.HalfContent card={card === 1}>Card2</Styled.HalfContent>
              </Styled.Half>

              <Styled.Half>
                <Styled.HalfHead>
                  <Styled.HalfTitle>Выплаты</Styled.HalfTitle>
                  <Styled.HalfTabs>
                    <Styled.HalfTab
                      onClick={() => setCard(2)}
                      card={card === 2}
                    >
                      %
                    </Styled.HalfTab>
                    <Styled.HalfTab>/</Styled.HalfTab>
                    <Styled.HalfTab
                      onClick={() => setCard(3)}
                      card={card === 3}
                    >
                      CWD
                    </Styled.HalfTab>
                  </Styled.HalfTabs>
                </Styled.HalfHead>
                <Styled.HalfContent card={card === 2}>Card3</Styled.HalfContent>
                <Styled.HalfContent card={card === 3}>Card4</Styled.HalfContent>
              </Styled.Half>
            </ContainerRow>
          </Styled.Content>
          <Styled.Content active={active === 1}>
            <Container>
              <Styled.Back to="/info">
                <Styled.LeftIcon />
                Назад к списку
              </Styled.Back>
            </Container>
            <Container>
              <Card>
                <InfoBlock data={data[0]} />
              </Card>
            </Container>
          </Styled.Content>
          <Styled.Content active={active === 2}>
            {/* <h1>Content 3</h1> */}
          </Styled.Content>
        </>
      </Styled.Page>
    </>
  );
};
