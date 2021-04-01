import React, { useState, useEffect, useContext } from "react";
import { Header } from "../../components/Header/Header";
import * as Styled from "./Styles.elements";
import { Card, Container, ContainerRow } from "../../globalStyles";
import { UpTitle } from "../../components/UI/UpTitle";
import { Redirect } from "react-router-dom";
import { Button } from "../../components/Button/Button";
import { Tabs, Tab } from "../../components/UI/Tabs";
import { AppContext } from "../../context/HubContext";
import { RoundChart } from "../../components/Charts/Chart";
import { Tables } from "../../components/Table/Table";
import { InfoBlock } from "../../components/Table/TableModal";
import { RouteComponentProps, useLocation, Link } from "react-router-dom";
import { ReactComponent as Left } from "../../assets/svg/left.svg";
import { useTranslation } from "react-i18next";

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
  const { t } = useTranslation();
  useEffect(() => {
    if (hubConnection) {
      hubConnection
        .invoke("GetUserDeposits", [1, 2, 3, 4, 5, 6], 0, 20)
        .then((res: any) => {
          setList(res.collection);
        })
        .catch((err: Error) => console.log(err));
    }
  }, [hubConnection]);

  const data = list.filter((item: any) => item.safeId === safeId);

  if (user === null) {
    return null;
  }

  if (user === false) {
    return <Redirect to="/" />;
  }

  return (
    <>
      <Styled.Content active={active === 1}>
        <Container>
          <Styled.Back to="/info/deposits">
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
    </>
  );
};
