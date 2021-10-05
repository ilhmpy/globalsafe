import React, { FC, useState } from 'react';
import * as S from './S.el';
import {
  Chip,
  CopyIconButton,
  LeftSide,
  RightSide,
  Text,
  Title
} from '../../../components/ui';

export const ExchangeDetailCard: FC = () => {
  return (
    <S.Container>
      <LeftSide bg={'#EAEFF4'}>
        <S.BlockWrapper>
          <Text size={14} lH={20} mB={10}>Количество:</Text>
          <Title lH={28} mB={10}>5 000 000 CWD</Title>
          <Chip>Продажа</Chip>
        </S.BlockWrapper>

        <S.BlockWrapper>
          <Text size={14} lH={20} mB={10}>Курс:</Text>
          <Title lH={28}>0.90</Title>
        </S.BlockWrapper>

        <S.BlockWrapper>
          <Text size={14} lH={20} mB={10}>На сумму:</Text>
          <Title lH={28}>4 500 000 USD</Title>
        </S.BlockWrapper>

        <S.BlockWrapper>
          <Text size={14} lH={20} mB={10}>Лимиты:</Text>
          <Title lH={28}>1 000 - 10 000 USD</Title>
        </S.BlockWrapper>

        <S.BlockWrapper>
          <Text size={14} lH={20} mB={10}>Методы оплаты:</Text>
          <Title lH={28}>АО «Тинькофф Банк»</Title>
        </S.BlockWrapper>

        <S.BlockWrapper>
          <Text size={14} lH={20} mB={10}>Время на обмен:</Text>
          <Title lH={28}>20м. 00с.</Title>
        </S.BlockWrapper>

        <S.BlockWrapper>
          <Text size={14} lH={20} mB={10}>Рейтинг продавца:</Text>
          <Title lH={28}>5.0 (378)</Title>
        </S.BlockWrapper>
      </LeftSide>

      <RightSide>
          <S.TitleBlockWrapper>
            <Title mB={10} lH={28}>Покупка CWD за USD</Title>
            <Chip>Абуз</Chip>
          </S.TitleBlockWrapper>

          <S.BlockWrapper>
            <Text size={14} lH={20} mB={4}>Количество:</Text>
            <Text size={14} lH={20} weight={500}>482.40 CWD</Text>
          </S.BlockWrapper>

          <S.BlockWrapper>
            <Text size={14} lH={20} mB={4}>На сумму:</Text>
            <Text size={14} lH={20} weight={500}>49 900 USD</Text>
          </S.BlockWrapper>

          <S.BlockWrapper>
            <Text size={14} lH={20} mB={4}>Метод оплаты:</Text>
            <Text size={14} lH={20} weight={500}>АО «Альфа-Банк», RUR</Text>
          </S.BlockWrapper>

          <S.BlockWrapper>
            <Text size={14} lH={20} mB={4}>Номер карты:</Text>
            <S.Space>
              <Text size={14} lH={20} weight={500}>5536 9137 9922 7240</Text>
              <CopyIconButton copyValue={'5536 9137 9922 7240'} />
            </S.Space>
          </S.BlockWrapper>

          <S.BlockWrapper>
            <Text size={14} lH={20} mB={4}>Держатель карты:</Text>
            <Text size={14} lH={20} weight={500}>VYACHESLAV TROSCHIN</Text>
          </S.BlockWrapper>

          <S.BlockWrapper>
            <Text size={14} lH={20} mB={4}>Рейтинг покупателя:</Text>
            <Text size={14} lH={20} weight={500}>5.0 (256)</Text>
          </S.BlockWrapper>

      </RightSide>
    </S.Container>
  );
};
