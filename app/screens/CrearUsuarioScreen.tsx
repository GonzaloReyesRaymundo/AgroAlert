import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView, Image } from "react-native";
import { TextInput, Button } from "react-native-paper";
import { NavigationProp } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";

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
    <LinearGradient colors={["#a8e063", "#56ab2f"]} style={styles.gradient}>
      <ScrollView contentContainerStyle={styles.container}>
        {/* Imagen superior */}
        <Image
          source={require("../../assets/images/perfil.png")}
          style={styles.image}
        />

        {/* Título */}
        <Text style={styles.title}>Crear Nuevo Usuario</Text>

        {/* Campos con íconos */}
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

        {/* Botón crear cuenta */}
        <Button
          mode="contained"
          style={styles.button}
          onPress={() => console.log("Usuario creado")}
        >
          Crear Cuenta
        </Button>

        {/* Botón volver */}
        <Button
          mode="outlined"
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          Volver
        </Button>
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  container: {
    padding: 20,
    alignItems: "center",
  },
  image: {
    width: 150,
    height: 150,
    marginBottom: 20,
    borderRadius: 75,
    borderWidth: 2,
    borderColor: "#fff",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#FFF",
    marginBottom: 20,
    textShadowColor: "rgba(0,0,0,0.3)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
    textAlign: "center",
  },
  input: {
    width: "100%",
    backgroundColor: "#FFF",
    marginBottom: 15,
    borderRadius: 10,
  },
  button: {
    width: "100%",
    backgroundColor: "#4CAF50",
    marginTop: 10,
    borderRadius: 10,
    paddingVertical: 8,
  },
  backButton: {
    width: "100%",
    marginTop: 10,
    borderColor: "#fff",
    borderWidth: 1,
    borderRadius: 10,
    paddingVertical: 8,
  },
});

export default CrearUsuarioScreen;
