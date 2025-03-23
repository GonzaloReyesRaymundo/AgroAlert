import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { TextInput, Button } from "react-native-paper";
import { NavigationProp } from "@react-navigation/native";

interface Props {
  navigation: NavigationProp<any>;
}

const CrearUsuarioScreen = ({ navigation }: Props) => {
  const [nombre, setNombre] = useState("");
  const [apellidoPaterno, setApellidoPaterno] = useState("");
  const [apellidoMaterno, setApellidoMaterno] = useState("");
  const [edad, setEdad] = useState("");
  const [localidad, setLocalidad] = useState("");

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Crear Nuevo Usuario</Text>

      <TextInput
        label="Nombre"
        mode="outlined"
        value={nombre}
        onChangeText={setNombre}
        style={styles.input}
        left={<TextInput.Icon icon="account" />}
      />

      <TextInput
        label="Apellido Paterno"
        mode="outlined"
        value={apellidoPaterno}
        onChangeText={setApellidoPaterno}
        style={styles.input}
        left={<TextInput.Icon icon="account" />}
      />

      <TextInput
        label="Apellido Materno"
        mode="outlined"
        value={apellidoMaterno}
        onChangeText={setApellidoMaterno}
        style={styles.input}
        left={<TextInput.Icon icon="account" />}
      />

      <TextInput
        label="Edad"
        mode="outlined"
        value={edad}
        onChangeText={setEdad}
        keyboardType="numeric"
        style={styles.input}
        left={<TextInput.Icon icon="calendar" />}
      />

      <TextInput
        label="Localidad"
        mode="outlined"
        value={localidad}
        onChangeText={setLocalidad}
        style={styles.input}
        left={<TextInput.Icon icon="map-marker" />}
      />

      <Button mode="contained" style={styles.button} onPress={() => console.log("Usuario creado")}>
        Crear Cuenta
      </Button>

      <Button mode="outlined" style={styles.backButton} onPress={() => navigation.goBack()}>
        Volver
      </Button>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#E8F5E9", // Verde muy claro, simboliza naturaleza, salud, frescura
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#2E7D32", // Verde oscuro, simboliza naturaleza, crecimiento y estabilidad
    textAlign: "center",
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 16,
    color: "#6D4C41", // Marrón suave, simboliza tierra, estabilidad, raíces
    textAlign: "center",
    marginBottom: 20,
  },
  input: {
    width: "100%",
    backgroundColor: "white", // Blanco, simboliza pureza y claridad
    marginBottom: 15,
    borderColor: "#795548", // Borde marrón tierra
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 5,
  },
  button: {
    width: "100%",
    backgroundColor: "#F9A825", // Amarillo-anaranjado, simboliza alerta, energía y vitalidad
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  buttonText: {
    color: "#795548", // Marrón tierra, armoniza con el input
    fontWeight: "bold",
    fontSize: 16,
  },
  backButton: {
    width: "100%",
    marginTop: 10,
    borderColor: "#A67B5B", // Marrón más oscuro, simboliza contraste y estabilidad
    borderWidth: 2,
    paddingVertical: 8,
    borderRadius: 5,
    alignItems: "center",
  },
  backButtonText: {
    color: "#A67B5B", // Marrón oscuro, mantiene el contraste con el fondo
    fontWeight: "bold",
    fontSize: 16,
  },
});



export default CrearUsuarioScreen;
