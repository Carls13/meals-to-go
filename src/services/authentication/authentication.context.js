import React, { useState, createContext } from "react";

import { loginRequest, registerRequest } from "./authentication.service";

import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

export const AuthenticationContext = createContext();

export const AuthenticationContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  firebase.auth().onAuthStateChanged((loggedInUser) => {
    if (loggedInUser) {
      setUser(loggedInUser);
    }
  })

  const onLogin = (email, password) => {
    setIsLoading(true);
    setError(false);

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

  const onLogout = () => {
    setUser(null);
    firebase.auth().signOut();
  }

  return (
    <AuthenticationContext.Provider
      value={{
        isAuthenticated: !!user,
        user,
        isLoading,
        error,
        onLogin,
        onRegister,
        onLogout
      }}
    >
      {children}
    </AuthenticationContext.Provider>
  );
};