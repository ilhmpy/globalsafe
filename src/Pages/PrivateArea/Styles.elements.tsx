import styled from "styled-components/macro";
import { Button } from "../../components/Button/Button";
import { ReactComponent as Left } from "../../assets/svg/left.svg";
import { Link } from "react-router-dom";
import { Card } from "../../globalStyles";

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

export const InfoTitle = styled.h4`
  font-weight: 500;
  font-size: 18px;
  line-height: 21px;
  color: #0e0d3d;
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

export const Tabs = styled.div`
  overflow: hidden;
  background: #fff;
  padding-left: 90px;
  border-top: 1px solid rgba(196, 196, 196, 0.2);
  border-radius: 0 0 20px 20px;
  @media (max-width: 575px) {
    padding-left: 20px;
    display: flex;
    justify-content: space-between;
  }
`;

export const Tab = styled.button<{ active: boolean }>`
  border: none;
  outline: none;
  cursor: pointer;
  position: relative;
  font-weight: ${(props) => (props.active ? "600" : "400")};
  font-size: 14px;
  line-height: 16px;
  padding: 12px 0;
  width: 120px;
  color: #0e0d3d;
  text-align: left;
  background: transparent;
  @media (max-width: 992px) {
    padding-left: 0px;
    width: 80px;
    text-align: center;
    &:first-child {
      width: 90px;
    }
    &:last-child {
      padding-right: 0px;
    }
  }
  &:hover {
    background-color: white;
  }
  &:before {
    content: "";
    position: absolute;
    bottom: 0;
    display: ${(props) => (props.active ? "block" : "none")};
    left: 0;
    height: 1px;
    width: 46px;
    background: #ff416e;
    border-radius: 0px 2px 2px 0px;
  }
`;
export const Content = styled.div<{ active: boolean }>`
  ${(props) => (props.active ? "" : "display:none")}
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
  flex: 1;
  margin: 10px;
  padding: 30px;
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

export const HalfContent = styled.div<{ card: boolean }>`
  ${(props) => (props.card ? "" : "display:none")}
`;
