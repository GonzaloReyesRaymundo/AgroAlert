import React, { useEffect } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { NavigationProp } from '@react-navigation/native';

const SplashScreen = ({ navigation }: { navigation: NavigationProp<any> }) => {
    useEffect(() => {
        setTimeout(() => {
            navigation.navigate("LoginScreen");
        }, 3000);
    }, []);

    return (
        <View style={styles.background}> {/* Cambiamos ImageBackground por View */}
            <View style={styles.container}>
                <Image
                    source={{ uri: 'https://thumbs.dreamstime.com/z/icono-de-plagas-e-insectos-vegetales-y-planta-eps-archivo-f%C3%A1cil-editar-241661228.jpg?ct=jpegw' }}
                    style={styles.logo}
                />
                <Text style={styles.title}>Agroalert</Text>
                <Text style={styles.subtitle}>Protegiendo tus cultivos</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    background: {
        flex: 1,
        backgroundColor: '#C8E6C9', // Verde claro
    },
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    logo: {
        width: 120,
        height: 120,
        marginBottom: 20,
    },
    title: {
        fontSize: 40,
        color: "#4CAF50", // Verde brillante
        fontWeight: "bold",
        textShadowColor: 'rgba(0, 0, 0, 0.75)', // Sombra para el texto
        textShadowOffset: { width: 2, height: 2 },
        textShadowRadius: 5,
    },
    subtitle: {
        fontSize: 20,
        color: "#4CAF50", // Verde claro
        marginTop: 10,
        textShadowColor: 'rgba(0, 0, 0, 0.75)', // Sombra para el texto
        textShadowOffset: { width: 2, height: 2 },
        textShadowRadius: 5,
    },
});

export default SplashScreen;