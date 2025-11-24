import { MapContainer } from "@/components/map/MapContainer"
import { useGPSTracking } from "@/hooks/useGPSTracking"
import { useRoutes } from "@/hooks/useRoutes"
import React, { useEffect, useState } from "react"
import { Animated, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from "react-native"

type TransportType = "all" | "minibuses" | "telefericos"

export default function MapsScreen() {
  console.log("🗺️ MapsScreen rendering...")

  const { categories, loading, error } = useRoutes()
  console.log("📊 Routes data:", { categoriesCount: categories?.length, loading, error })

  const [selectedRoutes, setSelectedRoutes] = useState<string[]>([])
  const [showRoutes, setShowRoutes] = useState(false)
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

  const toggleRoute = (routeId: string) => {
    setSelectedRoutes(prev =>
      prev.includes(routeId)
        ? prev.filter(id => id !== routeId)
        : [...prev, routeId]
    )
  }

  const toggleShowRoutes = () => {
    const newShowRoutes = !showRoutes
    setShowRoutes(newShowRoutes)

    // Animate the controls with improved timing
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: newShowRoutes ? 0.7 : 1,
        duration: 400,
        useNativeDriver: true,
      }),
      Animated.spring(slideAnim, {
        toValue: newShowRoutes ? 1 : 0,
        tension: 100,
        friction: 8,
        useNativeDriver: true,
      }),
    ]).start()
  }

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
    setSelectedRoutes([]) // Clear selection when changing type
  }

  const toggleGPSVehicles = () => {
    setShowGPSVehicles(!showGPSVehicles)
  }

  const getFilteredCategories = () => {
    if (transportType === "all") return categories
    return categories.filter(cat => cat.id === transportType)
  }

  const displayedRoutes = getFilteredCategories().flatMap(cat => cat.routes).filter(route =>
    selectedRoutes.includes(route.id)
  )

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

        {/* Transport Type Selector */}
        <Animated.View
          style={[
            styles.transportSelector,
            {
              opacity: controlsFadeAnim,
              transform: [{ translateY: controlsSlideAnim }],
            },
          ]}
        >
          <TouchableOpacity
            style={[styles.transportButton, transportType === "all" && styles.transportButtonActive]}
            onPress={() => changeTransportType("all")}
            activeOpacity={0.8}
          >
            <Text style={[styles.transportButtonText, transportType === "all" && styles.transportButtonTextActive]}>
              Todos
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.transportButton, transportType === "minibuses" && styles.transportButtonActive]}
            onPress={() => changeTransportType("minibuses")}
            activeOpacity={0.8}
          >
            <Text style={[styles.transportButtonText, transportType === "minibuses" && styles.transportButtonTextActive]}>
              Minibuses
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.transportButton, transportType === "telefericos" && styles.transportButtonActive]}
            onPress={() => changeTransportType("telefericos")}
            activeOpacity={0.8}
          >
            <Text style={[styles.transportButtonText, transportType === "telefericos" && styles.transportButtonTextActive]}>
              Teleféricos
            </Text>
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
          style={[styles.controlButton, styles.primaryButton, styles.leftButton]}
          onPress={toggleShowRoutes}
          activeOpacity={0.8}
        >
          <Text style={styles.primaryButtonText}>
            {showRoutes ? "Ocultar Rutas" : "Mostrar Rutas"}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.controlButton, styles.secondaryButton, styles.rightButton]}
          onPress={toggleGPSVehicles}
          activeOpacity={0.8}
        >
          <Text style={styles.secondaryButtonText}>
            {showGPSVehicles ? "Ocultar GPS" : "Mostrar GPS"}
          </Text>
        </TouchableOpacity>          {showRoutes && (
            <Animated.View
              style={[
                styles.routesPanel,
                {
                  opacity: slideAnim,
                  transform: [{
                    translateY: slideAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: [100, 0],
                    }),
                  }],
                },
              ]}
            >
              <View style={styles.panelHeader}>
                <Text style={styles.panelTitle}>
                  {transportType === "all" ? "Seleccionar Rutas" :
                   transportType === "minibuses" ? "Minibuses" : "Teleféricos"}
                </Text>
                <TouchableOpacity
                  onPress={() => setSelectedRoutes([])}
                  style={styles.clearButton}
                >
                  <Text style={styles.clearButtonText}>Limpiar</Text>
                </TouchableOpacity>
              </View>

              {getFilteredCategories().map(category => (
                <View key={category.id} style={styles.categorySection}>
                  <Text style={styles.categoryTitle}>{category.name}</Text>
                  <View style={styles.routesGrid}>
                    {category.routes.map(route => (
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
              ))}
            </Animated.View>
          )}
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
    top: 50,
    left: 16,
    right: 16,
    zIndex: 1000,
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