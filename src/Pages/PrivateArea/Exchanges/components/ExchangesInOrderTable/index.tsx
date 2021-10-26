import React, { useMemo, useState } from 'react';
import { useHistory } from 'react-router';
import alfa from '../../../../../assets/v2/svg/banks/alfa.svg';
import { Balance } from '../../../../../types/balance';
import { ViewExchangeModel } from '../../../../../types/exchange';
import { FiatKind } from '../../../../../types/fiat';
import { Counter } from '../../../components/ui/Counter';
import { countVolumeToShow } from '../../../utils';

import * as S from './S.el';

interface ExchangesInOrderTable {
  exchangesList: ViewExchangeModel[];
  activeFilter: 'active' | 'archived' | 'all';
}

// TODO: Check Exchange Fields and update Table | Update ViewExchangeModel
export const ExchangesInOrderTable: React.FC<ExchangesInOrderTable> = ({
  exchangesList, activeFilter
}: ExchangesInOrderTable) => {
  const history = useHistory();
  const [timerDown, setTimerDown] = useState<boolean>(false);

  const handleNavigateToExchange = (safeId: string) => {
    history.replace(`/info/p2p-changes/${safeId}`)
  };

  const exchangeStateLabels = useMemo(() => [
    'Новый',
    'Ожидание перевода',
    'Завершен',
    'Спорный',
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
          {
            activeFilter !== 'archived'
            ?
            <S.Cell>
              <span>Оставшееся время</span>
            </S.Cell>
            :
            null
          }
          <S.Cell>
            <span>Статус</span>
          </S.Cell>
        </S.Header>

        {
          exchangesList.length > 0 
          ?
            exchangesList.map((exchange) => (
              <S.BodyItem
                key={`exchange-item-${exchange.safeId}`}
                onClick={() => handleNavigateToExchange(exchange.safeId)}
              >
                <S.Cell data-label="№ обмена">{exchange.safeId}</S.Cell>
                <S.Cell data-label="Кол-во">
                {`${countVolumeToShow(exchange.volume, exchange.assetKind).toLocaleString('ru-RU', {
                    maximumFractionDigits: 4,
                  })} ${Balance[exchange.assetKind]}`}
                </S.Cell>
                <S.Cell data-label="Стоимость">
                  {`${(countVolumeToShow(exchange.volume, exchange.assetKind) * exchange.rate).toLocaleString('ru-RU', {
                    maximumFractionDigits: 4,
                  })} ${FiatKind[exchange.exchangeAssetKind]}`}
                </S.Cell>
                <S.Cell data-label="Метод оплаты">
                  <S.BankList>
                    <S.BankItem>
                      <img src={alfa} alt="" />
                    </S.BankItem>
                  </S.BankList>
                </S.Cell>
                {
                  activeFilter !== 'archived'
                  ?
                    <S.Cell data-label="Оставшееся время">
                      {
                        (exchange.state === 0 || exchange.state === 1)
                        ?
                          <Counter 
                            setTimerDown={setTimerDown} 
                            data={exchange.creationDate} 
                            delay={exchange.operationWindow.totalMilliseconds} 
                            formatNum 
                          />
                        :
                          (exchange.state === 2 || exchange.state === 4)
                          ?
                            '-'
                          :
                            '0м. 0с.'
                      }
                    </S.Cell>
                  :
                    null
                }
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
