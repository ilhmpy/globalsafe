import React, { FC } from 'react';
import * as Styled from '../Styled.elements';

type PaginationPropsType = {
  pageLength: number;
  setPageLength: (pageLength: number) => void;
  currentPage: number;
  setCurrentPage: (currentPage: number) => void;
  totalLottery: number;
};

export const Pagination: FC<PaginationPropsType> = ({
  pageLength,
  setPageLength,
  currentPage,
  setCurrentPage,
  totalLottery,
}) => {
  return (
    <Styled.Pagination>
      <Styled.Page>Элементов на странице:</Styled.Page>
      <Styled.PaginationSelect
        name="countRows"
        onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
          setPageLength(+e.target.value);
          setCurrentPage(1);
        }}
        value={pageLength}>
        <option value="10">10</option>
        <option value="20">20</option>
        <option value="30">30</option>
      </Styled.PaginationSelect>
      <Styled.Page>
        {`${currentPage} из ${Math.ceil(totalLottery / pageLength)}`}
      </Styled.Page>
      <Styled.Arrows>
        <Styled.ArrowRight
          onClick={() => {
            setCurrentPage(currentPage > 1 ? currentPage - 1 : currentPage);
          }}
        />
        <Styled.ArrowLeft
          onClick={() => {
            setCurrentPage(currentPage < Math.ceil(totalLottery / pageLength) ? currentPage + 1 : currentPage);
          }}
        />
      </Styled.Arrows>
    </Styled.Pagination>
  );
};
