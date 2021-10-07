import React, { FC, useState } from 'react';
import * as S from './S.el';
import {
  LeftSide,
  RightSide,
  Text,
  Title,
} from '../../../components/ui';
import { Button } from '../../../../../components/Button/V2/Button';
import { useHistory } from 'react-router';
import { DeleteOrderModal } from '../modals/DeleteOrderModal';
import { DeleteOrderSuccessModal } from '../modals/DeleteOrderSuccessModal';
import { DeleteOrderErrorModal } from '../modals/DeleteOrderErrorModal';
 
export const OrderDetailCard: FC = () => {
  const history = useHistory();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showDeleteSuccessModal, setShowDeleteSuccessModal] = useState(false);
  const [showDeleteErrorModal, setShowDeleteErrorModal] = useState(false);


  return (
    <S.Container>
      <LeftSide bg={'#EAEFF4'}>
        <S.BlockWrapper>
          <Text size={14} lH={20} mB={10} black>Аккаунт:</Text>
          <Title lH={28}>viproller777</Title>
        </S.BlockWrapper>

        <S.BlockWrapper>
          <Text size={14} lH={20} mB={10} black>Рейтинг аккаунта:</Text>
          <Title lH={28}>5.0</Title>
        </S.BlockWrapper>

      </LeftSide>

      <RightSide>
          <S.BlockWrapper>
            <Text size={14} lH={20} mB={4} black>Количество:</Text>
            <Text size={14} lH={20} weight={500} black>5 000 000 CWD</Text>
          </S.BlockWrapper>

          <S.BlockWrapper>
            <Text size={14} lH={20} mB={4} black>Курс:</Text>
            <Text size={14} lH={20} weight={500} black>103.44 RUB</Text>
          </S.BlockWrapper>

          <S.BlockWrapper>
            <Text size={14} lH={20} mB={4} black>На сумму:</Text>
            <Text size={14} lH={20} weight={500} black>4 500 00 RUB</Text>
          </S.BlockWrapper>

          <S.BlockWrapper>
            <Text size={14} lH={20} mB={4} black>Лимиты:</Text>
            <Text size={14} lH={20} weight={500} black>1 000 - 49 900 RUB</Text>
          </S.BlockWrapper>

          <S.BlockWrapper>
            <Text size={14} lH={20} mB={4} black>Время на обмен:</Text>
            <Text size={14} lH={20} weight={500} black>20м. 00с.</Text>
          </S.BlockWrapper>

          <S.BlockWrapper largeMB>
            <Text size={14} lH={20} mB={4} black>Платежные методы:</Text>
            <Text size={14} lH={20} weight={500} black>АО «Альфа-Банк», RUR</Text>
            <Text size={14} lH={20} weight={500} black>АО «Тинькофф Банк», RUR</Text>
            <Text size={14} lH={20} weight={500} black>ПАО Сбербанк, RUR</Text>
          </S.BlockWrapper>

      
          <Button primary onClick={() => setShowDeleteModal(true)}>
            Удалить ордер
          </Button>
          <br />
          <br />
          <Button primary onClick={() => setShowDeleteSuccessModal(true)}>
             Test success
          </Button>
          <br />
          <br />
          <Button primary onClick={() => setShowDeleteErrorModal(true)}>
             Test Failure
          </Button>

      </RightSide>
      <DeleteOrderModal
        open={showDeleteModal} 
        onClose={() => setShowDeleteModal(false)}  
      />
       <DeleteOrderSuccessModal
        open={showDeleteSuccessModal} 
        onClose={() => setShowDeleteSuccessModal(false)}  
      />
       <DeleteOrderErrorModal
        open={showDeleteErrorModal} 
        onClose={() => setShowDeleteErrorModal(false)}  
      />
    </S.Container>
  );
};
