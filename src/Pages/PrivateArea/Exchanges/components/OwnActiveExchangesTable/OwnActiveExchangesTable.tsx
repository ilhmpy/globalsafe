import { FC, useState } from 'react';
import { useHistory } from 'react-router';
import alfa from '../../../../../assets/v2/svg/banks/alfa.svg';
import alfa1 from '../../../../../assets/v2/svg/banks/alfa1.svg';
import sber from '../../../../../assets/v2/svg/banks/sber.svg';
import tinkoff from '../../../../../assets/v2/svg/banks/tinkoff.svg';
import { CurrencyPair } from '../modals/CurrencyPair';
import { OwnExchangesProps, ExchangeKind } from '../../../../../types/exchange';
import { Balance } from "../../../../../types/balance";
import { FiatKind } from "../../../../../types/fiat";
import { PaymentMethodKind } from "../../../../../types/paymentMethodKind";

import * as S from './S.el';

type OwnActiveProps = {
  exchanges: any[];
}

export const OwnActiveExchangesTable: FC<OwnExchangesProps> = ({ exchanges }: OwnActiveProps) => {
  const history = useHistory();
  const [selectedOption, setSelectedOption] = useState<string | null>('Все валюты предложения');

  const handleNavigateToExchange = () => {
    history.replace(`/info/p2p-changes/${Date.now().toString()}`)
  };

  function getPaymentMethod(kind: number) {

    return alfa;
  }

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
        {exchanges.map((exchange, idx) => (
            <S.BodyItem key={idx} onClick={handleNavigateToExchange}>
                <S.Cell data-label="Тип">{exchange.kind === 0 ? "Продажа" : "Покупка"}</S.Cell>
                <S.Cell data-label="Кол-во">{exchange.volume} {Balance[exchange.assetKind]}</S.Cell>
                <S.Cell data-label="Курс">{exchange.rate}</S.Cell>
                <S.Cell data-label="Сумма оплаты">{exchange.exchangeVolume} {FiatKind[exchange.exchangeAssetKind]}</S.Cell>
                <S.Cell data-label="Метод оплаты">
                  <S.BankList>
                    <S.BankItem>
                      <img src={getPaymentMethod(exchange.paymentMethod.assetKind)} alt="" />
                    </S.BankItem>
                    {/* 
                      <S.BankItem>
                        <img src={tinkoff} alt="" />
                      </S.BankItem>
                      <S.BankItem>
                        <img src={sber} alt="" />
                      </S.BankItem> 
                    */}
                  </S.BankList>
                </S.Cell>
                <S.Cell data-label="Оставшееся время">18м 23с</S.Cell>
                <S.Cell data-label="Статус">Ожидание подтверждения оплаты</S.Cell>
            </S.BodyItem>
        ))}
      </S.Table>
    </>
  );
};
