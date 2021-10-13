export enum Balance {
  Na, // 0
  CWD, // 1
  MGCWD, // 2
  GCWD, // 3
  DIAMOND, // 4
  CROWD_BTC, // 5
  CWDBONUS, // 6
  CARBONE, // 7
  BRONZE, // 8
  FUTURE4, // 9
  FUTURE5, // 10
  FUTURE6, // 11
  MCENT, // 12
  PRIDE, // 13
  GLOBALSAFE, // 14
  CROWD, // 15
  SILVER, // 16
  ALTER, // 16
  SILVER_I3700820, // 17
  SILVER_I61900820, // 18
  SILVER_I3100INF, // 19
  SILVER_I12150820, // 20
  CARBON, // 21
  PLATINUM, // 22 
  MG621P600, // 23 
  D621P6000, // 24
  G621P25000, // 25
  CWDPOLIS, // 26
  CWDHOME, // 27
  INDEX, // 28
  INDEX_SHARE, // 29
  INDEX_CWD, // 30
  MG721P7500, // 31
  MG921P18000, // 32
  D721P25000, // 33
  D921P60000, // 34
  G721P42000, // 35
  G921P64000, // 36
  INDEX_MSHARE, // 37
  MG821P15000, // 38
  D821P50000, // 39
  GARANT, // 40
  UGLTEST, // 41
  GLOBAL, // 42
  GF, // 43
  FF, // 44
  GF5, // 45
  GF6, // 46
  FF5, // 47
  FF6, // 48
  FF7, // 49
  FF8, // 50
  FF9, // 51
  FF10, // 52
  FF11, // 53
  FF12, // 54
  FF13, // 55 
  FF14, // 56
  FF15, // 57
  MULTICS = 59 //
}

export type BalanceList = {
  balanceKind: number;
  volume: number;
  safeId: string;
  id: number;
  exhaustRatio: number;
  exhaustBalanceKind: number;
}
export type Notify = {
  text: string;
  error: boolean;
  timeleft: number;
  id: number;
}
