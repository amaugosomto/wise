export type HomeStateType = {
  isLogin: boolean,
  loading: boolean
}

export type AppContextType = {
  state: {isLoggedIn: boolean};
  setIsLoggedIn: (val: boolean) => void;
}

export type UserAccount = {
  fullName: string,
  email: string,
  password: string
}

export interface IHomeProps extends HomeStateType {
  updateState: (data: {isLogin?: boolean, loading?: boolean}) => void
}