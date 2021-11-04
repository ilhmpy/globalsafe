import React, { FC, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { CSSTransition } from 'react-transition-group';
import { ReactComponent as PrizeSVG } from '../../../../assets/svg/prize.svg';
import { ReactComponent as PrizeLottery } from '../../../../assets/svg/PrizeLottery.svg';
import { Modal } from '../../../../components/Modal/Modal';
import { Prize, Users, Winner } from '../../../../types/drawResult';
import * as Styled from './Lottery.elements';
import { Slots } from './Slots';
import { Timer } from './Timer';
import { Wheel } from './Wheel';

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

  /*
  return (
    <Modal width={1100} onClose={onCloseModal} mobMarg lottery withoutClose={isMobile}>
      <Styled.Container before={!!drawResult ? false : true}>
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
  */

  // !!drawResult

  return (
    <Modal width={1100} onClose={onCloseModal} mobMarg withoutClose>
      <>
        {!!drawResult ? (
          <>
            <Styled.Container>
              <CSSTransition in={true} timeout={300} classNames="alert" unmountOnExit>
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
                  </Styled.ContainerItem>
                </>
              </CSSTransition>
            </Styled.Container>
          </>
        ) : (
          <>
            <Styled.Container>
              <CSSTransition in={true} timeout={300} classNames="alert" unmountOnExit>
                <>
                  <Styled.ContainerItem>
                    <Styled.LotteryLeft>
                      <Styled.LotteryModalDesc>
                        <PrizeSVG /> <span>{t('time.yourPrize')}</span>
                      </Styled.LotteryModalDesc>
                      <PrizeLottery />
                    </Styled.LotteryLeft>
                  </Styled.ContainerItem>
                  <Styled.ContainerItem>
                    <Styled.LotteryFlexBox>
                      <Timer modalTimer history modalPrize />
                    </Styled.LotteryFlexBox>
                  </Styled.ContainerItem>
                </>
              </CSSTransition>
            </Styled.Container>
          </>
        )}
      </>
    </Modal>
  );
};
