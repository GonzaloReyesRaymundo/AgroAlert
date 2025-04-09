import React from 'react';
import { View, Text, FlatList, Image, StyleSheet, ScrollView } from 'react-native';
import { Card } from '@/components/ui/card';

type Plaga = {
  id: string;
  nombre: string;
  imagen: string;
  descripcion: string;
  danos: string;
  medidasPreventivas: string;
  plantasAfectadas: string;
};

const plagasData: Plaga[] = [
  {
    id: '1',
    nombre: 'Pulgón Verde',
    imagen: 'https://upload.wikimedia.org/wikipedia/commons/9/99/Green_peach_aphid.jpg',
    descripcion: 'Insecto pequeño que se alimenta de la savia de las plantas.',
    danos: 'Deformación de hojas, transmisión de virus, debilitamiento.',
    medidasPreventivas: 'Uso de trampas cromáticas, control biológico con mariquitas.',
    plantasAfectadas: 'Chiles, frijol, jitomate.',
  },
  {
    id: '2',
    nombre: 'Mosca Blanca',
    imagen: 'https://upload.wikimedia.org/wikipedia/commons/3/33/Bemisia_tabaci_adult.jpg',
    descripcion: 'Pequeña mosca que se posa en el envés de las hojas.',
    danos: 'Debilitamiento de la planta y transmisión de enfermedades.',
    medidasPreventivas: 'Control biológico, evitar exceso de fertilizantes nitrogenados.',
    plantasAfectadas: 'Calabaza, tomate, pepino.',
  },
  // Agrega más plagas según lo necesites
];

const GaleriaScreen: React.FC = () => {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.titulo}>Plagas en Cultivos - Hidalgo</Text>
      <FlatList
        data={plagasData}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Card className="bg-white rounded-2xl shadow-md mb-4 p-4 mx-2">
            <Image source={{ uri: item.imagen }} style={styles.imagen} />
            <Text style={styles.nombre}>{item.nombre}</Text>
            <Text style={styles.etiqueta}>Descripción:</Text>
            <Text style={styles.texto}>{item.descripcion}</Text>
            <Text style={styles.etiqueta}>Daños:</Text>
            <Text style={styles.texto}>{item.danos}</Text>
            <Text style={styles.etiqueta}>Medidas Preventivas:</Text>
            <Text style={styles.texto}>{item.medidasPreventivas}</Text>
            <Text style={styles.etiqueta}>Plantas Afectadas:</Text>
            <Text style={styles.texto}>{item.plantasAfectadas}</Text>
          </Card>
        )}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#E8F5E9',
    flex: 1,
    paddingTop: 20,
  },
  titulo: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#4CAF50',
    textAlign: 'center',
    marginBottom: 16,
  },
  imagen: {
    width: '100%',
    height: 180,
    borderRadius: 12,
    marginBottom: 8,
  },
  nombre: {
    fontSize: 20,
    fontWeight: '600',
    color: '#4CAF50',
    marginBottom: 6,
  },
  etiqueta: {
    fontWeight: 'bold',
    color: '#81C784',
    marginTop: 8,
  },
  texto: {
    color: '#333',
    marginBottom: 4,
  },
});

export default GaleriaScreen;
