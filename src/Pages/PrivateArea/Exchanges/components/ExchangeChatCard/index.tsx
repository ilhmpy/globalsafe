import React, { FC, useState, useContext, useEffect } from 'react';
import * as S from './S.el';
import { Chip, LeftSide, MessageCard, RightSide, Text, Title } from '../../../components/ui';
import { routers } from '../../../../../constantes/routers';
import { ReactComponent as SendIcon } from '../../../../../assets/v2/svg/send-icon.svg';
import { ReactComponent as AttachIcon } from '../../../../../assets/v2/svg/attach-icon.svg';
import { ViewExchangeModel } from '../../../../../types/exchange';
import { PaymentMethodKind } from '../../../../../types/paymentMethodKind';
import { RootHistory, CollectionHistory } from '../../../../../types/messages';
import { AppContext } from '../../../../../context/HubContext';
import axios from 'axios';
import { API_URL } from '../../../../../constantes/api';
import useLocalStorage from '../../../../../hooks/useLocalStorage';

type Props = {
  exchange: ViewExchangeModel | null;
};

export const ExchangeChatCard: FC<Props> = ({ exchange }: Props) => {
  const [value, setValue] = useState('');
  const { hubConnection, userSafeId } = useContext(AppContext);
  const [history, setHistory] = useState<CollectionHistory[]>([]);
  const [loaderPicture, setLoaderPicture] = useState(false);
  const [myToken] = useLocalStorage('token');

  const handleClick = () => {
    console.log('ExchangeDetailCard Click');
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (value.trim() !== '') {
      fetchText(value);
    }

    setValue('');
  };

  useEffect(() => {
    let cancel = false;
    if (hubConnection && !cancel && exchange) {
      hubConnection
        .invoke<RootHistory>('GetExchangeChat', exchange.safeId, 0, 100)
        .then((res) => {
          setHistory(res.collection.reverse());
          console.log('GetExchangeChat', res);
        })
        .catch((e) => console.log(e));
    }
    return () => {
      cancel = true;
    };
  }, [hubConnection, exchange]);

  useEffect(() => {
    let cancel = false;
    const cb = (data: CollectionHistory) => {
      if (exchange && data.exchangeSafeId === exchange.safeId) {
        if (data.message.trim() !== '') {
          setLoaderPicture(false);
          setHistory([...history, data]);
          // statesBadge(data.exchangeSafeId);
          // scrollto();
        }
      }
    };
    if (hubConnection && !cancel) {
      hubConnection.on('ExchangeMessage', cb);
    }
    return () => {
      cancel = true;
      hubConnection?.off('ExchangeMessage', cb);
    };
  }, [hubConnection, exchange, history]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0] && event.target.files[0].size < 5e6) {
      console.log('event.target.files', event.target.files[0]);
      setLoaderPicture(true);
      // scrollto();
      const fileUploaded = event.target.files[0];
      const val = ['image/jpeg', 'image/png'].includes(fileUploaded.type);
      fetchPicture(event.target.files[0]);
    }
  };

  const fetchText = async (str: string) => {
    try {
      const res = await axios.put(
        `${API_URL}/v1/exchange/${exchange?.safeId}/chat/text?access_token=${myToken}`,
        str,
        {
          headers: {
            'Content-Type': 'text/plain',
          },
        }
      );

      // scrollto();
    } catch (err) {
      console.log(err);
    }
  };

  const fetchPicture = async (img: any) => {
    const formData = new FormData();
    formData.append('file', img);

    try {
      const res = await axios.post(
        `${API_URL}/v1/exchange/${exchange?.safeId}/chat/picture?access_token=${myToken}`,
        formData
      );

      // scrollto();
    } catch (err) {
      console.log(err);
    }
  };

  if (!exchange) {
    return null;
  }

  return (
    <S.Container>
      <LeftSide bg={'#EAEFF4'}>
        <S.BlockWrapper>
          <Chip type="danger">Оставшееся время 03м. 49с.</Chip>
        </S.BlockWrapper>

        <S.BlockWrapper>
          <Text size={14} lH={20} mB={10} black>
            Количество:
          </Text>
          <Title lH={28} mB={10}>
            5 000 000 CWD
          </Title>
          <Chip>Продажа</Chip>
        </S.BlockWrapper>

        <S.BlockWrapper>
          <Text size={14} lH={20} mB={10} black>
            Курс:
          </Text>
          <Title lH={28}>{exchange.rate}</Title>
        </S.BlockWrapper>

        <S.BlockWrapper>
          <Text size={14} lH={20} mB={10} black>
            На сумму:
          </Text>
          <Title lH={28}>4 500 000 USD</Title>
        </S.BlockWrapper>

        <S.BlockWrapper>
          <Text size={14} lH={20} mB={10} black>
            Лимиты:
          </Text>
          <Title lH={28}>1 000 - 10 000 USD</Title>
        </S.BlockWrapper>

        <S.BlockWrapper>
          <Text size={14} lH={20} mB={10} black>
            Методы оплаты:
          </Text>
          <Title lH={28}>{PaymentMethodKind[exchange.kind]}</Title>
        </S.BlockWrapper>

        <S.BlockWrapper>
          <Text size={14} lH={20} mB={10} black>
            Время на обмен:
          </Text>
          <Title lH={28}>20м. 00с.</Title>
        </S.BlockWrapper>

        <S.BlockWrapper>
          <Text size={14} lH={20} mB={10} black>
            Рейтинг продавца:
          </Text>
          <Title lH={28}>{exchange.userRating ? exchange.userRating : 0}</Title>
        </S.BlockWrapper>

        <S.BlockWrapper>
          <S.Link to={routers.p2pchangesOwn}>Ордер продавца по обмену</S.Link>
        </S.BlockWrapper>
      </LeftSide>

      <S.RightSide>
        <S.ChatWrapper>
          <S.ChatHeader>
            <Text size={12} lH={16} black>
              23.09.2021 Четверг
            </Text>
          </S.ChatHeader>

          <S.ChatContainer>
            {history.map((item) => (
              <div key={item.safeId}>
                <MessageCard
                  image={item.messageKind === 1}
                  own={item.userSafeId === userSafeId}
                  body={item}
                />
              </div>
            ))}

            {/* <MessageCard own={false} image />

            <MessageCard
              own={true}
              date="10 минут назад"
              body="Хорошо, надеюсь ничего серьезного с банковской проблемой, отменяю обмен и спасибо что предупредили !"
            />
            <MessageCard own={true} date="Только что" body="Пошел отменять заявку" /> */}
          </S.ChatContainer>

          <S.ChatFooter>
            <S.SendMessageForm onSubmit={handleSendMessage}>
              <S.FileUpload>
                <S.FileInput onChange={handleChange} type="file" hidden />
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
