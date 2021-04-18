export interface PayDeposit {
    id: any;
    safeId: string;
    name: string;
    description: string;
    minAmount: number;
    maxAmount?: any;
    duration: number;
    paymentInterval: number;
    paymentOffset: number;
    paymentRatio: number;
    isActive: boolean;
    account: string;
    asset: number;
    depositKind: number;
    priceKind?: any;
    price?: any;
}

export interface RootPayDeposit {
    payoutDate: Date;
    depositCreationDate: Date;
    deposit: PayDeposit;
    profit: number;
}

export interface Pokedex  {
    depositName: string;
    date: Date;
    procent:number;
    colors:string;
    deposit: PayDeposit;
}
