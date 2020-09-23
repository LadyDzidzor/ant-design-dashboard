import React, { createContext, useReducer } from "react";
import AppReducer from "./AppReducer";

// initial state
const initialState = {
  user: {},
  loading: true,
  error: null,
};

// Create context
export const GlobalContext = createContext(initialState);

// Provider component
export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  // Actions
  // @TODO:: Implement admin access control

  return (
    <GlobalProvider
      value={{ user: state.user, loading: state.loading, error: state.error }}
    >
      {children}
    </GlobalProvider>
  );
};
