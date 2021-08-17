export interface BalanceModel {
    balanceKind: number;
    amount: number;
    safeAmount: string;
};

export interface ViewCompanyAccountModel {
    id: number;
    safeId: string;
    name: string;
    activeWif: string;
    memoWif: string;
    balances: any[];
};

export interface ViewCompanyAccountModelCollectionResult {
    totalRecords: number;
    collection: ViewCompanyAccountModel[];
};

export interface AddCompanyAccountModel {
    id?: number;
    name: string;
    activeWif: string;
    memoWif: string;
};


