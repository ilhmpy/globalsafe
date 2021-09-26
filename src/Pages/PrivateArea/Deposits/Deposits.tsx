import React from 'react';
import { Container } from '../../../components/UI/Container';
import { Back } from '../components/Back';
import { Filter } from '../components/Filter';
import { Heading } from '../components/Heading';
import { OpenDeposit } from '../components/OpenDeposits';
import { Program } from '../components/Program';
import { ShowDeposit } from '../components/ShowDeposit';
import { Table } from '../components/Table';
import { TableHistory } from '../components/Table/History';
import { Title } from '../components/ui/Title';
import * as S from './S.elements';

export const Deposits = () => {
  return (
    <S.Container>
      <Container>
        <Heading onClick={() => undefined} title="Мои депозиты" btnText="Открыть депозит" />
      </Container>
      <Container>
        <Filter />
      </Container>
      <Container>
        <Table />
      </Container>
      {/* <Container>
        <Back text="Назад" onClick={() => undefined} />
      </Container>
      <Program /> */}
      <Container>
        <Title>Открытие депозита</Title>
      </Container>
      <Container>
        <OpenDeposit />
      </Container>
      <Container>
        <Back text="Назад" onClick={() => undefined} />
        <ShowDeposit />
      </Container>
      <Container>
        <Title small>История начислений</Title>
        <TableHistory />
      </Container>
    </S.Container>
  );
};
