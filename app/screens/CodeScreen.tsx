import React, { useState, useRef } from "react";
import { 
  View, Text, TextInput, TouchableOpacity, StyleSheet, Alert 
} from "react-native";
import { NavigationProp } from "@react-navigation/native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

interface Props {
  navigation: NavigationProp<any>;
}

const CodeScreen = ({ navigation }: Props) => {
  const [code, setCode] = useState(["", "", "", "", ""]);
  const inputs = useRef<Array<TextInput | null>>([]);

  const handleChange = (text: string, index: number) => {
    if (text.length > 1) return;
    const newCode = [...code];
    newCode[index] = text;
    setCode(newCode);
    
    if (text && index < 4) {
      inputs.current[index + 1]?.focus();
    }
  };

  const handleVerify = () => {
    if (code.some(digit => digit === "")) {
      Alert.alert("Error", "El código debe tener 5 dígitos.");
      return;
    }
    navigation.navigate("ChangePasswordScreen");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Ingresa el código de recuperación</Text>
      <Text style={styles.subtitle}>
        Ingresa el código enviado a tu correo para verificar tu identidad y continuar con la recuperación de contraseña.
      </Text>
      <Icon name="bug-check" size={60} color="#1B5E20" style={styles.icon} />
      
      <View style={styles.codeContainer}>
        <Text style={styles.codeTitle}>Código de Verificación</Text>
        <View style={styles.inputRow}>
          {code.map((digit, index) => (
            <TextInput
              key={index}
              ref={(ref) => inputs.current[index] = ref}
              style={styles.input}
              keyboardType="numeric"
              maxLength={1}
              value={digit}
              onChangeText={(text) => handleChange(text, index)}
            />
          ))}
        </View>
        <TouchableOpacity style={styles.button} onPress={handleVerify}>
          <Text style={styles.buttonText}>Reestablecer Contraseña</Text>
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
  icon: {
    marginBottom: 10,
  },
  codeContainer: {
    width: "100%",
    backgroundColor: "#FFF",
    padding: 20,
    borderRadius: 15,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  codeTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1B5E20",
    marginBottom: 15,
  },
  inputRow: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 20,
  },
  input: {
    width: 50,
    height: 50,
    backgroundColor: "#FFF",
    borderRadius: 10,
    textAlign: "center",
    fontSize: 22,
    fontWeight: "bold",
    marginHorizontal: 5,
    borderWidth: 2,
    borderColor: "#1B5E20",
  },
  button: {
    width: "90%",
    padding: 15,
    backgroundColor: "#1B5E20",
    borderRadius: 10,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 4,
  },
  buttonText: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "bold",
  },
  link: {
    fontSize: 14,
    color: "#1B5E20",
    marginTop: 15,
    textDecorationLine: "underline",
  },
});

export default CodeScreen;
