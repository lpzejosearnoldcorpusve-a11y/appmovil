import { MapContainer } from "@/components/map/MapContainer"
import { useRoutes } from "@/hooks/useRoutes"
import React, { useState } from "react"
import { Animated, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from "react-native"

export default function MinibusesScreen() {
  const { categories } = useRoutes()
  const [selectedRoutes, setSelectedRoutes] = useState<string[]>([])
  const [showRoutes, setShowRoutes] = useState(true)
  const fadeAnim = React.useRef(new Animated.Value(1)).current

  const minibusCategory = categories.find(cat => cat.id === "minibuses")
  const routes = minibusCategory?.routes || []

  const toggleRoute = (routeId: string) => {
    setSelectedRoutes(prev =>
      prev.includes(routeId)
        ? prev.filter(id => id !== routeId)
        : [...prev, routeId]
    )
  }

  const displayedRoutes = routes.filter(route =>
    selectedRoutes.includes(route.id)
  )

  return (
    <SafeAreaView style={styles.container}>
      <Animated.View style={[styles.mapContainer, { opacity: fadeAnim }]}>
        <MapContainer routes={displayedRoutes} showRoutes={showRoutes} />
      </Animated.View>

      {/* Floating Controls */}
      <View style={styles.floatingControls}>
        <View style={styles.routesPanel}>
          <View style={styles.panelHeader}>
            <Text style={styles.panelTitle}>Minibuses - La Paz</Text>
            <TouchableOpacity
              onPress={() => setSelectedRoutes([])}
              style={styles.clearButton}
            >
              <Text style={styles.clearButtonText}>Limpiar</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.routesGrid}>
            {routes.map(route => (
              <TouchableOpacity
                key={route.id}
                style={[
                  styles.routeChip,
                  selectedRoutes.includes(route.id) && styles.routeChipSelected,
                  { borderColor: route.color || "#6B7280" }
                ]}
                onPress={() => toggleRoute(route.id)}
                activeOpacity={0.7}
              >
                <View style={[styles.routeColorDot, { backgroundColor: route.color || "#6B7280" }]} />
                <Text style={[
                  styles.routeChipText,
                  selectedRoutes.includes(route.id) && styles.routeChipTextSelected
                ]}>
                  {route.name}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0f172a",
  },
  mapContainer: {
    flex: 1,
  },
  floatingControls: {
    position: "absolute",
    top: 50,
    left: 16,
    right: 16,
    zIndex: 1000,
  },
  routesPanel: {
    backgroundColor: "rgba(15, 23, 42, 0.95)",
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: "#1e293b",
  },
  panelHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  panelTitle: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "bold",
  },
  clearButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: "#334155",
    borderRadius: 8,
  },
  clearButtonText: {
    color: "#94a3b8",
    fontSize: 14,
  },
  routesGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  routeChip: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 2,
    backgroundColor: "rgba(30, 41, 59, 0.8)",
    gap: 6,
  },
  routeChipSelected: {
    backgroundColor: "rgba(6, 182, 212, 0.2)",
  },
  routeColorDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  routeChipText: {
    color: "#94a3b8",
    fontSize: 14,
    fontWeight: "500",
  },
  routeChipTextSelected: {
    color: "#06b6d4",
  },
})