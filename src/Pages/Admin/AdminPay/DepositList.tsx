import React, { useState, useRef, useContext, useEffect, FC } from "react";
import { ReactComponent as Pen } from "../../../assets/svg/pen.svg";
import { Checkbox } from "../../../components/UI/Checkbox";
import { PaymentsCollection } from "../../../types/payments";
import useWindowSize from "../../../hooks/useWindowSize";
import { ModalPay } from "./Payments";
import { CSSTransition } from "react-transition-group";
import { Button } from "../../../components/Button/Button";
import { InputWrap } from "./InputWrap";
import styled, { css } from "styled-components/macro";
import useOnClickOutside from "../../../hooks/useOutsideHook";
import moment from "moment";

type ListProps = {
  data: PaymentsCollection;
  adjustPay: (id: string, val: number) => void;
  confirmPay: (id: string) => void;
};

export const DepositList: FC<ListProps> = ({
  data,
  adjustPay,
  confirmPay,
}: ListProps) => {
  const [value, setValue] = useState("");
  const [done, setDone] = useState(false);
  const [procent, setProcent] = useState("");
  const [open, setOpen] = useState(false);
  const sizes = useWindowSize();
  const size = sizes < 992;
  const modal = sizes < 768;
  const field = sizes > 576;

  const elemref = useRef<any>(null);

  const handleClickOutside = () => {
    setOpen(false);
  };

  useOnClickOutside(elemref, handleClickOutside);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    const proc = (+e.target.value / data.baseAmountView) * 100;
    setProcent(proc.toString());
  };

  const disabled = done || data.state === 5;

  const paymentsAdjust = () => {
    if (value !== "") {
      adjustPay(data.safeId, +value * 100000);
    }
  };

  const paymentsConfirm = (id: string) => {
    setDone(true);
    confirmPay(id);
  };

  const onHandleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProcent(e.target.value);
    const values = (data.baseAmountView * +e.target.value) / 100;
    setValue(values.toString());
  };

  const modalOpen = () => {
    if (modal) {
      setOpen(true);
    }
  };

  const onClose = () => {
    setOpen(false);
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
        />
      </CSSTransition>
      <TableBody onClick={modalOpen}>
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
              placeholder={
                value
                  ? ((+value / data.baseAmountView) * 100).toFixed(1)
                  : ((data.payAmount / data.baseAmount) * 100).toFixed(1)
              }
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
          {data.deposit.paymentRatio * 100}%
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
            <Checkbox
              checked={disabled}
              onChange={() => paymentsConfirm(data.safeId)}
            />
          ) : disabled ? (
            <Button greenOutline style={disabled && { color: "#c4c4c4" }}>
              Подтверждено
            </Button>
          ) : (
            <Button dangerOutline onClick={() => paymentsConfirm(data.safeId)}>
              Подтвердить
            </Button>
          )}
        </TableBodyItem>
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
  color: rgba(81, 81, 114, 0.6);
  width: 100%;

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
    max-width: 110px;
  }
  &:nth-child(3) {
    max-width: 110px;
    @media (max-width: 992px) {
      display: none;
    }
  }
  &:nth-child(4) {
    max-width: 95px;
    @media (max-width: 768px) {
      display: none;
    }
  }
  &:nth-child(5) {
    max-width: 170px;
    @media (max-width: 992px) {
      display: none;
    }
  }
  &:nth-child(6) {
    max-width: 100px;
    @media (max-width: 576px) {
      display: none;
    }
  }
  &:nth-child(7) {
    max-width: 110px;
    @media (max-width: 576px) {
      max-width: 80px;
    }
  }
  &:nth-child(8) {
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
`;

const TableBodyItemCss = css`
  font-weight: normal;
  font-size: 14px;
  line-height: 16px;
`;

const TableBodyItem = styled(TableHeadItem)<{ dis?: boolean }>`
  ${TableBodyItemCss}
  color: ${(props) => (props.dis ? "#C4C4C4" : "#515172")};
`;
