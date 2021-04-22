import { DefaultTheme } from 'styled-components';

export const lightTheme = {
  body: `linear-gradient(
    0deg
    , rgba(0, 0, 0, 0.05), rgba(0, 0, 0, 0.05)), linear-gradient( 
    82.3deg
    , #effff9 3.67%, #f3f9ff 22.57%, #fffdf0 44.98%, #fff0f0 73%, #f0f0ff 95.88% ), #ffffff`,
    text: '#0E0D3D',
    text2: "#515172",
    text3: '#333',
    text3Hover: '#000',
    modal: '#fff',
    toggleBorder: '#FFF',
    buttonBorder: '#0E0D3D',
    header: `linear-gradient(
      0deg
      , rgba(0, 0, 0, 0.05), rgba(0, 0, 0, 0.05)), linear-gradient( 
      82.3deg
      , #effff9 3.67%, #f3f9ff 22.57%, #fffdf0 44.98%, #fff0f0 73%, #f0f0ff 95.88% ), #ffffff`,
    listBorder: 'rgba(81, 81, 114, 0.2)',
    link: '#00e',
    gradient: 'linear-gradient(#39598A, #79D7ED)',
    bbdis: "#ccc",
    card: {
      background: '#fff',
      backgroundAlfa: 'rgba(255, 255, 255, 0.4)',
      border: 'none'
    }
  }
  
  export const darkTheme = {
    body: 'rgba(48,48,48,1)',
    text: '#FFF',
    toggleBorder: '#6B8096',
    buttonBorder: '#FF416E',
    text2: "#E2E2E2",
    text3: '#fff',
    text3Hover: '#fff',
    link: '#fff',
    header: 'rgba(33, 33, 33, 1)',
    listBorder: 'rgba(255, 255, 255, 0.2)',
    gradient: 'linear-gradient(#091236, #1E215D)',
    modal: 'rgba(33, 33, 33, 1)',
    bbdis: "#666",
    card: {
      background: '#000',
      backgroundAlfa: 'rgba(33, 33, 33, 1)',
      border: '1px solid #000000'
    }
  }