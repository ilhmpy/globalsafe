import moment from 'moment';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { Scrollbars } from 'react-custom-scrollbars';
import { useTranslation } from 'react-i18next';
import { CSSTransition } from 'react-transition-group';
import styled from 'styled-components';
import burgerGroup from '../../assets/img/burgerGroup.png';
import { Button } from '../../components/Button/Button';
import { Select } from '../../components/Select/Select';
import { SliderComponent } from '../../components/Slider/Slider';
import { DateInput } from '../../components/UI/DatePicker';
import { TestInput } from '../../components/UI/DayPicker';
import { FakeInput } from '../../components/UI/FakeInput';
import { Loading } from '../../components/UI/Loading';
import { AppContext } from '../../context/HubContext';
import { Card } from '../../globalStyles';
import useOnClickOutside from '../../hooks/useOutsideHook';
import { OpenDate } from '../../types/dates';
import {
  CollectionGetDraw,
  CollectionLottery,
  RootGetDraw,
  RootLottery,
} from '../../types/lottery';
import { SelectValues, SortingType } from '../../types/sorting';
import { LotteryTable } from './AdminPay/Table';
import { Writing } from './AdminPay/Writing';
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

type LotteryTable = {
  [elemName: string]: CollectionLottery[];
};

export const AdminLottery = () => {
  const [openFilter, setOpenFilter] = useState(false);
  const [openFilterOne, setOpenFilterOne] = useState(false);
  const [name, setName] = useState('');
  const [checkList, setCheckList] = useState<any>([]);
  const [openDate, setOpenDate] = useState<OpenDate>({
    from: undefined,
    to: undefined,
  });

  const { t } = useTranslation();

  const [sortingWindowOpen, setSortingWindowOpen] = useState(false);
  const sortingWindowRef = useRef<HTMLDivElement | null>(null);

  useOnClickOutside(sortingWindowRef, () => setSortingWindowOpen(false))

  const sortings = [
    t('descendDate'),
    t('ascendDate'),
    t('typeWin'),
    t('typeWin2'),
    t('descendWinSum'),
    t('ascendWinSum'),
    t('winners'),
    t('winners2'),
  ];

  const [sorting, setSorting] = useState<SortingType[]>([]);
  const [listForSorting, setListForSorting] = useState<SelectValues[]>([
    {
      id: 0,
      // text: 'По убыванию даты',
      active: false,
      OrderType: 2,
      FieldName: 'viewPrizeDrawLogModel.drawDate',
    },
    {
      id: 1,
      // text: 'По возрастанию даты',
      active: false,
      OrderType: 1,
      FieldName: 'viewPrizeDrawLogModel.drawDate',
    },
    {
      id: 2,
      // text: 'Тип выигрыша: От А до Я',
      active: false,
      OrderType: 1,
      FieldName: 'viewPrizeDefinitionModel.kind',
    },
    {
      id: 3,
      // text: 'Тип выигрыша: От Я до А',
      active: false,
      OrderType: 2,
      FieldName: 'viewPrizeDefinitionModel.kind',
    },
    {
      id: 4,
      // text: 'По убыванию суммы выигрыша',
      active: false,
      OrderType: 2,
      FieldName: 'viewPrizeDefinitionModel.volume',
    },
    {
      id: 5,
      // text: 'По возрастанию суммы выигрыша',
      active: false,
      OrderType: 1,
      FieldName: 'viewPrizeDefinitionModel.volume',
    },
    {
      id: 6,
      // text: 'Победители: От А до Я',
      active: false,
      OrderType: 1,
      FieldName: 'userName',
    },
    {
      id: 7,
      // text: 'Победители: От Я до А',
      active: false,
      OrderType: 2,
      FieldName: 'userName',
    },
  ]);

  const [count, setCount] = useState(true);
  const [lotteryArrList, setLotteryArrList] = useState<CollectionLottery[]>([]);
  const [lotteryList, setLotteryList] = useState<LotteryTable | null>(null);
  const [loading, setLoading] = useState(true);
  const [totalLottery, setTotalLottery] = useState(0);
  const [num, setNum] = useState(20);
  const [sliderValue, setSliderValue] = useState(79);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [nextDate, setNextDate] = useState<Date | null>(null);
  const [drawList, setDrawList] = useState<CollectionGetDraw[]>([]);
  const [pageLength, setPageLength] = useState<number>(10);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const appContext = useContext(AppContext);
  const hubConnection = appContext.hubConnection;
  const lang = localStorage.getItem('i18nextLng') || 'ru';
  const languale = lang === 'ru' ? 1 : 0;
  const list = [t('win.one'), t('win.two'), t('win.three')];
  moment.locale(lang);
  const drawListEdited = (item: CollectionGetDraw) => {
    const key = drawList.findIndex((i) => i.safeId === item.safeId);
    setDrawList([...drawList.slice(0, key), item, ...drawList.slice(key + 1)]);
  };

  useEffect(() => {
    if (hubConnection) {
      hubConnection
        .invoke<RootGetDraw>('GetDraws', [1], 0, 20)
        .then((res) => {
          setDrawList(res.collection);
        })
        .catch((e) => console.log(e));
    }
  }, [hubConnection]);

  useEffect(() => {
    submit();
  }, [hubConnection, languale, pageLength, currentPage, sorting]);

  const submit = () => {
    setLoading(true);
    setLotteryList(null);
    setLotteryArrList([]);
    // Add Sorting condition if viewPrizeDrawLogModel.drawDate Filter field has value
    const modifiedSorting = [...sorting];
    if(openDate.to || openDate.from) {
      if(!modifiedSorting.some(sortItem => sortItem.FieldName === 'viewPrizeDrawLogModel.drawDate')) {
        modifiedSorting.push({
          ConditionWeight: 1,
          OrderType: 2,
          FieldName: 'viewPrizeDrawLogModel.drawDate',
        })
      }
    };
    if (hubConnection) {
      hubConnection
        .invoke<RootLottery>(
          'GetAllPrizes',
          name ? name : null,
          openDate.from
          ? moment(openDate.from)
              .utcOffset('+00:00')
              .set({ hour: 0, minute: 0, second: 0 })
              .toDate()
          : null,
          openDate.to
          ? moment(openDate.to)
              .utcOffset('+00:00')
              .set({ hour: 23, minute: 59, second: 59 })
              .toDate()
          : null,
          checkList.length ? checkList.map((i: any) => i.id) : null,
          (currentPage - 1) * pageLength,
          pageLength,
          modifiedSorting
        )
        .then((res) => {
          setTotalLottery(res.totalRecords);

          setNum(20);
          const getFormatedDate = (dateStr: Date) => {
            const date = moment(dateStr).format('DD MMMM YYYY');
            return date;
          };
          if (res.collection.length) {
            setLotteryArrList(res.collection);

            const result: LotteryTable = {};
            for (const key in res.collection) {
              if (res.collection.length) {
                const newArr = res.collection[key];
                const d = getFormatedDate(res.collection[key].drawLog.drawDate);
                if (result[d]) {
                  result[d].push(newArr);
                } else {
                  result[d] = [newArr];
                }
              }
            }
            setLotteryList(result);
          } else {
            setLotteryList(null);
          }
          setLoading(false);
        })
        .catch((e) => console.log(e))
        .finally(() => setLoading(false));
    }
  };

  const onAfterChange = (value: any) => {
    setSliderValue(value);
    if (startDate) {
      const time: any = moment(startDate).add(sliderValue, 'hours');
      setNextDate(time._d);
    }
  };

  const createNewLottery = () => {
    if (hubConnection && startDate !== null) {
      hubConnection
        .invoke('CreateDraw', moment.utc(startDate), sliderValue)
        .then((res) => {
          setDrawList([res, ...drawList]);
        })
        .catch((e) => console.log(e));
    }
  };

  const dateChange = (startDate: Date | null) => {
    if (startDate) {
      const time: any = moment(startDate).add(sliderValue, 'hours');
      setNextDate(time._d);
      setStartDate(startDate);
    }
  };

  const getActiveSort = (index: number) => {
    setSorting([
      {
        ConditionWeight: 1,
        OrderType: listForSorting[index].OrderType,
        FieldName: listForSorting[index].FieldName,
      },
    ]);

    setListForSorting((prev) => {
      return prev.map((one, i) => {
        if (one.active === true && index === i) {
          setSorting([]);
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
    <div>
      <div>
        <Styled.FilterBlock>
          <Styled.FilterHeader>
            <Styled.FilterName>{t('write')}</Styled.FilterName>
            <Styled.ShowHide onClick={() => setOpenFilter(!openFilter)}>
              {openFilter ? t('hide') : t('show')}
            </Styled.ShowHide>
          </Styled.FilterHeader>
          <CSSTransition in={openFilter} timeout={200} classNames="filter" unmountOnExit>
            <>
              <Styled.SelectContainerLottery>
                <Styled.InputLottery>
                  <DateInput
                    startDate={startDate}
                    setStartDate={dateChange}
                    label={t('writting.startDate')}
                  />
                </Styled.InputLottery>
                <Styled.InputLottery>
                  <FakeInput hours={sliderValue} label={t('writting.repeat')} />
                </Styled.InputLottery>
                <Styled.SliderWrap>
                  <SliderComponent value={sliderValue} onAfterChange={onAfterChange} />
                </Styled.SliderWrap>
                <Styled.InputLottery>
                  <DateInput
                    startDate={nextDate}
                    setStartDate={setNextDate}
                    label={t('writting.next')}
                  />
                </Styled.InputLottery>
                <Styled.InputLottery mrn>
                  <Button
                    as="button"
                    disabled={startDate === null}
                    danger
                    onClick={createNewLottery}
                  >
                    {t('create')}
                  </Button>
                </Styled.InputLottery>
              </Styled.SelectContainerLottery>
              <Styled.HrWritting />
              <Styled.WritingBlock>
                <Scrollbars style={{ height: '250px' }}>
                  {drawList.length
                    ? drawList.map((item) => (
                        <Writing drawListEdited={drawListEdited} data={item} key={item.safeId} />
                      ))
                    : ''}
                </Scrollbars>
              </Styled.WritingBlock>
            </>
          </CSSTransition>
        </Styled.FilterBlock>

        <Styled.FilterBlock>
          <Styled.FilterHeader>
            <Styled.FilterName>{t('adminDeposit.filter')}</Styled.FilterName>
            <Styled.ShowHide onClick={() => setOpenFilterOne(!openFilterOne)}>
              {openFilterOne ? t('hide') : t('show')}
            </Styled.ShowHide>
          </Styled.FilterHeader>
          <CSSTransition in={openFilterOne} timeout={200} classNames="filter" unmountOnExit>
            <Styled.SelectContainer>
              <Styled.SelectContainerInnerPaid>
                <Styled.SelectWrap style={{ minWidth: 240 }}>
                  <Styled.Label>{t('winner')}</Styled.Label>
                  <Styled.Input
                    value={name}
                    onChange={(e) => setName(e.target.value.toLowerCase())}
                  />
                </Styled.SelectWrap>
                <Styled.SelectWrap>
                  <TestInput
                    setOpenDate={setOpenDate}
                    openDate={openDate}
                    label={t('lotteryTable.date')}
                  />
                </Styled.SelectWrap>
                <Styled.SelectWrap style={{ minWidth: 240 }}>
                  <Styled.Label>{t('lotteryTable.typeWin')}</Styled.Label>
                  <Select checkList={checkList} setCheckList={setCheckList} values={list} />
                </Styled.SelectWrap>
              </Styled.SelectContainerInnerPaid>
              <Button danger onClick={submit}>
                {t('adminUsers.apply')}
              </Button>
            </Styled.SelectContainer>
          </CSSTransition>
        </Styled.FilterBlock>

        <Card smallBorder>
          <Styled.LotteryTable>
            <>
              <Styled.Table>
                <Styled.Thead>
                  <Styled.Tr>
                    <Styled.Th scope="col">{t('lotteryTable.date')}</Styled.Th>
                    <Styled.Th scope="col">{t('lotteryTable.typeWin')}</Styled.Th>
                    <Styled.Th scope="col">{t('lotteryTable.sumWin')}</Styled.Th>
                    <Styled.Th scope="col">{t('lotteryTable.winners')}</Styled.Th>
                    <Styled.Th scope="col">{t('lotteryTable.status')}</Styled.Th>

                    <Styled.Th scope="col">
                      <BurgerButton>
                        <BurgerImg
                          src={burgerGroup}
                          alt="burger"
                          onClick={() => setSortingWindowOpen((prev) => !prev)}
                        />
                      </BurgerButton>
                      <Window ref={sortingWindowRef} open={sortingWindowOpen}>
                        <WindowTitle>{t('sorting')}</WindowTitle>
                        <WindowBody>
                          {listForSorting.map((obj, index) => (
                            <SortingItem
                              active={listForSorting[index].active}
                              key={index}
                              onClick={() => getActiveSort(index)}
                            >
                              {sortings[obj.id]}
                            </SortingItem>
                          ))}
                        </WindowBody>
                      </Window>
                    </Styled.Th>
                  </Styled.Tr>
                </Styled.Thead>
              </Styled.Table>
              {lotteryList ? (
                <Scrollbars style={{ height: '500px' }}>
                  <Styled.Table>
                    {Object.keys(lotteryList).map((key, idx) => (
                      <div key={key}>
                        <div
                          style={{
                            width: '100%',
                            display: 'flex',
                            justifyContent: 'center',
                          }}
                        >
                          <Styled.DataListDate>{key}</Styled.DataListDate>
                        </div>
                        {lotteryList[key].map((item, idx) => (
                          <LotteryTable key={item.safeId} data={item} />
                        ))}
                      </div>
                    ))}
                  </Styled.Table>
                </Scrollbars>
              ) : loading ? (
                <Loading />
              ) : (
                <NotFound>{t('notFound')}</NotFound>
              )}
            </>
          </Styled.LotteryTable>
        </Card>

        <Pagination
          pageLength={pageLength}
          setPageLength={setPageLength}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          totalLottery={totalLottery}
        />
      </div>
    </div>
  );
};

const Window = styled(SortingWindow)`
  right: -15px;
  top: 59px;
  @media (max-width: 694px) {
    top: 73px;
  }
`;

const NotFound = styled.div`
  font-weight: normal;
  font-size: 12px;
  line-height: 21px;
  padding: 30px;
  letter-spacing: 0.1px;
  min-height: 250px;
`;
