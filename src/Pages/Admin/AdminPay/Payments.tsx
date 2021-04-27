import React, { FC } from "react";
import styled from "styled-components/macro";
import { Button } from "../../../components/Button/Button";
import { Card } from "../../../globalStyles";
import { PaymentsCollection, CollectionCharges } from "../../../types/payments";
import { CollectionPortfolio } from "../../../types/portfolio";
import { InputWrap } from "./InputWrap";
import { CollectionUsers } from "../../../types/users";
import { useTranslation } from "react-i18next";
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
            <PayText small>{t("adminPay.table.desc")}</PayText>
            <PayText>{data.deposit.description}</PayText>
          </PayCardBlock>
          <PayCardBlock>
            <PayText small>{t("adminPay.table.user")}</PayText>
            <PayText>{data.userName}</PayText>
          </PayCardBlock>
          {data.state !== 5 && (
            <PayCardBlock>
              <PayText small>{t("adminPay.table.procent")}</PayText>
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
            <PayText small>{t("adminPay.table.datePay")}</PayText>
            <PayText>
              {data.paymentDate
                ? moment(data.paymentDate).format("DD/MM/YYYY")
                : "-"}
            </PayText>
          </PayCardBlock>
          <PayCardBlock>
            <PayText small>{t("adminPay.table.profit")}</PayText>
            <PayText>{data.deposit.paymentRatio * 100}%</PayText>
          </PayCardBlock>
          <PayCardBlock>
            <PayText small>{t("adminPay.table.contribution")}</PayText>
            <PayText>{data.baseAmountView.toLocaleString()}</PayText>
          </PayCardBlock>
          {data.state !== 5 && (
            <PayCardBlock>
              <PayText small>{t("adminPay.table.payments")}</PayText>
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
              <Button
                dangerOutline
                onClick={() => paymentsConfirm(data.safeId)}
              >
                {t("depositList.confirm")}
              </Button>
            ) : (
              <Button
                greenOutline
                onClick={() => {
                  unConfirmPay(data.safeId);
                }}
              >
                {t("depositList.confirmed")}
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
            <PayText small>{t("adminPay.table.user")}</PayText>
            <PayText>{data.userName}</PayText>
          </PayCardBlock>
          <PayCardBlock>
            <PayText small>{t("adminPay.table.datePay")}</PayText>
            <PayText>{moment(data.paymentDate).format("DD/MM/YYYY")}</PayText>
          </PayCardBlock>
          <PayCardBlock>
            <PayText small>Категория</PayText>
            <PayText>
              {data.state === 4
                ? t("depositList.depositClose")
                : t("depositList.dividents")}
            </PayText>
          </PayCardBlock>
          <PayCardBlock>
            <PayText small>{t("adminPay.table.contribution")}</PayText>
            <PayText>{data.baseAmountView.toLocaleString()}</PayText>
          </PayCardBlock>
          <PayCardBlock>
            <PayText small>{t("adminPay.table.payments")}</PayText>
            <PayText>{data.paymentAmountView}</PayText>
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
              {moment(data.creationDate).format("DD/MM/YYYY") +
                "-" +
                moment(data.endDate).format("DD/MM/YYYY")}
            </PayText>
          </PayCardBlock>
          <PayCardBlock>
            <PayText small>{t("adminPay.table.user")}</PayText>
            <PayText>{data.userName}</PayText>
          </PayCardBlock>
          <PayCardBlock>
            <PayText small>{t("adminPay.table.nextDate")}</PayText>
            <PayText>{moment(data.paymentDate).format("DD/MM/YYYY")}</PayText>
          </PayCardBlock>
          <PayCardBlock>
            <PayText small>{t("adminPay.table.paid")}</PayText>
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
            <PayText small>{t("adminPay.table.user")}</PayText>
            <PayText>{data.account}</PayText>
          </PayCardBlock>
          <PayCardBlock>
            <PayText small>{t("adminPay.table.datePay")}</PayText>
            <PayText>
              {moment(data.userDeposit.prevPayment).format("DD/MM/YYYY")}
            </PayText>
          </PayCardBlock>
          <PayCardBlock>
            <PayText small>{t("adminPay.table.category")}</PayText>
            <PayText>
              {data.userDeposit.state === 4
                ? t("depositList.depositClose")
                : t("depositList.dividents")}
            </PayText>
          </PayCardBlock>
          <PayCardBlock>
            <PayText small>{t("adminPay.table.contribution")}</PayText>
            <PayText>
              {data.userDeposit.baseAmountView.toLocaleString()}
            </PayText>
          </PayCardBlock>
          <PayCardBlock>
            <PayText small>{t("adminPay.table.payments")}</PayText>
            <PayText>
              {(data.amount / 100000).toFixed(2).toLocaleString()}
            </PayText>
          </PayCardBlock>
          <PayCardBlock></PayCardBlock>
        </PayCard>
      </Center>
    </Container>
  );
};

export const ModalPortfolio: FC<{
  data: CollectionPortfolio;
  onClose: () => void;
}> = ({ data, onClose }) => {
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
            <PayText small>{t("adminPortfolio.table.date")}</PayText>
            <PayText>{moment(data.creationDate).format("DD/MM/YYYY")}</PayText>
          </PayCardBlock>
          <PayCardBlock>
            <PayText small>{t("adminPortfolio.table.count")}</PayText>
            <PayText>{data.initialVolume}</PayText>
          </PayCardBlock>
          <PayCardBlock>
            <PayText small>{t("adminPortfolio.table.cost")}, CWD</PayText>
            <PayText>
              {(data.unitPrice / 100000).toFixed(2).toLocaleString()}
            </PayText>
          </PayCardBlock>
          <PayCardBlock>
            <PayText small>{t("adminPortfolio.table.amount")}</PayText>
            <PayText>{data.volume}</PayText>
          </PayCardBlock>
        </PayCard>
      </Center>
    </Container>
  );
};

export const ModalUsers: FC<{
  data: CollectionUsers;
  onClose: () => void;
  lock: boolean;
  unLocked: (e: any, id: string) => void;
  locked: (e: any, id: string) => void;
}> = ({ data, lock, onClose, locked, unLocked }) => {
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
            <PayText small>{t("adminPay.table.user")}</PayText>
            <PayText>{data.name}</PayText>
          </PayCardBlock>
          <PayCardBlock>
            <PayText small>{t("adminUsers.table.balans")}</PayText>
            <PayText>
              {data.balances.length
                ? (data.balances[0].volume / 100000).toLocaleString()
                : "-"}
            </PayText>
          </PayCardBlock>
          <PayCardBlock>
            <PayText small>{t("adminUsers.table.role")}</PayText>
            <PayText>{data.roles.length ? data.roles[0].name : "-"}</PayText>
          </PayCardBlock>
          <PayCardBlock>
            <PayText small>{t("adminUsers.table.dataCreate")}</PayText>
            <PayText>{moment(data.creationDate).format("DD/MM/YYYY")}</PayText>
          </PayCardBlock>
          <PayCardBlock>
            <PayText small>{t("adminUsers.table.lang")}</PayText>
            <PayText>{t("adminUsers.table.rus")}</PayText>
          </PayCardBlock>
          <PayCardBlock>
            {lock ? (
              <Button greenOutline onClick={(e) => unLocked(e, data.safeId)}>
                {t("adminUsers.table.unlock")}
              </Button>
            ) : (
              <Button dangerOutline onClick={(e) => locked(e, data.safeId)}>
                {t("adminUsers.table.lock")}
              </Button>
            )}
          </PayCardBlock>
        </PayCard>
      </Center>
    </Container>
  );
};

const Center = styled.div`
  min-height: calc(100% - 3.5rem);
  margin: 1.75rem auto;
  display: flex;
  align-items: center;
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
`;

const PayCard = styled(Card)`
  padding: 20px;
  width: 280px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  margin: 50px auto;
  background: ${(props) => props.theme.card.background};
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
  color: ${(props) => props.theme.text2};
`;

const PayText = styled.p<{ small?: boolean }>`
  font-weight: normal;
  font-size: ${(props) => (props.small ? "12px" : "14px")};
  line-height: ${(props) => (props.small ? "21px" : "16px")};
  letter-spacing: 0.1px;
  color: ${(props) => (props.small ? props.theme.thHead : props.theme.text2)};
`;
