import React, { useMemo, useState } from 'react';
import { useHistory } from 'react-router-dom';
import alfa from '../../../../../assets/v2/svg/banks/alfa.svg';
import { Balance } from '../../../../../types/balance';
import { ViewExchangeModel } from '../../../../../types/exchange';
import { FiatKind } from '../../../../../types/fiat';
import { Text } from '../../../components/ui';
import { Counter } from '../../../components/ui/Counter';
import { countVolumeToShow, useIsMobile } from '../../../utils';

import * as S from './S.el';

interface ExchangesInOrderTable {
  exchangesList: ViewExchangeModel[];
  activeFilter: 'active' | 'archived' | 'all';
}

// TODO: Check Exchange Fields and update Table | Update ViewExchangeModel
export const ExchangesInOrderTable: React.FC<ExchangesInOrderTable> = ({
  exchangesList,
  activeFilter,
}: ExchangesInOrderTable) => {
  const history = useHistory();
  const isMobile = useIsMobile();
  const [timerDown, setTimerDown] = useState<boolean>(false);

  const handleNavigateToExchange = (safeId: string) => {
    history.replace(`/info/p2p-changes/${safeId}`);
  };

  const exchangeStateLabels = useMemo(
    () => ['Новый', 'Ожидание перевода', 'Завершен', 'Спорный', 'Отменен'],
    []
  );

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
        {activeFilter !== 'archived' ? (
          <S.Cell>
            <span>Оставшееся время</span>
          </S.Cell>
        ) : null}
        <S.Cell>
          <span>Статус</span>
        </S.Cell>
      </S.Header>

      {exchangesList.length > 0
        ? exchangesList.map((exchange) =>
            !isMobile ? (
              <BodyItem
                key={`exchange-item-${exchange.safeId}`}
                exchange={exchange}
                onClick={handleNavigateToExchange}
                activeFilter={activeFilter}
                setTimerDown={setTimerDown}
                exchangeStateLabels={exchangeStateLabels}
              />
            ) : (
              <MobileBodyItem
                key={`exchange-item-${exchange.safeId}`}
                exchange={exchange}
                onClick={handleNavigateToExchange}
                activeFilter={activeFilter}
                setTimerDown={setTimerDown}
                exchangeStateLabels={exchangeStateLabels}
              />
            )
          )
        : 'Список Пустой'}
    </S.Table>
  );
};

interface ItemProps {
  exchange: ViewExchangeModel;
  onClick: (exchangeSafeId: string) => void;
  activeFilter: 'active' | 'archived' | 'all';
  setTimerDown: (val: boolean) => void;
  exchangeStateLabels: string[];
}

const BodyItem = ({
  exchange,
  onClick,
  activeFilter,
  setTimerDown,
  exchangeStateLabels,
}: ItemProps) => {
  return (
    <S.BodyItem onClick={() => onClick(exchange.safeId)}>
      <S.Cell data-label="№ обмена">{exchange.safeId}</S.Cell>
      <S.Cell data-label="Кол-во">
        {`${countVolumeToShow(exchange.volume, exchange.assetKind).toLocaleString('ru-RU', {
          maximumFractionDigits: 4,
        })} ${Balance[exchange.assetKind]}`}
      </S.Cell>
      <S.Cell data-label="Стоимость">
        {`${(countVolumeToShow(exchange.volume, exchange.assetKind) * exchange.rate).toLocaleString(
          'ru-RU',
          {
            maximumFractionDigits: 4,
          }
        )} ${FiatKind[exchange.exchangeAssetKind]}`}
      </S.Cell>
      <S.Cell data-label="Метод оплаты">
        <S.BankList>
          <S.BankItem>
            <img src={alfa} alt="" />
          </S.BankItem>
        </S.BankList>
      </S.Cell>
      {activeFilter !== 'archived' ? (
        <S.Cell data-label="Оставшееся время">
          {exchange.state === 0 || exchange.state === 1 ? (
            <Counter
              setTimerDown={setTimerDown}
              data={exchange.creationDate}
              delay={exchange.operationWindow.totalMilliseconds}
              formatNum
            />
          ) : exchange.state === 2 || exchange.state === 4 ? (
            '-'
          ) : (
            '0м. 0с.'
          )}
        </S.Cell>
      ) : null}
      <S.Cell data-label="Статус">{exchangeStateLabels[exchange.state]}</S.Cell>
    </S.BodyItem>
  );
};

const MobileBodyItem = ({ exchange, onClick, setTimerDown, exchangeStateLabels }: ItemProps) => {
  return (
    <S.MobileBodyItem onClick={() => onClick(exchange.safeId)}>
      <S.MobileRow>
        <S.MobileCell>
          <Text black size={14} weight={300} lH={20}>
            Покупка:
          </Text>
        </S.MobileCell>
        <S.MobileCell>
          {`${countVolumeToShow(exchange.volume, exchange.assetKind).toLocaleString('ru-RU', {
            maximumFractionDigits: 4,
          })} ${Balance[exchange.assetKind]}`}
        </S.MobileCell>
      </S.MobileRow>

      <S.MobileRow>
        <S.MobileCell>
          <Text black size={14} weight={300} lH={20}>
            Метод оплаты:
          </Text>
        </S.MobileCell>
        <S.MobileCell>
          <S.BankList>
            <S.BankItem>
              <img src={alfa} alt="" />
            </S.BankItem>
          </S.BankList>
        </S.MobileCell>
      </S.MobileRow>

      <S.MobileRow>
        <S.MobileCell>
          <Text black size={14} weight={300} lH={20}>
            Сумма оплаты:
          </Text>
        </S.MobileCell>
        <S.MobileCell>
          {`${(
            countVolumeToShow(exchange.volume, exchange.assetKind) * exchange.rate
          ).toLocaleString('ru-RU', {
            maximumFractionDigits: 4,
          })} ${FiatKind[exchange.exchangeAssetKind]}`}
        </S.MobileCell>
      </S.MobileRow>

      <S.MobileRow>
        <S.MobileCell>
          <Text black size={14} weight={300} lH={20}>
            Оставшееся время:
          </Text>
        </S.MobileCell>
        <S.MobileCell>
          {exchange.state === 0 || exchange.state === 1 ? (
            <Counter
              setTimerDown={setTimerDown}
              data={exchange.creationDate}
              delay={exchange.operationWindow.totalMilliseconds}
              formatNum
            />
          ) : exchange.state === 2 || exchange.state === 4 ? (
            '-'
          ) : (
            '0м. 0с.'
          )}
        </S.MobileCell>
      </S.MobileRow>

      <S.MobileRow>
        <S.MobileCell>
          <Text black size={14} weight={300} lH={20}>
            № обмена:
          </Text>
        </S.MobileCell>
        <S.MobileCell>{exchange.safeId}</S.MobileCell>
      </S.MobileRow>

      <S.MobileRow>
        <S.MobileCell>
          <Text black size={14} weight={300} lH={20}>
            Статус:
          </Text>
        </S.MobileCell>
        <S.MobileCell>{exchangeStateLabels[exchange.state]}</S.MobileCell>
      </S.MobileRow>
    </S.MobileBodyItem>
  );
};
