import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Platform,
  ActivityIndicator,
} from "react-native";
import * as Location from "expo-location";

// Para web
import { WebView } from "react-native-webview";

// Para móvil
import MapView, { Marker } from "react-native-maps";

const MapaAgro = () => {
  const [location, setLocation] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Obtener ubicación actual
  const getLocation = async () => {
    if (Platform.OS === "web") {
      setLoading(false);
      return;
    }

    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setError("Permiso para acceder a la ubicación denegado.");
        setLoading(false);
        return;
      }

      let locationData = await Location.getCurrentPositionAsync({});
      setLocation(locationData.coords);
    } catch (error) {
      console.log("Error al obtener ubicación: ", error);
      setError("Error al obtener la ubicación");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getLocation();
  }, []);

  // Si es web, mostrar Google Maps en iframe
  if (Platform.OS === "web") {
    const googleMapsUrl = `https://www.google.com/maps/embed/v1/place?key=AIzaSyCqhA_9G_sq62W6SojvanwNrVe1Gj43o2U&q=agroinsumos+cerca+de+mi`;

    return (
      <View style={styles.container}>
        <Text style={styles.title}>Mapa de Agroinsumos</Text>
        <WebView
          src={googleMapsUrl}
          style={styles.iframe}
          javaScriptEnabled={true}
          domStorageEnabled={true}
        />
      </View>
    );
  }

  // Si aún está cargando
  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#1E88E5" />
        <Text>Cargando ubicación...</Text>
      </View>
    );
  }

  // Si hay error
  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  // Si es Android/iOS, mostrar react-native-maps
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mapa de Agroinsumos</Text>
      {location ? (
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: location.latitude,
            longitude: location.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          showsUserLocation={true}
        >
          <Marker
            coordinate={{
              latitude: location.latitude,
              longitude: location.longitude,
            }}
            title="Tu ubicación"
          />
        </MapView>
      ) : (
        <Text style={styles.errorText}>No se pudo obtener la ubicación.</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5FCFF",
    paddingTop: Platform.OS === "web" ? 20 : 0,
  },
  map: {
    width: "100%",
    height: "100%",
  },
  iframe: {
    width: "100%",
    height: "100%",
    flex: 1,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
    color: "#1E88E5",
  },
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    fontSize: 18,
    color: "red",
    textAlign: "center",
    marginTop: 20,
  },
});

export default MapaAgro;