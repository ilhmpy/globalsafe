import moment from 'moment';
import React, { FC, useContext, useEffect, useState } from 'react';
import { Scrollbars } from 'react-custom-scrollbars';
import { useTranslation } from 'react-i18next';
import { CSSTransition } from 'react-transition-group';
import { Button } from '../../../../../components/Button/Button';
import { Select } from '../../../../../components/Select/Select2';
import { TestInputAnalitic } from '../../../../../components/UI/DayPicker';
import { Loading } from '../../../../../components/UI/Loading';
import { AppContext } from '../../../../../context/HubContext';
import { Card } from '../../../../../globalStyles';
import {
  CollectionAnalitics,
  RootAnalitics,
} from '../../../../../types/analitics';
import { OpenDate } from '../../../../../types/dates';
import { CollectionListDeposits } from '../../../../../types/deposits';
import { ModalAnalitic } from '../../../AdminPay/Payments';
import { Pagination } from '../../../Pagination';
import {
  FilterBlock,
  FilterHeader,
  FilterName,
  Label,
  SelectContainer,
  SelectContainerInnerPaid,
  SelectWrap,
  ShowHide,
} from '../../../Styled.elements';
import * as Styled from './Styled.elements';

type Props = {
  listDeposits: CollectionListDeposits[];
};

export const Analitics: FC<Props> = ({ listDeposits }) => {
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

  useEffect(() => {
    if (hubConnection) {
      setLoading(true);
      hubConnection
        .invoke<RootAnalitics>(
          'GetPayoutsEstimate',
          searchSafeID.length ? searchSafeID : null,
          openDate.from ? openDate.from : null,
          openDate.to ? openDate.to : null,
          (currentPage - 1) * pageLength,
          pageLength,
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
  }, [currentPage, hubConnection, pageLength]);

  const submit = () => {
    console.log(currentPage);
    console.log(pageLength);
    setList([]);
    setCurrentPage(1);
    if (hubConnection) {
      setLoading(true);
      hubConnection
        .invoke<RootAnalitics>(
          'GetPayoutsEstimate',
          searchSafeID.length ? searchSafeID : null,
          openDate.from ? openDate.from : null,
          openDate.to ? openDate.to : null,
          (currentPage - 1) * pageLength,
          pageLength,
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
              <SelectWrap style={{ minWidth: 263 }}>
                <Label>{t('adminPay.filter.deposit')}</Label>
                <Select
                  checkList={checkList}
                  setCheckList={setCheckList}
                  values={listDeposits}
                />
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
              {t('adminPay.table.name')}
            </Styled.TableHeadItemPaid>
            <Styled.TableHeadItemPaid>
              {t('adminPay.analitics.data')}
            </Styled.TableHeadItemPaid>
            <Styled.TableHeadItemPaid>
              {t('adminPay.analitics.amount')}
            </Styled.TableHeadItemPaid>
            <Styled.TableHeadItemPaid>
              {t('adminPay.analitics.sum')}
            </Styled.TableHeadItemPaid>
            <Styled.TableHeadItemPaid>
              {/* <Filter /> */}
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
                  <Styled.TableBodyItem>
                    {item.deposit.name}
                  </Styled.TableBodyItem>
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
