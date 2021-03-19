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
import { TestChart } from "../../components/Charts/Test";
import { CSSTransition } from "react-transition-group";
import { Tab, Content } from "../../components/UI/Tabs";

export const AdminPortfolio = () => {
  const [card, setCard] = useState(0);
  const [active, setActive] = useState(0);

  const handleClick = (id: number) => {
    if (id !== active) {
      setActive(id);
    }
  };

  return (
    <Styled.Wrapper>
      <SideNavbar />
      <Styled.Content>
        <Styled.HeadBlock>
          <UpTitle small>Портфель</UpTitle>
          <Styled.UserName>
            <span>Admin</span>
            <Exit />
          </Styled.UserName>
        </Styled.HeadBlock>
        <ChartContainer>
          <HalfHead>
            <HalfTitle>Размер портфеля</HalfTitle>
            <HalfTabs>
              <HalfTab onClick={() => setCard(0)} card={card === 0}>
                %
              </HalfTab>
              <HalfTab>/</HalfTab>
              <HalfTab onClick={() => setCard(1)} card={card === 1}>
                CWD
              </HalfTab>
            </HalfTabs>
          </HalfHead>
          <HalfContent card={card === 0}>
            <CSSTransition
              in={card === 0}
              timeout={300}
              classNames="chart"
              unmountOnExit
            >
              <TestChart
                percent
                labels={["GCWD", "MGCWD", "Diamond"]}
                series={[200, 20, 20]}
                mobHeight={150}
                mobLegend={100}
              />
            </CSSTransition>
          </HalfContent>
          <HalfContent card={card === 1}>
            <CSSTransition
              in={card === 1}
              timeout={300}
              classNames="chart"
              unmountOnExit
            >
              <TestChart
                labels={["GCWD", "MGCWD", "Diamond"]}
                series={[200, 20, 20]}
              />
            </CSSTransition>
          </HalfContent>
        </ChartContainer>
        <TabsCard>
          <Tabs>
            <Tab onClick={() => handleClick(0)} active={active === 0}>
              GCWD
            </Tab>
            <Tab onClick={() => handleClick(1)} active={active === 1}>
              MGCWD
            </Tab>
            <Tab onClick={() => handleClick(2)} active={active === 2}>
              DIAMOND
            </Tab>
          </Tabs>
        </TabsCard>
        <FilterWrap>
          <FilterLeft>
            <Styled.FilterBlock>
              <Styled.SelectContainer>
                <Styled.SelectWrap>
                  <Styled.Label>Тип операции</Styled.Label>
                  {/* <Select /> */}
                </Styled.SelectWrap>
                <Styled.InputsWrap>
                  {/* <TestInput label="Дата" /> */}
                </Styled.InputsWrap>
                <Button danger>Применить</Button>
              </Styled.SelectContainer>
            </Styled.FilterBlock>
          </FilterLeft>
          <FilterRight>
            {/* <Select placeholder="Введите операцию" /> */}
            <ButtonWrap>
              <Button danger>Добавить</Button>
              <Button dangerOutline>Удалить</Button>
            </ButtonWrap>
          </FilterRight>
        </FilterWrap>
        <Card>
          <PaymentsTable>
            <TableHead>
              <TableHeadItem>Дата</TableHeadItem>
              <TableHeadItem>Тип операции</TableHeadItem>
              <TableHeadItem>Сумма операции</TableHeadItem>
              <TableHeadItem>
                <Filter />
              </TableHeadItem>
            </TableHead>
            <TableBody>
              <TableBodyItem>01/03/2021</TableBodyItem>
              <TableBodyItem>Торги</TableBodyItem>
              <TableBodyItem>+ 50 000</TableBodyItem>
              <TableBodyItem></TableBodyItem>
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

const PaymentsTable = styled.div`
  padding: 30px;
`;

const TableHead = styled.ul`
  list-style: none;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding-bottom: 6px;
  border-bottom: 1px solid rgba(81, 81, 114, 0.2);
  @media (max-width: 576px) {
    justify-content: space-between;
  }
`;

const TableHeadItem = styled.li`
  font-weight: normal;
  font-size: 12px;
  line-height: 14px;
  letter-spacing: 0.1px;
  color: rgba(81, 81, 114, 0.6);
  width: 100%;
  &:nth-child(1) {
    max-width: 150px;
    @media (max-width: 576px) {
      max-width: 50px;
      word-break: break-word;
    }
  }
  &:nth-child(2) {
    max-width: 200px;
    @media (max-width: 576px) {
      max-width: 74px;
    }
  }
  &:nth-child(3) {
    max-width: 110px;
    @media (max-width: 768px) {
      max-width: 80px;
    }
    @media (max-width: 576px) {
      max-width: 64px;
    }
  }
  &:nth-child(4) {
    max-width: 110px;
    text-align: right;
    margin-left: auto;
    @media (max-width: 576px) {
      max-width: 40px;
      margin-left: 0;
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

const FilterLeft = styled.div`
  max-width: 675px;
  width: 100%;
  margin-right: 20px;
  @media (max-width: 992px) {
    max-width: 100%;
    margin-right: 0px;
    ${Styled.InputsWrap} {
      margin: 0;
    }
  }
  ${Button} {
    width: 160px;
  }
  ${Styled.SelectContainer} {
    flex-wrap: wrap;
  }
`;

const FilterRight = styled(Card)`
  max-width: 432px;
  width: 100%;
  padding: 20px;
  @media (max-width: 992px) {
    max-width: 100%;
  }
`;

const ButtonWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 22px;
  ${Button} {
    width: 160px;
    margin: 0 10px 0px;
    @media (max-width: 576px) {
      margin: 0 20px 20px;
    }
  }
  @media (max-width: 576px) {
    flex-wrap: wrap;
  }
`;

const FilterWrap = styled.div`
  display: flex;
  @media (max-width: 992px) {
    flex-wrap: wrap;
  }
`;

const TabsCard = styled(Card)`
  margin-bottom: 30px;
`;

const ChartContainer = styled(Card)`
  margin-bottom: 20px;
  padding: 30px;
  .apexcharts-legend-series {
    text-align: left !important;
    width: auto !important;
  }
  @media (max-width: 768px) {
    padding: 15px 0;
  }
`;

const HalfHead = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  @media (max-width: 576px) {
    justify-content: flex-end;
  }
`;

const Tabs = styled.div`
  display: flex;
  padding: 12px 20px 0;
  @media (max-width: 768px) {
    ${Tab} {
      width: 80px;
      text-align: left;
      &:first-child {
        text-align: left;
      }
      &:last-child {
        text-align: right;
        &:before {
          left: 14px;
        }
      }
    }
  }
`;

const HalfTitle = styled.span`
  font-weight: 500;
  font-size: 20px;
  line-height: 23px;
  color: #0e0d3d;
  padding-right: 110px;
  @media (max-width: 576px) {
    display: none;
  }
`;

const HalfTabs = styled.div`
  display: flex;
  align-items: center;
`;

const HalfTab = styled.span<{ card?: boolean }>`
  font-weight: ${(props) => (props.card ? "600" : "400")};
  font-size: 20px;
  line-height: 14px;
  color: #0e0d3d;
  cursor: pointer;
  padding: 0 5px;
  text-decoration: uppercase;
`;

const MobHalfTab = styled(HalfTab)`
  border-bottom: ${(props) =>
    props.card ? "1px solid #FF416E" : "1px solid #FFF"};
  padding-bottom: 6px;
  padding-top: 20px;
  width: 50%;
  text-align: center;
`;

const HalfContent = styled.div<{ card: boolean }>`
  ${(props) => (props.card ? "" : "display:none")};
  width: 100%;
  max-width: 440px;
  margin: 0 auto;
  @media (max-width: 576px) {
    max-width: 100%;
  }
  .chart-enter {
    opacity: 0;
  }
  .chart-enter-active {
    opacity: 1;
    transform: translateX(0);
    transition: opacity 300ms;
  }
  .chart-exit {
    opacity: 1;
  }
  .chart-exit-active {
    opacity: 0;
    transform: scale(0.9);
    transition: opacity 300ms, transform 300ms;
  }
`;
