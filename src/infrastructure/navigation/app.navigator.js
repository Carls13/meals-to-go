import React from "react";

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { Text } from 'react-native';

import { Ionicons } from '@expo/vector-icons';
import { colors } from "../theme/colors";
import { RestaurantsNavigator } from "./restaurants.navigator";
import { SafeArea } from "../../components/utility/safe-area.component";
import { MapScreen } from "../../features/map/screens/map.screen";

const TAB_ICON = {
  Restaurants: "md-restaurant",
  Map: "md-map",
  Settings: "md-settings",
};

function SettingsScreen() {
  return (
    <SafeArea>
      <Text>Settings!</Text>
    </SafeArea>
  );
}

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
    <Tab.Screen name="Settings" component={SettingsScreen} />
  </Tab.Navigator>;

  return (
    <MyTabs />
  );
}