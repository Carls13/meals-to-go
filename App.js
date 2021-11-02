import { StatusBar as ExpoStatusBar } from "expo-status-bar";
import React from "react";
import { ThemeProvider } from "styled-components/native";
import { RestaurantsScreen } from "./src/features/restaurants/screens/restaurants.screen";
import { theme } from "./src/infrastructure/theme";

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { Text } from 'react-native';

import { Ionicons } from '@expo/vector-icons';

import {
  useFonts as useOswald,
  Oswald_400Regular
} from "@expo-google-fonts/oswald";

import {
  useFonts as useLato,
  Lato_400Regular
} from "@expo-google-fonts/lato";
import { SafeArea } from "./src/components/utility/safe-area.component";
import { colors } from "./src/infrastructure/theme/colors";

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

function MapScreen() {
  return (
    <SafeArea>
      <Text>Map!</Text>
    </SafeArea>
  );
}

const tabBarIcon = (iconName) => ({ size, color }) => {
  return <Ionicons name={iconName} size={size} color={color} />;
}

const createScreenOptions = ({ route }) => {
  const iconName = TAB_ICON[route.name];

  return {
    tabBarIcon: tabBarIcon(iconName),
  }
};

const Tab = createBottomTabNavigator();

const MyTabs = () => <Tab.Navigator screenOptions={createScreenOptions} tabBarOptions={{
  tabBarActiveTintColor: colors.brand.primary,
  tabBarInactiveTintColor: colors.brand.muted
}}>
  <Tab.Screen name="Restaurants" component={RestaurantsScreen} />
  <Tab.Screen name="Map" component={MapScreen} />
  <Tab.Screen name="Settings" component={SettingsScreen} />
</Tab.Navigator>;

export default function App() {
  let [oswaldLoaded] = useOswald({
    Oswald_400Regular
  });
  let [latoLoaded] = useLato({
    Lato_400Regular
  });

  if (!oswaldLoaded || !latoLoaded) return null;

  return (
    <>
      <ThemeProvider theme={theme}>
        <NavigationContainer>
          <MyTabs />
        </NavigationContainer>
      </ThemeProvider>
      <ExpoStatusBar style="auto" />
    </>
  );
}
