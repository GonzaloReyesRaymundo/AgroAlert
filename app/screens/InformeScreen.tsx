import React from "react";
import { View, Text, Image, ScrollView, StyleSheet, TouchableOpacity } from "react-native";

const plagas = [
  {
    id: 1,
    nombre: "Pulgón",
    descripcion: "Afecta principalmente cultivos de papa, tomate y chile. Detiene el proceso de maduración del fruto, debilitando las plantas y reduciendo su capacidad productiva. Además, pueden transmitir virus que agravan el daño a los cultivos.",
    imagen: require("@/assets/images/Pulgon.jpeg"),
  },
  {
    id: 2,
    nombre: "Gusano Cogollero",
    descripcion: "Ataca cultivos de maíz y sorgo, dañando hojas y tallos, reduciendo la producción. Las larvas perforan las hojas y se alimentan del cogollo, lo que impide el crecimiento adecuado de la planta y disminuye significativamente la cosecha.",
    imagen: require("@/assets/images/gusano-cogollero.jpg"),
  },
  {
    id: 3,
    nombre: "Mosca Blanca",
    descripcion: "Se alimenta de la savia de las plantas, causando amarillamiento y transmisión de virus. Su rápida reproducción hace que los cultivos sean más vulnerables, debilitando las plantas y generando pérdidas económicas en la agricultura.",
    imagen: require("@/assets/images/moscablanca.jpeg"),
  },
];

const InformeScreen = () => {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Plagas en Cultivos</Text>
      {plagas.map((plaga) => (
        <View key={plaga.id} style={styles.card}>
          <Image source={plaga.imagen} style={styles.image} />
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>{plaga.nombre}</Text>
          </TouchableOpacity>
          <Text style={styles.description}>{plaga.descripcion}</Text>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#4CAF50", // Fondo verde
    padding: 10,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    color: "#1B5E20", // Verde oscuro
    marginVertical: 15,
  },
  card: {
    backgroundColor: "#81C784", // Verde más claro
    borderRadius: 10,
    padding: 15,
    alignItems: "center",
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  image: {
    width: "100%",
    height: 150,
    borderRadius: 10,
  },
  button: {
    backgroundColor: "#4CAF50", // Verde brillante
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 20,
    marginTop: 10,
  },
  buttonText: {
    color: "#FFF", // Texto blanco
    fontWeight: "bold",
    fontSize: 16,
  },
  description: {
    fontSize: 14,
    textAlign: "center",
    color: "#FFF", // Texto blanco
    marginTop: 8,
    paddingHorizontal: 10,
  },
});

export default InformeScreen;
