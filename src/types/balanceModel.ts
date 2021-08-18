export interface BalanceModel {
    balanceKind: number;
    amount: number;
    safeAmount: string;
};

export interface CompanyAccountModel {
    id: number;
    safeId: string;
    name: string;
    activeWif: string;
    memoWif: string;
    balances: BalanceModel[];
};

export interface CompanyAccountModelCollectionResult {
    totalRecords: number;
    collection: CompanyAccountModel[];
};

export interface AddCompanyAccountModel {
    id?: number;
    name: string;
    activeWif: string;
    memoWif: string;
};
