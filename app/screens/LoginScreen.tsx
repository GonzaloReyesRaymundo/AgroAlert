import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity, Text, Alert } from "react-native";
import { TextInput, Button } from "react-native-paper";
import { NavigationProp } from "@react-navigation/native";
import axios from "axios";  

interface LoginScreenProps {
  navigation: NavigationProp<any>;
}

const LoginScreen = ({ navigation }: LoginScreenProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);

  // Función para iniciar sesión
  interface LoginResponse {
    error: boolean;
    usuario?: any;
    aviso?: string;
  }
  
  const handleLogin = async () => {
    if (!email.trim() || !password.trim()) {
      Alert.alert("Error", "Por favor, ingresa tu correo y contraseña.");
      return;
    }
  
    try {
      // Formateamos los datos correctamente como URLSearchParams
      const formData = new URLSearchParams();
      formData.append("correo", email);
      formData.append("contrasenia", password);
  
      const response = await axios.post(
        "http://192.168.137.1/ws/ApiE.php?api=buscarEst",
        formData.toString(), // Convertimos a string correctamente
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );
  
      console.log("Respuesta del servidor:", response.data);
  
      if (!response.data || typeof response.data !== "object") {
        Alert.alert("Error", "Respuesta inválida del servidor.");
        return;
      }
  
      const data: any = response.data;
  
      if (data.error === false && data.contenido?.length > 0) {
        const usuario = data.contenido[0]; // Obtenemos el primer usuario
      
        if (usuario.correo === email && usuario.contrasenia === password) {
          Alert.alert("Éxito", "Inicio de sesión exitoso.");
          navigation.navigate("HomeScreen");
        } else {
          Alert.alert("Error", "Credenciales incorrectas.");
        }
      } else if (data.contenido?.length === 0) {
        Alert.alert("Error", "El usuario no existe.");
      } else {
        Alert.alert("Error", data.aviso || "Credenciales incorrectas.");
      }
      
    } catch (error) {
      console.error("Error en la solicitud:", error);
      Alert.alert("Error", "Hubo un problema con el inicio de sesión.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bienvenido</Text>

      <TextInput
        label="Correo Electrónico"
        mode="outlined"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        left={<TextInput.Icon icon="email" />}
      />

      <TextInput
        label="Contraseña"
        mode="outlined"
        value={password}
        onChangeText={setPassword}
        secureTextEntry={!passwordVisible}
        style={styles.input}
        left={<TextInput.Icon icon="lock" />}
        right={
          <TextInput.Icon
            icon={passwordVisible ? "eye-off" : "eye"}
            onPress={() => setPasswordVisible(!passwordVisible)}
          />
        }
      />

      <Button mode="contained" style={styles.loginButton} onPress={handleLogin}>
        Iniciar Sesión
      </Button>

      <View style={styles.footer}>
        <TouchableOpacity onPress={() => navigation.navigate("RecuperarContrasenia")}>
          <Text style={styles.link}>Olvidé mi contraseña</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("CrearUsuarioScreen")}>
          <Text style={styles.link}>Nuevo usuario</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#A3C585",
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#2E7D32",
    textAlign: "center",
    marginBottom: 30,
  },
  input: {
    backgroundColor: "white",
    marginBottom: 15,
  },
  loginButton: {
    backgroundColor: "#F4C430",
    padding: 5,
    borderRadius: 5,
  },
  footer: {
    marginTop: 20,
    alignItems: "center",
  },
  link: {
    color: "#B71C1C",
    fontSize: 14,
    marginTop: 10,
    textDecorationLine: "underline",
  },
});

export default LoginScreen;
