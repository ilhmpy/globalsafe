import { Balance } from "./balance";
import { FiatKind } from "./fiat";

export enum OrderState {
    Active,
    Cancelled,
    Completed,
}

interface OrderBaseModel {
    id: number;
    safeId: string;
    userId: number;
    userSafeId: string;
    assetKind: Balance;
    volume: number;
    operationAssetKind: FiatKind;
    limitFrom: number;
    limitTo: number;
    methodsKindsJson: string;
    methodsKinds: number[]; 
    creationDate: Date;
    rate: number;
    operationWindow: any; //
    orderState: OrderState;
    totalExecuted: number;
    terms?: string;
    userRating: string;
}
// tslint:@typescript-eslint/no-empty-interface
export interface ViewBuyOrderModel extends OrderBaseModel {
    id: number;
};
// @ts-ignore: Unreachable code error
export interface ViewSellOrderModel extends OrderBaseModel {
    id: number;
};

export interface GetBuyOrdersModel {
    totalRecords: number;
    collection: ViewBuyOrderModel[];
}

export interface GetSellOrdersModel {
    totalRecords: number;
    collection: ViewSellOrderModel[];
}

export enum OrderType {
    Buy = 'buy',
    Sell = 'sell',
}