import React, { useState } from "react";
import { 
  View, Text, TextInput, TouchableOpacity, StyleSheet, Alert 
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { NavigationProp } from "@react-navigation/native";

interface Props {
  navigation: NavigationProp<any>;
}

const RecuperarContraseniaScreen = ({ navigation }: Props) => {
  const [email, setEmail] = useState("");

  const handleRecuperar = () => {
    if (!email.trim()) {
      Alert.alert("Error", "Por favor, ingresa tu correo electrónico.");
      return;
    }
    navigation.navigate("CodeScreen");
  };

  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <Icon name="lock-reset" size={80} color="#4CAF50" style={styles.iconLarge} />
        
        <Text style={styles.title}>Recuperar Contraseña</Text>
        
        <Text style={styles.subtitle}>
        Ingresa tu correo electrónico y sigue las instrucciones enviadas; te enviaremos un código para reestablecer tu contraseña.
        </Text>

        {/* Campo de entrada de correo */}
        <View style={styles.inputContainer}>
          <Icon name="email" size={24} color="#4CAF50" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Correo Electrónico"
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
          />
        </View>

        {/* Botón de recuperación */}
        <TouchableOpacity 
          style={styles.button} 
          onPress={handleRecuperar}
          activeOpacity={0.8}
        >
          <View style={styles.buttonContent}>
            <Icon name="send" size={20} color="#FFF" />
            <Text style={styles.buttonText}>Enviar código de verificación</Text>
          </View>
        </TouchableOpacity>

        {/* Enlace para regresar */}
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Icon name="arrow-left" size={20} color="#4CAF50" />
          <Text style={styles.backText}>Regresar</Text>
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
    backgroundColor: "#4CAF50", // Fondo verde
  },
  innerContainer: {
    width: "90%",
    backgroundColor: "#FFF",
    padding: 25,
    borderRadius: 15,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#2E7D32",
  },
  subtitle: {
    fontSize: 16,
    textAlign: "center",
    color: "#388E3C",
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    backgroundColor: "#FFF",
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: "#81C784",
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  icon: {
    marginRight: 10,
  },
  iconLarge: {
    marginBottom: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
  },
  button: {
    width: "100%",
    borderRadius: 10,
    backgroundColor: "#4CAF50",
    paddingVertical: 12,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  buttonContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "bold",
    marginLeft: 8,
  },
  backButton: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 15,
  },
  backText: {
    fontSize: 16,
    color: "#4CAF50",
    marginLeft: 5,
  },
});

export default RecuperarContraseniaScreen;

