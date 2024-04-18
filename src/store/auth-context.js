import { createContext, useState } from "react";

export const AuthContext = createContext({
  isLoggedIn: true,
  loginHandler: () => {},
  logoutHandler: () => {},
});

export function AuthContextProvider({ children }) {
  // manage auth state in context
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // when user logins
  const loginHandler = () => {
    setIsLoggedIn(true);
  };

  // when user logs out
  const logoutHandler = () => {
    setIsLoggedIn(false);
  };

  const context = {
    isLoggedIn,
    loginHandler,
    logoutHandler,
  };

  return (
    <AuthContext.Provider value={context}>{children}</AuthContext.Provider>
  );
}
