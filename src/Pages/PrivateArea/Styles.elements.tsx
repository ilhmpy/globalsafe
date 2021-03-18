import styled from "styled-components/macro";
import { Button } from "../../components/Button/Button";
import { ReactComponent as Left } from "../../assets/svg/left.svg";
import { Link } from "react-router-dom";
import { Card, Container } from "../../globalStyles";
import { ReactComponent as BackIcon } from "../../assets/svg/arrowLeftModal.svg";

export const Select = styled.select`
  font-weight: normal;
  font-size: 18px;
  line-height: 21px;
  color: #515172;
  appearance: none;
  border: none;
  padding: 0 10px;
  text-align-last: center;
  outline: none;
  background: transparent;
`;

export const ModalBack = styled(BackIcon)`
  width: 16px;
  height: 16px;
`;

export const DateButton = styled(Button)`
  padding: 12px 15px;
`;

export const IconRotate = styled.div<{ rights?: boolean }>`
  width: 16px;
  height: 16px;
  margin-left: 10px;
  transform: ${(props) => (props.rights ? "rotate(180deg)" : "rotate(0deg)")};
`;

export const Date = styled.div`
  font-weight: bold;
  font-size: 18px;
  line-height: 21px;
  color: #0e0d3d;
  margin-left: 19px;
  @media (max-width: 768px) {
    width: 100%;
    margin-left: 0px;
  }
`;

export const NextPay = styled.div`
  margin-top: 15px;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  font-weight: 500;
  font-size: 14px;
  line-height: 16px;
  color: rgba(14, 13, 61, 0.5);
  @media (max-width: 768px) {
    flex-wrap: wrap;
    justify-content: flex-start;
    padding-left: 20px;
    padding-bottom: 20px;
    text-align: left;
  }
`;

export const Back = styled(Link)`
  margin-right: auto;
  margin-bottom: 20px;
  color: #515172;
  font-weight: 500;
  font-size: 14px;
  line-height: 16px;
`;

export const LeftIcon = styled(Left)`
  margin-right: 12px;
  fill: #515172;
`;

export const Page = styled.div`
  margin-top: 100px;
  height: 100%;
`;

export const InfoWrap = styled.div`
  padding: 30px 90px 15px;
  display: flex;
  align-items: flex-start;
  @media (max-width: 992px) {
    padding: 20px;
  }
`;

export const UserBlock = styled.div``;

export const InfoTitle = styled.h4`
  font-weight: 500;
  font-size: 18px;
  line-height: 21px;
  color: #0e0d3d;
  margin-bottom: 20px;
`;

export const InfoButtons = styled.div`
  margin-left: auto;
  display: flex;
  flex-direction: column;
  width: 180px;
  ${Button} {
    margin-bottom: 15px;
  }
  @media (max-width: 992px) {
    width: 130px;
  }
`;

export const Deposit = styled.div`
  display: flex;
  align-items: center;
  padding: 50px;
  justify-content: space-around;
  @media (max-width: 992px) {
    flex-wrap: wrap;
  }
`;

export const DepositItem = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 230px;
  @media (max-width: 992px) {
    margin-bottom: 40px;
  }
`;

export const DepositName = styled.h4`
  font-weight: 500;
  font-size: 20px;
  line-height: 23px;
  text-align: center;
  color: #0e0d3d;
  margin-bottom: 20px;
`;

export const DepositValue = styled.h4`
  font-weight: 500;
  font-size: 36px;
  line-height: 42px;
  text-align: center;
  color: #ff416e;
`;

export const Half = styled(Card)`
  width: calc(50% - 20px);
  margin: 10px;
  padding: 30px;
  @media (max-width: 992px) {
    width: 100%;
  }
`;

export const HalfHead = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

export const HalfTitle = styled.span`
  font-weight: 500;
  font-size: 20px;
  line-height: 23px;
  color: #0e0d3d;
  padding-right: 110px;
`;

export const HalfTabs = styled.div`
  display: flex;
  align-items: center;
`;

export const HalfTab = styled.span<{ card?: boolean }>`
  font-weight: ${(props) => (props.card ? "600" : "400")};
  font-size: 20px;
  line-height: 14px;
  color: #0e0d3d;
  cursor: pointer;
  padding: 0 5px;
  text-decoration: uppercase;
`;

export const MobHalfTab = styled(HalfTab)`
  border-bottom: ${(props) =>
    props.card ? "1px solid #FF416E" : "1px solid #FFF"};
  padding-bottom: 6px;
  padding-top: 20px;
  width: 50%;
  text-align: center;
`;

export const HalfContent = styled.div<{ card: boolean }>`
  ${(props) => (props.card ? "" : "display:none")};
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

export const ContainerRow = styled(Container)`
  padding-right: 0px;
  padding-left: 0px;
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 60px;
  @media (max-width: 992px) {
    padding-right: 10px;
    padding-left: 10px;
  }
`;

export const Content = styled.div<{ active?: boolean }>`
  ${(props) => (props.active ? "" : "display:none")};
  @media (max-width: 992px) {
    min-height: 350px;
    ${HalfTabs} {
      padding: 25px 10px;
    }
  }
`;

export const ChartLegend = styled.ul`
  list-style: none;
  padding-left: 20px;
  margin: 25px 0;
`;

export const Li = styled.li<{ color?: string }>`
  font-weight: normal;
  font-size: 18px;
  line-height: 24px;
  color: #0e0d3d;
  position: relative;
  padding-left: 40px;
  padding-bottom: 12px;
  &:before {
    content: "";
    left: 0;
    top: 50%;
    position: absolute;
    background: ${(props) => props.color};
    width: 15px;
    height: 15px;
    margin-top: -12.5px;
    border-radius: 50%;
  }
`;

export const BalanceList = styled.div`
  display: flex;
  width: 100%;
  max-width: 470px;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
  margin-bottom: 20px;
`;

export const BalanceItem = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
`;

export const BalanceItemName = styled.p`
  font-weight: normal;
  font-size: 14px;
  line-height: 16px;
  color: #0e0d3d;
  margin-bottom: 5px;
  @media (max-width: 992px) {
    font-size: 14px;
    line-height: 16px;
  }
`;

export const BalanceItemValue = styled.p<{ pink?: boolean }>`
  font-weight: 500;
  font-size: 24px;
  line-height: 28px;
  color: ${(props) => (props.pink ? "#FF416E" : "#0E0D3D")};
  @media (max-width: 992px) {
    font-size: 18px;
    line-height: 21px;
  }
`;

export const BalanceWrap = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  ${DateButton} {
    margin-left: 180px;
    @media (max-width: 992px) {
      margin-left: 0;
      width: 158px;
    }
  }
  @media (max-width: 992px) {
    flex-direction: column;
    justify-content: center;
    margin-bottom: 20px;
  }
`;

export const BalanceTabHead = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 22px 90px;
  @media (max-width: 768px) {
    padding: 22px 10px;
    justify-content: space-between;
    align-items: flex-end;
  }
`;

export const BalanceTabItem = styled.div<{ active?: boolean }>`
  font-weight: normal;
  font-size: 14px;
  line-height: 16px;
  padding-right: 30px;
  cursor: pointer;
  color: ${(props) => (props.active ? "#FF416E" : "#000000")};
  @media (max-width: 768px) {
    padding-right: 5px;
  }
`;

export const DataListWrap = styled.div`
  padding: 34px 90px;
  width: 100%;
  @media (max-width: 768px) {
    padding: 20px;
  }
`;

export const DataList = styled.div``;

export const DataListItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 20px;
  padding-top: 20px;
  border-bottom: 1px solid rgba(66, 139, 202, 0.2);
  @media (max-width: 768px) {
    padding-bottom: 10px;
    padding-top: 10px;
  }
`;

export const DataListName = styled.span`
  font-weight: normal;
  font-size: 14px;
  line-height: 16px;
  display: flex;
  align-items: center;
  letter-spacing: 0.1px;
  color: #515172;
`;

export const DataListHead = styled.div`
  ${DataListName} {
    font-weight: normal;
    font-size: 12px;
    line-height: 14px;
    letter-spacing: 0.1px;
    color: rgba(81, 81, 114, 0.6);
  }
  ${DataListItem} {
    padding-bottom: 9px;
  }
`;

export const DataListSum = styled.div<{ plus?: boolean }>`
  color: ${(props) => (props.plus ? "#FF416E" : "#515172")};
  white-space: nowrap;
  padding-left: 20px;
`;

export const DataListDate = styled.div`
  margin: 10px auto;
  color: #0e0d3d;
  font-weight: normal;
  font-size: 12px;
  line-height: 14px;
  padding: 10px 6px;
  background: #ffffff;
  width: 125px;
  text-align: center;
  border: 1px solid #ff416e;
  border-radius: 24px;
`;

export const ModalButton = styled(Button)<{ mb?: boolean }>`
  max-width: 100%;
  width: 100%;
  margin-bottom: ${(props) => (props.mb ? "20px" : "0")};
`;

export const ModalBlock = styled.div`
  max-width: 230px;
  width: 100%;
  margin: 0 auto;
  padding: 50px 10px;
`;

export const ModalWrap = styled.div`
  @media (max-width: 768px) {
    .close {
      display: none;
    }
  }
`;

export const Arrow = styled(Left)`
  position: absolute;
  width: 16px;
  height: 16px;
`;

export const NotFound = styled.div`
  font-weight: normal;
  font-size: 12px;
  line-height: 21px;
  padding: 30px;
  letter-spacing: 0.1px;
  min-height: 250px;
  color: #0e0d3d;
`;

export const ModalContent = styled.div`
  padding-top: 10px;
  position: relative;
`;

export const ModalTitle = styled.h3<{ mt?: boolean }>`
  font-weight: 500;
  font-size: 24px;
  line-height: 28px;
  text-align: center;
  color: #0e0d3d;
  padding-bottom: 15px;
  margin-top: ${(props) => (props.mt ? "40px" : 0)};
  @media (max-width: 768px) {
    font-size: 18px;
    line-height: 21px;
  }
`;

export const ModalItem = styled.div`
  border-bottom: 1px solid rgba(66, 139, 202, 0.2);
  padding: 0 0 10px;
`;

export const DateTitle = styled.p`
  font-weight: normal;
  font-size: 14px;
  line-height: 16px;
  color: #515172;
  opacity: 0.4;
  text-align: center;
  padding-bottom: 5px;
  padding-top: 10px;
`;

export const DateText = styled.p<{ red?: boolean }>`
  font-weight: normal;
  font-size: 18px;
  line-height: 21px;
  color: ${(props) => (props.red ? "#FF416E" : "#515172")};
  text-align: center;
`;

export const ModalList = styled.ul`
  list-style: none;
  width: 100%;
  margin-bottom: 30px;
`;

export const ModalListText = styled.div<{ head?: boolean }>`
  font-weight: normal;
  width: 33.333%;
  font-size: 14px;
  line-height: 16px;
  letter-spacing: 0.1px;
  padding-right: 5px;
  color: ${(props) => (props.head ? "rgba(86, 101, 127, 0.6)" : "#515172")};
`;

export const ModalListItem = styled.li`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid rgba(66, 139, 202, 0.3);
  padding: 9px 0;
  &:first-child {
    cursor: initial;
    border-bottom: 0;
    &:hover {
      background: transparent;
    }
  }
  &:hover:not(:first-child) {
    cursor: pointer;
    background: rgba(66, 139, 202, 0.109);
  }
`;

export const Conditions = styled.div`
  font-weight: normal;
  font-size: 14px;
  line-height: 16px;
  letter-spacing: 0.1px;
  padding-left: 40px;
  color: #56657f;
  max-width: 200px;
  width: 100%;
  @media (max-width: 576px) {
    max-width: 100%;
    margin-top: 40px;
    text-align: center;
    padding-left: 10px;
    padding-right: 10px;
  }
`;

export const ModalDeposits = styled.div`
  display: flex;
  justify-content: center;
  padding-bottom: 40px;
  @media (max-width: 576px) {
    flex-wrap: wrap;
  }
`;

export const ModalDepositsWrap = styled.div`
  width: 540px;
`;
