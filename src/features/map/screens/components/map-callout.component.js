import React from "react"
import { CompactRestaurantInfo } from "../../../../components/compact-restaurant/compact-restaurant.component";

export const MapCallout = ({ restaurant }) => {
  return (
    <CompactRestaurantInfo restaurant={restaurant} isMap />
  );
};