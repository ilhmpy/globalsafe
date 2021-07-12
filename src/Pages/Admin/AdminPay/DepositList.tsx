import moment from "moment";
import React, { FC, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { CSSTransition } from "react-transition-group";
import styled, { css } from "styled-components/macro";
import { Button } from "../../../components/Button/Button";
import { RoundButton } from "../../../components/UI/RoundButton";
import useOnClickOutside from "../../../hooks/useOutsideHook";
import useWindowSize from "../../../hooks/useWindowSize";
import { CollectionCharges, PaymentsCollection } from "../../../types/payments";
import { InputWrap } from "./InputWrap";
import { ModalPaid, ModalPay, ModalPayList } from "./Payments";

type ListProps = {
  data: PaymentsCollection;
  adjustPay: (id: string, val: number) => void;
  confirmPay: (id: string) => void;
  unConfirmPay: (id: string) => void;
  idx: number;
};

export const DepositList: FC<ListProps> = ({
  data,
  adjustPay,
  confirmPay,
  unConfirmPay,
  idx,
}: ListProps) => {
  const [value, setValue] = useState(
    (data.payAmount / 100000).toString()
  );
  const [done, setDone] = useState(false);
  const [procent, setProcent] = useState(
    ((data.payAmount / data.baseAmount) * 100).toString()
  );
  const [open, setOpen] = useState(false);
  const sizes = useWindowSize();
  const size = sizes < 992;
  const field = sizes > 576;
  const { t } = useTranslation();

  const elemref = useRef<any>(null);

  const handleClickOutside = () => {
    setOpen(false);
  };

  useOnClickOutside(elemref, handleClickOutside);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation();
    const pattern = /^[0-9]*\.?[0-9]*$/;
    if (pattern.test(e.target.value)) {
      if (+e.target.value < 0) {
        setValue("");
        setProcent("");
      } else {
        setValue(e.target.value);
        if (e.target.value !== ".") {
          const proc = ((+e.target.value / data.baseAmountView) * 100).toFixed(
            0
          );
          setProcent(proc.toString());
        }
      }
    }
  };

  const disabled = done || data.state === 5;

  const onClose = () => {
    setOpen(false);
  };

  const paymentsAdjust = () => {
    if (value !== "") {
      adjustPay(data.safeId, Math.trunc(Number(value) * 100000) as number);
    }
  };

  const paymentsConfirmCheckbox = (id: string) => {
    if (disabled) {
      paymentsUnConfirm(id);
    } else {
      paymentsConfirm(id);
    }
  };

  const paymentsConfirm = (id: string) => {
    setDone(true);
    confirmPay(id);
    onClose();
  };

  const paymentsUnConfirm = (id: string) => {
    setDone(false);
    unConfirmPay(id);
    onClose();
  };

  const onHandleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const pattern = /^[0-9]*\.?[0-9]*$/;
    if (pattern.test(e.target.value)) {
      if (+e.target.value < 0) {
        setValue("");
        setProcent("");
      } else {
        setProcent(e.target.value);
        if (e.target.value !== ".") {
          const values = (data.baseAmountView * +e.target.value) / 100;
          setValue(values.toString());
        }
      }
    }
  };

  const modalOpen = (e: React.MouseEvent) => {
    e.stopPropagation();
    setOpen(true);
  };


  return (
    <div>
      <CSSTransition in={open} timeout={300} classNames="modal" unmountOnExit>
        <ModalPay
          onClose={onClose}
          data={data}
          disabled={disabled}
          paymentsAdjust={paymentsAdjust}
          procent={procent}
          value={value}
          onHandleChange={onHandleChange}
          onChange={onChange}
          paymentsConfirm={paymentsConfirm}
          unConfirmPay={paymentsUnConfirm}
        />
      </CSSTransition>
      <TableBody onClick={modalOpen}>
        <TableBodyItem dis={disabled}>{idx + 1}</TableBodyItem>
        <TableBodyItem dis={disabled} title={data.userName}>
          {data.userName}
        </TableBodyItem>
        <TableBodyItem dis={disabled}>{data.deposit.name}</TableBodyItem>
        <TableBodyItem dis={disabled}>
          {field ? (
            <InputWrap
              paymentsAdjust={paymentsAdjust}
              done={disabled}
              val={procent}
              placeholder={((data.payAmount / data.baseAmount) * 100).toFixed(
                1
              )}
              onChange={onHandleChange}
            />
          ) : (
            ((data.payAmount / data.baseAmount) * 100).toFixed(1)
          )}
        </TableBodyItem>
        <TableBodyItem dis={disabled}>
          {data.paymentDate
            ? moment(data.paymentDate).format("DD/MM/YYYY")
            : "-"}
        </TableBodyItem>
        <TableBodyItem dis={disabled}>
          {(data.deposit.paymentRatio * 100).toLocaleString("ru-RU", {
            maximumFractionDigits: 2,
          })}
          %
        </TableBodyItem>
        <TableBodyItem dis={disabled}>
          {moment(data.creationDate).format("DD/MM/YYYY")}
        </TableBodyItem>
        <TableBodyItem dis={disabled}>
          {data.baseAmountView.toLocaleString()}
        </TableBodyItem>
        <TableBodyItem dis={disabled}>
          {field ? (
            <InputWrap
              paymentsAdjust={paymentsAdjust}
              done={disabled}
              val={value}
              placeholder={(data.payAmount / 100000).toFixed(2).toString()}
              onChange={onChange}
            />
          ) : (
            (data.payAmount / 100000).toFixed(2).toString()
          )}
        </TableBodyItem>
        <TableBodyItem>
          {size ? (
            <RoundButton
              dis={disabled}
              onClick={(e) => {
                e.stopPropagation();
                paymentsConfirmCheckbox(data.safeId);
              }}
            />
          ) : disabled ? (
            <Button
              greenOutline
              onClick={(e) => {
                e.stopPropagation();
                paymentsUnConfirm(data.safeId);
              }}
            >
              {t("depositList.confirmed")}
            </Button>
          ) : (
            <Button
              dangerOutline
              onClick={(e) => {
                e.stopPropagation();
                paymentsConfirm(data.safeId);
              }}
            >
              {t("depositList.confirm")}
            </Button>
          )}
        </TableBodyItem>
      </TableBody>
    </div>
  );
};

type PayProps = {
  data: PaymentsCollection;
};

export const PaymentsList: FC<PayProps> = ({ data }: PayProps) => {
  const [open, setOpen] = useState(false);
  const { t } = useTranslation();

  const onClose = () => {
    setOpen(false);
  };

  const modalOpen = (e: React.MouseEvent) => {
    e.stopPropagation();
    setOpen(true);
  };
  return (
    <div>
      <CSSTransition in={open} timeout={300} classNames="modal" unmountOnExit>
        <ModalPaid onClose={onClose} data={data} />
      </CSSTransition>
      <TableBody onClick={modalOpen}>
        <TableBodyItemPaid>{data.userName}</TableBodyItemPaid>
        <TableBodyItemPaid>{data.deposit.name}</TableBodyItemPaid>
        <TableBodyItemPaid>
          {moment(data.paymentDate).format("DD/MM/YYYY")}
        </TableBodyItemPaid>
        <TableBodyItemPaid>
          {data.state === 4
            ? t("depositList.depositClose")
            : t("depositList.dividents")}
        </TableBodyItemPaid>
        <TableBodyItemPaid>
          {data.baseAmountView.toLocaleString()}
        </TableBodyItemPaid>
        <TableBodyItemPaid>{data.paymentAmountView}</TableBodyItemPaid>
        <TableBodyItemPaid></TableBodyItemPaid>
      </TableBody>
    </div>
  );
};

export const AdminDepositList: FC<PayProps> = ({ data }: PayProps) => {
  const [open, setOpen] = useState(false);

  const onClose = () => {
    setOpen(false);
  };

  const modalOpen = (e: React.MouseEvent) => {
    e.stopPropagation();
    setOpen(true);
  };
  return (
    <div>
      <CSSTransition in={open} timeout={300} classNames="modal" unmountOnExit>
        <ModalPaid onClose={onClose} data={data} />
      </CSSTransition>
      <TableBody onClick={modalOpen}>
        <TableBodyItem>{data.userName}</TableBodyItem>
        <TableBodyItem>{data.deposit.name}</TableBodyItem>
        <TableBodyItem>
          {moment(data.creationDate).format("DD/MM/YYYY")}
        </TableBodyItem>
        <TableBodyItem>
          {moment(data.endDate).format("DD/MM/YYYY")}
        </TableBodyItem>
        <TableBodyItem>{data.amountView ? data.amountView : "-"}</TableBodyItem>
        <TableBodyItem>
          {moment(data.paymentDate).format("DD/MM/YYYY")}
        </TableBodyItem>
        <TableBodyItem>{data.baseAmountView}</TableBodyItem>
        <TableBodyItem></TableBodyItem>
      </TableBody>
    </div>
  );
};

type Prop = {
  data: CollectionCharges;
};

export const PaymentsListPay: FC<Prop> = ({ data }: Prop) => {
  const [open, setOpen] = useState(false);
  const { t } = useTranslation();

  const onClose = () => {
    setOpen(false);
  };

  const modalOpen = (e: React.MouseEvent) => {
    e.stopPropagation();
    setOpen(true);
  };
  const operation = (id: number) => {
    if (id === 6) {
      return t("operation.open");
    } else if (id === 7) {
      return t("operation.divedents");
    } else if (id === 8) {
      return t("operation.close");
    } else if (id === 2) {
      return t("operation.withdraw");
    } else if (id === 1) {
      return t("operation.add");
    }
  };
  return (
    <div>
      <CSSTransition in={open} timeout={300} classNames="modal" unmountOnExit>
        <ModalPayList onClose={onClose} data={data} />
      </CSSTransition>
      <TableBody onClick={modalOpen}>
        <TableBodyItemPaid>{data.account}</TableBodyItemPaid>
        <TableBodyItemPaid>{data.userDeposit.deposit.name}</TableBodyItemPaid>
        <TableBodyItemPaid>
          {moment(data.userDeposit.prevPayment).format("DD/MM/YYYY")}
        </TableBodyItemPaid>
        <TableBodyItemPaid>
          {operation(data.operationKind)}
          {/* {data.userDeposit.state === 4 
            ? t("depositList.depositClose") 
            : t("depositList.dividents")} */}
        </TableBodyItemPaid>
        <TableBodyItemPaid>
          {data.userDeposit.baseAmountView.toLocaleString()}
        </TableBodyItemPaid>
        <TableBodyItemPaid>
          {(data.amount / 100000).toFixed(2).toLocaleString()}
        </TableBodyItemPaid>
        <TableBodyItemPaid></TableBodyItemPaid>
      </TableBody>
    </div>
  );
};

const TableHead = styled.ul`
  list-style: none;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 6px;
  border-bottom: 1px solid rgba(81, 81, 114, 0.2);
`;

const TableHeadItem = styled.li`
  font-weight: normal;
  font-size: 12px;
  line-height: 14px;
  letter-spacing: 0.1px;
  color: ${(props) => props.theme.thHead};
  width: 100%;
  &:nth-child(1) {
    max-width: 30px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  &:nth-child(2) {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 97px;
    @media (max-width: 768px) {
      display: none;
    }
  }
  &:nth-child(3) {
    max-width: 94px;
    @media (max-width: 576px) {
      /* display: none; */
    }
  }
  &:nth-child(4) {
    max-width: 110px;
    @media (max-width: 992px) {
      display: none;
    }
  }
  &:nth-child(5) {
    max-width: 85px;
    @media (max-width: 1100px) {
      display: none;
    }
  }
  &:nth-child(6) {
    max-width: 85px;
    @media (max-width: 992px) {
      display: none;
    }
  }
  &:nth-child(7) {
    max-width: 100px;
    @media (max-width: 1100px) {
      display: none;
    }
  }
  &:nth-child(8) {
    max-width: 75px;
    @media (max-width: 576px) {
      display: none;
    }
  }
  &:nth-child(9) {
    max-width: 110px;
    @media (max-width: 576px) {
      max-width: 80px;
    }
  }
  &:nth-child(10) {
    max-width: 120px;
    text-align: right;
    @media (max-width: 992px) {
      max-width: 60px;
    }
    @media (max-width: 576px) {
      max-width: 30px;
    }
  }
  &:last-child {
    max-width: 120px;
    text-align: right;
    @media (max-width: 992px) {
      max-width: 60px;
    }
    @media (max-width: 576px) {
      max-width: 30px;
    }
  }
`;

const TableBody = styled(TableHead)`
  padding: 10px 10px 10px 0;
  transition: background 0.3s;
  &:hover {
    background: rgba(66, 139, 202, 0.109);
  }
`;

const TableBodyItemCss = css`
  font-weight: normal;
  font-size: 14px;
  line-height: 16px;
`;

const TableHeadItemPaid = styled(TableHeadItem)`
  &:nth-child(1) {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 97px;
    @media (max-width: 768px) {
      display: none;
    }
  }
  &:nth-child(2) {
    max-width: 170px;
    @media (max-width: 576px) {
      padding-right: 10px;
    }
  }
  &:nth-child(4) {
    max-width: 170px;
  }
  &:nth-child(5) {
    max-width: 112px;
  }
  &:nth-child(6) {
    max-width: 100px;

    @media (max-width: 992px) {
      display: block;
      text-align: center;
    }
  }
  &:nth-child(7) {
    max-width: 40px;
    text-align: right;
  }
`;

const TableBodyItem = styled(TableHeadItem)<{ dis?: boolean }>`
  ${TableBodyItemCss}
  color: ${(props) => (props.dis ? "#C4C4C4" : props.theme.text2)};
`;

const TableBodyItemPaid = styled(TableHeadItemPaid)`
  ${TableBodyItemCss}
  color:${(props) => props.theme.text2};
`;
