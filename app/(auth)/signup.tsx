import { SignupForm } from "@/components/SignupForm"
import { useRouter } from "expo-router"
import { StyleSheet, View } from "react-native"

export default function SignupPage() {
  const router = useRouter()

  const handleSwitchToLogin = () => {
    router.push("/(auth)/login")
  }

  return (
    <View style={styles.container}>
      <SignupForm onSwitchToLogin={handleSwitchToLogin} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0f172a",
  },
})