import { useLocation } from "@/hooks/useLocation"
import React, { useRef, useState } from "react"
import { StyleSheet, View } from "react-native"
import type { Region } from "react-native-maps"
import { Alert } from "../ui/Alert"
import { LocationButton } from "./LocationButton"
import { MapMarker } from "./MapMarker"
import { MapView } from "./MapView"
import { ZoomControls } from "./ZoomControls"

// La Paz, Bolivia coordinates
const LA_PAZ_CENTER = {
  latitude: -16.5,
  longitude: -68.15,
  latitudeDelta: 0.0922,
  longitudeDelta: 0.0421,
}

export function MapContainer() {
  const mapRef = useRef<any>(null)
  const [region, setRegion] = useState<Region>(LA_PAZ_CENTER)
  const { location, error, loading, getCurrentLocation } = useLocation()

  React.useEffect(() => {
    if (location) {
      const newRegion = {
        latitude: location.latitude,
        longitude: location.longitude,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
      }
      setRegion(newRegion)
      
      if (mapRef.current) {
        mapRef.current.animateToRegion(newRegion, 1000)
      }
    }
  }, [location])

  const handleZoomIn = () => {
    if (mapRef.current) {
      const newRegion = {
        ...region,
        latitudeDelta: Math.max(region.latitudeDelta / 2, 0.001),
        longitudeDelta: Math.max(region.longitudeDelta / 2, 0.001),
      }
      setRegion(newRegion)
      mapRef.current.animateToRegion(newRegion, 300)
    }
  }

  const handleZoomOut = () => {
    if (mapRef.current) {
      const newRegion = {
        ...region,
        latitudeDelta: Math.min(region.latitudeDelta * 2, 180),
        longitudeDelta: Math.min(region.longitudeDelta * 2, 360),
      }
      setRegion(newRegion)
      mapRef.current.animateToRegion(newRegion, 300)
    }
  }

  const handleRegionChange = (newRegion: Region) => {
    setRegion(newRegion)
  }

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        region={region}
        onRegionChangeComplete={handleRegionChange}
        style={styles.map}
      >
        {/* Los marcadores deben estar DENTRO del MapView */}
        {location && (
          <MapMarker
            coordinate={{
              latitude: location.latitude,
              longitude: location.longitude,
            }}
            title="Tu ubicación"
            description="Estás aquí"
            color="blue"
          />
        )}
      </MapView>

      <ZoomControls 
        onZoomIn={handleZoomIn} 
        onZoomOut={handleZoomOut} 
        style={styles.zoomControls}
      />

      <LocationButton 
        onPress={getCurrentLocation} 
        loading={loading} 
        disabled={loading}
        style={styles.locationButton}
      />

      {error && (
        <View style={styles.alertContainer}>
          <Alert type="error" message={error} />
        </View>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
  },
  map: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 8,
  },
  zoomControls: {
    position: "absolute",
    top: 16,
    right: 16,
  },
  locationButton: {
    position: "absolute",
    bottom: 24,
    right: 16,
  },
  alertContainer: {
    position: "absolute",
    top: 16,
    left: 16,
    right: 16,
    zIndex: 1000,
  },
})