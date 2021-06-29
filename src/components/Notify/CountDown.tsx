import React, { FC, useState, useEffect } from "react";

type Props = {
  seconds: number;
  size: number;
  strokeColor: string;
  strokeWidth: number;
  timerDone: () => void;
};

export const CountdownTimer: FC<Props> = ({
  seconds,
  size,
  strokeColor,
  strokeWidth,
  timerDone,
}) => {
  const milliseconds = seconds * 1000;
  const radius = size / 2;
  const circumference = size * Math.PI;

  const [countdown, setCountDown] = useState(milliseconds);
  const [isPlay, setIsPlay] = useState(true);

  const strokeDashoffset = () =>
    circumference - (countdown / milliseconds) * circumference;

  useEffect(() => {
    let interval: any;
    if (isPlay) {
      interval = setInterval(() => {
        setCountDown(countdown - 10);

        if (countdown === 0) {
          clearInterval(interval);
          setCountDown(0);
          setIsPlay(false);
          timerDone();
        }
      }, 10);
    }
    return () => clearInterval(interval);
  }, [countdown, isPlay]);

  const second = (countdown / 1000).toFixed();

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          position: "relative",
          margin: "auto",
          height: 30,
          width: 30,
        }}
      >
        <p
          style={{
            color: strokeColor,
            fontSize: 12,
            paddingTop: 7,
            paddingLeft: 5,
          }}
        >
          {second}
        </p>
        <svg
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            margin: "0 auto",
            transform: "rotateY(-180deg) rotateZ(-90deg)",
            overflow: "visible",
          }}
        >
          <circle
            strokeDasharray={circumference}
            strokeDashoffset={isPlay ? strokeDashoffset() : 0}
            r={radius}
            cx={radius}
            cy={radius}
            fill="none"
            strokeLinecap="round"
            stroke={strokeColor}
            strokeWidth={strokeWidth}
          ></circle>
        </svg>
      </div>
    </div>
  );
};
