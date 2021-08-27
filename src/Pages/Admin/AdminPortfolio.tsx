import moment from 'moment';
import React, { FC, useContext, useEffect, useState } from 'react';
import { Scrollbars } from 'react-custom-scrollbars';
import { useTranslation } from 'react-i18next';
import { CSSTransition } from 'react-transition-group';
import styled, { css } from 'styled-components/macro';
import burgerGroup from '../../assets/img/burgerGroup.png';
import { ReactComponent as Exit } from '../../assets/svg/exit.svg';
import { Button } from '../../components/Button/Button';
import { Loading } from '../../components/UI/Loading';
import { Content, Tab } from '../../components/UI/Tabs';
import { UpTitle } from '../../components/UI/UpTitle';
import { AppContext } from '../../context/HubContext';
import { ThemeContext } from '../../context/ThemeContext';
import { Card } from '../../globalStyles';
import { CollectionPortfolio, Portfolio, RootPortfolio } from '../../types/portfolio';
import { ModalPortfolio } from './AdminPay/Payments';
import { Pagination } from './Pagination';
import * as Styled from './Styled.elements';
import {
  BurgerButton,
  BurgerImg,
  SortingItem,
  SortingWindow,
  WindowBody,
  WindowTitle,
} from './Styled.elements';
import { SelectValues, SortingType } from '../../types/sorting';

type Props = {
  data: CollectionPortfolio;
};

const TableList: FC<Props> = ({ data }: Props) => {
  const [open, setOpen] = useState(false);

  const onClose = () => {
    setOpen(false);
  };

  const modalOpen = (e: React.MouseEvent) => {
    e.stopPropagation();
    setOpen(true);
  };

  return (
    <div>
      <CSSTransition in={open} timeout={300} classNames="modal" unmountOnExit>
        <ModalPortfolio onClose={onClose} data={data} />
      </CSSTransition>
      <TableBody onClick={modalOpen}>
        <TableBodyItem>{moment(data.creationDate).format('DD/MM/YYYY')}</TableBodyItem>
        <TableBodyItem>{data.initialVolume}</TableBodyItem>
        <TableBodyItem>{(data.unitPrice / 100000).toFixed(2).toLocaleString()}</TableBodyItem>
        <TableBodyItem>{data.volume}</TableBodyItem>
        <TableBodyItem></TableBodyItem>
      </TableBody>
    </div>
  );
};

export const AdminPortfolio = () => {
  const [card, setCard] = useState(0);
  const [active, setActive] = useState(3);
  const [basket, setBasket] = useState<Portfolio>({
    GCWD: 0,
    DIAMOND: 0,
    MGCWD: 0,
  });
  const [basketGCWD, setBasketGCWD] = useState<CollectionPortfolio[]>([]);
  const [basketMGCWD, setBasketMGCWD] = useState<CollectionPortfolio[]>([]);
  const [basketDIAMOND, setBasketDIAMOND] = useState<CollectionPortfolio[]>([]);
  const [countGCWD, setCountGCWD] = useState(true);
  const [countDIAMOND, setCountDIAMOND] = useState(true);
  const [countMGCWD, setCountMGCWD] = useState(true);
  const [numGCWD, setNumGCWD] = useState(20);
  const [numMGCWD, setNumMGCWD] = useState(20);
  const [numDIAMOND, setNumDIAMOND] = useState(20);
  const [loading, setLoading] = useState(true);
  const [totalGCWD, setTotalGCWD] = useState(0);
  const [totalMGCWD, setTotalMGCWD] = useState(0);
  const [totalDIAMOND, setTotalDIAMOND] = useState(0);
  const appContext = useContext(AppContext);
  const themeContext = useContext(ThemeContext);
  const theme = themeContext.theme;
  const hubConnection = appContext.hubConnection;
  const logOut = appContext.logOut;
  const user = appContext.user;
  const { t } = useTranslation();
  const [pageLengthGCWD, setPageLengthGCWD] = useState<number>(10);
  const [currentPageGCWD, setCurrentPageGCWD] = useState<number>(1);
  const [pageLengthMGCWD, setPageLengthMGCWD] = useState<number>(10);
  const [currentPageMGCWD, setCurrentPageMGCWD] = useState<number>(1);
  const [pageLengthDIAMOND, setPageLengthDIAMOND] = useState<number>(10);
  const [currentPageDIAMOND, setCurrentPageDIAMOND] = useState<number>(1);

  const [sortingWindowOpenGCWD, setSortingWindowOpenGCWD] = useState(false);
  const [sortingWindowOpenMGCWD, setSortingWindowOpenMGCWD] = useState(false);
  const [sortingWindowOpenDIAMOND, setSortingWindowOpenDIAMOND] = useState(false);

  const [sortingGCWD, setSortingGCWD] = useState<SortingType[]>([]);

  const sortings = [t("descendDateBuy"), t("ascendDateBuy"), t("descendUnit"), t("ascendUnit")];

  const [listForSortingGCWD, setListForSortingGCWD] = useState<SelectValues[]>([
    {
      id: 0,
      active: false,
      OrderType: 2,
      FieldName: 'creationDate',
    },
    {
      id: 1,
      active: false,
      OrderType: 1,
      FieldName: 'creationDate',
    },
    { 
      id: 2,
      active: false,
      OrderType: 2,
      FieldName: 'unitPrice',
    },
    {
      id: 3,
      active: false,
      OrderType: 1,
      FieldName: 'unitPrice',
    },
  ]);

  const [sortingMGCWD, setSortingMGCWD] = useState<SortingType[]>([]);

  const [listForSortingMGCWD, setListForSortingMGCWD] = useState<SelectValues[]>([
    {
      id: 0,
      active: false,
      OrderType: 2,
      FieldName: 'creationDate',
    },
    {
      id: 1,
      active: false,
      OrderType: 1,
      FieldName: 'creationDate',
    },
    { 
      id: 2,
      active: false,
      OrderType: 2,
      FieldName: 'unitPrice',
    },
    {
      id: 3,
      active: false,
      OrderType: 1,
      FieldName: 'unitPrice',
    },
  ]);

  const [sortingDIAMOND, setSortingDIAMOND] = useState<SortingType[]>([]);

  const sortingsDiamond = [];

  const [listForSortingDIAMOND, setListForSortingDIAMOND] = useState<SelectValues[]>([
    {
      id: 0,
      // text: 'По убыванию даты покупки',
      active: false,
      OrderType: 2,
      FieldName: 'creationDate',
    },
    {
      id: 1,
      // text: 'По возрастанию даты покупки',
      active: false,
      OrderType: 1,
      FieldName: 'creationDate',
    },
    {
      id: 2,
     // text: 'По убыванию стоимости за единицу',
      active: false,
      OrderType: 2,
      FieldName: 'unitPrice',
    },
    {
      id: 3,
    //  text: 'По возрастанию стоимости за единицу',
      active: false,
      OrderType: 1,
      FieldName: 'unitPrice',
    },
  ]);

  const handleClick = (id: number) => {
    if (id !== active) {
      setActive(id);
    }
  };

  useEffect(() => {
    if (hubConnection) {
      hubConnection
        .invoke<Portfolio>('GetBasketsOverview')
        .then((res) => {
          setBasket(res);
        })
        .catch((err: Error) => console.log(err));
    }
  }, [hubConnection]);

  useEffect(() => {
    if (hubConnection) {
      hubConnection
        .invoke<RootPortfolio>(
          'GetBaskets',
          3,
          (currentPageGCWD - 1) * pageLengthGCWD,
          pageLengthGCWD,
          sortingGCWD
        )
        .then((res) => {
          setLoading(false);
          setBasketGCWD(res.collection);
          setTotalGCWD(res.totalRecords);
        })
        .catch((err: Error) => {
          setLoading(false);
          console.log(err);
        });
    }
  }, [hubConnection, pageLengthGCWD, currentPageGCWD, sortingGCWD]);

  useEffect(() => {
    if (hubConnection) {
      hubConnection
        .invoke<RootPortfolio>(
          'GetBaskets',
          2,
          (currentPageMGCWD - 1) * pageLengthMGCWD,
          pageLengthMGCWD,
          sortingMGCWD
        )
        .then((res) => {
          setLoading(false);
          setBasketMGCWD(res.collection);
          setTotalMGCWD(res.totalRecords);
        })
        .catch((err: Error) => {
          setLoading(false);
          console.log(err);
        });
    }
  }, [hubConnection, pageLengthMGCWD, currentPageMGCWD, sortingMGCWD]);

  useEffect(() => {
    if (hubConnection) {
      hubConnection
        .invoke<RootPortfolio>(
          'GetBaskets',
          4,
          (currentPageDIAMOND - 1) * pageLengthDIAMOND,
          pageLengthDIAMOND,
          sortingDIAMOND
        )
        .then((res) => {
          setLoading(false);
          setBasketDIAMOND(res.collection);
          setTotalDIAMOND(res.totalRecords);
        })
        .catch((err: Error) => {
          setLoading(false);
          console.log(err);
        });
    }
  }, [hubConnection, pageLengthDIAMOND, currentPageDIAMOND, sortingDIAMOND]);

  const getActiveSortGCWD = (index: number) => {
    setSortingGCWD([
      {
        ConditionWeight: 1,
        OrderType: listForSortingGCWD[index].OrderType,
        FieldName: listForSortingGCWD[index].FieldName,
      },
    ]);

    setListForSortingGCWD((prev) => {
      return prev.map((one, i) => {
        if (one.active === true && index === i) {
          setSortingGCWD([]);
          return {
            ...one,
            active: false,
          };
        } else if (index === i) {
          return {
            ...one,
            active: true,
          };
        } else {
          return {
            ...one,
            active: false,
          };
        }
      });
    });
  };

  const getActiveSortMGCWD = (index: number) => {
    setSortingMGCWD([
      {
        ConditionWeight: 1,
        OrderType: listForSortingGCWD[index].OrderType,
        FieldName: listForSortingGCWD[index].FieldName,
      },
    ]);

    setListForSortingMGCWD((prev) => {
      return prev.map((one, i) => {
        if (one.active === true && index === i) {
          setSortingMGCWD([]);
          return {
            ...one,
            active: false,
          };
        } else if (index === i) {
          return {
            ...one,
            active: true,
          };
        } else {
          return {
            ...one,
            active: false,
          };
        }
      });
    });
  };

  const getActiveSortDIAMOND = (index: number) => {
    setSortingDIAMOND([
      {
        ConditionWeight: 1,
        OrderType: listForSortingGCWD[index].OrderType,
        FieldName: listForSortingGCWD[index].FieldName,
      },
    ]);

    setListForSortingDIAMOND((prev) => {
      return prev.map((one, i) => {
        if (one.active === true && index === i) {
          setSortingDIAMOND([]);
          return {
            ...one,
            active: false,
          };
        } else if (index === i) {
          return {
            ...one,
            active: true,
          };
        } else {
          return {
            ...one,
            active: false,
          };
        }
      });
    });
  };

  return (
    <>
      <Styled.HeadBlock>
        <UpTitle small>{t('adminPortfolio.uptitle')}</UpTitle>
        <Styled.UserName>
          <span>{user}</span>
          <Exit onClick={logOut} />
        </Styled.UserName>
      </Styled.HeadBlock>
      <ChartContainer>
        <Styled.PayList>
          <Styled.PayItem>
            <Styled.PayItemHead mb>
              <UpTitle small>GCWD</UpTitle>
            </Styled.PayItemHead>
            <Styled.Radial
              bg={theme === 'light' ? 'rgba(255, 65, 110, 0.2)' : 'rgba(255, 65, 110, 1)'}
            >
              <span>{basket.GCWD}</span>
              <span></span>
            </Styled.Radial>
          </Styled.PayItem>
          <Styled.PayItem>
            <Styled.PayItemHead mb>
              <UpTitle small>MGCWD</UpTitle>
            </Styled.PayItemHead>

            <Styled.Radial
              bg={theme === 'light' ? 'rgba(188, 212, 118, 0.2)' : 'rgba(188, 212, 118, 1)'}
            >
              <span>{basket.MGCWD}</span>
              <span></span>
            </Styled.Radial>
          </Styled.PayItem>
          <Styled.PayItem>
            <Styled.PayItemHead mb>
              <UpTitle small>DIAMOND</UpTitle>
            </Styled.PayItemHead>
            <Styled.Radial
              bg={theme === 'light' ? 'rgba(109, 185, 255, 0.2)' : 'rgba(109, 185, 255, 1)'}
            >
              <span>{basket.DIAMOND}</span>
              <span></span>
            </Styled.Radial>
          </Styled.PayItem>
          <Styled.PayItem></Styled.PayItem>
        </Styled.PayList>
      </ChartContainer>
      <TabsCard>
        <Tabs>
          <Tab onClick={() => handleClick(3)} active={active === 3}>
            GCWD
          </Tab>
          <Tab onClick={() => handleClick(2)} active={active === 2}>
            MGCWD
          </Tab>
          <Tab onClick={() => handleClick(4)} active={active === 4}>
            DIAMOND
          </Tab>
        </Tabs>
      </TabsCard>
      <Content active={active === 3}>
        <CardTable>
          <PaymentsTable>
            <TableHead>
              <TableHeadItem>{t('adminPortfolio.table.date')}</TableHeadItem>
              <TableHeadItem>{t('adminPortfolio.table.count')}</TableHeadItem>
              <TableHeadItem>{t('adminPortfolio.table.cost')}, CWD</TableHeadItem>
              <TableHeadItem>{t('adminPortfolio.table.amount')}</TableHeadItem>
              {/* <TableHeadItem><Filter /></TableHeadItem> */}
              <TableHeadItem>
                <BurgerButton>
                  <BurgerImg
                    src={burgerGroup}
                    alt="burger"
                    onClick={() => setSortingWindowOpenGCWD((prev) => !prev)}
                  />
                  <Window open={sortingWindowOpenGCWD}>
                    <WindowTitle>{t("sorting")}</WindowTitle>
                    <WindowBody>
                      {listForSortingGCWD.map((obj, index) => (
                        <SortingItem
                          active={listForSortingGCWD[index].active}
                          key={index}
                          onClick={() => getActiveSortGCWD(index)}
                        >
                          {sortings[obj.id]}
                        </SortingItem>
                      ))}
                    </WindowBody>
                  </Window>
                </BurgerButton>
              </TableHeadItem>
            </TableHead>
            {basketGCWD.length ? (
              <Scrollbars style={{ height: '500px' }}>
                {basketGCWD.map((item, idx) => (
                  <TableList key={item.safeId} data={item} />
                ))}
              </Scrollbars>
            ) : loading ? (
              <Loading />
            ) : (
              <Styled.NotFound>{t('notFound')}</Styled.NotFound>
            )}
          </PaymentsTable>
        </CardTable>

        <Pagination
          pageLength={pageLengthGCWD}
          setPageLength={setPageLengthGCWD}
          currentPage={currentPageGCWD}
          setCurrentPage={setCurrentPageGCWD}
          totalLottery={totalGCWD}
        />
      </Content>
      <Content active={active === 2}>
        <CardTable>
          <PaymentsTable>
            <TableHead>
              <TableHeadItem>{t('adminPortfolio.table.date')}</TableHeadItem>
              <TableHeadItem>{t('adminPortfolio.table.count')}</TableHeadItem>
              <TableHeadItem>{t('adminPortfolio.table.cost')}, CWD</TableHeadItem>
              <TableHeadItem>{t('adminPortfolio.table.amount')}</TableHeadItem>
              {/* <TableHeadItem><Filter /></TableHeadItem> */}
              <TableHeadItem>
                <BurgerButton>
                  <BurgerImg
                    src={burgerGroup}
                    alt="burger"
                    onClick={() => setSortingWindowOpenMGCWD((prev) => !prev)}
                  />
                </BurgerButton>
                <Window open={sortingWindowOpenMGCWD}>
                  <WindowTitle>Сортировка</WindowTitle>
                  <WindowBody>
                    {listForSortingMGCWD.map((obj, index) => (
                      <SortingItem
                        active={listForSortingMGCWD[index].active}
                        key={index}
                        onClick={() => getActiveSortMGCWD(index)}
                      >
                        {sortings[obj.id]}
                      </SortingItem>
                    ))}
                  </WindowBody>
                </Window>
              </TableHeadItem>
            </TableHead>
            {basketMGCWD.length ? (
              <Scrollbars style={{ height: '500px' }}>
                {basketMGCWD.map((item, idx) => (
                  <TableList key={item.safeId} data={item} />
                ))}
              </Scrollbars>
            ) : (
              <Styled.NotFound>{t('notFound')}</Styled.NotFound>
            )}
          </PaymentsTable>
        </CardTable>

        <Pagination
          pageLength={pageLengthMGCWD}
          setPageLength={setPageLengthMGCWD}
          currentPage={currentPageMGCWD}
          setCurrentPage={setCurrentPageMGCWD}
          totalLottery={totalMGCWD}
        />
      </Content>
      <Content active={active === 4}>
        <CardTable>
          <PaymentsTable>
            <TableHead>
              <TableHeadItem>{t('adminPortfolio.table.date')}</TableHeadItem>
              <TableHeadItem>{t('adminPortfolio.table.count')}</TableHeadItem>
              <TableHeadItem>{t('adminPortfolio.table.cost')}, CWD</TableHeadItem>
              <TableHeadItem>{t('adminPortfolio.table.amount')}</TableHeadItem>
              {/* <TableHeadItem><Filter /></TableHeadItem> */}
              <TableHeadItem>
                <BurgerButton>
                  <BurgerImg
                    src={burgerGroup}
                    alt="burger"
                    onClick={() => setSortingWindowOpenDIAMOND((prev) => !prev)}
                  />
                </BurgerButton>
                <Window open={sortingWindowOpenDIAMOND}>
                  <WindowTitle>Сортировка</WindowTitle>
                  <WindowBody>
                    {listForSortingDIAMOND.map((obj, index) => (
                      <SortingItem
                        active={listForSortingDIAMOND[index].active}
                        key={index}
                        onClick={() => getActiveSortDIAMOND(index)}
                      >
                        {sortings[obj.id]} 
                      </SortingItem>
                    ))}
                  </WindowBody>
                </Window>
              </TableHeadItem>
            </TableHead>
            {basketDIAMOND.length ? (
              <Scrollbars style={{ height: '500px' }}>
                {basketDIAMOND.map((item, idx) => (
                  <TableList key={item.safeId} data={item} />
                ))}
              </Scrollbars>
            ) : (
              <Styled.NotFound>{t('notFound')}</Styled.NotFound>
            )}
          </PaymentsTable>
        </CardTable>

        <Pagination
          pageLength={pageLengthDIAMOND}
          setPageLength={setPageLengthDIAMOND}
          currentPage={currentPageDIAMOND}
          setCurrentPage={setCurrentPageDIAMOND}
          totalLottery={totalDIAMOND}
        />
      </Content>
    </>
  );
};

const Window = styled(SortingWindow)`
  left: calc(100% - 345px);
  top: 485px;
  @media (max-width: 992px) {
    top: 489px;
  }
  @media (max-width: 768px) {
    top: 692px;
    left: calc(100% - 330px);
  }
  @media (max-width: 576px) {
    top: 514px;
    left: calc(100% - 280px);
    width: 230px;
  }
`;

const CardTable = styled(Card)`
  height: 600px;
`;

const PaymentsTable = styled.div`
  padding: 30px;
`;

const TableHead = styled.ul`
  display: grid;
  grid-template-columns: repeat(5, 1fr);

  list-style: none;
  padding-bottom: 6px;
  border-bottom: 1px solid rgba(81, 81, 114, 0.2);

  @media (max-width: 992px) {
    justify-content: space-between;
  }
  @media (max-width: 576px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const TableHeadItem = styled.li`
  font-weight: normal;
  font-size: 12px;
  line-height: 14px;
  letter-spacing: 0.1px;
  color: ${(props) => props.theme.thHead};
  width: 100%;
  @media (max-width: 992px) {
    padding-right: 5px;
  }
  &:nth-child(1) {
    max-width: 150px;
    @media (max-width: 576px) {
      max-width: 80px;
    }
  }
  &:nth-child(2) {
    max-width: 200px;
    @media (max-width: 576px) {
      display: none;
    }
  }
  &:nth-child(3) {
    max-width: 200px;
    @media (max-width: 768px) {
      max-width: 80px;
    }
    @media (max-width: 576px) {
      max-width: 90px;
      text-align: center;
    }
  }
  &:nth-child(4) {
    max-width: 200px;
    @media (max-width: 576px) {
      display: none;
      max-width: 20px;
      margin-left: 0;
    }
  }
  &:nth-child(5) {
    max-width: 80px;
    justify-self: flex-end;
    @media (max-width: 992px) {
      max-width: 30px;
    }
    @media (max-width: 576px) {
      max-width: 30px;
    }
  }
`;

const TableBody = styled(TableHead)`
  padding: 10px 0;
  cursor: pointer;
  transition: 0.3s;
  &:hover {
    background: rgba(66, 139, 202, 0.109);
  }
`;

const TableBodyItemCss = css`
  font-weight: normal;
  font-size: 14px;
  line-height: 16px;
  color: ${(props) => props.theme.text2};
`;

const TableBodyItem = styled(TableHeadItem)`
  ${TableBodyItemCss}
`;

const FilterLeft = styled.div`
  max-width: 675px;
  width: 100%;
  margin-right: 20px;
  @media (max-width: 992px) {
    max-width: 100%;
    margin-right: 0px;
    ${Styled.InputsWrap} {
      margin: 0;
    }
  }
  ${Button} {
    width: 160px;
  }
  ${Styled.SelectContainer} {
    flex-wrap: wrap;
  }
`;

const FilterRight = styled(Card)`
  max-width: 432px;
  width: 100%;
  padding: 20px;
  @media (max-width: 992px) {
    max-width: 100%;
  }
`;

const ButtonWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 22px;
  ${Button} {
    width: 160px;
    margin: 0 10px 0px;
    @media (max-width: 576px) {
      margin: 0 20px 20px;
    }
  }
  @media (max-width: 576px) {
    flex-wrap: wrap;
  }
`;

const FilterWrap = styled.div`
  display: flex;
  @media (max-width: 992px) {
    flex-wrap: wrap;
  }
`;

const TabsCard = styled(Card)`
  margin-bottom: 30px;
`;

const ChartContainer = styled(Card)`
  margin-bottom: 20px;
  padding: 30px;
  .apexcharts-legend-series {
    text-align: left !important;
    width: auto !important;
  }
  @media (max-width: 768px) {
    padding: 15px 0;
  }
`;

const HalfHead = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  @media (max-width: 576px) {
    justify-content: flex-end;
  }
`;

const Tabs = styled.div`
  display: flex;
  padding: 12px 20px 0;
  @media (max-width: 768px) {
    ${Tab} {
      width: 80px;
      text-align: left;
      &:first-child {
        text-align: left;
      }
      &:last-child {
        text-align: right;
        &:before {
          left: 14px;
        }
      }
    }
  }
`;

const HalfTitle = styled.span`
  font-weight: 500;
  font-size: 20px;
  line-height: 23px;
  padding-right: 110px;
  @media (max-width: 576px) {
    display: none;
  }
`;

const HalfTabs = styled.div`
  display: flex;
  align-items: center;
`;

const HalfTab = styled.span<{ card?: boolean }>`
  font-weight: ${(props) => (props.card ? '600' : '400')};
  font-size: 20px;
  line-height: 14px;
  cursor: pointer;
  padding: 0 5px;
  text-decoration: uppercase;
`;

const MobHalfTab = styled(HalfTab)`
  border-bottom: ${(props) => (props.card ? '1px solid #FF416E' : '1px solid #FFF')};
  padding-bottom: 6px;
  padding-top: 20px;
  width: 50%;
  text-align: center;
`;

const HalfContent = styled.div<{ card: boolean }>`
  ${(props) => (props.card ? '' : 'display:none')};
  width: 100%;
  max-width: 440px;
  margin: 0 auto;
  @media (max-width: 576px) {
    max-width: 100%;
  }
  .chart-enter {
    opacity: 0;
  }
  .chart-enter-active {
    opacity: 1;
    transform: translateX(0);
    transition: opacity 300ms;
  }
  .chart-exit {
    opacity: 1;
  }
  .chart-exit-active {
    opacity: 0;
    transform: scale(0.9);
    transition: opacity 300ms, transform 300ms;
  }
`;
