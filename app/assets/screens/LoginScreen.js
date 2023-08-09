import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import axios from "axios";

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleLogin = async () => {
    try {
      const response = await axios.post(
        "https://nextjsapi-ijvo.onrender.com/login",
        {
          email,
          password,
        }
      );

      if (response.data.token) {
        // Store the JWT token securely (e.g., AsyncStorage, Redux, etc.)
        // Here, we're just using useState to store it temporarily for the example
        const token = response.data.token;

        // Navigate to LandingScreen or do something else on successful login
        navigation.navigate("Landing", { token });
      } else {
        // Handle unsuccessful login, show error message, etc.
        setErrorMessage("Login failed");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button title="Login" onPress={handleLogin} style={styles.button} />
      <Button
        title="Register"
        onPress={() => navigation.navigate("Register")}
        style={styles.button}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    justifyContent: "center",
    alignItems: "center",
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
  },
  input: {
    width: "90%",
    height: 40,
    paddingHorizontal: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
  },
  button: {
    width: "100%", // Set the width to 90%
    marginTop: 10,
  },
});
