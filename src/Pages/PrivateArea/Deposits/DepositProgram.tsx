import React, { FC } from 'react';
import { Container } from '../../../components/UI/Container';
import { Program } from '../components/Program';
import { Back } from '../components/Back';
import { Title } from '../components/ui/Title';
import * as S from './S.elements';

export const DepositProgram: FC = () => {
  return (
    <S.Container>
      <Back text="Назад" onClick={() => undefined} />
      <Title>Программы депозитов</Title>
      <Program />
    </S.Container>
  );
};
