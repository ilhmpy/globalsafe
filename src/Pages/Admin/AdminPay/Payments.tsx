import React, { FC } from "react";
import styled from "styled-components/macro";
import { Button } from "../../../components/Button/Button";
import { Card } from "../../../globalStyles";
import { PaymentsCollection, CollectionCharges } from "../../../types/payments";
import { InputWrap } from "./InputWrap";

import moment from "moment";

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
}: ListProps) => {
  const handleContainerClick = (e: React.MouseEvent) => {
    if (e.currentTarget === e.target) {
      onClose();
    }
  };
  return (
    <Container onClick={handleContainerClick}>
      <PayCard>
        <PayCardBlock>
          <PayName>{data.deposit.name}</PayName>
        </PayCardBlock>
        <PayCardBlock>
          <PayText small>Описание программы</PayText>
          <PayText>{data.deposit.description}</PayText>
        </PayCardBlock>
        <PayCardBlock>
          <PayText small>Пользователь</PayText>
          <PayText>{data.userName}</PayText>
        </PayCardBlock>
        {data.state !== 5 && (
          <PayCardBlock>
            <PayText small>% доходности</PayText>
            {/* <PayText></PayText> */}
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
          <PayText small>Дата выплаты</PayText>
          <PayText>
            {data.paymentDate
              ? moment(data.paymentDate).format("DD/MM/YYYY")
              : "-"}
          </PayText>
        </PayCardBlock>
        <PayCardBlock>
          <PayText small>Доходность по программе</PayText>
          <PayText>{data.deposit.paymentRatio * 100}%</PayText>
        </PayCardBlock>
        <PayCardBlock>
          <PayText small>Сумма вклада</PayText>
          <PayText>{data.baseAmountView.toLocaleString()}</PayText>
        </PayCardBlock>
        {data.state !== 5 && (
          <PayCardBlock>
            <PayText small>Сумма выплаты</PayText>
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
        {data.state !== 5 && (
          <PayCardBlock>
            <Button dangerOutline onClick={() => paymentsConfirm(data.safeId)}>
              Подтвердить
            </Button>
          </PayCardBlock>
        )}
      </PayCard>
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
  return (
    <Container onClick={handleContainerClick}>
      <PayCard>
        <PayCardBlock>
          <PayName>{data.deposit.name}</PayName>
        </PayCardBlock>
        <PayCardBlock>
          <PayText small>Пользователь</PayText>
          <PayText>{data.userName}</PayText>
        </PayCardBlock>
        <PayCardBlock>
          <PayText small>Дата выплаты</PayText>
          <PayText>{moment(data.paymentDate).format("DD/MM/YYYY")}</PayText>
        </PayCardBlock>
        <PayCardBlock>
          <PayText small>Категория</PayText>
          <PayText>
            {data.state === 4 ? "Закрытие вклада" : "Начисление дивидендов"}
          </PayText>
        </PayCardBlock>
        <PayCardBlock>
          <PayText small>Сумма вклада</PayText>
          <PayText>{data.baseAmountView.toLocaleString()}</PayText>
        </PayCardBlock>
        <PayCardBlock>
          <PayText small>Сумма выплаты</PayText>
          <PayText>{data.paymentAmountView}</PayText>
        </PayCardBlock>
        <PayCardBlock></PayCardBlock>
      </PayCard>
    </Container>
  );
};

export const ModalDeposit: FC<PaidProps> = ({ data, onClose }: PaidProps) => {
  const handleContainerClick = (e: React.MouseEvent) => {
    if (e.currentTarget === e.target) {
      onClose();
    }
  };
  return (
    <Container onClick={handleContainerClick}>
      <PayCard>
        <PayCardBlock>
          <PayName>{data.deposit.name}</PayName>
          <PayText>
            {moment(data.creationDate).format("DD/MM/YYYY") +
              "-" +
              moment(data.endDate).format("DD/MM/YYYY")}
          </PayText>
        </PayCardBlock>
        <PayCardBlock>
          <PayText small>Пользователь</PayText>
          <PayText>{data.userName}</PayText>
        </PayCardBlock>
        <PayCardBlock>
          <PayText small>Дата следующей выплаты</PayText>
          <PayText>{moment(data.paymentDate).format("DD/MM/YYYY")}</PayText>
        </PayCardBlock>
        <PayCardBlock>
          <PayText small>Выплачено</PayText>
          <PayText>{data.baseAmountView}</PayText>
        </PayCardBlock>
        <PayCardBlock></PayCardBlock>
      </PayCard>
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
  return (
    <Container onClick={handleContainerClick}>
      <PayCard>
        <PayCardBlock>
          <PayName>{data.userDeposit.deposit.name}</PayName>
        </PayCardBlock>
        <PayCardBlock>
          <PayText small>Пользователь</PayText>
          <PayText>{data.account}</PayText>
        </PayCardBlock>
        <PayCardBlock>
          <PayText small>Дата выплаты</PayText>
          <PayText>
            {moment(data.userDeposit.prevPayment).format("DD/MM/YYYY")}
          </PayText>
        </PayCardBlock>
        <PayCardBlock>
          <PayText small>Категория</PayText>
          <PayText>
            {data.userDeposit.state === 4
              ? "Закрытие вклада"
              : "Начисление дивидендов"}
          </PayText>
        </PayCardBlock>
        <PayCardBlock>
          <PayText small>Сумма вклада</PayText>
          <PayText>{data.userDeposit.baseAmountView.toLocaleString()}</PayText>
        </PayCardBlock>
        <PayCardBlock>
          <PayText small>Сумма выплаты</PayText>
          <PayText>{data.userDeposit.paymentAmountView}</PayText>
        </PayCardBlock>
        <PayCardBlock></PayCardBlock>
      </PayCard>
    </Container>
  );
};

const Hr = styled.hr`
  background: rgba(81, 81, 114, 0.2);
`;

const Container = styled.div`
  width: 100%;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 99999;
  overflow-y: auto;
  body {
    overflow: hidden;
  }
`;

const PayCard = styled(Card)`
  padding: 20px;
  width: 280px;
  height: auto;
  overflow: auto;
  position: relative;
  margin-top: 40px;
  margin-bottom: 40px;
  background: #fafafa;
  box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
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
    background: #fafafa;
    &:focus {
      padding: 0;
      border: 0;
      background: #fafafa;
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
  color: #515172;
`;

const PayInput = styled.input`
  border: none;
  font-size: 14px;
  width: 100%;
  line-height: 16px;
  letter-spacing: 0.1px;
  color: #515172;
  padding-right: 10px;
  border-bottom: 1px solid rgba(81, 81, 114, 0.2);
  &:focus {
    outline: none;
    border-bottom: 1px solid rgba(81, 81, 114, 0.8);
  }
`;

const PayText = styled.p<{ small?: boolean }>`
  font-weight: normal;
  font-size: ${(props) => (props.small ? "12px" : "14px")};
  line-height: ${(props) => (props.small ? "21px" : "16px")};
  letter-spacing: 0.1px;
  color: ${(props) => (props.small ? "rgba(81, 81, 114, 0.6)" : "#515172")};
`;
