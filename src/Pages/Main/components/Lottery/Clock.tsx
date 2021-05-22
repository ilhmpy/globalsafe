import React, { useState, useEffect } from "react";

export const Clock = () => {
  const data = {
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  };
  const [state, setState] = useState(data);
  const [deadline, setDeadline] = useState(new Date());
  const delay = 2;
  useEffect(() => {
    const getTimeUntil = (deadline: any) => {
      const time =
        Date.parse(new Date(deadline).toISOString()) +
        delay * 60000 -
        Date.parse(new Date().toISOString());
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
