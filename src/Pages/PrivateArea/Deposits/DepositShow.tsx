import React from 'react';
import { Container } from '../../../components/UI/Container';
import { Back } from '../components/Back';
import { Title } from '../components/ui/Title';
import { ShowDeposit } from '../components/ShowDeposit';
import { TableHistory } from '../components/Table/History';
import { useHistory } from 'react-router-dom';
import { routers } from '../../../constantes/routers';
import * as S from './S.elements';

export const DepositShow = () => {
  const history = useHistory();
  return (
    <S.Container>
      <Container>
        <Back text="Назад" onClick={() => history.push(routers.deposits)} />
        <ShowDeposit />
      </Container>
      <Container>
        <Title small>История начислений</Title>
        <TableHistory />
      </Container>
    </S.Container>
  );
};
