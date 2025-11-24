import { useLocation } from "@/hooks/useLocation"
import React, { useRef, useState } from "react"
import { StyleSheet, Text, View } from "react-native"
import type { Region } from "react-native-maps"
import { Marker } from "react-native-maps"
import { Alert } from "../ui/Alert"
import { LocationButton } from "./LocationButton"
import { MapMarker } from "./MapMarker"
import { MapView } from "./MapView"
import { RouteMarker } from "./RouteMarker"
import { RoutePolyline } from "./RoutePolyline"
import { ZoomControls } from "./ZoomControls"

interface GPSData {
  imei: string
  latitud: number
  longitud: number
  altitud: number
  satelites: number
  velocidad: number
  direccion: number
}

interface GPSMarkerProps {
  coordinate: {
    latitude: number
    longitude: number
  }
  title: string
  imei: string
  velocidad: number
}

function GPSMarker({ coordinate, title, imei, velocidad }: GPSMarkerProps) {
  return (
    <Marker
      coordinate={coordinate}
      title={title}
      description={`IMEI: ${imei} | Velocidad: ${velocidad} km/h`}
    >
      <View style={styles.gpsMarker}>
        <Text style={styles.gpsMarkerText}>🚐</Text>
      </View>
    </Marker>
  )
}

// La Paz, Bolivia coordinates
const LA_PAZ_CENTER = {
  latitude: -16.5,
  longitude: -68.15,
  latitudeDelta: 0.0922,
  longitudeDelta: 0.0421,
}

interface Route {
  id: string
  type: "minibus" | "teleferico"
  name: string
  color?: string
  ruta?: { lat: number; lng: number }[]
  estaciones?: { id: string; nombre: string; lat: number; lng: number; orden: number }[]
}

interface MapContainerProps {
  routes?: Route[]
  showRoutes?: boolean
  gpsVehicles?: GPSData[]
  showGPSVehicles?: boolean
}

export function MapContainer({ routes = [], showRoutes = false, gpsVehicles = [], showGPSVehicles = false }: MapContainerProps) {
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
        {/* Render routes if enabled */}
        {showRoutes && routes.map(route => (
          <React.Fragment key={route.id}>
            {/* Render route polyline */}
            {route.ruta && (
              <RoutePolyline
                coordinates={route.ruta}
                strokeColor={route.color || "#6B7280"}
              />
            )}

            {/* Render stations/markers */}
            {route.estaciones && route.estaciones.map(station => (
              <RouteMarker
                key={station.id}
                coordinate={{
                  latitude: station.lat,
                  longitude: station.lng,
                }}
                title={station.nombre}
                description={`${route.name} - Estación ${station.orden}`}
                color={route.color || "#ff0000"}
                type="station"
              />
            ))}
          </React.Fragment>
        ))}

        {/* GPS Vehicles markers */}
        {showGPSVehicles && gpsVehicles.map(vehicle => (
          <GPSMarker
            key={vehicle.imei}
            coordinate={{
              latitude: vehicle.latitud,
              longitude: vehicle.longitud,
            }}
            title={`Vehículo GPS - ${vehicle.imei}`}
            imei={vehicle.imei}
            velocidad={vehicle.velocidad}
          />
        ))}

        {/* User location marker */}
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
  gpsMarker: {
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#10b981",
    borderWidth: 2,
    borderColor: "#ffffff",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  gpsMarkerText: {
    fontSize: 16,
  },
})