import React, { createContext, useReducer, ReactNode, useContext } from "react";
import { rootReducer } from "./store"; 

export const StoreContext = createContext<any>(null);

export const StoreProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(rootReducer, {
    projects: [],
    tasks: [],
  });

  return (
    <StoreContext.Provider value={{ state, dispatch }}>
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error("useStore must be used within a StoreProvider");
  }
  return context;
};
