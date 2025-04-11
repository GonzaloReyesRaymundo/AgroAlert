import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Picker } from '@react-native-picker/picker';

const AdministradorScreen = () => {
  const [nombre, setNombre] = useState('');
  const [categoria, setCategoria] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [prevencion, setPrevencion] = useState('');
  const [cura, setCura] = useState('');
  const [planta, setPlanta] = useState('');

  return (
    <LinearGradient colors={['#a8e063', '#56ab2f']} style={styles.gradient}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Registro de Plaga</Text>

        <Text style={styles.label}>Nombre de la plaga</Text>
        <TextInput
          style={styles.input}
          placeholder="Ej. Gusano cogollero"
          value={nombre}
          onChangeText={setNombre}
        />

        <Text style={styles.label}>Categoría</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={categoria}
            onValueChange={(itemValue: string) => setCategoria(itemValue)}
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
          onChangeText={setDescripcion}
          multiline
          numberOfLines={4}
        />

        <Text style={styles.label}>Medida preventiva</Text>
        <TextInput
          style={[styles.input, styles.multiline]}
          placeholder="Ej. Rotación de cultivos"
          value={prevencion}
          onChangeText={setPrevencion}
          multiline
          numberOfLines={3}
        />

        <Text style={styles.label}>Cura</Text>
        <TextInput
          style={[styles.input, styles.multiline]}
          placeholder="Ej. Aplicación de pesticida biológico"
          value={cura}
          onChangeText={setCura}
          multiline
          numberOfLines={3}
        />

        <Text style={styles.label}>Tipo de planta</Text>
        <TextInput
          style={styles.input}
          placeholder="Ej. Maíz, Trigo"
          value={planta}
          onChangeText={setPlanta}
        />

        <TouchableOpacity style={styles.button}>
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
    textShadowColor: 'rgba(0,0,0,0.2)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
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
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default AdministradorScreen;
