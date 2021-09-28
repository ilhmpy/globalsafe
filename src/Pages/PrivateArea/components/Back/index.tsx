import React, { FC } from 'react';
import { ReactComponent as Left } from '../../../../assets/v2/svg/left.svg';
import * as S from './S.el';

type Props = {
  onClick: () => void;
  text: string;
};

export const Back: FC<Props> = ({ onClick, text }: Props) => {
  return (
    <S.Container onClick={onClick}>
      <Left /> {text}
    </S.Container>
  );
};
