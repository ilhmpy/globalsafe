export enum Balance {
    Na,
    CWD,
    MGCWD,
    GCWD,
    DIAMOND,
    CROWDBTC,
    CWDBONUS,
    CARBONE
}

export type BalanceList = {
    balanceKind: number;
    volume: number;
}