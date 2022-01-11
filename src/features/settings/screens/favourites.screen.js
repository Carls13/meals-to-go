import React, { useContext } from "react";
import { List, Avatar } from "react-native-paper";
import { SafeArea } from "../../../components/utility/safe-area.component";
import { AuthenticationContext } from "../../../services/authentication/authentication.context";
import { FavouritesContext } from "../../../services/favourites/favourites.context";

import { Text } from "../../../components/typography/text.component";
import styled from "styled-components/native";
import { RestaurantList } from "../../restaurants/components/restaurant-list.component";
import { TouchableOpacity } from "react-native";
import { Spacer } from "../../../components/spacer/spacer.component";
import { RestaurantInfoCard } from "../../restaurants/components/restaurant-info-card.component";

const NoFavouritesArea = styled(SafeArea)`
  align-items: center;
  justify-content: center;
`;


export const FavouritesScreen = ({ navigation }) => {
  const { favourites } = useContext(FavouritesContext);

  const handlePressCard = (restaurant) => {
    navigation.navigate("RestaurantDetail", { restaurant });
  }

  return favourites.length ?
    <SafeArea>
      <RestaurantList data={favourites}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity onPress={() => handlePressCard(item)}>
              <Spacer position="bottom" size="large">
                <RestaurantInfoCard restaurant={item} />
              </Spacer>
            </TouchableOpacity>
          );
        }
        }
        keyExtractor={(item) => item.name} />
    </SafeArea>
    :
    <NoFavouritesArea>
      <Text>No favourites yet</Text>
    </NoFavouritesArea>
}