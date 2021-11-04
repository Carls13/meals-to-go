import React, { useState, useEffect, createContext } from "react";

import { locationRequest, locationTransform } from "./location.service";

export const LocationContext = createContext();

export const LocationContextProvider = ({ children }) => {
  const [keyword, setKeyword] = useState("san francisco");
  const [location, setLocation] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const onSearch = (searchKeyword) => {
    setIsLoading(true);

    locationRequest(searchKeyword)
      .then(locationTransform)
      .then(result => {
        setIsLoading(false);
        setLocation(result);
        console.log(result);
      })
      .catch((error) => {
        setIsLoading(false);
        setError(error.message);
      })
  };

  useEffect(() => {
    onSearch(keyword);
  }, []);

  return (
    <LocationContext.Provider value={{
      isLoading,
      error,
      location,
      search: () => null,
      keyword
    }} >
      {children}
    </LocationContext.Provider>
  )
}