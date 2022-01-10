import React from "react";

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { Ionicons } from '@expo/vector-icons';
import { colors } from "../theme/colors";
import { RestaurantsNavigator } from "./restaurants.navigator";
import { MapScreen } from "../../features/map/screens/map.screen";

import { FavouritesContextProvider } from "../../services/favourites/favourites.context";
import { LocationContextProvider } from "../../services/location/location.context";
import { RestaurantsContextProvider } from "../../services/restaurants/mock/restaurants.context";
import { SettingsNavigator } from "./settings.navigator";

const TAB_ICON = {
  Restaurants: "md-restaurant",
  Map: "md-map",
  Settings: "md-settings",
};

export const AppNavigator = () => {
  const Tab = createBottomTabNavigator();

  const tabBarIcon = (iconName) => ({ size, color }) => {
    return <Ionicons name={iconName} size={size} color={color} />;
  }

  const createScreenOptions = ({ route }) => {
    const iconName = TAB_ICON[route.name];

    return {
      tabBarIcon: tabBarIcon(iconName),
      tabBarOptions: {
        tabBarActiveTintColor: colors.brand.primary,
        tabBarInactiveTintColor: colors.brand.muted
      },
      headerShow: "none"
    }
  };

  const MyTabs = () => <Tab.Navigator screenOptions={createScreenOptions}>
    <Tab.Screen name="Restaurants" component={RestaurantsNavigator} />
    <Tab.Screen name="Map" component={MapScreen} />
    <Tab.Screen name="Settings" component={SettingsNavigator} />
  </Tab.Navigator>;

  return (
    <FavouritesContextProvider>
      <LocationContextProvider>
        <RestaurantsContextProvider>
          <MyTabs />
        </RestaurantsContextProvider>
      </LocationContextProvider>
    </FavouritesContextProvider>
  );
}