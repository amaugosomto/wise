import React, { useContext } from "react";
import { AppContextType } from "./utils";

export const AppContext = React.createContext<AppContextType>({
  state: {isLoggedIn: false},
  setIsLoggedIn: () => {},
  setUser: () => {},
  logout: () => {}
});

export const useContextState = () => useContext(AppContext);