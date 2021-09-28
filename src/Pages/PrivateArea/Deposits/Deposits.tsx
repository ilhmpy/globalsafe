import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Scrollbars from 'react-custom-scrollbars';
import InfiniteScroll from 'react-infinite-scroller';

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
import { routers } from '../../../constantes/routers';
import * as S from './S.elements';
import { ConfirmOpenDeposit } from '../components/Modals/ConfirmOpenDeposit';
import { SuccessOpenDeposit } from '../components/Modals/Success';
import { ErrorOpenDeposit } from '../components/Modals/ErrorOpenDeposit';
import { CloseDeposit } from '../components/Modals/CloseDeposit';
import { CloseDepositSuccess } from '../components/Modals/CloseDepositSuccess';
import { CloseDepositError } from '../components/Modals/CloseDepositError';
import { AppContext } from '../../../context/HubContext';
import { Collection, RootList } from '../../../types/info';


export const Deposits = () => {
  const [openModal, setOpenModal] = useState(false);
  const [depositsList, setDepositsList] = useState<Collection[]>([]);
  const [getDepositsLoading, setGetDepositsLoading] = useState(false);
  const [depositsTotalCount, setDepositsTotalCount] = useState(0);
  const [depositsListHasMore, setDepositsListHasMore] = useState(true);
  const [skip, setSkip] = useState(0);
  const [activeFilter, setActiveFilter] = useState<'active' | 'archived' | 'hold'>('active');

  const history = useHistory();
  const appContext = useContext(AppContext);
  const hubConnection = appContext.hubConnection;
  const lang = localStorage.getItem('i18nextLng') || 'ru';
  const languale = lang === 'ru' ? 1 : 0;

  const [sorting] = useState([
    {
      ConditionWeight: 1,
      OrderType: 2,
      FieldName: 'creationDate',
    },
  ]);

  const getFilterCode = (key: 'active' | 'archived' | 'hold') => {
    if(key === 'active') {
      return [2];
    }
    if(key === 'archived') {
      return [4];
    }
    if(key === 'hold') {
      return [];
    }
  }

  const onClose = () => {
    setOpenModal(false);
  };

  useEffect(() => {
    if (hubConnection) {
      setGetDepositsLoading(true);
      setDepositsList([]);
      setDepositsTotalCount(0);
      setSkip(0);
      hubConnection
      .invoke<RootList>(
        'GetUserDeposits', 
        getFilterCode(activeFilter), 
        activeFilter === 'hold' ? false : null,
        0, 
        20, 
        sorting
      )
        .then((res) => {
            console.log("GetUserDeposits res", res);
            console.log("GetUserDeposits res.collection", res.collection);
            console.log("GetUserDeposits res.totalRecords", res.totalRecords);
            setDepositsList(state => [...state, ...res.collection]);
            setDepositsTotalCount(res.totalRecords);
           
            setSkip((state) => state + 20);

          if(res.totalRecords === res.collection.length) {
            setDepositsListHasMore(false);
          }
        })
        .catch((err: Error) => {
          console.log(err)
        })
        .finally(() => {
          setGetDepositsLoading(false);
        });
    }
  }, [hubConnection, activeFilter, languale]);


  //   Task<CollectionResult> GetUserDeposits(DepositState[] states, long skip, long take, QuerySorting[] sorting)
  // фильтрация по полю state в параметре states
  // public enum DepositState
  // {
  //     /// Null
  //     Null,

  //     /// Deposit created but not yet payed.
  //     Open,

  //     /// Deposit is payed and working.
  //     Active,

  //     /// Deposit is expired and not working any more.
  //     Expired,

  //     /// Deposit was returned.
  //     Closed,

  //     /// Deposit payments are required.
  //     PaymentRequires,

  //     /// Deposit payment confirmation required.
  //     PaymentConfirmation,
  // }
  const handleGetDepositsList = () => {
    setDepositsListHasMore(false)
    if (hubConnection && depositsList.length < depositsTotalCount) {
      setGetDepositsLoading(true);
      hubConnection
      .invoke<RootList>(
        'GetUserDeposits', 
        getFilterCode(activeFilter), 
        activeFilter === 'hold' ? false : null,
        skip, 
        20, 
        sorting
      )
        .then((res) => {
          if(res.collection.length) {
            setDepositsList(state => [...state, ...res.collection]);
            setDepositsTotalCount(res.totalRecords);
            console.log("GetUserDeposits res.collection", res.collection);
            setSkip((state) => state + 20);
          }

          setDepositsListHasMore(true);
        })
        .catch((err: Error) => {
          console.log(err)
        })
        .finally(() => {
          setGetDepositsLoading(false);
        });
    }
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
        <Filter activeFilter={activeFilter} setActiveFilter={setActiveFilter} /> 
      </Container>
      <Container>
        <Scrollbars style={{ height: '500px' }}>
            {!getDepositsLoading ? (
              <InfiniteScroll
                pageStart={0}
                loadMore={handleGetDepositsList}
                hasMore={depositsListHasMore}
                useWindow={false}
                loader={
                  <div className="loader" key={0}>
                    Loading ...
                  </div>
                }
              >
                <Table depositsList={depositsList} />
              </InfiniteScroll>
            ) : null}
          </Scrollbars>
        
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
