import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { Button } from '../../../../components/Button/V2/Button';
import { AppContext } from '../../../../context/HubContext';
import { CollectionListDeposits, ListDeposits } from '../../../../types/deposits';
import { DepositsCollection } from '../../../../types/info';
import * as S from './S.el';

interface ProgramProps {
  className?: string;
}

export const Program = ({className = ''}: ProgramProps) => {
  const history = useHistory();
  const appContext = useContext(AppContext);
  const hubConnection = appContext.hubConnection;
  const lang = localStorage.getItem('i18nextLng') || 'ru';
  const languale = lang === 'ru' ? 1 : 0;

  const [depositProgramsList, setDepositProgramsList] = useState<CollectionListDeposits[]>([]);
  const [depositProgramsLoading, setDepositProgramsLoading] = useState(false);

  const getPrograms = () => {
    if (hubConnection) {
      setDepositProgramsLoading(true);
      hubConnection
        .invoke<ListDeposits>('GetDeposits', languale, true, 0, 20)
        .then((res) => {
          if (res.collection.length) {
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
    <S.CardContainer className={className}>
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
