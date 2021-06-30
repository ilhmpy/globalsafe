import React, { FC, useState } from "react";
import { CountdownTimer } from "./CountDown";
import * as Styled from "./Styled.element";
import { Notify } from "../../types/notify";

type Props = {
  data: Notify[];
  onDelete: (id: number) => void;
};

export const Notification: FC<Props> = ({ data, onDelete }) => {
  return (
    <Styled.Container>
      <Styled.ContainerInner>
        {data.map((item) => (
          <NotifyItem onDelete={onDelete} data={item} key={item.id} />
        ))}
      </Styled.ContainerInner>
    </Styled.Container>
  );
};

type NotifyProps = {
  data: Notify;
  onDelete: (id: number) => void;
};

const NotifyItem: FC<NotifyProps> = ({ data, onDelete }) => {
  const [show, setShow] = useState(true);

  const timerDone = () => {
    setShow(false);
    onDelete(data.id);
  };
  return (
    <>
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
    </>
  );
};
