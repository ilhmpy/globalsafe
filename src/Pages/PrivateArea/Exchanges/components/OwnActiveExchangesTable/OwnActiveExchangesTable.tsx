import { FC, useState } from 'react';
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
import moment from "moment";
import { Loading, NotItems } from "../../../components/Loading/Loading";
import { getVolume } from "../../../../../functions/getVolume";

import * as S from './S.el';
import { getTime } from 'date-fns';
import { BankItem } from '../AdvertTable/S.el';
import { countVolumeToShow } from '../../../utils';

export const OwnActiveExchangesTable: FC<OwnExchangesProps> = ({ exchanges, loading, setExchanges }: OwnExchangesProps) => {
  const history = useHistory();
  const [selectedOption, setSelectedOption] = useState<string | null>('Все валюты предложения');

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

  const Status = ["Новый", "Ожидается подтверждение оплаты", "Завершен", "Подана жалоба", "Отменен"];

  function getCountsTime({ days, hours, minutes, seconds }: any) {
    if (days > 0) {
      return `${days}д ${hours > 0 ? hours : 0}ч`;
    } else if (hours > 0) {
      return `${hours}ч ${minutes > 0 ? minutes : 0}м`;
    } else if (minutes > 0) {
      return `${minutes}м ${seconds > 0 ? seconds : 0}с`;
    } else {
      return `0м 0с`;
    };
  }

  function getTime(date: Date, wn: any) {
    const total = wn.totalMilliSeconds - (new Date().getTime() - new Date(date).getTime());
    const seconds = Math.floor((total/1000) % 60);
    const minutes = Math.floor((total/1000/60) % 60);
    const hours = Math.floor((total/(1000*60*60)) % 24);
    const days = Math.floor(total/(1000*60*60*24));

    const result = { days, hours, minutes, seconds };

    console.log(total);
  
    return getCountsTime(result);
  };

  return (
    <>
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
                        {(countVolumeToShow(exchange.orderVolume, exchange.assetKind)).toLocaleString("ru-RU", { maximumFractionDigits: 2 })} {Balance[exchange.assetKind]}
                      </S.Cell>
                      <S.Cell data-label="Курс">{exchange.rate}</S.Cell>
                      <S.Cell data-label="Сумма оплаты">{(countVolumeToShow(exchange.exchangeVolume, exchange.assetKind)).toLocaleString("ru-RU", { maximumFractionDigits: 2 })} {FiatKind[exchange.exchangeAssetKind]}</S.Cell>
                      <S.Cell data-label="Метод оплаты">
                        <S.BankList>
                            {getPaymentMethod(exchange.paymentMethod?.kind)}
                        </S.BankList> 
                      </S.Cell>
                      <S.Cell data-label="Оставшееся время">{getTime(exchange.creationDate, exchange.operationWindow)}</S.Cell>
                      <S.Cell data-label="Статус">{Status[exchange.state]}</S.Cell> 
                  </S.BodyItem>
                ))}
              </>
            )}
          </>
        )}
      </S.Table>
    </>
  );
};
