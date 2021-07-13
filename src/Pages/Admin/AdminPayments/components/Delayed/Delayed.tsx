import moment from 'moment';
import React, { FC, useContext, useEffect, useState } from 'react';
import { Scrollbars } from 'react-custom-scrollbars';
import { useTranslation } from 'react-i18next';
import { CSSTransition } from 'react-transition-group';
import styled from 'styled-components';
import burgerGroup from '../../../../../assets/img/burgerGroup.png';
import { Button } from '../../../../../components/Button/Button';
import { Select } from '../../../../../components/Select/Select2';
import { TestInput } from '../../../../../components/UI/DayPicker';
import { Loading } from '../../../../../components/UI/Loading';
import { AppContext } from '../../../../../context/HubContext';
import { Card } from '../../../../../globalStyles';
import { CollectionAnalitics } from '../../../../../types/analitics';
import { OpenDate } from '../../../../../types/dates';
import { CollectionListDeposits } from '../../../../../types/deposits';
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

type Props = {
  listDeposits: CollectionListDeposits[];
};

export const Delayed: FC<Props> = ({ listDeposits }) => {
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

  const [sortingWindowOpen, setSortingWindowOpen] = useState(false);
  const [sorting, setSorting] = useState<SortingType[]>([]);
  const [listForSorting, setListForSorting] = useState<SelectValues[]>([
    {
      text: 'Пользователь: От А до Я',
      active: false,
      OrderType: 1,
      FieldName: 'userName',
    },
    {
      text: 'Пользователь: От Я до А',
      active: false,
      OrderType: 2,
      FieldName: 'userName',
    },
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
      text: 'По убыванию суммы к выплате',
      active: false,
      OrderType: 2,
      FieldName: 'payAmount',
    },
    {
      text: 'По возрастанию суммы к выплате',
      active: false,
      OrderType: 1,
      FieldName: 'payAmount',
    },
  ]);
  console.log(sorting);

  useEffect(() => {
    if (hubConnection) {
      setLoading(true);
      hubConnection
        .invoke<RootPayments>(
          'GetUsersDeposits',
          [5, 6],
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          (currentPage - 1) * pageLength,
          pageLength,
          sorting,
        )
        .then((res) => {
          console.log('.then ~~~~~!!!!~~~~~~~~~~~~~ res', res);
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
    console.log(name);
    console.log(checkList);
    console.log(openDate);
    console.log(closeDate);

    if (hubConnection) {
      setLoading(true);
      hubConnection
        .invoke<RootPayments>(
          'GetUsersDeposits',
          [5, 6],
          searchSafeID.length ? searchSafeID : null,
          null,
          openDate.from ? openDate.from : null,
          openDate.to ? openDate.to : null,
          null,
          null,
          null,
          null,
          (currentPage - 1) * pageLength,
          pageLength,
          sorting,
        )
        .then((res) => {
          console.log('~~~~~~~~~~~~~', res);
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
      <FilterBlock>
        <FilterHeader>
          <FilterName>{t('adminDeposit.filter')}</FilterName>
          <ShowHide onClick={() => setOpenFilterOne(!openFilterOne)}>
            {openFilterOne ? t('hide') : t('show')}
          </ShowHide>
        </FilterHeader>
        <CSSTransition
          in={openFilterOne}
          timeout={200}
          classNames="filter"
          unmountOnExit>
          <SelectContainer>
            <SelectContainerInnerPaid>
              <SelectWrapTwo mWidth="154px">
                <Label>{t('adminPay.filter.user')}</Label>
                <Input
                  value={name}
                  onChange={(e) => setName(e.target.value.toLowerCase())}
                />
              </SelectWrapTwo>
              <SelectWrapTwo mWidth="184px">
                <Label>{t('adminPay.filter.deposit')}</Label>
                <Select
                  checkList={checkList}
                  setCheckList={setCheckList}
                  values={listDeposits}
                />
              </SelectWrapTwo>
              <SelectWrapTwo mWidth="210px">
                <TestInput
                  setOpenDate={setOpenDate}
                  openDate={openDate}
                  label={t('adminPay.filter.date')}
                />
              </SelectWrapTwo>
              <SelectWrapTwo mWidth="210px">
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
        <CSSTransition
          in={!!open}
          timeout={300}
          classNames="modal"
          unmountOnExit>
          <>{open && <ModalAnalitic onClose={onClose} data={open} />}</>
        </CSSTransition>
        <Styled.PaymentsTable>
          <Styled.TableHead>
            <Styled.TableHeadItemPaid>№</Styled.TableHeadItemPaid>
            <Styled.TableHeadItemPaid>
              {t('adminPay.table.user')}
            </Styled.TableHeadItemPaid>
            <Styled.TableHeadItemPaid>
              {t('adminPay.table.name')}
            </Styled.TableHeadItemPaid>
            <Styled.TableHeadItemPaid>
              {t('adminPay.delayed.depositAmount')}
            </Styled.TableHeadItemPaid>
            <Styled.TableHeadItemPaid>
              {t('adminPay.filter.date')}
            </Styled.TableHeadItemPaid>
            <Styled.TableHeadItemPaid>
              {t('adminPay.filter.closeDate')}
            </Styled.TableHeadItemPaid>
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
                      onClick={() => getActiveSort(index)}>
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
                <Styled.TableBody
                  key={item.safeId}
                  onClick={() => setOpen(item)}>
                  <Styled.TableBodyItem>
                    {idx + 1 + (currentPage - 1) * pageLength}
                  </Styled.TableBodyItem>
                  <Styled.TableBodyItem>{item.userName}</Styled.TableBodyItem>
                  <Styled.TableBodyItem>
                    {item.deposit.name}
                  </Styled.TableBodyItem>
                  <Styled.TableBodyItem>{item.amountView}</Styled.TableBodyItem>
                  <Styled.TableBodyItem>
                    {moment(item.creationDate).format('DD/MM/YYYY')}
                  </Styled.TableBodyItem>
                  <Styled.TableBodyItem>
                    {moment(item.endDate).format('DD/MM/YYYY')}
                  </Styled.TableBodyItem>
                  <Styled.TableBodyItem>
                    {item.payAmountView}
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
  right: 66px;
  top: 531px;
  @media (max-width: 1288px) {
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
