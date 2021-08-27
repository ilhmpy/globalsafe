import moment from 'moment';
import React, { FC, useContext, useEffect, useState } from 'react';
import { Scrollbars } from 'react-custom-scrollbars';
import { useTranslation } from 'react-i18next';
import { CSSTransition } from 'react-transition-group';
import styled, { css } from 'styled-components/macro';
import SwiperCore, { A11y, Navigation, Pagination, Scrollbar } from 'swiper';
import 'swiper/components/navigation/navigation.scss';
import 'swiper/components/pagination/pagination.scss';
import 'swiper/components/scrollbar/scrollbar.scss';
import 'swiper/swiper.scss';
import burgerGroup from '../../assets/img/burgerGroup.png';
import { ReactComponent as Exit } from '../../assets/svg/exit.svg';
import { Button } from '../../components/Button/Button';
import { Select } from '../../components/Select/Select2';
import { TestInput } from '../../components/UI/DayPicker';
import { Loading } from '../../components/UI/Loading';
import { UpTitle } from '../../components/UI/UpTitle'; 
import { AppContext } from '../../context/HubContext';
import { Card } from '../../globalStyles';
import { OpenDate } from '../../types/dates';
// import { AdminDepositList } from "./AdminPay/DepositList";
import { CollectionListDeposits, ListDeposits } from '../../types/deposits';
import { PaymentsCollection, RootPayments } from '../../types/payments';
import { SelectValues, SortingType } from '../../types/sorting';
import { ModalDeposit } from './AdminPay/Payments';
import { Rounds } from './AdminPay/Rounds';
import { Pagination as CustomPagination } from './Pagination';
import * as Styled from './Styled.elements'; 
import {
  BurgerButton,
  BurgerImg,
  SortingItem,
  SortingWindow,
  WindowBody,
  WindowTitle,
} from './Styled.elements';

SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);
type PayProps = {
  data: PaymentsCollection;
};

const AdminDepositList: FC<PayProps> = ({ data }: PayProps) => {
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
        <ModalDeposit onClose={onClose} data={data} />
      </CSSTransition>
      <TableBody onClick={modalOpen}>
        <TableBodyItem>{data.userName}</TableBodyItem>
        <TableBodyItem>{data.deposit.name}</TableBodyItem>
        <TableBodyItem>{moment(data.creationDate).format('DD/MM/YYYY')}</TableBodyItem>
        <TableBodyItem>{moment(data.endDate).format('DD/MM/YYYY')}</TableBodyItem>
        <TableBodyItem>{data.amountView ? data.amountView : '-'}</TableBodyItem>
        <TableBodyItem>{moment(data.paymentDate).format('DD/MM/YYYY')}</TableBodyItem>
        <TableBodyItem>{data.payedAmountView}</TableBodyItem>
        <TableBodyItem></TableBodyItem>
      </TableBody>
    </div>
  );
};

export const AdminDeposit = () => {
  const [listDeposits, setListDeposits] = useState<CollectionListDeposits[]>([]);
  const [loading, setLoading] = useState(true);
  const [depositsList, setDepositsList] = useState<PaymentsCollection[]>([]);
  const [totalList, setTotalList] = useState(0);
  const [checkList, setCheckList] = useState<any>([]);
  const [name, setName] = useState('');
  const [openDate, setOpenDate] = useState<OpenDate>({
    from: undefined,
    to: undefined,
  });
  const [closeDate, setCloseDate] = useState<OpenDate>({
    from: undefined,
    to: undefined,
  });
  const [count, setCount] = useState(true);
  const [num, setNum] = useState(20);
  const [open, setOpen] = useState(false);
  const { t } = useTranslation();
  const backDays: any = moment().subtract(30, 'days');
  const namesProgram = checkList.map((i: any) => i.label);
  const idProgram = listDeposits.filter((i) => namesProgram.includes(i.name));
  const searchSafeID = idProgram.map((i) => i.safeId);

  const appContext = useContext(AppContext);
  const hubConnection = appContext.hubConnection;
  const logOut = appContext.logOut;
  const user = appContext.user;
  const [pageLength, setPageLength] = useState<number>(10);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [sortingWindowOpen, setSortingWindowOpen] = useState(false);

  const [sorting, setSorting] = useState<SortingType[]>([]);
  const [listForSorting, setListForSorting] = useState<SelectValues[]>([
    {
      id: 0,
      active: false,
      OrderType: 1,
      FieldName: 'userName',
    },
    {
      id: 1,
      active: false,
      OrderType: 2,
      FieldName: 'userName',
    },
    {
      id: 2,
      active: false,
      OrderType: 2,
      FieldName: 'depositId',
    },
    {
      id: 3,
      active: false,
      OrderType: 1,
      FieldName: 'depositId',
    },
    {
      id: 4,
      active: false,
      OrderType: 2,
      FieldName: 'amount',
    },
    {
      id: 5,
      active: false,
      OrderType: 1,
      FieldName: 'amount',
    },
    {
      id: 5,
      active: false,
      OrderType: 2,
      FieldName: 'paymentDate',
    },
    {
      id: 6,
      active: false,
      OrderType: 1,
      FieldName: 'paymentDate',
    },
  ]);

  const sortings = [t("userSort"), t("userSort2"), t("nameSort"), t("nameSort2"), t("descend"), t("ascend"), t("nextPayDescend"), t("nextPayAscend")];

  const myLoad = () => {
    setCount(false);
    setDepositsList([]);
    setLoading(true);

    let openFrom = null;
    let openTo = null;
    const closeFrom = null;
    const closeTo = null;
    if (openDate.from)
      openFrom = moment(openDate.from).set({ hour: 0, minute: 0, second: 0 }).toDate();
    if (openDate.to) {
      openTo = moment(openDate.to).set({ hour: 23, minute: 59, second: 59 }).toDate();
    } else if (!openDate.to && openDate.from) {
      openTo = moment(openDate.from).set({ hour: 23, minute: 59, second: 59 }).toDate();
    }

    if (hubConnection) {
      hubConnection
        .invoke<RootPayments>(
          'GetUsersDeposits',
          [1, 2, 3, 4, 5, 6],
          name ? name.toLowerCase() : null,
          searchSafeID.length ? searchSafeID : null,
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
            : openDate.from
            ? moment(openDate.from)
                .utcOffset('+00:00')
                .set({ hour: 23, minute: 59, second: 59 })
                .toDate()
            : null,

          null,
          null,

          closeDate.from
            ? moment(closeDate.from)
                .utcOffset('+00:00')
                .set({ hour: 0, minute: 0, second: 0 })
                .toDate()
            : null,
          closeDate.to
            ? moment(closeDate.to)
                .utcOffset('+00:00')
                .set({ hour: 23, minute: 59, second: 59 })
                .toDate()
            : closeDate.from
            ? moment(closeDate.from)
                .utcOffset('+00:00')
                .set({ hour: 23, minute: 59, second: 59 })
                .toDate()
            : null,
        
          null,
          null,
          (currentPage - 1) * pageLength,
          pageLength,
          sorting
        )
        .then((res) => {
          setTotalList(res.totalRecords);
          if (res.collection.length) {
            setDepositsList(res.collection);
            setCount(true);
            setNum(num + 20);
            setLoading(false);
          }
        })
        .catch((err: Error) => {
          console.log(err);
        });
    }
  };

  useEffect(() => {
    if (hubConnection) {
      hubConnection
        .invoke<ListDeposits>('GetAllPublicDeposits', null, false, 0, 40, [])
        .then((res) => {
          setListDeposits(res.collection);
        })
        .catch((err: Error) => {
          console.log(err);
        });
    }
  }, [hubConnection]);

  useEffect(() => {
    myLoad();
  }, [currentPage, hubConnection, pageLength, sorting]);

  // Request Params Model for 'GetUsersDeposits'
  // Task<CollectionResult> GetUsersDeposits(
  //   DepositState[] states,
  //   string? account,
  //   string[]? depositsSafeIds,
  //   DateTime? createdFrom,
  //   DateTime? createdTo,
  //   DateTime? closedFrom,
  //   DateTime? closedTo,
  //   DateTime? payedFrom,
  //   DateTime? payedTo,
  //   bool? hasPayments,
  //   bool? isPostponed,
  //   long skip,
  //   long take,
  //   QuerySorting[] sorting)

  // ## Attention ## payedFrom = closeDate.from | payedTo = closeDate.to

  const submit = () => {
    if (hubConnection) {
      setCurrentPage(1);
      setDepositsList([]);
      setLoading(true);

      hubConnection
        .invoke<RootPayments>(
          'GetUsersDeposits',
          [1, 2, 3, 4, 5, 6],
          name ? name.toLowerCase() : null,
          searchSafeID.length ? searchSafeID : null,

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
            : openDate.from
            ? moment(openDate.from)
                .utcOffset('+00:00')
                .set({ hour: 23, minute: 59, second: 59 })
                .toDate()
            : null,

          null, 
          null,

          closeDate.from
            ? moment(closeDate.from)
                .utcOffset('+00:00')
                .set({ hour: 0, minute: 0, second: 0 })
                .toDate()
            : null,
          closeDate.to
            ? moment(closeDate.to)
                .utcOffset('+00:00')
                .set({ hour: 23, minute: 59, second: 59 })
                .toDate()
            : closeDate.from
            ? moment(closeDate.from)
                .utcOffset('+00:00')
                .set({ hour: 23, minute: 59, second: 59 })
                .toDate()
            : null,

          null,
          null,
          (currentPage - 1) * pageLength,
          pageLength,
          sorting
        )
        .then((res) => {
          setTotalList(res.totalRecords);
          setLoading(false);
          setNum(20);
          setDepositsList(res.collection);
        })
        .catch((err: Error) => console.log(err));
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
    <>
      <Styled.HeadBlock>
        <UpTitle small>{t('adminDeposit.uptitle')}</UpTitle>
        <Styled.UserName>
          <span>{user}</span>
          <Exit onClick={logOut} />
        </Styled.UserName>
      </Styled.HeadBlock>
      <Styled.TitleHead>{t('adminDeposit.headTitle')}</Styled.TitleHead>
      <Rounds />

      <CustomFilterBlock>
        <Styled.FilterHeader>
          <FilterName>{t('adminDeposit.filter')}</FilterName>
          <Styled.ShowHide onClick={() => setOpen(!open)}>
            {open ? t('hide') : t('show')}
          </Styled.ShowHide>
        </Styled.FilterHeader>
        <CSSTransition in={open} timeout={200} classNames="filter" unmountOnExit>
          <Styled.SelectContainer>
            <Styled.SelectContainerInner>
              <Styled.SelectWrap>
                <Styled.Label>{t('adminDeposit.labelUser')}</Styled.Label>
                <Input value={name} onChange={(e) => setName(e.target.value.toLowerCase())} />
              </Styled.SelectWrap>
              <Styled.SelectWrap style={{ minWidth: 233 }}>
                <Styled.Label>{t('adminDeposit.labelProgram')}</Styled.Label>
                <Select checkList={checkList} setCheckList={setCheckList} values={listDeposits} />
              </Styled.SelectWrap>
              <Styled.SelectWrap input>
                <TestInput
                  setOpenDate={setOpenDate}
                  openDate={openDate}
                  label={t('adminDeposit.labelOpen')}
                />
              </Styled.SelectWrap>
              <Styled.SelectWrap input>
                <TestInput 
                  setOpenDate={setCloseDate}
                  openDate={closeDate}
                  label={t('adminDeposit.labelDate')}
                />
              </Styled.SelectWrap>
            </Styled.SelectContainerInner>
            <Button danger onClick={submit}>
              {t('adminDeposit.btnApply')}
            </Button>
          </Styled.SelectContainer>
        </CSSTransition>
      </CustomFilterBlock>

      <Card>
        <PaymentsTable>
          <TableHead>
            <TableHeadItem>{t('adminDeposit.table.user')}</TableHeadItem>
            <TableHeadItem>{t('adminDeposit.table.name')}</TableHeadItem>
            <TableHeadItem>{t('adminDeposit.table.openDate')}</TableHeadItem>
            <TableHeadItem>{t('adminDeposit.table.closeDate')}</TableHeadItem>
            <TableHeadItem>{t('adminDeposit.table.sum')}</TableHeadItem>
            <TableHeadItem>{t('adminDeposit.table.nextDate')}</TableHeadItem>
            <TableHeadItem>{t('adminDeposit.table.paid')}</TableHeadItem>
            {/* <FilterMenu filterClick={filterClick} /> */}
            <TableHeadItem>
              <BurgerButton>
                <BurgerImg
                  src={burgerGroup}
                  alt="burger"
                  onClick={() => setSortingWindowOpen((prev) => !prev)}
                />
              </BurgerButton>
              <Window open={sortingWindowOpen}>
                <WindowTitle>{t("sorting")}</WindowTitle>
                <WindowBody>
                  {listForSorting.map((obj, index) => (
                    <Sort
                      active={listForSorting[index].active}
                      key={index}
                      onClick={() => getActiveSort(index)}
                    >
                      {sortings[obj.id]}
                    </Sort>
                  ))}
                </WindowBody>
              </Window>
            </TableHeadItem>
          </TableHead>
          {depositsList.length ? (
            <Scrollbars style={{ height: '500px' }}>
              {depositsList.map((item) => (
                <AdminDepositList data={item} key={item.safeId} />
              ))}
            </Scrollbars>
          ) : loading ? (
            <Loading />
          ) : (
            <NotFound>{t('notFound')}</NotFound>
          )}
        </PaymentsTable>
      </Card>

      <CustomPagination
        pageLength={pageLength}
        setPageLength={setPageLength}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalLottery={totalList}
      />
    </>
  );
};

const Window = styled(SortingWindow)`
  right: 0px;
  top: 20px;
`;
const Sort = styled(SortingItem)`
  &:nth-child(1) {
    @media (max-width: 768px) {
      display: none;
    }
  }
  &:nth-child(2) {
    @media (max-width: 768px) {
      display: none;
    }
  }
  &:nth-child(7) {
    @media (max-width: 576px) {
      display: none;
    }
  }
  &:nth-child(8) {
    @media (max-width: 576px) {
      display: none;
    }
  }
`;

const CustomFilterBlock = styled(Styled.FilterBlock)`
  margin-bottom: 30px;
  @media (max-width: 576px) {
    margin-bottom: 20px;
  }
`;

const FilterName = styled.div`
  font-weight: 500;
  font-size: 18px;
  line-height: 21px;
  letter-spacing: 0.1px;
  margin-left: 10px;
  @media (max-width: 576px) {
    margin-left: 0px;
  }
`;

const InputsWrapItem = styled.div`
  margin-right: 10px;
  width: 100%;
  @media (max-width: 576px) {
    margin-right: 0px;
  }
`;

const Input = styled.input`
  width: 100%;
  border: 1px solid rgba(86, 101, 127, 0.3);
  box-sizing: border-box;
  border-radius: 2px;
  min-height: 40px;
  padding: 8px;
  font-weight: normal;
  background: transparent;
  font-size: 14px;
  line-height: 21px;
  letter-spacing: 0.1px;
  color: ${(props) => props.theme.text2};
  &:focus {
    outline: none;
  }
`;

const NotFound = styled.div`
  font-weight: normal;
  font-size: 12px;
  line-height: 21px;
  padding: 30px;
  letter-spacing: 0.1px;
  min-height: 250px;
  color: #0e0d3d;
`;

const DepositInner = styled.div`
  margin: 0 auto;
  min-width: 0;
  @media (max-width: 1470px) {
    max-width: 930px;
  }
  @media (max-width: 1270px) {
    max-width: 800px;
  }
  @media (max-width: 910px) {
    max-width: 700px;
  }
  @media (max-width: 800px) {
    max-width: 640px;
  }
  .swiper-pagination-fraction,
  .swiper-pagination-custom,
  .swiper-container-horizontal > .swiper-pagination-bullets {
    bottom: 0px;
    left: 0;
    width: 100%;
  }
`;

const SwiperInner = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin: 0 auto;
`;

const PaymentsTable = styled.div`
  padding: 30px;
  min-height: 556px;
`;

const TableHead = styled.ul`
  position: relative;
  list-style: none;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 6px;
  border-bottom: 1px solid rgba(81, 81, 114, 0.2);
`;

const TableHeadItem = styled.li`
  font-weight: normal;
  font-size: 12px;
  line-height: 14px;
  letter-spacing: 0.1px;
  color: ${(props) => props.theme.thHead};
  width: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  &:nth-child(1) {
    max-width: 97px;
    @media (max-width: 768px) {
      display: none;
    }
  }
  &:nth-child(2) {
    max-width: 182px;
  }
  &:nth-child(3) {
    max-width: 110px;
    @media (max-width: 992px) {
      display: none;
    }
  }
  &:nth-child(4) {
    max-width: 110px;
    @media (max-width: 768px) {
      display: none;
    }
  }
  &:nth-child(5) {
    max-width: 110px;
    @media (max-width: 576px) {
      text-align: center;
    }
  }
  &:nth-child(6) {
    max-width: 120px;
    @media (max-width: 576px) {
      display: none;
    }
  }
  &:nth-child(7) {
    max-width: 110px;
    @media (max-width: 576px) {
      display: none;
      text-align: center;
    }
  }
  &:nth-child(8) {
    max-width: 40px;
    text-align: right;
    @media (max-width: 992px) {
      max-width: 60px;
    }
    @media (max-width: 576px) {
      max-width: 30px;
    }
  }
`;

const TableBody = styled(TableHead)`
  padding: 10px 0;
  transition: 0.3s;
  cursor: pointer;
  &:hover {
    background: rgba(0, 0, 0, 0.05);
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

const DateLabel = styled.div`
  position: relative;
  border: 1px solid rgba(86, 101, 127, 0.3);
  box-sizing: border-box;
  border-radius: 2px;
`;

const DepositWrap = styled(Card)`
  padding: 30px 5px;
  display: flex;
  justify-content: center;
  width: 100%;
  flex-wrap: wrap;
  margin-bottom: 30px;
  @media (max-width: 576px) {
    padding: 20px 0px;
  }
`;

const HalfRound = styled.div`
  width: 122px;
  height: 122px;
  position: relative;
  @media (max-width: 768px) {
    width: 63px;
    height: 63px;
  }
  span {
    position: absolute;
    top: 33%;
    left: 9px;
    font-weight: normal;
    font-size: 26px;
    line-height: 42px;
    text-align: center;
    display: block;
    width: 63px;
    color: #000000;
    @media (max-width: 768px) {
      font-size: 10px;
      line-height: 16px;
      top: 36%;
      left: 3px;
      width: 39px;
      font-weight: bold;
    }
  }
`;

const RadialWrap = styled.div`
  display: flex;
  width: 100%;
  height: 122px;
  position: relative;
  @media (max-width: 768px) {
    height: auto;
  }
`;

const DepositItem = styled.div`
  width: 192px;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin: 0 12px 20px;
  min-height: 170px;
  @media (max-width: 768px) {
    width: 99px;
    min-height: 112px;
  }
  ${UpTitle} {
    margin-bottom: 0;
    margin-right: 10px;
    @media (max-width: 768px) {
      margin-right: 0px;
      &:before {
        margin-right: 4px;
      }
    }
  }
  ${Styled.Radial} {
    position: relative;
    width: 122px;
    height: 122px;
    flex: none;
    margin: 0;
    @media (max-width: 768px) {
      width: 63px;
      height: 63px;
      border-width: 3px;
    }
    span {
      font-size: 16px;
      line-height: 20px;
      text-align: right;
      color: #000000;
      @media (max-width: 768px) {
        font-size: 9px;
        line-height: 14px;
      }
    }

    &:nth-child(1) {
      left: 0;
      bottom: 0;
      display: none;
      z-index: 5;
      align-items: flex-start;
    }
    &:nth-child(2) {
      right: 0;
      bottom: 0;
      position: absolute;
      z-index: 50;
      /* background: #fff; */
    }
  }
`;

const DepositItemWrap = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  flex-wrap: wrap;
  justify-content: center;
`;

const DepositItemInner = styled.div`
  width: 50%;
`;

const MySwiperContainer = styled.div`
  display: block;
  width: 100%;
  margin: 0 auto;
  max-width: 1000px;
  @media (max-width: 768px) {
    max-width: 500px;
  }
  @media (max-width: 576px) {
    max-width: 280px;
  }
  ${DepositItem} {
    margin: 0 auto 20px;
  }
  .swiper-pagination-bullet {
    display: inline-block;
    width: 10px;
    height: 10px;
    font-size: 14px;
    line-height: 10px;
    background-color: rgba(81, 81, 114, 0.3);
    border-radius: 50%;
    margin-right: 10px;
    margin-top: 20px !important;
  }
  .swiper-pagination-bullet-active {
    background-color: #ff416e;
  }
  .swiper-container-horizontal > .swiper-pagination-bullets {
    bottom: -4px;
  }
`;
