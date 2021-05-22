import React, { useEffect, useState, FC, useContext } from "react";
import * as Styled from "./Lottery.elements";
import { AppContext } from "../../../../context/HubContext";
import moment from "moment";
import "moment-duration-format";
import { RootClock } from "../../../../types/clock";

type Props = {
  last?: string;
  clock: RootClock | null;
  icon: boolean;
  closeTimer?: (e: React.MouseEvent) => void;
};

export const Timer: FC<Props> = ({
  last = "2021-05-22T10:35:43.902Z",
  icon,
  closeTimer,
}) => {
  const [state, setState] = useState<null | string>(null);
  const [deadline, setDeadline] = useState(-1);

  const [clock, setClock] = useState<RootClock | null>(null);
  const appContext = useContext(AppContext);
  const hubConnection = appContext.hubConnection;

  useEffect(() => {
    if (hubConnection) {
      hubConnection
        .invoke<RootClock>("GetNextDraw")
        .then((res) => {
          console.log("GetNextDraw", res);
          setClock(res);
        })
        .catch((e) => console.log(e));
    }
  }, [hubConnection]);

  useEffect(() => {
    if (clock) {
      console.log("deadline", deadline);
      setDeadline((clock.totalSeconds *= -1));
      setState("0");
    }
  }, [last, clock]);

  // console.log("deadline", deadline);

  useEffect(() => {
    if (deadline < 1) {
      setState(null);
      return;
    }

    let timer = setTimeout(() => {
      let durations = moment.duration(deadline, "seconds");
      let formatted = durations.format("d[дн] h[ч] m[мин] s[с]");
      setState(formatted);
      setDeadline(deadline - 1);
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, [state, last, deadline]);

  return (
    <Styled.TimerContainer>
      {icon && <Styled.CloseIcon onClick={closeTimer} />}
      <Styled.TimerTitle>Старт розыгрыша через</Styled.TimerTitle>
      <Styled.TimerValue nodata={clock === null || state === "0"}>
        {state}
      </Styled.TimerValue>
    </Styled.TimerContainer>
  );
};
