import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { Button } from '../../../../components/Button/V2/Button';
import { AppContext } from '../../../../context/HubContext';
import { CollectionListDeposits, ListDeposits } from '../../../../types/deposits';
import { RootList } from '../../../../types/info';
import * as S from './S.el';

interface ProgramProps {
  className?: string;
}

export const Program = ({ className = '' }: ProgramProps) => {
  const history = useHistory();
  const { hubConnection } = useContext(AppContext);
  const lang = localStorage.getItem('i18nextLng') || 'ru';
  const languale = lang === 'ru' ? 1 : 0;

  const [depositProgramsList, setDepositProgramsList] = useState<CollectionListDeposits[]>([]);
  const [depositProgramsLoading, setDepositProgramsLoading] = useState(false);

  const getPrograms = () => {
    if (hubConnection) {
      setDepositProgramsLoading(true);
      hubConnection
        // .invoke<RootList>('GetUserDeposits', [1, 2, 3, 4, 5, 6, 7, 8], null, 0, 20, [
        //   {
        //     ConditionWeight: 1,
        //     OrderType: 2,
        //     FieldName: 'creationDate',
        //   },
        // ])
        .invoke<ListDeposits>('GetDeposits', languale, true, 0, 20)
        .then((res) => {
          console.log('.11111111111111s', res);
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
    getPrograms();
  }, [hubConnection]);

  const handleNavigateToOpen = (depositId: string) => {
    history.replace(`/info/deposits/new-deposit/${depositId}`);
  };

  return (
    <S.CardContainer className={className}>
      {depositProgramsList.length > 0 &&
        depositProgramsList.map((program, i) => (
          <S.Card key={`${program.id}-${i}`}>
            <S.CardTitle>{program.name}</S.CardTitle>
            <S.CardDesc dangerouslySetInnerHTML={{ __html: program.description }} />
            <Button primary onClick={() => handleNavigateToOpen(program.safeId)}>
              Открыть депозит
            </Button>
          </S.Card>
        ))}
    </S.CardContainer>
  );
};
