import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext({
  isLoggedIn: false,
  loginHandler: () => {},
  logoutHandler: () => {},
});

export function AuthContextProvider({ children }) {
  // manage auth state in context
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  const navigate = useNavigate();
  
  // when user logins
  const loginHandler = () => {
    setIsLoggedIn(true);
  };

  // when user logs out
  const logoutHandler = () => {
    setIsLoggedIn(false);
    navigate(`/`);
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
