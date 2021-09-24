import React from 'react';
import { Container } from '../../../components/UI/Container';
import { Heading } from '../components/Heading';
import * as S from './S.elements';

export const Deposits = () => {
  return (
    <Container>
      <Heading onClick={() => undefined} title="Мои депозиты" btnText="Открыть депозит" />
    </Container>
  );
};
