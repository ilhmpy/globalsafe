import React, { FC, useState, useContext } from 'react';
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
  const { account } = useContext(AppContext);

  const handleClick = () => {
    history.push(`/info/p2p-changes/${Date.now().toString()}/chat`);
    console.log('ExchangeDetailCard Click');
  };

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
        console.log(rating);
      }
    });
    return (Number(rating)).toFixed(1);
  }

  return (
    <S.Container>
      <LeftSide bg={'#EAEFF4'}>
        <S.BlockWrapper>
          <Text size={14} lH={20} mB={10} black>
            Количество:
          </Text>
          <Title lH={28} mB={10}>
            {(exchange.volume).toLocaleString('ru-RU', { maximumFractionDigits: 2 })} {Balance[exchange.assetKind]}
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
          <Title lH={28}>{exchange.exchangeVolume} {FiatKind[exchange.exchangeAssetKind]}</Title>
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
          <Title lH={28}>{exchange.kind === 0 ? (Number(exchange.userRating)).toFixed(1) : getMyRating()} (378) </Title>
        </S.BlockWrapper>
      </LeftSide>

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
            {exchange.volume * exchange.rate} {Balance[exchange.assetKind]}
          </Text>
        </S.BlockWrapper>

        <S.BlockWrapper>
          <Text size={14} lH={20} mB={4} black>
            На сумму:
          </Text>
          <Text size={14} lH={20} weight={500} black>
            {(exchange.exchangeVolume * exchange.rate).toLocaleString('ru-RU', { maximumFractionDigits: 0 })} {FiatKind[exchange.exchangeAssetKind]}
          </Text>
        </S.BlockWrapper>

        <S.BlockWrapper>
          <Text size={14} lH={20} mB={4} black>
            Метод оплаты:
          </Text>
          <Text size={14} lH={20} weight={500} black>
            {PaymentMethods[exchange.paymentMethod?.kind]}, {FiatKind[exchange.paymentMethod?.assetKind]}
          </Text>
        </S.BlockWrapper>

        <S.BlockWrapper>
          <Text size={14} lH={20} mB={4} black>
            Номер карты:
          </Text>
          <S.Space>
            <Text size={14} lH={20} weight={500} black>
              5536 9137 9922 7240
            </Text>
            <CopyIconButton copyValue={'5536 9137 9922 7240'} />
          </S.Space>
        </S.BlockWrapper>

        <S.BlockWrapper>
          <Text size={14} lH={20} mB={4} black>
            Держатель карты:
          </Text>
          <Text size={14} lH={20} weight={500} black>
            VYACHESLAV TROSCHIN
          </Text>
        </S.BlockWrapper>

        <S.BlockWrapper>
          <Text size={14} lH={20} mB={4} black>
            Рейтинг покупателя:
          </Text>
          <Text size={14} lH={20} weight={500} black>
            {exchange.kind === 0 ? getMyRating() : (Number(exchange.userRating)).toFixed(1)} (256)
          </Text>
        </S.BlockWrapper>

        <S.TransferInfoBlock>
          <Text size={14} lH={20} black>
            Покупатель указал, что перевел средства в размере <S.B>49 900 RUB</S.B> на указанный
            счет. Подтвердите получение средств для успешного завершения обмена. Покупатель получит{' '}
            <S.B>482.40 CWD</S.B>
          </Text>
        </S.TransferInfoBlock>

        <S.Space justify="space-between">
          <Button primary onClick={() => setShowSuccessModal(true)}>
            Средства получены
          </Button>

          <S.Space gap={20}>
            <Button outlinePrimary onClick={handleClick}>
              Чат
            </Button>
            <Button outlineDanger onClick={handleClick}>
              Жалоба
            </Button>
          </S.Space>
        </S.Space>

        {/* Another State */}
        <S.TransferInfoBlock>
          <Text size={14} lH={20} black>
            Обмен успешно завершен. Средства в размере <S.B>482.40 CWD</S.B> отправлены покупателю.
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

        <Button primary onClick={() => setShowRejectModal(true)}>
          Подтвердить
        </Button>
      </RightSide>
      <ExchangeSuccessModal open={showSuccessModal} onClose={() => setShowSuccessModal(false)} />
      <ExchangeRejectModal open={showRejectModal} onClose={() => setShowRejectModal(false)} />
    </S.Container>
  );
};
