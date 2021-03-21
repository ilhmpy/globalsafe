import styled from "styled-components/macro";
import { UpTitle } from "../../components/UI/UpTitle";
import { Card } from "../../globalStyles";
import { Button } from "../../components/Button/Button";

export const Wrapper = styled.div`
  display: flex;
  flex-flow: row nowrap;
  width: 100%;
  max-width: 1440px;
  margin-right: auto;
  margin-left: auto;
  position: relative;
  @media (max-width: 992px){
    margin-top: 82px;
  }
`;

export const Content = styled.div<{ mtbig?: boolean }>`
  flex-grow: 1;
  margin: ${(props) => (props.mtbig ? "60px auto 40px" : "30px auto 40px")};
  padding: 0 40px 0;
  @media (max-width: 1200px) {
    margin-left: 60px;
  }
  @media (max-width: 992px) {
    margin-left: 0px;
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
    color: #0e0d3d;
  }
  svg {
    display: none;
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
  color: #0e0d3d;
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
    color: #000000;
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
  @media (max-width: 768px) {
    padding: 20px;
  }
`;

export const SelectContainer = styled.div`
  display: flex;
  align-items: center;
  /* justify-content: space-between; */
  ${Button} {
    margin-top: 14px;
    margin-left: 20px;
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
`;

export const SelectWrap = styled.div`
  max-width: 280px;
  width: 100%;
  margin: 20px 10px;
  @media (max-width: 992px) {
    max-width: 45%;
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
  color: rgba(86, 101, 127, 0.6);
  margin-bottom: 5px;
`;

export const InputsWrap = styled.div`
  display: flex;
  align-items: center;
  @media (max-width: 576px) {
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
