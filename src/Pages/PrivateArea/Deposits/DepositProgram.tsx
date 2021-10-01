import React, { FC } from 'react';
import { Container } from '../../../components/UI/Container';
import { Program } from '../components/Program';
import { Back } from '../components/Back';
import { Title } from '../components/ui/Title';
import { useHistory } from 'react-router-dom';
import { routers } from '../../../constantes/routers';
import * as S from './S.elements';

export const DepositProgram: FC = () => {
  const history = useHistory();

  return (
    <S.Container>
      <Container>
        <Back text="Назад" onClick={() => history.push(routers.deposits)} />
        <Title>Программы депозитов</Title>
      </Container>
      <Program />
    </S.Container>
  );
};
