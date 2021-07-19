import styled from "styled-components/macro";
import { Button } from "../../components/Button/Button";
import { ReactComponent as Left } from "../../assets/svg/left.svg";
import { Link } from "react-router-dom";
import { Card, Container } from "../../globalStyles";
import { ReactComponent as BackIcon } from "../../assets/svg/arrowLeftModal.svg";
import { NavLink } from "react-router-dom";

export const ToLink = styled.a`
  color: #ff416e;
  font-weight: 500;
  font-size: 14px;
  text-align: center;
  width: 100%;
`;

export const InnerChart = styled(Card)`
  margin-bottom: 0;
  border-radius: 20px 20px 0 0;
  @media (max-width: 768px) {
    margin-bottom: 20px;
    background: transparent;
    box-shadow: none;
  }
`;

export const InnerTable = styled(Card)`
  margin-bottom: 0;
  border-radius: 0 0 20px 20px;
  @media (max-width: 768px) {
    border-radius: 20px;
  }
`;

export const ContainerChart = styled(Container)`
  height: 164px;
`;

export const Loader = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.2);
  display: block;
  z-index: 9999999;
  overflow: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const TopUpButton = styled(Button)`
  margin-right: auto;
  background: ${(props) => props.theme.topUpButton};
  color: ${(props) => props.theme.topUpColor};
  &:hover {
    background: ${(props) => props.theme.topUpButton};
  }
  @media (max-width: 992px) {
    margin-left: auto;
  }
`;

export const ModalDividends = styled.div`
  padding: 20px 10px 0px;
`;

export const Hr = styled.hr`
  margin-top: 10px;
  background: rgba(66, 139, 202, 0.2);
`;

export const PayText = styled.p<{ small?: boolean; wbold?: boolean }>`
  font-weight: ${(props) => (props.wbold ? "500" : "400")};
  font-size: ${(props) => (props.small ? "12px" : "14px")};
  line-height: ${(props) => (props.small ? "21px" : "16px")};
  letter-spacing: 0.1px;
  color: ${(props) => (props.small ? props.theme.thHead : props.theme.text2)};
`;

export const PayCardBlock = styled.div`
  margin-bottom: 20px;
  &:focus,
  &:active {
    outline: none;
    border-radius: 24px;
    background: transparent;
  }
  ${Button} {
    margin-left: auto;
    margin-right: auto;
  }
  div {
    justify-content: space-between;
  }
  @media (max-width: 576px) {
    svg {
      display: block;
    }
  }
  input {
    background: #fafafa;
    &:focus {
      padding: 0;
      border: 0;
      background: #fafafa;
      font-size: 14px;
      line-height: 16px;
    }
  }
`;

const activeclassname = "active";

export const NavTabs = styled(NavLink).attrs({ activeclassname })`
  display: inline-block;
  div {
    border: none;
    outline: none;
    cursor: pointer;
    position: relative;
    font-weight: 400;
    font-size: 14px;
    line-height: 16px;
    color: ${(props) => props.theme.text};
    padding: 12px 0;
    width: 120px;
    text-align: left;
    background: transparent;
    position: relative;
    @media (max-width: 992px) {
      padding-left: 0px;
      width: 80px;
      cursor: initial;
      &:first-child {
        width: 100px;
      }
      &:last-child {
        padding-right: 0px;
      }
    }
  }
  &.${activeclassname} {
    div {
      font-weight: 600;
    }
    div:before {
      content: "";
      position: absolute;
      bottom: 0;
      display: block;
      left: 0;
      height: 1px;
      width: 46px;
      background: #ff416e;
      border-radius: 0px 2px 2px 0px;
    }
  }
`;

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
  path {
    fill: ${(props) => props.theme.text};
    fill-opacity: 1;
  }
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
  color: ${(props) => props.theme.nextPay};
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
  color: ${(props) => props.theme.text2};
  font-weight: 500;
  font-size: 14px;
  line-height: 16px;
`;

export const LeftIcon = styled(Left)`
  margin-right: 12px;
  fill: ${(props) => props.theme.text};
  path {
    stroke: ${(props) => props.theme.text};
  }
`;

export const Page = styled.div`
  margin-top: 100px;
  height: 100%;
`;

export const InfoWrap = styled.div`
  padding: 30px 90px 0px;
  display: flex;
  align-items: flex-start;
  @media (max-width: 992px) {
    padding: 20px 20px 0px;
  }
`;

export const UserBlock = styled.div``;

export const InfoTitle = styled.h4`
  font-weight: 500;
  font-size: 18px;
  line-height: 21px;
  margin-bottom: 20px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 350px;
  @media (max-width: 576px) {
    max-width: 80px;
  }
`;

export const InfoButtons = styled.div`
  margin-left: auto;
  display: flex;
  flex-direction: column;
  width: 180px;
  ${Button} {
    margin-bottom: 15px;
    min-width: 133px;
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
  color: ${(props) => (props.pink ? "#FF416E" : props.theme.text)};
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
  color: ${(props) => (props.active ? "#FF416E" : props.theme.text)};
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

export const DataListItem = styled.div<{ divident?: boolean }>`
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
  ${(props) => {
    if (props.divident) {
      return `
      transition: .3s;
      cursor: pointer;
      @media (max-width: 992px){
        cursor: relative;
      }
      &:hover{
        background: rgba(0,0,0,0.05);
      }
      `;
    }
  }}
`;

export const DataListName = styled.span`
  font-weight: normal;
  font-size: 14px;
  line-height: 16px;
  display: flex;
  align-items: center;
  letter-spacing: 0.1px;
  color: ${(props) => props.theme.text2};
`;

export const DataListHead = styled.div`
  ${DataListName} {
    font-weight: normal;
    font-size: 12px;
    line-height: 14px;
    letter-spacing: 0.1px;
    color: ${(props) => props.theme.thHead};
  }
  ${DataListItem} {
    padding-bottom: 9px;
  }
`;

export const DataListSum = styled.div<{ plus?: boolean }>`
  color: ${(props) => (props.plus ? "#FF416E" : props.theme.text2)};
  white-space: nowrap;
  padding-left: 20px;
  text-align: right;
`;

export const DataListDate = styled.div`
  margin: 10px auto;
  font-weight: normal;
  font-size: 12px;
  line-height: 14px;
  padding: 10px 6px;
  background: transparent;
  width: 125px;
  text-align: center;
  border: 1px solid #ff416e;
  border-radius: 24px;
`;

export const ModalButton = styled(Button)<{ mb?: boolean }>`
  max-width: 100%;
  color: #fff;
  width: 100%;
  margin-bottom: ${(props) => (props.mb ? "20px" : "0")};
  &:disabled {
    color: ${(props) => props.theme.cdis};
    background: ${(props) => props.theme.bbdis};
  }
`;

export const ModalBlock = styled.div`
  max-width: 235px;
  width: 100%;
  margin: 0 auto;
  padding: 50px 10px;
  padding-bottom: 5px;

  & > input {
    margin-bottom: 32px;
  }
`;

export const ModalBlockWide = styled(ModalBlock)`
  max-width: 380px;
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
  padding-bottom: 26px;
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
  color: ${(props) => props.theme.text2};
  opacity: 0.4;
  text-align: center;
  padding-bottom: 5px;
  padding-top: 10px;
`;

export const DateText = styled.p<{ red?: boolean }>`
  font-weight: normal;
  font-size: 18px;
  line-height: 21px;
  color: ${(props) => (props.red ? "#FF416E" : props.theme.text2)};
  text-align: center;
  transition: 0.3s;
  cursor: pointer;
  @media (max-width: 992px) {
    cursor: initial;
  }
  &:hover {
    color: #ff416e;
  }
`;

export const ModalList = styled.ul`
  list-style: none;
  width: 100%;
  margin-bottom: 10px;
`;

export const ModalListButton = styled(Button)`
  margin-left: auto;
  margin-right: auto;
  width: 180px;
`;

export const ModalListText = styled.div<{ head?: boolean }>`
  font-weight: normal;
  width: 33.333%;
  font-size: 14px;
  line-height: 16px;
  letter-spacing: 0.1px;
  padding-right: 5px;
  color: ${(props) =>
    props.head ? props.theme.depositHead : props.theme.text2};
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

export const Program = styled.div`
  font-weight: bold;
  font-size: 14px;
  line-height: 16px;
  text-align: center;
  margin: 15px 0 20px;
  letter-spacing: 0.1px;
  color: ${(props) => props.theme.text2};
  cursor: pointer;
  transition: 0.3s;
  &:hover {
    color: #ff416e;
  }
  @media (max-width: 992px) {
    cursor: initial;
  }
`;

export const Warning = styled.div`
  font-weight: 500;
  font-size: 14px;
  line-height: 16px;
  letter-spacing: 0.1px;
  color: #ff416e;
  text-align: left;
  margin-bottom: 15px;
  bdi {
    color: #6db9ff;
  }
`;

export const Conditions = styled.div<{ open?: boolean }>`
  font-weight: normal;
  font-size: 14px;
  line-height: 16px;
  letter-spacing: 0.1px;
  color: #56657f;
  overflow: hidden;
  max-height: ${(props) => (props.open ? "auto" : "0")};
  transition: max-heihgt 0.3s;
  width: 100%;
  p {
    margin-bottom: 10px;
  }
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
  margin-left: auto;
  margin-right: auto;
  padding-bottom: 40px;
  width: 200px;
  @media (max-width: 576px) {
    flex-wrap: wrap;
  }
`;

export const ModalDepositsWrap = styled.div`
  width: 540px;
`;

export const SmallButton = styled.a<{ color: string }>`
  border-radius: 24px;
  font-weight: normal;
  font-size: 10px;
  line-height: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: #ffffff;
  padding: 4px 10px;
  transition: 0.3s;
  background: ${(props) => props.color};
`;

export const SmallButtonsWrap = styled.div`
  display: flex;
  align-items: center;
  padding-left: 0px;
  @media (max-width: 992px) {
    padding-left: 0px;
    flex-wrap: wrap;
  }
  padding-bottom: 5px;
  ${SmallButton} {
    margin-right: 7px;
    margin-bottom: 8px;
    min-width: 73px;
  }
`;

export const SmallButtonsWrapDesc = styled.div`
  display: block;
  @media (max-width: 576px) {
    display: none;
  }
`;

export const SmallButtonsWrapMob = styled.div`
  display: none;
  @media (max-width: 576px) {
    display: block;
    ${SmallButtonsWrap} {
      padding-left: 20px;
    }
  }
`;

export const SmallRoundButton = styled.div`
  height: 20px;
  width: 20px;
  margin-left: 5px;
  display: inline-block;
  border-radius: 50%;
  padding: 2px;
  /* border: 1px solid #333; */
  background-color: #fff;
  text-align: center;
  cursor: pointer;
  &:hover path {
    fill: #6db9ff;
  }
`;

export const ModalCommision = styled.h3`
  font-weight: 400;
  line-height: 22px;
  font-size: 1em;
  text-align: center;

  &:first-child {
    margin-top: 20px;
  }
`;

export const ModalCommisionCount = styled.h3`
  color: #FF416E;
  font-size: inherit;
`;

export const ModalCommisionBox = styled.div`
  width: 100%;
  padding-top: 1px;
`;
