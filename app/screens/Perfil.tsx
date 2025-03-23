import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { Button } from "react-native-paper";
import { NavigationProp } from "@react-navigation/native";

interface ProfileScreenProps {
  navigation: NavigationProp<any>;
}

const ProfileScreen = ({ navigation }: ProfileScreenProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Perfil del Usuario</Text>

      <View style={styles.profileInfo}>
        <Image
          source={{ uri: "https://a.storyblok.com/f/178900/720x540/b3803adb15/90116415917bb376a8446abc2d0b48121663948488_main.png/m/filters:quality(95)format(webp)" }} // Cambia esta URL por una válida o usa una imagen local
          style={styles.profileImage}
        />
        <Text style={styles.userInfo}>Nombre: Juan Pérez</Text>
        <Text style={styles.userInfo}>Correo: juan.perez@email.com</Text>
        <Text style={styles.userInfo}>Edad: 30</Text>
        <Text style={styles.userInfo}>Localidad: Ciudad de México</Text>
      </View>

      <Button
        mode="contained"
        style={styles.backButton}
        onPress={() => navigation.navigate("HomeScreen")}
      >
        Regresar al Inicio
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E8F5E9", // Verde muy claro, evocando naturaleza y frescura
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#2E7D32", // Verde oscuro, representando la vegetación saludable
    textAlign: "center",
    marginBottom: 20,
  },
  profileInfo: {
    alignItems: "center",
    marginBottom: 20,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 10,
    borderWidth: 3,
    borderColor: "#F9A825", // Amarillo anaranjado, alerta para posibles plagas
  },
  userInfo: {
    fontSize: 18,
    color: "#6D4C41", // Marrón, simbolizando la tierra fértil
    marginBottom: 5,
  },
  backButton: {
    backgroundColor: "#8BC34A", // Verde vibrante, relacionado con plantas sanas
    padding: 10,
    borderRadius: 5,
  },
});


export default ProfileScreen;
