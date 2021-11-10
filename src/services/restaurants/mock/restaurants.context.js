import React, { useState, createContext, useEffect, useContext } from "react";
import { Button, Dialog, Portal, Provider } from "react-native-paper";
import { Text } from "../../../components/typography/text.component";
import { LocationContext } from "../../location/location.context";

import { restaurantsRequest, restaurantsTransform } from "./restaurants.service";

export const RestaurantsContext = createContext();

export const RestaurantsContextProvider = ({ children }) => {
  const [restaurants, setRestaurants] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const { location } = useContext(LocationContext);

  const retrieveRestaurants = (locationValue) => {
    setIsLoading(true);
    setRestaurants([]);

    setTimeout(() => {
      restaurantsRequest(locationValue)
        .then(restaurantsTransform)
        .then((transformedRestaurants) => {
          setIsLoading(false);
          setRestaurants(transformedRestaurants);
        })
        .catch((err) => {
          setIsLoading(false);
          setError(err);
        })
    }, 2000);
  };

  useEffect(() => {
    if (location) {
      console.log(location);
      const locationString = `${location.lat},${location.lng}`;
      retrieveRestaurants(locationString);
    }
  }, [location]);

  return (
    <RestaurantsContext.Provider value={{
      restaurants,
      isLoading,
      error
    }}>
      <Provider>
        <Portal>
          <Dialog visible={error} onDismiss={() => setError(null)}>
            <Dialog.Title>
              <Text>Error</Text>
            </Dialog.Title>
            <Dialog.Content>
              <Text>{error}</Text>
              <Text>Please, try again later</Text>
            </Dialog.Content>
            <Dialog.Actions>
              <Button onPress={() => setError(null)}>Accept</Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
        {children}
      </Provider>
    </RestaurantsContext.Provider>
  );
};