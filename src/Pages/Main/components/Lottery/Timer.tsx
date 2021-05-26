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
    let cancel = false;
    if (hubConnection && !cancel) {
      hubConnection.on("DrawCountdown", (data) => {
        setDeadline(data.totalSeconds);
      });
      hubConnection
        .invoke<RootClock>("GetNextDraw")
        .then((res) => {
          setClock(res);
          setDeadline(res.totalSeconds);
          setState("0");
        })
        .catch((e) => console.log(e));
    }
    return () => {
      cancel = true;
    };
  }, [hubConnection]);

  const repeat = () => {
    if (hubConnection) {
      hubConnection
        .invoke<RootClock>("GetNextDraw")
        .then((res) => {
          console.log("GetNextDraw repeat", res);
          setDeadline(res.totalSeconds);
          setClock(res);
        })
        .catch((e) => console.log(e));
    }
  };

  // useEffect(() => {
  //   let timer = setInterval(() => repeat(), 60000 * 1);
  //   return () => {
  //     clearInterval(timer);
  //   };
  // }, []);

  useEffect(() => {
    let cancel = false;
    if (deadline < 1 && !cancel) {
      setState(null);
      repeat();
      return;
    }

    let timer = setInterval(() => {
      let durations = moment.duration(deadline, "seconds");
      let formatted = durations.format("h:mm:ss", {
        trim: false,
      });

      !cancel && setState(formatted);
      !cancel && setDeadline(deadline - 1);
    }, 1000);

    return () => {
      clearInterval(timer);
      cancel = true;
    };
  }, [state, deadline]);

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
