import { Balance } from "./balance";

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

export interface ViewUserCertificateModel {
    id: number;
    safeId: string;
    userId: number;
    userSafeId: string;
    creationDate: string;
    finishDate: string;
    certificate: ViewTradeCertificateModel;
  }

  export interface ViewTradeCertificateModel {
    id: number;
    safeId: string;
    name: string;
    description: string;
    duration: number;
    assetKind: Balance;
    dailyVolume: number;
  }