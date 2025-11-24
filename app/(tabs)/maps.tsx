import { MapContainer } from "@/components/map/MapContainer"
import { useGPSTracking } from "@/hooks/useGPSTracking"
import { useRoutes } from "@/hooks/useRoutes"
import AsyncStorage from '@react-native-async-storage/async-storage'
import React, { useEffect, useState } from "react"
import { Animated, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from "react-native"

type TransportType = "all" | "minibuses" | "telefericos"

export default function MapsScreen() {
  console.log("🗺️ MapsScreen rendering...")

  const { categories, loading, error } = useRoutes()
  console.log("📊 Routes data:", { categoriesCount: categories?.length, loading, error })

  // less friction: remove per-route selection, only select transport type
  const showRoutes = true
  const [transportType, setTransportType] = useState<TransportType>("all")
  const [isMapReady, setIsMapReady] = useState(false)
  const [showGPSVehicles, setShowGPSVehicles] = useState(false)

  // GPS Tracking
  const { vehicles: gpsVehicles, loading: gpsLoading, error: gpsError } = useGPSTracking()

  // Animations
  const fadeAnim = React.useRef(new Animated.Value(1)).current
  const slideAnim = React.useRef(new Animated.Value(0)).current
  const mapFadeAnim = React.useRef(new Animated.Value(0)).current
  const mapScaleAnim = React.useRef(new Animated.Value(0.8)).current
  const controlsFadeAnim = React.useRef(new Animated.Value(0)).current
  const controlsSlideAnim = React.useRef(new Animated.Value(50)).current

  // Entrance animations
  useEffect(() => {
    if (!loading && !error && categories.length > 0) {
      // Animate map entrance
      Animated.parallel([
        Animated.timing(mapFadeAnim, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.spring(mapScaleAnim, {
          toValue: 1,
          tension: 50,
          friction: 7,
          useNativeDriver: true,
        }),
      ]).start(() => {
        setIsMapReady(true)
        // Animate controls entrance after map is ready
        Animated.parallel([
          Animated.timing(controlsFadeAnim, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true,
          }),
          Animated.timing(controlsSlideAnim, {
            toValue: 0,
            duration: 500,
            useNativeDriver: true,
          }),
        ]).start()
      })
    }
  }, [loading, error, categories])

  // showRoutes controls whether the polylines are displayed at all (defaults to true)

  const changeTransportType = (type: TransportType) => {
    // Add haptic feedback animation
    Animated.sequence([
      Animated.timing(fadeAnim, {
        toValue: 0.8,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start()

    setTransportType(type)
    // persist selection for user convenience
    AsyncStorage.setItem('transportType', type)
  }

  // restore transport type on mount
  useEffect(() => {
    AsyncStorage.getItem('transportType').then(val => {
      if (val && (val === 'all' || val === 'minibuses' || val === 'telefericos')) {
        setTransportType(val as TransportType)
      }
    }).catch(() => {})
  }, [])

  const toggleGPSVehicles = () => {
    setShowGPSVehicles(!showGPSVehicles)
  }

  const getFilteredCategories = () => {
    if (transportType === "all") return categories
    return categories.filter(cat => cat.id === transportType)
  }

  const displayedRoutes = getFilteredCategories().flatMap(cat => cat.routes)

  // Loading spinner animation
  const spinValue = React.useRef(new Animated.Value(0)).current

  useEffect(() => {
    if (loading) {
      const spinAnimation = Animated.loop(
        Animated.timing(spinValue, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        })
      )
      spinAnimation.start()
      return () => spinAnimation.stop()
    }
  }, [loading])

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.center}>
          <Animated.View style={styles.loadingContainer}>
            <Animated.View
              style={[
                styles.loadingSpinner,
                {
                  transform: [{
                    rotate: spinValue.interpolate({
                      inputRange: [0, 1],
                      outputRange: ['0deg', '360deg'],
                    }),
                  }],
                },
              ]}
            />
            <Text style={styles.loadingText}>Cargando rutas...</Text>
          </Animated.View>
        </View>
      </SafeAreaView>
    )
  }

  if (error) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.center}>
          <Text style={styles.errorText}>Error: {error}</Text>
        </View>
      </SafeAreaView>
    )
  }

  try {
    return (
      <SafeAreaView style={styles.container}>
        <Animated.View
          style={[
            styles.mapContainer,
            {
              opacity: mapFadeAnim,
              transform: [
                { scale: mapScaleAnim },
                {
                  translateY: slideAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, -50],
                  }),
                },
              ],
            },
          ]}
        >
          <MapContainer 
          routes={displayedRoutes} 
          showRoutes={showRoutes}
          gpsVehicles={gpsVehicles}
          showGPSVehicles={showGPSVehicles}
        />
        </Animated.View>

        {/* Compact transport selector: small and near the location button */}
        <Animated.View
          style={[
            styles.transportSelectorSmall,
            {
              opacity: controlsFadeAnim,
              transform: [{ translateY: controlsSlideAnim }],
            },
          ]}
        >
          <Text style={styles.selectorLabel}>Tipo</Text>
          <TouchableOpacity
            style={[styles.smallTransportButton, transportType === "all" && styles.smallTransportButtonActive]}
            onPress={() => changeTransportType("all")}
            activeOpacity={0.8}
          >
            <Text style={[styles.smallTransportButtonText, transportType === "all" && styles.smallTransportButtonTextActive]}>Todos</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.smallTransportButton, transportType === "minibuses" && styles.smallTransportButtonActive]}
            onPress={() => changeTransportType("minibuses")}
            activeOpacity={0.8}
          >
            <Text style={[styles.smallTransportButtonText, transportType === "minibuses" && styles.smallTransportButtonTextActive]}>Minibuses</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.smallTransportButton, transportType === "telefericos" && styles.smallTransportButtonActive]}
            onPress={() => changeTransportType("telefericos")}
            activeOpacity={0.8}
          >
            <Text style={[styles.smallTransportButtonText, transportType === "telefericos" && styles.smallTransportButtonTextActive]}>Teleféricos</Text>
          </TouchableOpacity>
        </Animated.View>

      {/* Floating Controls */}
      <Animated.View
        style={[
          styles.floatingControls,
          {
            opacity: controlsFadeAnim,
            transform: [{ translateY: controlsSlideAnim }],
          },
        ]}
      >
        <TouchableOpacity
          style={[styles.controlButtonSmall, styles.secondaryButton]}
          onPress={toggleGPSVehicles}
          activeOpacity={0.8}
        >
          <Text style={styles.secondaryButtonText}>
            {showGPSVehicles ? "Ocultar GPS" : "Mostrar GPS"}
          </Text>
        </TouchableOpacity>
        
        {/* NOTE: the full routes panel was removed to keep the UI compact. */}
        
        {/* Full routes panel has been removed to keep UI minimal */}
        </Animated.View>
      </SafeAreaView>
    )
  } catch (error) {
    console.error("❌ Error en MapsScreen:", error)
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.center}>
          <Text style={styles.errorText}>Error al cargar el mapa: {error instanceof Error ? error.message : 'Error desconocido'}</Text>
        </View>
      </SafeAreaView>
    )
  }
}const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0f172a",
  },
  mapContainer: {
    flex: 1,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    color: "#ffffff",
    fontSize: 16,
  },
  errorText: {
    color: "#ef4444",
    fontSize: 16,
  },
  floatingControls: {
    position: "absolute",
    top: 16,
    right: 16,
    zIndex: 1000,
    flexDirection: "row",
    gap: 8,
  },
  controlButton: {
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  primaryButton: {
    backgroundColor: "#06b6d4",
  },
  primaryButtonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "600",
  },
  leftButton: {
    alignSelf: "flex-start",
  },
  secondaryButton: {
    backgroundColor: "#059669",
  },
  secondaryButtonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "600",
  },
  rightButton: {
    alignSelf: "flex-end",
  },
  routesPanel: {
    marginTop: 12,
    backgroundColor: "rgba(15, 23, 42, 0.95)",
    borderRadius: 16,
    padding: 16,
    maxHeight: 300,
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
  categorySection: {
    marginBottom: 16,
  },
  categoryTitle: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 8,
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
  transportSelector: {
    position: "absolute",
    bottom: 100,
    left: 16,
    right: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    zIndex: 1000,
  },
  // compact transport selector located near 'obtener ubicación'
  transportSelectorSmall: {
    position: "absolute",
    top: 80,
    left: 16,
    flexDirection: "row",
    gap: 8,
    zIndex: 1000,
  },
  smallTransportButton: {
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 12,
    backgroundColor: "rgba(51, 65, 85, 0.95)",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 4,
  },
  smallTransportButtonActive: {
    backgroundColor: "#06b6d4",
  },
  smallTransportButtonText: {
    color: "#94a3b8",
    fontSize: 12,
    fontWeight: "600",
  },
  smallTransportButtonTextActive: {
    color: "#ffffff",
  },
  controlButtonSmall: {
    borderRadius: 10,
    paddingVertical: 8,
    paddingHorizontal: 10,
    alignItems: "center",
  },
  selectorLabel: {
    color: "#94a3b8",
    fontSize: 12,
    fontWeight: "600",
    marginRight: 8,
    alignSelf: "center",
  },
  transportButton: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 12,
    alignItems: "center",
    marginHorizontal: 4,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    backgroundColor: "#334155",
  },
  transportButtonActive: {
    backgroundColor: "#06b6d4",
  },
  transportButtonText: {
    color: "#94a3b8",
    fontSize: 16,
    fontWeight: "600",
  },
  transportButtonTextActive: {
    color: "#ffffff",
  },
  loadingContainer: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(15, 23, 42, 0.9)",
    borderRadius: 20,
    padding: 30,
    borderWidth: 1,
    borderColor: "#1e293b",
  },
  loadingSpinner: {
    width: 50,
    height: 50,
    borderWidth: 4,
    borderColor: "#06b6d4",
    borderTopColor: "transparent",
    borderRadius: 25,
    marginBottom: 20,
  },
})