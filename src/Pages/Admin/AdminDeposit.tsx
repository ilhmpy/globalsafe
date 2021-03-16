import React, { useState } from "react";
import * as Styled from "./Styled.elements";
import styled, { css } from "styled-components/macro";
import { SideNavbar } from "../../components/SideNav";
import { Card } from "../../globalStyles";
import { UpTitle } from "../../components/UI/UpTitle";
import { ReactComponent as Exit } from "../../assets/svg/exit.svg";
import { ReactComponent as Filter } from "../../assets/svg/filter.svg";
import { HalfRoundBorder } from "../../components/UI/HalfRound";
import useWindowSize from "../../hooks/useWindowSize";
import { Select } from "../../components/Select/Select";
import { TestInput } from "../../components/UI/DayPicker";
import { Button } from "../../components/Button/Button";
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from "swiper";
import "swiper/swiper.scss";
import "swiper/components/navigation/navigation.scss";
import "swiper/components/pagination/pagination.scss";
import "swiper/components/scrollbar/scrollbar.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import { FilterMenu } from "../../components/FilterMenu/FilterMenu";
SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);

const data = [
  {
    id: 1,
    name: "Депозит #1",
    value: 1700000,
    halfValue: 16,
    color: "#BCD476",
  },
  { id: 2, name: "Депозит #2", value: 600000, halfValue: 3, color: "#6DB9FF" },
  { id: 3, name: "Депозит #3", value: 900000, halfValue: 9, color: "#FF416E" },
  {
    id: 4,
    name: "Депозит #4",
    value: 9800000,
    halfValue: 11,
    color: "#A78CF2",
  },
  {
    id: 5,
    name: "Депозит #5",
    value: 9800000,
    halfValue: 11,
    color: "#F28CE8",
  },
  { id: 6, name: "Депозит #6", value: 60000, halfValue: 4, color: "#BCD476" },
  { id: 7, name: "Депозит #7", value: 10000, halfValue: 1, color: "#6DB9FF" },
  { id: 8, name: "Депозит #8", value: 550000, halfValue: 54, color: "#FF416E" },
  { id: 9, name: "Депозит #9", value: 100000, halfValue: 8, color: "#A78CF2" },
  {
    id: 10,
    name: "Депозит #10",
    value: 800000,
    halfValue: 6,
    color: "#F28CE8",
  },
];

const size = 4;

const newArray: any[] = [];
for (let i = 0; i < Math.ceil(data.length / size); i++) {
  newArray[i] = data.slice(i * size, i * size + size);
}

export const AdminDeposit = () => {
  const sizes = useWindowSize();
  const size = sizes < 768;
  // const [id, setId] = useState(0)
  // console.log('id', id)
  const filterClick = (id: number) => {
    console.log("click", id);
  };
  return (
    <Styled.Wrapper>
      <SideNavbar />
      <Styled.Content>
        <Styled.HeadBlock>
          <UpTitle small>Выплаты</UpTitle>
          <Styled.UserName>
            <span>Admin</span>
            <Exit />
          </Styled.UserName>
        </Styled.HeadBlock>
        <Styled.TitleHead>Активные депозиты</Styled.TitleHead>
        <DepositWrap>
          {!size &&
            data.map((item) => (
              <DepositItem key={item.id}>
                <Styled.PayItemHead mb>
                  <UpTitle small>{item.name}</UpTitle>
                </Styled.PayItemHead>
                <RadialWrap>
                  <HalfRound>
                    <span>{item.halfValue}</span>
                    <HalfRoundBorder
                      width={size ? "47" : "90"}
                      height={size ? "63" : "123"}
                      color={item.color}
                    />
                  </HalfRound>
                  <Styled.Radial bg={item.color}>
                    <span>{item.value}</span>
                    <span>CWD</span>
                  </Styled.Radial>
                </RadialWrap>
              </DepositItem>
            ))}
          {size && (
            <MySwiperContainer>
              <Swiper
                spaceBetween={50}
                slidesPerView={1}
                pagination={{ clickable: true }}
              >
                {newArray.map((i, idx) => (
                  <SwiperSlide key={idx}>
                    <DepositItemWrap>
                      {i.map((item: any) => (
                        <DepositItemInner key={item.id}>
                          <DepositItem>
                            <Styled.PayItemHead mb>
                              <UpTitle small>{item.name}</UpTitle>
                            </Styled.PayItemHead>
                            <RadialWrap>
                              <HalfRound>
                                <span>{item.halfValue}</span>
                                <HalfRoundBorder
                                  width={"47"}
                                  height={"63"}
                                  color={item.color}
                                />
                              </HalfRound>
                              <Styled.Radial bg={item.color}>
                                <span>{item.value}</span>
                                <span>CWD</span>
                              </Styled.Radial>
                            </RadialWrap>
                          </DepositItem>
                        </DepositItemInner>
                      ))}
                    </DepositItemWrap>
                  </SwiperSlide>
                ))}
              </Swiper>
            </MySwiperContainer>
          )}
        </DepositWrap>
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
              <TestInput label="Дата открытия" />
              <TestInput label="Дата след.выплаты" />
            </Styled.InputsWrap>

            <Button danger>Применить</Button>
          </Styled.SelectContainer>
        </Styled.FilterBlock>
        <Card>
          <PaymentsTable>
            <TableHead>
              <TableHeadItem>Пользователь</TableHeadItem>
              <TableHeadItem>Название</TableHeadItem>
              <TableHeadItem>Дата открытия</TableHeadItem>
              <TableHeadItem>Дата закрытия</TableHeadItem>
              <TableHeadItem>Сумма депозита</TableHeadItem>
              <TableHeadItem>Дата след. выплаты</TableHeadItem>
              <TableHeadItem>Выплачено</TableHeadItem>
              <TableHeadItem>
                <Filter />
              </TableHeadItem>
              <FilterMenu filterClick={filterClick} />
            </TableHead>
            <TableBody>
              <TableBodyItem>Account 1</TableBodyItem>
              <TableBodyItem>Название Депозита №1</TableBodyItem>
              <TableBodyItem>01/03/2021</TableBodyItem>
              <TableBodyItem>01/03/2022</TableBodyItem>
              <TableBodyItem>140 000</TableBodyItem>
              <TableBodyItem>03/04/2021</TableBodyItem>
              <TableBodyItem>40 000</TableBodyItem>
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
  min-height: 556px;
`;

const TableHead = styled.ul`
  position: relative;
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
    @media (max-width: 768px) {
      display: none;
    }
  }
  &:nth-child(2) {
    max-width: 182px;
  }
  &:nth-child(3) {
    max-width: 110px;
    @media (max-width: 992px) {
      display: none;
    }
  }
  &:nth-child(4) {
    max-width: 110px;
    @media (max-width: 768px) {
      display: none;
    }
  }
  &:nth-child(5) {
    max-width: 110px;
    @media (max-width: 992px) {
      display: none;
    }
  }
  &:nth-child(6) {
    max-width: 120px;
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
    max-width: 40px;
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

const DateLabel = styled.div`
  position: relative;
  border: 1px solid rgba(86, 101, 127, 0.3);
  box-sizing: border-box;
  border-radius: 2px;
`;

const DepositWrap = styled(Card)`
  padding: 30px 5px;
  display: flex;
  justify-content: center;
  width: 100%;
  flex-wrap: wrap;
  margin-bottom: 30px;
  @media (max-width: 576px) {
    padding: 20px 0px;
  }
`;

const HalfRound = styled.div`
  width: 122px;
  height: 122px;
  position: relative;
  @media (max-width: 768px) {
    width: 63px;
    height: 63px;
  }
  span {
    position: absolute;
    top: 33%;
    left: 9px;
    font-weight: normal;
    font-size: 36px;
    line-height: 42px;
    text-align: center;
    display: block;
    width: 63px;
    color: #000000;
    @media (max-width: 768px) {
      font-size: 14px;
      line-height: 16px;
      top: 36%;
      left: 3px;
      width: 39px;
      font-weight: bold;
    }
  }
`;

const RadialWrap = styled.div`
  display: flex;
  width: 100%;
`;

const DepositItem = styled.div`
  width: 192px;
  position: relative;
  margin: 0 12px 20px;
  @media (max-width: 768px) {
    width: 99px;
  }
  ${UpTitle} {
    margin-bottom: 0;
    margin-right: 10px;
    @media (max-width: 768px) {
      margin-right: 0px;
      &:before {
        margin-right: 4px;
      }
    }
  }
  ${Styled.Radial} {
    position: relative;
    width: 122px;
    height: 122px;
    flex: none;
    margin: 0;
    @media (max-width: 768px) {
      width: 63px;
      height: 63px;
      border-width: 3px;
    }
    span {
      font-size: 21px;
      line-height: 26px;
      text-align: right;
      color: #000000;
      @media (max-width: 768px) {
        font-size: 12px;
        line-height: 14px;
      }
    }

    &:nth-child(1) {
      left: 0;
      bottom: 0;
      display: none;
      z-index: 5;
      align-items: flex-start;
    }
    &:nth-child(2) {
      right: 0;
      bottom: 0;
      position: absolute;
      z-index: 50;
      background: #fff;
    }
  }
`;

const DepositItemWrap = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  flex-wrap: wrap;
  justify-content: center;
`;

const DepositItemInner = styled.div`
  width: 50%;
`;

const MySwiperContainer = styled.div`
  display: block;
  width: 100%;
  margin: 0 auto;
  max-width: 1000px;
  @media (max-width: 768px) {
    max-width: 500px;
  }
  @media (max-width: 576px) {
    max-width: 280px;
  }
  ${DepositItem} {
    margin: 0 auto 20px;
  }
  .swiper-pagination-bullet {
    display: inline-block;
    width: 10px;
    height: 10px;
    font-size: 14px;
    line-height: 10px;
    background-color: rgba(81, 81, 114, 0.3);
    border-radius: 50%;
    margin-right: 10px;
    margin-top: 20px !important;
  }
  .swiper-pagination-bullet-active {
    background-color: #ff416e;
  }
  .swiper-container-horizontal > .swiper-pagination-bullets {
    bottom: -4px;
  }
`;
