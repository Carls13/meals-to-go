import React, { createContext, useEffect, useState } from "react";

import AsyncStorage from "@react-native-async-storage/async-storage";

export const FavouritesContext = createContext();

export const FavouritesContextProvider = ({ children }) => {
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
      const jsonFavourites = await AsyncStorage.getItem("@favourites");
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
      const jsonFavourites = JSON.stringify(fvaourites);

      await AsyncStorage.setItem("@favourites", jsonFavourites);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    loadFavourites();
  }, []);

  useEffect(() => {
    saveFavourites();
  }, [favourites]);

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