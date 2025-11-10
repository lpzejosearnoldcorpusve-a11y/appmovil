import { ChevronLeft, Train } from "lucide-react-native";
import React from 'react';
import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from "react-native";

interface Line {
  id: string;
  number: number;
  name: string;
  color: string;
  operator?: string;
  stations: string[];
}

interface LineDetailsProps {
  line: Line;
  onBack: () => void;
}

export function LineDetails({ line, onBack }: LineDetailsProps) {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <ChevronLeft size={24} color="#0369A1" />
          <Text style={styles.backText}>Volver</Text>
        </TouchableOpacity>

        <View style={styles.header}>
          <View
            style={[
              styles.lineNumberCircle,
              { backgroundColor: line.color }
            ]}
          >
            <Text style={styles.lineNumber}>{line.number}</Text>
          </View>
          <View style={styles.headerText}>
            <Text style={styles.lineName}>{line.name}</Text>
            {line.operator && (
              <Text style={styles.operator}>{line.operator}</Text>
            )}
          </View>
        </View>

        <View style={styles.stationsInfo}>
          <View style={styles.stationsHeader}>
            <Train size={20} color={line.color} />
            <Text style={styles.stationsTitle}>Estaciones</Text>
          </View>
          <Text style={styles.stationsCount}>
            {line.stations.length} paradas disponibles
          </Text>
        </View>

        <View style={styles.routeSection}>
          <Text style={styles.routeTitle}>Recorrido</Text>
          {line.stations.map((station, index) => (
            <View key={index} style={styles.stationItem}>
              <View style={styles.stationMarkerContainer}>
                <View
                  style={[
                    styles.stationMarker,
                    { backgroundColor: line.color }
                  ]}
                >
                  <Text style={styles.stationNumber}>{index + 1}</Text>
                </View>
                {index < line.stations.length - 1 && (
                  <View style={styles.stationLine} />
                )}
              </View>
              <View style={styles.stationNameContainer}>
                <Text style={styles.stationName}>{station}</Text>
              </View>
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
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
    color: '#0369A1',
    marginLeft: 8,
    fontWeight: '600',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  lineNumberCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  lineNumber: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 24,
  },
  headerText: {
    flex: 1,
  },
  lineName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#0F172A',
  },
  operator: {
    color: '#475569',
    marginTop: 4,
  },
  stationsInfo: {
    backgroundColor: '#F1F5F9',
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
    color: '#0F172A',
    fontWeight: '600',
    marginLeft: 12,
  },
  stationsCount: {
    color: '#475569',
  },
  routeSection: {
    marginBottom: 24,
  },
  routeTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#0F172A',
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
    fontSize: 12,
    fontWeight: 'bold',
  },
  stationLine: {
    width: 1,
    backgroundColor: '#CBD5E1',
    marginVertical: 8,
    height: 40,
  },
  stationNameContainer: {
    flex: 1,
    paddingTop: 8,
  },
  stationName: {
    color: '#0F172A',
    fontWeight: '600',
  },
});