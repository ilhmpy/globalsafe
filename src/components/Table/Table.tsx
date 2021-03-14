import React, { useState, useContext, useEffect } from "react";
import { AppContext } from "../../context/HubContext";
import styled from "styled-components/macro";
import { ReactComponent as Filter } from "../../assets/svg/filter.svg";
import * as Styled from "./Table.styled";
import moment from "moment";
import "moment/locale/ru";
import { Balance } from "../../types/balance";
import { useHistory } from "react-router-dom";

import { TableModal } from "./TableModal";
import { FilterMenu } from "../FilterMenu/FilterMenu";
moment.locale("ru");

const Row = ({ data }: any) => {
  const [open, setOpen] = useState<boolean | string>(false);
  const history = useHistory();
  const onClose = () => {
    setOpen(false);
  };

  const onClick = (id: string) => {
    if (window.innerWidth < 992) {
      history.push(`info/${id}`);
    } else {
      setOpen(data.safeId);
    }
  };

  return (
    <>
      <Styled.TR
        key={data.safeId}
        onClick={() => onClick(data.safeId)}
        disactive={data.state === 4}
      >
        <Styled.TD>
          <Styled.Name>{data.deposit.name}</Styled.Name>
          <Styled.NameData>
            <Styled.NameData>
              {moment(data.creationDate).format("DD/MM/YYYY")}
            </Styled.NameData>{" "}
            <Styled.NameData>&nbsp; - &nbsp;</Styled.NameData>
            <Styled.NameData
              green={moment.valueOf() > moment(data.endDate).valueOf()}
            >
              {moment(data.endDate).format("DD/MM/YYYY")}
            </Styled.NameData>
          </Styled.NameData>
        </Styled.TD>
        <Styled.TD>
          <Styled.Text>{data.deposit.description}</Styled.Text>
        </Styled.TD>
        <Styled.TD>
          <Styled.Text>{data.amountView}</Styled.Text>
          <Styled.Text>{Balance[data.deposit.asset]}</Styled.Text>
        </Styled.TD>
        <Styled.TD>
          <Styled.Text>
            {data.paymentAmountView
              ? data.paymentAmountView.toString().length > 15
                ? data.paymentAmountView.toFixed(7)
                : data.paymentAmountView
              : "-"}
          </Styled.Text>
          {data.paymentAmountView && (
            <Styled.Text>{Balance[data.deposit.asset]}</Styled.Text>
          )}
        </Styled.TD>
        <Styled.TD>
          <Styled.Text>
            {data.paymentDate
              ? moment(data.paymentDate).format("DD MMMM YYYY")
              : "-"}
          </Styled.Text>
        </Styled.TD>
      </Styled.TR>
      <TableModal onClose={onClose} open={open} data={data} />
    </>
  );
};

export const Tables = ({ list }: any) => {
  const [num, setNum] = useState(5);

  const appContext = useContext(AppContext);
  const hubConnection = appContext.hubConnection;
  const filterClick = (id: number) => {
    console.log("click", id);
  };
  // console.log("list", list);

  return (
    <Styled.TableWrap>
      {/* <FilterMenu filterClick={filterClick} /> */}
      <Styled.Table>
        <thead style={{ position: "relative" }}>
          <Styled.TR>
            <Styled.TH>Название</Styled.TH>
            <Styled.TH>Описание</Styled.TH>
            <Styled.TH>Депозит</Styled.TH>
            <Styled.TH>Пл. выплата</Styled.TH>
            <Styled.TH>
              <p>Дата следующей выплаты</p>
              <span>Дата след. выплаты</span>
              <Styled.StyledFilter />
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
