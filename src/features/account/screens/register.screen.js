import React, { useContext, useState } from "react";
import { Spacer } from "../../../components/spacer/spacer.component";
import { Text } from "../../../components/typography/text.component";
import { AuthenticationContext } from "../../../services/authentication/authentication.context";
import { AccountBackground, AccountContainer, AuthButton, AuthInput, ErrorContainer, Title } from "../components/background.component";

import { ActivityIndicator, Colors } from "react-native-paper";

export const RegisterScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatedPassword, setRepeatedPassword] = useState("");

  const { onRegister, error, isLoading } = useContext(AuthenticationContext);

  return (
    <AccountBackground>
      <Title>Meals to go</Title>
      <AccountContainer>
        <AuthInput
          label="Email"
          value={email}
          textContentType="emailAddress"
          keyboardType="email-address"
          autoCapitalize="none"
          onChangeText={(text) => setEmail(text)} />
        <Spacer size="large">
          <AuthInput
            label="Password"
            value={password}
            textContentType="password"
            secureTextEntry
            autoCapitalize="none"
            onChangeText={(text) => setPassword(text)} />
        </Spacer>
        <Spacer size="large">
          <AuthInput
            label="Repeat Password"
            value={repeatedPassword}
            textContentType="password"
            secureTextEntry
            autoCapitalize="none"
            onChangeText={(text) => setRepeatedPassword(text)} />
        </Spacer>
        <ErrorContainer>
          <Text variant="error">{error}</Text>
        </ErrorContainer>
        <Spacer size="large">
          {
            isLoading ? <ActivityIndicator animating color={Colors.blue300} /> : <AuthButton
              icon="email"
              mode="contained"
              onPress={() => onRegister(email, password, repeatedPassword)}
            >
              Register
            </AuthButton>
          }
        </Spacer>
      </AccountContainer>
      <Spacer size="medium">
        <AuthButton mode="contained"
          onPress={() => navigation.navigate("Main")}>
          Back
        </AuthButton>
      </Spacer>

    </AccountBackground>
  )
}