export type HomeStateType = {
  isLogin: boolean,
  loading: boolean
}

export type AppContextType = {
  state: {isLoggedIn: boolean};
  setIsLoggedIn: (val: boolean) => void;
}

export interface IHomeProps extends HomeStateType {
  updateState: (key: string, value: boolean) => void
}