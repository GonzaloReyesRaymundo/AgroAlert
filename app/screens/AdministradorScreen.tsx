import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Alert,
  Image,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Picker } from '@react-native-picker/picker';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CommonActions } from '@react-navigation/native';

import type { StackNavigationProp } from '@react-navigation/stack';

type RootStackParamList = {
  Login: undefined;
  // Agrega aquí otras pantallas si las tienes
};

type AdministradorScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Login'>;

interface AdministradorScreenProps {
  navigation: AdministradorScreenNavigationProp;
}

const AdministradorScreen = ({ navigation }: AdministradorScreenProps) => {
  const [nombrePlaga, setnombrePlaga] = useState('');
  const [categoria, setcategoria] = useState('');
  const [descripcion, setdescripcion] = useState('');
  const [medidasPreventivas, setmedidasPreventivas] = useState('');
  const [Cura, setCura] = useState('');
  const [tipoPlanta, settipoPlanta] = useState('');
  const [urlImagen, seturlImagen] = useState('');

  const handleLogout = async () => {
    Alert.alert(
      'Cerrar sesión',
      '¿Estás seguro que deseas salir de la sesión?',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Salir',
          onPress: async () => {
            await AsyncStorage.removeItem('usuario');
            navigation.dispatch(
              CommonActions.reset({
                index: 0,
                routes: [{ name: 'LoginScreen' }],
              })
            );
          },
        },
      ]
    );
  };

  const guardarPlaga = async () => {
    if (!nombrePlaga || !categoria || !descripcion || !medidasPreventivas || !Cura || !tipoPlanta || !urlImagen) {
      Alert.alert('Error', 'Todos los campos son obligatorios');
      return;
    }

    Alert.alert(
      'Confirmación',
      '¿Seguro que quieres guardar esta plaga?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Guardar',
          onPress: async () => {
            try {
              const response = await fetch('http://192.168.1.17/wsA/ApiU.php?api=guardarPlaga', {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: new URLSearchParams({
                  nombrePlaga,
                  categoria,
                  descripcion,
                  medidasPreventivas,
                  Cura,
                  tipoPlanta,
                  urlImagen,
                }).toString(),
              });

              const data = await response.json();

              if (data.error === false) {
                Alert.alert('¡Éxito!', data.aviso);
                // Limpiar formulario
                setnombrePlaga('');
                setcategoria('');
                setdescripcion('');
                setmedidasPreventivas('');
                setCura('');
                settipoPlanta('');
                seturlImagen('');
              } else {
                Alert.alert('Error', data.aviso || 'No se pudo guardar la plaga.');
              }
            } catch (error) {
              Alert.alert('Error', 'Hubo un problema al conectar con el servidor.');
              console.error('Error al guardar la plaga:', error);
            }
          },
        },
      ],
      { cancelable: false }
    );
  };

  return (
    <LinearGradient colors={['#2E7D32', '#81C784']} style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Registro de Plagas</Text>
        <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
          <Icon name="logout" size={24} color="#FFF" />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Formulario */}
        <View style={styles.formContainer}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Nombre de la plaga*</Text>
            <TextInput
              style={styles.input}
              placeholder="Ej. Gusano cogollero"
              placeholderTextColor="#999"
              value={nombrePlaga}
              onChangeText={setnombrePlaga}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Categoría*</Text>
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={categoria}
                onValueChange={(itemValue) => setcategoria(itemValue)}
                style={styles.picker}
                dropdownIconColor="#2E7D32"
              >
                <Picker.Item label="Selecciona una categoría" value="" />
                <Picker.Item label="Insectos" value="insectos" />
                <Picker.Item label="Malezas" value="malezas" />
                <Picker.Item label="Patógenos" value="patogenos" />
                <Picker.Item label="Vertebrados" value="vertebrados" />
                <Picker.Item label="Enfermedades" value="enfermedades" />
              </Picker>
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Descripción*</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Describe características de la plaga"
              placeholderTextColor="#999"
              value={descripcion}
              onChangeText={setdescripcion}
              multiline
              numberOfLines={4}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Medidas preventivas*</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Ej. Rotación de cultivos, control biológico..."
              placeholderTextColor="#999"
              value={medidasPreventivas}
              onChangeText={setmedidasPreventivas}
              multiline
              numberOfLines={3}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Métodos de control*</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Ej. Aplicación de pesticida biológico"
              placeholderTextColor="#999"
              value={Cura}
              onChangeText={setCura}
              multiline
              numberOfLines={3}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Plantas afectadas*</Text>
            <TextInput
              style={styles.input}
              placeholder="Ej. Maíz, Trigo, Sorgo"
              placeholderTextColor="#999"
              value={tipoPlanta}
              onChangeText={settipoPlanta}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>URL de imagen*</Text>
            <TextInput
              style={styles.input}
              placeholder="https://ejemplo.com/imagen-plaga.jpg"
              placeholderTextColor="#999"
              value={urlImagen}
              onChangeText={seturlImagen}
            />
          </View>

          {urlImagen ? (
            <View style={styles.imagePreviewContainer}>
              <Image 
                source={{ uri: urlImagen }} 
                style={styles.imagePreview} 
                resizeMode="contain"
              />
            </View>
          ) : null}

          <TouchableOpacity 
            style={styles.submitButton} 
            onPress={guardarPlaga}
          >
            <Text style={styles.submitButtonText}>Guardar Plaga</Text>
            <Icon name="save" size={20} color="#FFF" />
          </TouchableOpacity>
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    paddingTop: 50,
    backgroundColor: '#2E7D32',
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FFF',
  },
  logoutButton: {
    padding: 5,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },
  formContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 15,
    padding: 20,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  inputGroup: {
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    color: '#2E7D32',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: '#333',
  },
  textArea: {
    minHeight: 100,
    textAlignVertical: 'top',
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 8,
    overflow: 'hidden',
  },
  picker: {
    height: 50,
    backgroundColor: '#FFF',
  },
  imagePreviewContainer: {
    marginTop: 10,
    alignItems: 'center',
  },
  imagePreview: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#DDD',
  },
  submitButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2E7D32',
    padding: 15,
    borderRadius: 8,
    marginTop: 20,
    elevation: 3,
  },
  submitButtonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
    marginRight: 10,
  },
});

export default AdministradorScreen;