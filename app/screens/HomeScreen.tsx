import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Button } from "react-native-paper";
import { NavigationProp } from "@react-navigation/native";

interface Props {
  navigation: NavigationProp<any>;
}

const HomeScreen = ({ navigation }: Props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bienvenido a la Aplicación</Text>
      
      <Button
        mode="contained"
        style={styles.button}
        onPress={() => navigation.navigate('LoginScreen')}
      >
        Ir al Login
      </Button>

      <Button
        mode="contained"
        style={styles.button}
        onPress={() => navigation.navigate('Configuración')}
      >
        Ir a Configuración
      </Button>

      <Button
        mode="contained"
        style={styles.button}
        onPress={() => navigation.navigate('Perfil')}
      >
        Ir a Perfil
      </Button>

    
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#E8F5E9", // Verde claro, evocando naturaleza y frescura
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#2E7D32", // Verde oscuro, representando la vegetación saludable
    textAlign: "center",
    marginBottom: 30,
  },
  button: {
    width: "100%",
    backgroundColor: "#8BC34A", // Verde vibrante, asociado con la salud de los cultivos
    marginBottom: 10,
    paddingVertical: 10,
    borderRadius: 5,
  },
  navBar: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "#F1F8E9", // Verde muy claro, ligero y ecológico
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: "#A5D6A7", // Verde sutil para mantener armonía
  },
  navButtonText: {
    fontSize: 14,
    color: "#558B2F", // Verde musgo, más natural y en armonía con la temática agrícola
  },
});


export default HomeScreen;
