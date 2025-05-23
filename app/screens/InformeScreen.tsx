import React, { useEffect, useState } from "react";
import { View, Text, Image, ScrollView, StyleSheet, TouchableOpacity, ActivityIndicator, Alert, Linking } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialIcons';

const InformeScreen = () => {
  interface Plaga {
    urlImagen: string;
    nombrePlaga: string;
    descripcion: string;
    categoria: string;
    tipoPlanta: string;
    medidasPreventivas: string;
    Cura: string;
  }

  const [plagas, setPlagas] = useState<Plaga[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://192.168.1.17/wsA/ApiU.php?api=buscarPlaga")
      .then((response) => response.json())
      .then((data) => {
        if (!data.error) {
          setPlagas(data.contenido);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error al obtener datos:", error);
        setLoading(false);
      });
  }, []);

  const handleReportAction = (plaga: Plaga) => {
    Alert.alert(
      `Reportar: ${plaga.nombrePlaga}`,
      'Seleccione el método de reporte:',
      [
        {
          text: 'Llamar a técnico',
          onPress: () => Linking.openURL('tel:+521234567890')
        },
        {
          text: 'Enviar por WhatsApp',
          onPress: () => {
            const mensaje = `*Reporte de plaga*:\n\n` +
              `• Nombre: ${plaga.nombrePlaga}\n` +
              `• Categoría: ${plaga.categoria}\n` +
              `• Planta afectada: ${plaga.tipoPlanta}\n` +
              `• Descripción: [Describa el problema]`;
            Linking.openURL(`https://wa.me/521234567890?text=${encodeURIComponent(mensaje)}`);
          }
        },
        {
          text: 'Registrar en bitácora',
          onPress: () => console.log('Registrar en bitácora')
        },
        {
          text: 'Cancelar',
          style: 'cancel'
        }
      ]
    );
  };

  return (
    <LinearGradient colors={['#2E7D32', '#81C784']} style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.title}>Informe de Plagas Agrícolas</Text>
        <Text style={styles.subtitle}>Identificación y Manejo Integrado</Text>

        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#FFFFFF" />
            <Text style={styles.loadingText}>Cargando información...</Text>
          </View>
        ) : plagas.length > 0 ? (
          plagas.map((plaga, index) => (
            <View key={index} style={styles.card}>
              <Image
                source={{ uri: plaga.urlImagen }}
                style={styles.image}
                onError={() => console.error("Error loading image:", plaga.urlImagen)}
              />

              <View style={styles.cardHeader}>
                <Icon name="bug-report" size={24} color="#C62828" />
                <Text style={styles.plagaTitle}>{plaga.nombrePlaga}</Text>
              </View>

              <View style={styles.infoSection}>
                <Text style={styles.sectionTitle}>Descripción</Text>
                <Text style={[styles.textContent, styles.justifiedText]}>{plaga.descripcion}</Text>
              </View>

              <View style={styles.detailsContainer}>
                <View style={styles.detailItem}>
                  <Icon name="category" size={18} color="#2E7D32" />
                  <Text style={styles.detailText}>{plaga.categoria}</Text>
                </View>

                <View style={styles.detailItem}>
                  <Icon name="grass" size={18} color="#2E7D32" />
                  <Text style={styles.detailText}>{plaga.tipoPlanta}</Text>
                </View>
              </View>

              <View style={styles.infoSection}>
                <Text style={styles.sectionTitle}>Medidas Preventivas</Text>
                <Text style={[styles.textContent, styles.justifiedText]}>{plaga.medidasPreventivas}</Text>
              </View>

              <View style={styles.infoSection}>
                <Text style={styles.sectionTitle}>Métodos de Control</Text>
                <Text style={[styles.textContent, styles.justifiedText]}>{plaga.Cura}</Text>
              </View>

              <TouchableOpacity
                style={styles.actionButton}
                onPress={() => handleReportAction(plaga)}
              >
                <View style={styles.buttonContent}>
                  <Icon name="report" size={18} color="#FFF" />
                  <Text style={styles.actionButtonText}>Opciones de reporte</Text>
                </View>
                <Icon name="arrow-drop-down" size={20} color="#FFF" />
              </TouchableOpacity>
            </View>
          ))
        ) : (
          <View style={styles.emptyContainer}>
            <Icon name="search-off" size={50} color="#FFF" />
            <Text style={styles.emptyText}>No se encontraron plagas registradas</Text>
          </View>
        )}
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
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#FFF',
    marginTop: 20,
    textShadowColor: 'rgba(0,0,0,0.2)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    color: '#E8F5E9',
    marginBottom: 25,
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
  },
  card: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 15,
    padding: 20,
    marginBottom: 25,
    marginHorizontal: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 8,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
    paddingBottom: 10,
  },
  plagaTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2E7D32',
    marginLeft: 10,
  },
  image: {
    width: '100%',
    height: 180,
    borderRadius: 10,
    marginBottom: 15,
    resizeMode: 'cover',
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  infoSection: {
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1B5E20',
    marginBottom: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#2E7D32',
    paddingLeft: 10,
  },
  textContent: {
    fontSize: 15,
    color: '#424242',
    lineHeight: 22,
  },
  justifiedText: {
    textAlign: 'justify',
  },
  detailsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
    flexWrap: 'wrap',
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E8F5E9',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
    marginBottom: 10,
  },
  detailText: {
    fontSize: 14,
    color: '#2E7D32',
    marginLeft: 8,
    fontWeight: '500',
  },
  actionButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#E74C3C',
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderRadius: 30,
    marginTop: 10,
    elevation: 3,
  },
  actionButtonText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 16,
    marginRight: 8,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  emptyText: {
    color: '#FFF',
    fontSize: 18,
    textAlign: 'center',
    marginTop: 20,
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});


export default InformeScreen;