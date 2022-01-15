import { UserAccount as UserModel } from '@prisma/client' 

export type HomeStateType = {
  isLogin: boolean,
  loading: boolean
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