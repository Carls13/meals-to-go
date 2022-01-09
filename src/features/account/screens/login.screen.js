import React, { useContext, useState } from "react";
import { ActivityIndicator, Colors } from "react-native-paper";
import { Spacer } from "../../../components/spacer/spacer.component";
import { Text } from "../../../components/typography/text.component";
import { AuthenticationContext } from "../../../services/authentication/authentication.context";
import { AccountBackground, AccountContainer, AuthButton, AuthInput, ErrorContainer, Title } from "../components/background.component";

export const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { onLogin, error, isLoading } = useContext(AuthenticationContext);

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
        <ErrorContainer>
          <Text variant="error">{error}</Text>
        </ErrorContainer>
        <Spacer size="large">
          {
            isLoading ? <ActivityIndicator animating color={Colors.blue300} /> :
              <AuthButton
                icon="lock-open-outline"
                mode="contained"
                onPress={() => onLogin(email, password)}
              >
                Enter
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