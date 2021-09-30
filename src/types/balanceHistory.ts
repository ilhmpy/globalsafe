
export interface Collection {
    id: any;
    safeId: string;
    balanceId: any;
    balanceSafeId: string;
    operationKind: number;
    referenceId: any;
    referenceSafeId: string;
    balanceDelta: number;
    operationDate: Date;
}

export interface RootBalanceList {
    totalRecords: number;
    collection: Collection[];
}


