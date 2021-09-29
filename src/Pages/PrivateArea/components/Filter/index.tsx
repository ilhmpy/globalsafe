import React, { FC, useState } from 'react';
import { ReactComponent as ListIcon } from '../../../../assets/v2/svg/list.svg';
import { ReactComponent as TileIcon } from '../../../../assets/v2/svg/tile.svg';
import { ReactComponent as ListFillIcon } from '../../../../assets/v2/svg/listfill.svg';
import { ReactComponent as TileFillIcon } from '../../../../assets/v2/svg/tilefill.svg';
import * as S from './S.el';

interface FilterProps {
  activeFilter: string;
  setActiveFilter: (value: string) => void;
  filterTypesIsShown?: boolean;
  buttonValues: string[];
}

export const Filter: FC<FilterProps> = ({
  activeFilter,
  setActiveFilter,
  filterTypesIsShown,
  buttonValues,
}: FilterProps) => {
  const [active, setActive] = useState('list');

  const handleActive = (type: string) => {
    if (type !== active) setActive(type);
  };

  return (
    <S.Container>
      <S.Buttons>
        {buttonValues.map((value: string, i: number) => (
          <S.Button key={i} active={activeFilter === value} onClick={() => setActiveFilter(value)}>
            {value}
          </S.Button>
        ))}
      </S.Buttons>
      {filterTypesIsShown && (
        <S.FilterTypes>
          <S.FilterTypeList onClick={() => handleActive('list')}>
            {active === 'list' ? <ListFillIcon /> : <ListIcon />}
          </S.FilterTypeList>
          <S.FilterTypeTile onClick={() => handleActive('tile')}>
            {active === 'tile' ? <TileFillIcon /> : <TileIcon />}
          </S.FilterTypeTile>
        </S.FilterTypes>
      )}
    </S.Container>
  );
};
