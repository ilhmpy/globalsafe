import React, { useEffect, useState, FC } from 'react';
import moment from 'moment';
import 'moment-duration-format';

type Props = {
  data: string | Date;
  delay?: number;
  formatNum?: boolean;
  over?: () => void;
};

export const Counter: FC<Props> = ({ data, formatNum, over, delay }) => {
  const [count, setCount] = useState(0);
  const [start, setStart] = useState(false);
  const [state, setState] = useState<null | string>(null);

  useEffect(() => {
    const day: unknown = moment.utc().valueOf();
    const day1: unknown = data
      ? moment.utc(data).local().valueOf() + (delay ? delay : 0)
      : moment.utc().local().valueOf();

    const mins = Math.trunc(((day1 as number) - (day as number)) / 1000 / 60) * 60;
    const mins1 = (((day1 as number) - (day as number)) / 1000 / 60) * 60;
    if (delay && mins1 > delay / 1000) {
      setCount(mins);
    } else {
      setCount(mins1);
    }

    setStart(true);
  }, [data]);

  useEffect(() => {
    if (start && count > -1) {
      const secondsLeft = setInterval(() => {
        setCount((c) => c - 1);
        const durations = moment.duration(count, 'seconds');
        let formatted;
        if (formatNum) {
          formatted = durations.format('dd[д.] hh[ч.] mm[м.] ss[с.]');
        } else {
          formatted = durations.format('dd : hh : mm : ss');
        }
        setState(formatted);
      }, 1000);
      return () => clearInterval(secondsLeft);
    } else {
      start && over && over();
    }
  }, [start, count]);

  return <>{count > -1 ? state : '0м. 0с.'}</>;
};
