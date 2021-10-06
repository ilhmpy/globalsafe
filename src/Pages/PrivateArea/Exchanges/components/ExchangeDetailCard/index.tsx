import React, { FC, useState } from 'react';
import * as S from './S.el';
import {
  Chip,
  CopyIconButton,
  LeftSide,
  RightSide,
  Text,
  Title,
  Radio
} from '../../../components/ui';
import { Button } from '../../../../../components/Button/V2/Button';
import { ExchangeSuccessModal } from '../modals/ExchangeSuccessModal';
import { ExchangeRejectModal } from '../modals/ExchangeRejectModal';
import { useHistory } from 'react-router';
import { routers } from '../../../../../constantes/routers';
 
export const ExchangeDetailCard: FC = () => {
  const history = useHistory();
  const [feedbackValue, setFeedbackValue] = useState(5);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showRejectModal, setShowRejectModal] = useState(false);
  
  const handleClick = () => {
    history.push(`/info/p2p-changes/${Date.now().toString()}/chat`);
  };

  return (
    <S.Container>
      <LeftSide bg={'#EAEFF4'}>
        <S.BlockWrapper>
          <Text size={14} lH={20} mB={10} black>Количество:</Text>
          <Title lH={28} mB={10}>5 000 000 CWD</Title>
          <Chip>Продажа</Chip>
        </S.BlockWrapper>

        <S.BlockWrapper>
          <Text size={14} lH={20} mB={10} black>Курс:</Text>
          <Title lH={28}>0.90</Title>
        </S.BlockWrapper>

        <S.BlockWrapper>
          <Text size={14} lH={20} mB={10} black>На сумму:</Text>
          <Title lH={28}>4 500 000 USD</Title>
        </S.BlockWrapper>

        <S.BlockWrapper>
          <Text size={14} lH={20} mB={10} black>Лимиты:</Text>
          <Title lH={28}>1 000 - 10 000 USD</Title>
        </S.BlockWrapper>

        <S.BlockWrapper>
          <Text size={14} lH={20} mB={10} black>Методы оплаты:</Text>
          <Title lH={28}>АО «Тинькофф Банк»</Title>
        </S.BlockWrapper>

        <S.BlockWrapper>
          <Text size={14} lH={20} mB={10} black>Время на обмен:</Text>
          <Title lH={28}>20м. 00с.</Title>
        </S.BlockWrapper>

        <S.BlockWrapper>
          <Text size={14} lH={20} mB={10} black>Рейтинг продавца:</Text>
          <Title lH={28}>5.0 (378)</Title>
        </S.BlockWrapper>
      </LeftSide>

      <RightSide>
          <S.TitleBlockWrapper>
            <Title mB={10} lH={28}>Покупка CWD за USD</Title>
            <Chip>Абуз</Chip>
          </S.TitleBlockWrapper>

          <S.BlockWrapper>
            <Text size={14} lH={20} mB={4} black>Количество:</Text>
            <Text size={14} lH={20} weight={500} black>482.40 CWD</Text>
          </S.BlockWrapper>

          <S.BlockWrapper>
            <Text size={14} lH={20} mB={4} black>На сумму:</Text>
            <Text size={14} lH={20} weight={500} black>49 900 USD</Text>
          </S.BlockWrapper>

          <S.BlockWrapper>
            <Text size={14} lH={20} mB={4} black>Метод оплаты:</Text>
            <Text size={14} lH={20} weight={500} black>АО «Альфа-Банк», RUR</Text>
          </S.BlockWrapper>

          <S.BlockWrapper>
            <Text size={14} lH={20} mB={4} black>Номер карты:</Text>
            <S.Space>
              <Text size={14} lH={20} weight={500} black>5536 9137 9922 7240</Text>
              <CopyIconButton copyValue={'5536 9137 9922 7240'} />
            </S.Space>
          </S.BlockWrapper>

          <S.BlockWrapper>
            <Text size={14} lH={20} mB={4} black>Держатель карты:</Text>
            <Text size={14} lH={20} weight={500} black>VYACHESLAV TROSCHIN</Text>
          </S.BlockWrapper>

          <S.BlockWrapper>
            <Text size={14} lH={20} mB={4} black>Рейтинг покупателя:</Text>
            <Text size={14} lH={20} weight={500} black>5.0 (256)</Text>
          </S.BlockWrapper>

          <S.TransferInfoBlock>
              <Text size={14} lH={20} black>
                Покупатель указал, что перевел средства в размере <S.B>49 900 RUB</S.B> на указанный счет.
                Подтвердите получение средств для успешного завершения обмена.
                Покупатель получит <S.B>482.40 CWD</S.B>
              </Text>
          </S.TransferInfoBlock>

          <S.Space justify="space-between">
            <Button primary onClick={() => setShowSuccessModal(true)}>
              Средства получены
            </Button>

            <S.Space gap={20}>
              <Button outlinePrimary onClick={handleClick}>
                Чат
              </Button>
              <Button outlineDanger onClick={handleClick}>
                Жалоба
            </Button>
            </S.Space>
          </S.Space>


          {/* Another State */}
          <S.TransferInfoBlock>
              <Text size={14} lH={20} black>
                Обмен успешно завершен. Средства в размере <S.B>482.40 CWD</S.B> отправлены покупателю.
                Оставьте свою оценку покупателю.
              </Text>
          </S.TransferInfoBlock>

          <S.FeedbackBlock>
              <Text size={14} lH={20} mB={10} black>
                Оставьте свою оценку покупателю:
              </Text>
              <Radio.Group>
                <Radio 
                  name="feedback"
                  label="1"
                  value="1"
                  checked={feedbackValue === 1}
                  onChange={(e) => setFeedbackValue(+e.target.value)}
                />
                <Radio 
                  name="feedback"
                  label="2"
                  value="2"
                  checked={feedbackValue === 2}
                  onChange={(e) => setFeedbackValue(+e.target.value)}
                />
                <Radio 
                  name="feedback"
                  label="3"
                  value="3"
                  checked={feedbackValue === 3}
                  onChange={(e) => setFeedbackValue(+e.target.value)}
                />
                <Radio 
                  name="feedback"
                  label="4"
                  value="4"
                  checked={feedbackValue === 4}
                  onChange={(e) => setFeedbackValue(+e.target.value)}
                />
                <Radio 
                  name="feedback"
                  label="5"
                  value="5"
                  checked={feedbackValue === 5}
                  onChange={(e) => setFeedbackValue(+e.target.value)}
                />
              </Radio.Group>
          </S.FeedbackBlock>

          <Button primary onClick={() => setShowRejectModal(true)}>
            Подтвердить
          </Button>

      </RightSide>
      <ExchangeSuccessModal
        open={showSuccessModal} 
        onClose={() => setShowSuccessModal(false)}  
      />
      <ExchangeRejectModal
        open={showRejectModal} 
        onClose={() => setShowRejectModal(false)}  
      />
    </S.Container>
  );
};
