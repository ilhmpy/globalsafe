import React, { useState } from 'react';
import { useHistory } from 'react-router';
import alfa from '../../../../../assets/v2/svg/banks/alfa.svg';
import alfa1 from '../../../../../assets/v2/svg/banks/alfa1.svg';
import sber from '../../../../../assets/v2/svg/banks/sber.svg';
import tinkoff from '../../../../../assets/v2/svg/banks/tinkoff.svg';
import { CurrencyPair } from '../modals/CurrencyPair';

import * as S from './S.el';

export const OwnActiveExchangesTable = () => {
  const history = useHistory();
  const [selectedOption, setSelectedOption] = useState<string | null>('Все валюты предложения');

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

        <S.BodyItem onClick={handleNavigateToExchange}>
          <S.Cell data-label="Тип">Покупка</S.Cell>
          <S.Cell data-label="Кол-во">20 000 CWD</S.Cell>
          <S.Cell data-label="Курс">25.31</S.Cell>
          <S.Cell data-label="Сумма оплаты">789.97 USD</S.Cell>
          <S.Cell data-label="Метод оплаты">
            <S.BankList>
              <S.BankItem>
                <img src={alfa} alt="" />
              </S.BankItem>
              {/* <S.BankItem>
                <img src={tinkoff} alt="" />
              </S.BankItem>
              <S.BankItem>
                <img src={sber} alt="" />
              </S.BankItem> */}
            </S.BankList>
          </S.Cell>
          <S.Cell data-label="Оставшееся время">18м 23с</S.Cell>
          <S.Cell data-label="Статус">Ожидание подтверждения оплаты</S.Cell>
        </S.BodyItem>

        <S.BodyItem onClick={handleNavigateToExchange}>
          <S.Cell data-label="Тип">Покупка</S.Cell>
          <S.Cell data-label="Кол-во">20 000 CWD</S.Cell>
          <S.Cell data-label="Курс">25.31</S.Cell>
          <S.Cell data-label="Сумма оплаты">789.97 USD</S.Cell>
          <S.Cell data-label="Метод оплаты">
            <S.BankList>
              <S.BankItem>
                <img src={alfa} alt="" />
              </S.BankItem>
              {/* <S.BankItem>
                <img src={tinkoff} alt="" />
              </S.BankItem>
              <S.BankItem>
                <img src={sber} alt="" />
              </S.BankItem> */}
            </S.BankList>
          </S.Cell>
          <S.Cell data-label="Оставшееся время">18м 23с</S.Cell>
          <S.Cell data-label="Статус">Ожидание подтверждения оплаты</S.Cell>
        </S.BodyItem>

        <S.BodyItem onClick={handleNavigateToExchange}>
          <S.Cell data-label="Тип">Покупка</S.Cell>
          <S.Cell data-label="Кол-во">20 000 CWD</S.Cell>
          <S.Cell data-label="Курс">25.31</S.Cell>
          <S.Cell data-label="Сумма оплаты">789.97 USD</S.Cell>
          <S.Cell data-label="Метод оплаты">
            <S.BankList>
              <S.BankItem>
                <img src={alfa} alt="" />
              </S.BankItem>
              {/* <S.BankItem>
                <img src={tinkoff} alt="" />
              </S.BankItem>
              <S.BankItem>
                <img src={sber} alt="" />
              </S.BankItem> */}
            </S.BankList>
          </S.Cell>
          <S.Cell data-label="Оставшееся время">18м 23с</S.Cell>
          <S.Cell data-label="Статус">Ожидание подтверждения оплаты</S.Cell>
        </S.BodyItem>

        <S.BodyItem active onClick={handleNavigateToExchange}>
          <S.Cell data-label="Тип">Покупка</S.Cell>
          <S.Cell data-label="Кол-во">20 000 CWD</S.Cell>
          <S.Cell data-label="Курс">25.31</S.Cell>
          <S.Cell data-label="Сумма оплаты">789.97 USD</S.Cell>
          <S.Cell data-label="Метод оплаты">
            <S.BankList>
              <S.BankItem>
                <img src={alfa} alt="" />
              </S.BankItem>
              {/* <S.BankItem>
                <img src={tinkoff} alt="" />
              </S.BankItem>
              <S.BankItem>
                <img src={sber} alt="" />
              </S.BankItem> */}
            </S.BankList>
          </S.Cell>
          <S.Cell data-label="Оставшееся время">18м 23с</S.Cell>
          <S.Cell data-label="Статус">Ожидание подтверждения оплаты</S.Cell>
        </S.BodyItem>

        <S.BodyItem onClick={handleNavigateToExchange}>
          <S.Cell data-label="Тип">Покупка</S.Cell>
          <S.Cell data-label="Кол-во">20 000 CWD</S.Cell>
          <S.Cell data-label="Курс">25.31</S.Cell>
          <S.Cell data-label="Сумма оплаты">789.97 USD</S.Cell>
          <S.Cell data-label="Метод оплаты">
            <S.BankList>
              <S.BankItem>
                <img src={alfa} alt="" />
              </S.BankItem>
              {/* <S.BankItem>
                <img src={tinkoff} alt="" />
              </S.BankItem>
              <S.BankItem>
                <img src={sber} alt="" />
              </S.BankItem> */}
            </S.BankList>
          </S.Cell>
          <S.Cell data-label="Оставшееся время">18м 23с</S.Cell>
          <S.Cell data-label="Статус">Ожидание подтверждения оплаты</S.Cell>
        </S.BodyItem>

      </S.Table>
    </>
  );
};
