import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "./assets/screens/LoginScreen";
import RegisterScreen from "./assets/screens/RegisterScreen";
import LandingScreen from "./assets/screens/LandingScreen";
import "react-native-gesture-handler";

const Stack = createStackNavigator();

export default function App() {
  return (
    <>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />
          <Stack.Screen name="Landing" component={LandingScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}
