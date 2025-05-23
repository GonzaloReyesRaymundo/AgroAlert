// SettingsScreen.tsx modificado
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Switch,
  ScrollView,
  Linking,
  Alert,
  Modal,
  Pressable
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation, CommonActions } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SettingsScreen = () => {
  const [isNotificationsEnabled, setIsNotificationsEnabled] = useState(false);
  const [isWeatherAlertsEnabled, setIsWeatherAlertsEnabled] = useState(true);
  const [isCropTipsEnabled, setIsCropTipsEnabled] = useState(true);
  const [isDataSyncEnabled, setIsDataSyncEnabled] = useState(true);
  const [privacyModalVisible, setPrivacyModalVisible] = useState(false);
  const [language, setLanguage] = useState('es');
  const navigation = useNavigation();

  const handleLogout = () => {
    Alert.alert('Cerrar sesión', '¿Estás seguro que deseas salir?', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Salir',
        onPress: async () => {
          await AsyncStorage.removeItem('userToken');
          navigation.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [{ name: 'Login' }],
            })
          );
        },
      },
    ]);
  };

  const openSupportEmail = () => {
    Linking.openURL('mailto:soporte@agroalert.com?subject=Soporte%20AgroAlert');
  };

  const changeLanguage = () => {
    Alert.alert(
      'Idioma',
      'Selecciona tu idioma preferido',
      [
        { text: 'Español', onPress: () => setLanguage('es') },
        { text: 'English', onPress: () => setLanguage('en') },
        { text: 'Português', onPress: () => setLanguage('pt') },
        { text: 'Cancelar', style: 'cancel' },
      ]
    );
  };

  return (
    <ScrollView style={styles.container}>
      {/* Cabecera */}
      <LinearGradient 
        colors={['#81C784', '#4CAF50']}
        style={styles.header}
      >
        <Text style={[styles.title, { color: '#FFF' }]}>Configuración</Text>
      </LinearGradient>

      <View style={styles.content}>
        {/* Sección de notificaciones */}
        <Text style={styles.sectionTitle}>Notificaciones</Text>
        
        <View style={styles.card}>
          <View style={styles.settingRow}>
            <Icon name="bell-outline" size={24} color="#4CAF50" />
            <Text style={styles.settingText}>Notificaciones generales</Text>
            <Switch
              value={isNotificationsEnabled}
              onValueChange={setIsNotificationsEnabled}
              trackColor={{ false: '#767577', true: '#A5D6A7' }}
              thumbColor="#f4f3f4"
            />
          </View>

          <View style={styles.divider} />

          <View style={styles.settingRow}>
            <Icon name="weather-partly-cloudy" size={24} color="#4CAF50" />
            <Text style={styles.settingText}>Alertas meteorológicas</Text>
            <Switch
              value={isWeatherAlertsEnabled}
              onValueChange={setIsWeatherAlertsEnabled}
              trackColor={{ false: '#767577', true: '#A5D6A7' }}
              thumbColor="#f4f3f4"
            />
          </View>

          <View style={styles.divider} />

          <View style={styles.settingRow}>
            <Icon name="sprout-outline" size={24} color="#4CAF50" />
            <Text style={styles.settingText}>Consejos de cultivo</Text>
            <Switch
              value={isCropTipsEnabled}
              onValueChange={setIsCropTipsEnabled}
              trackColor={{ false: '#767577', true: '#A5D6A7' }}
              thumbColor="#f4f3f4"
            />
          </View>
        </View>

        {/* Sección de sincronización */}
        <Text style={styles.sectionTitle}>Sincronización</Text>
        
        <View style={styles.card}>
          <View style={styles.settingRow}>
            <Icon name="cloud-sync-outline" size={24} color="#4CAF50" />
            <Text style={styles.settingText}>Sincronización automática</Text>
            <Switch
              value={isDataSyncEnabled}
              onValueChange={setIsDataSyncEnabled}
              trackColor={{ false: '#767577', true: '#A5D6A7' }}
              thumbColor="#f4f3f4"
            />
          </View>
        </View>

        {/* Sección de preferencias */}
        <Text style={styles.sectionTitle}>Preferencias</Text>
        
        <View style={styles.card}>
          <Pressable style={styles.settingRow} onPress={changeLanguage}>
            <Icon name="translate" size={24} color="#4CAF50" />
            <Text style={styles.settingText}>Idioma</Text>
            <Text style={styles.languageText}>{language === 'es' ? 'Español' : language === 'en' ? 'English' : 'Português'}</Text>
          </Pressable>

          <View style={styles.divider} />

        </View>

        {/* Sección de información */}
        <Text style={styles.sectionTitle}>Información</Text>
        
        <View style={styles.card}>
          <View style={styles.infoRow}>
            <Icon name="information-outline" size={20} color="#4CAF50" />
            <Text style={styles.infoText}>Versión 1.0.0</Text>
          </View>
          
          <View style={styles.divider} />

          <Pressable style={styles.infoRow} onPress={openSupportEmail}>
            <Icon name="email-outline" size={20} color="#4CAF50" />
            <Text style={styles.linkText}>Contactar soporte</Text>
          </Pressable>

          <View style={styles.divider} />

          <Pressable 
            style={styles.infoRow}
            onPress={() => setPrivacyModalVisible(true)}
          >
            <Icon name="shield-lock-outline" size={20} color="#4CAF50" />
            <Text style={styles.linkText}>Política de privacidad</Text>
          </Pressable>
        </View>

      </View>

      {/* Modal de política de privacidad */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={privacyModalVisible}
        onRequestClose={() => setPrivacyModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={[styles.modalTitle, { color: '#2E7D32' }]}>
              Política de Privacidad
            </Text>
            
            <ScrollView style={styles.modalScroll}>
              <Text style={styles.modalText}>
                En AgroAlert, valoramos y respetamos tu privacidad. Esta política describe cómo recopilamos, usamos y protegemos tu información:
                {'\n\n'}1. Información recopilada: Recibimos datos cuando te registras, usas nuestra app o contactas al soporte.
                {'\n\n'}2. Uso de datos: Utilizamos tu información para proveer servicios, mejorar la app y comunicarnos contigo.
                {'\n\n'}3. Protección: Implementamos medidas de seguridad para proteger tus datos contra accesos no autorizados.
                {'\n\n'}4. Compartir datos: No vendemos ni compartimos tu información con terceros sin tu consentimiento.
                {'\n\n'}5. Tus derechos: Puedes acceder, corregir o solicitar la eliminación de tus datos personales.
                {'\n\n'}Para preguntas sobre esta política, contacta a nuestro equipo de soporte.
              </Text>
            </ScrollView>

            <Pressable
              style={styles.modalButton}
              onPress={() => setPrivacyModalVisible(false)}
            >
              <Text style={styles.modalButtonText}>Entendido</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8F5E9',
  },
  header: {
    padding: 25,
    paddingTop: 50,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  content: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 15,
    marginLeft: 5,
    color: '#333',
  },
  card: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 18,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  settingText: {
    flex: 1,
    fontSize: 16,
    marginLeft: 15,
    color: '#333',
  },
  languageText: {
    fontSize: 14,
    color: '#666',
    marginRight: 10,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
  },
  infoText: {
    fontSize: 15,
    marginLeft: 15,
    color: '#333',
  },
  linkText: {
    fontSize: 15,
    marginLeft: 15,
    color: '#4CAF50',
    textDecorationLine: 'underline',
  },
  divider: {
    height: 1,
    backgroundColor: 'rgba(0,0,0,0.1)',
    marginVertical: 5,
  },
  logoutButton: {
    flexDirection: 'row',
    backgroundColor: '#E53935',
    padding: 15,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  logoutText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    width: '90%',
    maxHeight: '80%',
    backgroundColor: '#FFF',
    borderRadius: 15,
    padding: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
  modalScroll: {
    maxHeight: '70%',
    marginBottom: 15,
  },
  modalText: {
    fontSize: 14,
    lineHeight: 22,
    color: '#333',
  },
  modalButton: {
    backgroundColor: '#4CAF50',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  modalButtonText: {
    color: '#FFF',
    fontWeight: 'bold',
  },
});

export default SettingsScreen;