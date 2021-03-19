export type DepositStats = {
    depositName: string; 
    count: number; 
    amount: number;
}

export interface CollectionListDeposits {
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

export interface ListDeposits {
    totalRecords: number;
    collection: CollectionListDeposits[];
}

