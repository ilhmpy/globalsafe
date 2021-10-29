import { FiatKind } from "./fiatKind";

export enum PaymentMethodKind {
  ERC20,
  TRC20,
  BEP20,
  Tinkoff,
  Sberbank,
  Alfabank
}

export interface CollectionPayMethod {
    id: number;
    safeId: string;
    userId: number;
    userSafeId: string;
    account: string;
    kind: PaymentMethodKind;
    state: number;
    data: string;
    assetKind: FiatKind;
}
  
export interface RootPayMethod {
  totalRecords: number;
  collection: CollectionPayMethod[];
}