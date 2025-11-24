import { useAuth } from "@/hooks/useAuth"
import { Redirect } from "expo-router"
import { ActivityIndicator, StyleSheet, View } from "react-native"

export default function Page() {
  const { user, loading } = useAuth()

  // Debug - puedes quitar estos console.logs después
  console.log("🔍 Estado auth:", { 
    hasUser: !!user, 
    loading,
    userEmail: user?.email 
  })

  if (loading) {
    console.log("⏳ Cargando sesión...")
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#06b6d4" />
      </View>
    )
  }

  // Redirigir según el estado de autenticación
  if (user) {
    console.log("✅ Usuario autenticado, redirigiendo a tabs")
    return <Redirect href="/(tabs)/maps" />
  }

  console.log("❌ No autenticado, redirigiendo a login")
  return <Redirect href="/(auth)/login" />
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0f172a",
    alignItems: "center",
    justifyContent: "center",
  },
})
