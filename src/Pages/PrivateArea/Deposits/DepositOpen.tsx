import { FC, useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Container } from '../../../components/UI/Container';
import { routers } from '../../../constantes/routers';
import { AppContext } from '../../../context/HubContext';
import { RootList } from '../../../types/info';
import { Back } from '../components/Back';
import { ConfirmOpenDeposit } from '../components/Modals/ConfirmOpenDeposit';
import { OpenDeposit } from '../components/OpenDeposits';
import { Title } from '../components/ui/Title';
import * as S from './S.elements';

export const DepositOpen: FC = () => {
  const history = useHistory();
  const [isConfirmOpenDeposit, setIsConfirmOpenDeposit] = useState(false);
  const [isConfirm, setIsConfirm] = useState(false);
  const [sumValue, setSumValue] = useState<string>('');

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
      <ConfirmOpenDeposit
        onClose={(isAgree) => {
          setIsConfirmOpenDeposit(false);
          setIsConfirm(isAgree);
        }}
        open={isConfirmOpenDeposit}
        sumValue={sumValue}
      />
      <Container>
        <Back text="К программам депозитов" onGoBackClick={goBackClick} />
        <Container>
          <Title>Открытие депозита</Title>
        </Container>
        <OpenDeposit
          goBackClick={goBackClick}
          setIsConfirmOpenDeposit={setIsConfirmOpenDeposit}
          isConfirm={isConfirm}
          setSumValue={setSumValue}
        />
      </Container>
    </S.Container>
  );
};
