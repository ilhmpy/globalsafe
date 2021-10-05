import React, { useState } from 'react';
import { useHistory } from 'react-router';
import alfa from '../../../../../assets/v2/svg/banks/alfa.svg';
import alfa1 from '../../../../../assets/v2/svg/banks/alfa1.svg';
import sber from '../../../../../assets/v2/svg/banks/sber.svg';
import tinkoff from '../../../../../assets/v2/svg/banks/tinkoff.svg';
import { CurrencyPair } from '../modals/CurrencyPair';

import * as S from './S.el';

export const OwnArchivedExchangesTable = () => {
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

        <S.BodyItem onClick={handleNavigateToExchange}>
          <S.Cell data-label="Дата">28.09.2021</S.Cell>
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
          <S.Cell data-label="Статус">Завершен</S.Cell>
        </S.BodyItem>

        <S.BodyItem active onClick={handleNavigateToExchange}>
          <S.Cell data-label="Дата">28.09.2021</S.Cell>
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
          <S.Cell data-label="Статус">Завершен</S.Cell>
        </S.BodyItem>

        <S.BodyItem onClick={handleNavigateToExchange}>
          <S.Cell data-label="Дата">28.09.2021</S.Cell>
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
          <S.Cell data-label="Статус">Завершен</S.Cell>
        </S.BodyItem>

        <S.BodyItem onClick={handleNavigateToExchange}>
          <S.Cell data-label="Дата">28.09.2021</S.Cell>
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
          <S.Cell data-label="Статус">Завершен</S.Cell>
        </S.BodyItem>

        <S.BodyItem onClick={handleNavigateToExchange}>
          <S.Cell data-label="Дата">28.09.2021</S.Cell>
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
          <S.Cell data-label="Статус">Завершен</S.Cell>
        </S.BodyItem>
        
        {/* <S.BodyItem active>
          <S.Cell data-label="Кол-во">1 000 000 GLOBAL</S.Cell>
          <S.Cell data-label="Курс">0.91</S.Cell>
          <S.Cell data-label="На сумму">910 000 EUR</S.Cell>
          <S.Cell data-label="Лимиты">1 000 - 10 000 EUR</S.Cell>
          <S.Cell data-label="Метод оплаты">
            <S.BankList>
              <S.BankItem>
                <img src={alfa} alt="" />
              </S.BankItem>
              <S.BankItem>
                <img src={alfa1} alt="" />
              </S.BankItem>
            </S.BankList>
          </S.Cell>
          <S.Cell data-label="Время на обмен">20 м</S.Cell>
          <S.Cell data-label="Рейтинг">5.0 (274)</S.Cell>
        </S.BodyItem>

        <S.BodyItem>
          <S.Cell data-label="Кол-во">270 000 CWD</S.Cell>
          <S.Cell data-label="Курс">0.92</S.Cell>
          <S.Cell data-label="На сумму">248 400 USDT</S.Cell>
          <S.Cell data-label="Лимиты">100 - ∞ USDT</S.Cell>
          <S.Cell data-label="Метод оплаты">
            <S.BankList>
              <S.TypeCrypto>ERC 20</S.TypeCrypto>
              <S.TypeCrypto>TRC 20</S.TypeCrypto>
              <S.TypeCrypto>BEP 20</S.TypeCrypto>
            </S.BankList>
          </S.Cell>
          <S.Cell data-label="Время на обмен">20 м</S.Cell>
          <S.Cell data-label="Рейтинг">5.0 (1)</S.Cell>
        </S.BodyItem> */}
      </S.Table>
    </>
  );
};
