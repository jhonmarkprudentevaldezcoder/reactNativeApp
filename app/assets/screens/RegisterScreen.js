import React, { useEffect, useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function RegisterScreen({ navigation }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [contact, setContact] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    checkIfLoggedIn();
  }, []);

  const checkIfLoggedIn = async () => {
    const token = await AsyncStorage.getItem("jwtToken");
    if (token) {
      navigation.navigate("Landing", { token });
    }
  };

  const handleRegister = async () => {
    try {
      const response = await axios.post(
        "https://nextjsapi-ijvo.onrender.com/register",
        {
          name,
          email,
          password,
          contact,
        }
      );

      if (response.data) {
        // Navigate to LandingScreen or do something else on successful login
        navigation.navigate("Login");
      } else {
        // Handle unsuccessful login, show error message, etc.
        setErrorMessage("Register failed");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Register</Text>
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={setName}
      />
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
      <TextInput
        style={styles.input}
        placeholder="Contact"
        value={contact}
        onChangeText={setContact}
      />
      <Button title="Register" onPress={handleRegister} style={styles.button} />
      <Button
        title="Back to Login"
        onPress={() => navigation.navigate("Login")}
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
  errorMessage: {
    color: "red",
    marginTop: 10,
  },
});
