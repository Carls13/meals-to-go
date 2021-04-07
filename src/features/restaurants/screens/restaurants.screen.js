import React, { useState } from "react";

import { StatusBar } from "react-native";
import { Searchbar } from "react-native-paper";
import { RestaurantInfoCard } from "../components/reaturant-info-card.component";
import styled from 'styled-components/native';

const RootContainer = styled.SafeAreaView`
  flex: 1;
  margin-top: ${StatusBar.currentHeight};
`;

const SearchContainer = styled.View`
  padding: 16px;
`;
const ListContainer = styled.View`
  flex: 1;
  padding: 16px;
`;

export const RestaurantsScreen = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const onChangeSearch = (query) => setSearchQuery(query);
  return (
    <RootContainer>
      <SearchContainer>
        <Searchbar
          placeholder="Search"
          onChangeText={onChangeSearch}
          value={searchQuery}
        />
      </SearchContainer>
      <ListContainer>
        <RestaurantInfoCard />
      </ListContainer>
    </RootContainer>
  );
};
