import { BalanceKind } from "../../../enums/balanceKind";
import { DepositKind } from "../../../enums/depositKind";
import { LanguageCode } from "../../../enums/languageCode";

export const defaultFormState =  {
    Language: LanguageCode.Russian,
    activeWif: '',
    affiliateRatio: [],
    balanceKind: BalanceKind.CWD,
    depositKind: DepositKind.Fixed,
    description: '',
    duration: 0,
    exchanges: [],
    isActive: false,
    isInstant: false,
    isPublic: false,
    maxAmount: 0,
    memoWif: '',
    minAmount: 0,
    name: '',
    paymentsDays: null,
    paymentsInterval: 0,
    paymentsOffset: 0,
    price: null,
    priceKind: null,
    ratio: 0,
    referenceAccount: '',
    referenceCode: null,
}
