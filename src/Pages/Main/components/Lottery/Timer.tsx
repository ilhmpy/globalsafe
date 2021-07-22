import moment from 'moment';
import 'moment-duration-format';
import React, { FC, useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { AppContext } from '../../../../context/HubContext';
import { RootClock } from '../../../../types/clock';
import * as Styled from './Lottery.elements';

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
  const [state, setState] = useState<null | string>(null);
  const [deadline, setDeadline] = useState(-1);
  const [clock, setClock] = useState<RootClock | null>(null);
  const appContext = useContext(AppContext);
  const hubConnection = appContext.hubConnection;
  const { t } = useTranslation();

  const lang = localStorage.getItem('i18nextLng') || 'ru';
  const languale = lang === 'ru' ? 1 : 0;

  useEffect(() => {
    let cancel = false;
    if (hubConnection && !cancel) {
      hubConnection.on('DrawCountdown', (data) => {
        setDeadline(data.totalSeconds);
      });
      hubConnection
        .invoke<RootClock>('GetNextDraw')
        .then((res) => {
          setClock(res);
          setDeadline(res.totalSeconds);
          setState('0');
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
      setState(null);
      // repeat();
      return;
    }

    const timer = setInterval(() => {
      const durations = moment.duration(deadline, 'seconds');
      let formatted;
      if (languale === 1) {
        formatted = durations.format('d [дн] h [ч] m [мин]', { trim: false });
      } else {
        formatted = durations.format('d [d] h [h] m [m]', { trim: false });
      };
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
          <Styled.TimerTitle>{t('timerStart')}</Styled.TimerTitle>
          <Styled.TimerValue nodata={clock === null || state === '0'}>{state}</Styled.TimerValue>
        </Styled.TimerContainer>
      ) : (
        <Styled.TimerHistoryInner>
          <Styled.TimerHisroryTitle>{t('newDraw')}</Styled.TimerHisroryTitle>
          <Styled.TimerHistoryValue nodata={clock === null || state === '0'}>
            {state}
          </Styled.TimerHistoryValue>
        </Styled.TimerHistoryInner>
      )}
    </>
  );
};
