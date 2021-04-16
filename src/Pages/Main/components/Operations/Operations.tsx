import React from "react";
import { Page } from "../../../../components/UI/Page";
import { H1 } from "../../../../components/UI/MainStyled";
import { Card, Container } from "../../../../globalStyles";
import styled from "styled-components/macro";
import { Button } from "../../../../components/Button/Button";

export const Operations = () => {
  return (
    <Page>
      <Container>
        <H1>Последние операции</H1>
      </Container>
      <TableContainer>
        <TableList>
          <TableItemHead>Дата</TableItemHead>
          <TableItemHead>Тип операции</TableItemHead>
          <TableItemHead>Сумма операции</TableItemHead>
        </TableList>
        <TableList card>
          <TableItem>10.04.2021</TableItem>
          <TableItem>
            <Text>
              открытие депозита по программе &nbsp;<span>INFINITY</span>
            </Text>
          </TableItem>
          <TableItem>
            <Value>2 000 CWD</Value>
          </TableItem>
        </TableList>
        <TableList card>
          <TableItem>10.04.2021</TableItem>
          <TableItem>
            <Text>
              открытие депозита по программе &nbsp;<span>INFINITY</span>
            </Text>
          </TableItem>
          <TableItem>
            <Value>2 000 CWD</Value>
          </TableItem>
        </TableList>
        {/* <TableList card>
          <TableItem>10.04.2021</TableItem>
          <TableItem>
            <Text>
              открытие депозита по программе &nbsp;<span>INFINITY</span>
            </Text>
          </TableItem>
          <TableItem>
            <Value>
              2 000 <span>CWD</span>
            </Value>
          </TableItem>
        </TableList> */}
        <Button dangerOutline>Показать еще</Button>
      </TableContainer>
    </Page>
  );
};

const TableContainer = styled(Container)`
  display: flex;
  flex-direction: column;
  ${Button} {
    margin: 30px auto;
    width: 160px;
  }
`;

const TableList = styled.ul<{ card?: boolean }>`
  list-style: none;
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: space-between;
  padding: 10px 50px;
  margin-bottom: 18px;
  @media (max-width: 992px) {
    padding: 10px 15px;
  }
  @media (max-width: 768px) {
    padding: 10px 5px;
  }
  ${(props) => {
    if (props.card) {
      return `
            background: rgba(255, 255, 255, .8);
            box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.25);
            border-radius: 20px;
          `;
    }
  }}
`;

const TableItem = styled.li`
  letter-spacing: 0.1px;
  font-weight: normal;
  font-size: 18px;
  line-height: 21px;
  width: 100%;
  color: #515172;
  padding-right: 10px;
  @media (max-width: 768px) {
    font-size: 14px;
    line-height: 16px;
  }
  &:nth-child(1) {
    max-width: 150px;
    @media (max-width: 576px) {
      max-width: 77px;
    }
  }
  &:nth-child(2) {
    max-width: 470px;
  }
  &:nth-child(3) {
    max-width: 240px;
  }
`;

const TableItemHead = styled(TableItem)`
  color: rgba(81, 81, 114, 0.8);
`;

const Value = styled.div`
  font-weight: 500;
  font-size: 24px;
  line-height: 28px;
  display: flex;
  align-items: center;
  letter-spacing: 0.1px;
  text-transform: uppercase;
  color: #ff416e;
  @media (max-width: 768px) {
    font-size: 14px;
    line-height: 16px;
  }
  @media (max-width: 576px) {
    flex-wrap: wrap;
    text-align: right;
    justify-content: flex-end;
    span {
      display: block;
      width: 100%;
    }
  }
`;

const Text = styled.div`
  font-weight: normal;
  font-size: 20px;
  line-height: 23px;
  letter-spacing: 0.1px;
  color: #515172;
  span {
    color: rgba(255, 65, 110, 1);
  }
  @media (max-width: 768px) {
    font-size: 14px;
    line-height: 16px;
  }
`;
