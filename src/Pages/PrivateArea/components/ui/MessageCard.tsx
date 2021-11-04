import moment from 'moment';
import React, { FC } from 'react';
import styled, { css } from 'styled-components';
import { CollectionHistory } from '../../../../types/messages';

interface MessageCardProps {
  own?: boolean;
  image: boolean;
  body: CollectionHistory;
  onClickImage: (item: string) => void;
}

export const MessageCard: FC<MessageCardProps> = ({
  own = true,
  image = false,
  body,
  onClickImage,
}: MessageCardProps) => {
  if (image) {
    return (
      <MessageContainer own={own}>
        <MessageBlock pointer own={own} onClick={() => onClickImage(body.message)}>
          {/* <ChatTestImage /> */}
          <img src={body.message} alt="" />
        </MessageBlock>
      </MessageContainer>
    );
  }

  return (
    <MessageContainer own={own}>
      <MessageDate>{moment.utc(body.messageDate).local().fromNow()}</MessageDate>
      <MessageBlock own={own}>{body.message}</MessageBlock>
    </MessageContainer>
  );
};

const MessageContainer = styled.div<{ own?: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: ${(props) => (props.own ? 'flex-end' : 'flex-start')};
  margin-bottom: 20px;
`;

const MessageDate = styled.div`
  font-weight: 300;
  font-size: 12px;
  line-height: 16px;
  color: ${(props) => props.theme.black};
  margin-bottom: 10px;
`;

const OwnMessageStyles = css`
  border-radius: 4px 0px 4px 4px;
  background: rgba(0, 148, 255, 0.1);
  border: 1px solid rgba(0, 148, 255, 0.1);
`;

const PartnerMessageStyles = css`
  background: #f9fafb;
  border: 1px solid #edf0f7;
  border-radius: 0px 4px 4px 4px;
`;

const MessageBlock = styled.div<{ own?: boolean; pointer?: boolean }>`
  max-width: 470px;
  font-weight: 300;
  font-size: 14px;
  line-height: 20px;
  color: ${(props) => props.theme.black};
  padding: 12px;
  ${(props) => (props.own ? OwnMessageStyles : PartnerMessageStyles)};
  cursor: ${(props) => (props.pointer ? 'pointer' : 'inherit')};
`;
