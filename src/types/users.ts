export interface CollectionUsers {
    id: number;
    safeId: string;
    email: string;
    isEmailConfirmed: boolean;
    name: string;
    phoneNumber?: any;
    isPhoneNumberConfirmed: boolean;
    isLockedout: boolean;
    lockoutEnd?: any;
    accessFailedCount: number;
    isTwoFactorEnabled: boolean;
    creationDate: Date;
    claims: any[];
    roles: any[];
    languageCode: number;
    balances: any[];
}

export interface RootUsers {
    totalRecords: number;
    collection: CollectionUsers[];
}



