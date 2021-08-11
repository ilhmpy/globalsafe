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
  setShowModal: (value: boolean) => void;
};

export const Timer: FC<Props> = ({
  last = '2021-05-22T10:35:43.902Z',
  icon,
  closeTimer,
  timerHistory,
  setShowModal,
}: Props) => {
  const [state, setState] = useState<any[] | null>(null);
  const [deadline, setDeadline] = useState(-1);
  const [clock, setClock] = useState<RootClock | null>(null);
  const appContext = useContext(AppContext);
  const hubConnection = appContext.hubConnection;
  const { t } = useTranslation();
  const [clickOnIcon, setClickOnIcon] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(15);
  const [display, setDisplay] = useState<boolean>(false);
  const [allTimeLottery, setAllTimeLottery] = useState<any>(null);
  const [defaultTimeLottery, setDefaultTimeLottery] = useState<any>(null);
  const [timerProgress, setTimerProgress] = useState<string | number>(0);

  const lang = localStorage.getItem('i18nextLng') || 'ru';
  const languale = lang === 'ru' ? 1 : 0;

  const getProgress = (data: any) => {
    return Number(
      (100 - (((data[1].days * 24) * 60) + (data[1].hours * 60) + data[1].minutes) / 
      (((data[0].days * 24) * 60) + (data[0].hours * 60) + data[0].minutes) * 100)
      .toFixed(0)
    );
  };

  useEffect(() => {
    let cancel = false;
    const cb = (data: any) => {
      setDeadline(data.totalSeconds);
    };
    if (hubConnection && !cancel) {
      hubConnection.on('DrawCountdown', cb);
      hubConnection
        .invoke('GetNextDraw')
        .then((res) => {
          console.log(res);
          if (res != null) {
            setDeadline(res[1].totalSeconds);
            setClock(res[1]);
            setAllTimeLottery(res[0]);
            console.log(getProgress(res))
            setDefaultTimeLottery(res[1]);
            setProgress(getProgress(res));
          };
          setState(null);
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
        .invoke('GetNextDraw')
        .then((res) => {
          if (res != null) {
            setDeadline(res[1].totalSeconds);
            setClock(res[1]);
          };
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
      !cancel && setState(
        Math.floor(durations.asMinutes()) !== 0 ? 
            [Math.floor(durations.asDays()), Math.floor(durations.asHours()), Math.floor(durations.asMinutes())] : [0, 0, 0]);
      !cancel && setDeadline(deadline - 1);
      !cancel && setProgress(getProgress([allTimeLottery, defaultTimeLottery]));
    }, 1000);

    return () => {
      clearInterval(timer);
      cancel = true;
    };
  }, [state, deadline]);

  let closeTimeOut: any;

  const openWindow = (e: any) => {
    if (screen.width > 480) {
      let timeOut: any;

      if (e.type == "mouseover") {
        setDisplay(true);
        timeOut = setTimeout(() => setTimerProgress(100), 1000);
      } else {
        clearTimeout(timeOut);
        setTimerProgress(0);
        setDisplay(false);
      };
    };
  };

  return (
    <>
       <Styled.TimerModal display={display}> 
          {state == null ? (
           <>
              <Styled.TimerLoading progress={timerProgress} />
              <Styled.TimerModalTitle>{t("time.title")}</Styled.TimerModalTitle>
              {state && (<Styled.TimerModalDuration><span>{state[0]}</span> : <span>{state[1]}</span> : <span>{state[2]}</span></Styled.TimerModalDuration>)}
              <Styled.TimerModalUnits>
                <span>{t("time.days")}</span> <span>{t("time.hours")}</span> <span>{t("time.minutes")}</span>
              </Styled.TimerModalUnits> 
           </>
          ) : (
            <Styled.LoadingBeforeData>
              <Styled.LoadingBeforeItem width="100%" height="34px" />
              <div className="flex_loading">
                <Styled.LoadingBeforeItem width="65px" height="34px" />
                <Styled.LoadingBeforeItem width="65px" height="34px" />
                <Styled.LoadingBeforeItem width="65px" height="34px" />
              </div>
              <div className="flex_loading">

              </div>
            </Styled.LoadingBeforeData>
          )}
        </Styled.TimerModal> 
        <Styled.TimerCircle
          onMouseOver={openWindow}
          onMouseOut={openWindow}
          onClick={() => setShowModal(true)}
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

type OldTimerProps = {
  modalTimer?: boolean;
  history?: boolean;
};

export const OldTimer: FC<OldTimerProps> = ({ modalTimer, history }: OldTimerProps) => {
  const [state, setState] = useState<any>(null);
  const [deadline, setDeadline] = useState(-1);
  const [clock, setClock] = useState<any>(null);
  const [isMobile, setIsMobile] = useState<boolean | undefined>();
  const [otherState, setOtherState] = useState<any[] | undefined>();

  useEffect(() => {
    setIsMobile(screen.width > 480);
  }, []);

  const appContext = useContext(AppContext); 
  const hubConnection = appContext.hubConnection;
  const { t } = useTranslation();
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
        .invoke('GetNextDraw')
        .then((res) => {
          if (res != null) {
            setClock(res[1]);
            setDeadline(res[1].totalSeconds);
            setState([]);
          }
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
          if (res != null) {
            setDeadline(res.totalSeconds);
            setClock(res);
          };
        })
        .catch((e) => console.log(e));
    }
  };

  useEffect(() => {
    let cancel = false;
    if (deadline < 1 && !cancel) {
      setState([]);
      return;
    }
    
    const timer = setInterval(() => {
      const durations = moment.duration(deadline, 'seconds');
      let formatted;
      if (languale === 1) {
        formatted = durations.format('d [дн] h [ч] m [мин]', { trim: false });
      } else {
        formatted = durations.format('d [d] h [h] m [m]', { trim: false });
      }
      !cancel && setOtherState(
        Math.floor(durations.asMinutes()) !== 0 ? 
            [Math.floor(durations.asDays()), Math.floor(durations.asHours()), Math.floor(durations.asMinutes())] : [0, 0, 0]);
      !cancel && setState(formatted);
      !cancel && setDeadline(deadline - 1);
    }, 1000);

    return () => {
      clearInterval(timer);
      cancel = true;
    };
  });

  return (
    <>
      {
        isMobile ? (
          <Styled.TimerHistoryInner mt={modalTimer} history={history}>
             <Styled.TimerHisroryTitle>{history ? t('newDraw') : t('timerStart')}</Styled.TimerHisroryTitle>
             <Styled.TimerHistoryValue nodata={clock === null || state === '0'}>
                {state}
             </Styled.TimerHistoryValue>
          </Styled.TimerHistoryInner>
        ) : (
          <TimerModal state={otherState} />
        )
      }
    </> 
  );
};

export const TimerModal = ({ state }: any) => {
  const { t } = useTranslation();

  return (
    <Styled.TimerModal fixed> 
      <Styled.TimerModalTitle>{t("time.title")}</Styled.TimerModalTitle>
      {state && (<Styled.TimerModalDuration><span>{state[0]}</span> : <span>{state[1]}</span> : <span>{state[2]}</span></Styled.TimerModalDuration>)}
      <Styled.TimerModalUnits>
        <span>{t("time.days")}</span> <span>{t("time.hours")}</span> <span>{t("time.minutes")}</span>
      </Styled.TimerModalUnits> 
    </Styled.TimerModal>
  )
}