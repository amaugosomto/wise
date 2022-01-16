
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