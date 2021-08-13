import React, { useState, FC, useEffect } from 'react';
import { Modal } from '../../../../components/Modal/Modal';
import { ReactComponent as PresentIcon } from '../../../../assets/svg/present.svg';
import * as Styled from './Lottery.elements';
import { Wheel } from './Wheel';
import { Slots } from './Slots';
import { Timer } from './Timer';
import { RootClock } from '../../../../types/clock';
import { Prize, Winner, Users } from '../../../../types/drawResult';
import { Balance } from '../../../../types/balance';
import { Card } from '../../../../globalStyles';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { useTranslation } from 'react-i18next';
import brand from '../../../../assets/svg/Gs.svg';
import { ReactComponent as PrizeSVG } from "../../../../assets/svg/prize.svg";
import { ReactComponent as PrizeLottery } from "../../../../assets/svg/PrizeLottery.svg";
import { OldTimer } from "./Timer";

type Props = {
  clock: number | null;
  onCloseModal: () => void;
  drawResult: [Prize[], Prize, Users[], Winner] | null;
  onShowModalCongrats: () => void;
  winnerResult: (res: Prize) => void;
  result: Prize | null;
  setWinName: (name: string | null) => void;
  testResult: () => void;
};

const fake = {
  id: 322559577302237185,
  safeId: '322559577302237185',
  kind: 1,
  isActive: true,
  balanceKind: null,
  volume: null,
};

export const ModalLottery: FC<Props> = ({
  clock,
  onCloseModal,
  drawResult,
  onShowModalCongrats,
  winnerResult,
  result,
  setWinName,
  testResult,
}: Props) => {
  const { t } = useTranslation();
  const [isMobile, setIsMobile] = useState<boolean | undefined>(undefined);

  useEffect(() => {
    setIsMobile(window.screen.width > 480);
  }, []);

  return (
    <Modal width={1100} onClose={onCloseModal} mobMarg lottery withoutClose={isMobile}>
      <Styled.Container before={!!drawResult ? false : true}>
        {/* <button onClick={testResult}>test</button> */}
        <CSSTransition in={!!drawResult} timeout={300} classNames="alert" unmountOnExit>
          <>
            <Styled.ContainerItem>
              <Wheel
                drawResult={drawResult}
                winnerResult={winnerResult}
                onShowModalCongrats={onShowModalCongrats}
              />
            </Styled.ContainerItem>

            <Styled.ContainerItem>
              <Slots setWinName={setWinName} winNumber={90} drawResult={drawResult} />

              {/* {drawResult === null && <Timer icon={false} clock={clock} />} */}
            </Styled.ContainerItem>
          </>
        </CSSTransition>

        <Styled.ContainerItem>
          <CSSTransition in={!drawResult} timeout={300} classNames="alert" unmountOnExit>
              <div>
                 <Styled.LotteryModalDesc><PrizeSVG /> <span>{t("time.yourPrize")}</span></Styled.LotteryModalDesc>
                 <Styled.LotteryFlexBox>
                    <PrizeLottery />
                    <OldTimer modalTimer />
                 </Styled.LotteryFlexBox>
              </div>
          </CSSTransition>
        </Styled.ContainerItem> 
        </Styled.Container>
    </Modal>
  );
};