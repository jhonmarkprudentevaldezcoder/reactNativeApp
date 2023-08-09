import React, { useEffect, useState } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage"; // Import AsyncStorage

export default function LandingScreen({ route, navigation }) {
  const [token, setToken] = useState(null);
  const [Uid, setUid] = useState(null);
  const [userEmail, setUserEmail] = useState(null);

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
    const storedUID = await AsyncStorage.getItem("userId");
    const storedUserEmail = await AsyncStorage.getItem("userEmail");
    if (storedToken && storedUID && storedUserEmail) {
      setToken(storedToken);
      setUid(storedUID);
      setUserEmail(storedUserEmail);
    } else {
      // Token doesn't exist, navigate back to the login screen
      navigation.navigate("Login");
    }
  };

  const handleLogout = async () => {
    await AsyncStorage.removeItem("jwtToken");
    await AsyncStorage.removeItem("userId");
    navigation.navigate("Login");
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.appName}>APP</Text>
          <Text style={styles.date}>
            {/* new Date().toDateString() */ userEmail}
          </Text>
        </View>
        <View>
          <Button title="Logout" onPress={handleLogout} />
        </View>
      </View>

      <View style={styles.content}>{/* Display user data here */}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: Platform.OS === "ios" ? 20 : 20,
    flex: 1,
    padding: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  appName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  date: {
    fontSize: 12,
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  userData: {
    fontSize: 16,
    marginBottom: 20,
  },
});
