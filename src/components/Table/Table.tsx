import moment from 'moment';
import 'moment/locale/ru';
import React, { useContext, useState, FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useHistory } from 'react-router-dom';
import { AppContext } from '../../context/HubContext';
import useWindowSize from '../../hooks/useWindowSize';
import { Balance } from '../../types/balance';
import { Button } from '../Button/Button';
import { ModalCancel } from './ModalCancel';
import * as Styled from './Table.styled';
import { TableModal } from './TableModal';
import { Collection } from '../../types/info';

type RowProps = {
  data: Collection;
  removeItem: (id: string) => void;
};

const Row: FC<RowProps> = ({ data, removeItem }: RowProps) => {
  const [open, setOpen] = useState<boolean | string>(false);
  const [cancelModal, setCancelModal] = useState<boolean>(false);
  const [calcExchange, setCalcExchange] = useState<null | string[]>(null);
  const size = useWindowSize();
  const history = useHistory();
  const { t } = useTranslation();
  const { hubConnection } = useContext(AppContext);

  const onClose = () => {
    setOpen(false);
  };

  const onClick = (id: string) => {
    if (window.innerWidth < 992) {
      history.push(`/info/deposits/${id}`);
    } else {
      setOpen(data.safeId);
    }
  };

  const cancelDeposit = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCancelModal(true);
  };

  const showModalCancel = () => {
    onClose();
    setCancelModal(true);
  };

  const calculateBalanceExchange = async (amount: string, kind: number) => {
    if (hubConnection) {
      try {
        const res = await hubConnection.invoke<string[]>('CalculateDepositExchange', amount, kind);

        setCalcExchange(res);
      } catch (e) {
        console.log(e);
      }
    }
  };

  const depositExchange = async (amountId: string, kind: number) => {
    if (hubConnection) {
      try {
        const res = await hubConnection.invoke('DepositExchange', amountId, kind);

        setCancelModal(false);
        removeItem(amountId);
      } catch (e) {
        console.log(e);
      }
    }
  };

  return (
    <>
      {size < 992 ? (
        <>
          <Styled.TR key={data.safeId} disactive={data.state === 4}>
            <Styled.TD>
              <Link
                key={data.safeId}
                to={{
                  pathname: '/info/deposits/' + data.safeId,
                  state: data,
                }}
              >
                <Styled.Name>{data.deposit.name}</Styled.Name>
              </Link>
              <Styled.NameData>
                <Styled.NameData>{moment(data.creationDate).format('MM/YYYY')}</Styled.NameData>
                <Styled.NameData>&nbsp; - &nbsp;</Styled.NameData>
              </Styled.NameData>
              <Styled.NameData green={moment.valueOf() > moment(data.endDate).valueOf()}>
                {moment(data.endDate).format('DD/MM/YYYY')}
              </Styled.NameData>
            </Styled.TD>

            <Styled.TD>
              <Styled.Text dangerouslySetInnerHTML={{ __html: data.deposit.description }} />
            </Styled.TD>

            {/* <Styled.TD>
              <Styled.Text>{data.amountView}</Styled.Text>
              <Styled.Text>{Balance[data.deposit.asset]}</Styled.Text>
            </Styled.TD> */}

            <Styled.TD>
              <Styled.Text>{data.amountView}</Styled.Text>
              <Styled.Text>{Balance[data.deposit.asset]}</Styled.Text>
            </Styled.TD>

            <Styled.TD>
              <Styled.Text>
                {data.paymentAmountView
                  ? data.paymentAmountView.toString().length > 15
                    ? data.paymentAmountView.toLocaleString('ru-RU', {
                        maximumFractionDigits: 7,
                      })
                    : data.paymentAmountView
                  : '-'}
              </Styled.Text>
            </Styled.TD>

            <Styled.TD>
              <Link
                key={data.safeId}
                to={{
                  pathname: '/info/deposits/' + data.safeId,
                  state: data,
                }}
              >
                <Styled.Text>
                  {data.paymentDate ? moment(data.paymentDate).format('DD/MM/YYYY') : '-'}
                </Styled.Text>
              </Link>
            </Styled.TD>
            <Styled.TD>
              <Styled.Btn
                as="button"
                disabled={!data.deposit.isExchangeable || data.state !== 2}
                dangerOutline
                onClick={cancelDeposit}
              >
                {t('cancelDeposit.close')}
              </Styled.Btn>
            </Styled.TD>
          </Styled.TR>
        </>
      ) : (
        <>
          <Styled.TR
            key={data.safeId}
            onClick={() => onClick(data.safeId)}
            disactive={data.state === 4}
          >
            <Styled.TD>
              <Styled.Name>{data.deposit.name}</Styled.Name>
              <Styled.NameData>
                <Styled.NameData>{moment(data.creationDate).format('DD/MM/YYYY')}</Styled.NameData>{' '}
                <Styled.NameData>&nbsp; - &nbsp;</Styled.NameData>
                <Styled.NameData green={moment.valueOf() > moment(data.endDate).valueOf()}>
                  {moment(data.endDate).format('DD/MM/YYYY')}
                </Styled.NameData>
              </Styled.NameData>
            </Styled.TD>
            <Styled.TD>
              <Styled.Text dangerouslySetInnerHTML={{ __html: data.deposit.description }} />
            </Styled.TD>
            {/* <Styled.TD>
              <Styled.Text>{data.amountView}</Styled.Text>
              <Styled.Text>{Balance[data.deposit.asset]}</Styled.Text>
            </Styled.TD> */}
            <Styled.TD>
              <Styled.Text>{data.amountView}</Styled.Text>
              <Styled.Text>{Balance[data.deposit.asset]}</Styled.Text>
            </Styled.TD>
            <Styled.TD>
              <Styled.Text>
                {data.paymentAmountView
                  ? data.paymentAmountView.toString().length > 15
                    ? data.paymentAmountView.toLocaleString('ru-RU', {
                        maximumFractionDigits: 7,
                      })
                    : data.paymentAmountView
                  : '-'}
              </Styled.Text>
            </Styled.TD>
            <Styled.TD>
              <Styled.Text>
                {data.paymentDate ? moment(data.paymentDate).format('DD MMMM YYYY') : '-'}
              </Styled.Text>
            </Styled.TD>
            <Styled.TD>
              <Styled.Btn
                as="button"
                disabled={!data.deposit.isExchangeable || data.state !== 2}
                dangerOutline
                onClick={cancelDeposit}
              >
                {t('cancelDeposit.close')}
              </Styled.Btn>
            </Styled.TD>
          </Styled.TR>
          <ModalCancel
            depositExchange={depositExchange}
            calcExchange={calcExchange}
            calculateBalanceExchange={calculateBalanceExchange}
            data={data}
            open={cancelModal}
            onClose={() => setCancelModal(false)}
          />
          <TableModal showModalCancel={showModalCancel} onClose={onClose} open={open} data={data} />
        </>
      )}
    </>
  );
};

type Props = {
  list: Collection[];
  removeItem: (id: string) => void;
};

export const Tables: FC<Props> = ({ list, removeItem }: Props) => {
  const { t } = useTranslation();
  // console.log('list', list);
  return (
    <Styled.TableWrap>
      {/* <FilterMenu filterClick={filterClick} /> */}
      <Styled.Table>
        <thead style={{ position: 'relative' }}>
          <Styled.TR>
            <Styled.TH>{t('privateArea.name')}</Styled.TH>
            <Styled.TH>{t('privateArea.desc')}</Styled.TH>
            {/* <Styled.TH>{t('privateArea.deposit')}</Styled.TH> */}
            <Styled.TH>{t('privateArea.sumDeposit')}</Styled.TH>
            <Styled.TH>{t('privateArea.amountPay')}</Styled.TH>
            <Styled.TH>
              <p>{t('privateArea.nextDate')}</p>
              <span>{t('adminPay.table.nextDate')}</span>
              {/* <Styled.StyledFilter /> */}
            </Styled.TH>
            <Styled.TH></Styled.TH>
          </Styled.TR>
        </thead>
        <tbody>
          {list.length ? (
            list.map((item: any) => <Row key={item.safeId} data={item} removeItem={removeItem} />)
          ) : (
            <Styled.TR></Styled.TR>
          )}
        </tbody>
      </Styled.Table>
    </Styled.TableWrap>
  );
};
