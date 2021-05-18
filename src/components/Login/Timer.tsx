import React, { useEffect, useState, FC } from "react";
import moment from "moment";
import "moment-duration-format";
import { useTranslation } from "react-i18next";
import { Submit } from ".";

export const Timer: FC<{
  state: null | string;
  setState: (state: null | string) => void;
  value: string;
  setTryCode: (num: number) => void;
  tryCode: number;
}> = ({ state, setState, value, tryCode }) => {
  const last = localStorage.getItem("time");
  const [deadline, setDeadline] = useState<number>(0);
  const { t } = useTranslation();
  useEffect(() => {
    if (tryCode > 2) {
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
    <>
      {state === null ? (
        <Submit
          as="button"
          danger
          type="submit"
          disabled={value === "" || state !== null}
        >
          {t("login.in")}
        </Submit>
      ) : (
        <Submit as="button" danger type="submit" disabled>
          {state}
        </Submit>
      )}
    </>
  );
};
