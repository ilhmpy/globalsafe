import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import * as S from './S.el';
import { Container } from '../../../components/UI/Container';
import { Back } from '../components/Back';
import { routers } from '../../../constantes/routers';
import { Title } from '../components/ui/Title';
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
} from '../components/ui';
import { Button } from '../../../components/Button/V2/Button';
import { Tabs } from '../components/Tabs/Tabs';
import { Dropdown } from '../components/Dropdown';

export const OrderCreate = () => {
  const [selectBuy, setSelectBuy] = useState('');
  const [selectChange, setSelectChange] = useState('');
  const [selectDate, setSelectDate] = useState('20 минут');
  const [active, setActive] = useState(0);
  const history = useHistory();
  
  return (
    <S.Container>
      <Container>
        <Back text="Назад" onGoBackClick={() => history.push(routers.depositsProgram)} />
        <Title>Публикация ордера</Title>
        <S.Main>
          <LeftSide>
            <S.BlockWrapper>
              <TitleWrap>
                <ProgramDescTitle>Аккаунт:</ProgramDescTitle>
              </TitleWrap>
              <Text size={24} lH={28} weight={700} mB={10}>
                viproller777
              </Text>
            </S.BlockWrapper>
            <S.BlockWrapper>
              <TitleWrap>
                <ProgramDescTitle>Рейтинг аккаунта:</ProgramDescTitle>
              </TitleWrap>
              <Text size={24} lH={28} weight={700} mB={10}>
                5.0
              </Text>
            </S.BlockWrapper>
          </LeftSide>
          <RightSide>
            <S.TabsWrap>
              <Tabs active={active} setActive={setActive}>
                <div>Покупка</div>
                <div>Продажа</div>
              </Tabs>
            </S.TabsWrap>
            <>
              <S.Block>
                <S.BlockItem>
                  <TitleWrap>
                    <ProgramDescTitle>Валюта покупки:</ProgramDescTitle>
                  </TitleWrap>
                  <Dropdown
                    options={[]}
                    setSelectedOption={setSelectBuy}
                    selectedOption={selectBuy}
                    label="Не выбрано"
                  />
                </S.BlockItem>
                <S.BlockItem>
                  <TitleWrap>
                    <ProgramDescTitle>Количество покупки:</ProgramDescTitle>
                  </TitleWrap>
                  <Field placeholder="Введите сумму" />
                </S.BlockItem>
              </S.Block>
              <S.Block>
                <S.BlockItem>
                  <TitleWrap>
                    <ProgramDescTitle>Валюта обмена:</ProgramDescTitle>
                  </TitleWrap>
                  <Dropdown
                    options={[]}
                    setSelectedOption={setSelectBuy}
                    selectedOption={selectBuy}
                    label="Не выбрано"
                  />
                </S.BlockItem>
                <S.BlockItem>
                  <TitleWrap>
                    <ProgramDescTitle>Курс:</ProgramDescTitle>
                  </TitleWrap>
                  <Field placeholder="Введите сумму" />
                </S.BlockItem>
              </S.Block>
              <S.Block mbBig>
                <S.BlockItem>
                  <TitleWrap>
                    <ProgramDescTitle>Время на обмен:</ProgramDescTitle>
                  </TitleWrap>
                  <Dropdown
                    options={['20 минут']}
                    setSelectedOption={setSelectDate}
                    selectedOption={selectDate}
                  />
                </S.BlockItem>
              </S.Block>
            </>

            <>
              <S.Block>
                <S.BlockItem>
                  <TitleWrap>
                    <ProgramDescTitle>Валюта покупки:</ProgramDescTitle>
                  </TitleWrap>
                  <Dropdown
                    options={[]}
                    setSelectedOption={setSelectBuy}
                    selectedOption={selectBuy}
                    label="Не выбрано"
                  />
                </S.BlockItem>
                <S.BlockItem>
                  <TitleWrap>
                    <ProgramDescTitle>Количество покупки:</ProgramDescTitle>
                  </TitleWrap>
                  <Field placeholder="Введите сумму" />
                </S.BlockItem>
              </S.Block>
              <S.Block>
                <S.BlockItem>
                  <TitleWrap>
                    <ProgramDescTitle>Валюта обмена:</ProgramDescTitle>
                  </TitleWrap>
                  <Dropdown
                    options={[]}
                    setSelectedOption={setSelectBuy}
                    selectedOption={selectBuy}
                    label="Не выбрано"
                  />
                </S.BlockItem>
                <S.BlockItem>
                  <TitleWrap>
                    <ProgramDescTitle>Курс:</ProgramDescTitle>
                  </TitleWrap>
                  <Field placeholder="Введите сумму" />
                </S.BlockItem>
              </S.Block>

              <TitleWrap>
                <ProgramDescTitle>Платежный метод:</ProgramDescTitle>
              </TitleWrap>
              <S.NoPaymentMethod>
                Платежные методы отсутствуют, <a href="/">добавьте платежный метод</a>
              </S.NoPaymentMethod>

              <S.Block mbBig>
                <S.BlockItem>
                  <TitleWrap>
                    <ProgramDescTitle>Время на обмен:</ProgramDescTitle>
                  </TitleWrap>
                  <Dropdown
                    options={['20 минут']}
                    setSelectedOption={setSelectDate}
                    selectedOption={selectDate}
                  />
                </S.BlockItem>
              </S.Block>
            </>
            <Button bigSize primary>
              Опубликовать ордер
            </Button>
          </RightSide>
        </S.Main>
      </Container>
    </S.Container>
  );
};
