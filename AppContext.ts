import React, { useContext } from "react";
import { AppContextType } from "./utils";

export const AppContext = React.createContext<AppContextType>({
  state: {isLoggedIn: false},
  setIsLoggedIn: isLoggedIn => {}
});

export const useContextState = () => useContext(AppContext);