import moment from 'moment';
import 'moment-duration-format';
import React, { FC, useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { AppContext } from '../../../../context/HubContext';
import { RootClock } from '../../../../types/clock';
import * as Styled from './Lottery.elements';
import { ReactComponent as Prize } from '../../../../assets/svg/prize.svg';

type Props = {
  last?: string;
  clock?: any;
  icon: boolean;
  closeTimer?: (e: React.MouseEvent) => void;
  timerHistory?: boolean;
};

export const Timer: FC<Props> = ({
  last = '2021-05-22T10:35:43.902Z',
  icon,
  closeTimer,
  timerHistory,
}: Props) => {
  const [state, setState] = useState<any[]>([]);
  const [deadline, setDeadline] = useState(-1);
  const [clock, setClock] = useState<RootClock | null>(null);
  const appContext = useContext(AppContext);
  const hubConnection = appContext.hubConnection;
  const { t } = useTranslation();
  const [clickOnIcon, setClickOnIcon] = useState<boolean>(false);
  const [over50, setOver50] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(15);
  const [display, setDisplay] = useState<boolean>(false);

  const lang = localStorage.getItem('i18nextLng') || 'ru';
  const languale = lang === 'ru' ? 1 : 0;

  useEffect(() => {
    let cancel = false;
    const cb = (data: any) => {
      setDeadline(data.totalSeconds);
    };
    if (hubConnection && !cancel) {
      hubConnection.on('DrawCountdown', cb);
      hubConnection
        .invoke<RootClock>('GetNextDraw')
        .then((res) => {
          setClock(res);
          console.log(res);
          setProgress(103);
          setDeadline(res.totalSeconds);
          setState([]);
        })
        .catch((e) => console.log(e));
    }
    return () => {
      hubConnection?.off('DrawCountdown', cb);
      cancel = true;
    };
  }, [hubConnection]);

  const repeat = () => {
    if (hubConnection) {
      hubConnection
        .invoke<RootClock>('GetNextDraw')
        .then((res) => {
          setDeadline(res.totalSeconds);
          setClock(res);
        })
        .catch((e) => console.log(e));
    }
  };

  useEffect(() => {
    let cancel = false;
    if (deadline < 1 && !cancel) {
      setState([]);
      // repeat();
      return;
    }

    const timer = setInterval(() => {
      const durations = moment.duration(deadline, 'seconds');
      const minutes = Math.floor(durations.asMinutes()) != 59 ? 
                      Math.floor(durations.asMinutes()) + 1 : Math.floor(durations.asMinutes()); 
      !cancel && setState(
        Math.floor(durations.asMinutes()) !== 0 ? 
            [Math.floor(durations.asDays()), Math.floor(durations.asHours()), minutes] : [0, 0, 0]);
      !cancel && setDeadline(deadline - 1);
    }, 1000);

    return () => {
      clearInterval(timer);
      cancel = true;
    };
  }, [state, deadline]);

  return (
    <>
      <Styled.TimerModal display={display}> 
        <Styled.TimerModalTitle>{t("time.title")}</Styled.TimerModalTitle>
        {state && (<Styled.TimerModalDuration><span>{state[0]}</span> : <span>{state[1]}</span> : <span>{state[2]}</span></Styled.TimerModalDuration>)}
        <Styled.TimerModalUnits>
          <span>{t("time.days")}</span> <span>{t("time.hours")}</span> <span>{t("time.minutes")}</span>
        </Styled.TimerModalUnits> 
      </Styled.TimerModal>
      <Styled.TimerCircle
        onMouseOver={() => setDisplay(!display)}
        onMouseOut={() => setDisplay(!display)}
      >
        <div>
          <Styled.TimerProgress progress={progress}></Styled.TimerProgress>
          <Styled.TimerIn>
            <Prize />
          </Styled.TimerIn>
        </div>
      </Styled.TimerCircle>
    </>
  );
};