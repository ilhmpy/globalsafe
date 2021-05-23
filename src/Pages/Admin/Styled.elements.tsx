import styled from "styled-components/macro";
import { UpTitle } from "../../components/UI/UpTitle";
import { Card } from "../../globalStyles";
import { Button } from "../../components/Button/Button";
import { ReactComponent as Left } from "../../assets/svg/left.svg";
import { Link } from "react-router-dom";

export const Table = styled.table`
  border-collapse: collapse;
  margin: 0;
  padding: 0;
  width: 100%;
  table-layout: fixed;
`;

export const Tr = styled.tr`
  background-color: transparent;
  border-bottom: 1px solid rgba(66, 139, 202, 0.2);
  padding: 15px;
  @media (max-width: 600px) {
    border-bottom: 3px solid rgba(66, 139, 202, 0.2);
    display: block;
    margin-bottom: 0.625em;
  }
`;

export const Th = styled.th`
  padding: 15px 5px;
  text-align: left;
  font-weight: normal;
  font-size: 12px;
  line-height: 14px;
  letter-spacing: 0.1px;
  color: ${(props) => props.theme.thHead};
`;

export const Thead = styled.thead`
  @media (max-width: 600px) {
    border: none;
    clip: rect(0 0 0 0);
    height: 1px;
    margin: -1px;
    overflow: hidden;
    padding: 0;
    position: absolute;
    width: 1px;
  }
`;

export const DataListDate = styled.span`
  margin: 10px auto;
  font-weight: normal;
  font-size: 12px;
  line-height: 14px;
  display: inline-block;
  padding: 10px 6px;
  background: transparent;
  width: 125px;
  text-align: center;
  border: 1px solid #ff416e;
  border-radius: 24px;
`;

export const WritingBlock = styled.div`
  width: 100%;
`;

export const WritingTitle = styled.div`
  font-weight: 500;
  font-size: 18px;
  line-height: 21px;
  letter-spacing: 0.1px;
  margin-bottom: 24px;
  @media (max-width: 768px) {
    text-align: center;
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

export const InputsWrapItem = styled.div`
  margin-right: 10px;
  width: 100%;
  @media (max-width: 576px) {
    margin-right: 0px;
  }
`;

export const Input = styled.input`
  width: 100%;
  border: 1px solid rgba(86, 101, 127, 0.3);
  box-sizing: border-box;
  border-radius: 2px;
  min-height: 40px;
  padding: 8px;
  font-weight: normal;
  font-size: 14px;
  line-height: 21px;
  background: transparent;
  letter-spacing: 0.1px;
  color: ${(props) => props.theme.text2};
  &:focus {
    outline: none;
  }
`;

export const Loader = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.2);
  display: block;
  z-index: 99999;
  overflow: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const HeaderWrap = styled.div`
  display: none;
  @media (max-width: 992px) {
    display: block;
  }
`;

export const Wrapper = styled.div`
  display: flex;
  flex-flow: row nowrap;
  width: 100%;
  max-width: 1440px;
  margin-right: auto;
  margin-left: auto;
  position: relative;
  @media (max-width: 992px) {
    margin-top: 82px;
  }
`;

type ContentProps = {
  mtbig?: boolean;
  widthCont?: boolean;
};

export const Content = styled.div<ContentProps>`
  flex-grow: 1;
  transition: 0.3s;
  margin: ${(props) => (props.mtbig ? "60px auto 40px" : "30px auto 40px")};
  padding: 0 35px 0;
  padding-left: ${(props) => (props.widthCont ? "278px" : "91px")};
  @media (max-width: 1200px) {
    padding-left: 91px;
  }
  @media (max-width: 992px) {
    padding-left: 35px;
  }
  @media (max-width: 768px) {
    padding: 0 20px 0;
  }
`;

export const UserName = styled.div`
  span {
    width: 120px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    font-weight: 500;
    font-size: 14px;
    line-height: 16px;
    text-align: right;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 350px;
    @media (max-width: 576px) {
      max-width: 100px;
    }
  }
  svg {
    display: none;
    path {
      stroke: ${(props) => props.theme.text};
    }
    @media (max-width: 992px) {
      display: block;
      margin-left: 14px;
    }
  }
  margin-bottom: 14px;
  display: flex;
  align-items: center;
`;

export const TitleHead = styled.div`
  font-weight: 500;
  font-size: 18px;
  line-height: 21px;
  letter-spacing: 0.1px;
  margin-right: auto;
  margin-bottom: 15px;
  @media (max-width: 992px) {
    display: none;
  }
`;

export const HeadBlock = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  max-width: 100%;
  ${UpTitle} {
    display: none;
  }
  @media (max-width: 992px) {
    ${UpTitle} {
      display: block;
      margin-left: -20px;
      margin-bottom: 14px;
      white-space: nowrap;
      &:before {
        width: 14px;
      }
    }
    justify-content: space-between;
  }
`;

export const ChartItemDate = styled.div`
  font-size: 14px;
  line-height: 16px;
  display: flex;
  align-items: center;
  text-align: center;
  border: 1px solid #ff416e;
  box-sizing: border-box;
  border-radius: 24px;
  padding: 12px;
  color: #606063;
  white-space: nowrap;
`;

export const PayItemHead = styled.div<{ mb?: boolean }>`
  display: flex;
  text-align: right;
  justify-content: center;
  margin: 0 auto ${(props) => (props.mb ? "12px" : "0")};
  &:last-child() {
    margin-bottom: 12px;
  }
  align-items: center;
  /* @media (max-width: 992px) {
    ${UpTitle} {
      &:before {
        width: 15px;
      }
    }
  } */
  @media (max-width: 768px) {
    margin: 0 auto ${(props) => (props.mb ? "8px" : "0")};
  }
`;

export const Radial = styled.div<{ bg: string }>`
  position: relative;
  width: 145px;
  height: 145px;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  border-radius: 50%;
  border: 7px solid ${(props) => props.bg};
  span {
    font-weight: normal;
    font-size: 16px;
    line-height: 20px;
    text-align: center;
    color: ${(props) => props.theme.text};
  }
  @media (max-width: 576px) {
    width: 63px;
    height: 63px;
    border-width: 3px;
    span {
      font-size: 12px;
      line-height: 14px;
    }
  }
`;

export const FilterBlock = styled(Card)`
  padding: 30px;
  transition: 0.3s;
  border-radius: 10px;
  @media (max-width: 768px) {
    padding: 20px;
  }
`;

export const FilterName = styled.div`
  font-weight: 500;
  font-size: 18px;
  line-height: 21px;
  letter-spacing: 0.1px;
  @media (max-width: 576px) {
    margin-left: 0px;
  }
`;

export const SelectContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  margin-top: 4px;
  margin-bottom: 15px;
  ${Button} {
    /* margin-left: 20px; */
    height: 40px;
    @media (max-width: 992px) {
      width: 100%;
    }
    @media (max-width: 768px) {
      margin-left: auto;
      margin-right: auto;
    }
  }
  @media (max-width: 992px) {
    flex-wrap: wrap;
    justify-content: flex-start;
  }
  @media (max-width: 576px) {
    justify-content: center;
  }
`;

export const SelectContainerLottery = styled(SelectContainer)`
  justify-content: flex-start;
`;

export const SelectWrap = styled.div<{ input?: boolean }>`
  max-width: ${(props) => (props.input ? "153px" : "280px")};
  width: 100%;
  margin: 20px 20px 20px 0;
  position: relative;
  @media (max-width: 992px) {
    max-width: ${(props) => (props.input ? "153px" : "45%")};
  }
  @media (max-width: 768px) {
    max-width: 100%;
    margin: 12px 10px;
  }
  @media (max-width: 576px) {
    margin: 12px 0px;
  }
`;

export const SliderWrap = styled.div`
  min-width: 265px;
  margin: 20px 20px 20px 0;
  @media (max-width: 768px) {
    min-width: 100%;
    margin: 12px 10px;
  }
  @media (max-width: 576px) {
    margin: 12px 0px;
  }
`;

export const InputsCalendarWrap = styled.div`
  max-width: 133px;
  width: 100%;
  margin: 20px 10px;
  @media (max-width: 992px) {
    max-width: 75%;
  }
  @media (max-width: 768px) {
    max-width: 100%;
    margin: 12px 10px;
  }
  @media (max-width: 576px) {
    margin: 12px 0px;
  }
`;

export const Label = styled.span`
  font-weight: normal;
  font-size: 14px;
  line-height: 21px;
  letter-spacing: 0.1px;
  color: ${(props) => props.theme.depositHead};
  margin-bottom: 1px;
  position: absolute;
  left: 7px;
  padding: 0 10px;
  top: -12px;
  z-index: 9;
  background: ${(props) => props.theme.card.background};
  @media (max-width: 768px) {
    left: 10px;
    padding: 0 4px;
  }
`;

export const SelectContainerInner = styled.div`
  display: flex;
  align-items: center;
  @media (max-width: 1100px) {
    flex-wrap: wrap;
  }
`;

export const SelectContainerInnerUsers = styled.div`
  display: flex;
  align-items: center;
  @media (max-width: 700px) {
    flex-wrap: wrap;
    width: 100%;
  }
`;

export const SelectContainerInnerPaid = styled.div`
  display: flex;
  align-items: center;
  @media (max-width: 850px) {
    flex-wrap: wrap;
    width: 100%;
  }
`;

export const SliderContainerInner = styled.div`
  display: flex;
  align-items: center;
  @media (max-width: 1286px) {
    flex-wrap: wrap;
    width: 100%;
  }
`;

export const FilterHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 15px;
`;

export const ShowHide = styled.div`
  margin-left: auto;
  font-weight: normal;
  font-size: 14px;
  line-height: 16px;
  cursor: pointer;
  @media (max-width: 768px) {
    cursor: initial;
  }
`;

export const InputsWrap = styled.div`
  display: flex;
  align-items: center;
  @media (max-width: 768px) {
    flex-wrap: wrap;
    width: 100%;
  }
`;

export const PayItem = styled.div`
  position: relative;
  display: flex;
  width: 33.3333%;
  text-align: center;
  justify-content: center;
  flex-direction: column;
  ${UpTitle} {
    margin-bottom: 0;
    margin-right: 10px;
  }
  &:last-child {
    display: none;
  }
  @media (max-width: 768px) {
    width: 50%;
    margin-bottom: 20px;
    &:nth-child(3) {
      width: 100%;
    }
  }
`;

export const PayList = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 20px;
  @media (max-width: 992px) {
    flex-wrap: wrap;
    justify-content: center;
  }
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

export const LotteryTable = styled.div`
  width: 100%;
  padding: 30px;
  @media (max-width: 768px) {
    padding: 20px;
  }
`;
