import React, { useContext, useState } from "react";

import { FlatList, View } from "react-native";
import { Searchbar } from "react-native-paper";
import { RestaurantInfoCard } from "../components/restaurant-info-card.component";
import styled from 'styled-components/native';
import { Spacer } from "../../../components/spacer/spacer.component";

import { SafeArea } from "../../../components/utility/safe-area.component";
import { RestaurantsContext } from "../../../services/restaurants/mock/restaurants.context";

import { ActivityIndicator, Colors } from 'react-native-paper';
import { theme } from "../../../infrastructure/theme";

const SearchContainer = styled.View`
  padding: ${(props) => props.theme.space[3]};
`;

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

export const RestaurantsScreen = () => {
  const restaurantsContext = useContext(RestaurantsContext);

  const { isLoading, error, restaurants } = restaurantsContext;
  const [searchQuery, setSearchQuery] = useState("");

  const onChangeSearch = (query) => setSearchQuery(query);
  return (
    <SafeArea>
      {
        isLoading ?
          <LoaderContainer>
            <Loader
              size={50}
              animating={true}
              color={theme.colors.brand.primary} />
          </LoaderContainer>
          :
          <>
            <SearchContainer>
              <Searchbar
                placeholder="Search"
                onChangeText={onChangeSearch}
                value={searchQuery}
              />
            </SearchContainer>
            <RestaurantList
              data={restaurants}
              renderItem={({ item }) => {
                return (
                  <Spacer position="bottom" size="large">
                    <RestaurantInfoCard restaurant={item} />
                  </Spacer>
                )
              }
              }
              keyExtractor={(item) => item.name}
            />
          </>
      }
    </SafeArea>
  );
};
