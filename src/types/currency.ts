export interface Collection {
    id: number;
    assetKind: number;
    baseVolume: number;
    quoteVolume: number;
    highestBid: number;
    latestBid: number;
    lowestBid: number;
    date: Date;
}

export interface RootChange {
    totalRecords: number;
    collection: Collection[];
}

