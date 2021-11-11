import React, { useContext, useEffect, useState } from "react";
import { View } from "react-native";

import MapView, { Callout, Marker } from "react-native-maps";
import styled from "styled-components/native";
import { Text } from "../../../components/typography/text.component";
import { LocationContext } from "../../../services/location/location.context";
import { RestaurantsContext } from "../../../services/restaurants/mock/restaurants.context";
import { MapCallout } from "./components/map-callout.component";
import { Search } from "./components/search.component";

const Map = styled(MapView)`
  height: 100%;
  width: 100%;
`;

export const MapScreen = ({ navigation }) => {
  const { location } = useContext(LocationContext);
  const { restaurants } = useContext(RestaurantsContext);

  const [latDelta, setLatDelta] = useState(0);

  const { viewport, lat, lng } = location;

  useEffect(() => {
    const northeastLat = viewport.northeast.lat;
    const southwestLat = viewport.southwest.lat;

    const latDeltaCalc = northeastLat - southwestLat;

    setLatDelta(latDeltaCalc);
  }, [location, viewport]);

  const handlePress = (restaurant) => {
    navigation.navigate("RestaurantDetail", { restaurant });
  };

  return (
    <>
      <Search />
      <Map
        region={{
          latitude: lat,
          longitude: lng,
          latitudeDelta: latDelta,
          longitudeDelta: 0.02
        }}
      >
        {
          restaurants.map((restaurant) => {
            const { name, geometry } = restaurant;

            return (
              <Marker
                key={name}
                title={name}
                coordinate={{
                  latitude: geometry.location.lat,
                  longitude: geometry.location.lng,
                }}
              >
                <Callout onPress={() => handlePress(restaurant)}>
                  <MapCallout restaurant={restaurant} />
                </Callout>
              </Marker>
            );
          })
        }
      </Map>
    </>
  );
}