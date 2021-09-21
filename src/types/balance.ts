export enum Balance {
  Na,
  CWD,
  MGCWD,
  GCWD,
  DIAMOND,
  CROWD_BTC,
  CWDBONUS,
  CARBONE,
  BRONZE,
  FUTURE4,
  FUTURE5,
  FUTURE6,
  MCENT,
  PRIDE,
  GLOBALSAFE,
  CROWD,
  SILVER,
  ALTER,
  SILVER_I3700820,
  SILVER_I61900820,
  SILVER_I3100INF,
  SILVER_I12150820,
  CARBON,
  PLATINUM,
  MG621P600,
  D621P6000,
  G621P25000,
  CWDPOLIS,
  CWDHOME,
  INDEX,
  INDEX_SHARE,
  INDEX_CWD,
  MG721P7500,
  MG921P18000,
  D721P25000,
  D921P60000,
  G721P42000,
  G921P64000,
  INDEX_MSHARE,
  MG821P15000,
  D821P50000,
  GARANT,
  UGLTEST,
  GLOBAL,
  GF,
  FF,
  GF5,
  GF6,
  FF5,
  FF6,
  MULTICS = 59
}

export type BalanceList = {
  balanceKind: number;
  volume: number;
}
export type Notify = {
  text: string;
  error: boolean;
  timeleft: number;
  id: number;
}
