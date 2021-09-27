import React, { useState } from 'react';
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
import { useHistory } from 'react-router-dom';
import { routers } from '../../../constantes/routers';
import * as S from './S.elements';
import { ConfirmOpenDeposit } from '../components/Modals/ConfirmOpenDeposit';
import { SuccessOpenDeposit } from '../components/Modals/Success';
import { ErrorOpenDeposit } from '../components/Modals/ErrorOpenDeposit';
import { CloseDeposit } from '../components/Modals/CloseDeposit';
import { CloseDepositSuccess } from '../components/Modals/CloseDepositSuccess';
import { CloseDepositError } from '../components/Modals/CloseDepositError';

export const Deposits = () => {
  const [openModal, setOpenModal] = useState(false);
  const history = useHistory();

  const onClose = () => {
    setOpenModal(false);
  };

  return (
    <S.Container>
      <Container>
        <Heading
          onClick={() => history.push(routers.depositsProgram)}
          title="Мои депозиты"
          btnText="Открыть депозит"
        />
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
      {/* <button onClick={() => setOpenModal(true)}>open</button> */}
      {/* <ConfirmOpenDeposit onClose={onClose} open={openModal} /> */}
      {/* <SuccessOpenDeposit onClose={onClose} open={openModal} /> */}
      {/* <ErrorOpenDeposit onClose={onClose} open={openModal} /> */}
      {/* <CloseDeposit onClose={onClose} open={openModal} /> */}
      {/* <CloseDepositSuccess onClose={onClose} open={openModal} /> */}
      {/* <CloseDepositError onClose={onClose} open={openModal} /> */}
    </S.Container>
  );
};
