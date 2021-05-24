import styled from "styled-components/macro";

export const SliderWrap = styled.div`
  width: 100%;
  .rc-slider-handle {
    width: 10px;
    height: 10px;
    background: #ff416e;
    border: none;
    margin-top: -4.5px;
  }
  .rc-slider-track {
    background: #ff416e;
    height: 1px;
  }
  .rc-slider-rail {
    background: rgba(255, 65, 110, 0.3);
    height: 1px;
  }
  .rc-slider-dot {
    border: none;
    bottom: 3px;
    margin-left: 0px;
    width: 2px;
    height: 2px;
  }
  .rc-slider-dot-active {
    border-color: #e2e2e2;
  }
`;
