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
import { Counter } from '../../../components/ui/Counter';
import { Balance } from '../../../../../types/balance';
import { FiatKind } from '../../../../../types/fiatKind';
import moment from 'moment';
import 'moment-duration-format';
import { payListItem } from '../../../Settings/utils';
import 'moment/locale/ru';

const mockData = [
  {
    id: 376555433711632400,
    safeId: '376555433711632384',
    userId: 360995785362374660,
    userSafeId: '285281138115608576',
    userName: '66945102791',
    exchangeId: 376539349059108860,
    exchangeSafeId: '376539349059108864',
    message: '1',
    messageKind: 0,
    messageDate: '2021-10-11T17:47:24',
  },
  {
    id: 376557284842536960,
    safeId: '376557284842536960',
    userId: 360995785362374660,
    userSafeId: '360995785362374656',
    userName: '66945102791',
    exchangeId: 376539349059108860,
    exchangeSafeId: '376539349059108864',
    message: ')',
    messageKind: 0,
    messageDate: '2021-10-11T17:54:35',
  },
  {
    id: 377098772844380160,
    safeId: '377098772844380161',
    userId: 360995785362374660,
    userSafeId: '360995785362374656',
    userName: '66945102791',
    exchangeId: 376539349059108860,
    exchangeSafeId: '376539349059108864',
    message: 'https://tarzanthekingofjungle.blob.core.windows.net/pictures/377098772844380160.jpg',
    messageKind: 1,
    messageDate: '2021-10-13T04:55:50',
  },
  {
    id: 377098811499085800,
    safeId: '377098811499085825',
    userId: 360995785362374660,
    userSafeId: '360995785362374656',
    userName: '66945102791',
    exchangeId: 376539349059108860,
    exchangeSafeId: '376539349059108864',
    message: 'https://tarzanthekingofjungle.blob.core.windows.net/pictures/377098811499085824.jpg',
    messageKind: 1,
    messageDate: '2021-10-13T04:55:59',
  },
  {
    id: 377099339780063200,
    safeId: '377099339780063233',
    userId: 360995785362374660,
    userSafeId: '360995785362374656',
    userName: '66945102791',
    exchangeId: 376539349059108860,
    exchangeSafeId: '376539349059108864',
    message: 'https://tarzanthekingofjungle.blob.core.windows.net/pictures/377099339780063232.jpg',
    messageKind: 1,
    messageDate: '2021-10-13T04:58:02',
  },
  {
    id: 377104510920687600,
    safeId: '377104510920687616',
    userId: 360995785362374660,
    userSafeId: '360995785362374656',
    userName: '66945102791',
    exchangeId: 376539349059108860,
    exchangeSafeId: '376539349059108864',
    message: 'https://tarzanthekingofjungle.blob.core.windows.net/pictures/377104506625720320.jpg',
    messageKind: 1,
    messageDate: '2021-10-13T05:18:06',
  },
  {
    id: 377105082151338000,
    safeId: '377105082151337984',
    userId: 360995785362374660,
    userSafeId: '360995785362374656',
    userName: '66945102791',
    exchangeId: 376539349059108860,
    exchangeSafeId: '376539349059108864',
    message: 'https://tarzanthekingofjungle.blob.core.windows.net/pictures/377105077856370688.jpg',
    messageKind: 1,
    messageDate: '2021-10-13T05:20:19',
  },
  {
    id: 377105318374539260,
    safeId: '377105318374539265',
    userId: 360995785362374660,
    userSafeId: '360995785362374656',
    userName: '66945102791',
    exchangeId: 376539349059108860,
    exchangeSafeId: '376539349059108864',
    message: 'https://tarzanthekingofjungle.blob.core.windows.net/pictures/377105318374539264.jpg',
    messageKind: 1,
    messageDate: '2021-10-13T05:21:14',
  },
  {
    id: 377113968438673400,
    safeId: '377113968438673408',
    userId: 360995785362374660,
    userSafeId: '360995785362374656',
    userName: '66945102791',
    exchangeId: 376539349059108860,
    exchangeSafeId: '376539349059108864',
    message: 'https://tarzanthekingofjungle.blob.core.windows.net/pictures/377113964143706112.jpg',
    messageKind: 1,
    messageDate: '2021-10-13T05:54:48',
  },
  {
    id: 377115883994087400,
    safeId: '377115883994087424',
    userId: 360995785362374660,
    userSafeId: '360995785362374656',
    userName: '66945102791',
    exchangeId: 376539349059108860,
    exchangeSafeId: '376539349059108864',
    message: '1',
    messageKind: 0,
    messageDate: '2021-10-13T06:02:14',
  },
  {
    id: 377224744235171840,
    safeId: '377224744235171840',
    userId: 360995785362374660,
    userSafeId: '360995785362374656',
    userName: '66945102791',
    exchangeId: 376539349059108860,
    exchangeSafeId: '376539349059108864',
    message: 'https://tarzanthekingofjungle.blob.core.windows.net/pictures/377224739940204544.jpg',
    messageKind: 1,
    messageDate: '2021-10-13T13:04:40',
  },
  {
    id: 377225259631247360,
    safeId: '377225259631247361',
    userId: 360995785362374660,
    userSafeId: '360995785362374656',
    userName: '66945102791',
    exchangeId: 376539349059108860,
    exchangeSafeId: '376539349059108864',
    message: 'https://tarzanthekingofjungle.blob.core.windows.net/pictures/377225259631247360.jpg',
    messageKind: 1,
    messageDate: '2021-10-13T13:06:40',
  },
  {
    id: 377225822271963140,
    safeId: '377225822271963136',
    userId: 360995785362374660,
    userSafeId: '360995785362374656',
    userName: '66945102791',
    exchangeId: 376539349059108860,
    exchangeSafeId: '376539349059108864',
    message: 'https://tarzanthekingofjungle.blob.core.windows.net/pictures/377225817976995840.jpg',
    messageKind: 1,
    messageDate: '2021-10-13T13:08:51',
  },
  {
    id: 377227295445745660,
    safeId: '377227295445745665',
    userId: 360995785362374660,
    userSafeId: '360995785362374656',
    userName: '66945102791',
    exchangeId: 376539349059108860,
    exchangeSafeId: '376539349059108864',
    message: 'https://tarzanthekingofjungle.blob.core.windows.net/pictures/377227295445745664.jpg',
    messageKind: 1,
    messageDate: '2021-10-13T13:14:34',
  },
  {
    id: 377227643338096640,
    safeId: '377227643338096640',
    userId: 360995785362374660,
    userSafeId: '360995785362374656',
    userName: '66945102791',
    exchangeId: 376539349059108860,
    exchangeSafeId: '376539349059108864',
    message: 'https://tarzanthekingofjungle.blob.core.windows.net/pictures/377227639043129344.jpg',
    messageKind: 1,
    messageDate: '2021-10-13T13:15:55',
  },
  {
    id: 377228180209008640,
    safeId: '377228180209008641',
    userId: 360995785362374660,
    userSafeId: '360995785362374656',
    userName: '66945102791',
    exchangeId: 376539349059108860,
    exchangeSafeId: '376539349059108864',
    message: 'https://tarzanthekingofjungle.blob.core.windows.net/pictures/377228180209008640.jpg',
    messageKind: 1,
    messageDate: '2021-10-13T13:18:00',
  },
  {
    id: 377228493741621250,
    safeId: '377228493741621248',
    userId: 360995785362374660,
    userSafeId: '360995785362374656',
    userName: '66945102791',
    exchangeId: 376539349059108860,
    exchangeSafeId: '376539349059108864',
    message: 'https://tarzanthekingofjungle.blob.core.windows.net/pictures/377228489446653952.jpg',
    messageKind: 1,
    messageDate: '2021-10-13T13:19:13',
  },
  {
    id: 377230194548670460,
    safeId: '377230194548670465',
    userId: 360995785362374660,
    userSafeId: '360995785362374656',
    userName: '66945102791',
    exchangeId: 376539349059108860,
    exchangeSafeId: '376539349059108864',
    message: 'https://tarzanthekingofjungle.blob.core.windows.net/pictures/377230194548670464.jpg',
    messageKind: 1,
    messageDate: '2021-10-13T13:25:49',
  },
  {
    id: 377230435066839040,
    safeId: '377230435066839041',
    userId: 360995785362374660,
    userSafeId: '360995785362374656',
    userName: '66945102791',
    exchangeId: 376539349059108860,
    exchangeSafeId: '376539349059108864',
    message: 'https://tarzanthekingofjungle.blob.core.windows.net/pictures/377230435066839040.jpg',
    messageKind: 1,
    messageDate: '2021-10-13T13:26:45',
  },
  {
    id: 377230735714549760,
    safeId: '377230735714549761',
    userId: 360995785362374660,
    userSafeId: '360995785362374656',
    userName: '66945102791',
    exchangeId: 376539349059108860,
    exchangeSafeId: '376539349059108864',
    message: 'https://tarzanthekingofjungle.blob.core.windows.net/pictures/377230735714549760.jpg',
    messageKind: 1,
    messageDate: '2021-10-13T13:27:55',
  },
  {
    id: 377230800139059200,
    safeId: '377230800139059200',
    userId: 360995785362374660,
    userSafeId: '360995785362374656',
    userName: '66945102791',
    exchangeId: 376539349059108860,
    exchangeSafeId: '376539349059108864',
    message: 'https://tarzanthekingofjungle.blob.core.windows.net/pictures/377230795844091904.jpg',
    messageKind: 1,
    messageDate: '2021-10-13T13:28:10',
  },
  {
    id: 377230855973634050,
    safeId: '377230855973634049',
    userId: 360995785362374660,
    userSafeId: '360995785362374656',
    userName: '66945102791',
    exchangeId: 376539349059108860,
    exchangeSafeId: '376539349059108864',
    message: 'https://tarzanthekingofjungle.blob.core.windows.net/pictures/377230855973634048.jpg',
    messageKind: 1,
    messageDate: '2021-10-13T13:28:23',
  },
  {
    id: 377231190981083140,
    safeId: '377231190981083136',
    userId: 360995785362374660,
    userSafeId: '360995785362374656',
    userName: '66945102791',
    exchangeId: 376539349059108860,
    exchangeSafeId: '376539349059108864',
    message: 'https://tarzanthekingofjungle.blob.core.windows.net/pictures/377231186686115840.jpg',
    messageKind: 1,
    messageDate: '2021-10-13T13:29:41',
  },
  {
    id: 377231225340821500,
    safeId: '377231225340821505',
    userId: 360995785362374660,
    userSafeId: '360995785362374656',
    userName: '66945102791',
    exchangeId: 376539349059108860,
    exchangeSafeId: '376539349059108864',
    message: 'https://tarzanthekingofjungle.blob.core.windows.net/pictures/377231225340821504.jpg',
    messageKind: 1,
    messageDate: '2021-10-13T13:29:49',
  },
  {
    id: 377231281175396350,
    safeId: '377231281175396352',
    userId: 360995785362374660,
    userSafeId: '360995785362374656',
    userName: '66945102791',
    exchangeId: 376539349059108860,
    exchangeSafeId: '376539349059108864',
    message: 'https://tarzanthekingofjungle.blob.core.windows.net/pictures/377231276880429056.jpg',
    messageKind: 1,
    messageDate: '2021-10-13T13:30:02',
  },
  {
    id: 377231332715003900,
    safeId: '377231332715003904',
    userId: 360995785362374660,
    userSafeId: '360995785362374656',
    userName: '66945102791',
    exchangeId: 376539349059108860,
    exchangeSafeId: '376539349059108864',
    message: 'https://tarzanthekingofjungle.blob.core.windows.net/pictures/377231328420036608.jpg',
    messageKind: 1,
    messageDate: '2021-10-13T13:30:14',
  },
  {
    id: 377231384254611460,
    safeId: '377231384254611456',
    userId: 360995785362374660,
    userSafeId: '360995785362374656',
    userName: '66945102791',
    exchangeId: 376539349059108860,
    exchangeSafeId: '376539349059108864',
    message: 'https://tarzanthekingofjungle.blob.core.windows.net/pictures/377231379959644160.jpg',
    messageKind: 1,
    messageDate: '2021-10-13T13:30:26',
  },
  {
    id: 377232509536043000,
    safeId: '377232509536043009',
    userId: 360995785362374660,
    userSafeId: '360995785362374656',
    userName: '66945102791',
    exchangeId: 376539349059108860,
    exchangeSafeId: '376539349059108864',
    message: 'https://tarzanthekingofjungle.blob.core.windows.net/pictures/377232509536043008.jpg',
    messageKind: 1,
    messageDate: '2021-10-13T13:34:48',
  },
  {
    id: 377507675205795840,
    safeId: '377507675205795840',
    userId: 360995785362374660,
    userSafeId: '360995785362374656',
    userName: '66945102791',
    exchangeId: 376539349059108860,
    exchangeSafeId: '376539349059108864',
    message: '5',
    messageKind: 0,
    messageDate: '2021-10-14T07:22:35',
  },
  {
    id: 377507816939716600,
    safeId: '377507816939716608',
    userId: 360995785362374660,
    userSafeId: '360995785362374656',
    userName: '66945102791',
    exchangeId: 376539349059108860,
    exchangeSafeId: '376539349059108864',
    message: '1',
    messageKind: 0,
    messageDate: '2021-10-14T07:23:08',
  },
  {
    id: 377507984443441150,
    safeId: '377507984443441152',
    userId: 360995785362374660,
    userSafeId: '360995785362374656',
    userName: '66945102791',
    exchangeId: 376539349059108860,
    exchangeSafeId: '376539349059108864',
    message: '12',
    messageKind: 0,
    messageDate: '2021-10-14T07:23:47',
  },
  {
    id: 377566980114219000,
    safeId: '377566980114219008',
    userId: 360995785362374660,
    userSafeId: '360995785362374656',
    userName: '66945102791',
    exchangeId: 376539349059108860,
    exchangeSafeId: '376539349059108864',
    message: '7',
    messageKind: 0,
    messageDate: '2021-10-14T11:12:43',
  },
  {
    id: 377569909281914900,
    safeId: '377569909281914880',
    userId: 360995785362374660,
    userSafeId: '360995785362374656',
    userName: '66945102791',
    exchangeId: 376539349059108860,
    exchangeSafeId: '376539349059108864',
    message: '61',
    messageKind: 0,
    messageDate: '2021-10-14T11:24:05',
  },
  {
    id: 377570111145377800,
    safeId: '377570111145377792',
    userId: 360995785362374660,
    userSafeId: '360995785362374656',
    userName: '66945102791',
    exchangeId: 376539349059108860,
    exchangeSafeId: '376539349059108864',
    message: '!',
    messageKind: 0,
    messageDate: '2021-10-14T11:24:52',
  },
  {
    id: 377573645903462400,
    safeId: '377573645903462400',
    userId: 360995785362374660,
    userSafeId: '360995785362374656',
    userName: '66945102791',
    exchangeId: 376539349059108860,
    exchangeSafeId: '376539349059108864',
    message: '0',
    messageKind: 0,
    messageDate: '2021-10-14T11:38:35',
  },
  {
    id: 377576918668541950,
    safeId: '377576918668541952',
    userId: 360995785362374660,
    userSafeId: '360995785362374656',
    userName: '66945102791',
    exchangeId: 376539349059108860,
    exchangeSafeId: '376539349059108864',
    message: '01',
    messageKind: 0,
    messageDate: '2021-10-14T11:51:17',
  },
  {
    id: 377579929440616450,
    safeId: '377579929440616448',
    userId: 360995785362374660,
    userSafeId: '360995785362374656',
    userName: '66945102791',
    exchangeId: 376539349059108860,
    exchangeSafeId: '376539349059108864',
    message: 'last',
    messageKind: 0,
    messageDate: '2021-10-14T12:02:58',
  },
  {
    id: 377590911671992300,
    safeId: '377590911671992320',
    userId: 360995785362374660,
    userSafeId: '360995785362374656',
    userName: '66945102791',
    exchangeId: 376539349059108860,
    exchangeSafeId: '376539349059108864',
    message: ' ',
    messageKind: 0,
    messageDate: '2021-10-14T12:45:35',
  },
  {
    id: 377940341621260300,
    safeId: '377940341621260288',
    userId: 360995785362374660,
    userSafeId: '285281138115608576',
    userName: '66945102791',
    exchangeId: 376539349059108860,
    exchangeSafeId: '376539349059108864',
    message: 'dsdsd',
    messageKind: 0,
    messageDate: '2021-10-15T11:21:33',
  },
  {
    id: 378040753661673500,
    safeId: '378040753661673473',
    userId: 360995785362374660,
    userSafeId: '285281138115608576',
    userName: '66945102791',
    exchangeId: 376539349059108860,
    exchangeSafeId: '376539349059108864',
    message: 'https://tarzanthekingofjungle.blob.core.windows.net/pictures/378040753661673472.jpg',
    messageKind: 1,
    messageDate: '2021-10-15T17:51:12',
  },
];

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
  const [loaderPicture, setLoaderPicture] = useState(false);
  const [myToken] = useLocalStorage('token');
  moment.locale('ru');
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
          const result: HistoryCollection = {};
          res.collection.forEach((item) => {
            const d = moment.utc(item.messageDate).local().format('MM/DD/YYYY');
            if (result[d]) {
              result[d].push(item);
            } else {
              result[d] = [item];
            }
          });
          console.log('result', result);
          setHistory(res.collection);
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
        <S.ChatWrapper>
          <S.ChatHeader>
            <Text size={12} lH={16} black>
              23.09.2021 Четверг
            </Text>
          </S.ChatHeader>

          <S.ChatContainer>
            {history.map((item) => (
              <MessageCard
                key={item.safeId}
                image={item.messageKind === 1}
                own={item.userSafeId === userSafeId}
                body={item}
              />
            ))}
            <div id="bottom"></div>
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
