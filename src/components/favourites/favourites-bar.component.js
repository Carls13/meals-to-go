import React from "react";
import { ScrollView, TouchableOpacity, View } from "react-native";

import styled from "styled-components/native";
import { CompactRestaurantInfo } from "../compact-restaurant/compact-restaurant.component";
import { Spacer } from "../spacer/spacer.component";
import { Text } from "../typography/text.component";

const FavouritesWrapper = styled.View`
  padding: 10px;
`;

export const FavouritesBar = ({ favourites, onNavigate }) => {
  if (!favourites.length) return null;

  return (
    <FavouritesWrapper>
      <Spacer position="left" size="medium">
        <Text variant="caption">Favourites</Text>
      </Spacer>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {
          favourites.map((restaurant) => {
            const key = restaurant.name.split(" ").join("-");

            return (
              <Spacer key={key} position="left" size="medium">
                <TouchableOpacity onPress={() => onNavigate("RestaurantDetail", { restaurant })}>
                  <CompactRestaurantInfo restaurant={restaurant} />
                </TouchableOpacity>
              </Spacer>
            );
          })
        }
      </ScrollView>
    </FavouritesWrapper>
  );
};