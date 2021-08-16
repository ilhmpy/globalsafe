import moment from 'moment';
import 'moment-duration-format';
import React, { FC, useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { AppContext } from '../../../../context/HubContext';
import { RootClock } from '../../../../types/clock';
import * as Styled from './Lottery.elements';
import { ReactComponent as Prize } from '../../../../assets/svg/prize.svg';

const getProgress = (data: any) => {
  if (data[0] != null && data[1] != null) {
    return Number(
      ((((data[1].days * 24) * 60) + (data[1].hours * 60) + data[1].minutes) / 
      (((data[0].days * 24) * 60) + (data[0].hours * 60) + data[0].minutes) * 100)
      .toFixed(0)
    );
  } else {
    return 0;
  };
};

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

  useEffect(() => {
    let cancel = false;
    const cb = (data: any) => {
      if (data != null) {
        const durations = moment.duration(data.totalSeconds, 'seconds');
        setDeadline(data.totalSeconds);
        setState(
          Math.floor(durations.asMinutes()) !== 0 ? 
              [Math.floor(durations.asDays()), Math.floor(durations.asHours()), Math.floor(durations.asMinutes())] : null);
        setProgress(getProgress([allTimeLottery, data]));
      };
      console.log(data);
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
      hubConnection.on("DrawCountdown", (data: any) => {
        if (data != null) {
          const durations = moment.duration(data.totalSeconds, 'seconds');
          setDeadline(data.totalSeconds);
          setState(
            Math.floor(durations.asMinutes()) !== 0 ? 
                [Math.floor(durations.asDays()), Math.floor(durations.asHours()), Math.floor(durations.asMinutes())] : null);
          setProgress(getProgress([allTimeLottery, data]));
        };
      })
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
            [Math.floor(durations.asDays()), Math.floor(durations.asHours()), Math.floor(durations.asMinutes())] : null);
      !cancel && setDeadline(deadline - 1);
      !cancel && setProgress(getProgress([allTimeLottery, defaultTimeLottery]));
    }, 1000);

    return () => {
      clearInterval(timer);
      cancel = true;
    };
  }, [deadline]);

  const openWindow = (e: any) => {
    setTimeout(() => setTimerProgress(100), 1000);
    setDisplay(true);
    setTimeout(() => {
      setDisplay(false);
      setTimerProgress(0);
    }, 5000);
  };

  return ( 
    <>
       <Styled.TimerModal display={display} onClick={() => setShowModal(true)}> 
          {state != null ? ( 
           <>
              <Styled.TimerLoading progress={timerProgress} />
              <Styled.TimerModalTitle>{t("time.title")}</Styled.TimerModalTitle>
              <div className="timer_content">
                {state && (<Styled.TimerModalDuration><span>{state[0]}</span> : <span>{state[1]}</span> : <span>{state[2]}</span></Styled.TimerModalDuration>)}
                <Styled.TimerModalUnits>
                  <span>{t("time.days")}</span> <span>{t("time.hours")}</span> <span>{t("time.minutes")}</span>
                </Styled.TimerModalUnits> 
              </div>
           </>
          ) : (
            <Styled.LoadingBeforeData>
              <Styled.LoadingBeforeItem width="90%" height="19px" style={{ margin: "0 auto", marginTop: "10px" }} />
              <div className="flex_loading">
                <Styled.LoadingBeforeItem width="30px" height="19px" />
                <Styled.LoadingBeforeItem width="30px" height="19px" />
                <Styled.LoadingBeforeItem width="30px" height="19px" />
              </div>
              <div className="flex_loading">
                <Styled.LoadingBeforeItem circle width="30px" height="10px"/>
                <Styled.LoadingBeforeItem circle width="30px" height="10px"/>
                <Styled.LoadingBeforeItem circle width="30px" height="10px"/>
              </div>
            </Styled.LoadingBeforeData>
          )}
        </Styled.TimerModal> 
        <Styled.TimerCircle
          onClick={openWindow}
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
  const [otherState, setOtherState] = useState<any>();

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
      if (data != null) {
        const durations = moment.duration(data.totalSeconds, 'seconds');
        setDeadline(data.totalSeconds);
        setOtherState(
          Math.floor(durations.asMinutes()) !== 0 ? 
              [Math.floor(durations.asDays()), Math.floor(durations.asHours()), Math.floor(durations.asMinutes())] : null);
        setState(languale === 1 ? durations.format('d [дн] h [ч] m [мин]', { trim: false }) : durations.format("d [d] h [h] m [m]", { trim: false }));
      };
    };
    if (hubConnection && !cancel) {
      hubConnection.on('DrawCountdown', cb);
      hubConnection
        .invoke('GetNextDraw')
        .then((res) => {
          if (res != null) {
            setClock(res[1]);
            setDeadline(res[1].totalSeconds);
            setOtherState(res[1]);
            setState("0");
          };
        })
        .catch((e) => console.log(e));
    }
    return () => {
      hubConnection?.off('DrawCountdown', cb);
      cancel = true;
    };
  }, [hubConnection]);
 
  const repeat = () => {
    const cb = (data: any) => {
      if (data != null) {
        const durations = moment.duration(data.totalSeconds, 'seconds');
        setDeadline(data.totalSeconds);
        setOtherState(
          Math.floor(durations.asMinutes()) !== 0 ? 
              [Math.floor(durations.asDays()), Math.floor(durations.asHours()), Math.floor(durations.asMinutes())] : null);
        setState(languale === 1 ? durations.format('d [дн] h [ч] m [мин]', { trim: false }) : durations.format("d [d] h [h] m [m]", { trim: false }));
    }
  }
    if (hubConnection) {
      hubConnection.on("DrawCountdown", cb);
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
      setState(null);
      return;
    }
    
    const timer = setInterval(() => {
      const durations = moment.duration(deadline, 'seconds');
      const trim = false;
      let formatted;
      
      if (languale === 1) {
        formatted = durations.format('d [дн] h [ч] m [мин]', { trim });
      } else {
        formatted = durations.format('d [d] h [h] m [m]', { trim });
      };

      !cancel && setOtherState({ days: Math.floor(durations.asDays()), hours: Math.floor(durations.asHours()), minutes: Math.floor(durations.asMinutes())});
      !cancel && setState(formatted);
      !cancel && setDeadline(deadline - 1);
    }, 1000);

    return () => {
      clearInterval(timer);
      cancel = true;
    };
  }, [deadline]);

  return (
    <>
      {  isMobile ? (
          <Styled.TimerHistoryInner mt={modalTimer} history={history}>
             <Styled.TimerHisroryTitle>{history ? t('newDraw') : t('timerStart')}</Styled.TimerHisroryTitle>
             <Styled.TimerHistoryValue nodata={clock === null || state === '0'}>
                {state && ( state )}
             </Styled.TimerHistoryValue>
          </Styled.TimerHistoryInner>
        ) : (
          <>
            <TimerModal state={otherState} />
          </>
        )
      }
    </> 
  );
};

export const TimerModal = ({ state }: any) => {
  console.log(state);
  const { t } = useTranslation();

  return (
    <Styled.TimerModal fixed> 
      <Styled.TimerModalTitle>{t("time.title")}</Styled.TimerModalTitle>
      <div>
        {state && (<Styled.TimerModalDuration><span>{state.days}</span> : <span>{state.hours}</span> : <span>{state.minutes}</span></Styled.TimerModalDuration>)}
        <Styled.TimerModalUnits>
          <span>{t("time.days")}</span> <span>{t("time.hours")}</span> <span>{t("time.minutes")}</span>
        </Styled.TimerModalUnits> 
      </div>
    </Styled.TimerModal>
  )
}