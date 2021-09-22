import moment from 'moment';
import 'moment/locale/ru';
import React, { useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useHistory } from 'react-router-dom';
import { AppContext } from '../../context/HubContext';
import useWindowSize from '../../hooks/useWindowSize';
import { Balance } from '../../types/balance';
import * as Styled from './Table.styled';
import { TableModal } from './TableModal';

const Row = ({ data }: any) => {
  const [open, setOpen] = useState<boolean | string>(false);
  const size = useWindowSize();
  const history = useHistory();
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
  console.log('data', data);
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
          </Styled.TR>
          <TableModal onClose={onClose} open={open} data={data} />
        </>
      )}
    </>
  );
};

export const Tables = ({ list }: any) => {
  const { t } = useTranslation();

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
          </Styled.TR>
        </thead>
        <tbody>
          {list.length ? (
            list.map((item: any) => <Row key={item.safeId} data={item} />)
          ) : (
            <Styled.TR></Styled.TR>
          )}
        </tbody>
      </Styled.Table>
    </Styled.TableWrap>
  );
};
