import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { SwiperSlide } from 'swiper/react';
import { Button } from '../../../../components/Button/V2/Button';
import { AppContext } from '../../../../context/HubContext';
import useWindowSize from '../../../../hooks/useWindowSize';
import { CollectionListDeposits, ListDeposits } from '../../../../types/deposits';
import { RootList } from '../../../../types/info';
import { SwiperContainer, SwiperUI } from '../../Deposits/S.elements';
import { Loading } from '../Loading/Loading';
import * as S from './S.el';

interface ProgramProps {
  className?: string;
}

export const Program = ({ className = '' }: ProgramProps) => {
  const history = useHistory();
  const { hubConnection } = useContext(AppContext);
  const lang = localStorage.getItem('i18nextLng') || 'ru';
  const languale = lang === 'ru' ? 1 : 0;
  const screen = useWindowSize();
  const [depositProgramsList, setDepositProgramsList] = useState<CollectionListDeposits[]>([]);
  const [depositProgramsLoading, setDepositProgramsLoading] = useState(false);

  const getPrograms = () => {
    if (hubConnection) {
      setDepositProgramsLoading(true);
      hubConnection
        .invoke<ListDeposits>('GetDeposits', languale, true, 0, 20)
        .then((res) => {
          console.log('.GetDeposits--->', res);
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

  if (!depositProgramsList.length) {
    return <Loading />;
  }

  return (
    <>
      {screen > 768 ? (
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
      ) : (
        <>
          <SwiperContainer>
            <SwiperUI slidesPerView={'auto'} pagination={{ clickable: true, dynamicBullets: true }}>
              {depositProgramsList &&
                depositProgramsList.map((program, i) => {
                  return (
                    <SwiperSlide key={`${program.id}-${i}`}>
                      <S.Card>
                        <S.CardTitle>{program.name}</S.CardTitle>
                        <S.CardDesc dangerouslySetInnerHTML={{ __html: program.description }} />
                        <Button primary onClick={() => handleNavigateToOpen(program.safeId)}>
                          Открыть депозит
                        </Button>
                      </S.Card>
                    </SwiperSlide>
                  );
                })}
            </SwiperUI>
          </SwiperContainer>
        </>
      )}
    </>
  );
};
