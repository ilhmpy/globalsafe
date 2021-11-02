import React, { FC } from 'react';
import { Button } from '../../../../components/Button/V2/Button';
import * as S from './S.el';

type Props = {
  title: string;
  btnText?: string;
  onClick?: () => void;
  withoutBtn?: boolean;
  styles?: Object;
}; 

export const Heading: FC<Props> = ({ title, onClick, btnText, withoutBtn, styles }: Props) => {
  return (
    <S.Container style={styles && styles}>
      <S.Title>{title}</S.Title>
      {!withoutBtn && (
        <Button primary onClick={onClick}>
          {btnText}
        </Button>
      )}
    </S.Container>
  );
};
