export interface Deposit {
    id: number;
    safeId: string;
    name: string;
    description: string;
    minAmount: number;
    duration: number;
    paymentInterval: number;
    paymentOffset: number;
    paymentRatio: number;
    isActive: boolean;
    account: string;
    asset: number;
    depositKind: number;
}

export interface Collection {
    id: number;
    safeId: string;
    userId: number;
    userSafeId: string;
    amount: number;
    amountView: number;
    baseAmount: number;
    baseAmountView: number;
    creationDate: Date;
    endDate: Date;
    paymentDate: Date | null;
    paymentAmountView?: any;
    state: number;
    deposit: Deposit;
    prevPayedAmountView: number;
    loanVolume: number;
    pendingAmount: number;
}

export interface RootList {
    totalRecords: number;
    collection: Collection[];
}


export interface DepositsCollection {
    id: number;
    safeId: string;
    name: string;
    description: string;
    minAmount: number;
    duration: number;
    paymentInterval: number;
    paymentOffset: number;
    paymentRatio: number;
    isActive: boolean;
    account: string;
    asset: number;
    depositKind: number;
    priceKind: number;
    price2Kind?: number;
    price: number;
    price2?: number;
}

export interface RootDeposits {
    totalRecords: number;
    collection: DepositsCollection[];
}

export type Commisions = {
  BalanceKind: any;
  amount: any;
}
