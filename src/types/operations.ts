export interface Collection {
    date: Date;
    operationKind: number;
    depositName: string;
    amount: number;
}

export interface RootOperations {
    totalRecords: number;
    collection: Collection[];
}