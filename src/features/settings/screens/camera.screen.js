import { Camera } from "expo-camera";
import React, { useContext, useEffect, useRef, useState } from "react";
import { View } from "react-native";
import styled from "styled-components/native";
import { Text } from "../../../components/typography/text.component";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthenticationContext } from "../../../services/authentication/authentication.context";

const ProfileCamera = styled(Camera)`
  width: 100%;
  height: 100%;
  position: relative;
`;

const SnapButton = styled.TouchableOpacity`
  width: 100px;
  height: 100px;
  position: absolute;
  z-index: 50;
  background-color: #ffffff99;
  border-radius: 50px;
  bottom: 25px;
  left: 38%;
`;

export const CameraScreen = ({ navigation }) => {
  const { user } = useContext(AuthenticationContext);
  const [hasPermission, setHasPermission] = useState(null);
  const cameraRef = useRef();

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }

  if (hasPermission === false) {
    return <Text variant="error">No access to camera</Text>;
  }

  const snap = async () => {
    if (cameraRef) {
      const photo = await cameraRef.current.takePictureAsync();
      AsyncStorage.setItem(`${user?.uid}-photo`, photo.uri);
      navigation.goBack();
    }
  };

  return (
    <>
      <ProfileCamera
        ref={(camera) => (cameraRef.current = camera)}
        type={Camera.Constants.Type.front}
      />
      <SnapButton onPress={snap}>
      </SnapButton>
    </>

  )
};