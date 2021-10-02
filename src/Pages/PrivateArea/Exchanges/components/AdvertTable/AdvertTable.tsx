import React from 'react';
import alfa from '../../../../../assets/v2/svg/banks/alfa.svg';
import sber from '../../../../../assets/v2/svg/banks/sber.svg';
import tinkoff from '../../../../../assets/v2/svg/banks/tinkoff.svg';
import * as S from './S.el';

export const AdvertTable = () => {
  return (
    <S.Table>
      <S.Header>
        <span>Кол-во</span>
        <span>Курс</span>
        <span>На сумму</span>
        <span>Лимиты</span>
        <span>Метод оплаты</span>
        <span>Время на обмен</span>
        <span>Рейтинг</span>
      </S.Header>
      <S.BodyItem>
        <S.Cell>5 000 000 CWD</S.Cell>
        <S.Cell>0.90</S.Cell>
        <S.Cell>4 500 000 USD</S.Cell>
        <S.Cell>1 000 - 10 000 USD</S.Cell>
        <S.Cell>
          <S.BankList>
            <S.BankItem>
              <img src={alfa} alt="" />
            </S.BankItem>
            <S.BankItem>
              <img src={sber} alt="" />
            </S.BankItem>
            <S.BankItem>
              <img src={tinkoff} alt="" />
            </S.BankItem>
          </S.BankList>
        </S.Cell>
        <S.Cell>20 м</S.Cell>
        <S.Cell>5.0 (378)</S.Cell>
      </S.BodyItem>
    </S.Table>
  );
};
