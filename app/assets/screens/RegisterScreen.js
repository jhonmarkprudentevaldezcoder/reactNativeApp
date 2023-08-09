import React, { useState } from "react";
import { View, Text, TextInput, Button } from "react-native";

export default function RegisterScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = () => {
    // Implement your registration logic here
    // For simplicity, let's just navigate back to login after registration
    navigation.goBack();
  };

  return (
    <View>
      <Text>Register</Text>
      <TextInput placeholder="Email" value={email} onChangeText={setEmail} />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button title="Register" onPress={handleRegister} />
      <Button title="Back to Login" onPress={() => navigation.goBack()} />
    </View>
  );
}
