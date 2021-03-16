import React, { useState } from "react";
import * as Styled from "./Styled.elements";
import styled, { css } from "styled-components/macro";
import { SideNavbar } from "../../components/SideNav";
import { Card } from "../../globalStyles";
import { UpTitle } from "../../components/UI/UpTitle";
import { ReactComponent as Exit } from "../../assets/svg/exit.svg";
import { ReactComponent as Filter } from "../../assets/svg/filter.svg";
import { Select } from "../../components/Select/Select";
import { TestInput } from "../../components/UI/DayPicker";
import { Button } from "../../components/Button/Button";
import { Checkbox } from "../../components/UI/Checkbox";
import useWindowSize from "../../hooks/useWindowSize";

export const AdminUsers = () => {
  const sizes = useWindowSize();
  const size = sizes < 992;
  return (
    <Styled.Wrapper>
      <SideNavbar />
      <Styled.Content>
        <Styled.HeadBlock>
          <UpTitle small>Пользователи</UpTitle>
          <Styled.UserName>
            <span>Admin</span>
            <Exit />
          </Styled.UserName>
        </Styled.HeadBlock>
        <Styled.FilterBlock>
          <Styled.SelectContainer>
            <Styled.SelectWrap>
              <Styled.Label>Пользователь</Styled.Label>
              <Select />
            </Styled.SelectWrap>
            <Styled.SelectWrap>
              <Styled.Label>Название программы</Styled.Label>
              <Select />
            </Styled.SelectWrap>
            <Styled.InputsWrap>
              <TestInput label="Дата создания" />
            </Styled.InputsWrap>

            <Button danger>Применить</Button>
          </Styled.SelectContainer>
        </Styled.FilterBlock>
        <Card>
          <PaymentsTable>
            <TableHead>
              <TableHeadItem>Пользователь</TableHeadItem>
              <TableHeadItem>E-mail</TableHeadItem>
              <TableHeadItem>Дата создания</TableHeadItem>
              <TableHeadItem>Язык</TableHeadItem>
              <TableHeadItem>
                <Filter />
              </TableHeadItem>
            </TableHead>
            <TableBody>
              <TableBodyItem>Account 1</TableBodyItem>
              <TableBodyItem>firstmessage.gmail.com</TableBodyItem>
              <TableBodyItem>01/03/2022</TableBodyItem>
              <TableBodyItem>Русский</TableBodyItem>
              <TableBodyItem>
                {size ? (
                  <Checkbox icon />
                ) : (
                  <Button dangerOutline>Заблокировать</Button>
                )}
              </TableBodyItem>
            </TableBody>
          </PaymentsTable>
          {/* <NotFound>
            Данные не обнаружены. Попробуйте изменить параметры поиска.
          </NotFound> */}
        </Card>
      </Styled.Content>
    </Styled.Wrapper>
  );
};

const NotFound = styled.div`
  font-weight: normal;
  font-size: 12px;
  line-height: 21px;
  padding: 30px;
  letter-spacing: 0.1px;
  min-height: 250px;
  color: #0e0d3d;
`;

const PaymentsTable = styled.div`
  padding: 30px;
`;

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
    max-width: 97px;
  }
  &:nth-child(2) {
    max-width: 182px;
    @media (max-width: 992px) {
      display: none;
    }
  }
  &:nth-child(3) {
    max-width: 110px;
    @media (max-width: 768px) {
      max-width: 80px;
    }
  }
  &:nth-child(4) {
    max-width: 110px;
    @media (max-width: 768px) {
      display: none;
    }
  }
  &:nth-child(5) {
    max-width: 130px;
    text-align: right;
    @media (max-width: 992px) {
      max-width: 40px;
    }
  }
`;

const TableBody = styled(TableHead)`
  padding: 10px 0;
`;

const TableBodyItemCss = css`
  font-weight: normal;
  font-size: 14px;
  line-height: 16px;
  color: #515172;
`;

const TableBodyItem = styled(TableHeadItem)`
  ${TableBodyItemCss}
`;
