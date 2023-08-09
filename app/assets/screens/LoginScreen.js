import React, { useEffect, useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  useEffect(() => {
    checkIfLoggedIn();
  }, []);

  const checkIfLoggedIn = async () => {
    const storedToken = await AsyncStorage.getItem("jwtToken");
    if (storedToken) {
      navigation.navigate("Landing");
    } else {
      // Token doesn't exist, navigate back to the login screen
      navigation.navigate("Login");
    }
  };

  const handleLogin = async () => {
    try {
      if (!email || !password) {
        setErrorMessage("Please fill in all fields");
        return;
      }
      const response = await axios.post(
        "https://nextjsapi-ijvo.onrender.com/login",
        {
          email,
          password,
        }
      );

      if (response.data.token && response.data) {
        // Store the JWT token securely using AsyncStorage
        await AsyncStorage.setItem("jwtToken", response.data.token);
        await AsyncStorage.setItem("userId", response.data.userId);
        await AsyncStorage.setItem("userEmail", response.data.email);

        // Navigate to LandingScreen or do something else on successful login
        navigation.navigate("Landing", {
          token: response.data.token,
          UID: response.data._id,
          email: response.data.email,
        });
        setEmail("");
        setPassword("");
        setErrorMessage("");
      } else {
        // Handle unsuccessful login, show error message, etc.
        setErrorMessage("Login failed");
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        // Handle the "Bad Request" error when email is already taken
        setErrorMessage("Invalid  user name or password");
      } else {
        // Handle other errors, show a generic error message
        console.error("An error occurred:", error);
        setErrorMessage("Login failed");
      }
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
      <Text style={styles.errorMessage}>{errorMessage}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    gap: 3,
    padding: 18,
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
  },
  input: {
    marginHorizontal: "auto",
    width: "100%",
    height: 40,
    paddingHorizontal: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
  },
  button: {
    width: "100%",
    marginTop: 10,
  },
  errorMessage: {
    color: "red",
    marginTop: 10,
  },
});
