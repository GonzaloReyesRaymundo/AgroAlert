import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView, Image, Alert } from "react-native";
import { TextInput, Button } from "react-native-paper";
import { NavigationProp } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import SHA256 from "crypto-js/sha256";

interface Props {
  navigation: NavigationProp<any>;
}

const CrearUsuarioScreen = ({ navigation }: Props) => {
  const [nombreUsuario, setnombreUsuario] = useState("");
  const [apPaternoUsuario, setapPaternoUsuario] = useState("");
  const [emailUsuario, setemailUsuario] = useState("");
  const [contraseniaUsuariol, setcontraseniaUsuariol] = useState("");

  const validarContrasenia = (pwd: string): boolean => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    return regex.test(pwd);
  };

  const crearCuenta = async () => {
    if (!validarContrasenia(contraseniaUsuariol)) {
      Alert.alert(
        "Contraseña inválida",
        "La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula y un número."
      );
      return;
    }

    try {
      // Aplica hash SHA-256 a la contraseña antes de enviarla
      const hashedPassword = SHA256(contraseniaUsuariol).toString();

      const response = await fetch("http://192.168.1.17/wsA/ApiU.php?api=guardarUsu", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          nombreUsuario: nombreUsuario,
          apPaternoUsuario: apPaternoUsuario,
          emailUsuario: emailUsuario,
          contraseniaUsuariol: hashedPassword, // usa la contraseña encriptada
        }).toString(),
      });

      const data = await response.json();

      if (data.error === false) {
        Alert.alert("¡Éxito!", data.aviso);
        setnombreUsuario("");
        setapPaternoUsuario("");
        setemailUsuario("");
        setcontraseniaUsuariol("");
      } else {
        Alert.alert("Error", data.aviso || "No se pudo crear el usuario.");
      }
    } catch (error) {
      Alert.alert("Error", "Hubo un problema al conectar con el servidor.");
      console.error("Error al crear usuario:", error);
    }
  };

  return (
    <LinearGradient colors={["#a8e063", "#56ab2f"]} style={styles.gradient}>
      <ScrollView contentContainerStyle={styles.container}>
        <Image
          source={require("../../assets/images/perfil.png")}
          style={styles.image}
        />

        <Text style={styles.title}>Crear Nuevo Usuario</Text>

        <TextInput
          label="Nombre"
          mode="outlined"
          value={nombreUsuario}
          onChangeText={setnombreUsuario}
          style={styles.input}
          left={<TextInput.Icon icon="account" />}
        />

        <TextInput
          label="Apellido Paterno"
          mode="outlined"
          value={apPaternoUsuario}
          onChangeText={setapPaternoUsuario}
          style={styles.input}
          left={<TextInput.Icon icon="account" />}
        />

        <TextInput
          label="Correo"
          mode="outlined"
          value={emailUsuario}
          onChangeText={setemailUsuario}
          keyboardType="email-address"
          style={styles.input}
          left={<TextInput.Icon icon="email" />}
        />

        <TextInput
          label="Contraseña"
          mode="outlined"
          value={contraseniaUsuariol}
          onChangeText={setcontraseniaUsuariol}
          secureTextEntry
          style={styles.input}
          left={<TextInput.Icon icon="lock" />}
        />

        <Button
          mode="contained"
          style={styles.button}
          onPress={crearCuenta}
        >
          Crear Cuenta
        </Button>

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
