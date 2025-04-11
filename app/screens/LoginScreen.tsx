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
import { Picker } from "@react-native-picker/picker";

interface LoginScreenProps {
  navigation: NavigationProp<any>;
}

const LoginScreen = ({ navigation }: LoginScreenProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [rol, setRol] = useState("usuario"); // "usuario" o "admin"

  interface ApiResponse {
    error: boolean;
    aviso?: string;
    contenido?: Array<{ emailUsuario: string; contraseniaUsuariol: string }>;
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
        "http://178.6.7.246/wsA/ApiU.php?api=buscarUsu",
        formData.toString(),
        {
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
        }
      );

      const data = response.data as ApiResponse;

      if (!data || typeof data !== "object") {
        throw new Error("Respuesta inválida del servidor.");
      }

      // Verifica si hay contenido válido
      if (data.error === false && Array.isArray(data.contenido) && data.contenido.length > 0) {
        const usuario = data.contenido[0];

        // Comparar email y contraseña
        if (usuario.emailUsuario === email && usuario.contraseniaUsuariol === password) {
          Alert.alert("Éxito", "Inicio de sesión exitoso.");

          if (rol === "admin") {
            navigation.navigate("AdministradorScreen");
          } else {
            navigation.navigate("HomeScreen");
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

      <Picker
        selectedValue={rol}
        onValueChange={(itemValue) => setRol(itemValue)}
        style={styles.picker}
      >
        <Picker.Item label="Iniciar como Usuario" value="usuario" />
        <Picker.Item label="Iniciar como Administrador" value="admin" />
      </Picker>

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
    color: "#0a5f00",
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
    color: "white",
  },
  picker: {
    width: "90%",
    height: 50,
    backgroundColor: "#fff",
    borderRadius: 10,
    marginBottom: 20,
    color: "#333",
  },
});

export default LoginScreen;



