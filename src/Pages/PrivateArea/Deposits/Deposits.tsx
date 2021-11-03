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
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { A11y, Navigation, Pagination, Scrollbar, Thumbs, EffectFade } from 'swiper';
import { Tiles } from '../components/Tiles';
import styled from 'styled-components';
import {
  TilesContainer,
  BottomValue,
  BottomTitle,
  BottomSide,
  TopSide,
  DateRange,
  BoxAmount,
  BoxTitle,
  BlockBox,
} from '../components/Tiles/styled';
import { Balance } from '../../../types/balance';
import moment from 'moment';
import { BalanceKind } from '../../../enums/balanceKind';
import { SwiperContainer, SwiperUI } from './S.elements';

export const Deposits: FC = () => {
  const { screen } = window;
  const [openModal, setOpenModal] = useState(false);
  const [depositsList, setDepositsList] = useState<Collection[]>([]);
  const [getDepositsLoading, setGetDepositsLoading] = useState(true);
  const [depositsTotalCount, setDepositsTotalCount] = useState(0);
  const [depositsListHasMore, setDepositsListHasMore] = useState(true);
  const [skip, setSkip] = useState(0);
  const [activeFilter, setActiveFilter] = useState<'active' | 'archived' | 'hold'>('active');
  const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);
  const [viewType, setViewType] = useState<string>('list');
  const { hubConnection, balanceList, setDepositsFilter, setChosenDepositView } =
    useContext(AppContext);

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
        <Filter
          activeFilter={activeFilter}
          setActiveFilter={setActiveFilter}
          viewType={viewType}
          setViewType={setViewType}
        />
      </Container>

      {screen.width > 768 ? (
        <Container pTabletNone>
          {viewType === 'list' ? (
            <Scrollbars style={{ height: '236px', minHeight: '236px' }}>
              {getDepositsLoading ? (
                <Loading />
              ) : (
                depositsList.length && (
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
          ) : getDepositsLoading ? (
            <Loading />
          ) : (
            <Tiles depositsList={depositsList} />
          )}
        </Container>
      ) : (
        <>
          <SwiperContainer>
            <SwiperUI slidesPerView={'auto'} pagination={{ clickable: true, dynamicBullets: true }}>
              {depositsList &&
                depositsList.map((deposit, i) => {
                  return (
                    <SwiperSlide key={`${deposit.safeId}-${i}`}>
                      <BlockBox
                        onClick={() => {
                          setChosenDepositView(deposit);
                          history.push(routers.depositsView);
                        }}
                      >
                        <TopSide>
                          <BoxTitle>{deposit.deposit.name}</BoxTitle>
                          <BoxAmount>{`${deposit.amountView} ${
                            Balance[deposit.deposit.asset]
                          }`}</BoxAmount>
                          <DateRange>{`${moment(new Date(deposit.creationDate)).format(
                            'DD.MM.YYYY'
                          )} - ${moment(new Date(deposit.endDate)).format(
                            'DD.MM.YYYY'
                          )}`}</DateRange>
                        </TopSide>
                        <BottomSide>
                          <div>
                            <BottomTitle>Ближайшая выплата:</BottomTitle>
                            <BottomValue>
                              {moment(deposit.paymentDate).format('DD.MM.YYYY')}
                              {`(через ${moment
                                .duration(
                                  moment(
                                    moment(deposit.paymentDate).format('YYYY-MM-DD'),
                                    'YYYY-MM-DD'
                                  ).diff(moment().startOf('day'))
                                )
                                .asDays()} дней)`}
                            </BottomValue>
                          </div>
                          <div>
                            <BottomTitle>Сумма ближайшей выплаты:</BottomTitle>
                            <BottomValue>
                              {deposit.paymentAmountView} {BalanceKind[deposit.deposit.asset]}
                            </BottomValue>
                          </div>
                        </BottomSide>
                      </BlockBox>
                    </SwiperSlide>
                  );
                })}
            </SwiperUI>
          </SwiperContainer>
        </>
      )}
    </S.Container>
  );
};
