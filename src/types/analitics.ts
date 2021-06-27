 export interface Deposit {
    id: number;
    safeId: string;
    name: string;
    description: string;
    minAmount: number;
    maxAmount?: any;
    duration: number;
    paymentInterval: number;
    paymentOffset: number;
    paymentRatio: number;
    isActive: boolean;
    account: string;
    asset: number;
    depositKind: number;
    priceKind?: any;
    price?: any;
}

export interface CollectionAnalitics {
    id: number;
    safeId: string;
    payoutDate: Date;
    deposit: Deposit;
    count: number;
    amount: number;
}

export interface RootAnalitics {
    totalRecords: number;
    collection: CollectionAnalitics[];
}



