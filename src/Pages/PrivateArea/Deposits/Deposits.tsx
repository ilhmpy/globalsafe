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
import styled from 'styled-components';

export const Deposits: FC = () => {
  const [openModal, setOpenModal] = useState(false);
  const [depositsList, setDepositsList] = useState<Collection[]>([]);
  const [getDepositsLoading, setGetDepositsLoading] = useState(true);
  const [depositsTotalCount, setDepositsTotalCount] = useState(0);
  const [depositsListHasMore, setDepositsListHasMore] = useState(true);
  const [skip, setSkip] = useState(0);
  const [activeFilter, setActiveFilter] = useState<'active' | 'archived' | 'hold'>('active');
  const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);

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
      <Container pTabletNone>
        {/* <Scrollbars style={{ height: '240px', minHeight: '240px' }}>
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
        </Scrollbars> */}

        <Swiper
          spaceBetween={0}
          thumbs={{ swiper: thumbsSwiper }}
          className="mySwiper2"
          loop={true}
          pagination={{
            clickable: true,
          }}
          breakpoints={{
            '320': {
              allowTouchMove: true,
              navigation: true,
              grabCursor: true,
              loop: true,
            },
            '768': {
              allowTouchMove: false,
              navigation: false,
              grabCursor: false,
            },
          }}
        >
          <SwiperSlide className="thumb">
            <BlockBox>
              <TopSide>
                <BoxTitle>Vanila</BoxTitle>
                <BoxAmount>5 000 000 CWD</BoxAmount>
                <DateRange>16.09.2021 - 16.09.2022</DateRange>
              </TopSide>
              <BottomSide>
                <div>
                  <BottomTitle>Ближайшая выплата:</BottomTitle>
                  <BottomValue>15.10.2011 (сегодня)</BottomValue>
                </div>
                <div>
                  <BottomTitle>Сумма ближайшей выплаты:</BottomTitle>
                  <BottomValue>200 000 CWD</BottomValue>
                </div>
              </BottomSide>
            </BlockBox>
          </SwiperSlide>
          <SwiperSlide className="thumb">
            <BlockBox>
              <TopSide>
                <BoxTitle>Vanila</BoxTitle>
                <BoxAmount>5 000 000 CWD</BoxAmount>
                <DateRange>16.09.2021 - 16.09.2022</DateRange>
              </TopSide>
              <BottomSide>
                <div>
                  <BottomTitle>Ближайшая выплата:</BottomTitle>
                  <BottomValue>15.10.2011 (сегодня)</BottomValue>
                </div>
                <div>
                  <BottomTitle>Сумма ближайшей выплаты:</BottomTitle>
                  <BottomValue>200 000 CWD</BottomValue>
                </div>
              </BottomSide>
            </BlockBox>
          </SwiperSlide>
        </Swiper>
      </Container>
    </S.Container>
  );
};

const BottomValue = styled.p`
  font-weight: 500;
  font-size: 14px;
  line-height: 20px;
`;
const BottomTitle = styled.span`
  font-weight: 300;
  font-size: 12px;
  line-height: 14px;
`;

const BottomSide = styled.div`
  border-radius: 0px 0px 4px 4px;
  padding: 20px;

  display: flex;
  flex-direction: column;
  gap: 20px;

  & > div {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
`;
const TopSide = styled.div`
  background: #ebebf2;
  border-radius: 4px 4px 0px 0px;
  padding: 20px;

  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const DateRange = styled.p`
  font-weight: normal;
  font-size: 12px;
  line-height: 16px;
`;
const BoxAmount = styled.p`
  font-weight: 500;
  font-size: 14px;
  line-height: 20px;
`;
const BoxTitle = styled.p`
  font-weight: 500;
  font-size: 18px;
  line-height: 20px;
`;

const BlockBox = styled.div`
  max-width: 280px;
  width: 100%;
  /* padding: 20px; */
  background: #ffffff;
  border: 1px solid #ebebf2;
  box-sizing: border-box;
  border-radius: 4px;
  color: #000000;
`;
