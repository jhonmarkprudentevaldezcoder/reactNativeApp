import React, { useEffect } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import axios from "axios";

export default function LandingScreen({ navigation, route }) {
  const { token } = route.params;

  const handleLogout = () => {
    // logout logic here
    navigation.navigate("Login");
  };

  // Use the token for authenticated API requests
  const fetchData = async () => {
    try {
      const response = await axios.get("YOUR_AUTHENTICATED_API_ENDPOINT", {
        headers: {
          Authorization: `${token}`,
        },
      });
      console.log("Data fetched:", response.data);
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };
  useEffect(() => {
    // Check if the token is present
    if (!token) {
      // Navigate to the login screen if not logged in
      navigation.navigate("Login");
    }
  }, [token, navigation]);

  return (
    <View style={styles.container}>
      <Text>Welcome to the App!</Text>
      <Button title="Logout" onPress={handleLogout} />
      <Button title="Fetch Data" onPress={fetchData} />
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
