import React, { useState, useEffect, useContext } from "react";
import { AppContext } from "../../../../context/HubContext";
import { RootClock } from "../../../../types/clock";

export const Clock = () => {
  const data = {
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  };
  const [state, setState] = useState(data);
  const [deadline, setDeadline] = useState(-1);
  const [clock, setClock] = useState<RootClock | null>(null);
  const appContext = useContext(AppContext);
  const hubConnection = appContext.hubConnection;
  const delay = 2;
  useEffect(() => {
    let cancel = false;
    if (hubConnection && !cancel) {
      hubConnection
        .invoke<RootClock>("GetNextDraw")
        .then((res) => {
          setClock(res);
          setDeadline(res.totalMilliseconds);
        })
        .catch((e) => console.log(e));
    }
    return () => {
      cancel = true;
    };
  }, [hubConnection]);

  // useEffect(() => {
  //   let cancel = false;
  //   if (clock && !cancel) {
  //     setDeadline(clock.milliseconds);
  //     // setState("0");
  //   }
  //   return () => {
  //     cancel = true;
  //   };
  // }, [clock]);

  useEffect(() => {
    const getTimeUntil = (time: any) => {
      // Date.parse(new Date(deadline).toISOString()) +
      // delay * 60000 -
      // Date.parse(new Date().toISOString());
      // const datas = new Date(deadline) - new Date();
      // const time =
      //   Date.parse(deadline) + delay * 60000 - Date.parse(new Date());
      console.log("time", time);

      if (time < 0) {
        setState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      } else {
        const seconds = Math.floor((time / 1000) % 60);
        const minutes = Math.floor((time / 1000 / 60) % 60);
        const hours = Math.floor((time / (1000 * 60 * 60)) % 24);
        const days = Math.floor(time / (1000 * 60 * 60 * 24));
        setState({ days, hours, minutes, seconds });
        setDeadline(deadline - 1000);
      }
    };
    let timer = setInterval(() => getTimeUntil(deadline), 1000);
    return () => clearInterval(timer);
  }, [deadline]);

  const leading0 = (num: number) => {
    return num < 10 ? "0" + num : num;
  };

  return (
    <div>
      {/* <div className="Clock-days">{this.leading0(this.state.days)} Days</div>
        <div className="Clock-hours">
          {this.leading0(this.state.hours)} Hours
        </div> */}
      <div className="Clock-minutes">{leading0(state.hours)} hours</div>
      <div className="Clock-minutes">{leading0(state.minutes)} Minutes</div>
      <div className="Clock-seconds">{leading0(state.seconds)} Seconds</div>
    </div>
  );
};
