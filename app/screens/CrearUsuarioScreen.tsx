import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput as NativeInput,
  TouchableOpacity,
  Image,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
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

  const handleCrearCuenta = () => {
    console.log("Usuario creado");
    // Aquí iría la lógica para crear el usuario
  };

  return (
    <LinearGradient colors={["#a8e063", "#56ab2f"]} style={styles.gradient}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
          <Image
            source={require("../../assets/images/perfil.png")}
            style={styles.image}
          />

          <Text style={styles.title}>Crear Usuario</Text>

          <NativeInput
            style={styles.input}
            placeholder="Nombre"
            placeholderTextColor="#888"
            value={nombre}
            onChangeText={setNombre}
          />

          <NativeInput
            style={styles.input}
            placeholder="Apellido Paterno"
            placeholderTextColor="#888"
            value={apellidoPaterno}
            onChangeText={setApellidoPaterno}
          />

          <NativeInput
            style={styles.input}
            placeholder="Apellido Materno"
            placeholderTextColor="#888"
            value={apellidoMaterno}
            onChangeText={setApellidoMaterno}
          />

          <NativeInput
            style={styles.input}
            placeholder="Edad"
            placeholderTextColor="#888"
            keyboardType="numeric"
            value={edad}
            onChangeText={setEdad}
          />

          <NativeInput
            style={styles.input}
            placeholder="Localidad"
            placeholderTextColor="#888"
            value={localidad}
            onChangeText={setLocalidad}
          />

          <TouchableOpacity style={styles.button} onPress={handleCrearCuenta}>
            <Text style={styles.buttonText}>Crear Usuario</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.link} onPress={() => navigation.goBack()}>
            <Text style={styles.linkText}>¿Ya tienes una cuenta? Inicia sesión</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  container: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  image: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#FFF",
    marginBottom: 30,
    textShadowColor: "rgba(0, 0, 0, 0.3)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  input: {
    width: "100%",
    height: 50,
    borderColor: "#4CAF50",
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 20,
    paddingHorizontal: 15,
    fontSize: 16,
    color: "#333",
    backgroundColor: "#FFF",
  },
  button: {
    width: "100%",
    height: 50,
    backgroundColor: "#4CAF50",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    fontSize: 18,
    color: "#FFF",
    fontWeight: "bold",
  },
  link: {
    marginTop: 15,
  },
  linkText: {
    fontSize: 14,
    color: "#FFF",
    textDecorationLine: "underline",
  },
});

export default CrearUsuarioScreen;

