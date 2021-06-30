import styled from "styled-components/macro";
import { UpTitle } from "../../../../../components/UI/UpTitle";

export const ChartItemHead = styled.div`
  display: flex;
  align-items: center;
  padding-top: 23px;
  justify-content: space-between;
  @media (max-width: 800px) {
    flex-wrap: wrap;
    justify-content: center;
  }
`;

export const ChartItemTitle = styled(UpTitle)`
  margin-bottom: 0;
  white-space: normal;
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding-right: 10px;
  &:before {
    margin: 0 20px 0 0;
    flex: 1 0 20px;
  }
  @media (max-width: 800px) {
    margin: 0 auto 12px;
    text-align: center;
    width: 100%;
    &:before {
      width: 0;
      margin: 0;
      display: none;
    }
  }
`;

export const DateBlock = styled.div`
  max-width: 400px;
  @media (max-width: 800px) {
    margin: 0 auto;
  }
`;

export const ColumnBlock = styled.div`
  width: 100%;
  margin-bottom: 20px;
`;
