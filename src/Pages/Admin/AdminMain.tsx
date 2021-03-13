import React from "react";
import * as Styled from "./Styled.elements";
import styled, { css } from "styled-components/macro";
import { SideNavbar } from "../../components/SideNav";
import { Card } from "../../globalStyles";
import {
  ColumnChart,
  ColumnChartThree,
  ColumnChartTwo,
} from "../../components/Charts/Test";
import { UpTitle } from "../../components/UI/UpTitle";
import "react-day-picker/lib/style.css";
import { ReactComponent as Exit } from "../../assets/svg/exit.svg";
import { Calendar } from "../../components/UI/DayPicker";

export const AdminMain = () => {
  return (
    <Styled.Wrapper>
      <SideNavbar />
      <Styled.Content>
        <Styled.HeadBlock>
          <UpTitle small>Главный экран</UpTitle>
          <Styled.UserName>
            <span>Admin</span>
            <Exit />
          </Styled.UserName>
        </Styled.HeadBlock>
        <CardAdmin>
          <MainChartsContainer>
            <ChartItem>
              <ChartItemHead>
                <ChartItemTitle small>Новые депозиты</ChartItemTitle>
                <Styled.ChartItemDate>За январь 2021</Styled.ChartItemDate>
              </ChartItemHead>
              <ColumnChart />
            </ChartItem>
            <ChartItem>
              <ChartItemHead>
                <ChartItemTitle small>Выплаты</ChartItemTitle>
                <Styled.ChartItemDate>За февраль 2021 г.</Styled.ChartItemDate>
              </ChartItemHead>
              <ColumnChartTwo />
            </ChartItem>
            <ChartItem>
              <ChartItemHead>
                <ChartItemTitle small>Доходность фонда</ChartItemTitle>
                <Styled.ChartItemDate>За все время</Styled.ChartItemDate>
              </ChartItemHead>
              <ColumnChartThree />
            </ChartItem>
          </MainChartsContainer>
        </CardAdmin>
        <CardDeposites>
          <Calendar />
          <Deposites>
            <DepositItem>
              <DepositTitle>Количество депозитов</DepositTitle>
              <DepositValue>1 200</DepositValue>
            </DepositItem>
            <DepositItem>
              <DepositTitle>Размер депозитов</DepositTitle>
              <DepositValue>10 450</DepositValue>
            </DepositItem>
          </Deposites>
        </CardDeposites>
      </Styled.Content>
    </Styled.Wrapper>
  );
};

const CardAdmin = styled(Card)`
  @media (max-width: 768px) {
    flex-wrap: wrap;
    background: transparent;
    box-shadow: none;
  }
`;

const MainChartsContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  flex-wrap: wrap;
  @media (max-width: 1330px) {
    justify-content: center;
  }
`;

const ChartItem = styled.div`
  max-width: 335px;
  width: 100%;
  flex: 1;
  padding-right: 30px;
  &:last-child {
  }
  @media (max-width: 768px) {
    max-width: 100%;
    flex: none;
    background: #fff;
    box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.25);
    border-radius: 10px;
    margin-bottom: 20px;
    padding-right: 0;
  }
  @media (max-width: 340px) {
    max-width: 280px;
  }
`;

const ChartItemHead = styled.div`
  display: flex;
  align-items: center;
  padding-top: 23px;
  justify-content: space-between;
  @media (max-width: 768px) {
    flex-wrap: wrap;
    justify-content: center;
  }
`;

const ChartItemTitle = styled(UpTitle)`
  margin-bottom: 0;
  white-space: nowrap;
  &:before {
    width: 30%;
  }
  @media (max-width: 1200px) {
    &:before {
      width: 12%;
    }
  }
  @media (max-width: 768px) {
    margin: 0 auto 12px;
    text-align: center;
    width: 100%;
    &:before {
      width: 0;
      margin: 0;
    }
  }
`;

const icon = css`
  position: absolute;
  top: 28px;
  cursor: pointer;
`;

const Deposites = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  flex-direction: column;
  padding: 0 10px;
  @media (max-width: 992px) {
    flex: none;
    width: 100%;
  }
  @media (max-width: 768px) {
    flex-direction: row;
  }
`;

const DepositItem = styled.div`
  @media (max-width: 768px) {
    width: 50%;
    text-align: left;
    padding-right: 15px;
  }
`;

const DepositTitle = styled.div`
  font-weight: 500;
  font-size: 36px;
  line-height: 42px;
  text-align: center;
  color: #0e0d3d;
  @media (max-width: 1150px) {
    font-size: 32px;
    line-height: 38px;
  }
  @media (max-width: 768px) {
    margin: 0 auto;
    width: 100%;
    font-size: 14px;
    line-height: 16px;
    padding-bottom: 6px;
    text-align: left;
  }
`;

const DepositValue = styled.div`
  font-weight: 500;
  font-size: 72px;
  line-height: 84px;
  text-align: center;
  color: #ff416e;
  @media (max-width: 1150px) {
    font-size: 60px;
    line-height: 72px;
  }
  @media (max-width: 768px) {
    font-size: 18px;
    line-height: 21px;
    text-align: left;
  }
`;

const CardDeposites = styled(Card)`
  display: flex;
  min-height: 480px;
  justify-content: space-between;
  @media (max-width: 992px) {
    flex-wrap: wrap;
    background: transparent;
    box-shadow: none;
    min-height: auto;
  }
`;
