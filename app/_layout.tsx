import { useAuth } from "@/hooks/useAuth"
import { Stack, useRouter, useSegments } from "expo-router"
import { useEffect } from "react"
import { ActivityIndicator, StyleSheet, View } from "react-native"

export default function RootLayout() {
  const { loading, user } = useAuth()
  const router = useRouter()
  const segments = useSegments()

  useEffect(() => {
    if (!loading) {
      const inAuthGroup = segments[0] === '(auth)'
      const inTabsGroup = segments[0] === '(tabs)'

      console.log("🔍 Layout navigation check:", {
        user: !!user,
        loading,
        segments,
        inAuthGroup,
        inTabsGroup
      })

      if (!user && !inAuthGroup) {
        console.log("👤 No user, redirecting to login")
        try {
          router.replace('/(auth)/login')
        } catch (error) {
          console.error("❌ Error redirecting to login:", error)
        }
      } else if (user && inAuthGroup) {
        console.log("✅ User authenticated, redirecting to maps")
        try {
          router.replace('/(tabs)/maps')
        } catch (error) {
          console.error("❌ Error redirecting to maps:", error)
        }
      } else {
        console.log("⏳ Navigation state stable")
      }
    }
  }, [user, loading, segments])

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#06b6d4" />
      </View>
    )
  }

  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: "#0f172a",
        },
        headerTintColor: "#06b6d4",
        headerTitleStyle: {
          fontWeight: "bold",
        },
      }}
    >
      <Stack.Screen name="(auth)" options={{ headerShown: false }} />
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen
        name="modal"
        options={{
          presentation: "modal",
          headerTitle: "Perfil",
        }}
      />
    </Stack>
  )
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    backgroundColor: "#0f172a",
    alignItems: "center",
    justifyContent: "center",
  },
})