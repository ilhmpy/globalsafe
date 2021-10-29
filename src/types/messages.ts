export interface CollectionHistory {
    id: number;
    safeId: string;
    userId: number;
    userSafeId: string;
    userName: string;
    exchangeId: number;
    exchangeSafeId: string;
    message: string;
    messageKind: number;
    messageDate: string;
}

export interface RootHistory {
    totalRecords: number;
    collection: CollectionHistory[];
}