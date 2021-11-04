import React, { useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components/macro';
import { Footer } from '../../components/Footer/Footer';
import { Header } from '../../components/Header/Header';
import { Page } from '../../components/UI/Page';
import { AppContext } from '../../context/HubContext';
import { Prize } from '../../types/drawResult';
import { About } from './components/About/About';
import { Banner } from './components/Banner/Banner';
import { Carousel } from './components/Carousel/Carousel';
import { ExchangeChart } from './components/ChartActiv';
import { ChartActiv } from './components/ChartActiv/ChartActiv';
import { DrawHistory } from './components/DrawHistory/DrawHistory';
import { ModalLottery } from './components/Lottery/Modal';
import { ModalCongrats } from './components/Lottery/ModalCongrats';
import { Timer } from './components/Lottery/Timer';
import { Operations } from './components/Operations/Operations';
import { Payments } from './components/Payments/Payments';
import { Tariffs } from './components/Tariffs/Tariffs';
import { DepositsPrograms } from './components/DepositsPrograms/DepositsPrograms';

export const Main = () => {
  const [clock, setClock] = useState<number | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [showModalCongrats, setShowModalCongrats] = useState(false);
  const [showTimer, setShowTimer] = useState(true);
  // const [drawResult, setDrawResult] =
  //   useState<[Prize[], Prize, Users[], Winner, string] | null>(null);
  const [drawResult, setDrawResult] = useState<any | null>(null);

  const [result, setResult] = useState<Prize | null>(null);
  const [winName, setWinName] = useState<string | null>(null);
  const { t } = useTranslation();

  const appContext = useContext(AppContext);
  const hubConnection = appContext.hubConnection;

  useEffect(() => {
    setShowModal(false);
    setDrawResult(null);
  }, []);

  const winnerResult = (res: Prize) => {
    setResult(res);
  };

  const closeTimer = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowTimer(false);
  };

  const onShowModal = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowModal(true);
    setShowModalCongrats(false);
  };

  const onCloseModal = () => {
    setShowModal(false);
    setResult(null);
  };

  const onCloseModalCongrats = () => {
    setShowModalCongrats(false);
    setWinName(null);
    setResult(null);
    setShowTimer(true);
    setDrawResult(null);
  };

  const onShowModalCongrats = () => {
    setResult(drawResult[1]);
    setWinName(drawResult[3].name);
    setDrawResult(null);
    setShowModal(false);
    setShowModalCongrats(true);
  };

  const onOpenModal = () => {
    setShowModal(true);
    setDrawResult(null);
  };

  useEffect(() => {
    let clean = false;
    const cb = (data: any) => {
      !clean && setDrawResult(data);
    };
    if (hubConnection) {
      hubConnection.on('DrawResult', cb);
    }
    return () => {
      clean = true;
      hubConnection?.off('DrawResult', cb);
    };
  }, [hubConnection]);

  const testResult = () => {
    setShowModal(true);
  };

  return (
    <div>
      <Header />
      {/* <Carousel /> */}
      <MainPage id="banner">
        {showTimer && (
          <FixedBlock>
            <div>
              <Timer
                closeTimer={closeTimer}
                icon={true}
                clock={clock}
                setShowModal={setShowModal}
              />
            </div>
          </FixedBlock>
        )}

        {showModal && (
          <ModalLottery
            drawResult={drawResult}
            onCloseModal={onCloseModal}
            clock={clock}
            onShowModalCongrats={onShowModalCongrats}
            winnerResult={winnerResult}
            result={result}
            setWinName={setWinName}
            testResult={testResult}
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
        <ExchangeChart />
        <Payments />
        <DepositsPrograms />
        <Tariffs />
        <Operations />
        {/* <Assets /> */}

        <DrawHistory onOpenModal={onOpenModal} clock={clock} />

        {/* <About /> */}
        <Footer />
      </MainPage>
    </div>
  );
};

const ModalComponent = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.2);
  display: block;
  z-index: 99999;
  overflow: auto;
  margin: 0;
  &::-webkit-scrollbar {
    width: 0 !important;
  }
`;

const Center = styled.div`
  min-height: calc(100% - 3.5rem);
  margin: 1.75rem auto;
  display: flex;
  align-items: center;
  transition: height 300ms linear;
  &::-webkit-scrollbar {
    width: 0 !important;
  }
`;

const MainPage = styled(Page)`
  position: relative;
  padding-top: 0px;
  margin-top: 94px;
  @media (max-width: 767px) {
    margin-top: 87px;
  }
  @media (max-width: 576px) {
    margin-top: 0px;
  }
`;

const TimerPopup = styled.div`
  position: absolute;
  cursor: pointer;
  right: 30px;
  top: 230px;
  margin-top: -342px;
  @media (max-width: 768px) {
    margin-top: -180px;
  }
  @media only screen and (max-width: 576px) {
    right: 10px;
    position: static;
    margin-top: 0;
    top: 0;
  }
`;

export const FixedBlock = styled.div`
  width: 100%;
  height: 5px;
  max-width: 1280px;
  margin-left: auto;
  z-index: 99999;
  display: flex;
  flex-direction: column;
  margin-right: auto;
  right: 0;
  left: 0;
  position: fixed;
  top: 630px;

  & > div {
    position: relative;
  }
`;
