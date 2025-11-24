import { Route } from "@/hooks/useRoutes";
import { ChevronLeft, Train } from "lucide-react-native";
import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";

interface LineDetailsProps {
  route: Route;
  onBack: () => void;
}

export function LineDetails({ route, onBack }: LineDetailsProps) {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <ChevronLeft size={24} color="#06b6d4" />
          <Text style={styles.backText}>Volver</Text>
        </TouchableOpacity>

        <View style={styles.header}>
          <View
            style={[
              styles.routeColorCircle,
              { backgroundColor: route.color || "#6B7280" }
            ]}
          >
            <Text style={styles.routeNumber}>
              {route.type === "minibus" ? (route.number || "?") : "T"}
            </Text>
          </View>
          <View style={styles.headerText}>
            <Text style={styles.routeName}>{route.name}</Text>
            <Text style={styles.routeType}>
              {route.type === "minibus" ? "Minibus" : "Teleférico"}
            </Text>
          </View>
        </View>

        <View style={styles.stationsInfo}>
          <View style={styles.stationsHeader}>
            <Train size={20} color={route.color || "#6B7280"} />
            <Text style={styles.stationsTitle}>
              {route.type === "teleferico" ? "Estaciones" : "Puntos de Ruta"}
            </Text>
          </View>
          <Text style={styles.stationsCount}>
            {route.type === "teleferico" && route.estaciones
              ? `${route.estaciones.length} estaciones disponibles`
              : route.type === "minibus" && route.ruta
              ? `${route.ruta.length} puntos de ruta`
              : "Información no disponible"
            }
          </Text>
        </View>

        <View style={styles.routeSection}>
          <Text style={styles.routeTitle}>Recorrido</Text>
          {route.type === "teleferico" && route.estaciones ? (
            route.estaciones
              .sort((a, b) => a.orden - b.orden)
              .map((station, index) => (
                <View key={station.id} style={styles.stationItem}>
                  <View style={styles.stationMarkerContainer}>
                    <View
                      style={[
                        styles.stationMarker,
                        { backgroundColor: route.color || "#6B7280" }
                      ]}
                    >
                      <Text style={styles.stationNumber}>{station.orden}</Text>
                    </View>
                    {index < route.estaciones!.length - 1 && (
                      <View style={styles.stationLine} />
                    )}
                  </View>
                  <View style={styles.stationNameContainer}>
                    <Text style={styles.stationName}>{station.nombre}</Text>
                  </View>
                </View>
              ))
          ) : route.type === "minibus" && route.ruta ? (
            route.ruta.map((point, index) => (
              <View key={index} style={styles.stationItem}>
                <View style={styles.stationMarkerContainer}>
                  <View
                    style={[
                      styles.stationMarker,
                      { backgroundColor: route.color || "#6B7280" }
                    ]}
                  >
                    <Text style={styles.stationNumber}>{index + 1}</Text>
                  </View>
                  {index < route.ruta!.length - 1 && (
                    <View style={styles.stationLine} />
                  )}
                </View>
                <View style={styles.stationNameContainer}>
                  <Text style={styles.stationName}>
                    Punto {index + 1} ({point.lat.toFixed(4)}, {point.lng.toFixed(4)})
                  </Text>
                </View>
              </View>
            ))
          ) : (
            <Text style={styles.noDataText}>No hay información de recorrido disponible</Text>
          )}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f172a',
  },
  content: {
    padding: 24,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  backText: {
    color: '#06b6d4',
    marginLeft: 8,
    fontWeight: '600',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  routeColorCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  routeNumber: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 24,
  },
  headerText: {
    flex: 1,
  },
  routeName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  routeType: {
    color: '#94a3b8',
    marginTop: 4,
  },
  stationsInfo: {
    backgroundColor: '#1e293b',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
  },
  stationsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  stationsTitle: {
    color: '#ffffff',
    fontWeight: '600',
    marginLeft: 12,
  },
  stationsCount: {
    color: '#94a3b8',
  },
  routeSection: {
    marginBottom: 24,
  },
  routeTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 16,
  },
  stationItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  stationMarkerContainer: {
    alignItems: 'center',
    marginRight: 16,
  },
  stationMarker: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stationNumber: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14,
  },
  stationLine: {
    width: 2,
    height: 40,
    backgroundColor: '#94a3b8',
    marginTop: 8,
  },
  stationNameContainer: {
    flex: 1,
    paddingTop: 6,
  },
  stationName: {
    color: '#ffffff',
    fontSize: 16,
  },
  noDataText: {
    color: '#94a3b8',
    fontSize: 16,
    textAlign: 'center',
    padding: 20,
  },
})