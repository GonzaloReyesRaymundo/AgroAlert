import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { NavigationProp } from "@react-navigation/native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

interface Props {
  navigation: NavigationProp<any>;
}

const VerificarScreen = ({ navigation }: Props) => {
  const [nuevaContrasena, setNuevaContrasena] = useState("");
  const [confirmarContrasena, setConfirmarContrasena] = useState("");

  const handleVerificar = () => {
    if (nuevaContrasena === "" || confirmarContrasena === "") {
      alert("Los campos de contraseña no pueden estar vacíos.");
      return;
    }
    if (nuevaContrasena !== confirmarContrasena) {
      alert("Las contraseñas no coinciden.");
      return;
    }
    alert("Contraseña actualizada correctamente.");
    navigation.navigate("LoginScreen");
  };

  return (
    <View style={styles.container}>
      <Icon name="leaf-maple" size={80} color="#1B5E20" />
      <Text style={styles.title}>Restablecer Contraseña</Text>
      <Text style={styles.subtitle}>
        Ingresa y confirma una nueva contraseña segura para acceder a la plataforma de detección de plagas en cultivos.
      </Text>

      <View style={styles.card}>
        <Text style={styles.label}>Nueva Contraseña</Text>
        <View style={styles.inputContainer}>
          <Icon name="lock-outline" size={20} color="#1B5E20" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="********"
            secureTextEntry
            value={nuevaContrasena}
            onChangeText={setNuevaContrasena}
          />
        </View>

        <Text style={styles.label}>Confirmar Contraseña</Text>
        <View style={styles.inputContainer}>
          <Icon name="lock-check-outline" size={20} color="#1B5E20" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="********"
            secureTextEntry
            value={confirmarContrasena}
            onChangeText={setConfirmarContrasena}
          />
        </View>

        <TouchableOpacity style={styles.button} onPress={handleVerificar}>
          <Text style={styles.buttonText}>Confirmar Cambio</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate("LoginScreen")}>
          <Text style={styles.link}>Regresar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#4CAF50",
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#1B5E20",
    textAlign: "center",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 14,
    textAlign: "center",
    color: "#000",
    marginBottom: 20,
    paddingHorizontal: 15,
  },
  card: {
    width: "100%",
    backgroundColor: "#1B5E20",
    padding: 20,
    borderRadius: 15,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#FFF",
    alignSelf: "flex-start",
    marginBottom: 5,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFF",
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 15,
    width: "100%",
  },
  input: {
    flex: 1,
    height: 45,
    fontSize: 16,
    color: "#000",
  },
  icon: {
    marginRight: 10,
  },
  button: {
    width: "90%",
    padding: 15,
    backgroundColor: "#66BB6A",
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    fontSize: 16,
    color: "#FFF",
    fontWeight: "bold",
  },
  link: {
    fontSize: 14,
    color: "#FFF",
    marginTop: 15,
    textDecorationLine: "underline",
  },
});

export default VerificarScreen;
