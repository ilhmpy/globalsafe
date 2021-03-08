import React, { useState } from "react";
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
import DayPicker from "react-day-picker";
import "react-day-picker/lib/style.css";
import { ReactComponent as Right } from "../../assets/svg/monthRight.svg";
import { ReactComponent as Left } from "../../assets/svg/monthLeft.svg";
import { ReactComponent as Exit } from "../../assets/svg/exit.svg";

function Navbar({
  nextMonth,
  previousMonth,
  onPreviousClick,
  onNextClick,
  className,
  localeUtils,
}: any) {
  const months = localeUtils.getMonths();
  const prev = months[previousMonth.getMonth()];
  const next = months[nextMonth.getMonth()];

  return (
    <div className={className}>
      <ArrowLeft onClick={() => onPreviousClick()} />
      <ArrowRight onClick={() => onNextClick()} />
    </div>
  );
}

export const AdminMain = () => {
  const [selectedDay, setSelectedDay] = useState<any>(null);

  const handleDayClick = (day: any, { selected }: any) => {
    console.log("day", day.valueOf());
    console.log("selected", selected);
    setSelectedDay(selected ? undefined : day);
  };
  const WEEKDAYS_SHORT = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];

  const MONTHS = [
    "Январь",
    "Февраль",
    "Март",
    "Апрель",
    "Май",
    "Июнь",
    "Июль",
    "Август",
    "Сентябрь",
    "Октябрь",
    "Ноябрь",
    "Декабрь",
  ];

  const WEEKDAYS_LONG = [
    "Понедельник",
    "Вторник",
    "Среда",
    "Четверг",
    "Пятница",
    "Суббота",
    "Воскресенье",
  ];
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
          <CustomDatePicker
            months={MONTHS}
            weekdaysLong={WEEKDAYS_LONG}
            weekdaysShort={WEEKDAYS_SHORT}
            navbarElement={<Navbar />}
            selectedDays={selectedDay}
            onDayClick={handleDayClick}
          />
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
  &::last-child {
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

const CustomDatePicker = styled(DayPicker)`
  background: #ffffff;
  border: 1px solid #e5e5e5;
  box-sizing: border-box;
  border-radius: 4px;
  margin: 30px;
  @media (max-width: 992px) {
    margin: 0 auto 20px;
    background: #fff;
    box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.25);
    border-radius: 10px;
    width: 100%;
  }
  .DayPicker-Caption,
  .DayPicker-Caption > div {
    text-align: center;
    font-weight: 500;
    font-size: 14px;
    line-height: 21px;
    letter-spacing: 0.1px;
    color: #0e0d3d;
    font-family: "Roboto", sans-serif;
  }
  .DayPicker-Caption {
    margin-bottom: 13px;
    margin-top: 9px;
  }
  .DayPicker-Day {
    color: #0e0d3d;
    font-weight: normal;
    font-size: 16px;
    line-height: 24px;
    padding: 4px 7px;
    width: 48px;
    height: 48px;
    margin: 5px;
    &:focus {
      outline: none;
    }
    @media (max-width: 576px) {
      width: 32px;
      height: 32px;
      margin: 0px;
      padding: 5px 0px;
    }
  }
  .DayPicker-Day--selected:not(.DayPicker-Day--disabled):not(.DayPicker-Day--outside) {
    background: #ff416e;
    color: #fff;
  }
  .DayPicker-Day--today {
    color: #d0021b;
    font-weight: 700;
  }
  .DayPicker-Weekday {
    font-size: 12px;
    line-height: 15px;
    text-align: center;
    letter-spacing: 0.4px;
    color: #515172;
    padding: 0 16px;
    @media (max-width: 992px) {
      padding: 0 9px;
    }
  }
  .DayPicker-Weekdays {
    display: table-caption;
    margin-bottom: 15px;
  }
  .DayPicker-Months:focus,
  .DayPicker-Month:focus,
  .DayPicker:focus,
  .DayPicker-wrapper:focus {
    outline: none;
  }
`;

const icon = css`
  position: absolute;
  top: 28px;
  cursor: pointer;
`;

const ArrowLeft = styled(Left)`
  ${icon}
  left:24px;
`;

const ArrowRight = styled(Right)`
  ${icon}
  right:24px;
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
  }
`;

const CardDeposites = styled(Card)`
  display: flex;
  justify-content: space-between;
  @media (max-width: 992px) {
    flex-wrap: wrap;
    background: transparent;
    box-shadow: none;
  }
`;
