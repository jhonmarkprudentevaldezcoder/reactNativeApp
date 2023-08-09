import React, { useEffect, useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function RegisterScreen({ navigation }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [contact, setContact] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  useEffect(() => {
    checkIfLoggedIn();
    setErrorMessage("");
  }, []);

  const checkIfLoggedIn = async () => {
    const token = await AsyncStorage.getItem("jwtToken");
    if (token) {
      navigation.navigate("Landing", { token });
    }
  };

  const handleRegister = async () => {
    try {
      if (!name || !email || !password || !confirmPassword || !contact) {
        setErrorMessage("Please fill in all fields");
        return;
      }
      if (password !== confirmPassword) {
        setErrorMessage("Passwords do not match");
        return;
      }
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
        setEmail("");
        setPassword("");
        setConfirmPassword("");
        setContact("");
        setErrorMessage("");

        navigation.navigate("Login");
      } else {
        // Handle unsuccessful login, show error message, etc.
        setErrorMessage("Register failed");
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        // Handle the "Bad Request" error when email is already taken
        setErrorMessage("Email is already taken");
      } else {
        // Handle other errors, show a generic error message
        console.error("An error occurred:", error);
        setErrorMessage("Registration failed");
      }
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
        secureTextEntry={!showPassword}
      />
      <TextInput
        style={styles.input}
        placeholder="Confirm Password"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry={!showPassword}
      />
      <Button
        style={styles.button}
        title={showPassword ? "Hide" : "Show"}
        onPress={() => setShowPassword(!showPassword)}
      />
      <TextInput
        style={styles.input}
        placeholder="Contact"
        value={contact}
        onChangeText={setContact}
      />
      <Button title="Register" onPress={handleRegister} />
      <Button
        title="Back to Login"
        onPress={() => navigation.navigate("Login")}
      />
      <Text style={styles.errorMessage}>{errorMessage}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 18,
    gap: 3,
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
  },
  input: {
    width: "100%",
    height: 40,
    marginHorizontal: "auto",
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
