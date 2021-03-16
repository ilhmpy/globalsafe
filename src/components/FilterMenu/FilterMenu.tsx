import React, { FC, useState } from "react";
import * as Styled from "./Styled.elements";

const list = [
  "Пользователь: От А до Я",
  "Пользователь: От Я до А",
  "Название: От А до Я",
  "Название: От Я до А",
  "По дате открытия",
  "По дате закрытия",
  "По возрастанию суммы допозита",
  "По убыванию суммы допозита",
  "По дате следующей выплаты",
  "По возрастанию суммы выплат",
  "По убыванию суммы выплат",
];

export const FilterMenu: FC<{ filterClick: (idx: number) => void }> = ({
  filterClick,
}) => {
  return (
    <Styled.Container>
      <Styled.Title>Сортировка</Styled.Title>
      <Styled.List>
        {list.map((item, idx) => (
          <Styled.Item key={idx} onClick={() => filterClick(idx)}>
            {item}
          </Styled.Item>
        ))}
      </Styled.List>
    </Styled.Container>
  );
};
