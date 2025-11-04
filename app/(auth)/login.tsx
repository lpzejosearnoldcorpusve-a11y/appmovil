import { LoginForm } from "@/components/LoginForm"
import { useRouter } from "expo-router"
import { StyleSheet, View } from "react-native"

export default function LoginPage() {
  const router = useRouter()

  const handleSwitchToSignup = () => {
    router.push("/(auth)/signup")
  }

  return (
    <View style={styles.container}>
      <LoginForm onSwitchToSignup={handleSwitchToSignup} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0f172a",
  },
})