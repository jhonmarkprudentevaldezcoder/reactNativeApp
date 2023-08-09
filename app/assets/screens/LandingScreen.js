import React, { useEffect, useState } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage"; // Import AsyncStorage

export default function LandingScreen({ route, navigation }) {
  const [token, setToken] = useState(null);
  const [Uid, setUid] = useState(null);

  useEffect(() => {
    checkIfLoggedIn();
  }, []);

  const checkIfLoggedIn = async () => {
    const storedToken = await AsyncStorage.getItem("jwtToken");
    const storedUID = await AsyncStorage.getItem("userId");
    if (storedToken && storedUID) {
      setToken(storedToken);
      setUid(storedUID);
    } else {
      // Token doesn't exist, navigate back to the login screen
      navigation.navigate("Login");
    }
  };

  const handleLogout = async () => {
    /*  await AsyncStorage.removeItem("jwtToken"); */
    navigation.navigate("Login");
  };

  return (
    <View style={styles.container}>
      <Text>Welcome to the App!</Text>
      <Text>Token: {token}</Text>

      <Text>Id: {Uid}</Text>

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
