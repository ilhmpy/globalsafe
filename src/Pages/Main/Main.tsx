import React, { useContext, useEffect, useState } from "react";
import { Header } from "../../components/Header/Header";
import { Page } from "../../components/UI/Page";
import styled from "styled-components/macro";
import { Banner } from "./components/Banner/Banner";
import { Tariffs } from "./components/Tariffs/Tariffs";
import { About } from "./components/About/About";
import { Footer } from "../../components/Footer/Footer";
import { Contact } from "./components/Contact/Contact";
import { Operations } from "./components/Operations/Operations";
import { Payments } from "./components/Payments/Payments";
import { Timer } from "./components/Lottery/Timer";
import { AppContext } from "../../context/HubContext";
import { RootClock } from "../../types/clock";
import { ModalLottery } from "./components/Lottery/Modal";
import { ModalCongrats } from "./components/Lottery/ModalCongrats";
import { Prize, Winner, Users } from "../../types/drawResult";

export const Main = () => {
  const [clock, setClock] = useState<RootClock | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [showModalCongrats, setShowModalCongrats] = useState(false);
  const [showTimer, setShowTimer] = useState(true);
  const [drawResult, setDrawResult] =
    useState<[Prize[], Prize, Users[], Winner] | null>(null);

  const [result, setResult] = useState<Prize | null>(null);
  const [winName, setWinName] = useState<string | null>(null);

  const winnerResult = (res: Prize) => {
    setResult(res);
    console.log("result", result);
  };

  const closeTimer = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowTimer(false);
  };

  const onShowModal = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowModal(true);
    setShowTimer(false);
  };

  const onCloseModal = () => {
    setResult(null);
    setShowModal(false);
  };

  const onCloseModalCongrats = () => {
    setShowModalCongrats(false);
    setDrawResult(null);
    setWinName(null);
    setResult(null);
  };

  const onShowModalCongrats = () => {
    setDrawResult(null);
    setShowModal(false);
    setShowModalCongrats(true);
  };

  const appContext = useContext(AppContext);
  const hubConnection = appContext.hubConnection;

  useEffect(() => {
    if (hubConnection) {
      hubConnection.on("DrawResult", (data) => {
        console.log("DrawResult", data);
        setShowModal(true);
        setShowTimer(false);
        setDrawResult(data);
      });
      hubConnection
        .invoke<RootClock>("GetNextDraw")
        .then((res) => {
          console.log("GetNextDraw", res);
          setClock(res);
        })
        .catch((e) => console.log(e));
    }
  }, [hubConnection]);

  return (
    <div>
      <Header />
      {showTimer && (
        <TimerPopup onClick={onShowModal}>
          <Timer closeTimer={closeTimer} icon={true} clock={clock} />
        </TimerPopup>
      )}
      <MainPage>
        {showModal && (
          <ModalLottery
            drawResult={drawResult}
            onCloseModal={onCloseModal}
            clock={clock}
            onShowModalCongrats={onShowModalCongrats}
            winnerResult={winnerResult}
            result={result}
            setWinName={setWinName}
          />
        )}
        {showModalCongrats && (
          <ModalCongrats
            result={result}
            name={winName}
            drawResult={drawResult}
            onCloseModalCongrats={onCloseModalCongrats}
          />
        )}
        <Banner />
        <Payments />
        <Operations />
        <Tariffs />
        <About />
        <Contact />
        <Footer />
      </MainPage>
    </div>
  );
};

const MainPage = styled(Page)`
  margin-top: 200px;
  @media (max-width: 1060px) {
    margin-top: 140px;
  }
  @media (max-width: 768px) {
    margin-top: 100px;
  }
`;

const TimerPopup = styled.div`
  position: fixed;
  cursor: pointer;
  right: 30px;
  top: 45px;
  z-index: 99999;
  @media (max-width: 768px) {
    margin-top: 0px;
  }
  @media (max-width: 576px) {
    right: 10px;
  }
`;
