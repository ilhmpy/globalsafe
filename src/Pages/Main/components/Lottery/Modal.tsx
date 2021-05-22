import React, { useState, FC } from "react";
import { Modal } from "../../../../components/Modal/Modal";
import { ReactComponent as PresentIcon } from "../../../../assets/svg/present.svg";
import * as Styled from "./Lottery.elements";
import { Wheel } from "./Wheel";
import { Slots } from "./Slots";
import { Timer } from "./Timer";
import { RootClock } from "../../../../types/clock";
import { Prize, Winner, Users } from "../../../../types/drawResult";
import { Balance } from "../../../../types/balance";

type Props = {
  clock: RootClock | null;
  onCloseModal: () => void;
  drawResult: [Prize[], Prize, Users[], Winner] | null;
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
}) => {
  const [show, setShow] = useState(true);

  return (
    <div>
      <Modal width={1100} onClose={onCloseModal}>
        <Styled.Container>
          <Styled.ContainerItem>
            {drawResult ? (
              <Styled.Present>
                <PresentIcon />
                {drawResult[1].kind === 0
                  ? (drawResult[1].volume / 100000).toLocaleString("ru-RU", {
                      maximumFractionDigits: 5,
                    })
                  : drawResult[1].kind === 1
                  ? "Партнерский договор"
                  : drawResult[1].volume}
                {drawResult[1].volume ? Balance[drawResult[1].balanceKind] : ""}
              </Styled.Present>
            ) : (
              ""
            )}
            <Wheel drawResult={drawResult} />
          </Styled.ContainerItem>

          <Styled.ContainerItem>
            <Slots winNumber={90} drawResult={drawResult} />
            {/* {clock && <Timer icon={false} clock={clock} />} */}
          </Styled.ContainerItem>
        </Styled.Container>
      </Modal>
    </div>
  );
};
