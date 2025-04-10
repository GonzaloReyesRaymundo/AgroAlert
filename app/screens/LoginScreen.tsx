import React, { useState } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  Alert,
  ActivityIndicator,
  Image
} from "react-native";
import { TextInput } from "react-native-paper";
import { NavigationProp } from "@react-navigation/native";
import axios from "axios";
import { LinearGradient } from "expo-linear-gradient";

interface LoginScreenProps {
  navigation: NavigationProp<any>;
}

const LoginScreen = ({ navigation }: LoginScreenProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email.trim() || !password.trim()) {
      Alert.alert("Error", "Por favor, ingresa tu correo y contraseña.");
      return;
    }

    setLoading(true);

    try {
      const formData = new URLSearchParams();
      formData.append("correo", email);
      formData.append("contrasenia", password);

      const response = await axios.post(
        "http://178.6.3.193/ws/ApiD1.php?api=buscarDoc",
        formData.toString(),
        {
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
        }
      );

      console.log("Respuesta del servidor:", response.data);

      if (!response.data || typeof response.data !== "object") {
        throw new Error("Respuesta inválida del servidor.");
      }

      const data = response.data as { success?: boolean; aviso?: string };

      if (data.success === true) {
        Alert.alert("Éxito", "Inicio de sesión exitoso.");
        navigation.navigate("Home");
      } else {
        Alert.alert("Error", data.aviso ?? "Usuario o contraseña incorrectos.");
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
      <Image source={require('../../assets/images/AgroAlert.png')} style={styles.image} />

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

      <TouchableOpacity
        style={styles.forgotPassword}
        onPress={() => navigation.navigate("RecuperarContrasenia")}
      >
        <Text style={styles.forgotPasswordText}>¿Olvidaste tu contraseña?</Text>
      </TouchableOpacity>

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
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 28,
    color: "#0a5f00", // Verde fuerte
    fontWeight: "bold",
    marginBottom: 20,
  },
  image: {
    width: 120,
    height: 120,
    resizeMode: "contain",
    marginBottom: 20,
  },
  input: {
    width: "90%",
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
  loginButton: {
    width: "90%",
    height: 50,
    backgroundColor: "#81C784",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  registerButton: {
    width: "90%",
    height: 50,
    backgroundColor: "#81C784",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    fontSize: 25,
    color: "white",
    fontWeight: "bold",
  },
  forgotPassword: {
    marginTop: 15,
  },
  forgotPasswordText: {
    fontSize: 20,
    color: "white",
    textDecorationLine: "underline",
  },
  separator: {
    width: "90%",
    height: 1,
    backgroundColor: "#4CAF50",
    marginVertical: 20,
  },
  togglePasswordVisibility: {
    alignSelf: "flex-end",
    marginBottom: 20,
    marginRight: 30,
  },
  togglePasswordText: {
    fontSize: 14,
    color: "White",
  },
});

export default LoginScreen;



