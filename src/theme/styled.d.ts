import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    body: string;
    text: string;
    text2: string;
    text3: string;
    text3Hover: string;
    toggleBorder: string;
    gradient: string;
    link:string;
    buttonBorder:string;
    modal: string;
    header:string;
    listBorder: string;
    bbdis: string;
    card: {
      background: string;
      backgroundAlfa: string;
      border: string;
    }
  }
}