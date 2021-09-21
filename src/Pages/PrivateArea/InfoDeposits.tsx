import React, { useState, useContext, useEffect } from 'react';
import { Card, Container } from '../../globalStyles';
import { AppContext } from '../../context/HubContext';
import { Tables } from '../../components/Table/Table';
import { Collection, RootList } from '../../types/info';
import { Scrollbars } from 'react-custom-scrollbars';
import InfiniteScroll from 'react-infinite-scroller';

export const InfoDeposits = () => {
  const [list, setList] = useState<Collection[]>([]);
  const appContext = useContext(AppContext);
  const [count, setCount] = useState(true);
  const [num, setNum] = useState(20);
  const [loading, setLoading] = useState(true);
  const [totalList, setTotalList] = useState(0);
  const hubConnection = appContext.hubConnection;
  const lang = localStorage.getItem('i18nextLng') || 'ru';
  const languale = lang === 'ru' ? 1 : 0;
  const [sorting, setSorting] = useState([
    {
      ConditionWeight: 1,
      OrderType: 2,
      FieldName: 'creationDate',
    },
  ]);

  useEffect(() => {
    if (hubConnection) {
      hubConnection
        .invoke<RootList>('GetUserDeposits', [1, 2, 3, 4, 5, 6, 7, 8], 0, 20, sorting)
        .then((res) => {
          console.log('GetUserDeposits', res);
          setList(res.collection);
          setTotalList(res.totalRecords);
        })
        .catch((err: Error) => {
          console.log(err);
        })
        .finally(() => setLoading(false));
    }
  }, [hubConnection, languale]);

  const myLoad = () => {
    setCount(false);
    if (hubConnection && list.length < totalList) {
      hubConnection
        .invoke<RootList>('GetUserDeposits', [1, 2, 3, 4, 5, 6, 7, 8], num, 20, sorting)
        .then((res) => {
          if (res.collection.length) {
            setList([...list, ...res.collection]);

            setNum(num + 20);
          }
          setCount(true);
        })
        .catch((err: Error) => console.log(err));
    }
  };

  const removeItem = (safeId: string) => {
    setList(list.filter((i) => i.safeId !== safeId));
  };

  return (
    <>
      <Container>
        <Card>
          <Scrollbars style={{ height: '500px' }}>
            {!loading ? (
              <InfiniteScroll
                pageStart={0}
                loadMore={myLoad}
                hasMore={count}
                useWindow={false}
                loader={
                  <div className="loader" key={0}>
                    Loading ...
                  </div>
                }
              >
                <Tables list={list} removeItem={removeItem} />
              </InfiniteScroll>
            ) : null}
          </Scrollbars>
        </Card>
      </Container>
    </>
  );
};
