import moment from 'moment';
import React, { FC, useContext, useEffect, useState } from 'react';
import { Scrollbars } from 'react-custom-scrollbars';
import { useTranslation } from 'react-i18next';
import { CSSTransition } from 'react-transition-group';
import styled from 'styled-components';
import burgerGroup from '../../../../../assets/img/burgerGroup.png';
import { Button } from '../../../../../components/Button/Button';
import { Select } from '../../../../../components/Select/Select2';
import { TestInputAnalitic } from '../../../../../components/UI/DayPicker';
import { Loading } from '../../../../../components/UI/Loading';
import { AppContext } from '../../../../../context/HubContext';
import { Card } from '../../../../../globalStyles';
import { CollectionAnalitics, RootAnalitics } from '../../../../../types/analitics';
import { OpenDate } from '../../../../../types/dates';
import { CollectionListDeposits } from '../../../../../types/deposits';
import { SelectValues, SortingType } from '../../../../../types/sorting';
import { ModalAnalitic } from '../../../AdminPay/Payments';
import { Pagination } from '../../../Pagination';
import {
  BurgerButton,
  BurgerImg,
  FilterBlock,
  FilterHeader,
  FilterName,
  Label,
  SelectContainer,
  SelectContainerInnerPaid,
  SelectWrap,
  ShowHide,
  SortingItem,
  SortingWindow,
  WindowBody,
  WindowTitle,
} from '../../../Styled.elements';
import * as Styled from './Styled.elements';

type Props = {
  listDeposits: CollectionListDeposits[];
};

export const Analitics: FC<Props> = ({ listDeposits }: Props) => {
  const [loading, setLoading] = useState(true);
  const [openDate, setOpenDate] = useState<OpenDate>({
    from: undefined,
    to: undefined,
  });
  const [list, setList] = useState<CollectionAnalitics[]>([]);
  const [openFilterOne, setOpenFilterOne] = useState(false);
  const [checkList, setCheckList] = useState<any>([]);
  const [totalList, setTotalList] = useState(0);
  const [open, setOpen] = useState<CollectionAnalitics | null>(null);
  const [pageLength, setPageLength] = useState<number>(10);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const appContext = useContext(AppContext);
  const hubConnection = appContext.hubConnection;

  const [sortingWindowOpen, setSortingWindowOpen] = useState(false);
  const [sorting, setSorting] = useState<SortingType[]>([]);
  const [listForSorting, setListForSorting] = useState<SelectValues[]>([
    {
      text: 'Название: От А до Я',
      active: false,
      OrderType: 2,
      FieldName: 'depositId',
    },
    {
      text: 'Название: От Я до А',
      active: false,
      OrderType: 1,
      FieldName: 'depositId',
    },
    {
      text: 'По убыванию даты',
      active: false,
      OrderType: 2,
      FieldName: 'payoutDate',
    },
    {
      text: 'По возрастанию даты',
      active: false,
      OrderType: 1,
      FieldName: 'payoutDate',
    },
    {
      text: 'По убыванию суммы выплаты',
      active: false,
      OrderType: 2,
      FieldName: 'amount',
    },
    {
      text: 'По возрастанию суммы выплаты',
      active: false,
      OrderType: 1,
      FieldName: 'amount',
    },
  ]);

  useEffect(() => {
    console.log(
      openDate.from ? moment(openDate.from).set({ hour: 0, minute: 0, second: 0 }).toDate() : null,
      openDate.to
        ? moment(openDate.to).set({ hour: 23, minute: 59, second: 59 }).toDate()
        : moment(openDate.from).set({ hour: 23, minute: 59, second: 59 }).toDate() || null
    );

    console.log(openDate.from, openDate.to);

    if (hubConnection) {
      setLoading(true);
      hubConnection
        .invoke<RootAnalitics>(
          'GetPayoutsEstimate',
          searchSafeID.length ? searchSafeID : null,
          openDate.from
            ? moment(openDate.from).set({ hour: 0, minute: 0, second: 0 }).toDate()
            : null,
          openDate.to ? openDate.to : null,
          (currentPage - 1) * pageLength,
          pageLength,
          sorting
        )
        .then((res) => {
          setList(res.collection);
          setTotalList(res.totalRecords);
          setLoading(false);
        })
        .catch((e) => {
          setLoading(false);
          console.log(e);
        });
    }
  }, [currentPage, hubConnection, pageLength, sorting]);

  const submit = () => {
    setList([]);
    setCurrentPage(1);

    console.log(
      openDate.from ? moment(openDate.from).set({ hour: 0, minute: 0, second: 0 }).toDate() : null,
      openDate.to
        ? moment(openDate.to).set({ hour: 23, minute: 59, second: 59 }).toDate()
        : moment(openDate.from).set({ hour: 23, minute: 59, second: 59 }).toDate() || null
    );

    if (hubConnection) {
      setLoading(true);
      hubConnection
        .invoke<RootAnalitics>(
          'GetPayoutsEstimate',
          searchSafeID.length ? searchSafeID : null,
          // openDate.from ? openDate.from : null,
          // openDate.to ? openDate.to : null,

          openDate.from
            ? moment(openDate.from).set({ hour: 0, minute: 0, second: 0 }).toDate()
            : null,
          openDate.to
            ? moment(openDate.to).set({ hour: 23, minute: 59, second: 59 }).toDate()
            : moment(openDate.from).set({ hour: 23, minute: 59, second: 59 }).toDate() || null,
          (currentPage - 1) * pageLength,
          pageLength,
          sorting
        )
        .then((res) => {
          setList(res.collection);
          setTotalList(res.totalRecords);
          setLoading(false);
        })
        .catch((e) => {
          console.log(e);
          setLoading(false);
        });
    }
  };

  const { t } = useTranslation();

  const namesProgram = checkList.map((i: any) => i.safeId);
  const idProgram = listDeposits.filter((i) => namesProgram.includes(i.safeId));
  const searchSafeID = idProgram.map((i) => i.safeId);

  const onClose = () => {
    setOpen(null);
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

  console.log('~~~~~~~~~~~', openDate);

  return (
    <div>
      <FilterBlock>
        <FilterHeader>
          <FilterName>{t('adminDeposit.filter')}</FilterName>
          <ShowHide onClick={() => setOpenFilterOne(!openFilterOne)}>
            {openFilterOne ? t('hide') : t('show')}
          </ShowHide>
        </FilterHeader>
        <CSSTransition in={openFilterOne} timeout={200} classNames="filter" unmountOnExit>
          <SelectContainer>
            <SelectContainerInnerPaid>
              <SelectWrap style={{ minWidth: 263 }}>
                <Label>{t('adminPay.filter.deposit')}</Label>
                <Select checkList={checkList} setCheckList={setCheckList} values={listDeposits} />
              </SelectWrap>
              <SelectWrap input>
                <TestInputAnalitic
                  setOpenDate={setOpenDate}
                  openDate={openDate}
                  label={t('adminPay.filter.date')}
                />
              </SelectWrap>
            </SelectContainerInnerPaid>
            <Button danger onClick={submit}>
              {t('adminUsers.apply')}
            </Button>
          </SelectContainer>
        </CSSTransition>
      </FilterBlock>
      <Card>
        <CSSTransition in={!!open} timeout={300} classNames="modal" unmountOnExit>
          <>{open && <ModalAnalitic onClose={onClose} data={open} />}</>
        </CSSTransition>
        <Styled.PaymentsTable>
          <Styled.TableHead>
            <Styled.TableHeadItemPaid>№</Styled.TableHeadItemPaid>
            <Styled.TableHeadItemPaid>{t('adminPay.table.name')}</Styled.TableHeadItemPaid>
            <Styled.TableHeadItemPaid>{t('adminPay.analitics.data')}</Styled.TableHeadItemPaid>
            <Styled.TableHeadItemPaid>{t('adminPay.analitics.amount')}</Styled.TableHeadItemPaid>
            <Styled.TableHeadItemPaid>{t('adminPay.analitics.sum')}</Styled.TableHeadItemPaid>

            <Styled.TableHeadItemPaid>
              <BurgerButton>
                <BurgerImg
                  src={burgerGroup}
                  alt="burger"
                  onClick={() => setSortingWindowOpen((prev) => !prev)}
                />
              </BurgerButton>
              <Window open={sortingWindowOpen}>
                <WindowTitle>Сортировка</WindowTitle>
                <WindowBody>
                  {listForSorting.map((obj, index) => (
                    <Sort
                      active={listForSorting[index].active}
                      key={index}
                      onClick={() => getActiveSort(index)}
                    >
                      {obj.text}
                    </Sort>
                  ))}
                </WindowBody>
              </Window>
            </Styled.TableHeadItemPaid>
          </Styled.TableHead>
          {list.length ? (
            <Scrollbars style={{ height: '500px' }}>
              {list.map((item, idx) => (
                <Styled.TableBody key={item.safeId} onClick={() => setOpen(item)}>
                  <Styled.TableBodyItem>
                    {idx + 1 + (currentPage - 1) * pageLength}
                  </Styled.TableBodyItem>
                  <Styled.TableBodyItem>{item.deposit.name}</Styled.TableBodyItem>
                  <Styled.TableBodyItem>
                    {moment(item.payoutDate).format('DD/MM/YYYY')}
                  </Styled.TableBodyItem>
                  <Styled.TableBodyItem>{item.count}</Styled.TableBodyItem>
                  <Styled.TableBodyItem>
                    {(item.amount / 100000).toLocaleString('ru-RU', {
                      maximumFractionDigits: 2,
                    })}
                  </Styled.TableBodyItem>
                  <Styled.TableBodyItem></Styled.TableBodyItem>
                </Styled.TableBody>
              ))}
            </Scrollbars>
          ) : loading ? (
            <Loading />
          ) : (
            <Styled.NotFound>{t('notFound')}</Styled.NotFound>
          )}
        </Styled.PaymentsTable>
      </Card>

      <Pagination
        pageLength={pageLength}
        setPageLength={setPageLength}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalLottery={totalList}
      />
    </div>
  );
};

const Window = styled(SortingWindow)`
  right: 0px;
  top: 18px;
`;
const Sort = styled(SortingItem)`
  &:nth-child(3) {
    @media (max-width: 768px) {
      display: none;
    }
  }
  &:nth-child(4) {
    @media (max-width: 768px) {
      display: none;
    }
  }
`;
