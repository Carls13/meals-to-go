import React, { useState, createContext } from "react";

import { loginRequest, registerRequest } from "./authentication.service";

export const AuthenticationContext = createContext();

export const AuthenticationContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const onLogin = (email, password) => {
    setIsLoading(true);
    loginRequest(email, password).then((userResponse) => {
      setUser(userResponse);
      setIsLoading(false);
    })
      .catch((e) => {
        setIsLoading(false);
        setError(e.message);
      });
  };

  const onRegister = (email, password, repeatedPassword) => {
    if (password !== repeatedPassword) {
      setError("Password do not match");
      return;
    }

    setIsLoading(true);
    setError(false);

    registerRequest(email, password).then((userResponse) => {
      setUser(userResponse);
      setIsLoading(false);
    })
      .catch((e) => {
        setIsLoading(false);
        setError(e.message);
      });
  }

  return (
    <AuthenticationContext.Provider
      value={{
        isAuthenticated: !!user,
        user,
        isLoading,
        error,
        onLogin,
        onRegister
      }}
    >
      {children}
    </AuthenticationContext.Provider>
  );
};