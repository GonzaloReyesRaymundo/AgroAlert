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

const AdministradorScreen = () => {
  const [nombrePlaga, setnombrePlaga] = useState('');
  const [categoria, setcategoria] = useState('');
  const [descripcion, setdescripcion] = useState('');
  const [medidasPreventivas, setmedidasPreventivas] = useState('');
  const [Cura, setCura] = useState('');
  const [tipoPlanta, settipoPlanta] = useState('');
  const [urlImagen, seturlImagen] = useState('');

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
              const response = await fetch('http://178.6.7.246/wsA/ApiU.php?api=guardarPlaga', {
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
    <LinearGradient colors={['#a8e063', '#56ab2f']} style={styles.gradient}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Registro de Plaga</Text>

        <Text style={styles.label}>Nombre de la plaga</Text>
        <TextInput
          style={styles.input}
          placeholder="Ej. Gusano cogollero"
          value={nombrePlaga}
          onChangeText={setnombrePlaga}
        />

        <Text style={styles.label}>Categoría</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={categoria}
            onValueChange={(itemValue) => setcategoria(itemValue)}
            style={styles.picker}
          >
            <Picker.Item label="Selecciona una categoría" value="" />
            <Picker.Item label="Insectos" value="insectos" />
            <Picker.Item label="Malezas" value="malezas" />
            <Picker.Item label="Patógenos" value="patogenos" />
            <Picker.Item label="Vertebrados" value="vertebrados" />
            <Picker.Item label="Enfermedades" value="enfermedades" />
          </Picker>
        </View>

        <Text style={styles.label}>Descripción</Text>
        <TextInput
          style={[styles.input, styles.multiline]}
          placeholder="Describe la plaga"
          value={descripcion}
          onChangeText={setdescripcion}
          multiline
          numberOfLines={4}
        />

        <Text style={styles.label}>Medida preventiva</Text>
        <TextInput
          style={[styles.input, styles.multiline]}
          placeholder="Ej. Rotación de cultivos"
          value={medidasPreventivas}
          onChangeText={setmedidasPreventivas}
          multiline
          numberOfLines={3}
        />

        <Text style={styles.label}>Cura</Text>
        <TextInput
          style={[styles.input, styles.multiline]}
          placeholder="Ej. Aplicación de pesticida biológico"
          value={Cura}
          onChangeText={setCura}
          multiline
          numberOfLines={3}
        />

        <Text style={styles.label}>Tipo de planta</Text>
        <TextInput
          style={styles.input}
          placeholder="Ej. Maíz, Trigo"
          value={tipoPlanta}
          onChangeText={settipoPlanta}
        />

        <Text style={styles.label}>URL de Imagen</Text>
        <TextInput
          style={styles.input}
          placeholder="https://ejemplo.com/imagen.jpg"
          value={urlImagen}
          onChangeText={seturlImagen}
        />

        {urlImagen ? (
          <Image source={{ uri: urlImagen }} style={styles.imagePreview} />
        ) : null}

        <TouchableOpacity style={styles.button} onPress={guardarPlaga}>
          <Text style={styles.buttonText}>Guardar Plaga</Text>
        </TouchableOpacity>
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  container: {
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
    textAlign: 'center',
  },
  label: {
    fontSize: 16,
    color: '#fff',
    marginBottom: 5,
    marginTop: 10,
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
    marginBottom: 10,
  },
  multiline: {
    textAlignVertical: 'top',
  },
  pickerContainer: {
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 10,
  },
  picker: {
    height: 50,
    width: '100%',
  },
  button: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  imagePreview: {
    width: '100%',
    height: 200,
    marginTop: 10,
    borderRadius: 10,
  },
});

export default AdministradorScreen;
