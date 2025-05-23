import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Alert,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';
import { Camera } from 'expo-camera';
import * as FileSystem from 'expo-file-system';
import { manipulateAsync, SaveFormat } from 'expo-image-manipulator';

// ⚠️ Configuración de Vertex AI
const accessToken = 'ya29.a0AW4XtxhezeKNXvQIuqFdTrRdhJQ3ha8cs9K6VOzIi7eyFqzeiUmskuJWrmj9HJe-mi030gavHLFhtpsJol3DUiiMMTOEHiVQo8fSPMsC5fMLXogNdCqorlpjHK40lbAwu-QPRU3x8Lt63oa9sQLk_-ZcOQii4urwPyhDI6Lp4QaCgYKAcwSARESFQHGX2Mi3EYzsL0TdwwBTsTKzxjW3w0177';
const project = 'agua-419618';
const endpointId = '5449765666955460608';
const location = 'us-central1';

const MAX_IMAGE_SIZE_MB = 1.5;
const TARGET_WIDTH = 800; // Ancho objetivo para redimensionar

const CamaraScreen = () => {
  const [imageUri, setImageUri] = useState('');
  const [labels, setLabels] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasCameraPermission, setHasCameraPermission] = useState<boolean | null>(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasCameraPermission(status === 'granted');
    })();
  }, []);

  const processAndSetImage = async (uri: string) => {
    try {
      // Redimensionar y comprimir la imagen
      const manipulatedImage = await manipulateAsync(
        uri,
        [{ resize: { width: TARGET_WIDTH } }],
        { 
          compress: 0.7,
          format: SaveFormat.JPEG,
          base64: false
        }
      );

      // Verificar tamaño de la imagen
      const fileInfo = await FileSystem.getInfoAsync(manipulatedImage.uri);
      let sizeMB = 0;
      if (fileInfo.exists && typeof fileInfo.size === 'number') {
        sizeMB = fileInfo.size / (1024 * 1024);
      }
      
      if (sizeMB > MAX_IMAGE_SIZE_MB) {
        Alert.alert('Advertencia', `La imagen es demasiado grande (${sizeMB.toFixed(2)} MB). Se recomienda usar una imagen más pequeña.`);
      }

      setImageUri(manipulatedImage.uri);
      setLabels([]);
    } catch (error) {
      console.error('Error al procesar imagen:', error);
      Alert.alert('Error', 'No se pudo procesar la imagen');
    }
  };

  const takePhoto = async () => {
    if (hasCameraPermission === false) {
      Alert.alert('Error', 'No tienes permisos para acceder a la cámara');
      return;
    }

    try {
      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 0.7, // Calidad reducida
        exif: false,
      });

      if (!result.canceled && result.assets[0].uri) {
        await processAndSetImage(result.assets[0].uri);
      }
    } catch (error) {
      console.error('Error al tomar foto:', error);
      Alert.alert('Error', 'No se pudo capturar la imagen');
    }
  };

  const pickImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 0.7, // Calidad reducida
      });

      if (!result.canceled && result.assets[0].uri) {
        await processAndSetImage(result.assets[0].uri);
      }
    } catch (error) {
      console.error('Error al seleccionar imagen:', error);
      Alert.alert('Error', 'No se pudo seleccionar la imagen');
    }
  };

  const analyzeImage = async () => {
    if (!imageUri) {
      Alert.alert('Error', 'Por favor selecciona o toma una imagen primero.');
      return;
    }

    try {
      setLoading(true);
      
      // Leer la imagen como base64
      const base64Image = await FileSystem.readAsStringAsync(imageUri, {
        encoding: FileSystem.EncodingType.Base64,
      });

      if (!base64Image) {
        throw new Error('No se pudo convertir la imagen a base64');
      }

      // Verificar tamaño de la imagen en base64
      const sizeMB = (base64Image.length * 3/4) / (1024 * 1024);
      if (sizeMB > MAX_IMAGE_SIZE_MB) {
        throw new Error(`La imagen es demasiado grande (${sizeMB.toFixed(2)} MB). El límite es ${MAX_IMAGE_SIZE_MB} MB.`);
      }

      const requestData = {
        instances: [
          {
            content: base64Image,
          },
        ],
      };

      const url = `https://${location}-aiplatform.googleapis.com/v1/projects/${project}/locations/${location}/endpoints/${endpointId}:predict`;

      interface VertexAIResponse {
        predictions?: Array<any>;
        [key: string]: any;
      }

      const response = await axios.post<VertexAIResponse>(url, requestData, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      });

      const predictions = response.data?.predictions || [];

      if (predictions.length === 0) {
        setLabels([{ name: 'Sin predicciones', confidence: '0%', score: '0' }]);
        return;
      }

      const result = predictions[0];
      const { displayNames, confidences } = result;

      const maxIndex = confidences.indexOf(Math.max(...confidences));
      const topPrediction = {
        name: displayNames[maxIndex],
        confidence: (confidences[maxIndex] * 100).toFixed(0) + '%',
        score: confidences[maxIndex].toFixed(3),
      };

      setLabels([topPrediction]);

    } catch (error) {
      const err: any = error;
      console.error('Error al analizar:', err.response?.data || err.message);
      Alert.alert(
        'Error', 
        err.response?.data?.error?.message || err.message || 'Error desconocido al analizar la imagen'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Clasificador de Plagas</Text>

      {imageUri ? (
        <Image source={{ uri: imageUri }} style={styles.image} />
      ) : (
        <Text style={styles.placeholder}>No se ha seleccionado ninguna imagen</Text>
      )}

      <View style={styles.buttonGroup}>
        <TouchableOpacity style={[styles.button, styles.cameraButton]} onPress={takePhoto}>
          <Text style={styles.buttonText}>📷 Cámara</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.galleryButton]} onPress={pickImage}>
          <Text style={styles.buttonText}>🖼 Galería</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity 
        style={[styles.button, styles.analyzeButton]} 
        onPress={analyzeImage}
        disabled={loading || !imageUri}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>🔍 Analizar</Text>
        )}
      </TouchableOpacity>

      {labels.length > 0 && (
  <View style={styles.labelsContainer}>
    <Text style={styles.labelsTitle}>Predicción más probable:</Text>
    {labels.map((label, index) => (
      <Text key={index} style={styles.label}>
        🐛 {label.name} - Confianza: {label.confidence} - Score: {label.score}
      </Text>
    ))}
    
    {/* Texto informativo añadido */}
    <Text style={styles.infoText}>
      Para más información sobre la plaga de tu parcela consulta nuestro apartado de Galería y/o Informes
    </Text>
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
    backgroundColor: '#F9F5EC',
  },
  title: {
    fontSize: 24,
    marginVertical: 10,
    fontWeight: 'bold',
    color: '#4E342E',
    textAlign: 'center',
  },
  placeholder: {
    fontStyle: 'italic',
    marginVertical: 10,
    color: '#888',
  },
  image: {
    width: 300,
    height: 300,
    borderRadius: 12,
    marginVertical: 10,
    resizeMode: 'cover',
    borderWidth: 2,
    borderColor: '#A1887F',
  },
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginVertical: 10,
  },
  button: {
    padding: 14,
    borderRadius: 12,
    alignItems: 'center',
    elevation: 3,
    marginHorizontal: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  cameraButton: {
    backgroundColor: '#689F38',
    flex: 1,
  },
  galleryButton: {
    backgroundColor: '#8D6E63',
    flex: 1,
  },
  analyzeButton: {
    backgroundColor: '#EF6C00',
    width: '100%',
    marginVertical: 12,
    padding: 14,
    borderRadius: 12,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  labelsContainer: {
    marginTop: 20,
    alignSelf: 'flex-start',
    width: '100%',
  },
  labelsTitle: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 8,
    color: '#4E342E',
  },
  label: {
    fontSize: 16,
    marginBottom: 6,
    color: '#33691E',
  },

  // Result card visual
  resultCard: {
    backgroundColor: '#FFFBE6',
    padding: 16,
    borderRadius: 12,
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    marginTop: 20,
  },
  resultTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4E342E',
    marginBottom: 8,
  },
  resultLabel: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#33691E',
    textAlign: 'center',
    marginBottom: 10,
  },
  confidenceBarContainer: {
    height: 14,
    width: '100%',
    backgroundColor: '#ddd',
    borderRadius: 7,
    overflow: 'hidden',
    marginBottom: 6,
  },
  confidenceBar: {
    height: '100%',
    backgroundColor: '#81C784',
  },
  confidenceText: {
    fontSize: 14,
    color: '#444',
    textAlign: 'right',
  },

  
  infoText: {
    marginTop: 15,
    fontStyle: 'italic',
    color: '#666',
    textAlign: 'center',
    fontSize: 14,
    lineHeight: 20,
  },
});


export default CamaraScreen;
