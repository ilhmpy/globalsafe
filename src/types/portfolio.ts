export type Portfolio = {
    GCWD: number; 
    DIAMOND: number; 
    MGCWD: number;
}

export interface CollectionPortfolio {
    id: number;
    asset: number;
    volume: number;
    initialVolume: number;
    unitPrice: number;
    creationDate: Date;
    opearionId: number;
    safeId: string;
}

export interface RootPortfolio {
    totalRecords: number;
    collection: CollectionPortfolio[];
}



