import { useAuth } from "@/hooks/useAuth"
import { LinearGradient } from "expo-linear-gradient"
import React, { useState } from "react"
import {
  ActivityIndicator,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native"
import { OTPVerification } from "./OTPVerification"

export function SignupForm({ onSwitchToLogin }: { onSwitchToLogin: () => void }) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [localError, setLocalError] = useState("")
  const [showOTP, setShowOTP] = useState(false)
  const { signUp, verifyOTP, resendOTP, loading, error } = useAuth()

  const handleSignup = async () => {
    setLocalError("")

    if (!email || !password || !confirmPassword) {
      setLocalError("Por favor completa todos los campos")
      return
    }

    if (password !== confirmPassword) {
      setLocalError("Las contraseñas no coinciden")
      return
    }

    if (password.length < 6) {
      setLocalError("La contraseña debe tener al menos 6 caracteres")
      return
    }

    const result = await signUp({ email, password, confirmPassword })

    if (result.data && !result.error) {
      setLocalError("")
      setShowOTP(true)
    }
  }

  const handleVerifyOTP = async (otp: string) => {
    await verifyOTP(email, otp, "signup")
  }

  const handleResendOTP = async () => {
    await resendOTP(email)
  }

  const displayError = localError || error?.message

  if (showOTP) {
    return (
      <OTPVerification
        email={email}
        onVerify={handleVerifyOTP}
        onResend={handleResendOTP}
        type="signup"
      />
    )
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
        <View style={[styles.decorativeCircle, styles.decorativeTopLeft]} />
        <View style={[styles.decorativeCircle, styles.decorativeBottomRight]} />
        <View style={[styles.decorativeCircle, styles.decorativeMiddleRight]} />

        {/* Logo */}
        <View style={styles.logoContainer}>
          <Image
            source={require("../public/assets/logo.png")}
            style={styles.logo}
          />
          <Text style={styles.title}>Crear Cuenta</Text>
          <Text style={styles.subtitle}>Únete a nuestra comunidad</Text>
        </View>

        {/* Form */}
        <View style={styles.formContainer}>
          {displayError && (
            <View style={styles.errorContainer}>
              <Text style={styles.errorText}>{displayError}</Text>
            </View>
          )}

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Email</Text>
            <TextInput
              style={styles.input}
              placeholder="tu@email.com"
              placeholderTextColor="#64748b"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              autoComplete="email"
              editable={!loading}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Contraseña</Text>
            <TextInput
              style={styles.input}
              placeholder="Mínimo 6 caracteres"
              placeholderTextColor="#64748b"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              autoCapitalize="none"
              autoComplete="password"
              editable={!loading}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Confirmar Contraseña</Text>
            <TextInput
              style={styles.input}
              placeholder="Repite tu contraseña"
              placeholderTextColor="#64748b"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry
              autoCapitalize="none"
              autoComplete="password"
              editable={!loading}
            />
          </View>

          <TouchableOpacity
            onPress={handleSignup}
            disabled={loading}
            activeOpacity={0.8}
            style={styles.buttonWrapper}
          >
            <LinearGradient
              colors={["#ec4899", "#9333ea"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={[styles.button, loading && styles.buttonDisabled]}
            >
              {loading ? (
                <ActivityIndicator color="#ffffff" />
              ) : (
                <Text style={styles.buttonText}>Crear Cuenta</Text>
              )}
            </LinearGradient>
          </TouchableOpacity>

          <View style={styles.loginContainer}>
            <Text style={styles.loginText}>¿Ya tienes cuenta? </Text>
            <TouchableOpacity onPress={onSwitchToLogin}>
              <Text style={styles.loginLink}>Inicia Sesión</Text>
            </TouchableOpacity>
          </View>
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
    paddingVertical: 48,
  },
  decorativeCircle: {
    position: "absolute",
    borderRadius: 9999,
    opacity: 0.1,
  },
  decorativeTopLeft: {
    top: 40,
    left: 40,
    width: 128,
    height: 128,
    backgroundColor: "#ec4899",
  },
  decorativeBottomRight: {
    bottom: 80,
    right: 40,
    width: 160,
    height: 160,
    backgroundColor: "#a855f7",
  },
  decorativeMiddleRight: {
    top: "50%",
    right: 20,
    width: 96,
    height: 96,
    backgroundColor: "#f97316",
  },
  logoContainer: {
    alignItems: "center",
    marginBottom: 40,
    zIndex: 10,
  },
  logo: {
    width: 80,
    height: 80,
    borderRadius: 16,
    marginBottom: 12,
  },
  title: {
    fontSize: 36,
    fontWeight: "bold",
    color: "#ffffff",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 18,
    color: "#f9a8d4",
  },
  formContainer: {
    maxWidth: 448,
    width: "100%",
    alignSelf: "center",
    zIndex: 10,
  },
  errorContainer: {
    backgroundColor: "rgba(249, 115, 22, 0.2)",
    borderWidth: 1,
    borderColor: "#f97316",
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
  },
  errorText: {
    color: "#fdba74",
    textAlign: "center",
  },
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    color: "#fbcfe8",
    marginBottom: 8,
    marginLeft: 4,
    fontWeight: "500",
  },
  input: {
    backgroundColor: "#1e293b",
    color: "#ffffff",
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: "rgba(236, 72, 153, 0.3)",
    fontSize: 16,
  },
  buttonWrapper: {
    marginTop: 24,
    borderRadius: 16,
    overflow: "hidden",
  },
  button: {
    paddingVertical: 16,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 16,
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  buttonText: {
    color: "#ffffff",
    fontWeight: "bold",
    fontSize: 18,
  },
  loginContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 24,
  },
  loginText: {
    color: "#9ca3af",
  },
  loginLink: {
    color: "#67e8f9",
    fontWeight: "bold",
    marginLeft: 4,
  },
})