import React, { useState, useContext, useEffect } from "react";
import * as Styled from "./Styled.elements";
import styled, { css } from "styled-components/macro";
import { Card } from "../../globalStyles";
import { CSSTransition } from "react-transition-group";
import { useTranslation } from "react-i18next";
import InfiniteScroll from "react-infinite-scroller";
import { Scrollbars } from "react-custom-scrollbars";
import { Loading } from "../../components/UI/Loading";
import { AppContext } from "../../context/HubContext";
import { UpTitle } from "../../components/UI/UpTitle";
import { Select } from "../../components/Select/Select2";
import { TestInput } from "../../components/UI/DayPicker";
import { Button } from "../../components/Button/Button";
import { OpenDate } from "../../types/dates";
import { DateInput } from "../../components/UI/DatePicker";

export const AdminLottery = () => {
  const [openFilter, setOpenFilter] = useState(false);
  const [name, setName] = useState("");
  const [openDate, setOpenDate] = useState<OpenDate>({
    from: undefined,
    to: undefined,
  });

  const { t } = useTranslation();
  return (
    <div>
      <div>
        <Styled.FilterBlock>
          <Styled.FilterHeader>
            <Styled.FilterName>Новый розыгрыш</Styled.FilterName>
            <Styled.ShowHide onClick={() => setOpenFilter(!openFilter)}>
              {openFilter ? t("hide") : t("show")}
            </Styled.ShowHide>
          </Styled.FilterHeader>
          <CSSTransition
            in={openFilter}
            timeout={200}
            classNames="filter"
            unmountOnExit
          >
            <Styled.SelectContainer>
              <Styled.SelectContainerInnerPaid>
                <Styled.SelectWrap style={{ minWidth: 263 }}>
                  <Styled.Label>{t("adminPay.filter.user")}</Styled.Label>
                  <Styled.Input
                    value={name}
                    onChange={(e) => setName(e.target.value.toLowerCase())}
                  />
                </Styled.SelectWrap>
                <Styled.SelectWrap input>
                  <TestInput
                    setOpenDate={setOpenDate}
                    openDate={openDate}
                    label={t("adminPay.filter.date")}
                  />
                </Styled.SelectWrap>
                <Styled.SelectWrap style={{ minWidth: 263 }}>
                  {/* <Styled.Label>{t("adminPay.filter.deposit")}</Styled.Label> */}
                  <DateInput />
                  {/* <Select
                    checkList={checkList}
                    setCheckList={setCheckList}
                    values={listDeposits}
                  /> */}
                </Styled.SelectWrap>
              </Styled.SelectContainerInnerPaid>
              <Button danger>{t("adminUsers.apply")}</Button>
            </Styled.SelectContainer>
          </CSSTransition>
        </Styled.FilterBlock>
      </div>
    </div>
  );
};
