import { Minus, Plus } from "lucide-react-native"
import React, { useState } from "react"
import { StyleSheet, TouchableOpacity, View } from "react-native"

interface ZoomControlsProps {
  onZoomIn: () => void
  onZoomOut: () => void
  style?: any
}

export function ZoomControls({ onZoomIn, onZoomOut, style }: ZoomControlsProps) {
  const [isZoomInPressed, setIsZoomInPressed] = useState(false)
  const [isZoomOutPressed, setIsZoomOutPressed] = useState(false)

  return (
    <View style={[styles.container, style]}>
      <TouchableOpacity
        onPress={onZoomIn}
        onPressIn={() => setIsZoomInPressed(true)}
        onPressOut={() => setIsZoomInPressed(false)}
        style={[
          styles.button,
          isZoomInPressed && styles.buttonPressed
        ]}
        accessibilityLabel="Acercar"
      >
        <Plus size={20} color="#1e293b" />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={onZoomOut}
        onPressIn={() => setIsZoomOutPressed(true)}
        onPressOut={() => setIsZoomOutPressed(false)}
        style={[
          styles.button,
          isZoomOutPressed && styles.buttonPressed
        ]}
        accessibilityLabel="Alejar"
      >
        <Minus size={20} color="#1e293b" />
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 16,
    right: 16,
    zIndex: 1000,
    flexDirection: "column",
    gap: 8,
  },
  button: {
    backgroundColor: "#ffffff",
    width: 40,
    height: 40,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonPressed: {
    backgroundColor: "#f1f5f9", // gray-100
  },
})