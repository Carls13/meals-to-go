import React, { useContext, useState } from "react";
import { useFocusEffect } from '@react-navigation/native'
import { List, Avatar } from "react-native-paper";
import { SafeArea } from "../../../components/utility/safe-area.component";
import { AuthenticationContext } from "../../../services/authentication/authentication.context";

import styled from 'styled-components/native';
import { Text } from "../../../components/typography/text.component";
import { Spacer } from "../../../components/spacer/spacer.component";
import { TouchableOpacity } from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";


const SettingsItem = styled(List.Item)`
  padding: ${props => props.theme.space[3]};
`;

const AvatarContainer = styled.View`
  align-items: center;
`;

export const SettingsScreen = ({ navigation }) => {
  const [photo, setPhoto] = useState(null);
  const { onLogout, user } = useContext(AuthenticationContext);

  const getProfilePicture = async () => {
    const photoUri = await AsyncStorage.getItem(`${user?.uid}-photo`);
    setPhoto(photoUri);
  }

  useFocusEffect(() => {
    getProfilePicture();
  });

  return (
    <SafeArea>
      <AvatarContainer>
        <TouchableOpacity onPress={() => navigation.navigate("Camera")}>
          {
            !photo ?
              <Avatar.Icon size={90} icon="human" backgroundColor="#2182bd" />
              :
              <Avatar.Image size={90} source={{ uri: photo }} />
          }
        </TouchableOpacity>
        <Spacer position="top" size="large">
          <Text variant="label">{user?.email}</Text>
        </Spacer>
      </AvatarContainer>
      <List.Section>
        <SettingsItem
          title="Favourites"
          description="View your favourites"
          left={(props) => <List.Icon {...props} color="black" icon="star" />}
          onPress={() => navigation.navigate("Favourites")}
        />
        <SettingsItem
          title="Logout"
          left={(props) => <List.Icon {...props} color="black" icon="door" />}
          onPress={onLogout}
        />
      </List.Section>
    </SafeArea>
  );
}