import React, { FC, useState, useRef } from 'react';
import useOnClickOutside from '../../../../../hooks/useOutsideHook';
import * as S from './S.elements';

type Props = {
  options: string[];
  selected: string;
  setSelected: (str: string) => void;
  mN?: boolean;
};

export const Dropdown: FC<Props> = ({ options, selected, setSelected, mN }: Props) => {
  const [show, setShow] = useState(false);
  const ref = useRef(null);
  const change = (item: string) => {
    setSelected(item);
    setShow(false);
  };

  const handleClickOutside = () => {
    setShow(false);
  };

  useOnClickOutside(ref, handleClickOutside);

  return (
    <div>
      <S.ActionItem mN={mN} ref={ref}>
        <S.Header onClick={() => setShow(true)}>
          <S.Head>{selected}</S.Head>
          <S.Arrow />
        </S.Header>
        <S.ActionMenu open={show}>
          {options.map((item, idx) => (
            <S.ActionMenuItem key={item} onClick={() => change(item)}>
              <div>{item}</div>
            </S.ActionMenuItem>
          ))}
        </S.ActionMenu>
      </S.ActionItem>
    </div>
  );
};
