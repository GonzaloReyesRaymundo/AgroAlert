import React, { useRef, useState } from 'react';
import { View, Text, StyleSheet, TextInput, FlatList, Image, ScrollView, Dimensions, TouchableOpacity, Keyboard } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Button } from 'react-native-paper';
import { NavigationProp } from '@react-navigation/native';

const { width } = Dimensions.get('window');

interface Props {
  navigation: NavigationProp<any>;
}

const images = [
  { id: '1', source: require('../../assets/images/plaga1.jpg') },
  { id: '2', source: require('../../assets/images/plaga2.jpg') },
  { id: '3', source: require('../../assets/images/plaga3.jpg') },
];

const searchOptions = [
  { id: '1', name: 'Perfil' },
  { id: '2', name: 'Settings' },
  { id: '3', name: 'Recuperar Contraseña' },
];

const HomeScreen = ({ navigation }: Props) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<{ id: string; name: string }[]>([]);
  const flatListRef = useRef<FlatList>(null);

  const renderItem = ({ item }: { item: { id: string; source: any } }) => {
    if (!item || !item.source) {
      return <Text>Imagen no disponible</Text>;
    }
    return <Image source={item.source} style={styles.carouselImage} />;
  };

  const handleNext = () => {
    if (currentIndex < images.length - 1) {
      flatListRef.current?.scrollToIndex({ index: currentIndex + 1 });
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      flatListRef.current?.scrollToIndex({ index: currentIndex - 1 });
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleSearch = () => {
    Keyboard.dismiss();
    const results = searchOptions.filter(option =>
      option.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setSearchResults(results);
  };

  return (
    <LinearGradient colors={['#a8e063', '#56ab2f']} style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <Text style={styles.title}>AgroAlert</Text>
          <View style={styles.searchContainer}>
            <TextInput
              style={styles.searchBox}
              placeholder="Buscar..."
              placeholderTextColor="#666"
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
            <TouchableOpacity onPress={handleSearch} style={styles.searchIcon}>
              <Icon name="search" size={20} color="#666" />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.carouselContainer}>
          <FlatList
            ref={flatListRef}
            data={images}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onMomentumScrollEnd={(event) => {
              const newIndex = Math.floor(event.nativeEvent.contentOffset.x / width);
              setCurrentIndex(newIndex);
            }}
          />
          <View style={styles.carouselControls}>
            <TouchableOpacity onPress={handlePrev} style={styles.controlButton}>
              <Text style={styles.controlText}>‹</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleNext} style={styles.controlButton}>
              <Text style={styles.controlText}>›</Text>
            </TouchableOpacity>
          </View>
        </View>

        {searchResults.length > 0 && (
          <View style={styles.searchResults}>
            <Text style={styles.sectionTitle}>Resultados de Búsqueda:</Text>
            <FlatList
              data={searchResults}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <Text style={styles.searchResultItem}>• {item.name}</Text>
              )}
            />
          </View>
        )}

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Sobre Nosotros</Text>
          <Text style={styles.sectionText}>
            Somos un equipo comprometido con la protección de cultivos a través de la tecnología.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Datos Curiosos sobre Plagas</Text>
          <FlatList
            data={[
              { id: '1', fact: 'Las plagas pueden reducir la producción agrícola hasta un 40%.' },
              { id: '2', fact: 'Las hormigas pueden proteger plantas de otras plagas.' },
            ]}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => <Text style={styles.factItem}>• {item.fact}</Text>}
          />
        </View>

        {/* Botones de navegación agregados desde el primer diseño */}
        <View style={styles.navigationButtons}>
          <Button
            mode="contained"
            style={styles.button}
            onPress={() => navigation.navigate('LoginScreen')}
          >
            Ir al Login
          </Button>

          <Button
            mode="contained"
            style={styles.button}
            onPress={() => navigation.navigate('Configuración')}
          >
            Ir a Configuración
          </Button>

          <Button
            mode="contained"
            style={styles.button}
            onPress={() => navigation.navigate('Perfil')}
          >
            Ir a Perfil
          </Button>
        </View>
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2E7D32',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    backgroundColor: 'white',
    width: '90%',
    borderRadius: 10,
    paddingHorizontal: 10,
  },
  searchBox: {
    flex: 1,
    padding: 10,
  },
  searchIcon: {
    padding: 10,
  },
  carouselContainer: {
    position: 'relative',
    height: 200,
    marginVertical: 20,
  },
  carouselImage: {
    width: width,
    height: 200,
    borderRadius: 10,
  },
  carouselControls: {
    position: 'absolute',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    top: '50%',
    transform: [{ translateY: -15 }],
    paddingHorizontal: 10,
  },
  controlButton: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 20,
    padding: 10,
  },
  controlText: {
    color: 'white',
    fontSize: 24,
  },
  searchResults: {
    padding: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 10,
    marginHorizontal: 20,
    marginBottom: 20,
  },
  searchResultItem: {
    fontSize: 16,
    color: '#444',
    marginVertical: 4,
  },
  section: {
    padding: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 10,
    marginHorizontal: 20,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#2E7D32',
    marginBottom: 5,
  },
  sectionText: {
    fontSize: 16,
    color: '#555',
  },
  factItem: {
    fontSize: 16,
    color: '#444',
    marginVertical: 4,
  },
  navigationButtons: {
    padding: 20,
    marginBottom: 40,
  },
  button: {
    backgroundColor: '#8BC34A',
    marginBottom: 10,
    paddingVertical: 10,
    borderRadius: 5,
  },
});

export default HomeScreen;

