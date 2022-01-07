import React from "react";
import { Text } from "react-native";
import { colors } from "../../../infrastructure/theme/colors";
import { AccountBackground, AccountContainer, AuthButton } from "../components/background.component";

import { Spacer } from './../../../components/spacer/spacer.component';

export const AccountScreen = ({ navigation }) => {
  return <AccountBackground>
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
        icon="account"
        mode="contained"
        onPress={() => navigation.navigate("Register")}
      >
        Register
      </AuthButton>
    </AccountContainer>
  </AccountBackground>
}