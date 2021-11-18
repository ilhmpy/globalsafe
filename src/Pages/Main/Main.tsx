import React, { FC, useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components/macro';
import { Footer } from '../../components/Footer/Footer';
import { Header } from '../../components/Header/Header';
import { Page } from '../../components/UI/Page';
import { AppContext } from '../../context/HubContext';
import { Prize } from '../../types/drawResult';
import { Banner } from './components/Banner/Banner';
import { ExchangeChart } from './components/ChartActiv';
import { DepositsPrograms } from './components/DepositsPrograms/DepositsPrograms';
import { DrawHistory } from './components/DrawHistory/DrawHistory';
import { ModalLottery } from './components/Lottery/Modal';
import { ModalCongrats } from './components/Lottery/ModalCongrats';
import { Timer } from './components/Lottery/Timer';
import { Operations } from './components/Operations/Operations';
import { Payments } from './components/Payments/Payments';
import { Tariffs } from './components/Tariffs/Tariffs';

export const Main: FC = () => {
  const [clock, setClock] = useState<number | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [showModalCongrats, setShowModalCongrats] = useState(false);
  const [showTimer, setShowTimer] = useState(true);
  const [drawResult, setDrawResult] = useState<any | null>(null);

  const [result, setResult] = useState<Prize | null>(null);
  const [winName, setWinName] = useState<string | null>(null);
  const { t } = useTranslation();

  const { hubConnection, isAdmin, user } = useContext(AppContext);

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
        <DrawHistory onOpenModal={onOpenModal} clock={clock} />
        <Footer />
      </MainPage>
    </div>
  );
};

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
