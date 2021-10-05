import React, { FC, useState } from 'react';
import { ReactComponent as CopyIcon } from '../../../../../assets/v2/svg/copy-icon.svg';

import { Button } from '../../../../../components/Button/V2/Button';
import { Radio } from '../../../components/Radio/Radio';
import {
  LeftSide,
  RightSide,
  Name,
  ProgramDescTitle,
  ChipWrap,
  ProgramDesc,
  TitleWrap,
  Chip,
  Field,
  Text,
  TextBlock,
} from '../../../components/ui';
import * as S from './S.el';

export const BuyOrder: FC = () => {
  return (
    <S.Container>
      <LeftSide>
        <S.BlockWrapper>
          <TitleWrap small>
            <ProgramDescTitle>Количество:</ProgramDescTitle>
          </TitleWrap>
          <Text size={24} lH={28} weight={700} mB={10}>
            5 000 000 CWD
          </Text>
          <Chip>Покупка</Chip>
        </S.BlockWrapper>

        <S.BlockWrapper>
          <TitleWrap small>
            <ProgramDescTitle>Курс:</ProgramDescTitle>
          </TitleWrap>
          <Text size={24} lH={28} weight={700}>
            0.90
          </Text>
        </S.BlockWrapper>

        <S.BlockWrapper>
          <TitleWrap small>
            <ProgramDescTitle>На сумму:</ProgramDescTitle>
          </TitleWrap>
          <Text size={24} lH={28} weight={700}>
            4 500 000 USD
          </Text>
        </S.BlockWrapper>
        <S.BlockWrapper>
          <TitleWrap small>
            <ProgramDescTitle>Лимиты:</ProgramDescTitle>
          </TitleWrap>
          <Text size={24} lH={28} weight={700}>
            1 000 - 10 000 USD
          </Text>
        </S.BlockWrapper>
        <S.BlockWrapper>
          <TitleWrap small>
            <ProgramDescTitle>Методы оплаты:</ProgramDescTitle>
          </TitleWrap>
          <Text size={24} lH={28} weight={700} mB={10}>
            АО «Тинькофф Банк»
          </Text>
          <Text size={24} lH={28} weight={700} mB={10}>
            АО «Альфа-Банк»
          </Text>
          <Text size={24} lH={28} weight={700} mB={10}>
            ПАО Сбербанк
          </Text>
        </S.BlockWrapper>
        <S.BlockWrapper>
          <TitleWrap small>
            <ProgramDescTitle>Время на обмен:</ProgramDescTitle>
          </TitleWrap>
          <Text size={24} lH={28} weight={700}>
            20м. 00с.
          </Text>
        </S.BlockWrapper>

        <S.BlockWrapper>
          <TitleWrap small>
            <ProgramDescTitle>Рейтинг покупателя:</ProgramDescTitle>
          </TitleWrap>
          <Text size={24} lH={28} weight={700}>
            5.0 (378)
          </Text>
        </S.BlockWrapper>
      </LeftSide>
      <RightSide>
        <TitleWrap>
          <Text size={24} lH={28} weight={700} mB={40}>
            Заявка на продажу CWD за USD
          </Text>
        </TitleWrap>

        <S.BlockWrapper big>
          <TitleWrap small>
            <ProgramDescTitle>Количество продажи (max 9 000 CWD):</ProgramDescTitle>
          </TitleWrap>
          <Field placeholder="Введите сумму" />
        </S.BlockWrapper>

        <S.BlockWrapper big>
          <TitleWrap small>
            <ProgramDescTitle>Сумма к получению (max 10 000 USD):</ProgramDescTitle>
          </TitleWrap>
          <Field placeholder="Введите сумму" />
        </S.BlockWrapper>

        <S.BlockWrapper big>
          <TitleWrap small>
            <ProgramDescTitle>Платежный метод (USD):</ProgramDescTitle>
          </TitleWrap>
          <S.RadioWrap>
            <Radio>
              <S.LabelRadio>АО «Тинькофф Банк»</S.LabelRadio>
            </Radio>
          </S.RadioWrap>
          <S.BlockWrapperInner>
            <Text size={14} weight={300} lH={20} mB={4}>
              Номер карты:
            </Text>
            <S.NumberBlock>
              <Text size={14} weight={500} lH={20} mB={10}>
                5536 9137 9922 7240{' '}
              </Text>
              <S.CopyButton>
                <CopyIcon />
              </S.CopyButton>
            </S.NumberBlock>
            <Text size={14} weight={300} lH={20} mB={4}>
              Держатель карты:
            </Text>
            <Text size={14} weight={500} lH={20} mB={10}>
              VYACHESLAV TROSCHIN
            </Text>
          </S.BlockWrapperInner>
        </S.BlockWrapper>

        <S.BlockWrapper big>
          <TitleWrap small>
            <ProgramDescTitle>Платежный метод (USDT):</ProgramDescTitle>
          </TitleWrap>
          <S.RadioWrap>
            <Radio>
              <S.LabelRadio>TRC 20</S.LabelRadio>
            </Radio>
          </S.RadioWrap>
          <S.BlockWrapperInner>
            <Text size={14} weight={300} lH={20} mB={4}>
              Адрес кошелька:
            </Text>
            <S.NumberBlock>
              <Text size={14} weight={500} lH={20} mB={10}>
                377JKD792HcVkP5qZoF7Pv31MbUwke5iMX{' '}
              </Text>
              <S.CopyButton>
                <CopyIcon />
              </S.CopyButton>
            </S.NumberBlock>
          </S.BlockWrapperInner>
        </S.BlockWrapper>

        <S.BlockWrapper>
          <TextBlock>
            После начала обмена - в течении 20 минут покупатель осуществит перевод средств на
            указанный счет, а покупаемое количество CWD будет списано с вашего баланса и заморожено
            до вашего подтверждения получения средств.
          </TextBlock>
        </S.BlockWrapper>
        <Button bigSize primary>
          Продать
        </Button>
      </RightSide>
    </S.Container>
  );
};
