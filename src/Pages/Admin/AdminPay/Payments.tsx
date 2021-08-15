import moment from 'moment';
import React, { FC, useEffect, useState, useMemo } from 'react';
import { Scrollbars } from 'react-custom-scrollbars';
import { useTranslation } from 'react-i18next';
import { CSSTransition } from 'react-transition-group';
import styled from 'styled-components/macro';
import { ReactComponent as Icon } from '../../../assets/svg/selectArrow.svg';
import { Button } from '../../../components/Button/Button';
import { Card } from '../../../globalStyles';
import { CollectionAnalitics } from '../../../types/analitics';
import { CollectionCharges, PaymentsCollection } from '../../../types/payments';
import { CollectionPortfolio } from '../../../types/portfolio';
import { CollectionUsers } from '../../../types/users';
import { InputWrap } from './InputWrap';

type ListProps = {
  data: PaymentsCollection;
  adjustPay?: (id: string, val: number) => void;
  confirmPay?: (id: string) => void;
  paymentsAdjust: () => void;
  disabled: boolean;
  procent: string;
  value: string;
  onHandleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClose: () => void;
  paymentsConfirm: (id: string) => void;
  unConfirmPay: (id: string) => void;
};

export const ModalPay: FC<ListProps> = ({
  data,
  paymentsAdjust,
  disabled,
  procent,
  value,
  onHandleChange,
  onChange,
  onClose,
  paymentsConfirm,
  unConfirmPay,
}: ListProps) => {
  const handleContainerClick = (e: React.MouseEvent) => {
    if (e.currentTarget === e.target) {
      onClose();
    }
  };
  const { t } = useTranslation();
  return (
    <Container>
      <Center onClick={handleContainerClick}>
        <PayCard>
          <PayCardBlock>
            <PayName>{data.deposit.name}</PayName>
          </PayCardBlock>
          <PayCardBlock>
            <PayText small>{t('adminPay.table.desc')}</PayText>
            <PayText>{data.deposit.description}</PayText>
          </PayCardBlock>
          <PayCardBlock>
            <PayText small>{t('adminPay.table.user')}</PayText>
            <PayText>{data.userName}</PayText>
          </PayCardBlock>
          {data.state !== 5 && (
            <PayCardBlock>
              <PayText small>{t('adminPay.table.procent')}</PayText>
              <InputWrap
                paymentsAdjust={paymentsAdjust}
                done={disabled}
                val={procent}
                placeholder={
                  value
                    ? ((+value / data.baseAmountView) * 100).toFixed(1)
                    : ((data.payAmount / data.baseAmount) * 100).toFixed(1)
                }
                onChange={onHandleChange}
              />
            </PayCardBlock>
          )}
          <PayCardBlock>
            <PayText small>{t('adminPay.table.datePay')}</PayText>
            <PayText>
              {data.paymentDate ? moment(data.paymentDate).format('DD/MM/YYYY') : '-'}
            </PayText>
          </PayCardBlock>
          <PayCardBlock>
            <PayText small>{t('adminPay.table.profit')}</PayText>
            <PayText>
              {(data.deposit.paymentRatio * 100).toLocaleString('ru-RU', {
                maximumFractionDigits: 2,
              })}
              %
            </PayText>
          </PayCardBlock>
          <PayCardBlock>
            <PayText small>{t('adminPay.table.contribution')}</PayText>
            <PayText>{data.baseAmountView.toLocaleString()}</PayText>
          </PayCardBlock>
          {data.state !== 5 && (
            <PayCardBlock>
              <PayText small>{t('adminPay.table.payments')}</PayText>
              <InputWrap
                paymentsAdjust={paymentsAdjust}
                done={disabled}
                val={value}
                placeholder={(data.payAmount / 100000).toFixed(2).toString()}
                onChange={onChange}
              />
              <Hr />
            </PayCardBlock>
          )}
          <PayCardBlock>
            {!disabled ? (
              <Button dangerOutline onClick={() => paymentsConfirm(data.safeId)}>
                {t('depositList.confirm')}
              </Button>
            ) : (
              <Button
                greenOutline
                onClick={() => {
                  unConfirmPay(data.safeId);
                }}
              >
                {t('depositList.confirmed')}
              </Button>
            )}
          </PayCardBlock>
        </PayCard>
      </Center>
    </Container>
  );
};

type PaidProps = {
  data: PaymentsCollection;
  onClose: () => void;
};

export const ModalPaid: FC<PaidProps> = ({ data, onClose }: PaidProps) => {
  const handleContainerClick = (e: React.MouseEvent) => {
    if (e.currentTarget === e.target) {
      onClose();
    }
  };
  const { t } = useTranslation();
  return (
    <Container>
      <Center onClick={handleContainerClick}>
        <PayCard>
          <PayCardBlock>
            <PayName>{data.deposit.name}</PayName>
          </PayCardBlock>
          <PayCardBlock>
            <PayText small>{t('adminPay.table.user')}</PayText>
            <PayText>{data.userName}</PayText>
          </PayCardBlock>
          <PayCardBlock>
            <PayText small>{t('adminPay.table.datePay')}</PayText>
            <PayText>{moment(data.paymentDate).format('DD/MM/YYYY')}</PayText>
          </PayCardBlock>
          <PayCardBlock>
            <PayText small>Категория</PayText>
            <PayText>
              {data.state === 4 ? t('depositList.depositClose') : t('depositList.dividents')}
            </PayText>
          </PayCardBlock>
          <PayCardBlock>
            <PayText small>{t('adminPay.table.contribution')}</PayText>
            <PayText>{data.baseAmountView.toLocaleString()}</PayText>
          </PayCardBlock>
          <PayCardBlock>
            <PayText small>{t('adminPay.table.payments')}</PayText>
            <PayText>{data.paymentAmountView}</PayText>
          </PayCardBlock>
          <PayCardBlock></PayCardBlock>
        </PayCard>
      </Center>
    </Container>
  );
};

type AnaliticProps = {
  data: CollectionAnalitics;
  onClose: () => void;
};

export const ModalAnalitic: FC<AnaliticProps> = ({ data, onClose }: AnaliticProps) => {
  const handleContainerClick = (e: React.MouseEvent) => {
    if (e.currentTarget === e.target) {
      onClose();
    }
  };
  const { t } = useTranslation();
  return (
    <Container>
      <Center onClick={handleContainerClick}>
        <PayCard>
          <PayCardBlock>
            <PayText small>{t('adminPay.table.name')}</PayText>
            <PayName>{data.deposit.name}</PayName>
          </PayCardBlock>
          <PayCardBlock>
            <PayText small>{t('adminPay.table.desc')}</PayText>
            <PayText>{data.deposit.description}</PayText>
          </PayCardBlock>
          <PayCardBlock>
            <PayText small>{t('adminPay.analitics.data')}</PayText>
            <PayText>{moment(data.payoutDate).format('DD/MM/YYYY')}</PayText>
          </PayCardBlock>
          <PayCardBlock>
            <PayText small>{t('adminPay.analitics.amount')}</PayText>
            <PayText>{data.count}</PayText>
          </PayCardBlock>
          <PayCardBlock>
            <PayText small>{t('adminPay.analitics.sum')}</PayText>
            <PayText>
              {(data.amount / 100000).toLocaleString('ru-RU', {
                maximumFractionDigits: 2,
              })}
            </PayText>
          </PayCardBlock>
          <PayCardBlock>
            <PayText small>{t('adminPay.table.profit')}</PayText>
            <PayText>
              {(data.deposit.paymentRatio * 100).toLocaleString('ru-RU', {
                maximumFractionDigits: 2,
              })}
              %
            </PayText>
          </PayCardBlock>
          <PayCardBlock></PayCardBlock>
        </PayCard>
      </Center>
    </Container>
  );
};

export const ModalDeposit: FC<PaidProps> = ({ data, onClose }: PaidProps) => {
  const handleContainerClick = (e: React.MouseEvent) => {
    if (e.currentTarget === e.target) {
      onClose();
    }
  };
  const { t } = useTranslation();
  return (
    <Container>
      <Center onClick={handleContainerClick}>
        <PayCard>
          <PayCardBlock>
            <PayName>{data.deposit.name}</PayName>
            <PayText>
              {moment(data.creationDate).format('DD/MM/YYYY') +
                '-' +
                moment(data.endDate).format('DD/MM/YYYY')}
            </PayText>
          </PayCardBlock>
          <PayCardBlock>
            <PayText small>{t('adminPay.table.user')}</PayText>
            <PayText>{data.userName}</PayText>
          </PayCardBlock>
          <PayCardBlock>
            <PayText small>{t('adminPay.table.nextDate')}</PayText>
            <PayText>{moment(data.paymentDate).format('DD/MM/YYYY')}</PayText>
          </PayCardBlock>
          <PayCardBlock>
            <PayText small>{t('adminPay.table.paid')}</PayText>
            <PayText>{data.payedAmountView}</PayText>
          </PayCardBlock>
          <PayCardBlock></PayCardBlock>
        </PayCard>
      </Center>
    </Container>
  );
};

type Prop = {
  data: CollectionCharges;
  onClose: () => void;
};

export const ModalPayList: FC<Prop> = ({ data, onClose }: Prop) => {
  const handleContainerClick = (e: React.MouseEvent) => {
    if (e.currentTarget === e.target) {
      onClose();
    }
  };
  const { t } = useTranslation();
  return (
    <Container>
      <Center onClick={handleContainerClick}>
        <PayCard>
          <PayCardBlock>
            <PayName>{data.userDeposit.deposit.name}</PayName>
          </PayCardBlock>
          <PayCardBlock>
            <PayText small>{t('adminPay.table.user')}</PayText>
            <PayText>{data.account}</PayText>
          </PayCardBlock>
          <PayCardBlock>
            <PayText small>{t('adminPay.table.datePay')}</PayText>
            <PayText>{moment(data.userDeposit.prevPayment).format('DD/MM/YYYY')}</PayText>
          </PayCardBlock>
          <PayCardBlock>
            <PayText small>{t('adminPay.table.category')}</PayText>
            <PayText>
              {data.userDeposit.state === 4
                ? t('depositList.depositClose')
                : t('depositList.dividents')}
            </PayText>
          </PayCardBlock>
          <PayCardBlock>
            <PayText small>{t('adminPay.table.contribution')}</PayText>
            <PayText>{data.userDeposit.baseAmountView.toLocaleString()}</PayText>
          </PayCardBlock>
          <PayCardBlock>
            <PayText small>{t('adminPay.table.payments')}</PayText>
            <PayText>{(data.amount / 100000).toFixed(2).toLocaleString()}</PayText>
          </PayCardBlock>
          <PayCardBlock></PayCardBlock>
        </PayCard>
      </Center>
    </Container>
  );
};

type ModalPortfolioProps = {
  data: CollectionPortfolio;
  onClose: () => void;
};

export const ModalPortfolio: FC<ModalPortfolioProps> = ({ data, onClose }: ModalPortfolioProps) => {
  const handleContainerClick = (e: React.MouseEvent) => {
    if (e.currentTarget === e.target) {
      onClose();
    }
  };
  const { t } = useTranslation();
  return (
    <Container>
      <Center onClick={handleContainerClick}>
        <PayCard>
          <PayCardBlock>
            <PayText small>{t('adminPortfolio.table.date')}</PayText>
            <PayText>{moment(data.creationDate).format('DD/MM/YYYY')}</PayText>
          </PayCardBlock>
          <PayCardBlock>
            <PayText small>{t('adminPortfolio.table.count')}</PayText>
            <PayText>{data.initialVolume}</PayText>
          </PayCardBlock>
          <PayCardBlock>
            <PayText small>{t('adminPortfolio.table.cost')}, CWD</PayText>
            <PayText>{(data.unitPrice / 100000).toFixed(2).toLocaleString()}</PayText>
          </PayCardBlock>
          <PayCardBlock>
            <PayText small>{t('adminPortfolio.table.amount')}</PayText>
            <PayText>{data.volume}</PayText>
          </PayCardBlock>
        </PayCard>
      </Center>
    </Container>
  );
};

type AccordeonListProps = {
  arr1: any;
  data: PaymentsCollection;
  adjustBalanceAsync: (userSafeId: string, delta: number, safeOperationId: string) => void;
  dataUpdate: (safeId: string, childId: string, value: string) => void;
};

const AccordeonList: FC<AccordeonListProps> = ({
  arr1,
  data,
  adjustBalanceAsync,
  dataUpdate,
}: AccordeonListProps) => {
  const [activeFold, setActiveFold] = useState(false);
  const { t } = useTranslation();

  return (
    <>
      {arr1[data.safeId] ? (
        <Accordeon>
          <PayCardInner>
            <AccordeonHead open={activeFold} onClick={() => setActiveFold(!activeFold)}>
              {t('adminUsers.modal.payments')} <Icon />
            </AccordeonHead>
          </PayCardInner>
          {arr1[data.safeId].map((j: CollectionCharges) => (
            <ModalUsersList
              activeFold={activeFold}
              adjustBalanceAsync={adjustBalanceAsync}
              key={j.safeId}
              safeId={data.safeId}
              dataOne={j}
              dataUpdate={dataUpdate}
            />
          ))}
        </Accordeon>
      ) : (
        ''
      )}
    </>
  );
};

type ModalUsersListProps = {
  dataOne: CollectionCharges;
  adjustBalanceAsync: (userSafeId: string, delta: number, safeOperationId: string) => void;
  activeFold: boolean;
  dataUpdate: (safeId: string, childId: string, value: string) => void;
  safeId: string;
};

const ModalUsersList: FC<ModalUsersListProps> = ({
  dataOne,
  adjustBalanceAsync,
  activeFold,
  dataUpdate,
  safeId,
}: ModalUsersListProps) => {
  const [value, setValue] = useState((dataOne.amount / 100000).toFixed(4).toString());
  const [done, setDone] = useState(false);
  const [procent, setProcent] = useState(
    ((dataOne.amount / 100000 / dataOne.userDeposit.baseAmountView) * 100).toFixed(1).toString()
  );

  const { t } = useTranslation();

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation();

    if (+e.target.value <= 0) {
      setValue('');
      setProcent('');
    } else {
      dataUpdate(safeId, dataOne.safeId, e.target.value);
      setValue(e.target.value);
      const proc = ((+e.target.value / dataOne.userDeposit.baseAmountView) * 100).toFixed(2);
      setProcent(proc.toString());
    }
  };

  const onHandleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (+e.target.value <= 0) {
      setValue('');
      setProcent('');
    } else {
      setProcent(e.target.value);
      const values = ((dataOne.userDeposit.baseAmountView * +e.target.value) / 100).toFixed(2);
      setValue(values.toString());
      dataUpdate(safeId, dataOne.safeId, values.toString());
    }
  };

  const paymentsAdjust = () => {
    const userSafeId = dataOne.userDeposit.userSafeId;
    const delta = ((dataOne.amount / 100000 - Number(value)) * 100000).toFixed(0);

    const safeOperationId = dataOne.safeId;
    // adjustBalanceAsync(userSafeId, +delta, safeOperationId);
    if (Number(value) * 100000 < dataOne.amount) {
      adjustBalanceAsync(userSafeId, -delta, safeOperationId);
    } else {
      const delta = ((Number(value) - dataOne.amount / 100000) * 100000).toFixed(0);
      adjustBalanceAsync(userSafeId, +delta, safeOperationId);
    }
  };

  const operation = (id: number) => {
    if (id === 6) {
      return t('operation.open');
    } else if (id === 7) {
      return t('operation.divedents');
    } else if (id === 8) {
      return t('operation.close');
    } else if (id === 2) {
      return t('operation.withdraw');
    } else if (id === 1) {
      return t('operation.add');
    }
  };

  const disabled = false;

  return (
    <>
      <AccordeonContent open={activeFold}>
        <PayCardInner>
          <PayCardBlock>
            <PayText small>{t('adminUsers.modal.paySum')}</PayText>
            <PayText>{dataOne.userDeposit.payedAmountView}</PayText>
          </PayCardBlock>
          <PayCardBlock>
            <PayText small>{t('operation.type')}</PayText>
            <PayText>{operation(dataOne.operationKind)}</PayText>
          </PayCardBlock>
          <PayCardBlock>
            <PayText small>{t('adminUsers.modal.payAmount')}</PayText>
            <InputWrap
              paymentsAdjust={paymentsAdjust}
              done={disabled}
              val={value}
              placeholder={(dataOne.amount / 100000).toFixed(4).toString()}
              onChange={onChange}
            />
          </PayCardBlock>
          <PayCardBlock>
            <PayText small>{t('adminUsers.modal.revenue')} %</PayText>
            <InputWrap
              paymentsAdjust={paymentsAdjust}
              done={disabled}
              val={procent}
              placeholder={(
                (dataOne.amount / 100000 / dataOne.userDeposit.baseAmountView) *
                100
              ).toFixed(2)}
              onChange={onHandleChange}
            />
          </PayCardBlock>
        </PayCardInner>
      </AccordeonContent>
    </>
  );
};

type ModalUsersContentProps = {
  data: CollectionUsers;
  dataOne: CollectionCharges[];
  adjustBalanceAsync: (userSafeId: string, delta: number, safeOperationId: string) => void;
  lock: boolean;
  unLocked: (e: any, id: string) => void;
  locked: (e: any, id: string) => void;
  active: number;
  setActive: (active: number) => void;
  dataTwo: PaymentsCollection[];
  wide?: boolean;
};

export const ModalUsersContent: FC<ModalUsersContentProps> = ({
  data,
  dataOne,
  adjustBalanceAsync,
  lock,
  unLocked,
  locked,
  active,
  setActive,
  dataTwo,
  wide = false,
}: ModalUsersContentProps) => {
  const [height, setHeight] = useState(0);
  const [selfData, setSelfData] = useState<any>({});

  useEffect(() => {
    function handleResize() {
      setHeight(window.innerHeight);
    }
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const arr1: any = {};
  dataTwo.map((item) => {
    dataOne.map((j) => {
      if (item.safeId === j.userDeposit.safeId) {
        if (arr1[j.userDeposit.safeId]) {
          arr1[j.userDeposit.safeId].push(j);
        } else {
          arr1[j.userDeposit.safeId] = [j];
        }
      }
    });
  });

  useEffect(() => {
    setSelfData(arr1);
  }, []);

  const { t } = useTranslation();

  const chip = (id: number) => {
    switch (id) {
      case 1:
        return <Chip need>{t('chip.pay')}</Chip>;
      case 2:
        return <Chip>{t('chip.open')}</Chip>;
      case 3:
        return <Chip need>{t('chip.noWork')}</Chip>;
      case 4:
        return <Chip need>{t('chip.return')}</Chip>;
      case 5:
        return <Chip need>{t('chip.pay')}</Chip>;
      case 6:
        return <Chip need>{t('chip.confirm')}</Chip>;
    }
  };

  const balance = data.balances ? data.balances.filter((item) => item.balanceKind === 1) : null;

  const dateTwoSelf = Object.assign({}, arr1);

  const dataUpdate = (id: string, childId: string, value: string) => {
    const parent: CollectionCharges[] = arr1[id];
    const idx = parent.findIndex((item) => item.safeId === childId);
    if (idx !== -1) {
      const item = { ...arr1[id][idx], amount: +value };
      const newArr = [...arr1[id].slice(0, idx), item, ...arr1[id].slice(idx + 1)];
      dateTwoSelf[id] = newArr;
    }
    // arr1[id]
  };

  // Get Ammout of User All deposits
  const depositsTotalAmmount = useMemo<string>(() => {
    let temp = 0;
    dataTwo.forEach(collection => {
      temp += collection.payedAmountView;
    });

    return temp.toLocaleString("ru-RU", {
      maximumFractionDigits: 4,
    });
  }, [dataTwo]);

  return (
    <>
      <PayCard smallPad wide={wide} mNone>
        <PayCardInner>
          <PayTabs>
            <PayTab active={active === 0} onClick={() => setActive(0)}>
              {t('usersTabs.mainInfo')}
            </PayTab>
            <PayTab active={active === 1} onClick={() => setActive(1)}>
              {t('usersTabs.deposits')}
            </PayTab>
          </PayTabs>
        </PayCardInner>
        <CSSTransition in={active === 0} timeout={0} classNames="modal" unmountOnExit>
          <PayCardInner>
            <PayCardBlock>
              <PayText small>{t('adminPay.table.user')}</PayText>
              <PayText>{data.name}</PayText>
            </PayCardBlock>
            <PayCardBlock>
              <PayText small>{t('adminUsers.table.balans')}</PayText>
              <PayText>
                {balance?.length
                  ? (balance[0].volume / 100000).toLocaleString('ru-RU', {
                      maximumFractionDigits: 2,
                    })
                  : '-'}
              </PayText>
            </PayCardBlock>
            <PayCardBlock>
              <PayText small>{t('adminUsers.table.role')}</PayText>
              <PayText>{data.roles.length ? data.roles[0].name : '-'}</PayText>
            </PayCardBlock>
            <PayCardBlock>
              <PayText small>{t('adminUsers.table.dataCreate')}</PayText>
              <PayText>{moment(data.creationDate).format('DD/MM/YYYY')}</PayText>
            </PayCardBlock>
            <PayCardBlock>
              <PayText small>{t('adminUsers.table.lang')}</PayText>
              <PayText>{t('adminUsers.table.rus')}</PayText>
            </PayCardBlock>
            {dataOne.length ? (
              <>
                <PayCardBlock>
                  <PayText small>{t('adminUsers.modal.paySum')}</PayText>
                  <PayText>
                    {depositsTotalAmmount}
                    {/* {dataTwo[0].payedAmountView.toLocaleString("ru-RU", {
                      maximumFractionDigits: 3,
                    })} */}
                    {/* {(
                      dataOne.reduce((a, b) => a + b.userDeposit.payedAmount, 0) / 100000
                    ).toLocaleString('ru-RU', {
                      maximumFractionDigits: 3,
                    })} */}
                  </PayText>
                </PayCardBlock>
                {dataOne.length && dataOne[0].userDeposit ? (
                  <PayCardBlock>
                    <PayText small>{t('adminUsers.modal.prevDate')}</PayText>
                    <PayText>
                      {moment(
                        dataOne.reduce((a, b) =>
                          b.userDeposit.prevPayment > a.userDeposit.prevPayment ? b : a
                        ).userDeposit.prevPayment
                      ).format('DD/MM/YYYY')}
                    </PayText>
                  </PayCardBlock>
                ) : (
                  ''
                )}
                <PayCardBlock>
                  <PayText small>{t('adminUsers.modal.nextDate')}</PayText>
                  <PayText>
                    {moment(
                      dataOne.reduce((a, b) =>
                        b.userDeposit.paymentDate > a.userDeposit.paymentDate ? b : a
                      ).userDeposit.paymentDate
                    ).format('DD/MM/YYYY')}
                  </PayText>
                </PayCardBlock>
              </>
            ) : (
              ''
            )}

            <PayCardBlock>
              {lock ? (
                <Button greenOutline onClick={(e) => unLocked(e, data.safeId)}>
                  {t('adminUsers.table.unlock')}
                </Button>
              ) : (
                <Button dangerOutline onClick={(e) => locked(e, data.safeId)}>
                  {t('adminUsers.table.lock')}
                </Button>
              )}
            </PayCardBlock>
          </PayCardInner>
        </CSSTransition>

        <CSSTransition in={active === 1} timeout={0} classNames="modal" unmountOnExit>
          <Scrollbars style={{ height: height < 900 ? '550px' : '750px' }}>
            <PayCardWrapper>
              {dataTwo.length
                ? dataTwo.map((item) => (
                    <PayCardBorder key={item.safeId}>
                      <PayCardInner prNone>
                        <PayCardBlock>
                          <PayText big>
                            <PayName>
                              {item.deposit.name}
                              {chip(item.state)}
                            </PayName>
                          </PayText>
                          <PayDate>
                            {moment(item.creationDate).format('DD/MM/YYYY') +
                              '-' +
                              moment(item.endDate).format('DD/MM/YYYY')}
                          </PayDate>
                        </PayCardBlock>
                        <PayCardBlock>
                          <PayText small>{t('adminUsers.modal.contrAmount')}</PayText>
                          <PayText>{item.baseAmountView}</PayText>
                        </PayCardBlock>
                        <PayCardBlock>
                          <PayText small>{t('adminUsers.modal.paySum')}</PayText>
                          <PayText>
                            {/* {selfData[item.safeId] &&
                              selfData[item.safeId][0].userDeposit
                                .payedAmountView}
                            <br /> */}
                            {item.payedAmountView.toLocaleString('ru-RU', {
                              maximumFractionDigits: 4,
                            })}
                          </PayText>
                        </PayCardBlock>
                        <PayCardBlock>
                          <PayText small>{t('adminUsers.modal.totalDeposit')}</PayText>
                          <PayText>
                            {((item.payedAmountView / item.baseAmountView) * 100).toFixed(1)}%
                          </PayText>
                        </PayCardBlock>
                      </PayCardInner>
                      {arr1[item.safeId] ? (
                        <AccordeonList
                          adjustBalanceAsync={adjustBalanceAsync}
                          arr1={arr1}
                          data={item}
                          dataUpdate={dataUpdate}
                        />
                      ) : (
                        ''
                      )}
                    </PayCardBorder>
                  ))
                : ''}
            </PayCardWrapper>
          </Scrollbars>
        </CSSTransition>
      </PayCard>
    </>
  );
};

type ModalUsersProps = {
  data: CollectionUsers;
  onClose: () => void;
  lock: boolean;
  unLocked: (e: any, id: string) => void;
  locked: (e: any, id: string) => void;
  dataOne: CollectionCharges[];
  adjustBalanceAsync: (userSafeId: string, delta: number, safeOperationId: string) => void;
  dataTwo: PaymentsCollection[];
};

export const ModalUsers: FC<ModalUsersProps> = ({
  data,
  lock,
  onClose,
  locked,
  unLocked,
  dataOne,
  adjustBalanceAsync,
  dataTwo,
}: ModalUsersProps) => {
  const [active, setActive] = useState(0);

  const handleContainerClick = (e: React.MouseEvent) => {
    if (e.currentTarget === e.target) {
      onClose();
    }
  };

  const { t } = useTranslation();
  return (
    <Container>
      <Center onClick={handleContainerClick}>
        <ModalUsersContent
          dataOne={dataOne}
          data={data}
          unLocked={unLocked}
          locked={locked}
          adjustBalanceAsync={adjustBalanceAsync}
          lock={lock}
          active={active}
          setActive={setActive}
          dataTwo={dataTwo}
        />
      </Center>
    </Container>
  );
};

const Chip = styled.div<{ need?: boolean }>`
  font-weight: normal;
  font-size: 10px;
  line-height: 12px;
  padding: 3px 5px;
  display: block;
  float: right;
  color: ${(props) => props.theme.cdis};
  border-radius: 24px;
  background: ${(props) => (props.need ? '#FFB23E' : '#FF416E')};
`;

const PayCardBorder = styled.div`
  width: 100%;
  border-bottom: 1px solid rgba(255, 65, 110, 0.2);
  margin-bottom: 7px;
`;

const PayCardInner = styled.div<{ prNone?: boolean }>`
  padding-left: 18px;
  padding-right: ${(props) => (props.prNone ? '0px' : '18px')};
`;

const Accordeon = styled.div`
  width: 100%;
`;

const AccordeonHead = styled.div<{ open?: boolean }>`
  font-weight: 500;
  font-size: 14px;
  line-height: 14px;
  letter-spacing: 0.1px;
  color: ${(props) => props.theme.depositHead};
  cursor: pointer;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  svg {
    transition: 0.3s linear;
    transform: ${(props) => (props.open ? 'rotate(0deg)' : 'rotate(-90deg)')};
    margin-left: 14px;
  }
  @media (max-width: 992px) {
    cursor: initial;
  }
`;

const AccordeonContent = styled.div<{ open?: boolean }>`
  height: ${(props) => (props.open ? 'auto' : '0')};
  overflow: hidden;
  transition: height 300ms linear;
  background: rgba(66, 139, 202, 0.06);
  padding-bottom: ${(props) => (props.open ? '1px' : '0px')};
  margin-bottom: ${(props) => (props.open ? '3px' : '0px')};
`;

const PayTabs = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid rgba(196, 196, 196, 0.3);
  margin-bottom: 15px;
  @media (max-width: 992px) {
    display: none;
  }
`;

const PayTab = styled.div<{ active?: boolean }>`
  font-weight: 500;
  font-size: 14px;
  line-height: 14px;
  letter-spacing: 0.1px;
  text-align: center;
  padding-bottom: 7px;
  width: 50%;
  cursor: pointer;
  color: ${(props) => (props.active ? '#FF416E' : props.theme.text2)};
  border-bottom: ${(props) => (props.active ? '1px solid #FF416E' : 'none')};
  position: relative;
  @media (max-width: 992px) {
    cursor: initial;
  }
`;

const Center = styled.div`
  min-height: calc(100% - 3.5rem);
  margin: 1.75rem auto;
  display: flex;
  align-items: center;
  transition: height 300ms linear;
  &::-webkit-scrollbar {
    width: 0 !important;
  }
`;

const Hr = styled.hr`
  background: rgba(81, 81, 114, 0.2);
`;

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.2);
  display: block;
  z-index: 99999;
  overflow: auto;
  &::-webkit-scrollbar {
    width: 0 !important;
  }
`;

const PayCard = styled(Card)<{
  smallPad?: boolean;
  wide?: boolean;
  mNone?: boolean;
}>`
  transition: height 300ms linear;
  padding: 20px ${(props) => (props.smallPad ? '8px' : '20px')};
  max-width: ${(props) => (props.wide ? '350px' : '280px')};
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  margin: 0px auto;
  @media (max-width: 992px) {
    margin: ${(props) => (props.mNone ? '0px auto' : '50px auto')};
    max-width: ${(props) => (props.wide ? '100%' : '280px')};
  }
  background: ${(props) => props.theme.card.background};
  box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
`;

const PayCardWrapper = styled.div`
  max-height: 650px;
  height: 100%;
`;

const PayCardBlock = styled.div`
  margin-bottom: 20px;
  &:focus,
  &:active {
    outline: none;
    border-radius: 24px;
    background: transparent;
  }
  ${Button} {
    margin-left: auto;
    margin-right: auto;
  }
  div {
    justify-content: space-between;
  }
  @media (max-width: 576px) {
    svg {
      display: block;
    }
  }
  input {
    background: ${(props) => props.theme.card.background};
    &:focus {
      padding: 0;
      border: 0;
      background: ${(props) => props.theme.card.background};
      font-size: 14px;
      line-height: 16px;
    }
  }
`;

const PayName = styled.div`
  font-weight: 500;
  font-size: 14px;
  line-height: 16px;
  letter-spacing: 0.1px;
  color: ${(props) => props.theme.text2};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const PayText = styled.div<{ small?: boolean; big?: boolean }>`
  font-weight: ${(props) => (props.big ? 'bold' : 'normal')};
  font-size: ${(props) => (props.small ? '12px' : '14px')};
  line-height: ${(props) => (props.small ? '21px' : '16px')};
  letter-spacing: 0.1px;
  color: ${(props) =>
    props.small ? props.theme.thHead : props.big ? '#FF416E' : props.theme.text2};
`;

const PayDate = styled.div`
  font-weight: normal;
  font-size: 12px;
  line-height: 21px;
  letter-spacing: 0.1px;
  color: ${(props) => props.theme.text2};
`;
