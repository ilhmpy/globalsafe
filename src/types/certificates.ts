export interface Collection {
    id: number;
    safeId: string;
    name: string;
    description: string;
    duration: number;
    assetKind: number;
    dailyVolume: number;
}

export interface RootCertificates {
    totalRecords: number;
    collection: Collection[];
}

