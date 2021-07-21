import { FC, useContext, useEffect, useState } from 'react';
import { Scrollbars } from 'react-custom-scrollbars';
import { useTranslation } from 'react-i18next';
import { CSSTransition } from 'react-transition-group';
import styled from 'styled-components';
import burgerGroup from '../../../../../assets/img/burgerGroup.png';
import { Button } from '../../../../../components/Button/Button';
import { Notification } from '../../../../../components/Notify/Notification';
import { Select } from '../../../../../components/Select/Select2';
import { TestInput } from '../../../../../components/UI/DayPicker';
import { Loading } from '../../../../../components/UI/Loading';
import { AppContext } from '../../../../../context/HubContext';
import { Card } from '../../../../../globalStyles';
import { CollectionAnalitics } from '../../../../../types/analitics';
import { OpenDate } from '../../../../../types/dates';
import { CollectionListDeposits } from '../../../../../types/deposits';
import { Notify } from '../../../../../types/notify';
import { RootPayments } from '../../../../../types/payments';
import { SelectValues, SortingType } from '../../../../../types/sorting';
import { ModalAnalitic } from '../../../AdminPay/Payments';
import { Pagination } from '../../../Pagination';
import {
  BurgerButton,
  BurgerImg,
  FilterBlock,
  FilterHeader,
  FilterName,
  Input,
  Label,
  SelectContainer,
  SelectContainerInnerPaid,
  SelectWrapTwo,
  ShowHide,
  SortingItem,
  SortingWindow,
  WindowBody,
  WindowTitle,
} from '../../../Styled.elements';
import * as Styled from './styled';
import { TableRow } from './TableRow';

type Props = {
  listDeposits: CollectionListDeposits[];
};

export const Delayed: FC<Props> = ({ listDeposits }: Props) => {
  const [loading, setLoading] = useState(true);
  const [openDate, setOpenDate] = useState<OpenDate>({
    from: undefined,
    to: undefined,
  });
  const [closeDate, setCloseDate] = useState<OpenDate>({
    from: undefined,
    to: undefined,
  });
  const [list, setList] = useState<any[]>([]);
  const [openFilterOne, setOpenFilterOne] = useState(false);
  const [checkList, setCheckList] = useState<any>([]);
  const [totalList, setTotalList] = useState(0);
  const [open, setOpen] = useState<CollectionAnalitics | null>(null);
  const [pageLength, setPageLength] = useState<number>(10);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const appContext = useContext(AppContext);
  const hubConnection = appContext.hubConnection;
  const [name, setName] = useState('');
  const [notifications, setNotifications] = useState<Notify[]>([]);

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
      text: 'По убыванию даты открытия депозита',
      active: false,
      OrderType: 2,
      FieldName: 'creationDate',
    },
    {
      text: 'По возрастанию даты открытия депозита',
      active: false,
      OrderType: 1,
      FieldName: 'creationDate',
    },
    {
      text: 'По убыванию даты закрытия депозита',
      active: false,
      OrderType: 2,
      FieldName: 'endDate',
    },
    {
      text: 'По возрастанию даты закрытия депозита',
      active: false,
      OrderType: 1,
      FieldName: 'endDate',
    },

    {
      text: 'По убыванию суммы к выплате',
      active: false,
      OrderType: 2,
      FieldName: 'pendingAmount',
    },
    {
      text: 'По возрастанию суммы к выплате',
      active: false,
      OrderType: 1,
      FieldName: 'pendingAmount',
    },
  ]);

  useEffect(() => {
    if (hubConnection) {
      setLoading(true);
      hubConnection
        .invoke<RootPayments>(
          'GetUsersDeposits',
          [1, 2, 3, 4, 5, 6],
          name ? name.toLowerCase() : null,
          searchSafeID.length ? searchSafeID : null,
          openDate.from ? openDate.from : null,
          openDate.to ? openDate.to : null,
          closeDate.from ? closeDate.from : null,
          closeDate.to ? closeDate.to : null,
          null,
          null,
          null,
          true,
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

    if (hubConnection) {
      setLoading(true);
      hubConnection
        .invoke<RootPayments>(
          'GetUsersDeposits',
          [1, 2, 3, 4, 5, 6],
          name ? name.toLowerCase() : null,
          searchSafeID.length ? searchSafeID : null,
          openDate.from ? openDate.from : null,
          openDate.to ? openDate.to : null,
          closeDate.from ? closeDate.from : null,
          closeDate.to ? closeDate.to : null,
          null,
          null,
          null,
          true,
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

  const clear = () => {
    setName('');
    setCheckList([]);
    setOpenDate({
      from: undefined,
      to: undefined,
    });
    setCloseDate({
      from: undefined,
      to: undefined,
    });
  };
  const { t } = useTranslation();

  const namesProgram = checkList.map((i: any) => i.safeId);
  const idProgram = listDeposits.filter((i) => namesProgram.includes(i.safeId));
  const searchSafeID = idProgram.map((i) => i.safeId);

  const onClose = () => {
    setOpen(null);
  };

  const onDelete = (id: number) => {
    setNotifications(notifications.filter((i) => i.id !== id));
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

  const confirmPay = (safeId: string, amount: number, setDone: (status: boolean) => void) => {
    console.log('amount', amount);
    console.log('safeId', safeId);
    if (hubConnection) {
      hubConnection
        .invoke('PayPostponedPayment', safeId, amount)
        .then((res) => {
          console.log('.then ~ res', res);
          setDone(true);
          setNotifications([
            {
              text: t('adminPay.delayed.success'),
              error: false,
              timeleft: 5,
              id: notifications.length,
            },
          ]);
        })
        .catch((err: Error) => {
          console.log(err);
          setDone(false);
          setNotifications([
            {
              text: t('adminPay.delayed.failed'),
              error: true,
              timeleft: 5,
              id: notifications.length,
            },
          ]);
        });
    }
  };

  console.log(list);

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
              <SelectWrapTwo mWidth="190px">
                <Label>{t('adminPay.filter.user')}</Label>
                <Input value={name} onChange={(e) => setName(e.target.value.toLowerCase())} />
              </SelectWrapTwo>
              <SelectWrapTwo mWidth="180px">
                <Label>{t('adminPay.filter.deposit')}</Label>
                <Select checkList={checkList} setCheckList={setCheckList} values={listDeposits} />
              </SelectWrapTwo>
              <SelectWrapTwo mWidth="200px">
                <TestInput
                  setOpenDate={setOpenDate}
                  openDate={openDate}
                  label={t('adminPay.filter.date')}
                />
              </SelectWrapTwo>
              <SelectWrapTwo mWidth="200px">
                <TestInput
                  setOpenDate={setCloseDate}
                  openDate={closeDate}
                  label={t('adminPay.filter.closeDate')}
                />
              </SelectWrapTwo>
            </SelectContainerInnerPaid>
            <Styled.Buttons>
              <Button danger onClick={submit}>
                {t('adminUsers.apply')}
              </Button>
              <Button dangerOutline onClick={clear}>
                {t('adminUsers.reset')}
              </Button>
            </Styled.Buttons>
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
            <Styled.TableHeadItemPaid>{t('adminPay.table.user')}</Styled.TableHeadItemPaid>
            <Styled.TableHeadItemPaid>{t('adminPay.table.name')}</Styled.TableHeadItemPaid>
            <Styled.TableHeadItemPaid>
              {t('adminPay.delayed.depositAmount')}
            </Styled.TableHeadItemPaid>
            <Styled.TableHeadItemPaid>{t('adminPay.filter.date')}</Styled.TableHeadItemPaid>
            <Styled.TableHeadItemPaid>{t('adminPay.filter.closeDate')}</Styled.TableHeadItemPaid>
            <Styled.TableHeadItemPaid>
              {t('adminPay.delayed.payableAmount')}
            </Styled.TableHeadItemPaid>

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
                <TableRow
                  key={item.safeId}
                  idx={idx + 1 + (currentPage - 1) * pageLength}
                  item={item}
                  confirmPay={confirmPay}
                />
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
      <Notification onDelete={onDelete} data={notifications} />
    </div>
  );
};

const Window = styled(SortingWindow)`
  right: 65px;
  top: 531px;
  @media (max-width: 1209px) {
    top: 545px;
  }
  @media (max-width: 992px) {
    top: 539px;
  }
  @media (max-width: 768px) {
    right: 50px;
    top: 724px;
  }
  @media (max-width: 576px) {
    top: 560px;
  }
  @media (max-width: 479px) {
    top: 600px;
  }
  @media (max-width: 420px) {
    top: 614px;
  }
`;
const Sort = styled(SortingItem)`
  &:nth-child(3) {
    @media (max-width: 992px) {
      display: none;
    }
  }
  &:nth-child(4) {
    @media (max-width: 992px) {
      display: none;
    }
  }
  &:nth-child(5) {
    @media (max-width: 992px) {
      display: none;
    }
  }
  &:nth-child(6) {
    @media (max-width: 992px) {
      display: none;
    }
  }
`;
