export interface RootDrawResult {
    id: number
    safeId: string
    kind: number
    isActive: boolean
    balanceKind?: number
    volume?: number
  }
  
  export interface Prize {
    id: number
    safeId: string
    kind: number
    isActive: boolean
    balanceKind: any
    volume: any
  }
  
  export interface Users {
    id: number
    safeId: string
    email: string
    isEmailConfirmed: boolean
    name: string
    phoneNumber: any
    isPhoneNumberConfirmed: boolean
    isLockedout: boolean
    lockoutEnd: any
    accessFailedCount: number
    isTwoFactorEnabled: boolean
    creationDate: string
    claims: Claim[]
    roles: any[]
    languageCode: number
    balances: Balance[]
  }
  
  export interface Claim {
    id: number
    claimType: string
    claimValue: string
    safeId: string
  }
  
  export interface Balance {
    id: number
    safeId: string
    balanceKind: number
    volume: number
    exhaustBalanceKind: number
    exhaustRatio: number
  }
  
  export interface Winner {
    id: number
    safeId: string
    email: string
    isEmailConfirmed: boolean
    name: string
    phoneNumber: any
    isPhoneNumberConfirmed: boolean
    isLockedout: boolean
    lockoutEnd: any
    accessFailedCount: number
    isTwoFactorEnabled: boolean
    creationDate: string
    claims: any[]
    roles: any[]
    languageCode: number
    balances: any[]
  }
  