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
import { ModalLoadFile } from './ModalLoadFile';

type Props = {
  exchange: ViewExchangeModel | null;
};

type HistoryCollection = {
  [elemName: string]: CollectionHistory[];
};

export const ExchangeChatCard: FC<Props> = ({ exchange }: Props) => {
  const [value, setValue] = useState('');
  const { hubConnection, userSafeId, user } = useContext(AppContext);
  const [history, setHistory] = useState<CollectionHistory[]>([]);
  const [historyList, setHistoryList] = useState<HistoryCollection | null>(null);
  const [loaderPicture, setLoaderPicture] = useState(false);
  const [modalImage, setModalImage] = useState<null | string>(null);
  const [modalLoadFile, setModalLoadFile] = useState(false);
  const [myToken] = useLocalStorage('token');
  const ref = useRef<HTMLDivElement>(null);

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
          // setHistory([...history, data]);

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

  const fetchText = async (str: string) => {
    try {
      await axios.put(
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
      const mock = {
        id: new Date().valueOf(),
        safeId: new Date().valueOf().toString(),
        userId: 1,
        userSafeId: userSafeId,
        userName: user,
        exchangeId: 1,
        exchangeSafeId: new Date().valueOf().toString(),
        message: 'Ошибка отправки файла',
        messageKind: 3,
        messageDate: moment.utc().toString(),
      };
      const result: HistoryCollection = { ...historyList };

      const d = moment(mock.messageDate).format('MM/DD/YYYY');
      if (result[d]) {
        result[d].push(mock as CollectionHistory);
      } else {
        result[d] = [mock as CollectionHistory];
      }
      setHistoryList(result);
      scrolltoTest();
    }
  };

  const fetchPicture = async (type: string, img: any) => {
    const formData = new FormData();
    formData.append('file', img);

    try {
      await axios.post(
        `${API_URL}/v1/exchange/${exchange?.safeId}/chat/picture?access_token=${myToken}`,
        formData
      );
    } catch (err) {
      console.log(err);
      setLoaderPicture(false);
      const mock = {
        id: new Date().valueOf(),
        safeId: new Date().valueOf().toString(),
        userId: 1,
        userSafeId: userSafeId,
        userName: user,
        exchangeId: 1,
        exchangeSafeId: new Date().valueOf().toString(),
        message: 'Ошибка отправки файла',
        messageKind: 3,
        messageDate: moment.utc().toString(),
      };
      const result: HistoryCollection = { ...historyList };

      const d = moment(mock.messageDate).format('MM/DD/YYYY');
      if (result[d]) {
        result[d].push(mock as CollectionHistory);
      } else {
        result[d] = [mock as CollectionHistory];
      }
      setHistoryList(result);
      scrolltoTest();
    } finally {
      onClose();
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

  const balanceValue = (type: number, volume: number) => {
    if (type === Balance.GLOBAL) {
      return volume / 10000;
    } else if (type === Balance.MULTICS) {
      return volume / 100;
    } else {
      return volume / 100000;
    }
  };

  const onClose = () => {
    setModalLoadFile(false);
  };

  const onChangeText = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value[value.length - 1] === "'") {
      setValue((text) => text + '`');
    } else {
      setValue(value);
    }
  };

  return (
    <div>
      <S.Container>
        <ModalLoadFile
          open={modalLoadFile}
          onClose={onClose}
          setLoaderPicture={setLoaderPicture}
          scrolltoTest={scrolltoTest}
          fetchPicture={fetchPicture}
        />
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
              {balanceValue(exchange.assetKind, exchange.volume).toLocaleString('en-US', {
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
              {balanceValue(exchange.exchangeAssetKind, exchange.exchangeVolume).toLocaleString(
                'en-US',
                {
                  maximumFractionDigits: 2,
                }
              )}{' '}
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
                            lastDay: `Вчера`,
                            sameDay: `Сегодня`,
                            lastWeek: 'DD.MM.YYYY dddd',
                            nextWeek: 'DD.MM.YYYY dddd',
                            sameElse: 'DD.MM.YYYY dddd',
                          })}
                        </Text>
                      </S.ChatHeader>
                      <>
                        {historyList[key].map((item) => (
                          <MessageCard
                            onClickImage={onClickImage}
                            key={item.safeId}
                            image={item.messageKind === 1}
                            error={item.messageKind === 3}
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
            </S.ChatContainer>

            <S.ChatFooter>
              <S.SendMessageForm onSubmit={handleSendMessage}>
                <S.FileUpload onClick={() => setModalLoadFile(true)}>
                  <AttachIcon />
                </S.FileUpload>
                <S.SendInput placeholder="Ваше сообщение" value={value} onChange={onChangeText} />
                <S.SendButton type="submit">
                  <SendIcon />
                </S.SendButton>
              </S.SendMessageForm>
            </S.ChatFooter>
          </S.ChatWrapper>
        </S.RightSide>
      </S.Container>
    </div>
  );
};
