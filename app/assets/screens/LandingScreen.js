import React, { useEffect, useState } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage"; // Import AsyncStorage

export default function LandingScreen({ navigation }) {
  const [token, setToken] = useState(null);

  useEffect(() => {
    checkIfLoggedIn();
  }, []);

  const checkIfLoggedIn = async () => {
    const storedToken = await AsyncStorage.getItem("jwtToken");
    if (storedToken) {
      setToken(storedToken);
    } else {
      // Token doesn't exist, navigate back to the login screen
      navigation.navigate("Login");
    }
  };

  const handleLogout = async () => {
    await AsyncStorage.removeItem("jwtToken");
    navigation.navigate("Login");
  };

  return (
    <View style={styles.container}>
      <Text>Welcome to the App!</Text>
      <Text>Token: {token}</Text>
      <Button title="Logout" onPress={handleLogout} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
