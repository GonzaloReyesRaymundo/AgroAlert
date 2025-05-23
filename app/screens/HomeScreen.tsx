import React, { useRef, useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, FlatList, Image, ScrollView, Dimensions, TouchableOpacity, Keyboard, Animated } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { BlurView } from 'expo-blur';

const { width } = Dimensions.get('window');

interface ImageItem {
  id: string;
  source: any;
  title: string;
  description: string;
}

const images: ImageItem[] = [
  {
    id: '1',
    source: require('../../assets/images/controlplagas.jpg'),
    title: 'Control de Plagas',
    description: 'Soluciones efectivas para proteger tus cultivos'
  },
  {
    id: '2',
    source: require('../../assets/images/detecciontem.jpg'),
    title: 'Detección Temprana',
    description: 'Identifica problemas antes que afecten tu producción'
  },
  {
    id: '3',
    source: require('../../assets/images/asseso.jpeg'),
    title: 'Asesoría Expertas',
    description: 'Consejos de nuestros especialistas agrícolas'
  },
  {
    id: '4',
    source: require('../../assets/images/tecnologia.webp'),
    title: 'Tecnología Avanzada',
    description: 'Herramientas modernas para el campo'
  },
  {
    id: '5',
    source: require('../../assets/images/solucionesOrg.jpg'),
    title: 'Soluciones Orgánicas',
    description: 'Alternativas ecológicas para tu cultivo'
  },
];

const HomeScreen = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const scrollX = useRef(new Animated.Value(0)).current;
  const flatListRef = useRef<FlatList>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      const nextIndex = (currentIndex + 1) % images.length;
      flatListRef.current?.scrollToIndex({ index: nextIndex, animated: true });
      setCurrentIndex(nextIndex);
    }, 5000);

    return () => clearInterval(interval);
  }, [currentIndex]);

  const renderItem = ({ item }: { item: ImageItem }) => (
    <View style={styles.carouselItem}>
      <Image source={item.source} style={styles.carouselImage} />
      <View style={styles.imageOverlay}>
        <Text style={styles.imageTitle}>{item.title}</Text>
        <Text style={styles.imageDescription}>{item.description}</Text>
      </View>
    </View>
  );

  const handleDotPress = (index: number) => {
    flatListRef.current?.scrollToIndex({ index, animated: true });
    setCurrentIndex(index);
  };

  return (
    <LinearGradient colors={['#56ab2f', '#a8e063']} style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Header */}
        <BlurView intensity={90} style={styles.header}>
          <Text style={styles.title}>AgroAlert</Text>
          <Text style={styles.subtitle}>Protegiendo tus cultivos</Text>

          <View style={styles.searchContainer}>
            <TextInput
              style={styles.searchBox}
              placeholder="Buscar plagas, soluciones..."
              placeholderTextColor="#a0a0a0"
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
            <TouchableOpacity style={styles.searchButton}>
              <Icon name="search" size={20} color="white" />
            </TouchableOpacity>
          </View>
        </BlurView>

        {/* Carrusel mejorado */}
        <View style={styles.carouselContainer}>
          <FlatList
            ref={flatListRef}
            data={images}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onScroll={Animated.event(
              [{ nativeEvent: { contentOffset: { x: scrollX } } }],
              { useNativeDriver: false }
            )}
            onMomentumScrollEnd={(e) => {
              const newIndex = Math.round(e.nativeEvent.contentOffset.x / width);
              setCurrentIndex(newIndex);
            }}
          />

          <View style={styles.dotsContainer}>
            {images.map((_, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.dot,
                  currentIndex === index && styles.activeDot
                ]}
                onPress={() => handleDotPress(index)}
              />
            ))}
          </View>
        </View>

        {/* Sección de características */}
        <View style={styles.featuresContainer}>
          <View style={styles.featureCard}>
            <Icon name="bug" size={30} color="#2E7D32" />
            <Text style={styles.featureTitle}>Detección</Text>
            <Text style={styles.featureText}>Identifica plagas rápidamente</Text>
          </View>

          <View style={styles.featureCard}>
            <Icon name="leaf" size={30} color="#2E7D32" />
            <Text style={styles.featureTitle}>Prevención</Text>
            <Text style={styles.featureText}>Métodos para evitar daños</Text>
          </View>

          <View style={styles.featureCard}>
            <Icon name="video" size={30} color="#2E7D32" />
            <Text style={styles.featureTitle}>Videos</Text>
            <Text style={styles.featureText}>Galeria donde Puedes informarte</Text>
          </View>
        </View>

        {/* Sección informativa */}
        <View style={styles.infoSection}>
          <Text style={styles.sectionTitle}>Nuestro Enfoque</Text>
          <Text style={styles.sectionText}>
            Combinamos tecnología avanzada con conocimiento agrícola tradicional
            para ofrecerte soluciones integrales contra plagas.
          </Text>

          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Text style={styles.statNumberLarge}>95%</Text>
              <Text style={styles.statLabelSmall}>Efectividad</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumberLarge}>24/7</Text>
              <Text style={styles.statLabelSmall}>Monitoreo</Text>
            </View>
            <View style={styles.statItem}>
              <Icon name="check" size={30} color="#2E7D32" />
              <Text style={styles.statLabelSmall}>Plagas detectadas</Text>
            </View>
          </View>
        </View>

        {/* Sección de Datos Clave */}
        <View style={styles.infoSection}>
          <Text style={styles.sectionTitle}>Detección Temprana Salva Cultivos</Text>

          <View style={styles.statsCard}>
            <View style={styles.statRow}>
              <Icon name="chart-pie" size={24} color="#2E7D32" style={styles.statIcon} />
              <View>
                <Text style={styles.statNumber}>40%</Text>
                <Text style={styles.statLabel}>de pérdidas agrícolas mundiales son por plagas</Text>
              </View>
            </View>

            <View style={styles.statRow}>
              <Icon name="clock" size={24} color="#2E7D32" style={styles.statIcon} />
              <View>
                <Text style={styles.statNumber}>72 hrs</Text>
                <Text style={styles.statLabel}>es el tiempo crítico para actuar ante una plaga</Text>
              </View>
            </View>

            <View style={styles.statRow}>
              <Icon name="money-bill-wave" size={24} color="#2E7D32" style={styles.statIcon} />
              <View>
                <Text style={styles.statNumber}>15x</Text>
                <Text style={styles.statLabel}>mayor costo si no se detecta a tiempo</Text>
              </View>
            </View>
          </View>

          <View style={styles.tipContainer}>
            <Text style={styles.tipTitle}>Beneficios Clave:</Text>
            <View style={styles.tipItem}>
              <Icon name="check-circle" size={18} color="#2E7D32" />
              <Text style={styles.tipText}>Reduce uso de pesticidas hasta en 60%</Text>
            </View>
            <View style={styles.tipItem}>
              <Icon name="check-circle" size={18} color="#2E7D32" />
              <Text style={styles.tipText}>Aumenta rendimiento en 25-40%</Text>
            </View>
            <View style={styles.tipItem}>
              <Icon name="check-circle" size={18} color="#2E7D32" />
              <Text style={styles.tipText}>Protege la biodiversidad del suelo</Text>
            </View>
          </View>

          <View style={styles.emergencyCard}>
            <View style={styles.emergencyHeader}>
              <Icon name="exclamation-triangle" size={20} color="#C0392B" />
              <Text style={styles.emergencyTitle}>Señales de Alerta:</Text>
            </View>
            <Text style={styles.emergencyText}>
              • Hojas mordidas o perforadas{'\n'}
              • Manchas inusuales en plantas{'\n'}
              • Presencia de insectos adultos{'\n'}
              • Crecimiento atrofiado
            </Text>
          </View>
        </View>
      </ScrollView>
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
    padding: 25,
    paddingTop: 50,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    overflow: 'hidden',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    marginBottom: 5,
    textShadowColor: 'rgba(0,0,0,0.2)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  subtitle: {
    fontSize: 16,
    color: 'white',
    textAlign: 'center',
    marginBottom: 20,
  },
  searchContainer: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 25,
    paddingHorizontal: 15,
    height: 50,
    alignItems: 'center',
    marginTop: 10,
  },
  searchBox: {
    flex: 1,
    color: 'white',
    fontSize: 16,
  },
  searchButton: {
    padding: 10,
  },
  carouselContainer: {
    height: 250,
    marginTop: 20,
  },
  carouselItem: {
    width: width - 40,
    marginHorizontal: 20,
    borderRadius: 20,
    overflow: 'hidden',
    elevation: 5,
  },
  carouselImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  imageOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 15,
  },
  imageTitle: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  imageDescription: {
    color: 'white',
    fontSize: 14,
  },
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 15,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#ccc',
    marginHorizontal: 5,
  },
  activeDot: {
    backgroundColor: '#2E7D32',
    width: 20,
  },
  featuresContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginTop: 30,
    marginBottom: 20,
  },
  featureCard: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 15,
    width: '30%',
    alignItems: 'center',
    elevation: 3,
  },
  featureTitle: {
    fontWeight: 'bold',
    marginVertical: 5,
    color: '#2E7D32',
  },
  featureText: {
    fontSize: 12,
    textAlign: 'center',
    color: '#666',
  },
  infoSection: {
    backgroundColor: 'white',
    marginHorizontal: 20,
    borderRadius: 20,
    padding: 20,
    marginTop: 10,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#2E7D32',
    marginBottom: 15,
  },
  sectionText: {
    fontSize: 16,
    color: '#555',
    lineHeight: 24,
    marginBottom: 20,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
  },
  statItem: {
    alignItems: 'center',
  },
  statNumberLarge: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2E7D32',
  },
  statLabelSmall: {
    fontSize: 14,
    color: '#666',
  },
  gallerySection: {
    marginTop: 30,
    paddingHorizontal: 20,
  },
  galleryItem: {
    width: 120,
    height: 120,
    borderRadius: 15,
    overflow: 'hidden',
    marginRight: 15,
    elevation: 3,
  },
  galleryImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  statsCard: {
    backgroundColor: '#f8fff8',
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  statRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  statIcon: {
    marginRight: 15,
    width: 30,
  },
  statNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2E7D32',
  },
  statLabel: {
    fontSize: 14,
    color: '#444',
    marginTop: 3,
  },
  tipContainer: {
    marginVertical: 15,
  },
  tipTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2E7D32',
    marginBottom: 10,
  },
  tipItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  tipText: {
    fontSize: 15,
    color: '#444',
    marginLeft: 10,
  },
  emergencyCard: {
    backgroundColor: '#fff8f8',
    borderRadius: 15,
    padding: 15,
    borderLeftWidth: 5,
    borderLeftColor: '#C0392B',
  },
  emergencyHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  emergencyTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#C0392B',
    marginLeft: 8,
  },
  emergencyText: {
    fontSize: 14,
    color: '#555',
    lineHeight: 22,
  },
});


export default HomeScreen;