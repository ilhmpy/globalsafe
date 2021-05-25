import React, { useState, FC, useEffect } from "react";
import { Modal } from "../../../../components/Modal/Modal";
import { ReactComponent as PresentIcon } from "../../../../assets/svg/present.svg";
import * as Styled from "./Lottery.elements";
import { Wheel } from "./Wheel";
import { Slots } from "./Slots";
import { Timer } from "./Timer";
import { RootClock } from "../../../../types/clock";
import { Prize, Winner, Users } from "../../../../types/drawResult";
import { Balance } from "../../../../types/balance";
import { Card } from "../../../../globalStyles";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { useTranslation } from "react-i18next";

type Props = {
  clock: RootClock | null;
  onCloseModal: () => void;
  drawResult: [Prize[], Prize, Users[], Winner] | null;
  onShowModalCongrats: () => void;
  winnerResult: (res: Prize) => void;
  result: Prize | null;
  setWinName: (name: string | null) => void;
};

const fake = {
  id: 322559577302237185,
  safeId: "322559577302237185",
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
}) => {
  const { t } = useTranslation();

  return (
    <Modal width={1100} onClose={onCloseModal}>
      <Styled.Container>
        <Styled.ContainerItem>
          <Wheel
            drawResult={drawResult}
            winnerResult={winnerResult}
            onShowModalCongrats={onShowModalCongrats}
          />
        </Styled.ContainerItem>

        <Styled.ContainerItem>
          <CSSTransition
            in={!!drawResult}
            timeout={3000}
            classNames="modals"
            unmountOnExit
          >
            <Slots
              setWinName={setWinName}
              winNumber={90}
              drawResult={drawResult}
            />
          </CSSTransition>

          <CSSTransition
            in={drawResult === null}
            timeout={3000}
            classNames="modals"
            unmountOnExit
            mountOnEnter
          >
            <Timer icon={false} clock={clock} />
          </CSSTransition>
          {/* {drawResult ? (
              <Slots
                setWinName={setWinName}
                winNumber={90}
                drawResult={drawResult}
              />
            ) : (
              <Timer icon={false} clock={clock} />
            )} */}
        </Styled.ContainerItem>
      </Styled.Container>

      {/* 
        {drawResult ? (
          <Styled.WinContainer>
            <Styled.WinTitle>Поздравляем {drawResult[3].name}</Styled.WinTitle>
            <Styled.WinTitle sub>
              Вы выиграли{" "}
              {drawResult[1].kind === 0
                ? (drawResult[1].volume / 100000).toLocaleString("ru-RU", {
                    maximumFractionDigits: 5,
                  })
                : drawResult[1].kind === 1
                ? "Партнерский договор"
                : drawResult[1].volume}
              &nbsp;
              {drawResult[1].volume ? Balance[drawResult[1].balanceKind] : ""}!
            </Styled.WinTitle>
            <Styled.WinDesc>
              Денежные средства зачислены на ваш аккаунт{" "}
              <Styled.WinBrand>GLOBALSAFE.</Styled.WinBrand>
            </Styled.WinDesc>
            <br />
            <Styled.WinDesc>
              Если у вас есть вопросы по поводу приза обращайтесь в
              администрацию
            </Styled.WinDesc>
          </Styled.WinContainer>
        ) : (
          ""
        )} */}
    </Modal>
  );
};
