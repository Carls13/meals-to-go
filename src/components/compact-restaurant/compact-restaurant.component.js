import React from "react";
import styled from "styled-components/native";
import { Text } from "../typography/text.component";
import WebView from "react-native-webview";
import { Platform } from "react-native";

const CompactImage = styled.Image`
  border-radius: 10px;
  width: 120px;
  height: 100px;
`;

const CompactWebView = styled(WebView)`
  border-radius: 10px;
  width: 120px;
  height: 100px;
`;

const Item = styled.View`
  padding: 10px;
  max-width: 120px;
  text-align: center;
  align-items: center;
`;

const isAndroid = Platform.OS === "android";

export const CompactRestaurantInfo = ({ restaurant }) => {
  const {
    name,
    photos,
  } = restaurant;

  const Image = isAndroid ? CompactWebView : CompactImage;

  return (
    <Item>
      {
        <Image source={{ uri: photos[0] }} />
      }
      <Text>{name}</Text>
    </Item>

  )
}