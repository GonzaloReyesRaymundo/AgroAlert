import React, { useEffect, useRef } from "react";
import { View, Text, StyleSheet, Image, Animated } from "react-native";
import { NavigationProp } from '@react-navigation/native';
import { LinearGradient } from "expo-linear-gradient";
import Svg, { Path } from "react-native-svg";

const SplashScreen = ({ navigation }: { navigation: NavigationProp<any> }) => {
    const logoAnim = useRef(new Animated.Value(0)).current;
    const textAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        // Animaciones
        Animated.timing(logoAnim, {
            toValue: 1,
            duration: 1500,
            useNativeDriver: true
        }).start();

        Animated.timing(textAnim, {
            toValue: 1,
            duration: 2000,
            useNativeDriver: true
        }).start();

        // Navegación automática
        setTimeout(() => {
            navigation.navigate("Login");
        }, 3000);
    }, []);

    return (
        <View style={styles.container}>
            {/* Fondo degradado */}
            <LinearGradient colors={["#a8e063", "#56ab2f"]} style={styles.background}>
                {/* Figura decorativa superior */}
                <Svg height="120" width="100%" viewBox="0 0 1440 320" style={styles.topWave}>
                    <Path fill="#388E3C" d="M0,224L60,234.7C120,245,240,267,360,266.7C480,267,600,245,720,229.3C840,213,960,203,1080,213.3C1200,224,1320,256,1380,272L1440,288V0H1380C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0H0Z"/>
                </Svg>

                {/* Contenido */}
                <View style={styles.content}>
                    {/* Logo animado */}
                    <Animated.Image
                        source={require('../../assets/images/AgroAlert.png')} // Imagen local
                        style={[
                            styles.logo,
                            {
                                transform: [{ translateY: logoAnim.interpolate({ inputRange: [0, 1], outputRange: [50, 0] }) }],
                                opacity: logoAnim
                            }
                        ]}
                    />
                    {/* Título animado */}
                    <Animated.Text style={[styles.title, { opacity: textAnim }]}>
                        Agroalert
                    </Animated.Text>
                    {/* Subtítulo animado */}
                    <Animated.Text style={[styles.subtitle, { opacity: textAnim }]}>
                        Protegiendo tus cultivos
                    </Animated.Text>
                </View>

                {/* Figura decorativa inferior */}
                <Svg height="120" width="100%" viewBox="0 0 1440 320" style={styles.bottomWave}>
                    <Path fill="#388E3C" d="M0,224L60,234.7C120,245,240,267,360,266.7C480,267,600,245,720,229.3C840,213,960,203,1080,213.3C1200,224,1320,256,1380,272L1440,288V320H1380C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320H0Z"/>
                </Svg>
            </LinearGradient>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    background: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    topWave: {
        position: "absolute",
        top: 0,
    },
    bottomWave: {
        position: "absolute",
        bottom: 0,
    },
    content: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    logo: {
        width: 120, // Ajusta el tamaño según la imagen
        height: 120, // Ajusta el tamaño según la imagen
        marginBottom: 20,
        borderRadius: 60, // Opcional: para bordes redondeados
    },
    title: {
        fontSize: 40,
        color: "White", // Verde fuerte
        fontWeight: "bold",
        textShadowColor: 'rgb(247, 245, 245)',
        textShadowOffset: { width: 2, height: 2 },
        textShadowRadius: 4,
    },
    subtitle: {
        fontSize: 20,
        color: "white", // Verde fuerte
        marginTop: 10,
        textShadowColor: 'rgba(0, 0, 0, 0.3)',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 3,
    },
});

export default SplashScreen;