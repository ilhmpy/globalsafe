export enum Balance {
    Na,
    CWD,
    MGCWD,
    GCWD,
    DIAMOND,
    CROWDBTC,
    CWDBONUS,
    CARBONE,
    BRONZE,
    FUTURE4,
    FUTURE5,
    FUTURE6,
    GLOBALSAFE
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
