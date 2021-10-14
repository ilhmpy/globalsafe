import { FC, useState } from 'react';
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

import * as S from './S.el';
import { getTime } from 'date-fns';

export const OwnActiveExchangesTable: FC<OwnExchangesProps> = ({ exchanges, loading }: OwnExchangesProps) => {
  const history = useHistory();
  const [selectedOption, setSelectedOption] = useState<string | null>('Все валюты предложения');

  const handleNavigateToExchange = (id: string) => {
    history.replace(`/info/p2p-changes/${id}`);
  };

  function getPaymentMethod(kind: number) {
    if (kind === undefined) {
      return "N/A"
    } else if (kind === 0) {
      return "ERC20";
    } else if (kind === 1) {
      return "TRC20";
    } else if (kind === 2) {
      return "BEP20";      
    } else if (kind === 3) {
      return "BankTransfer";
    } else if (kind === 4) {
      return <img src={tinkoff} alt="tinkoff" />;
    } else if (kind === 5) {
      return <img src={sber} alt="sber" />;
    } else if (kind === 6) {
      return <img src={alfa} alt="alfa" />;
    };
  };

  const Status = ["Создан", "Принят", "Завершен", "", "Отменен"];

  /* 
    ОСТАЛОСЬ СДЕЛАТЬ:
    обновление оставшегося время каждую минуту
    страница архив
    детальная страница каждого обмена
    доделать ещё два "текстового" метода оплаты
  */

  function getTime(date: Date, wn: any) {
    const create = new Date(date);
    const now = new Date();
    const result = { days: wn.days - (now.getDay() - create.getDay()), 
                     hours: wn.hours - (now.getHours() - create.getHours()), 
                     minutes: wn.minutes - (now.getMinutes() - create.getMinutes()), 
                     seconds: wn.seconds - (now.getSeconds() - create.getSeconds())
                   }; 
    const { days, hours, minutes, seconds } = result;
    if (days > 0) {
      return `${days}д ${hours > 0 ? hours : 0}ч`;
    } else if (hours > 0) {
      return `${hours}ч ${minutes > 0 ? minutes : 0}м`;
    } else if (minutes > 0) {
      return `${minutes}м ${seconds > 0 ? seconds : 0}с`;
    };
  };
 
  setInterval(() => {
    console.log("oneMinutes latter") 
  }, 60000);

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
            {exchanges.length === 0 ? <NotItems text="У вас нету обменов" /> : (
              <>
                {exchanges.map((exchange, idx) => (
                  <S.BodyItem key={idx} onClick={() => handleNavigateToExchange(exchange.safeId)}>
                      <S.Cell data-label="Тип">{exchange.kind === 0 ? "Продажа" : "Покупка"}</S.Cell>
                      <S.Cell data-label="Кол-во">{exchange.volume} {Balance[exchange.assetKind]}</S.Cell>
                      <S.Cell data-label="Курс">{exchange.rate}</S.Cell>
                      <S.Cell data-label="Сумма оплаты">{exchange.exchangeVolume} {FiatKind[exchange.exchangeAssetKind]}</S.Cell>
                      <S.Cell data-label="Метод оплаты">
                        <S.BankList>
                          <S.BankItem>
                            {getPaymentMethod(exchange.paymentMethod?.kind)}
                          </S.BankItem>
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
