import { FC } from 'react';
import { routers } from '../../../constantes/routers';
import { Card, Container } from '../../../globalStyles';
import { Back } from '../components/Back';
import { useHistory } from 'react-router-dom';

export const NewPayMethod: FC = () => {
  const history = useHistory();

  return (
    <Container>
      <Back text="К списку платежных методов" onGoBackClick={() => history.push(routers.settings)} />

      <div>
        <div>NewPayMethod</div>
      </div>
    </Container>
  );
};
