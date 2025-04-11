import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Modal,
} from "react-native";
import { WebView } from "react-native-webview";

const GaleriaScreen = () => {
  interface Plaga {
    urlImagen: string;
    nombrePlaga: string;
    descripcion: string;
    videoUrl?: string; // Nuevo campo para video
  }

  const [plagas, setPlagas] = useState<Plaga[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedPlaga, setSelectedPlaga] = useState<Plaga | null>(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    // Prueba manual con videos
    const datosPrueba: Plaga[] = [
      {
        urlImagen: "https://www.fhalmeria.com/imagenes/noticias/zoomfotonoticia-31808.jpg",
        nombrePlaga: "Mosquita Blanca",
        descripcion: "Es una plaga común en cultivos tropicales.",
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      },
      {
        urlImagen: "https://www.fhalmeria.com/imagenes/noticias/zoomfotonoticia-31808.jpg",
        nombrePlaga: "Gusano Cogollero",
        descripcion: "Ataca el cogollo de las plantas de maíz.",
        videoUrl: "https://www.youtube.com/embed/oHg5SJYRHA0",
      },
    ];
    setPlagas(datosPrueba);
    setLoading(false);

    // Si quieres usar tu API real, reemplaza por esto:
    /*
    fetch("http://178.6.7.246/wsA/ApiU.php?api=buscarPlaga")
      .then((response) => response.json())
      .then((data) => {
        if (!data.error) {
          setPlagas(data.contenido);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error al obtener datos:", error);
        setLoading(false);
      });
    */
  }, []);

  const filteredPlagas = plagas.filter((plaga) =>
    plaga.nombrePlaga.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Galería de Plagas</Text>
      <TextInput
        style={styles.searchInput}
        placeholder="Buscar plaga..."
        placeholderTextColor="#FFF"
        onChangeText={setSearch}
        value={search}
      />
      {filteredPlagas.map((plaga, index) => (
        <View key={index} style={styles.card}>
          {/* Video */}
          {plaga.videoUrl && (
            <View style={styles.videoContainer}>
              <WebView
                style={styles.video}
                javaScriptEnabled={true}
                domStorageEnabled={true}
                source={{ uri: plaga.videoUrl }}
              />
            </View>
          )}

          {/* Imagen */}
          <TouchableOpacity
            onPress={() => {
              setSelectedPlaga(plaga);
              setModalVisible(true);
            }}
          >
            <Image
              source={{ uri: plaga.urlImagen }}
              style={styles.image}
              onError={() =>
                console.error("Error loading image:", plaga.urlImagen)
              }
            />
          </TouchableOpacity>

          {/* Botón con nombre */}
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              setSelectedPlaga(plaga);
              setModalVisible(true);
            }}
          >
            <Text style={styles.buttonText}>{plaga.nombrePlaga}</Text>
          </TouchableOpacity>
        </View>
      ))}

      {/* Modal */}
      <Modal visible={modalVisible} transparent animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>{selectedPlaga?.nombrePlaga}</Text>
            {selectedPlaga?.urlImagen && (
              <Image
                source={{ uri: selectedPlaga.urlImagen }}
                style={styles.modalImage}
              />
            )}
            <Text style={styles.modalDescription}>
              {selectedPlaga?.descripcion}
            </Text>
            <TouchableOpacity
              onPress={() => setModalVisible(false)}
              style={styles.closeButton}
            >
              <Text style={styles.closeButtonText}>Cerrar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
    color: "#FFF",
    marginVertical: 15,
  },
  searchInput: {
    backgroundColor: "#388E3C",
    color: "#FFF",
    padding: 10,
    borderRadius: 20,
    marginBottom: 15,
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
  videoContainer: {
    height: 200,
    width: "100%",
    borderRadius: 10,
    overflow: "hidden",
    marginBottom: 10,
  },
  video: {
    flex: 1,
  },
  image: {
    width: "100%",
    height: 150,
    borderRadius: 10,
  },
  button: {
    backgroundColor: "#388E3C",
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
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "#FFF",
    padding: 20,
    borderRadius: 10,
    width: "80%",
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  modalImage: {
    width: "100%",
    height: 150,
    borderRadius: 10,
    marginBottom: 10,
  },
  modalDescription: {
    fontSize: 14,
    textAlign: "center",
  },
  closeButton: {
    backgroundColor: "#388E3C",
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 20,
    marginTop: 10,
  },
  closeButtonText: {
    color: "#FFF",
    fontWeight: "bold",
  },
});

export default GaleriaScreen;
