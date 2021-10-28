import { FC, useState, useContext } from 'react';
import { useHistory } from 'react-router';
import alfa from '../../../../../assets/v2/svg/banks/alfa.svg';
import alfa1 from '../../../../../assets/v2/svg/banks/alfa1.svg';
import sber from '../../../../../assets/v2/svg/banks/sber.svg';
import tinkoff from '../../../../../assets/v2/svg/banks/tinkoff.svg';
import { CurrencyPair } from '../modals/CurrencyPair';
import { OwnExchangesProps, ExchangeState } from '../../../../../types/exchange';
import { Balance } from "../../../../../types/balance";
import { FiatKind } from "../../../../../types/fiat";
import { PaymentMethodKind } from "../../../../../types/paymentMethodKind";
import { Loading, NotItems } from "../../../components/Loading/Loading";
import { Counter } from '../../../components/ui/Counter';
import { Container } from "../../../../../components/UI/Container";
import { AppContext } from '../../../../../context/HubContext';
import { ViewExchangeModel } from '../../../../../types/exchange';

import * as S from './S.el';
import { getTime } from 'date-fns';
import { BankItem } from '../AdvertTable/S.el';
import { countVolumeToShow } from '../../../utils';

export const OwnActiveExchangesTable: FC<OwnExchangesProps> = ({ exchanges, loading, setExchanges }: OwnExchangesProps) => {
  const history = useHistory();
  const [selectedOption, setSelectedOption] = useState<string | null>('Все валюты предложения');
  const { account } = useContext(AppContext);


  const handleNavigateToExchange = (id: string) => {
    history.replace(`/info/p2p-changes/${id}`);
  };

  function getPaymentMethod(kind: PaymentMethodKind | undefined) {
    if (kind === undefined) {
      return (
        <S.BankItem style={{ width: "33px" }}>
          N/A
        </S.BankItem>
      )
    } else if (kind === 0) {
      return (
        <S.BankItem style={{ width: "48px" }}>
          ERC20
        </S.BankItem>
      );
    } else if (kind === 1) {
      return (
        <S.BankItem style={{ width: "48px" }}>
          TRC20        
        </S.BankItem>
      );
    } else if (kind === 2) {
      return (
        <S.BankItem style={{ width: "48px" }}> 
          BEP20
        </S.BankItem>
      );      
    } else if (kind === 3) {
      return (
        <S.BankItem>
          <img src={tinkoff} alt="tinkoff" />
        </S.BankItem>
      );
    } else if (kind === 4) {
      return (
        <S.BankItem>
          <img src={sber} alt="sber" />
        </S.BankItem>
      );
    } else if (kind === 5) {
      return (
        <S.BankItem>
          <img src={alfa} alt="alfa" />
        </S.BankItem>
      );
    };
  };

  const Status = ["Новый", "Ожидание подтверждения получения средств", "Завершен", "Спорный", "Отменен"];

  function getStatus({ state, kind, ownerSafeId }: ViewExchangeModel) {
    const owner = (kind === 0 && ownerSafeId !== account.safeId) ||
    (kind === 1 && ownerSafeId === account.safeId) ? "buyer" : "seller";
    console.log(owner);
    if (state === 0) {
      if (screen.width > 1024) {
        if (owner === "seller") {
          return "Ожидание перевода";
        } else {
          return "Ожидание подтверждения оплаты";        
        };
      } else {
        return "Новый";
      };
    } else {
      return Status[state];
    };
  };

  return (
    <Container pTabletNone>
      <S.Table>
        <S.Header>
          <S.Cell>
            <span>Тип</span>
          </S.Cell>
          <S.Cell>
            <span>Кол-во</span>
          </S.Cell>
          <S.Cell>
            <span>Курс</span>
          </S.Cell>
          <S.Cell>
            <span>Сумма оплаты</span>
          </S.Cell>
          <S.Cell>
            <span>Метод оплаты</span>
          </S.Cell>
          <S.Cell>
            <span>Оставшееся время</span>
          </S.Cell>
          <S.Cell>
            <span>Статус</span>
          </S.Cell>
        </S.Header>
        {loading ? <Loading /> : (
          <>
            {exchanges.length === 0 ? <NotItems text="У вас не имеется обменов" /> : (
              <>
                {exchanges.map((exchange, idx) => (
                  <S.BodyItem key={idx} onClick={() => handleNavigateToExchange(exchange.safeId)}>
                      <S.Cell data-label="Тип">{exchange.kind === 0 ? "Продажа" : "Покупка"}</S.Cell>
                      <S.Cell data-label="Кол-во">
                        {(countVolumeToShow(exchange.volume, exchange.assetKind)).toLocaleString("ru-RU", { maximumFractionDigits: 2 })} {Balance[exchange.assetKind]}
                      </S.Cell>
                      <S.Cell data-label="Курс">{exchange.rate}</S.Cell>
                      <S.Cell data-label="Сумма оплаты">{(countVolumeToShow(exchange.exchangeVolume, exchange.assetKind)).toLocaleString("ru-RU", { maximumFractionDigits: 2 })} {FiatKind[exchange.exchangeAssetKind]}</S.Cell>
                      <S.Cell data-label="Метод оплаты">
                        <S.BankList>
                            {getPaymentMethod(exchange.paymentMethod?.kind)}
                        </S.BankList> 
                      </S.Cell>
                      <S.Cell data-label="Оставшееся время">
                        <Counter text="Время на обмен закончилось" data={exchange.creationDate} delay={exchange.operationWindow.totalMilliseconds} formatNum />
                      </S.Cell>
                      <S.Cell data-label="Статус">{getStatus(exchange)}</S.Cell> 
                  </S.BodyItem>
                ))}
              </>
            )}
          </>
        )}
      </S.Table>
    </Container>
  );
};
