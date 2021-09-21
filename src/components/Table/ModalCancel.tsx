import React, { useMemo, useEffect, FC } from 'react';
import styled from 'styled-components/macro';
import { Modal } from '../Modal/Modal';
import moment from 'moment';
import { Name, NameData } from './Table.styled';
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

export const ModalCancel = ({
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
  const procent = ((+calcExchange[0] - data.amount) / data.amount) * 100;
  return (
    <>
      <Container>
        <Title>{t('cancelDeposit.closeDeposit')}</Title>
        <Desc>
          {t('cancelDeposit.sumAndProcent')} ({Number(procent.toFixed(2))}%) -<br />
          <span>
            {data.amountView}&nbsp; {Balance[data.deposit.asset]}
          </span>
          <br />
          {t('cancelDeposit.convert')} <span>{+calcExchange[0] / data.amount}</span>
        </Desc>
        <Desc>
          <strong>{t('cancelDeposit.getSum')}</strong>
          <br />
          <span>{+calcExchange[0] / 100} MSC</span>
        </Desc>
        <Button danger onClick={() => depositExchange(data.safeId, Balance.MULTICS)}>
          {t('cancelDeposit.confirm')}
        </Button>
      </Container>
    </>
  );
};

const Container = styled.div`
  padding: 50px;
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
  text-align: center;
  letter-spacing: 0.1px;
  margin-bottom: 20px;
  span {
    color: #ff416e;
    font-weight: 500;
  }
`;
