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

const operation = (id: number) => {
  if (id === 6) {
    return "Открытие депозита";
  } else if (id === 7) {
    return "Начисление дивидендов";
  } else if (id === 8) {
    return "Закрытие депозита";
  } else if (id === 2) {
    return "Вывод баланса";
  } else if (id === 1) {
    return "Пополнение баланса";
  }
};

const operationValue = (id: number, value: number) => {
  const val = (value / 100000).toLocaleString("ru-RU", {
    maximumFractionDigits: 5,
  });
  if (id === 6) {
    return <Text>{`- ${val}`}</Text>;
  } else if (id === 7) {
    return <Text red>{`+ ${val}`}</Text>;
  } else if (id === 8) {
    return <Text>{` ${val}`}</Text>;
  } else if (id === 2) {
    return <Text red>{`- ${val}`}</Text>;
  } else if (id === 1) {
    return <Text red>{`+ ${val}`}</Text>;
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
            {operationValue(+i.name, i.value)}
          </TextWrap>
        ))}
      </TooltipBlock>
    );
  }
  return null;
};

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
  let abc = Object.keys(values).map((key, idx) => {
    return values[key].map((item: any) => ({ name: item.balance }));
  });

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

  const datas = Object.values(values).map((item: any) =>
    item.reduce((a: any, b: any) => {
      a[b.operationKind] = b.balance < 0 ? b.balance * -1 : b.balance;
      a["date"] = moment(b.date).format("DD MMMM YYYY");
      return a;
    }, {})
  );

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
        data={arrayReverseObj(datas)}
        margin={{
          top: 20,
          right: 20,
          left: -20,
          bottom: 5,
        }}
      >
        <XAxis tick={{ fontSize: 10 }} />
        <YAxis tickFormatter={DataFormater} tick={{ fontSize: 10 }} />
        <Tooltip content={<CustomTooltip />} />
        <Bar dataKey="6" stackId="a" fill="#6DB9FF" />
        <Bar dataKey="7" stackId="a" fill="rgba(188,212,118,.5)" />
        <Bar dataKey="2" stackId="a" fill="rgba(81,81,114,.5)" />
        <Bar dataKey="1" stackId="a" fill="#A78CF2" />
        <Bar dataKey="8" stackId="a" fill="#FFCCFF" />
      </BarChart>
    </ResponsiveContainer>
  );
};
