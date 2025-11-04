import { LinearGradient } from "expo-linear-gradient"
import { Navigation } from "lucide-react-native"
import React from "react"
import { ActivityIndicator, StyleSheet, TouchableOpacity, View } from "react-native"

interface LocationButtonProps {
  onPress: () => void
  loading?: boolean
  disabled?: boolean
  style?: any
}

export function LocationButton({ onPress, loading, disabled, style }: LocationButtonProps) {
  const ButtonContent = (
    <View style={styles.buttonContent}>
      {loading ? (
        <ActivityIndicator size="small" color="#ffffff" />
      ) : (
        <Navigation 
          size={24} 
          color="#ffffff" 
          fill={loading ? "#ffffff" : "none"} 
        />
      )}
    </View>
  )

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || loading}
      style={[styles.container, style]}
      accessibilityLabel="Obtener mi ubicación"
    >
      <LinearGradient
        colors={loading ? ["#0891b2", "#0e7490"] : ["#06b6d4", "#2563eb"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.gradient}
      >
        {ButtonContent}
      </LinearGradient>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 24,
    right: 16,
    zIndex: 1000,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  gradient: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonContent: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: "center",
    justifyContent: "center",
  },
})