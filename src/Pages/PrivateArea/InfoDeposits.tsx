import React, { useState, useContext, useEffect } from "react";
import { Card, Container } from "../../globalStyles";
import { AppContext } from "../../context/HubContext";
import { Tables } from "../../components/Table/Table";
import { Collection, RootList } from "../../types/info";
import { Scrollbars } from "react-custom-scrollbars";
import InfiniteScroll from "react-infinite-scroller";

export const InfoDeposits = () => {
  const [list, setList] = useState<Collection[]>([]);
  const appContext = useContext(AppContext);
  const [count, setCount] = useState(true);
  const [num, setNum] = useState(20);
  const [totalList, setTotalList] = useState(0);
  const hubConnection = appContext.hubConnection;
  const lang = localStorage.getItem("i18nextLng") || "ru";
  const languale = lang === "ru" ? 1 : 0;

  useEffect(() => {
    if (hubConnection) {
      hubConnection
        .invoke<RootList>("GetUserDeposits", [1, 2, 3, 4, 5, 6], 0, 20)
        .then((res) => {
          setList(res.collection);
          setTotalList(res.totalRecords);
        })
        .catch((err: Error) => {
          console.log(err);
        });
    }
  }, [hubConnection, languale]);

  const myLoad = () => {
    setCount(false);
    if (hubConnection && list.length < totalList) {
      hubConnection
        .invoke<RootList>("GetUserDeposits", [1, 2, 3, 4, 5, 6], num, 20)
        .then((res) => {
          if (res.collection.length) {
            setList([...list, ...res.collection]);
            setCount(true);
            setNum(num + 20);
          }
        })
        .catch((err: Error) => console.log(err));
    }
  };

  return (
    <>
      <Container>
        <Card>
          <Scrollbars style={{ height: "500px" }}>
            <InfiniteScroll
              pageStart={10}
              loadMore={myLoad}
              hasMore={count}
              useWindow={false}
              loader={
                <div className="loader" key={0}>
                  Loading ...
                </div>
              }
            >
              <Tables list={list} />
            </InfiniteScroll>
          </Scrollbars>
        </Card>
      </Container>
    </>
  );
};
