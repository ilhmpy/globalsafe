import { FC, useContext, useEffect, useMemo } from 'react';
import { useHistory } from 'react-router-dom';
import { Container } from '../../../components/UI/Container';
import { routers } from '../../../constantes/routers';
import { AppContext } from '../../../context/HubContext';
import { RootBalanceList } from '../../../types/balanceHistory';
import { Back } from '../components/Back';
import { ShowDeposit } from '../components/ShowDeposit';
import { TableHistory } from '../components/Table/History';
import { Title } from '../components/ui/Title';
import * as S from './S.elements';

export const DepositView: FC = () => {
  const history = useHistory();
  const { hubConnection, balanceList, chosenDepositView, setChosenDepositView } =
    useContext(AppContext);

  console.log('chosenDepositView', chosenDepositView);

  const bType = useMemo(() => {
    return balanceList?.map((i) => i.balanceKind);
  }, [balanceList]);

  useEffect(() => {
    (async () => {
      if (hubConnection) {
        try {
          const result = await hubConnection.invoke<RootBalanceList>(
            'GetBalanceLog',
            bType,
            [7],
            new Date('2020-12-02T00:47:45'),
            new Date(),
            0,
            100
          );
          console.log('result', result);
        } catch (error) {
          console.log(error);
        }
      }
    })();
  }, []);

  return (
    <S.Container>
      <Container>
        <Back
          text="Назад"
          onGoBackClick={() => {
            setChosenDepositView({});
            history.push(routers.deposits);
          }}
        />
        <ShowDeposit chosenDepositView={chosenDepositView} />
      </Container>
      <Container>
        <Title small>История начислений</Title>
        <TableHistory />
      </Container>
    </S.Container>
  );
};
