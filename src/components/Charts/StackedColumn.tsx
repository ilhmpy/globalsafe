import React, { FC } from "react";
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import styled from "styled-components/macro";
import moment from "moment";
import { Balance } from "../../types/balance";
import { useTranslation } from "react-i18next";

const TooltipBlock = styled.div`
  background: #fff;
  padding: 5px;
  border-radius: 5px;
`;

const TextWrap = styled.div`
  display: flex;
  flex-direction: column;
`;
const Date = styled.div`
  font-size: 10px;
  padding-bottom: 2px;
`;

const Text = styled.div<{ red?: boolean }>`
  font-size: 11px;
  padding-bottom: 2px;
  color: ${(props) => (props.red ? "#FF416E" : "#222")};
`;

export const StackedColumn: FC<{ values: any }> = ({ values }) => {
  const { t } = useTranslation();
  const operation = (id: number) => {
    if (id === 6) {
      return t("operation.open");
    } else if (id === 7) {
      return t("operation.divedents");
    } else if (id === 8) {
      return t("operation.close");
    } else if (id === 2) {
      return t("operation.withdraw");
    } else if (id === 1) {
      return t("operation.add");
    }
  };

  const operationValue = (id: number, value: number, type: number) => {
    const val = (value / 100000).toLocaleString("ru-RU", {
      maximumFractionDigits: 5,
    });
    const bal = Balance[type];

    if (id === 6) {
      return <Text>{`- ${val} ${bal}`}</Text>;
    } else if (id === 7) {
      return <Text red>{`+ ${val} ${bal}`}</Text>;
    } else if (id === 8) {
      return <Text>{` ${val} ${bal}`}</Text>;
    } else if (id === 2) {
      return <Text red>{`- ${val} ${bal}`}</Text>;
    } else if (id === 1) {
      return <Text red>{`+ ${val} ${bal}`}</Text>;
    }
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <TooltipBlock>
          <Date>{payload[0].payload.date}</Date>
          {payload.map((i: any, idx: number) => (
            <TextWrap key={idx}>
              <Text>{operation(+i.name)}</Text>
              {operationValue(+i.name, i.value, i.payload.type)}
            </TextWrap>
          ))}
        </TooltipBlock>
      );
    }
    return null;
  };

  const DataFormater = (number: number) => {
    const value = number / 100000;
    if (value >= 1000000) {
      return (value / 1000000).toString() + "M";
    } else if (value >= 1000 && value < 1000000) {
      return (value / 1000).toString() + "k";
    } else {
      return value.toString();
    }
  };

  let data: any = [];

  Object.values(values).map((item: any) => data.push(...item));

  const colors = (id: number) => {
    if (id === 6) {
      return "#6DB9FF";
    } else if (id === 7) {
      return "rgba(188,212,118,.5)";
    } else if (id === 2) {
      return "rgba(81,81,114,.5)";
    } else if (id === 1) {
      return "#A78CF2";
    } else if (id === 8) {
      return "#FFCCFF";
    }
  };

  const data1 = Object.values(values).map((item: any) => {
    return item.reduce((a: any, b: any) => {
      a[b.operationKind] = b.balance < 0 ? b.balance * -1 : b.balance;
      a["operationKind"] = b.operationKind;
      a["date"] = moment(b.date).format("DD MMMM YYYY");
      a["type"] = b.type;
      a["color"] = colors(b.operationKind);
      return a;
    }, {});
  });

  const arrayReverseObj = (obj: any) =>
    Object.keys(obj)
      .sort()
      .reverse()
      .map((key) => ({ ...obj[key], key }));

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        width={500}
        height={165}
        data={data1}
        margin={{
          top: 20,
          right: 20,
          left: -20,
          bottom: 5,
        }}
      >
        <XAxis tick={{ fontSize: 0 }} tickLine={false} />
        <YAxis tickFormatter={DataFormater} tick={{ fontSize: 10 }} />
        <Tooltip content={<CustomTooltip />} />

        <Bar dataKey="6" stackId="a" fill="#6DB9FF" />
        <Bar dataKey="6" stackId="a" fill="#6DB9FF" />
        <Bar dataKey="7" stackId="a" fill="rgba(188,212,118,.5)" />
        <Bar dataKey="2" stackId="a" fill="rgba(81,81,114,.5)" />
        <Bar dataKey="1" stackId="a" fill="#A78CF2" />
        <Bar dataKey="8" stackId="a" fill="#FFCCFF" />
        <Bar dataKey="0" stackId="a" fill="#FFF" />
      </BarChart>
    </ResponsiveContainer>
  );
};
