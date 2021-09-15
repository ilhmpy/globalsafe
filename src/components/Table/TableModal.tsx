import React from 'react';
import styled from 'styled-components/macro';
import { Modal } from '../Modal/Modal';
import moment from 'moment';
import { Name, NameData } from './Table.styled';
import { Balance } from '../../types/balance';
import { useTranslation } from 'react-i18next';

type Props = {
  data: any;
  onClose: () => void;
  open: boolean | string;
};

export const TableModal = ({ onClose, open, data }: Props) => {
  return (
    <>
      {!!(open === data.safeId) && (
        <Modal onClose={onClose} withoutClose>
          <InfoBlock data={data} />
        </Modal>
      )}
    </>
  );
};

export const InfoBlock = ({ data }: any) => {
  const { t } = useTranslation();
  return (
    <>
      {data && (
        <List>
          <LI>
            <Text bold>{data.deposit.name}</Text>
            <NameData>
              <NameData>{moment(data.creationDate).format('DD/MM/YYYY')}</NameData>{' '}
              <NameData>&nbsp; - &nbsp;</NameData>
              <NameData green={moment.utc().valueOf() > moment.utc(data.endDate).valueOf()}>
                {moment(data.endDate).format('DD/MM/YYYY')}
              </NameData>
            </NameData>
            <Hr />
          </LI>
          <LI>
            <Text>{t('privateArea.desc')}</Text>
            <Text dangerouslySetInnerHTML={{ __html: data.deposit.description }} />
          </LI>
          <LI>
            <Text>{t('privateArea.dateEnd')}</Text>
            <Text>{moment(data.endDate).format('DD/MM/YYYY')}</Text>
          </LI>
          <LI>
            <Text>{t('privateArea.nextDate')}</Text>
            <Text>{data.paymentDate ? moment(data.paymentDate).format('DD/MM/YYYY') : '-'}</Text>
          </LI>
          <LI>
            <Text>{t('privateArea.sumDeposit')}</Text>
            <Text>
              {data.amountView}&nbsp; {Balance[data.deposit.asset]}
            </Text>
          </LI>
          <LI>
            <Text>{t('privateArea.contrAmount')}</Text>
            <Text>{data.baseAmountView}&nbsp; CWD</Text>
          </LI>
          <LI>
            <Text>{t('privateArea.amountPay')}</Text>
            <Text>
              {data.paymentAmountView
                ? data.paymentAmountView.toString().length > 15
                  ? data.paymentAmountView.toFixed(7)
                  : data.paymentAmountView
                : '-'}
            </Text>
            {data.paymentAmountView ? <Text>{Balance[data.deposit.asset]}</Text> : null}
          </LI>

          <LI>
            <Text>{t('privateArea.pledge')}</Text>
            <Text>
              {data.loanVolume
                ? (data.loanVolume / 100000).toLocaleString('ru-RU', {
                    maximumFractionDigits: 2,
                  })
                : 0}
              &nbsp; CWD
            </Text>
          </LI>
          <LI>
            <Text>{t('privateArea.pendingPay')}</Text>
            <Text>{data.pendingAmount ? data.pendingAmount : 0}&nbsp; CWD</Text>
          </LI>
          <LI>
            <Text>{t('privateArea.allPay')}</Text>
            <Text>
              {data.payedAmountView.toLocaleString('ru-RU', {
                maximumFractionDigits: 2,
              })}
              &nbsp; CWD
            </Text>
          </LI>
          <LI>
            <Text>{t('privateArea.prevPay')}</Text>
            <Text>
              {data.prevPayedAmountView.toLocaleString('ru-RU', {
                maximumFractionDigits: 2,
              })}
              &nbsp; CWD
            </Text>
          </LI>
          <LI>
            <Text>{t('privateArea.procentPrevPay')}</Text>
            <Text>
              {data.prevPayedAmountView
                ? ((data.prevPayedAmountView / data.amountView) * 100).toFixed(2)
                : 0}{' '}
              %
            </Text>
          </LI>
          <LI>
            <Text>{t('privateArea.procent')}</Text>
            <Text>
              {data.payedAmountView
                ? ((data.payedAmountView / data.amountView) * 100).toFixed(2)
                : 0}{' '}
              %
            </Text>
          </LI>
          <LI></LI>
        </List>
      )}
    </>
  );
};

const List = styled.ul`
  list-style: none;
  padding: 15px 35px;
`;

const Text = styled.p<{ bold?: boolean }>`
  font-weight: ${(props) => (props.bold ? '500' : '400')};
  font-size: 14px;
  line-height: 16px;
  margin-bottom: 4px;
  letter-spacing: 0.1px;
  color: ${(props) => (props.bold ? props.theme.text2 : props.theme.depositHead)};
`;

const LI = styled.li`
  margin-bottom: 20px;

  ${Text}:last-child {
    color: ${(props) => props.theme.text2};
  }
`;

const Date = styled(NameData)`
  font-size: 12px;
  line-height: 21px;
`;

const Hr = styled.hr`
  background: rgba(66, 139, 202, 0.2);
  width: 100%;
  margin-top: 10px;
`;
