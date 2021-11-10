export interface ViewMarkModel {
    exchangeId: number;
    id: number;
    mark: number;
    ownerId: number;
    userId: number;
};

export interface UserMarksCollectionResult {
    collection: ViewMarkModel[];
    totalRecords: number;
};