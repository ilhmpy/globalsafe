import React, { useEffect, useState, FC, ReactNode } from "react";
import moment from "moment";
import "moment-duration-format";
import { useTranslation } from "react-i18next";
import { Submit } from ".";

export const Timer: FC<{
  state: null | string;
  setState: (state: null | string) => void;
  value: string;
  last: string | null;
  setTryCode: (num: number) => void;
  tryCode: number;
  children: ReactNode;
}> = ({ state, setState, value, tryCode, last, children }) => {
  // const last = localStorage.getItem("time");
  const [deadline, setDeadline] = useState<number>(0);
  const { t } = useTranslation();
  useEffect(() => {
    if (last) {
      const day = moment.utc().valueOf();
      const day1 = last
        ? moment.utc(last).valueOf() + 1 * 60000
        : moment.utc().valueOf();
      const mins = (day1 - day) / 1000;
      setDeadline(mins);
      setState("0");
    }
  }, [last, tryCode]);
  console.log("state", state);
  const lang = localStorage.getItem("i18nextLng") || "ru";
  const languale = lang === "ru" ? 1 : 0;
  useEffect(() => {
    if (deadline < 0) {
      setState(null);
      return;
    }

    let timer = setTimeout(() => {
      let durations = moment.duration(deadline, "seconds");
      let formatted;
      if (languale === 1) {
        formatted = durations.format("d[дн] h[ч] m[мин] s[с]");
      } else {
        formatted = durations.format("d[d] h[H] m[m] s[s]");
      }

      setState(formatted);
      setDeadline(deadline - 1);
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, [state, last, deadline]);

  return <>{children}</>;
};
