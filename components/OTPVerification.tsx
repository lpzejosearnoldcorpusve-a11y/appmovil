import * as Linking from "expo-linking"
import { useRouter } from "expo-router"
import React, { useEffect, useState } from "react"
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native"
import { OTPInput } from "./OTPInput"

interface OTPVerificationProps {
  email: string
  onVerify: (otp: string) => Promise<void>
  onResend: () => Promise<void>
  type: "login" | "signup"
}

export function OTPVerification({ email, onVerify, onResend, type }: OTPVerificationProps) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [resendLoading, setResendLoading] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const handleDeepLink = (event: Linking.EventType) => {
      const url = event.url
      const { path, queryParams } = Linking.parse(url)

      if (path === "auth/callback" && queryParams?.access_token) {
        // Handle the access token
        console.log("Access Token:", queryParams.access_token)
        // Redirect the user to the desired screen
        router.push("/(auth)/login")
      }
    }

    const subscription = Linking.addEventListener("url", handleDeepLink)

    return () => {
      subscription.remove()
    }
  }, [])

  const handleComplete = async (otp: string) => {
    try {
      setLoading(true)
      setError("")
      await onVerify(otp)
    } catch (err: any) {
      setError(err.message || "Código inválido")
    } finally {
      setLoading(false)
    }
  }

  const handleResend = async () => {
    try {
      setResendLoading(true)
      setError("")
      await onResend()
    } catch (err: any) {
      setError(err.message || "Error al reenviar código")
    } finally {
      setResendLoading(false)
    }
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        {/* Decorative elements */}
        <View style={[styles.decorativeCircle, styles.decorativeTop]} />
        <View style={[styles.decorativeCircle, styles.decorativeBottom]} />

        <View style={styles.contentContainer}>
          {/* Logo */}
          <View style={styles.logoContainer}>
            <Image
              source={require("../public/assets/logo.png")}
              style={styles.logo}
            />
            <Text style={styles.title}>Verificación</Text>
            <Text style={styles.subtitle}>
              Ingresa el código de 6 dígitos enviado a
            </Text>
            <Text style={styles.email}>{email}</Text>
          </View>

          {/* Error message */}
          {error && (
            <View style={styles.errorContainer}>
              <Text style={styles.errorText}>{error}</Text>
            </View>
          )}

          {/* OTP Input */}
          <OTPInput length={6} onComplete={handleComplete} loading={loading} />

          {/* Resend button */}
          <TouchableOpacity
            onPress={handleResend}
            disabled={resendLoading}
            activeOpacity={0.7}
            style={[styles.resendButton, resendLoading && styles.resendButtonDisabled]}
          >
            <Text style={[styles.resendText, resendLoading && styles.resendTextDisabled]}>
              {resendLoading ? "Reenviando..." : "Reenviar código"}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0f172a",
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: "center",
    paddingHorizontal: 24,
    paddingVertical: 40,
  },
  decorativeCircle: {
    position: "absolute",
    borderRadius: 9999,
    opacity: 0.1,
  },
  decorativeTop: {
    top: 80,
    right: 40,
    width: 128,
    height: 128,
    backgroundColor: "#a855f7",
  },
  decorativeBottom: {
    bottom: 160,
    left: 40,
    width: 160,
    height: 160,
    backgroundColor: "#06b6d4",
  },
  contentContainer: {
    maxWidth: 448,
    width: "100%",
    alignSelf: "center",
    zIndex: 10,
  },
  logoContainer: {
    alignItems: "center",
    marginBottom: 48,
  },
  logo: {
    width: 96,
    height: 96,
    borderRadius: 16,
    marginBottom: 16,
  },
  title: {
    fontSize: 36,
    fontWeight: "bold",
    color: "#ffffff",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: "#67e8f9",
    textAlign: "center",
    marginBottom: 4,
  },
  email: {
    fontSize: 16,
    color: "#67e8f9",
    fontWeight: "bold",
    textAlign: "center",
  },
  errorContainer: {
    backgroundColor: "rgba(236, 72, 153, 0.2)",
    borderWidth: 1,
    borderColor: "#ec4899",
    borderRadius: 16,
    padding: 16,
    marginBottom: 24,
  },
  errorText: {
    color: "#fbcfe8",
    textAlign: "center",
    fontSize: 14,
  },
  resendButton: {
    width: "100%",
    marginTop: 32,
    paddingVertical: 12,
    alignItems: "center",
  },
  resendButtonDisabled: {
    opacity: 0.5,
  },
  resendText: {
    color: "#67e8f9",
    fontWeight: "500",
    fontSize: 16,
  },
  resendTextDisabled: {
    opacity: 0.5,
  },
})