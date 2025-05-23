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
  Dimensions,
  ActivityIndicator,
  Linking
} from "react-native";
import { WebView } from "react-native-webview";
import { LinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { BlurView } from 'expo-blur';

const { width } = Dimensions.get('window');

const GaleriaScreen = () => {
  interface Plaga {
    urlImagen: string;
    nombrePlaga: string;
    descripcion: string;
    videoUrl?: string;
    tipo?: string;
    gravedad?: string;
  }

  const [plagas, setPlagas] = useState<Plaga[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedPlaga, setSelectedPlaga] = useState<Plaga | null>(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    // Datos de prueba mejorados
    const datosPrueba: Plaga[] = [
      {
        urlImagen: "https://www.corrys.com/-/media/project/oneweb/corrys/images/blog/slugs-and-snails-all-you-need-to-know/big-snail.jpg",
        nombrePlaga: "Caracol y Babosas",
        descripcion: "Los caracoles y babosas son moluscos que se alimentan de hojas, tallos y frutos, dejando rastros de baba. Atacan principalmente durante la noche o en días húmedos.",
        videoUrl: "https://www.youtube.com/embed/Gnpr3POX12A?si=z1oQspQfxqpbf5cx",
        tipo: "Molusco",
        gravedad: "Media-Alta"
      },
      {
        urlImagen: "https://www.gruposacsa.com.mx/wp-content/uploads/2019/09/gusano-cogollero.jpg",
        nombrePlaga: "Gusano Cogollero",
        descripcion: "Larva que afecta principalmente al maíz, perforando hojas y cogollos. Puede causar pérdidas de hasta el 50% del cultivo si no se controla a tiempo.",
        videoUrl: "https://www.youtube.com/embed/1GX-BodHzr4?si=23aP3GFjxc7zoWiB",
        tipo: "Lepidóptero",
        gravedad: "Alta"
      },
      {
        urlImagen: "https://jardineriasanchez.com/wp-content/uploads/2016/08/pulgon.jpg",
        nombrePlaga: "Pulgón",
        descripcion: "Insectos pequeños que chupan la savia de las plantas y excretan melaza, favoreciendo el crecimiento de hongos. Se reproducen rápidamente en climas cálidos.",
        videoUrl: "https://www.youtube.com/embed/_zvxTAsE1NA?si=8FRYLKHELyiWrYcA",
        tipo: "Hemíptero",
        gravedad: "Media"
      },
      {
        urlImagen: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/86/Mexican_Bean_Beetle_-_Epilachna_varivestis%2C_Elkhorn_Garden_Plots%2C_Columbia%2C_Maryland.jpg/640px-Mexican_Bean_Beetle_-_Epilachna_varivestis%2C_Elkhorn_Garden_Plots%2C_Columbia%2C_Maryland.jpg",
        nombrePlaga: "Conchuela",
        descripcion: "Insectos escamosos que forman colonias en tallos y hojas. Dificultan la fotosíntesis y debilitan la planta progresivamente.",
        videoUrl: "https://www.youtube.com/embed/J43QbehXVhE?si=y7NMPLK3_xhTCFe5",
        tipo: "Cóccido",
        gravedad: "Media"
      },
      {
        urlImagen: "https://www.alchimiaweb.com/blog/wp-content/uploads/2015/01/Mosca-blanca.jpg",
        nombrePlaga: "Mosca Blanca",
        descripcion: "Pequeñas moscas blancas que succionan la savia y transmiten virus. Prefieren el envés de las hojas y son resistentes a muchos pesticidas.",
        videoUrl: "https://www.youtube.com/embed/og37Gey6kTI?si=c3NDeVzJK3YxDeGl",
        tipo: "Hemíptero",
        gravedad: "Alta"
      },
    ];
    
    setTimeout(() => {
      setPlagas(datosPrueba);
      setLoading(false);
    }, 1000);
  }, []);

  const filteredPlagas = plagas.filter((plaga) =>
    plaga.nombrePlaga.toLowerCase().includes(search.toLowerCase())
  );

  const renderGravedad = (nivel: string) => {
    let color = '#4CAF50';
    if (nivel === 'Media') color = '#FFC107';
    if (nivel === 'Media-Alta') color = '#FF9800';
    if (nivel === 'Alta') color = '#F44336';
    
    return (
      <View style={[styles.gravedadBadge, { backgroundColor: color }]}>
        <Text style={styles.gravedadText}>{nivel}</Text>
      </View>
    );
  };

  return (
    <LinearGradient colors={['#2E7D32', '#81C784']} style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.header}>
          <Text style={styles.title}>Galería de Plagas</Text>
          <Text style={styles.subtitle}>Identificación y manejo integrado</Text>
          
          <View style={styles.searchContainer}>
            <Icon name="search" size={20} color="#FFF" style={styles.searchIcon} />
            <TextInput
              style={styles.searchInput}
              placeholder="Buscar plaga..."
              placeholderTextColor="rgba(255,255,255,0.7)"
              onChangeText={setSearch}
              value={search}
            />
          </View>
        </View>

        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#FFF" />
            <Text style={styles.loadingText}>Cargando información...</Text>
          </View>
        ) : filteredPlagas.length > 0 ? (
          filteredPlagas.map((plaga, index) => (
            <View key={index} style={styles.card}>
              {/* Video embebido */}
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

              <TouchableOpacity
                onPress={() => {
                  setSelectedPlaga(plaga);
                  setModalVisible(true);
                }}
                activeOpacity={0.8}
              >
                <Image
                  source={{ uri: plaga.urlImagen }}
                  style={styles.image}
                  onError={() => console.error("Error loading image:", plaga.urlImagen)}
                />
              </TouchableOpacity>

              <View style={styles.cardFooter}>
                <Text style={styles.plagaName}>{plaga.nombrePlaga}</Text>
                {plaga.gravedad && renderGravedad(plaga.gravedad)}
              </View>
            </View>
          ))
        ) : (
          <View style={styles.emptyContainer}>
            <Icon name="search-off" size={50} color="#FFF" />
            <Text style={styles.emptyText}>No se encontraron plagas</Text>
            <Text style={styles.emptySubtext}>Intenta con otro término de búsqueda</Text>
          </View>
        )}
      </ScrollView>

      {/* Modal de detalle */}
      <Modal visible={modalVisible} transparent animationType="fade">
        <BlurView intensity={50} style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <TouchableOpacity 
                style={styles.closeButton} 
                onPress={() => setModalVisible(false)}
              >
                <Icon name="close" size={24} color="#FFF" />
              </TouchableOpacity>

              {selectedPlaga?.videoUrl && (
                <View style={styles.modalVideoContainer}>
                  <WebView
                    style={styles.modalVideo}
                    source={{ uri: selectedPlaga.videoUrl }}
                  />
                </View>
              )}

              <Text style={styles.modalTitle}>{selectedPlaga?.nombrePlaga}</Text>
              
              <View style={styles.modalDetails}>
                <View style={styles.detailRow}>
                  <Icon name="pest-control" size={18} color="#2E7D32" />
                  <Text style={styles.detailText}>Tipo: {selectedPlaga?.tipo || 'No especificado'}</Text>
                </View>
                <View style={styles.detailRow}>
                  <Icon name="warning" size={18} color="#2E7D32" />
                  <Text style={styles.detailText}>Gravedad: {selectedPlaga?.gravedad || 'No especificada'}</Text>
                </View>
              </View>

              <Text style={styles.modalDescription}>
                {selectedPlaga?.descripcion}
              </Text>

              <TouchableOpacity 
                style={styles.modalActionButton}
                onPress={() => Linking.openURL(selectedPlaga?.videoUrl || '')}
              >
                <Icon name="play-circle" size={20} color="#FFF" />
                <Text style={styles.modalActionText}>Ver video completo</Text>
              </TouchableOpacity>
            </View>
          </View>
        </BlurView>
      </Modal>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    paddingBottom: 30,
  },
  header: {
    padding: 20,
    paddingTop: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFF',
    textAlign: 'center',
    marginBottom: 5,
    textShadowColor: 'rgba(0,0,0,0.2)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  subtitle: {
    fontSize: 16,
    color: '#E8F5E9',
    textAlign: 'center',
    marginBottom: 20,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 25,
    paddingHorizontal: 15,
    marginTop: 10,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    color: '#FFF',
    height: 45,
    fontSize: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 50,
  },
  loadingText: {
    color: '#FFF',
    marginTop: 15,
    fontSize: 16,
  },
  card: {
    backgroundColor: 'rgba(255,255,255,0.9)',
    borderRadius: 15,
    marginHorizontal: 15,
    marginBottom: 20,
    overflow: 'hidden',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  videoContainer: {
    height: 200,
    width: '100%',
  },
  video: {
    flex: 1,
  },
  image: {
    width: '100%',
    height: 180,
    resizeMode: 'cover',
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#FFF',
  },
  plagaName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2E7D32',
    flex: 1,
  },
  gravedadBadge: {
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 15,
    marginLeft: 10,
  },
  gravedadText: {
    color: '#FFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  emptyText: {
    color: '#FFF',
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 15,
  },
  emptySubtext: {
    color: '#E8F5E9',
    fontSize: 14,
    marginTop: 5,
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
  },
  modalContainer: {
    marginHorizontal: 25,
  },
  modalContent: {
    backgroundColor: '#FFF',
    borderRadius: 15,
    overflow: 'hidden',
  },
  closeButton: {
    position: 'absolute',
    top: 15,
    right: 15,
    zIndex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 20,
    padding: 5,
  },
  modalVideoContainer: {
    height: 200,
    width: '100%',
  },
  modalVideo: {
    flex: 1,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#2E7D32',
    textAlign: 'center',
    marginVertical: 15,
    paddingHorizontal: 20,
  },
  modalDetails: {
    paddingHorizontal: 20,
    marginBottom: 15,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  detailText: {
    fontSize: 15,
    color: '#555',
    marginLeft: 8,
  },
  modalDescription: {
    fontSize: 15,
    color: '#555',
    lineHeight: 22,
    paddingHorizontal: 20,
    marginBottom: 20,
    textAlign: 'justify',
  },
  modalActionButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2E7D32',
    padding: 15,
    marginHorizontal: 20,
    marginBottom: 20,
    borderRadius: 10,
  },
  modalActionText: {
    color: '#FFF',
    fontWeight: 'bold',
    marginLeft: 10,
    fontSize: 16,
  },
});

export default GaleriaScreen;