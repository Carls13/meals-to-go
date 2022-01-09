import React from "react";
import { Text } from "react-native";
import { colors } from "../../../infrastructure/theme/colors";
import { AccountBackground, AccountContainer, AuthButton, Title } from "../components/background.component";

import { Spacer } from './../../../components/spacer/spacer.component';

export const AccountScreen = ({ navigation }) => {
  return (
    <AccountBackground>
      <Title>Meals To Go</Title>
      <AccountContainer>
        <AuthButton
          icon="lock-open-outline"
          mode="contained"
          onPress={() => navigation.navigate("Login")}
        >
          Login
        </AuthButton>
        <Spacer size="large" />
        <AuthButton
          icon="email"
          mode="contained"
          onPress={() => navigation.navigate("Register")}
        >
          Register
        </AuthButton>
      </AccountContainer>
    </AccountBackground>
  );
}