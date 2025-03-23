import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { TextInput, Button } from "react-native-paper";
import { NavigationProp } from "@react-navigation/native";

interface Props {
    navigation: NavigationProp<any>;
}

const RecuperarContrasenia = ({ navigation }: Props) => {
    const [email, setEmail] = useState("");

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Recuperar Contraseña</Text>
            <Text style={styles.subtitle}>
                Ingresa tu correo electrónico para enviarte instrucciones.
            </Text>

            <TextInput
                label="Correo Electrónico"
                mode="outlined"
                value={email}
                onChangeText={setEmail}
                style={styles.input}
                left={<TextInput.Icon icon="email" />}
            />

            <Button mode="contained" style={styles.button} onPress={() => console.log("Recuperar contraseña")}>
                Enviar
            </Button>

            <Button mode="outlined" style={styles.backButton} onPress={() => navigation.goBack()}>
                Volver
            </Button>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#E8F5E9", // Verde muy claro, evocando naturaleza y salud
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
    },
    title: {
        fontSize: 28,
        fontWeight: "bold",
        color: "#2E7D32", // Verde oscuro que representa la naturaleza
        textAlign: "center",
        marginBottom: 10,
    },
    subtitle: {
        fontSize: 16,
        color: "#6D4C41", // Marrón suave, simbolizando la tierra
        textAlign: "center",
        marginBottom: 20,
    },
    input: {
        width: "100%",
        backgroundColor: "white",
        marginBottom: 20,
    },
    button: {
        width: "100%",
        backgroundColor: "#F9A825", // Amarillo-anaranjado, simbolizando alerta de plagas
        paddingVertical: 5,
        borderRadius: 5,
    },
    backButton: {
        width: "100%",
        marginTop: 10,
        borderColor: "#A67B5B", // Marrón más oscuro para dar contraste
    },
});


export default RecuperarContrasenia;
