import { StatusBar as ExpoStatusBar } from "expo-status-bar";
import React from "react";
import { ThemeProvider } from "styled-components/native";
import { theme } from "./src/infrastructure/theme";

import {
  useFonts as useOswald,
  Oswald_400Regular
} from "@expo-google-fonts/oswald";

import {
  useFonts as useLato,
  Lato_400Regular
} from "@expo-google-fonts/lato";
import { RestaurantsContextProvider } from "./src/services/restaurants/mock/restaurants.context";
import { LocationContextProvider } from "./src/services/location/location.context";
import { Navigation } from "./src/infrastructure/navigation";
import { FavouritesContextProvider } from "./src/services/favourites/favourites.context";

import firebase from 'firebase/compat/app';
import { AuthenticationContextProvider } from "./src/services/authentication/authentication.context";

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyByKQHXR-NiTWaAfVtkpvdeNIoE299RQR4",
  authDomain: "meals-to-go-71f9f.firebaseapp.com",
  projectId: "meals-to-go-71f9f",
  storageBucket: "meals-to-go-71f9f.appspot.com",
  messagingSenderId: "81103224401",
  appId: "1:81103224401:web:4411d73ca7419f4f210270",
  measurementId: "G-2EBZ5PDC4W"
};

if (!firebase.apps.length) firebase.initializeApp(firebaseConfig);

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
        <AuthenticationContextProvider>
          <FavouritesContextProvider>
            <LocationContextProvider>
              <RestaurantsContextProvider>
                <Navigation />
              </RestaurantsContextProvider>
            </LocationContextProvider>
          </FavouritesContextProvider>
        </AuthenticationContextProvider>
      </ThemeProvider>
      <ExpoStatusBar style="auto" />
    </>
  );
}
