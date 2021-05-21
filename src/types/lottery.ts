export interface Definition {
    id: number;
    safeId: string;
    kind: number;
    isActive: boolean;
    balanceKind?: any;
    volume?: any;
}

export interface DrawLog {
    id: number;
    safeId: string;
    drawId: number;
    drawSafeId: string;
    drawDate: Date;
    isSuccess: boolean;
}

export interface CollectionLottery  {
    id: number;
    safeId: string;
    definition: Definition;
    drawLog: DrawLog;
    userId: number;
    userSafeId: string;
    userName: string;
}

export interface RootLottery {
    totalRecords: number;
    collection: CollectionLottery[];
}

export interface CollectionGetDraw {
    id: number;
    safeId: string;
    state: number;
    startDate: Date;
    delay: number;
    nextDraw: Date;
}

export interface RootGetDraw {
    totalRecords: number;
    collection: CollectionGetDraw[];
}

