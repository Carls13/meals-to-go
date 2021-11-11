import React, { useContext } from "react";

import { FlatList, TouchableOpacity } from "react-native";
import { RestaurantInfoCard } from "../components/restaurant-info-card.component";
import styled from 'styled-components/native';
import { Spacer } from "../../../components/spacer/spacer.component";

import { SafeArea } from "../../../components/utility/safe-area.component";
import { RestaurantsContext } from "../../../services/restaurants/mock/restaurants.context";

import { ActivityIndicator } from 'react-native-paper';
import { theme } from "../../../infrastructure/theme";

import { Search } from './../components/search.component';

const RestaurantList = styled(FlatList).attrs({
  contentContainerStyle: {
    padding: 16
  }
})``;

const Loader = styled(ActivityIndicator)`
  margin-left: -25px;
  margin-top: -25px;
`;

const LoaderContainer = styled.View`
  position: absolute;
  top: 50%;
  left: 50%;
`;

export const RestaurantsScreen = ({ navigation }) => {
  const restaurantsContext = useContext(RestaurantsContext);

  const { isLoading, restaurants } = restaurantsContext;

  const handlePressCard = (restaurant) => {
    navigation.navigate("RestaurantDetail", { restaurant });
  }

  return (
    <SafeArea>
      {
        isLoading &&
        <LoaderContainer>
          <Loader
            size={50}
            animating={true}
            color={theme.colors.brand.primary} />
        </LoaderContainer>}
      <Search />
      <RestaurantList
        data={restaurants}
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
        keyExtractor={(item) => item.name}
      />
    </SafeArea>
  );
};
