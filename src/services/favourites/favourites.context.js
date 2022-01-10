import React, { createContext, useContext, useEffect, useState } from "react";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthenticationContext } from "../authentication/authentication.context";

export const FavouritesContext = createContext();

export const FavouritesContextProvider = ({ children }) => {
  const { user } = useContext(AuthenticationContext);

  const [favourites, setFavourites] = useState([]);

  const add = (restaurant) => {
    setFavourites([
      ...favourites,
      restaurant
    ]);
  };

  const remove = (restaurant) => {
    const newFavourites = favourites.filter((element) => element.placeId !== restaurant.placeId);

    setFavourites(newFavourites);
  };

  const loadFavourites = async () => {
    try {
      const jsonFavourites = await AsyncStorage.getItem(`@favourites-${user?.uid}`);
      if (jsonFavourites) {
        const parsedFavourites = JSON.parse(favourites);

        setFavourites(parsedFavourites);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const saveFavourites = async () => {
    try {
      const jsonFavourites = JSON.stringify(favourites);

      await AsyncStorage.setItem(`@favourites-${user?.uid}`, jsonFavourites);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    if (user) {
      loadFavourites();
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      saveFavourites();
    }
  }, [favourites, user]);

  return (
    <FavouritesContext.Provider value={{
      favourites,
      addToFavourites: add,
      removeFromFavourites: remove
    }}>
      {children}
    </FavouritesContext.Provider>
  );
}