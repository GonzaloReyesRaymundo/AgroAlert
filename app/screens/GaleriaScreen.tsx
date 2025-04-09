import React, { useState } from "react";
import { View, Text, Image, ScrollView, StyleSheet, TouchableOpacity, Linking, Modal, TextInput } from "react-native";
import { FontAwesome5 } from '@expo/vector-icons';

const plagas = [
  {
    id: 1,
    nombre: "Pulgón",
    descripcion: "Afecta cultivos de papa, tomate y chile. Puede transmitir virus y reducir la capacidad productiva de las plantas.",
    imagen: require("@/assets/images/Pulgon.jpeg"),
    video: "https://www.youtube.com/watch?v=video_pulgon"
  },
  {
    id: 2,
    nombre: "Gusano Cogollero",
    descripcion: "Daña cultivos de maíz y sorgo. Perfora hojas y afecta la producción.",
    imagen: require("@/assets/images/gusano-cogollero.jpg"),
    video: "https://www.youtube.com/watch?v=video_gusano"
  },
  {
    id: 3,
    nombre: "Mosca Blanca",
    descripcion: "Se alimenta de la savia de las plantas, causando amarillamiento y transmisión de virus.",
    imagen: require("@/assets/images/moscablanca.jpeg"),
    video: "https://www.youtube.com/watch?v=video_mosca"
  },
];

interface Plaga {
  id: number;
  nombre: string;
  descripcion: string;
  imagen: any;
  video: string;
}

const GaleriaScreen = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedPlaga, setSelectedPlaga] = useState<Plaga | null>(null);
  const [search, setSearch] = useState("");

  const filteredPlagas = plagas.filter(plaga => plaga.nombre.toLowerCase().includes(search.toLowerCase()));

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Galería de Plagas</Text>
      <TextInput
        style={styles.searchInput}
        placeholder="Buscar plaga..."
        placeholderTextColor="#FFF"
        onChangeText={text => setSearch(text)}
      />
      {filteredPlagas.map((plaga) => (
        <View key={plaga.id} style={styles.card}>
          <TouchableOpacity onPress={() => {
            setSelectedPlaga(plaga);
            setModalVisible(true);
          }}>
            <Image source={plaga.imagen} style={styles.image} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => {
            setSelectedPlaga(plaga);
            setModalVisible(true);
          }}>
            <Text style={styles.buttonText}>{plaga.nombre}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => Linking.openURL(plaga.video)} style={styles.videoButton}>
            <FontAwesome5 name="youtube" size={20} color="white" />
            <Text style={styles.videoText}>Ver video</Text>
          </TouchableOpacity>
        </View>
      ))}
      <Modal visible={modalVisible} transparent={true} animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>{selectedPlaga?.nombre}</Text>
            <Image source={selectedPlaga?.imagen} style={styles.modalImage} />
            <Text style={styles.modalDescription}>{selectedPlaga?.descripcion}</Text>
            <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.closeButton}>
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
  videoButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#D32F2F",
    paddingVertical: 6,
    paddingHorizontal: 15,
    borderRadius: 20,
    marginTop: 10,
  },
  videoText: {
    color: "#FFF",
    marginLeft: 8,
    fontWeight: "bold",
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