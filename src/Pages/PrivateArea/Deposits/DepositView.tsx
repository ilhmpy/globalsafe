import { FC, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { Container } from '../../../components/UI/Container';
import { routers } from '../../../constantes/routers';
import { AppContext } from '../../../context/HubContext';
import { Back } from '../components/Back';
import { ShowDeposit } from '../components/ShowDeposit';
import { TableHistory } from '../components/Table/History';
import { Title } from '../components/ui/Title';
import * as S from './S.elements';

export const DepositView: FC = () => {
  const history = useHistory();
  const appContext = useContext(AppContext);
  const { chosenDepositView, setChosenDepositView } = appContext;
  console.log('chosenDepositView', chosenDepositView);

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
        <ShowDeposit chosenDepositView={chosenDepositView}/>
      </Container>
      <Container>
        <Title small>История начислений</Title>
        <TableHistory />
      </Container>
    </S.Container>
  );
};
