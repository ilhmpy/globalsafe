import React, { FC, useState } from 'react';
import * as S from './S.el';
import {
  Chip,
  LeftSide,
  MessageCard,
  RightSide,
  Text,
  Title,
} from '../../../components/ui';
import { routers } from '../../../../../constantes/routers';
import {ReactComponent as SendIcon} from '../../../../../assets/v2/svg/send-icon.svg';
import {ReactComponent as AttachIcon} from '../../../../../assets/v2/svg/attach-icon.svg';

export const ExchangeChatCard: FC = () => {
  const [value, setValue] = useState('');
  
  const handleClick = () => {
    console.log("ExchangeDetailCard Click")
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <S.Container>
      <LeftSide bg={'#EAEFF4'}>
        <S.BlockWrapper>
          <Chip type="danger">Оставшееся время 03м. 49с.</Chip>
        </S.BlockWrapper>

        <S.BlockWrapper>
          <Text size={14} lH={20} mB={10} black>Количество:</Text>
          <Title lH={28} mB={10}>5 000 000 CWD</Title>
          <Chip>Продажа</Chip>
        </S.BlockWrapper>

        <S.BlockWrapper>
          <Text size={14} lH={20} mB={10} black>Курс:</Text>
          <Title lH={28}>0.90</Title>
        </S.BlockWrapper>

        <S.BlockWrapper>
          <Text size={14} lH={20} mB={10} black>На сумму:</Text>
          <Title lH={28}>4 500 000 USD</Title>
        </S.BlockWrapper>

        <S.BlockWrapper>
          <Text size={14} lH={20} mB={10} black>Лимиты:</Text>
          <Title lH={28}>1 000 - 10 000 USD</Title>
        </S.BlockWrapper>

        <S.BlockWrapper>
          <Text size={14} lH={20} mB={10} black>Методы оплаты:</Text>
          <Title lH={28}>АО «Тинькофф Банк»</Title>
        </S.BlockWrapper>

        <S.BlockWrapper>
          <Text size={14} lH={20} mB={10} black>Время на обмен:</Text>
          <Title lH={28}>20м. 00с.</Title>
        </S.BlockWrapper>

        <S.BlockWrapper>
          <Text size={14} lH={20} mB={10} black>Рейтинг продавца:</Text>
          <Title lH={28}>5.0 (378)</Title>
        </S.BlockWrapper>

        <S.BlockWrapper>
            <S.Link to={routers.p2pchangesOwn}>
                Ордер продавца по обмену
            </S.Link>
        </S.BlockWrapper>
        
      </LeftSide>

      <S.RightSide>
        <S.ChatWrapper>
            <S.ChatHeader>
                <Text size={12} lH={16} black>23.09.2021 Четверг</Text>
            </S.ChatHeader>

            <S.ChatContainer>
                <MessageCard 
                    own={false}
                    date="15 минут назад"
                    body="Добрый вечер, я отправил деньги на указанный счет, давайте ускорим процесс обмена :)"
                />
                <MessageCard own={false} image />

                <MessageCard 
                    own={true} 
                    date="10 минут назад"
                    body="Хорошо, надеюсь ничего серьезного с банковской проблемой, отменяю обмен и спасибо что предупредили !"
                />
                  <MessageCard 
                    own={true} 
                    date="Только что"
                    body="Пошел отменять заявку"
                />
                <MessageCard 
                    own={false}
                    date="15 минут назад"
                    body="Добрый вечер, я отправил деньги на указанный счет, давайте ускорим процесс обмена :)"
                />
                <MessageCard own={false} image />

                <MessageCard 
                    own={true} 
                    date="10 минут назад"
                    body="Хорошо, надеюсь ничего серьезного с банковской проблемой, отменяю обмен и спасибо что предупредили !"
                />
                  <MessageCard 
                    own={true} 
                    date="Только что"
                    body="Пошел отменять заявку"
                />
                  <MessageCard 
                    own={false}
                    date="15 минут назад"
                    body="Добрый вечер, я отправил деньги на указанный счет, давайте ускорим процесс обмена :)"
                />
                <MessageCard own={false} image />

                <MessageCard 
                    own={true} 
                    date="10 минут назад"
                    body="Хорошо, надеюсь ничего серьезного с банковской проблемой, отменяю обмен и спасибо что предупредили !"
                />
                  <MessageCard 
                    own={true} 
                    date="Только что"
                    body="Пошел отменять заявку"
                />
            </S.ChatContainer>

            <S.ChatFooter>
                <S.SendMessageForm onSubmit={handleSendMessage}>
                    <S.FileUpload>
                        <S.FileInput type="file" hidden />
                        <AttachIcon />
                    </S.FileUpload>
                    <S.SendInput 
                        placeholder="Ваше сообщение"
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                    />
                    <S.SendButton type="submit">
                        <SendIcon />
                    </S.SendButton>
                </S.SendMessageForm>
            </S.ChatFooter>
        </S.ChatWrapper>
      </S.RightSide>

    </S.Container>
  );
};
