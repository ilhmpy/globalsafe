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
`;

export const Card = styled.div`
  background: #fff;
  width: 100%;
  box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
  margin-bottom: 20px;
`;

export default GlobalStyle;
