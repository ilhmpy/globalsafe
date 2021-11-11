import React, { FC } from 'react';
import { ReactComponent as Left } from '../../../../assets/v2/svg/left.svg';
import { Button } from '../../../../components/Button/V2/Button';
import { useIsMobile } from '../../utils';
import * as S from './S.el';

type Props = {
  onButtonClick?: () => void;
  onGoBackClick: () => void;
  text: string;
  btnText?: string;
};

export const Back: FC<Props> = ({ onGoBackClick, onButtonClick, text, btnText }: Props) => {
  const isMobile = useIsMobile();
  return (
    <S.Container>
      <S.GoBack onClick={onGoBackClick}>
        <Left />
        <span>{text}</span>
      </S.GoBack>
      {!isMobile && btnText && (
        <Button bigSize primary onClick={onButtonClick} >
          {btnText}
        </Button>
      )}
    </S.Container>
  );
};
