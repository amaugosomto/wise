
import {
  Transaction as TransactionModel,
  Currency as CurrencyModel,
  Status as StatusModel
} from '.prisma/client'

export type HomeStateType = {
  isLogin: boolean,
  loading: boolean
}

export type UserModel = {
  id: string
  fullName: string
  email: string
  password: string
  created_at: Date
  updated_at: Date
}

export type WalletModel = {
  id: string
  userId: string
  currencyId: number
  amount: number
  created_at: Date
  updated_at: Date
}

export type WalletView = {
  id: string
  amount: number
  currency: {name: string}
}

export type AppContextType = {
  state: {
    isLoggedIn: boolean,
    user? : UserModel
  };
  setIsLoggedIn: (val: boolean) => void;
  setUser: (val: UserModel) => void;
  logout: () => void;
}

export type UserAccount = {
  fullName: string,
  email: string,
  password: string
}

export type LoginDetails = {
  email: string,
  password: string
}

export interface IHomeProps extends HomeStateType {
  updateState: (data: {isLogin?: boolean, loading?: boolean}) => void
}

export type TransactionView = {
  id: string
  sentUser: {fullName: string} | null
  receivedUser: {fullName: string} | null
  status: { name: string }
  rate: number
  amount: number
  sentCurrency: { name: string }
  receivedCurrency: { name: string } | null
  statusId: number
  created_at: Date
  updated_at: Date
}

export type Wallet = {
  amount: number,
  currency: { name: string }
}

export enum Status {
  Pending = 1,
  Received = 2,
  Rejected = 3
}

export enum Currency {
  USD = 1,
  EUR = 2,
  NGN = 3
}