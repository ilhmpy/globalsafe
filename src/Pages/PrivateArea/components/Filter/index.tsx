import React, { FC, useState } from 'react';
import { ReactComponent as ListIcon } from '../../../../assets/v2/svg/list.svg';
import { ReactComponent as TileIcon } from '../../../../assets/v2/svg/tile.svg';
import { ReactComponent as ListFillIcon } from '../../../../assets/v2/svg/listfill.svg';
import { ReactComponent as TileFillIcon } from '../../../../assets/v2/svg/tilefill.svg';
import * as S from './S.el';

type Props = {};

export const Filter: FC<Props> = ({}) => {
  const [active, setActive] = useState('list');

  const handleActive = (type: string) => {
    if (type !== active) setActive(type);
  };

  return (
    <S.Container>
      <S.Buttons>
        <S.Button active>Активные</S.Button>
        <S.Button>С отложенными выплатами</S.Button>
        <S.Button>В архиве</S.Button>
      </S.Buttons>
      <S.FilterTypes>
        <S.FilterTypeList onClick={() => handleActive('list')}>
          {active === 'list' ? <ListFillIcon /> : <ListIcon />}
        </S.FilterTypeList>
        <S.FilterTypeTile onClick={() => handleActive('tile')}>
          {active === 'tile' ? <TileFillIcon /> : <TileIcon />}
        </S.FilterTypeTile>
      </S.FilterTypes>
    </S.Container>
  );
};
