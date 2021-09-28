import styled, { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
* {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
}
html{
  min-height: 100vh;
  /* scroll-behavior: smooth; */
}
body{
    font-family: 'Roboto', sans-serif;
    font-size: 16px;
    line-height: 1.25;
    color:${(props) => props.theme.text};
    position: relative;
    font-weight: 400;
    background: #f9fafb;
    /* background:${(props) => props.theme.body} ; */
    background-repeat: no-repeat;
    height: 100%;
    scrollbar-width: none;
    &::-webkit-scrollbar {
  display: none;
}
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
  background: ${(props) => props.theme.card.background};
  color: ${(props) => props.theme.text2};
  // box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.235536);
  border: none;
  outline: none;
  fill: none;
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
  color: ${(props) => props.theme.text2};
}
.chart-tottip-bold{
  font-weight: 500;
  font-size: 20px;
  line-height: 24px;
  color: ${(props) => props.theme.text};
  padding-bottom: 2px;
}

.column-toltip{
  background: ${(props) => props.theme.card.background} !important;
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
  color: ${(props) => props.theme.text2};
}
.column-toltip-bold{
  font-weight: bold;
  font-size: 10px;
  line-height: 12px;
  text-align: center;
  color: ${(props) => props.theme.text3};
}

.apexcharts-datalabels-group text,
.apexcharts-legend-text{
  fill: ${(props) => props.theme.text};
  color: ${(props) => props.theme.text} !important;
}

.apexcharts-tooltip.apexcharts-theme-light {
  border: none !important;
  background: none;
}

.currency-toltip{
  background: ${(props) => props.theme.card.background};
  padding: 6px;
  font-weight: normal;
  border: none !important;
  box-shadow: none;
  font-size: 12px;
  border-color: rgba(0, 0, 0, 0);
  fill: none;
  outline: none;
  line-height: 14px;
  color: ${(props) => props.theme.text2};
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

.alerts-enter {
  opacity: 0;
}
.alerts-enter-active {
  opacity: 1;
  transition: opacity 300ms;
}
.alerts-exit {
  opacity: 1;
}
.alerts-exit-active {
  opacity: 0;
  transform: scale(0.9);
  transition: opacity 300ms, transform 300ms;
}

.notifications-component{
  z-index: 999999;
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

.filter-enter {
    opacity: 0;
    /* transform: translate(0px, -20px); */
}
.filter-enter-active {
    opacity: 1;
    /* transform: translate(0px, 0px); */
    transition: all 300ms ease-in;
}
.filter-exit {
    opacity: 1;
}
.filter-exit-active {
    opacity: 0;
    transition: opacity 300ms ease-in-out;
}


.item-enter {
    opacity: 0;
    transform: translate(0px, 20px);
}
.item-enter-active {
    opacity: 1;
    transform: translate(0px, 0px);
    transition: all 500ms ease-in-out;
}
.item-exit {
    opacity: 1;
}
.item-exit-active {
    opacity: 0;
    transition: opacity 500ms ease-in;
}

.present-enter {
    opacity: 0;
}
.present-enter-active {
    opacity: 1;
    transition: all 2000ms ease-in-out;
}
.present-exit {
    opacity: 1;
}
.present-exit-active {
    opacity: 0;
    transition: opacity 10ms ease-in;
}


.fade-enter {
  opacity: 0.01;
}
.fade-enter-active {
  opacity: 1;
  transition: opacity 1000ms ease-in;
}
.fade-exit {
  opacity: 0;
}
.fade-exit-active {
  opacity: 0;
  transition: none;
}

.modals-enter {
  opacity: 0;
  /* transform: scale(0.9); */
}
.modals-enter-active {
  opacity: 1;
  /* transform: translateX(0); */
  transition: all 300ms;
}
.modals-exit {
  opacity: 1;
}
.modals-exit-active {
  opacity: 0;
  /* transform: scale(0.9); */
  transition: all 300ms;
}

@keyframes flickerAnimation {
    0% {
        opacity: 1;
    }
    50% {
        opacity: 0.6;
    }
    100% {
        opacity: 1;
    }
}
#onesignal-bell-container.onesignal-reset .onesignal-bell-launcher.onesignal-bell-launcher-bottom-right.onesignal-bell-launcher-md{
  width: 36px !important;
    height: 36px !important;
}

#onesignal-bell-container.onesignal-reset .onesignal-bell-launcher.onesignal-bell-launcher-md .onesignal-bell-launcher-button {
    width: 36px !important;
    height: 36px !important;
}

#onesignal-bell-container.onesignal-reset .onesignal-bell-launcher.onesignal-bell-launcher-bottom-right {
    right: 65px !important;
    @media (max-width: 768px){
      right: 25px !important;
    }
}

#onesignal-bell-container.onesignal-reset .onesignal-bell-launcher.onesignal-bell-launcher-bottom-right.onesignal-bell-launcher-sm{
  width: 36px !important;
}

#onesignal-bell-container.onesignal-reset .onesignal-bell-launcher.onesignal-bell-launcher-sm{
  height: 36px !important;
}

#onesignal-bell-container.onesignal-reset .onesignal-bell-launcher.onesignal-bell-launcher-sm .onesignal-bell-launcher-button {
    width: 36px !important;
    height: 36px !important;
}

`;

export const Container = styled.div<{ pNone?: boolean; bigMargin?: boolean; ppNone?: boolean }>`
  -webkit-background-clip: content-box;
  background-clip: content-box;
  z-index: 1;
  width: 100%;
  max-width: 1080px;
  margin-right: auto;
  margin-left: auto;
  padding-right: 10px;
  padding-left: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  @media screen and (max-width: 992px) {
    padding-right: ${(props) => (props.pNone ? '0' : '20px')};
    padding-left: ${(props) => (props.pNone ? '0' : '20px')};
  }

  @media only screen and (max-device-width: 480px) {
    ${({ ppNone }) => {
      if (ppNone) {
        return `
          padding-left: 0;
          padding-right: 0;
        `;
      }
    }}
  }
`;

export const ContainerRow = styled(Container)`
  padding-right: 0px;
  padding-left: 0px;
  display: flex;
  flex-wrap: wrap;
`;

export const Card = styled.div<{ alfa?: boolean; smallBorder?: boolean }>`
  background: ${(props) =>
    props.alfa ? props.theme.card.backgroundAlfa : props.theme.card.background};
  width: 100%;
  box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.25);
  border-radius: ${(props) => (props.smallBorder ? '10px' : '20px')};
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
  border: ${(props) => props.theme.card.border};
`;

export default GlobalStyle;
