import { FC, useState, useContext } from 'react';
import { useHistory } from 'react-router';
import alfa from '../../../../../assets/v2/svg/banks/alfa.svg';
import alfa1 from '../../../../../assets/v2/svg/banks/alfa1.svg';
import sber from '../../../../../assets/v2/svg/banks/sber.svg';
import tinkoff from '../../../../../assets/v2/svg/banks/tinkoff.svg';
import { CurrencyPair } from '../modals/CurrencyPair';
import { OwnExchangesProps, ViewExchangeModel } from '../../../../../types/exchange';
import { Balance } from "../../../../../types/balance";
import { FiatKind } from "../../../../../types/fiat";
import { PaymentMethodKind } from "../../../../../types/paymentMethodKind";
import moment from "moment";
import { Loading, NotItems } from "../../../components/Loading/Loading";
import { getVolume } from "../../../../../functions/getVolume";
import { Container } from "../../../../../components/UI/Container";
import { AppContext } from "../../../../../context/HubContext";

import * as S from './S.el';
import { countVolumeToShow } from '../../../utils';

export const OwnArchivedExchangesTable: FC<OwnExchangesProps> = ({ exchanges, loading }: OwnExchangesProps) => {
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

  const Status = ["Новый", "Ожидается новое подтверждение оплаты", "Завершен", "Подана жалоба", "Отменен"];

  /*
  const test: ViewExchangeModel[] = [
    { 
      id: 1231234325345345,
      safeId: "1231234325345345",
      orderId: 123123123123213,
      orderSafeId: "123123123123213",
      ownerId: 123123123123123,
      ownerSafeId: "123123123123123",
      recepientId: 123123325345345345,
      recepientSafeId: "123123325345345345",
      kind: 0,
      creationDate: new Date(),
      state: 2,
      volume: 20000,
      assetKind: 1,
      exchangeAssetKind: 0,
      rate: 1.20,
      exchangeVolume: 100,
      limitFrom: 0,
      limitTo: 0,
      operationWindow: null,
      methodsKindsJson: "[1]",
      methodsKinds: [1],
      paymentMethod: { id: 123123123213, assetKind: 5, state: 3, kind: 4 },
      userRating: "1",
    }
  ]; */

  
  function getOwner({ kind, ownerSafeId }: ViewExchangeModel) {
    return (kind === 0 && ownerSafeId !== account.safeId) ||
    (kind === 1 && ownerSafeId === account.safeId) ? "buyer" : "seller";
  };

  function localeCount(volume: number, assetKind: number, fiat: boolean) {
    return (countVolumeToShow(volume, assetKind)).toLocaleString("ru-RU", { maximumFractionDigits: fiat ? 2 : 5 });
  };

  function getStatus({ state, kind, ownerSafeId }: ViewExchangeModel) {
    const owner = (kind === 0 && ownerSafeId !== account.safeId) ||
    (kind === 1 && ownerSafeId === account.safeId) ? "buyer" : "seller";
    if (state === 0) {
      if (owner === "seller") {
        return "Ожидание перевода";
      } else {
        return "Ожидание подтверждения оплаты";        
      };
    } else {
      return Status[state];
    };
  };

  return (
    <>
      {screen.width > 480 ? (
            <Container pTabletNone>
            {/* <CurrencyPair
              open={true}
              onClose={() => undefined}
              options={['Все валюты предложения', 'CWD']}
              selectedOption={selectedOption}
              setSelectedOption={setSelectedOption}
            /> */}
            <S.Table>
              <S.Header>
                <S.Cell>
                  <span>Дата</span>
                </S.Cell>
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
                  <span>Статус</span>
                </S.Cell>
              </S.Header>
      
              {loading ? <Loading /> : (
                <>
                  {exchanges.length === 0 ? <NotItems text="У вас не имеется обменов" /> : (
                    <>
                      {exchanges.map((exchange: ViewExchangeModel, idx) => (
                          <S.BodyItem onClick={() => handleNavigateToExchange(exchange.safeId)} key={idx}>
                            <S.Cell data-label="Дата">{moment(exchange.creationDate).format("DD.MM.YYYY")}</S.Cell>
                            <S.Cell data-label="Тип">{exchange.kind === 0 ? "Продажа" : "Покупка"}</S.Cell>
                            <S.Cell data-label="Кол-во">
                              {(countVolumeToShow(exchange.volume, exchange.assetKind)).toLocaleString("ru-RU", { maximumFractionDigits: 5 })} {Balance[exchange.assetKind]}
                            </S.Cell>
                            <S.Cell data-label="Курс">{exchange.rate}</S.Cell>
                            <S.Cell data-label="Сумма оплаты">
                              {(countVolumeToShow(exchange.exchangeVolume, exchange.assetKind)).toLocaleString("ru-RU", { maximumFractionDigits: 5 })} {FiatKind[exchange.exchangeAssetKind]}
                            </S.Cell>
                            <S.Cell data-label="Метод оплаты">
                                <S.BankList>
                                  {getPaymentMethod(exchange.paymentMethod?.kind)}
                                </S.BankList> 
                            </S.Cell>
                            <S.Cell data-label="Статус">{Status[exchange.state]}</S.Cell>
                          </S.BodyItem>
                      ))}
                    </>
                  )}
                </>
              )}
            </S.Table>
          </Container>
      ) : (
        <>
          {loading ? <Loading /> : (
            <>
              {exchanges.length === 0 ? <NotItems text="У вас не имеется обменов" /> : (
                  <>
                    {exchanges.map((exchange, idx) => (
                      <S.Exchange key={idx} onClick={() => handleNavigateToExchange(exchange.safeId)}>
                        <S.ExchangeLine> 
                          <S.ExchangeLineContent main>{getOwner(exchange) === "seller" ? "Продажа" : "Покупка"}:</S.ExchangeLineContent>
                          <S.ExchangeLineContent text>
                            {localeCount(getOwner(exchange) === "seller" ? exchange.orderVolume : exchange.volume, exchange.assetKind, false)} {Balance[exchange.assetKind]}
                          </S.ExchangeLineContent>
                        </S.ExchangeLine>
                        <S.ExchangeLine>
                          <S.ExchangeLineContent main>Курс:</S.ExchangeLineContent>
                          <S.ExchangeLineContent text>{exchange.rate} {FiatKind[exchange.exchangeAssetKind]}</S.ExchangeLineContent>
                        </S.ExchangeLine>
                        <S.ExchangeLine>
                          <S.ExchangeLineContent main>Метод оплаты:</S.ExchangeLineContent>
                          <S.ExchangeLineContent text>{getPaymentMethod(exchange.paymentMethod?.kind)}</S.ExchangeLineContent>
                        </S.ExchangeLine>
                        <S.ExchangeLine>
                          <S.ExchangeLineContent main>Сумма оплаты:</S.ExchangeLineContent>
                          <S.ExchangeLineContent text>{localeCount(exchange.exchangeVolume, exchange.assetKind, true)} {FiatKind[exchange.exchangeAssetKind]}</S.ExchangeLineContent>
                        </S.ExchangeLine>
                        <S.ExchangeLine>
                          <S.ExchangeLineContent main>Дата:</S.ExchangeLineContent>
                          <S.ExchangeLineContent text>{moment(exchange.creationDate).format("DD.MM.YYYY")}</S.ExchangeLineContent>
                        </S.ExchangeLine>
                        <S.ExchangeLine>
                          <S.ExchangeLineContent main>Статус:</S.ExchangeLineContent>
                          <S.ExchangeLineContent text style={{ maxWidth: "170px" }}>{getStatus(exchange)}</S.ExchangeLineContent>
                        </S.ExchangeLine>
                      </S.Exchange>
                    ))}
                </>
              )}
            </>
          )}
        </>
      )}
    </>
  );
}; 
