import React, { useContext } from "react";
import { FavouritesContext } from "../../services/favourites/favourites.context";
import styled from "styled-components/native";
import { TouchableOpacity } from "react-native";

import { AntDesign } from "@expo/vector-icons";

const FavouriteButton = styled(TouchableOpacity)`
  position: absolute;
  top: 25px;
  right: 25px;
  z-index: 9;
`;

export const Favourite = ({ restaurant }) => {
  const { favourites, addToFavourites, removeFromFavourites } = useContext(FavouritesContext);

  const isFavourite = favourites.find((favourite) => favourite.placeId === restaurant.placeId);

  const handlePress = () => {
    if (isFavourite) {
      removeFromFavourites(restaurant);
      return;
    }

    addToFavourites(restaurant);
  };

  return (
    <FavouriteButton
      onPress={handlePress}
    >
      <AntDesign
        name={isFavourite ? "heart" : "hearto"}
        size={30}
        color={isFavourite ? "#ffaa00" : "white"}
      />
    </FavouriteButton>
  );
}