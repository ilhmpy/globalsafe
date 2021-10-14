import { FiatKind } from "./fiatKind";

export enum PaymentMethodKind {
  ERC20,
  TRC20,
  BEP20,
  BankTransfer,
  Tinkoff,
  Sberbank,
  Alfabank
}

// Use One If this enums for paymentMethod Kinds
// export enum IPaymentMethodKind {
//   USDT,
//   BankTransfer,
//   Tinkoff,
//   Sberbank,
//   Alfabank
// }

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