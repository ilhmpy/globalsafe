import React from 'react';
import { Container } from '../../../components/UI/Container';
import { Back } from '../components/Back';
import { Title } from '../components/ui/Title';
import { OpenDeposit } from '../components/OpenDeposits';
import { useHistory } from 'react-router-dom';
import { routers } from '../../../constantes/routers';
import * as S from './S.elements';

export const DepositOpen = () => {
  const history = useHistory();
  return (
    <S.Container>
      <Container>
        <Back text="К программам депозитов" onClick={() => history.push(routers.depositsProgram)} />
        <Container>
          <Title>Открытие депозита</Title>
        </Container>
        <OpenDeposit />
      </Container>
    </S.Container>
  );
};
