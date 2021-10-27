import { useContext, useEffect, useState, FC } from 'react';
import Scrollbars from 'react-custom-scrollbars';
import InfiniteScroll from 'react-infinite-scroller';
import { useHistory } from 'react-router-dom';
import { Container } from '../../../components/UI/Container';
import { routers } from '../../../constantes/routers';
import { AppContext } from '../../../context/HubContext';
import { Collection, RootList } from '../../../types/info';
import { Filter } from '../components/Filter';
import { Heading } from '../components/Heading';
import { Loading } from '../components/Loading/Loading';
import { Table } from '../components/Table';
import * as S from './S.elements';

export const Deposits: FC = () => {
  const [openModal, setOpenModal] = useState(false);
  const [depositsList, setDepositsList] = useState<Collection[]>([]);
  const [getDepositsLoading, setGetDepositsLoading] = useState(true);
  const [depositsTotalCount, setDepositsTotalCount] = useState(0);
  const [depositsListHasMore, setDepositsListHasMore] = useState(true);
  const [skip, setSkip] = useState(0);
  const [activeFilter, setActiveFilter] = useState<'active' | 'archived' | 'hold'>('active');

  const { hubConnection, balanceList, setDepositsFilter } = useContext(AppContext);

  const history = useHistory();

  const lang = localStorage.getItem('i18nextLng') || 'ru';
  const languale = lang === 'ru' ? 1 : 0;

  const [sorting] = useState([
    {
      ConditionWeight: 1,
      OrderType: 2,
      FieldName: 'creationDate',
    },
  ]);

  useEffect(() => {
    setDepositsFilter(activeFilter);
  }, [activeFilter]);

  const getFilterCode = (key: 'active' | 'archived' | 'hold') => {
    if (key === 'active') {
      return [2];
    }
    if (key === 'archived') {
      return [4];
    }
    if (key === 'hold') {
      return [2];
    }
  };

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
          'GetUserDepositsInstant',
          getFilterCode(activeFilter),
          activeFilter === 'hold' ? false : null,
          0,
          20,
          sorting
        )
        .then((res) => {
          console.log(
            'GetUserDepositsInstant',
            getFilterCode(activeFilter),
            activeFilter === 'hold' ? false : null,
            0,
            20,
            sorting
          );
          console.log('.then ~ res', res);
          if (res.totalRecords === [...depositsList, ...res.collection].length) {
            setDepositsListHasMore(false);
          }
          setDepositsList((state) => [...state, ...res.collection]);
          setDepositsTotalCount(res.totalRecords);

          setSkip((state) => state + 20);
        })
        .catch((err: Error) => {
          console.log(err);
        })
        .finally(() => {
          setGetDepositsLoading(false);
        });
    }
  }, [hubConnection, activeFilter, languale]);

  //   Task<CollectionResult> GetUserDeposits(DepositState[] states, bool | null isInstant, long skip, long take, QuerySorting[] sorting)
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
    if (hubConnection && depositsList.length < depositsTotalCount) {
      hubConnection
        .invoke<RootList>(
          'GetUserDepositsInstant',
          getFilterCode(activeFilter),
          activeFilter === 'hold' ? false : null,
          skip,
          20,
          sorting
        )
        .then((res) => {
          if (res.collection.length) {
            setDepositsList((state) => [...state, ...res.collection]);
            setDepositsTotalCount(res.totalRecords);
            setSkip((state) => state + 20);
          }

          setDepositsListHasMore(true);
        })
        .catch((err: Error) => {
          console.log(err);
        });
    }
  };

  // if(getDepositsLoading) {
  //   return (
  //     <Loading />
  //   )
  // };

  if (!getDepositsLoading && depositsList.length === 0) {
    // history.replace(routers.depositsProgram);
    return (
      <S.Container>
        <Container>
          <S.NotDeposits>У вас пока нет депозитов. Откройте свой первый депозит !</S.NotDeposits>

          <S.StyledProgram />
        </Container>
      </S.Container>
    );
  }

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
        <Scrollbars style={{ height: '240px', minHeight: '240px' }}>
          {getDepositsLoading ? (
            <Loading />
          ) : (
            depositsList.length > 0 && (
              <InfiniteScroll
                pageStart={0}
                loadMore={handleGetDepositsList}
                hasMore={depositsListHasMore}
                useWindow={false}
              >
                <Table depositsList={depositsList} />
              </InfiniteScroll>
            )
          )}
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
