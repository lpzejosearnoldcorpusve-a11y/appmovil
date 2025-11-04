import * as Location from "expo-location"
import { useState } from "react"

// La interfaz (la precisión en Expo puede ser null)
export interface LocationCoords {
  latitude: number
  longitude: number
  accuracy?: number | null
}

export function useLocation() {
  const [location, setLocation] = useState<LocationCoords | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const getCurrentLocation = async () => {
    setLoading(true)
    setError(null)

    // 1. Solicitar permisos de localización
    let { status } = await Location.requestForegroundPermissionsAsync()
    
    if (status !== "granted") {
      setError("Permiso de localización denegado")
      setLoading(false)
      return
    }

    // 2. Obtener la ubicación
    try {
      // Usamos Accuracy.High para que coincida con tu 'enableHighAccuracy: true'
      const position = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
      })

      setLocation({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        accuracy: position.coords.accuracy,
      })
    } catch (err) {
      // Manejo de errores
      if (err instanceof Error) {
        setError(err.message)
      } else {
        setError("Un error desconocido ocurrió al obtener la ubicación")
      }
    } finally {
      setLoading(false)
    }
  }

  return {
    location,
    error,
    loading,
    getCurrentLocation, // Expones la función para llamarla manualmente
  }
}