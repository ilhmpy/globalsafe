import React, { FC } from "react";
import Slider, { Range } from "rc-slider";
import "rc-slider/assets/index.css";
import * as Styled from "./Slider.elements";

export const SliderComponent: FC<{
  onAfterChange?: (num: number) => void;
  value?: number;
}> = ({ onAfterChange, value = 0 }) => {
  return (
    <Styled.SliderWrap>
      <Slider
        // dots
        step={1}
        min={0}
        max={168}
        defaultValue={value}
        onAfterChange={onAfterChange}
      />
    </Styled.SliderWrap>
  );
};
