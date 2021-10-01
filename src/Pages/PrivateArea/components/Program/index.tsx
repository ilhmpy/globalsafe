import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { Button } from '../../../../components/Button/V2/Button';
import { AppContext } from '../../../../context/HubContext';
import { DepositsCollection } from '../../../../types/info';
import * as S from './S.el';

export const Program = () => {
  const history = useHistory();
  const appContext = useContext(AppContext);
  const hubConnection = appContext.hubConnection;

  const [depositProgramsList, setDepositProgramsList] = useState<DepositsCollection[]>([]);
  const [depositProgramsLoading, setDepositProgramsLoading] = useState(false);

  const getPrograms = () => {
    if (hubConnection) {
      setDepositProgramsLoading(true);
      hubConnection
        .invoke<any>(
          'GetDepositDefinitions', 
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          0, 
          10,
          []
        )
        .then((res) => {
          if (res.collection.length) {
            console.log("GetDepositDefinitions", res.collection)
            setDepositProgramsList(res.collection);
          }
          setDepositProgramsLoading(false);
        })
        .catch((err: Error) => {
          console.log(err);
          setDepositProgramsLoading(false);
        });
    }
  };

  useEffect(() => {
    getPrograms()
  }, [hubConnection]);


  const handleNavigateToOpen = (depositId: string) => {
    history.replace(`/info/deposits/new-deposit/${depositId}`);
  }

  return (
    <S.CardContainer>
      {
        depositProgramsList.length > 0 && 
        depositProgramsList.map((program, i) => (
          <S.Card key={`${program.id}-${i}`}>
            <S.CardTitle>{program.name}</S.CardTitle>
            <S.CardDesc>{program.description}</S.CardDesc>
            <Button primary onClick={() => handleNavigateToOpen(program.safeId)}>
              Открыть депозит
            </Button>
          </S.Card>
        ))
      }
    </S.CardContainer>
  );
};
