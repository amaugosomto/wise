import React, { useContext } from "react";
import { AppContextType } from "./utils";

export const AppContext = React.createContext<AppContextType>({
  state: {isLoggedIn: false, wallets: []},
  setIsLoggedIn: () => {},
  setUser: () => {},
  logout: () => {},
  setWallets: () => {}
});

export const useContextState = () => useContext(AppContext);