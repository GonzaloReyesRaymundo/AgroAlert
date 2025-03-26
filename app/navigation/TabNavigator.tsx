import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons/MaterialIcons";

// Importar pantallas
import HomeScreen from "../screens/HomeScreen";
import PerfilScreen from "../screens/Perfil";
import SettingsScreen from "../screens/Configuracion";
import MapaAgro from "../screens/MapaAgro"; // ✅ Agregado

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName: string = "";
          if (route.name === "Home") {
            iconName = "home";
          } else if (route.name === "Perfil") {
            iconName = "person";
          } else if (route.name === "Configuración") {
            iconName = "settings";
          } else if (route.name === "Mapa Agro") {
            iconName = "map";
          }
          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#1E88E5",
        tabBarInactiveTintColor: "gray",
        headerShown: false,
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Perfil" component={PerfilScreen} />
      <Tab.Screen name="Configuración" component={SettingsScreen} />
      <Tab.Screen name="Mapa Agro" component={MapaAgro} />
    </Tab.Navigator>
  );
};

export default TabNavigator;
