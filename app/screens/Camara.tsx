import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import axios from 'axios';
import { Camera } from 'expo-camera';

const CamaraScreen = () => {
  const [imageUri, setImageUri] = useState<string>('');
  const [labels, setLabels] = useState<any[]>([]);
  const [hasCameraPermission, setHasCameraPermission] = useState<boolean | null>(null);

  // Solicitar permisos para la cámara
  React.useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasCameraPermission(status === 'granted');
    })();
  }, []);

  // Tomar foto con la cámara
  const takePhoto = async () => {
    if (hasCameraPermission === false) {
      Alert.alert('Error', 'No tienes permisos para acceder a la cámara');
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
      base64: false,
    });

    if (!result.canceled) {
      const uri = result.assets[0].uri;
      setImageUri(uri);
      setLabels([]);
    }
  };

  // Seleccionar imagen desde galería
  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
      base64: false,
    });

    if (!result.canceled) {
      const uri = result.assets[0].uri;
      setImageUri(uri);
      setLabels([]);
    }
  };

  // Analizar imagen con Google Vision API
  const analyzeImage = async () => {
    if (!imageUri) {
      Alert.alert('Error', 'Por favor, selecciona o toma una imagen primero.');
      return;
    }

    const apiKey = 'AIzaSyCqhA_9G_sq62W6SojvanwNrVe1Gj43o2U'; // ⚠️ Reemplaza con tu clave real

    try {
      const base64Image = await FileSystem.readAsStringAsync(imageUri, {
        encoding: FileSystem.EncodingType.Base64,
      });

      const requestData = {
        requests: [
          {
            image: {
              content: base64Image,
            },
            features: [
              {
                type: 'LABEL_DETECTION',
                maxResults: 5,
              },
            ],
          },
        ],
      };

      const response = await axios.post(
        `https://vision.googleapis.com/v1/images:annotate?key=${apiKey}`,
        requestData
      );

      type GoogleVisionResponse = {
        responses: {
          labelAnnotations: { description: string; score: number }[];
        }[];
      };

      const resultLabels = (response.data as GoogleVisionResponse).responses[0].labelAnnotations;
      setLabels(resultLabels);
    } catch (error) {
      console.error('Error al analizar la imagen:', error);
      Alert.alert('Error', 'Ocurrió un problema al analizar la imagen.');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Detección de Objetos con Google Vision API</Text>

      {imageUri ? (
        <Image source={{ uri: imageUri }} style={styles.image} />
      ) : (
        <Text style={styles.placeholder}>No se ha seleccionado imagen</Text>
      )}

      <View style={styles.buttonGroup}>
        <TouchableOpacity style={[styles.button, styles.cameraButton]} onPress={takePhoto}>
          <Text style={styles.buttonText}>Tomar Foto</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.button, styles.galleryButton]} onPress={pickImage}>
          <Text style={styles.buttonText}>Elegir de Galería</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={[styles.button, styles.analyzeButton]} onPress={analyzeImage}>
        <Text style={styles.buttonText}>Analizar Imagen</Text>
      </TouchableOpacity>

      {labels.length > 0 && (
        <View style={styles.labelsContainer}>
          <Text style={styles.labelsTitle}>Etiquetas detectadas:</Text>
          {labels.map((label, index) => (
            <Text key={index} style={styles.label}>
              {label.description} ({(label.score * 100).toFixed(1)}%)
            </Text>
          ))}
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 20,
    marginVertical: 10,
    fontWeight: 'bold',
    color: '#1E88E5',
    textAlign: 'center',
  },
  placeholder: {
    fontStyle: 'italic',
    marginVertical: 10,
    color: 'gray',
  },
  image: {
    width: 300,
    height: 300,
    borderRadius: 10,
    marginVertical: 10,
    resizeMode: 'cover',
  },
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginVertical: 10,
  },
  button: {
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
    elevation: 2,
    marginHorizontal: 5,
  },
  cameraButton: {
    backgroundColor: '#4CAF50',
    flex: 1,
  },
  galleryButton: {
    backgroundColor: '#2196F3',
    flex: 1,
  },
  analyzeButton: {
    backgroundColor: '#FF9800',
    width: '100%',
    marginVertical: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  labelsContainer: {
    marginTop: 20,
    alignSelf: 'flex-start',
    width: '100%',
  },
  labelsTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 5,
    color: '#333',
  },
  label: {
    fontSize: 14,
    marginBottom: 3,
  },
});

export default CamaraScreen;