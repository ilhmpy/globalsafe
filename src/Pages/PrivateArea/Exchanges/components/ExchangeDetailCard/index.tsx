import React, { FC, useState, useContext, useEffect } from 'react';
import * as S from './S.el';
import {
  Chip,
  CopyIconButton,
  LeftSide,
  RightSide,
  Text,
  Title,
  Radio,
} from '../../../components/ui';
import { Button } from '../../../../../components/Button/V2/Button';
import { ExchangeSuccessModal } from '../modals/ExchangeSuccessModal';
import { ExchangeRejectModal } from '../modals/ExchangeRejectModal';
import { useHistory } from 'react-router';
import { routers } from '../../../../../constantes/routers';
import { ViewExchangeModel, ExchangeState } from '../../../../../types/exchange';
import { Balance } from "../../../../../types/balance";
import { FiatKind } from "../../../../../types/fiat";
import { PaymentMethodKind } from "../../../../../types/paymentMethodKind";
import { getDefaultLibFileName } from 'typescript';
import { AppContext } from '../../../../../context/HubContext';

type DetailCardProps = {
  exchange: ViewExchangeModel;
}

export const ExchangeDetailCard: FC<DetailCardProps> = ({ exchange }: DetailCardProps) => {
  const history = useHistory();
  const [feedbackValue, setFeedbackValue] = useState(5);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showRejectModal, setShowRejectModal] = useState(false);
  const { account, hubConnection } = useContext(AppContext);
  const [totalExchanges, setTotalExchanges] = useState<any>(); 
  const buyer = () => {
    return (exchange && exchange.kind === 0 && exchange.ownerSafeId !== account.safeId) ||
    (exchange && exchange.kind === 1 && exchange.ownerSafeId === account.safeId);
  };

  const [owner, setOwner] = useState<"seller" | "buyer" | undefined>(buyer() ? "buyer" : "seller");


  // ownerId - продавец, recepientId - покупатель

  /* 
    Блок с права:
    количество - volume
    на сумму - exchangeVolume
    
    Блок с лева:
    количество - поле добавят
    на сумму - количество * rate

    КОГДА БУДЕТ ДОБАВЛЕНО БУЛЕВОЕ ПОЛЕ: 
    показать оценку пользователя если false, и если true не показывать

    ПОЛЕ КОЛИЧЕСТВО С ЛЕВА ЗАХАРДКОЖЕНО(строки: 228, 244), нужно изменить когда добавят поле.
  */

  console.log(owner);

  const handleClick = () => {
    history.push(`/info/p2p-changes/${Date.now().toString()}/chat`);
    console.log('ExchangeDetailCard Click');
  };

  function getTotalExecutedExchanges(id: string) {
    if (hubConnection) {
      hubConnection.invoke("GetTotalExecutedExchanges", id)
        .then((res) => {
          console.log("totalExecutedExchanges", res);
          setTotalExchanges(res);
        })
        .catch((err) => console.error(err));
    };
  };  

  useEffect(() => {
    getTotalExecutedExchanges(exchange.ownerSafeId);
  }, [hubConnection]);

  console.log(exchange)

  function getExchangeChip(chip: ExchangeState) {
    if (chip === 0) {
      return (
        <Chip style={{ background: "rgba(0, 148, 255, 10%)" }}>Новый</Chip>
      );
    } else if (chip === 1) {
      return (
        <Chip style={{ background: "#FF4A31", color: "#fff" }}>Оставшееся время 12м. 48с. </Chip>
        );
    } else if (chip === 2) {
      return (
        <Chip style={{ background: "rgba(93, 167, 0, 0.1)", fontWeight: 500 }}>Завершен</Chip>
        );
    } else if (chip === 3) {
      return (
        <Chip>Жалоба</Chip>
        );
    } else if (chip === 4) {
      return (
        <Chip style={{ background: "rgba(93, 167, 0, 0.1)" }}>Отменен</Chip>
        );
    };
  };

  const PaymentMethods = [
    "ERC20",
    "TRC20",
    "BEP20",
    "BankTransfer",
    "АО «Тинькофф Банк»",
    "ПАО Сбербанк",
    "АО «Альфа-Банк»"
  ];

  function getAllTime(time: any) {
    const { days, hours, minutes, seconds } = time;
    if (days > 0) {
      return `${days}д. ${hours > 0 ? hours : 0}ч.`;
    } else if (hours > 0) {
      return `${hours}ч. ${minutes > 0 ? minutes : 0}м.`;
    } else if (minutes > 0) {
      return `${minutes}м. ${seconds > 0 ? seconds : 0}с.`;
    } else {
      return `0м. 0с.`;
    };
  };

  function getMyRating() { 
    let rating = 0;
    account.claims.forEach((claim: any) => {
      if (claim.claimType === "exchanges-rating") {
        rating = claim.claimValue;
      };
    });
    return (Number(rating)).toFixed(1);
  };

  function getMyExchanges() {
    let exchanges = 0;
    account.claims.forEach((claim: any) => {
      if (claim.claimType == "sell-orders") {
        exchanges = claim.claimValue;
      };
    });
    return exchanges;
  };
 
  function getParsePaymentData(field: "card" | "name") {
    if (exchange.paymentMethod) {
      const fields = JSON.parse(exchange.paymentMethod?.data);
      if (field === "card") {
        return fields.bankNumber;
      } else {
        return fields.name;
      };
    } else {
      return "N/A";
    };
  };

  
  function abuseExchange(id: string) {
    if (hubConnection) {
      hubConnection.invoke("AbuseExchange", id)
        .then((res) => {
          console.log("abuse", res);
        })
        .catch((err) => console.log(err));
    }
  };

  function completeExchange(id: string) {
    if (hubConnection) {
      hubConnection.invoke("CompleteExchange", id)
        .then((res) => {
          console.log("complete", res);
        })
        .catch((err) => console.log(err));
    }
  };

  function cancelExchange(id: string) {
    if (hubConnection) {
      hubConnection.invoke("CancelExchange", id)
        .then((res) => {
          console.log("cancel", res);
        })
        .catch((err) => console.log(err));
    }
  };

  function confirmExchangePayment(id: string) {
    console.log(id)
    if (hubConnection) {
      hubConnection.invoke("ConfirmExchangePayment", id)
        .then((res) => {
          console.log("confirm", res);
        })
        .catch((err) => console.log(err));
    };
  };

  function getVolume(volume: number, kind: number) {
    let cv = 0;
    if (kind === 1) {
      cv = volume / 100000;
    } else if (kind === 43) {
      cv = volume / 10000;
    } else if (kind === 44 || kind === 45 || kind === 48 || kind === 47) {
      cv = volume / 1;
    } else if (kind === 59) {
      cv = volume / 100;
    };
    return Number(cv);
  };

  return (
    <S.Container>
      <LeftSide bg={'#EAEFF4'}>
        <S.BlockWrapper>
          <Text size={14} lH={20} mB={10} black>
            Количество:
          </Text>
          <Title lH={28} mB={10}>
            {(getVolume(100000, exchange.assetKind)).toLocaleString('ru-RU', { maximumFractionDigits: 2 })} {Balance[exchange.assetKind]}
          </Title>
          <Chip>{exchange.kind === 0 ? "Продажа" : "Покупка"}</Chip>
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
          <Title lH={28}>{(getVolume(100000, exchange.assetKind) * exchange.rate).toLocaleString('ru-RU', { maximumFractionDigits: 2 })} {FiatKind[exchange.exchangeAssetKind]}</Title>
        </S.BlockWrapper>
 
        <S.BlockWrapper>
          <Text size={14} lH={20} mB={10} black>
            Лимиты:
          </Text>
          <Title lH={28}>
            {`${(exchange.limitFrom).toLocaleString('ru-RU', { maximumFractionDigits: 0 })} - ${(exchange.limitTo).toLocaleString('ru-RU', { maximumFractionDigits: 0 })} ${FiatKind[exchange.exchangeAssetKind]}`}
          </Title>
        </S.BlockWrapper>

        <S.BlockWrapper>
          <Text size={14} lH={20} mB={10} black>
            Методы оплаты:
          </Text>
          {exchange.methodsKinds.map((method: any, idx: number) => (
            <Title lH={28} key={idx}>{PaymentMethods[method]}</Title>
          ))}
        </S.BlockWrapper>

        <S.BlockWrapper>
          <Text size={14} lH={20} mB={10} black>
            Время на обмен:
          </Text>
          <Title lH={28}>{getAllTime(exchange.operationWindow)}</Title>
        </S.BlockWrapper>

        <S.BlockWrapper>
          <Text size={14} lH={20} mB={10} black>
            Рейтинг продавца:
          </Text>
          <Title lH={28}>{owner === "seller" ? `${getMyRating()} (${getMyExchanges()})` : `${(Number(exchange.userRating)).toFixed(1)} (${totalExchanges})`}</Title>
        </S.BlockWrapper>
      </LeftSide>

      {/* IF COMPLETED AND NOT GRADET */}

      <RightSide>
        <S.TitleBlockWrapper>
          <Title mB={10} lH={28}>
            {exchange.kind === 0 ? "Продажа" : "Покупка"} {`${Balance[exchange.assetKind]} за ${FiatKind[exchange.exchangeAssetKind]}`}
          </Title>
          {getExchangeChip(exchange.state)}
        </S.TitleBlockWrapper>

        <S.BlockWrapper>
          <Text size={14} lH={20} mB={4} black>
            Количество:
          </Text>
          <Text size={14} lH={20} weight={500} black>
           {(getVolume(exchange.volume, exchange.assetKind)).toLocaleString('ru-RU', { maximumFractionDigits: 0 })} {Balance[exchange.assetKind]}
          </Text>
        </S.BlockWrapper>

        <S.BlockWrapper>
          <Text size={14} lH={20} mB={4} black>
            На сумму:
          </Text>
          <Text size={14} lH={20} weight={500} black>
            {(getVolume(exchange.volume, exchange.assetKind) * exchange.rate).toLocaleString('ru-RU', { maximumFractionDigits: 0 })} {FiatKind[exchange.exchangeAssetKind]}
          </Text>
        </S.BlockWrapper>

        <S.BlockWrapper>
          <Text size={14} lH={20} mB={4} black>
            Метод оплаты:
          </Text>
          <Text size={14} lH={20} weight={500} black>
            {exchange.paymentMethod ? (
              <>{PaymentMethods[exchange.paymentMethod?.kind]}, {FiatKind[exchange.paymentMethod?.assetKind]}</>
            ) : "N/A, N/A"}
          </Text>
        </S.BlockWrapper>

        <S.BlockWrapper>
          <Text size={14} lH={20} mB={4} black>
            Номер карты:
          </Text>
          <S.Space>
            <Text size={14} lH={20} weight={500} black>
              {getParsePaymentData("card")}
            </Text>
            <CopyIconButton copyValue={getParsePaymentData("card")} />
          </S.Space>
        </S.BlockWrapper>

        <S.BlockWrapper>
          <Text size={14} lH={20} mB={4} black>
            Держатель карты:
          </Text>
          <Text size={14} lH={20} weight={500} black>
            {getParsePaymentData("name")}
          </Text>
        </S.BlockWrapper>
        
        {/* COMPLETED, ABUSED, CANCELLED STATES */}
        
        <S.BlockWrapper when={exchange.state === 2 || exchange.state === 3 || exchange.state === 4}>
          <Text size={14} lH={20} mB={4} black>
            Рейтинг покупателя:
          </Text>
          <Text size={14} lH={20} weight={500} mB={4} black>
            {owner === "seller" ? `${(Number(exchange.userRating)).toFixed(1)} (${totalExchanges})` : `${getMyRating()} (${getMyExchanges()})`}
          </Text>
        </S.BlockWrapper>

        {/* ************************************ */}

        {/* ********************************************* */}

        {/* INITIATED STATE */}

        <S.StateBlock when={exchange.state === 0}>
          
          <S.StateBlock when={owner === "buyer"}>
            <S.TransferInfoBlock>
              <Text size={14} lH={20} black>
                Осуществите перевод средств на указанный счет в размере <S.B>{(getVolume(exchange.volume, exchange.assetKind) * exchange.rate).toLocaleString('ru-RU', { maximumFractionDigits: 0 })} {FiatKind[exchange.exchangeAssetKind]}</S.B> и подтвердите
                перевод средств продавцу нажав на кнопку “средства отправлены”
              </Text>
            </S.TransferInfoBlock>

            <S.Space justify="space-between">
              <S.Space gap={20}>
                <Button primary bigSize onClick={() => confirmExchangePayment(exchange.safeId)}>
                  Средства отправлены
                </Button>
                <Button outlinePrimary bigSize onClick={() => cancelExchange(exchange.safeId)}>
                    Отменить обмен
                </Button>
              </S.Space>

              <S.Space gap={20}>
                <Button outlinePrimary bigSize onClick={handleClick}>
                  Чат
                </Button>
                <Button outlinePrimary bigSize onClick={handleClick} as="button" disabled={exchange.state === 0} exchangeBtn>
                  Жалоба
                </Button>
              </S.Space>
            </S.Space>
          </S.StateBlock>
          
          <S.StateBlock when={owner === "seller"}>
            <S.TransferInfoBlock>
              <Text size={14} lH={20} black>
                Покупатель  осуществляет перевод средств на указанный счет в размере <S.B>{(getVolume(exchange.volume, exchange.assetKind) * exchange.rate).toLocaleString('ru-RU', { maximumFractionDigits: 0 })} {FiatKind[exchange.exchangeAssetKind]}</S.B> <br />
                С вашего баланса списаны и заморожены <S.B>{(getVolume(exchange.volume, exchange.assetKind)).toLocaleString('ru-RU', { maximumFractionDigits: 0 })} {Balance[exchange.assetKind]}</S.B> до подтверждения вами получения средств.
              </Text>
            </S.TransferInfoBlock>

            <S.Space justify="space-between">
              <S.Space gap={20}>
                <Button primary bigSize as="button" disabled={true} onClick={() => false}>
                  Средства получены
                </Button>
              </S.Space>

              <S.Space gap={20}>
                <Button outlinePrimary bigSize onClick={handleClick}>
                  Чат
                </Button>
              </S.Space>
            </S.Space>
          </S.StateBlock>

        </S.StateBlock>

        {/* **************************** */}

        {/* CONFIRMED STATE */} 

        <S.StateBlock when={exchange.state === 1}>
                      
          <S.StateBlock when={owner === "buyer"}>
            <S.TransferInfoBlock>
              <Text size={14} lH={20} black>  
                <S.B>{(exchange.volume).toLocaleString('ru-RU', { maximumFractionDigits: 0 })} {Balance[exchange.assetKind]}</S.B> будут отправлены вам сразу после подтверждения 
                продавцом получения средств размере <S.B>{(getVolume(exchange.volume, exchange.assetKind) * exchange.rate).toLocaleString('ru-RU', { maximumFractionDigits: 0 })} {FiatKind[exchange.exchangeAssetKind]}</S.B> на указанный счет.
              </Text>
            </S.TransferInfoBlock>

            <S.Space justify="space-between">
              <S.Space gap={20}>
                <Button primary bigSize as="button" disabled={true} onClick={() => setShowSuccessModal(true)}>
                  Средства отправлены
                </Button>
              </S.Space>

              <S.Space gap={20}>
                <Button outlinePrimary bigSize onClick={handleClick}>
                  Чат
                </Button>
                <Button outlinePrimary bigSize onClick={() => abuseExchange(exchange.safeId)} exchangeBtn>
                  Жалоба
                </Button>
              </S.Space>
            </S.Space>
          </S.StateBlock>

          <S.StateBlock when={owner === "seller"}>
              <S.TransferInfoBlock>
                <Text size={14} lH={20} black>  
                  Покупатель указал, что перевел средства в размере <S.B>{(getVolume(exchange.volume, exchange.assetKind) * exchange.rate).toLocaleString('ru-RU', { maximumFractionDigits: 0 })} {FiatKind[exchange.exchangeAssetKind]}</S.B> на указанный счет.
                  Подтвердите получение средств для успешного завершения обмена.
                  Покупатель получит <S.B>{(exchange.volume).toLocaleString('ru-RU', { maximumFractionDigits: 0 })} {Balance[exchange.assetKind]}</S.B>
                </Text>
              </S.TransferInfoBlock>

              <S.Space justify="space-between">
                <S.Space gap={20}>
                  <Button primary bigSize as="button" onClick={() => completeExchange(exchange.safeId)}>
                    Средства получены
                  </Button>
                </S.Space>

                <S.Space gap={20}>
                  <Button outlinePrimary bigSize onClick={handleClick}>
                    Чат
                  </Button>
                  <Button outlinePrimary bigSize as="button" disabled={true} onClick={() => abuseExchange(exchange.safeId)} exchangeBtn>
                    Жалоба
                  </Button>
                </S.Space>
              </S.Space>
          </S.StateBlock>

        </S.StateBlock>

        {/* ******************** */}

        {/* COMPLETED STATE */}

        <S.StateBlock when={exchange.state === 2}>

            <S.StateBlock when={owner === "buyer"}>
                <S.TransferInfoBlock>
                  <Text size={14} lH={20} black>
                    Обмен успешно завершен. Средства в размере <S.B>{(getVolume(exchange.volume, exchange.assetKind)).toLocaleString('ru-RU', { maximumFractionDigits: 0 })} {Balance[exchange.assetKind]}</S.B> отправлены на ваш баланс.
                    Оставьте свою оценку продавцу.
                  </Text>
                </S.TransferInfoBlock>
                <S.FeedbackBlock>
                  <Text size={14} lH={20} mB={10} black>
                    Оставьте свою оценку покупателю:
                  </Text>
                  <Radio.Group>
                    <Radio
                      name="feedback"
                      label="1"
                      value="1"
                      checked={feedbackValue === 1}
                      onChange={(e) => setFeedbackValue(+e.target.value)}
                    />
                    <Radio
                      name="feedback"
                      label="2"
                      value="2"
                      checked={feedbackValue === 2}
                      onChange={(e) => setFeedbackValue(+e.target.value)}
                    />
                    <Radio
                      name="feedback"
                      label="3"
                      value="3"
                      checked={feedbackValue === 3}
                      onChange={(e) => setFeedbackValue(+e.target.value)}
                    />
                    <Radio
                      name="feedback"
                      label="4"
                      value="4"
                      checked={feedbackValue === 4}
                      onChange={(e) => setFeedbackValue(+e.target.value)}
                    />
                    <Radio
                      name="feedback"
                      label="5"
                      value="5"
                      checked={feedbackValue === 5}
                      onChange={(e) => setFeedbackValue(+e.target.value)}
                    />
                  </Radio.Group>
              </S.FeedbackBlock>

              <Button primary onClick={() => false}>
                Подтвердить
              </Button>
            </S.StateBlock>

            <S.StateBlock when={owner === "seller"}>
                <S.TransferInfoBlock>
                  <Text size={14} lH={20} black>
                    Обмен успешно завершен. Средства в размере <S.B>{(getVolume(exchange.volume, exchange.assetKind)).toLocaleString('ru-RU', { maximumFractionDigits: 0 })} {Balance[exchange.assetKind]}</S.B> отправлены покупателю.
                    Оставьте свою оценку покупателю.
                  </Text>
                </S.TransferInfoBlock>
                <S.FeedbackBlock>
                  <Text size={14} lH={20} mB={10} black>
                    Оставьте свою оценку покупателю:
                  </Text>
                  <Radio.Group>
                    <Radio
                      name="feedback"
                      label="1"
                      value="1"
                      checked={feedbackValue === 1}
                      onChange={(e) => setFeedbackValue(+e.target.value)}
                    />
                    <Radio
                      name="feedback"
                      label="2"
                      value="2"
                      checked={feedbackValue === 2}
                      onChange={(e) => setFeedbackValue(+e.target.value)}
                    />
                    <Radio
                      name="feedback"
                      label="3"
                      value="3"
                      checked={feedbackValue === 3}
                      onChange={(e) => setFeedbackValue(+e.target.value)}
                    />
                    <Radio
                      name="feedback"
                      label="4"
                      value="4"
                      checked={feedbackValue === 4}
                      onChange={(e) => setFeedbackValue(+e.target.value)}
                    />
                    <Radio
                      name="feedback"
                      label="5"
                      value="5"
                      checked={feedbackValue === 5}
                      onChange={(e) => setFeedbackValue(+e.target.value)}
                    />
                  </Radio.Group>
              </S.FeedbackBlock>
              <Button primary onClick={() => false}>
                Подтвердить
              </Button>
            </S.StateBlock>

        </S.StateBlock>
        {/* ************** */}

      </RightSide>
      <ExchangeSuccessModal open={showSuccessModal} onClose={() => false} />
      <ExchangeRejectModal open={showRejectModal} onClose={() => false} />
  </S.Container>
  );
};
