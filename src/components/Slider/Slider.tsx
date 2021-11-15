import { FC } from 'react';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import * as Styled from './Slider.elements';

type Props = {
  onAfterChange?: (num: number) => void;
  value?: number;
};

export const SliderComponent: FC<Props> = ({ onAfterChange, value = 0 }: Props) => {
  return (
    <Styled.SliderWrap>
      <Slider
        // dots
        step={1}
        min={1}
        max={168}
        defaultValue={value}
        onChange={onAfterChange}
      />
    </Styled.SliderWrap>
  );
};
