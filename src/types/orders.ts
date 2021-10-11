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
    methodsKindsJson: string; // 
    methodsKinds: any[]; // PaymentMethodKind[]
    creationDate: Date;
    rate: number;
    operationWindow: any; //
    orderState: OrderState;
    totalExecuted: number;
    terms?: string;
    userRating: string;
}

export interface ViewBuyOrderModel extends OrderBaseModel {};
export interface ViewSellOrderModel extends OrderBaseModel {};

export interface GetBuyOrdersModel {
    totalRecords: number;
    collection: ViewBuyOrderModel[];
}

export interface GetSellOrdersModel {
    totalRecords: number;
    collection: ViewSellOrderModel[];
}