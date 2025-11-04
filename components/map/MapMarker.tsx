import React from "react"
import { Marker } from "react-native-maps"

interface MapMarkerProps {
  coordinate: {
    latitude: number
    longitude: number
  }
  title?: string
  description?: string
  color?: "blue" | "red" | "green"
}

export function MapMarker({ coordinate, title, description, color = "blue" }: MapMarkerProps) {
  const getPinColor = () => {
    switch (color) {
      case "blue":
        return "#06b6d4" // cyan-500
      case "red":
        return "#ef4444" // red-500
      case "green":
        return "#10b981" // green-500
      default:
        return "#06b6d4"
    }
  }

  return (
    <Marker
      coordinate={coordinate}
      title={title}
      description={description}
      pinColor={getPinColor()}
      tracksViewChanges={false}
    />
  )
}