
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


