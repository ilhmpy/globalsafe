import React, { FC, useState, useContext, useEffect, useRef } from 'react';
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
import { Counter } from '../../../components/ui/Counter';
import { Balance } from '../../../../../types/balance';
import { FiatKind } from '../../../../../types/fiatKind';
import moment from 'moment';
import 'moment-duration-format';
import { payListItem } from '../../../Settings/utils';
import 'moment/locale/ru';
import { Loading } from '../../../../../components/UI/Loading';
import { TypeFlags } from 'typescript';
import { ModalShowImage } from './ModalShow';

type Props = {
  exchange: ViewExchangeModel | null;
};

type HistoryCollection = {
  [elemName: string]: CollectionHistory[];
};

export const ExchangeChatCard: FC<Props> = ({ exchange }: Props) => {
  const [value, setValue] = useState('');
  const { hubConnection, userSafeId } = useContext(AppContext);
  const [history, setHistory] = useState<CollectionHistory[]>([]);
  const [historyList, setHistoryList] = useState<HistoryCollection | null>(null);
  const [loaderPicture, setLoaderPicture] = useState(false);
  const [modalImage, setModalImage] = useState<null | string>(null);
  const [myToken] = useLocalStorage('token');
  const ref = useRef<HTMLDivElement>(null);
  const messageEl = useRef<HTMLDivElement>(null);
  moment.locale('ru');

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (value.trim() !== '') {
      fetchText(value);
    }

    setValue('');
  };

  const scrolltoTest = () => {
    if (ref && ref.current) {
      ref.current.scrollTop = ref.current.scrollHeight - ref.current.clientHeight;
    }
  };

  useEffect(() => {
    let cancel = false;
    if (hubConnection && !cancel && exchange) {
      hubConnection
        .invoke<RootHistory>('GetExchangeChat', exchange.safeId, 0, 100)
        .then((res) => {
          const result: HistoryCollection = {};
          res.collection.forEach((item) => {
            const d = moment.utc(item.messageDate).local().format('MM/DD/YYYY');
            if (result[d]) {
              result[d].push(item);
            } else {
              result[d] = [item];
            }
          });
          setHistoryList(result);
          // console.log('GetExchangeChat', res);
          scrolltoTest();
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
          setHistory([...history, data]);

          const result: HistoryCollection = { ...historyList };

          const d = moment.utc(data.messageDate).local().format('MM/DD/YYYY');
          if (result[d]) {
            result[d].push(data);
          } else {
            result[d] = [data];
          }
          setHistoryList(result);
          setLoaderPicture(false);

          // statesBadge(data.exchangeSafeId);
          scrolltoTest();
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
  }, [hubConnection, exchange, historyList]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0] && event.target.files[0].size < 5e6) {
      // console.log('event.target.files', event.target.files[0]);
      setLoaderPicture(true);
      scrolltoTest();
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

  useEffect(() => {
    if (loaderPicture) {
      scrolltoTest();
    }
  }, [loaderPicture]);

  useEffect(() => {
    if (historyList) {
      scrolltoTest();
    }
  }, []);

  useEffect(() => {
    if (!historyList) return;
    const timer = setTimeout(() => scrolltoTest(), 2000);
    return () => clearTimeout(timer);
  }, [historyList]);

  const onCloseModal = () => {
    setModalImage(null);
  };

  const onClickImage = (item: string) => {
    setModalImage(item);
  };

  const buyer =
    (exchange && exchange.kind === 0 && exchange.ownerSafeId !== userSafeId) ||
    (exchange && exchange.kind === 1 && exchange.ownerSafeId === userSafeId);

  if (!exchange) {
    return null;
  }

  return (
    <S.Container>
      <LeftSide bg={'#EAEFF4'}>
        <S.BlockWrapper>
          <Chip type="danger">
            Оставшееся время&nbsp;
            <Counter
              data={exchange.creationDate}
              delay={exchange.operationWindow.totalMilliseconds}
              formatNum
            />
          </Chip>
        </S.BlockWrapper>

        <S.BlockWrapper>
          <Text size={14} lH={20} mB={10} black>
            Количество:
          </Text>
          <Title lH={28} mB={10}>
            {(exchange.volume / 100000).toLocaleString('en-US', {
              maximumFractionDigits: 2,
            })}{' '}
            {Balance[exchange.assetKind]}
          </Title>
          <Chip>{buyer ? 'Покупка' : 'Продажа'}</Chip>
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
          <Title lH={28}>
            {(exchange.exchangeVolume / 100000).toLocaleString('en-US', {
              maximumFractionDigits: 2,
            })}{' '}
            {FiatKind[exchange.exchangeAssetKind]}
          </Title>
        </S.BlockWrapper>

        <S.BlockWrapper>
          <Text size={14} lH={20} mB={10} black>
            Лимиты:
          </Text>
          <Title lH={28}>
            {(exchange.limitFrom / 100000).toLocaleString('en-US', {
              maximumFractionDigits: 2,
            })}{' '}
            -{' '}
            {(exchange.limitTo / 100000).toLocaleString('en-US', {
              maximumFractionDigits: 2,
            })}
            &nbsp;{FiatKind[exchange.exchangeAssetKind]}
          </Title>
        </S.BlockWrapper>

        <S.BlockWrapper>
          <Text size={14} lH={20} mB={10} black>
            Методы оплаты:
          </Text>
          {exchange.methodsKinds.map((i) => (
            <Title key={i} lH={28}>
              {payListItem(i)}
            </Title>
          ))}
        </S.BlockWrapper>

        <S.BlockWrapper>
          <Text size={14} lH={20} mB={10} black>
            Время на обмен:
          </Text>
          <Title lH={28}>
            {moment
              .duration(exchange.operationWindow.totalSeconds, 'seconds')
              .format('dd[д.] hh[ч.] mm[м.]')}
          </Title>
        </S.BlockWrapper>

        <S.BlockWrapper>
          <Text size={14} lH={20} mB={10} black>
            Рейтинг продавца:
          </Text>
          <Title lH={28}>{exchange.userRating ? exchange.userRating : 0}</Title>
        </S.BlockWrapper>

        <S.BlockWrapper>
          <S.Link to={routers.p2pchangesSingleOrderDetails + '/' + exchange.orderSafeId}>
            Ордер продавца по обмену
          </S.Link>
        </S.BlockWrapper>
      </LeftSide>

      <S.RightSide>
        {modalImage && <ModalShowImage image={modalImage} onClose={onCloseModal} />}
        <S.ChatWrapper>
          <S.ChatContainer ref={ref}>
            {historyList
              ? Object.keys(historyList).map((key) => (
                  <div key={key}>
                    <S.ChatHeader>
                      <Text size={12} lH={16} black>
                        {moment(new Date(key)).calendar(null, {
                          lastDay: `[Вчера]`,
                          sameDay: `[Сегодня]`,
                          lastWeek: 'MMMM DD',
                          nextWeek: 'dddd',
                          sameElse: 'MMMM DD',
                        })}
                      </Text>
                    </S.ChatHeader>
                    <>
                      {historyList[key].map((item) => (
                        <MessageCard
                          onClickImage={onClickImage}
                          key={item.safeId}
                          image={item.messageKind === 1}
                          own={item.userSafeId === userSafeId}
                          body={item}
                        />
                      ))}
                    </>
                  </div>
                ))
              : null}
            {loaderPicture ? (
              <S.LoaderContainer>
                <Loading />
              </S.LoaderContainer>
            ) : null}
            {/* <div ref={ref} /> */}
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
