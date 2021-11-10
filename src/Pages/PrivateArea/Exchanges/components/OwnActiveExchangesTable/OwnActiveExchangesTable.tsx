import { FC, useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import alfa from '../../../../../assets/v2/svg/banks/alfa.svg';
import alfa1 from '../../../../../assets/v2/svg/banks/alfa1.svg';
import sber from '../../../../../assets/v2/svg/banks/sber.svg';
import tinkoff from '../../../../../assets/v2/svg/banks/tinkoff.svg';
import { CurrencyPair } from '../modals/CurrencyPair';
import { OwnExchangesProps, ExchangeState } from '../../../../../types/exchange';
import { Balance } from '../../../../../types/balance';
import { FiatKind } from '../../../../../types/fiat';
import { PaymentMethodKind } from '../../../../../types/paymentMethodKind';
import { Loading, NotItems } from '../../../components/Loading/Loading';
import { Counter } from '../../../components/ui/Counter';
import { Container } from '../../../../../components/UI/Container';
import { AppContext } from '../../../../../context/HubContext';
import { ViewExchangeModel } from '../../../../../types/exchange';

import * as S from './S.el';
import { getTime } from 'date-fns';
import { BankItem } from '../AdvertTable/S.el';
import { countVolumeToShow } from '../../../utils';
import useWindowSize from '../../../../../hooks/useWindowSize';

export const OwnActiveExchangesTable: FC<OwnExchangesProps> = ({
  exchanges,
  loading,
  setExchanges,
}: OwnExchangesProps) => {
  const history = useHistory();
  const [selectedOption, setSelectedOption] = useState<string | null>('Все валюты предложения');
  const { account } = useContext(AppContext);
  const screen = useWindowSize();

  const handleNavigateToExchange = (id: string) => {
    history.replace(`/info/p2p-changes/${id}`);
  };

  function getPaymentMethod(kind: PaymentMethodKind | undefined) {
    if (kind === undefined) {
      return <S.BankItem style={{ width: '33px' }}>N/A</S.BankItem>;
    } else if (kind === 0) {
      return <S.BankItem style={{ width: '48px' }}>ERC20</S.BankItem>;
    } else if (kind === 1) {
      return <S.BankItem style={{ width: '48px' }}>TRC20</S.BankItem>;
    } else if (kind === 2) {
      return <S.BankItem style={{ width: '48px' }}>BEP20</S.BankItem>;
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
    }
  }

  const Status = ['Новый', 'Ожидание подтверждения оплаты', 'Завершен', 'Спорный', 'Отменен'];

  function getStatus({ state, kind, ownerSafeId }: ViewExchangeModel) {
    const owner =
      (kind === 0 && ownerSafeId !== account.safeId) ||
      (kind === 1 && ownerSafeId === account.safeId)
        ? 'buyer'
        : 'seller';
    if (state === 0) {
      if (owner === 'seller') {
        return 'Ожидание перевода';
      } else {
        return 'Ожидание подтверждения оплаты';
      }
    } else {
      return Status[state];
    }
  }

  function getOwner({ kind, ownerSafeId }: ViewExchangeModel) {
    return (kind === 0 && ownerSafeId !== account.safeId) ||
      (kind === 1 && ownerSafeId === account.safeId)
      ? 'buyer'
      : 'seller';
  }

  function localeCount(volume: number, assetKind: number, fiat: boolean) {
    return countVolumeToShow(volume, assetKind).toLocaleString('ru-RU', {
      maximumFractionDigits: fiat ? 2 : 5,
    });
  }

  return (
    <>
      {screen > 767 ? (
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
                <span>{screen > 1024 ? 'Оставшееся время' : 'Время'}</span>
              </S.Cell>
              <S.Cell>
                <span>Статус</span>
              </S.Cell>
            </S.Header>
            {loading ? (
              <Loading />
            ) : (
              <>
                {exchanges.length === 0 ? (
                  <NotItems text="У вас не имеется обменов" />
                ) : (
                  <>
                    {exchanges.map((exchange: any, idx) => (
                      <S.BodyItem
                        key={idx}
                        onClick={() => handleNavigateToExchange(exchange.safeId)}
                        new={exchange.new && exchange.new}
                      >
                        <S.Cell data-label="Тип">
                          {getOwner(exchange) === 'seller' ? 'Продажа' : 'Покупка'}
                        </S.Cell>
                        <S.Cell data-label="Кол-во">
                          {localeCount(exchange.volume, exchange.assetKind, false)}{' '}
                          {Balance[exchange.assetKind]}
                        </S.Cell>
                        <S.Cell data-label="Курс">{exchange.rate}</S.Cell>
                        <S.Cell data-label="Сумма оплаты">
                          {localeCount(exchange.exchangeVolume, exchange.assetKind, true)}{' '}
                          {FiatKind[exchange.exchangeAssetKind]}
                        </S.Cell>
                        <S.Cell data-label="Метод оплаты">
                          <S.BankList>{getPaymentMethod(exchange.paymentMethod?.kind)}</S.BankList>
                        </S.Cell>
                        <S.Cell data-label="Оставшееся время">
                          <Counter
                            text="Время на обмен закончилось"
                            data={exchange.creationDate}
                            delay={exchange.operationWindow.totalMilliseconds}
                            formatNum
                          />
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
      ) : (
        <>
          {loading ? (
            <Loading />
          ) : (
            <>
              {exchanges.length === 0 ? (
                <NotItems text="У вас не имеется обменов" />
              ) : (
                <>
                  {exchanges.map((exchange: any, idx) => (
                    <S.Exchange new={exchange.new && exchange.new} key={idx} onClick={() => handleNavigateToExchange(exchange.safeId)}>
                      <S.ExchangeLine> 
                        <S.ExchangeLineContent main>
                          {getOwner(exchange) === 'seller' ? 'Продажа' : 'Покупка'}:
                        </S.ExchangeLineContent>
                        <S.ExchangeLineContent text>
                          {localeCount(
                            getOwner(exchange) === 'seller'
                              ? exchange.orderVolume
                              : exchange.volume,
                            exchange.assetKind,
                            false
                          )}{' '}
                          {Balance[exchange.assetKind]}
                        </S.ExchangeLineContent>
                      </S.ExchangeLine>
                      <S.ExchangeLine>
                        <S.ExchangeLineContent main>Курс:</S.ExchangeLineContent>
                        <S.ExchangeLineContent text>
                          {exchange.rate} {FiatKind[exchange.exchangeAssetKind]}
                        </S.ExchangeLineContent>
                      </S.ExchangeLine>
                      <S.ExchangeLine>
                        <S.ExchangeLineContent main>Метод оплаты:</S.ExchangeLineContent>
                        <S.ExchangeLineContent text>
                          {getPaymentMethod(exchange.paymentMethod?.kind)}
                        </S.ExchangeLineContent>
                      </S.ExchangeLine>
                      <S.ExchangeLine>
                        <S.ExchangeLineContent main>Сумма оплаты:</S.ExchangeLineContent>
                        <S.ExchangeLineContent text>
                          {localeCount(exchange.exchangeVolume, exchange.assetKind, true)}{' '}
                          {FiatKind[exchange.exchangeAssetKind]}
                        </S.ExchangeLineContent>
                      </S.ExchangeLine>
                      <S.ExchangeLine>
                        <S.ExchangeLineContent main>Оставшееся время:</S.ExchangeLineContent>
                        <S.ExchangeLineContent text>
                          <Counter
                            text="Время на обмен закончилось"
                            data={exchange.creationDate}
                            delay={exchange.operationWindow.totalMilliseconds}
                            formatNum
                          />
                        </S.ExchangeLineContent>
                      </S.ExchangeLine>
                      <S.ExchangeLine>
                        <S.ExchangeLineContent main>Статус:</S.ExchangeLineContent>
                        <S.ExchangeLineContent text style={{ maxWidth: '170px' }}>
                          {getStatus(exchange)}
                        </S.ExchangeLineContent>
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
