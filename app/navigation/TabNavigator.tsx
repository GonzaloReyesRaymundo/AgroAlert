import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons/MaterialIcons";

// Importar pantallas
import HomeScreen from "../screens/HomeScreen";
import PerfilScreen from "../screens/Perfil";
import SettingsScreen from "../screens/Configuracion";
import MapaAgro from "../screens/MapaAgro";
import CamaraScreen from "../screens/Camara";

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName: string;
          
          switch (route.name) {
            case "Home":
              iconName = "home";
              break;
            case "Perfil":
              iconName = "person";
              break;
            case "Configuración":
              iconName = "settings";
              break;
            case "MapaAgro":
              iconName = "map";
              break;
            case "Camara":
              iconName = "photo-camera";
              break;
            default:
              iconName = "help"; // Icono por defecto
          }
          
          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#1E88E5",
        tabBarInactiveTintColor: "gray",
        headerShown: false,
      })}
    >
      <Tab.Screen 
        name="Home" 
        component={HomeScreen} 
        options={{ title: "Inicio" }}
      />
      <Tab.Screen 
        name="Perfil" 
        component={PerfilScreen} 
      />
      <Tab.Screen 
        name="Configuración" 
        component={SettingsScreen} 
      />
      <Tab.Screen 
        name="MapaAgro" 
        component={MapaAgro} 
        options={{ title: "Mapa Agro" }}
      />
      <Tab.Screen 
        name="Camara" 
        component={CamaraScreen} 
        options={{ title: "Detección de Objetos" }} // Título más descriptivo
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;