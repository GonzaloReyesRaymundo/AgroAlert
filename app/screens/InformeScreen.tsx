import React, { useEffect, useState } from "react";
import { View, Text, Image, ScrollView, StyleSheet, TouchableOpacity, ActivityIndicator } from "react-native";

const InformeScreen = () => {
  interface Plaga {
    urlImagen: string;
    nombrePlaga: string;
    descripcion: string;
    categoria: string;
    tipoPlanta: string;
    medidasPreventivas: string;
    Cura: string;
  }

  const [plagas, setPlagas] = useState<Plaga[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://178.6.7.246/wsA/ApiU.php?api=buscarPlaga")
      .then((response) => response.json())
      .then((data) => {
        if (!data.error) {
          setPlagas(data.contenido); // contenido = array de plagas
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error al obtener datos:", error);
        setLoading(false);
      });
  }, []);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Plagas en Cultivos</Text>

      {loading ? (
        <ActivityIndicator size="large" color="#FFFFFF" />
      ) : plagas.length > 0 ? (
        plagas.map((plaga, index) => (
          <View key={index} style={styles.card}>
            <Image
              source={{ uri: plaga.urlImagen }}
              style={styles.image}
              onError={() => console.error("Error loading image:", plaga.urlImagen)}
            />
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>{plaga.nombrePlaga}</Text>
            </TouchableOpacity>
            <Text style={styles.description}>{plaga.descripcion}</Text>
            <Text style={styles.subInfo}>Categoría: {plaga.categoria}</Text>
            <Text style={styles.subInfo}>Planta afectada: {plaga.tipoPlanta}</Text>
            <Text style={styles.subInfo}>Medidas: {plaga.medidasPreventivas}</Text>
            <Text style={styles.subInfo}>Cura: {plaga.Cura}</Text>
          </View>
        ))
      ) : (
        <Text style={styles.description}>No se encontraron plagas.</Text>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#4CAF50",
    padding: 10,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    color: "#1B5E20",
    marginVertical: 15,
  },
  card: {
    backgroundColor: "#81C784",
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
    resizeMode: "cover",
  },
  button: {
    backgroundColor: "#4CAF50",
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 20,
    marginTop: 10,
  },
  buttonText: {
    color: "#FFF",
    fontWeight: "bold",
    fontSize: 16,
  },
  description: {
    fontSize: 14,
    textAlign: "center",
    color: "#FFF",
    marginTop: 8,
    paddingHorizontal: 10,
  },
  subInfo: {
    fontSize: 13,
    color: "#FFFFFF",
    marginTop: 4,
    textAlign: "center",
  },
});

export default InformeScreen;
