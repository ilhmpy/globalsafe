import { useEffect, FC } from 'react';
import styled from 'styled-components/macro';
import { Modal } from '../Modal/Modal';
import { Balance } from '../../types/balance';
import { useTranslation } from 'react-i18next';
import { Button } from '../Button/Button';
import { Collection } from '../../types/info';

type Props = {
  data: Collection;
  onClose: () => void;
  open: boolean;
  calculateBalanceExchange: (amount: string, kind: number) => void;
  calcExchange: null | string[];
  depositExchange: (amount: string, kind: number) => void;
};

export const ModalCancel: FC<Props> = ({
  onClose,
  open,
  data,
  calculateBalanceExchange,
  calcExchange,
  depositExchange,
}: Props) => {
  useEffect(() => {
    if (data && open) calculateBalanceExchange(data.safeId, Balance.MULTICS);
  }, [data, open]);

  return (
    <>
      {open && calcExchange ? (
        <Modal onClose={onClose} withoutClose>
          <InfoBlock data={data} calcExchange={calcExchange} depositExchange={depositExchange} />
        </Modal>
      ) : null}
    </>
  );
};

type InfoBlockProps = {
  calcExchange: string[];
  data: Collection;
  depositExchange: (amount: string, kind: number) => void;
};

export const InfoBlock: FC<InfoBlockProps> = ({
  data,
  calcExchange,
  depositExchange,
}: InfoBlockProps) => {
  const { t } = useTranslation();

  return (
    <>
      <Container>
        <Title>{t('cancelDeposit.closeDeposit')}</Title>
        <Desc>
          {t('cancelDeposit.sumToPay')} -<br />
          <span>
            {(+calcExchange[0] / 100000).toLocaleString('ru-RU', {
              maximumFractionDigits: 2,
            })}
            &nbsp; {Balance[data.deposit.asset]}
          </span>
        </Desc>
        <Desc>
          {t('cancelDeposit.sumAndProcent')} -<br />
          <span>
            {(+calcExchange[1] / 100000).toLocaleString('ru-RU', {
              maximumFractionDigits: 2,
            })}
            &nbsp; {Balance[data.deposit.asset]}*
          </span>
          <Small>{t('cancelDeposit.sumBetween')}</Small>
        </Desc>
        <Desc>
          {t('cancelDeposit.convert')} -{' '}
          <span>
            {+calcExchange[1] / +calcExchange[2] / 1000 > 0 && +calcExchange[2] > 0
              ? (+calcExchange[1] / +calcExchange[2] / 1000).toLocaleString('ru-RU', {
                  maximumFractionDigits: 2,
                })
              : 0}
          </span>
        </Desc>
        <Desc>
          <strong>{t('cancelDeposit.getSum')}</strong>
          <br />
          <span>
            {(+calcExchange[2] / 100).toLocaleString('ru-RU', {
              maximumFractionDigits: 2,
            })}{' '}
            MULTICS
          </span>
        </Desc>
        <Button
          as="button"
          disabled={+calcExchange[2] <= 0}
          danger
          onClick={() => depositExchange(data.safeId, Balance.MULTICS)}
        >
          {t('cancelDeposit.confirm')}
        </Button>
      </Container>
    </>
  );
};

const Container = styled.div`
  padding: 50px 80px;
  ${Button} {
    margin: 0 auto;
  }
  @media (max-width: 768px) {
    padding: 25px;
  }
`;

const Title = styled.h3`
  font-weight: 500;
  font-size: 24px;
  line-height: 28px;
  text-align: center;
  margin-bottom: 20px;
`;

const Desc = styled.div`
  color: ${(props) => props.theme.text2};
  font-size: 14px;
  line-height: 16px;
  font-weight: 500;
  text-align: center;
  letter-spacing: 0.1px;
  margin-bottom: 20px;
  span {
    color: #ff416e;
    font-weight: 500;
  }
`;

export const Small = styled.p`
  font-size: 12px;
  line-height: 14px;
  letter-spacing: 0.1px;
  font-weight: 400;
`;
