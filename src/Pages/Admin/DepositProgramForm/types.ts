import { BalanceKind } from "../../../enums/balanceKind";
import { DepositKind } from "../../../enums/depositKind";
import { LanguageCode } from "../../../enums/languageCode";

export type DepositProgramFormPropsType = {
  setOpenNewProgram: (status: boolean) => void;
};

export type Exchange = {
    // <summary>
    // Base asset.
    // </summary>
    assetId : string

    // <summary>
    // Rate to quote asset
    // </summary>
    Rate : number
}

export type AddDepositModel = {
    // <summary>
    // Deposit name.
    // </summary>
    name : string;

    // <summary>
    // Deposit description.
    // </summary>
    description : string;

    // <summary>
    // Deposit minimal amount.
    // </summary>
    minAmount : number

    // <summary>
    // Deposit maximal amount.
    // </summary>
    maxAmount : number

    // <summary>
    // </summary>
    duration : number 
    
    // <summary>
    // Deposit revenue payments interval in days (for instance every 30 days).
    // </summary>
    paymentsInterval : number

    // <summary>
    // How many time should be passed to start receive revenue (for instance payments from second month).
    // </summary>
    paymentsOffset : number

    // <summary>
    // Deposit payments days.
    // </summary>
    paymentsDays : string | null

    // <summary>
    // How much will customer receive from revenue.
    // </summary>
    ratio : number

    // <summary>
    // Is current product available for new deposits.
    // </summary>
    isActive : boolean

    // <summary>
    // Ratio to calculate affiliate commission. For ex.: 5% = 0.05.
    // </summary>
    affiliateRatio : string | null

    // <summary>
    // Deposit reference account. How can deposit be associated with payment.
    // </summary>
    referenceAccount : string

    // <summary>
    // Reference value. For example account name or some code from payment memo.
    // </summary>
    referenceCode : string | null

    // <summary>
    // Reference account WIF to decode reference code.
    // </summary>
    memoWif : string

    // <summary>
    // Deposit language.
    // </summary>
    Language : LanguageCode
    

    // <summary>
    // Reference account active WIF to make affiliate payments.
    // </summary>
    activeWif : string

    // <summary>
    // Deposit balance kind.
    // </summary>
    balanceKind : BalanceKind

    exchanges :Exchange[]

    // <summary>
    // Deposit kind.
    // </summary>
    depositKind : DepositKind

    // <summary>
    // Deposit activation price balance kind.
    // </summary>
    priceKind : BalanceKind | null

    // <summary>
    // Deposit activation price.
    // </summary>
    price : number | null

    // <summary>
    // Display deposit or not for customers.
    // </summary>
    isPublic : boolean

    // <summary>
    // Postponed deposit.
    // </summary>
    isInstant : boolean
}

export type ViewDepositModel = {
    // <summary>
    // Deposit id.
    // </summary>
    id : number

    // <summary>
    // Deposit safe id.
    // </summary>
    safeId : string

    // <summary>
    // Deposit name.
    // </summary>
    name : string

    // <summary>
    // Deposit description.
    // </summary>
    description : string | null

    // <summary>
    // Deposit minimal amount.
    // </summary>
    minAmount : number

    // <summary>
    // Deposit maximal amount.
    // </summary>
    maxAmount : number | null

    // <summary>
    // Deposit duration in days.
    // </summary>
    duration : number

    // <summary>
    // Deposit revenue payments interval in days (for instance every 30 days).
    // </summary>
    paymentsInterval : number

    // <summary>
    // How many time should be passed to start receive revenue (for instance payments from second month).
    // </summary>
    paymentsOffset : number

    // <summary>
    // Deposit payments days.
    // </summary>
    paymentsDays : string | null

    // <summary>
    // How much will customer receive from revenue.
    // </summary>
    ratio : number

    // <summary>
    // Is current product available for new deposits.
    // </summary>
    isActive : boolean

    // <summary>
    // Affiliate ratios levels.
    // </summary>
    AffiliateRatioArray : any[][]

    // <summary>
    // Deposit reference account. How can deposit be associated with payment.
    // </summary>
    referenceAccount : string

    // <summary>
    // Reference value. For example account name or some code from payment memo.
    // </summary>
    referenceCode : string | null

    // <summary>
    // Reference account WIF to decode reference code.
    // </summary>
    memoWif : string | null

    // <summary>
    // Deposit language.
    // </summary>
    Language : LanguageCode

    // <summary>
    // Reference account active WIF to make affiliate payments.
    // </summary>
    ActiveWif : string | null

    // <summary>
    // Deposit balance kind.
    // </summary>
    balanceKind : BalanceKind

    // <summary>
    // Deposit kind.
    // </summary>
    depositKind : DepositKind

    // <summary>
    // Exchange rates.
    // </summary>
    exchanges : Exchange []

    // <summary>
    // Display deposit or not for customers.
    // </summary>
    isPublic : boolean

    // <summary>
    // Deposit activation price balance kind.
    // </summary>
    priceKind : BalanceKind | null

    // <summary>
    // Deposit activation price.
    // </summary>
    price : number | null

    // <summary>
    // Postponed deposit.
    // </summary>
    isInstant : number
}
