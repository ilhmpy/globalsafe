import moment from 'moment';
import { FC, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components/macro';
import { Balance } from '../../types/balance';
import { Collection } from '../../types/info';
import { Button } from '../Button/Button';
import { Modal } from '../Modal/Modal';
import { NameData } from './Table.styled';

type Props = {
  data: Collection;
  onClose: () => void;
  open: boolean | string;
  showModalCancel: () => void;
};

export const TableModal: FC<Props> = ({ onClose, open, data, showModalCancel }: Props) => {
  return (
    <>
      {!!(open === data.safeId) && (
        <Modal onClose={onClose} withoutClose>
          <InfoBlock data={data} showModalCancel={showModalCancel} />
        </Modal>
      )}
    </>
  );
};

export const InfoBlock: FC<any> = ({ data, showModalCancel }: any) => {
  const { t } = useTranslation();

  const convertedLoanValue = useMemo(() => {
    if (data.deposit.loanKind === 1) {
      return `${(data.loanVolume / 100000).toLocaleString('ru-RU', { maximumFractionDigits: 2 })} ${
        Balance[data.deposit.loanKind]
      }`;
    }

    if (data.deposit.loanKind === 43) {
      return `${(data.loanVolume / 10000).toLocaleString('ru-RU', { maximumFractionDigits: 2 })} ${
        Balance[data.deposit.loanKind]
      }`;
    }

    return `${data.loanVolume} ${Balance[data.deposit.loanKind]}`;
  }, [data]);

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
                  ? data.paymentAmountView.toLocaleString('ru-RU', {
                      maximumFractionDigits: 7,
                    })
                  : data.paymentAmountView
                : '-'}
            </Text>
            {data.paymentAmountView ? <Text>{Balance[data.deposit.asset]}</Text> : null}
          </LI>

          <LI>
            <Text>{t('privateArea.pledge')}</Text>
            <Text>{data.loanVolume ? convertedLoanValue : '0 CWD'}</Text>
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
          <LI>
            <Button
              as="button"
              disabled={!data.deposit.isExchangeable || data.state !== 2}
              dangerOutline
              onClick={showModalCancel}
            >
              {t('cancelDeposit.closeDeposit')}
            </Button>
          </LI>
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
  &:last-child {
    margin-bottom: 0;
  }
  ${Button} {
    width: 135px;
    height: 40px;
    padding: 4px;
    font-weight: normal;
    margin: 0 auto;
    color: ${(props) => props.theme.text};
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
