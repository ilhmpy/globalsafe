
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

export interface PaymentsCollection {
    id: number;
    safeId: string;
    userId: number;
    userSafeId: string;
    userName: string;
    amount: number;
    amountView: number;
    baseAmount: number;
    baseAmountView: number;
    creationDate: Date;
    endDate: Date;
    paymentDate: Date;
    paymentAmountView: number;
    state: number;
    payedAmount: number;
    payedAmountView: number;
    payAmount: number;
    prevPayment?: any;
    updatedDate: Date;
    deposit: Deposit;
}

export interface RootPayments {
    totalRecords: number;
    collection: PaymentsCollection[];
}



export interface DepositCharges {
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

export interface UserDeposit {
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
    paymentDate: Date;
    paymentAmountView?: any;
    state: number;
    payedAmount: number;
    payedAmountView: number;
    payAmountView: number;
    prevPayment: Date;
    updatedDate: Date;
    deposit: DepositCharges;
}

export interface CollectionCharges {
    id: number;
    safeId: string;
    account: string;
    userDeposit: UserDeposit;
    operationDate: Date;
    operationKind: number;
    amount: number;
}

export interface RootCharges {
    totalRecords: number;
    collection: CollectionCharges[];
}

