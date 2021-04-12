import styled, { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
* {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
}
html{
  min-height: 100vh;
}
body{
    font-family: 'Roboto', sans-serif;
    font-size: 16px;
    line-height: 1.25;
    color: #0E0D3D;
    position: relative;
    font-weight: 400;
    background: #E5E5E5;
    background: linear-gradient(
      0deg
      , rgba(0, 0, 0, 0.05), rgba(0, 0, 0, 0.05)), linear-gradient( 
      82.3deg
      , #effff9 3.67%, #f3f9ff 22.57%, #fffdf0 44.98%, #fff0f0 73%, #f0f0ff 95.88% ), #ffffff;
          background-repeat: no-repeat;
      height: 100%;
} 
img{
    max-width: 100%;  
}
a{
  text-decoration: none;
}
.chart-toltip{
  display: flex;
  flex-direction: column;
  background: #FFFFFF;
  // box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.235536);
  border-radius: 8px;
  padding: 8px 8px 2px;
  position: relative;
}
.chart-toltip-arrow{
  position: absolute;
  bottom: -10px;
  margin-left: -5px;
  border-width: 5px;
  border-style: solid;
  border-color: black transparent transparent transparent;
}
.chart-tottip-light{
  font-weight: normal;
  font-size: 16px;
  line-height: 14px;
  color: rgba(0, 0, 0, 0.4);
}
.chart-tottip-bold{
  font-weight: 500;
  font-size: 20px;
  line-height: 24px;
  color: #0E0D3D;
  padding-bottom: 2px;
}

.column-toltip{
  background: #fff !important;
  border-color: rgba(0, 0, 0, 0);
  box-shadow: none;
  padding: 20px;
  border: none;
  outline: none;
  fill: none;
}
.column-toltip-light{
  font-size: 10px;
  line-height: 12px;
  text-align: center;
  color: #515172;
}
.column-toltip-bold{
  font-weight: bold;
  font-size: 10px;
  line-height: 12px;
  text-align: center;
  color: #0E0D3D;
}
#chart1 .apexcharts-tooltip,
#chart2 .apexcharts-tooltip{
  background: rgba(255, 255, 255, 1);
  border: none;
  box-shadow: none;
}
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
input[type=number] {
  -moz-appearance: textfield;
}
.alert-enter {
  opacity: 0;
  transform: translateX(-400px);
}
.alert-enter-active {
  opacity: 1;
  transform: translateX(0);
  transition: all 300ms ease-in;
}
.alert-exit {
  opacity: 1;
  transform: translateX(-400px);
}
.alert-exit-active {
  opacity: 0;
  transform: translateX(0px);
  transform-origin: 50% 50%;
  transition: all 300ms ease-in;
}


.tooltip-body {
  position: fixed;
  padding: 8px;
  background: #333;
  color: white;
  box-shadow: 2px 2px 3px rgba(0 ,0, 0, 0.3);
  text-align: center;
  font-size: 16px;
  display: block;
  left: 0;
  max-width: 400px;
  z-index: 99999;
}

.modal-enter {
  opacity: 0;
  transform: scale(0.9);
  transform: translateY(-100%);
}
.modal-enter-active {
  opacity: 1;
  transform: translateY(0);
  transition: opacity 300ms, transform 300ms;
}
.modal-exit {
  opacity: 0;
  
}
.modal-exit-active {
  opacity: 0;
}
.data-enter {
  opacity: 0;
}
.data-enter-active {
  opacity: 1;
  transform: translateX(0);
  transition: opacity 300ms;
}
.data-exit {
  opacity: 1;
}
.data-exit-active {
  opacity: 0;
  transition: 300ms;
}
`;

export const Container = styled.div`
  z-index: 1;
  width: 100%;
  max-width: 1080px;
  margin-right: auto;
  margin-left: auto;
  padding-right: 10px;
  padding-left: 10px;
  display: flex;
  justify-content: space-around;
  @media screen and (max-width: 992px) {
    padding-right: 20px;
    padding-left: 20px;
  }
`;

export const ContainerRow = styled(Container)`
  padding-right: 0px;
  padding-left: 0px;
  display: flex;
  flex-wrap: wrap;
`;

export const Card = styled.div`
  background: #fff;
  width: 100%;
  box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
  margin-bottom: 20px;
`;

export default GlobalStyle;
