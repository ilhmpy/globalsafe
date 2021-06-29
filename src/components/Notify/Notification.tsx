import React, { FC, useState } from "react";
import { CountdownTimer } from "./CountDown";
import * as Styled from "./Styled.element";
import { Notify } from "../../types/notify";

type Props = {
  data: Notify[];
};

export const Notification: FC<Props> = ({ data }) => {
  return (
    <Styled.Container>
      <Styled.ContainerInner>
        {data.map((item, idx) => (
          <NotifyItem data={item} key={idx} />
        ))}
      </Styled.ContainerInner>
    </Styled.Container>
  );
};

type NotifyProps = {
  data: Notify;
};

const NotifyItem: FC<NotifyProps> = ({ data }) => {
  const [show, setShow] = useState(true);

  const timerDone = () => {
    setShow(false);
  };
  return (
    <>
      {show ? (
        <Styled.Notification error={data.error}>
          <Styled.NotificationInner>
            <Styled.Text>{data.text}</Styled.Text>
            <CountdownTimer
              seconds={data.timeleft}
              size={24}
              strokeColor="rgba(81, 81, 114, .5)"
              strokeWidth={4}
              timerDone={timerDone}
            />
          </Styled.NotificationInner>
        </Styled.Notification>
      ) : null}
    </>
  );
};
