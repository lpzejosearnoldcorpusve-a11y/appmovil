import React from "react"
import { StyleSheet, Text, View } from "react-native"
import { Marker } from "react-native-maps"

interface RouteMarkerProps {
  coordinate: {
    latitude: number
    longitude: number
  }
  title: string
  description?: string
  color: string
  type: "station" | "stop"
}

export function RouteMarker({ coordinate, title, description, color, type }: RouteMarkerProps) {
  return (
    <Marker
      coordinate={coordinate}
      title={title}
      description={description}
    >
      <View style={[styles.marker, { backgroundColor: color }]}>
        <Text style={styles.markerText}>
          {type === "station" ? "●" : "■"}
        </Text>
      </View>
    </Marker>
  )
}

const styles = StyleSheet.create({
  marker: {
    width: 20,
    height: 20,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#ffffff",
  },
  markerText: {
    color: "#ffffff",
    fontSize: 12,
    fontWeight: "bold",
  },
})