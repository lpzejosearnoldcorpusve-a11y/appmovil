import React from "react"
import { Polyline } from "react-native-maps"

interface RoutePoint {
  lat: number
  lng: number
}

interface RoutePolylineProps {
  coordinates: RoutePoint[]
  strokeColor: string
  strokeWidth?: number
}

export function RoutePolyline({ coordinates, strokeColor, strokeWidth = 3 }: RoutePolylineProps) {
  const coords = coordinates.map(coord => ({
    latitude: coord.lat,
    longitude: coord.lng,
  }))

  return (
    <Polyline
      coordinates={coords}
      strokeColor={strokeColor}
      strokeWidth={strokeWidth}
      lineDashPattern={[1]}
    />
  )
}