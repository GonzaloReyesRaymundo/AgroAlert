import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

// Importar pantallas
import SplashScreen from "../screens/SplashScreen";
import LoginScreen from "../screens/LoginScreen";
import RecuperarContrasenia from "../screens/RecuperarContrasenia";
import CrearUsuarioScreen from "../screens/CrearUsuarioScreen";
import MapaAgro from "../screens/MapaAgro";
import TabNavigator from "./TabNavigator"; // Nuevo import

const Stack = createStackNavigator();

const AppNavigation = () => {
  return (
    <Stack.Navigator initialRouteName="SplashScreen">
      <Stack.Screen name="SplashScreen" component={SplashScreen} options={{ headerShown: false }} />
      <Stack.Screen name="LoginScreen" component={LoginScreen} options={{ headerShown: false }} />
      <Stack.Screen name="RecuperarContrasenia" component={RecuperarContrasenia} />
      <Stack.Screen name="CrearUsuarioScreen" component={CrearUsuarioScreen} />
      <Stack.Screen name="MapaAgro" component={MapaAgro} />
      <Stack.Screen name="HomeScreen" component={TabNavigator} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
};

export default AppNavigation;
