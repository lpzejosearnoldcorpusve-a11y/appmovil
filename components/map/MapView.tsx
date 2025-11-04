import React, { forwardRef, useImperativeHandle } from "react"
import { StyleSheet } from "react-native"
import RNMapView, { MapViewProps, Region } from "react-native-maps"

const OSM_TILE_URL = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"

export interface MapViewHandle {
  animateToRegion: (region: Region, duration?: number) => void
  getCamera: () => Promise<any>
}

interface CustomMapViewProps extends MapViewProps {
  onMapReady?: () => void
  center?: [number, number]
  zoom?: number
}

export const MapView = forwardRef<MapViewHandle, CustomMapViewProps>(
  ({ center, zoom, onMapReady, ...props }, ref) => {
    const mapRef = React.useRef<RNMapView>(null)

    useImperativeHandle(ref, () => ({
      animateToRegion: (region: Region, duration = 1000) => {
        mapRef.current?.animateToRegion(region, duration)
      },
      getCamera: async () => {
        return await mapRef.current?.getCamera()
      },
    }))

    // Convertir center/zoom a region si se proporcionan
    const region = center ? {
      latitude: center[0],
      longitude: center[1],
      latitudeDelta: zoom ? 1 / Math.pow(2, zoom) : 0.0922,
      longitudeDelta: zoom ? 1 / Math.pow(2, zoom) : 0.0421,
    } : undefined

    return (
      <RNMapView
        ref={mapRef}
        style={styles.map}
        region={region}
        onMapReady={onMapReady}
        {...props}
      >
        {/* TileLayer para OpenStreetMap */}
        <UrlTile
          urlTemplate={OSM_TILE_URL}
          maximumZ={19}
          flipY={false}
        />
        {props.children}
      </RNMapView>
    )
  }
)

// Necesitarás importar UrlTile también
import { UrlTile } from "react-native-maps"

const styles = StyleSheet.create({
  map: {
    ...StyleSheet.absoluteFillObject,
  },
})