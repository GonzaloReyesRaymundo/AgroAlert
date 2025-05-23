import React, { useState } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  Alert,
  ActivityIndicator,
  Image,
} from "react-native";
import { TextInput } from "react-native-paper";
import { NavigationProp } from "@react-navigation/native";
import axios from "axios";
import { LinearGradient } from "expo-linear-gradient";
import AsyncStorage from '@react-native-async-storage/async-storage';

interface LoginScreenProps {
  navigation: NavigationProp<any>;
}

const LoginScreen = ({ navigation }: LoginScreenProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  interface ApiResponse {
    error: boolean;
    aviso?: string;
    contenido?: Array<{
      emailUsuario: string;
      contraseniaUsuariol: string;
      rol: string;
    }>;
  }

  const handleLogin = async () => {
    if (!email.trim() || !password.trim()) {
      Alert.alert("Error", "Por favor, ingresa tu correo y contraseña.");
      return;
    }

    setLoading(true);

    try {
      const formData = new URLSearchParams();
      formData.append("emailUsuario", email);
      formData.append("contraseniaUsuariol", password);

      const response = await axios.post(
        "http://192.168.1.54/wsA/ApiU.php?api=buscarUsu",
        formData.toString(),
        {
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
        }
      );

      const data = response.data as ApiResponse;

      if (!data || typeof data !== "object") {
        throw new Error("Respuesta inválida del servidor.");
      }

      if (data.error === false && Array.isArray(data.contenido) && data.contenido.length > 0) {
        const usuario = data.contenido[0];

        // Validación de credenciales
        if (usuario.emailUsuario === email && usuario.contraseniaUsuariol === password) {
          await AsyncStorage.setItem("usuario", JSON.stringify(usuario));
          if (usuario.rol === "admin") {
            Alert.alert("Éxito", "Bienvenido administrador.");
            navigation.navigate("AdministradorScreen");
          } else if (usuario.rol === "visita") {
            Alert.alert("Éxito", "Inicio de sesión exitoso.");
            navigation.navigate("HomeScreen");
          } else {
            Alert.alert("Error", "Rol de usuario no válido.");
          }
        } else {
          Alert.alert("Error", "Credenciales incorrectas.");
        }
      } else {
        Alert.alert("Error", data.aviso || "Usuario no encontrado.");
      }
    } catch (error: any) {
      console.error("Error en la solicitud:", error);
      Alert.alert("Error", "Hubo un problema con el inicio de sesión.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <LinearGradient colors={["#a8e063", "#56ab2f"]} style={styles.container}>
      <Text style={styles.title}>Iniciar Sesión</Text>
      <Image source={require("../../assets/images/AgroAlert.png")} style={styles.image} />

      <TextInput
        style={styles.input}
        placeholder="Correo electrónico"
        placeholderTextColor="#888"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        placeholderTextColor="#888"
        secureTextEntry={!passwordVisible}
        value={password}
        onChangeText={setPassword}
        autoCapitalize="none"
      />

      <TouchableOpacity
        style={styles.togglePasswordVisibility}
        onPress={() => setPasswordVisible(!passwordVisible)}
      >
        <Text style={styles.togglePasswordText}>
          {passwordVisible ? "Ocultar" : "Mostrar"}
        </Text>
      </TouchableOpacity>

      {loading ? (
        <ActivityIndicator size="large" color="#4CAF50" />
      ) : (
        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.buttonText}>Iniciar Sesión</Text>
        </TouchableOpacity>
      )}


      <View style={styles.separator} />

      <TouchableOpacity
        style={styles.registerButton}
        onPress={() => navigation.navigate("CrearUsuarioScreen")}
      >
        <Text style={styles.buttonText}>Registrarse</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "#fff",
  },
  image: {
    width: 120,
    height: 120,
    alignSelf: "center",
    marginBottom: 20,
  },
  input: {
    marginBottom: 15,
    backgroundColor: "white",
  },
  togglePasswordVisibility: {
    alignItems: "flex-end",
    marginBottom: 20,
  },
  togglePasswordText: {
    color: "#fff",
    fontWeight: "bold",
  },
  loginButton: {
    backgroundColor: "#4CAF50",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
  forgotPassword: {
    alignItems: "center",
    marginTop: 10,
  },
  forgotPasswordText: {
    color: "#fff",
    textDecorationLine: "underline",
  },
  separator: {
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    marginVertical: 20,
  },
  registerButton: {
    backgroundColor: "#2E7D32",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
  },
});

export default LoginScreen;