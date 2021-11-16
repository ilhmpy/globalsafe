import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    // OLD CODE
    body: string;
    text: string;
    text2: string;
    text3: string;
    text3Hover: string;
    toggleBorder: string;
    gradient: string;
    link: string;
    buttonBorder: string;
    dangerButtonText: string;
    modal: string;
    header: string;
    listBorder: string;
    bbdis: string;
    cdis: string;
    depositHead: string;
    nextPay: string;
    thHead: string;
    topUpButton: string;
    topUpColor: string;
    switch: string;
    inputBg: string;
    border: string;
    range: string;
    repeatCode: string;
    slot: string;
    card: {
      background: string;
      backgroundAlfa: string;
      border: string;
    };
    descFund: string;
    partnerProgram: {
      background: string;
      color: string;
      titleColor: string;
      lineNumberColor: string;
      lineItemColor: string;
      nthItemBG: string;
      titlePhoneColor: string;
    };
    pagination: {
      selectCountBackgroundImage: string;
    };
    footer: {
      color: string;
    };
    sortingWindow: {
      backgroundColor: string;
      fontColor: string;
    };
    acceptAll: {
      bg: string;
      desc: string;
      opacity: string;
      item: string;
    };
    timerIcon: {
      background: string;
      border: string;
    };
    tech: {
      color: string;
    };
    loader: {
      bg: string;
      pointsColor: string;
    };
    timer: {
      bg: string;
      color: string;
      beforeBg: string;
    };
    pink: string;
    rounIputBackground: string;
    v2:{
      text: string;
      blackText: string;
      bg: string;
      neutral: string;
      activeBlue: string;
      neutralBlue: string;
      body: string;
      header:{
        background: string;
        burger: string;
      }
    },
    titles: string;
    toToken: {
      background: string;
      color: string;
      convertColor: string;
    };
    authBgGray: string;
    black: string;
    white: string;
    blue: string;
    operations: {
      descClr: string;
      headBg: string;
      headClr: string;
      ich1: string;
      ich2: string;
      tableBg: string;
    }

    // NEW CODE
    main: {
      bodyBackground: string;
      bodyColor: string;
    }, 
    notifies: {
      notifyBackground: string;
      notifiesBorder: string;
      notifiesDateColor: string;
      doneNotify: string;
      notifiesBoxShadow: string;
      notifyBlockBackground: string;
    }
  }
}
