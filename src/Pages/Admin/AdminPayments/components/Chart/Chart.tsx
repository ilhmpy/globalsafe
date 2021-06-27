import React, { FC } from "react";
import { Card } from "../../../../../globalStyles";
import * as Styled from "./Styled.elements";
import { useTranslation } from "react-i18next";
import { MainAnaliticInput } from "../../../../../components/UI/DayPicker";
import { OpenDate } from "../../../../../types/dates";
import { ColumnChartAnalitic } from "../../../../../components/Charts/Test";

type Props = {
  stats: any[];
  setDepositsDate: (openDate: OpenDate) => void;
  depositsDate: OpenDate;
};

export const Chart: FC<Props> = ({ stats, setDepositsDate, depositsDate }) => {
  const { t } = useTranslation();

  return (
    <Card>
      <Styled.DateBlock>
        <Styled.ChartItemHead>
          <Styled.ChartItemTitle small>
            {t("adminPay.analitics.payAnalitics")}
          </Styled.ChartItemTitle>
          <MainAnaliticInput
            setOpenDate={setDepositsDate}
            openDate={depositsDate}
            label={t("adminPay.analitics.label")}
          />
        </Styled.ChartItemHead>
      </Styled.DateBlock>
      <Styled.ColumnBlock>
        <ColumnChartAnalitic
          date={stats && stats.length ? stats.map((i) => i[0]) : [new Date()]}
          value={stats && stats.length ? stats.map((i) => i[2] / 100000) : [0]}
        />
      </Styled.ColumnBlock>
    </Card>
  );
};
