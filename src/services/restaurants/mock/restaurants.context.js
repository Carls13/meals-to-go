import React, { useState, createContext, useEffect } from "react";
import { Button, Dialog, Portal, Provider } from "react-native-paper";
import { Text } from "../../../components/typography/text.component";

import { restaurantsRequest, restaurantsTransform } from "./restaurants.service";

export const RestaurantsContext = createContext();

export const RestaurantsContextProvider = ({ children }) => {
  const [restaurants, setRestaurants] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const retrieveRestaurants = () => {
    setIsLoading(true);

    setTimeout(() => {
      restaurantsRequest().then(restaurantsTransform).then((transformedRestaurants) => {
        setRestaurants(transformedRestaurants);
        setIsLoading(false);
      })
        .catch((err) => {
          setIsLoading(false);
          setError(err);
        })
    }, 2000);
  };

  useEffect(retrieveRestaurants, []);

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