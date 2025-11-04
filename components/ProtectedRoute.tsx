import type React from "react"
import { ActivityIndicator, StyleSheet, Text, View } from "react-native"
import { useAuthContext } from "./AuthProvider"

interface ProtectedRouteProps {
  children: React.ReactNode
  fallback?: React.ReactNode
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, fallback }) => {
  const { user, loading } = useAuthContext()

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#06b6d4" />
      </View>
    )
  }

  if (!user) {
    return (
      fallback || (
        <View style={styles.container}>
          <Text style={styles.text}>
            Debes iniciar sesión para acceder a esta página
          </Text>
        </View>
      )
    )
  }

  return <>{children}</>
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0f172a",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 24,
  },
  text: {
    color: "#9ca3af",
    fontSize: 16,
    textAlign: "center",
  },
})