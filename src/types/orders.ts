import { Balance } from "./balance";
import { FiatKind } from "./fiat";

export enum OrderState {
    Active,
    Cancelled,
    Completed,
}

export interface Time {
    ticks: any;
    days: number;
    hours: number;
    milliseconds: number;
    minutes: number;
    seconds: number;
    totalDays: number;
    totalHours: number;
    totalMilliseconds: number;
    totalMinutes: number;
    totalSeconds: number;
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
    operationWindow: Time;
    orderState: OrderState;
    totalExecuted: number;
    terms?: string;
    userRating: string;
}

export interface ViewBuyOrderModel extends OrderBaseModel {
    id: number;
};

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