import React from 'react';
import { useHistory } from 'react-router';
import alfa from '../../../../../assets/v2/svg/banks/alfa.svg';

import * as S from './S.el';

export const ExchangesInOrderTable = () => {
  const history = useHistory();

  const handleNavigateToExchange = () => {
    history.replace(`/info/p2p-changes/${Date.now().toString()}`)
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

        <S.BodyItem onClick={handleNavigateToExchange}>
          <S.Cell data-label="№ обмена">4799646829</S.Cell>
          <S.Cell data-label="Кол-во">400 CWD</S.Cell>
          <S.Cell data-label="Стоимость">41 376 RUB</S.Cell>
          <S.Cell data-label="Метод оплаты">
            <S.BankList>
              <S.BankItem>
                <img src={alfa} alt="" />
              </S.BankItem>
            </S.BankList>
          </S.Cell>
          <S.Cell data-label="Оставшееся время">18м 23с</S.Cell>
          <S.Cell data-label="Статус">Ожидание подтверждения оплаты</S.Cell>
        </S.BodyItem>

        <S.BodyItem onClick={handleNavigateToExchange}>
          <S.Cell data-label="№ обмена">4799646829</S.Cell>
          <S.Cell data-label="Кол-во">400 CWD</S.Cell>
          <S.Cell data-label="Стоимость">41 376 RUB</S.Cell>
          <S.Cell data-label="Метод оплаты">
            <S.BankList>
              <S.BankItem>
                <img src={alfa} alt="" />
              </S.BankItem>
            </S.BankList>
          </S.Cell>
          <S.Cell data-label="Оставшееся время">18м 23с</S.Cell>
          <S.Cell data-label="Статус">Ожидание подтверждения оплаты</S.Cell>
        </S.BodyItem>

        <S.BodyItem onClick={handleNavigateToExchange}>
          <S.Cell data-label="№ обмена">4799646829</S.Cell>
          <S.Cell data-label="Кол-во">400 CWD</S.Cell>
          <S.Cell data-label="Стоимость">41 376 RUB</S.Cell>
          <S.Cell data-label="Метод оплаты">
            <S.BankList>
              <S.BankItem>
                <img src={alfa} alt="" />
              </S.BankItem>
            </S.BankList>
          </S.Cell>
          <S.Cell data-label="Оставшееся время">18м 23с</S.Cell>
          <S.Cell data-label="Статус">Ожидание подтверждения оплаты</S.Cell>
        </S.BodyItem>

        <S.BodyItem onClick={handleNavigateToExchange}>
          <S.Cell data-label="№ обмена">4799646829</S.Cell>
          <S.Cell data-label="Кол-во">400 CWD</S.Cell>
          <S.Cell data-label="Стоимость">41 376 RUB</S.Cell>
          <S.Cell data-label="Метод оплаты">
            <S.BankList>
              <S.BankItem>
                <img src={alfa} alt="" />
              </S.BankItem>
            </S.BankList>
          </S.Cell>
          <S.Cell data-label="Оставшееся время">18м 23с</S.Cell>
          <S.Cell data-label="Статус">Ожидание подтверждения оплаты</S.Cell>
        </S.BodyItem>
        

      </S.Table>
    </>
  );
};
