import { FC, useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Container } from '../../../components/UI/Container';
import { routers } from '../../../constantes/routers';
import { AppContext } from '../../../context/HubContext';
import { CollectionListDeposits, ListDeposits } from '../../../types/deposits';
import { RootList } from '../../../types/info';
import { Back } from '../components/Back';
import { OpenDeposit } from '../components/OpenDeposits';
import { Title } from '../components/ui/Title';
import * as S from './S.elements';

export const DepositOpen: FC = () => {
  const history = useHistory();
  
  const appContext = useContext(AppContext);
  const { hubConnection } = appContext;

  const pathnameArray = window.location.pathname.split('/');
  console.log(pathnameArray[pathnameArray.length - 1]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const goBackClick = async () => {
    if (hubConnection) {
      try {
        const response = await hubConnection?.invoke<RootList>(
          'GetUserDepositsInstant',
          [2],
          null,
          0,
          20,
          []
        );

        history.push(response.collection.length ? routers.depositsProgram : routers.deposits);
      } catch (error) {
        console.log(error);
      }
    }
  };


  return (
    <S.Container>
      <Container>
        <Back text="К программам депозитов" onGoBackClick={goBackClick} />
        <Container>
          <Title>Открытие депозита</Title>
        </Container>
        <OpenDeposit goBackClick={goBackClick} />
      </Container>
    </S.Container>
  );
};
