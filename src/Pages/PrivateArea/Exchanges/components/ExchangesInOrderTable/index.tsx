import React, { useMemo } from 'react';
import { useHistory } from 'react-router';
import alfa from '../../../../../assets/v2/svg/banks/alfa.svg';
import { Balance } from '../../../../../types/balance';
import { ViewExchangeModel } from '../../../../../types/exchange';
import { FiatKind } from '../../../../../types/fiat';
import { countVolumeToShow } from '../../../utils';

import * as S from './S.el';

interface ExchangesInOrderTable {
  exchangesList: ViewExchangeModel[];
}

// TODO: Check Exchange Fields and update Table | Update ViewExchangeModel
// TODO: Fix Open Exchange Page Route
export const ExchangesInOrderTable: React.FC<ExchangesInOrderTable> = ({exchangesList}: ExchangesInOrderTable) => {
  const history = useHistory();

  const handleNavigateToExchange = (safeId: string) => {
    history.replace(`/info/p2p-changes/${safeId}`)
  };

  const exchangeStateLabels = useMemo(() => [
    'Новый',
    'Ожидание перевода',
    'Завершен',
    'Абуз',
    'Отменен',
  ], []);

  return (
      <S.Table>
        <S.Header>
          <S.Cell>
            <span>№ обмена</span>
          </S.Cell>
          <S.Cell>
            <span>Кол-во</span>
          </S.Cell>
          <S.Cell>
            <span>Стоимость</span>
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

        {
          exchangesList.length > 0 
          ?
            exchangesList.map((exchange) => (
              <S.BodyItem
                key={`exchange-item-${exchange}`}
                onClick={() => handleNavigateToExchange(exchange.safeId)}
              >
                <S.Cell data-label="№ обмена">{exchange.safeId}</S.Cell>
                <S.Cell data-label="Кол-во">
                {`${countVolumeToShow(exchange.volume, exchange.assetKind)} ${Balance[exchange.assetKind]}`}
                </S.Cell>
                <S.Cell data-label="Стоимость">
                  {`${exchange.volume * exchange.rate} ${FiatKind[exchange.exchangeAssetKind]}`}
                </S.Cell>
                <S.Cell data-label="Метод оплаты">
                  <S.BankList>
                    <S.BankItem>
                      <img src={alfa} alt="" />
                    </S.BankItem>
                  </S.BankList>
                </S.Cell>
                <S.Cell data-label="Оставшееся время">
                  {`${exchange.operationWindow.minutes}м ${exchange.operationWindow.seconds}с`}
                </S.Cell>
                <S.Cell data-label="Статус">
                  {exchangeStateLabels[exchange.state]}
                </S.Cell>
              </S.BodyItem>
            ))
          :
          "Список Пустой"
        }

      </S.Table>
  );
};
