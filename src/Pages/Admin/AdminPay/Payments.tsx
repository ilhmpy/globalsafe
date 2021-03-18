import React, { FC } from "react";
import styled from "styled-components/macro";
import { Button } from "../../../components/Button/Button";
import { Card } from "../../../globalStyles";
import { PaymentsCollection } from "../../../types/payments";
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
        <PayCardBlock>
          <PayText small>% доходности</PayText>
          <PayText></PayText>
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
        <PayCardBlock>
          <PayText small>Сумма выплаты</PayText>
          {/* <PayInput type="number" placeholder="20 000" /> */}
          <InputWrap
            paymentsAdjust={paymentsAdjust}
            done={disabled}
            val={value}
            placeholder={(data.payAmount / 100000).toFixed(2).toString()}
            onChange={onChange}
          />
        </PayCardBlock>
        <PayCardBlock>
          <Button dangerOutline>Подтвердить</Button>
        </PayCardBlock>
      </PayCard>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  height: 100vh;
  position: fixed;
  left: 0;
  top: 0;
  background: rgba(0, 0, 0, 0.2);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 99999;
  cursor: pointer;
  overflow: auto;
`;

const PayCard = styled(Card)`
  padding: 20px;
  width: 280px;
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
  @media (max-width: 576px) {
    svg {
      display: block;
    }
    div {
      justify-content: space-between;
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
