import React, { FC, useState, useEffect, useContext } from 'react';
import * as Styled from './Styled.element';
import { ThemeContext } from '../../context/ThemeContext';

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
}: Props) => {
  const themeContext = useContext(ThemeContext);
  const theme = themeContext.theme;

  const colors = theme === 'light' ? 'rgba(81, 81, 114, .5)' : '#fff';
  const milliseconds = seconds * 1000;
  const radius = size / 2;
  const circumference = size * Math.PI;

  const [countdown, setCountDown] = useState(milliseconds);
  const [isPlay, setIsPlay] = useState(true);

  const strokeDashoffset = () => circumference - (countdown / milliseconds) * circumference;

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
      <Styled.CountContainer>
        <Styled.CountValue strokeColor={colors}>{second}</Styled.CountValue>
        <svg
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            margin: '0 auto',
            transform: 'rotateY(-180deg) rotateZ(-90deg)',
            overflow: 'visible',
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
            stroke={colors}
            strokeWidth={strokeWidth}
          ></circle>
        </svg>
      </Styled.CountContainer>
    </div>
  );
};
