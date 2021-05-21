import React, { FC } from "react";
import styled from "styled-components";
import { CollectionLottery } from "../../../types/lottery";
import { useTranslation } from "react-i18next";
import moment from "moment";

export const LotteryTable: FC<{ data: CollectionLottery }> = ({ data }) => {
  const { t } = useTranslation();

  const typeWin = (id: number) => {
    if (id === 0) {
      return t("win.one");
    } else if (id === 1) {
      return t("win.two");
    } else if (id === 2) {
      return t("win.three");
    }
  };

  return (
    <Tr>
      <Td data-label={t("lotteryTable.date")}>
        {moment(data.drawLog.drawDate).format("DD/MM/YYYY")} <br />
        {moment(data.drawLog.drawDate).format("h:mm")}
      </Td>
      <Td data-label={t("lotteryTable.typeWin")}>
        {typeWin(data.definition.kind)}
      </Td>
      <Td data-label={t("lotteryTable.sumWin")}>
        {data.definition.volume
          ? (data.definition.volume / 100000).toLocaleString("ru-RU", {
              maximumFractionDigits: 6,
            })
          : "-"}{" "}
        {data.definition.volume ? "CWD" : ""}
      </Td>
      <Td data-label={t("lotteryTable.winners")}>{data.userName}</Td>
      <Td data-label={t("lotteryTable.status")}>
        {data.drawLog.isSuccess ? (
          <Chips>{t("lotteryTable.done")}</Chips>
        ) : (
          <Chips black>{t("lotteryTable.error")}</Chips>
        )}
      </Td>
    </Tr>
  );
};

const Tr = styled.tr`
  background-color: transparent;
  border-bottom: 1px solid #ddd;
  padding: 15px;
  @media (max-width: 600px) {
    border-bottom: 3px solid #ddd;
    display: block;
    margin-bottom: 0.625em;
  }
`;

const Td = styled.td`
  padding: 15px 5px;
  text-align: left;
  font-weight: normal;
  font-size: 14px;
  line-height: 16px;
  letter-spacing: 0.1px;
  color: #56657f;
  @media (max-width: 600px) {
    display: block;
    text-align: left;
    &:before {
      content: attr(data-label);
      float: left;
      font-weight: normal;
      font-size: 12px;
      line-height: 21px;
      letter-spacing: 0.1px;
      color: rgba(81, 81, 114, 0.6);
      width: 100%;
    }
  }
`;

const Chips = styled.div<{ black?: boolean }>`
  font-weight: normal;
  font-size: 10px;
  line-height: 12px;
  padding: 3px 5px;
  display: inline-block;
  background: ${(props) => (props.black ? "#515172" : "#FF416E")};
  border-radius: 24px;
  align-items: center;
  text-align: center;
  color: #fff;
`;
