import React from "react";
import styled from "styled-components/macro";
import { ReactComponent as Filter } from "../../assets/svg/filter.svg";

export const Tables = () => {
  const arr = [1, 2, 3, 4];
  return (
    <TableWrap>
      <Table>
        <TR>
          <TH>Название</TH>
          <TH>Описание</TH>
          <TH>Сумма депозита</TH>
          <TH>
            <p>Дата следующей выплаты</p>
            <span>Дата след. выплаты</span> <StyledFilter />
          </TH>
        </TR>
        <tbody>
          {/* {Object.values(arr).map((value, index) => {
          return (
            <tr key={index}>
              <td>{value}</td>
              <td>{value}</td>
              <td>{value}</td>
              <td>{value}</td>
            </tr>
          );
        })} */}
          <TR>
            <TD>
              <Name>Название Депозита №1</Name>
              <NameData>
                <NameData>01/01/2020</NameData>{" "}
                <NameData>&nbsp; - &nbsp;</NameData>
                <NameData green>31/12/2021</NameData>
              </NameData>
            </TD>
            <TD>
              <Text>Описание первого депозита с повышенной доходностью</Text>
            </TD>
            <TD>
              <Text>40 000</Text>
            </TD>
            <TD>
              <Text>01 марта 2021</Text>
            </TD>
          </TR>
          <TR>
            <TD>
              <Name>Название Депозита №2</Name>
              <NameData>
                <NameData>01/01/2020</NameData>{" "}
                <NameData>&nbsp; - &nbsp;</NameData>
                <NameData green>31/12/2021</NameData>
              </NameData>
            </TD>
            <TD>
              <Text>Описание первого депозита с повышенной доходностью</Text>
            </TD>
            <TD>
              <Text>140 000</Text>
            </TD>
            <TD>
              <Text>04 марта 2021</Text>
            </TD>
          </TR>
        </tbody>
      </Table>
    </TableWrap>
  );
};

const TableWrap = styled.div`
  width: 100%;
  padding: 34px 90px;
  @media (max-width: 992px) {
    padding: 15px 10px;
  }
`;

const Table = styled.table`
  width: 100%;
  display: table;
  border-collapse: collapse;
  table-layout: fixed;
`;

const TH = styled.th`
  text-align: left;
  font-weight: normal;
  font-size: 12px;
  line-height: 14px;
  letter-spacing: 0.1px;
  color: rgba(81, 81, 114, 0.6);
  padding: 10px 5px;
  p {
    display: inline-block;
  }
  span {
    display: none;
  }
  @media (max-width: 500px) {
    p {
      display: none;
    }
    span {
      width: 65px;
      text-align: left;
      display: inline-block;
    }
  }
`;

const TD = styled.td`
  padding: 9px;
`;

const TR = styled.tr`
  border-bottom: 1px solid rgba(81, 81, 114, 0.2);
  &:last-child {
    opacity: 0.4;
  }
  @media (max-width: 992px) {
    ${TH}:last-child,
    ${TD}:last-child {
      text-align: right;
    }
    ${TH}:last-child {
      display: flex;
      justify-content: flex-end;
    }
    ${TH}:nth-child(2),
    ${TH}:nth-child(3),
    ${TD}:nth-child(2),
    ${TD}:nth-child(3) {
      display: none;
    }
  }
`;

const Name = styled.div`
  font-weight: 500;
  font-size: 14px;
  line-height: 16px;
  @media (max-width: 992px) {
    font-weight: 400;
  }
`;

const NameData = styled.div<{ green?: boolean }>`
  font-weight: normal;
  font-size: 12px;
  letter-spacing: 0.1px;
  color: ${(props) => (props.green ? "#c9da99" : "#515172")};
  display: flex;
  align-items: center;
  @media (max-width: 992px) {
    font-size: 10px;
  }
`;

const Text = styled.div`
  font-weight: normal;
  font-size: 14px;
  line-height: 16px;
  letter-spacing: 0.1px;
  color: #515172;
`;

const StyledFilter = styled(Filter)`
  margin-left: 20px;
  &:hover {
    fill: #333;
  }
`;
