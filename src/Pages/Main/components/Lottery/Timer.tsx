import React, { useEffect, useState, FC, useContext } from "react";
import * as Styled from "./Lottery.elements";
import { AppContext } from "../../../../context/HubContext";
import moment from "moment";
import { useTranslation } from "react-i18next";
import "moment-duration-format";
import { RootClock } from "../../../../types/clock";
import { Button } from "../../../../components/Button/Button";

type Props = {
  last?: string;
  clock?: RootClock | null;
  icon: boolean;
  closeTimer?: (e: React.MouseEvent) => void;
  timerHistory?: boolean;
};

export const Timer: FC<Props> = ({
  last = "2021-05-22T10:35:43.902Z",
  icon,
  closeTimer,
  timerHistory,
}) => {
  const [state, setState] = useState<null | string>(null);
  const [deadline, setDeadline] = useState(-1);
  const [clock, setClock] = useState<RootClock | null>(null);
  const appContext = useContext(AppContext);
  const hubConnection = appContext.hubConnection;
  const { t } = useTranslation();

  const lang = localStorage.getItem("i18nextLng") || "ru";
  const languale = lang === "ru" ? 1 : 0;

  useEffect(() => {
    let clean = false;
    if (hubConnection) {
      hubConnection
        .invoke<RootClock>("GetNextDraw")
        .then((res) => {
          console.log("GetNextDraw", res);
          !clean && setClock(res);
        })
        .catch((e) => console.log(e));
    }
    return () => {
      clean = true;
    };
  }, [hubConnection]);

  useEffect(() => {
    if (clock) {
      setDeadline((clock.totalSeconds *= -1));
      setState("0");
    }
  }, [last, clock]);

  useEffect(() => {
    if (deadline < 1) {
      setState(null);
      return;
    }

    let timer = setTimeout(() => {
      let durations = moment.duration(deadline, "seconds");
      let formatted;
      if (languale === 1) {
        formatted = durations.format("d[ дн] h[ ч] m[ мин]");
      } else {
        formatted = durations.format("d[ d] h[ H] m[ m]");
      }
      setState(formatted);
      setDeadline(deadline - 1);
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, [state, last, deadline]);

  return (
    <>
      {!timerHistory ? (
        <Styled.TimerContainer>
          {icon && <Styled.CloseIcon onClick={closeTimer} />}
          <Styled.TimerTitle>{t("timerStart")}</Styled.TimerTitle>
          <Styled.TimerValue nodata={clock === null || state === "0"}>
            {state}
          </Styled.TimerValue>
        </Styled.TimerContainer>
      ) : (
        <Styled.TimerHistoryInner>
          <Styled.TimerHisroryTitle>{t("newDraw")}</Styled.TimerHisroryTitle>
          <Styled.TimerHistoryValue nodata={clock === null || state === "0"}>
            {state}
          </Styled.TimerHistoryValue>
        </Styled.TimerHistoryInner>
      )}
    </>
  );
};
