import { useAuth } from "@/hooks/useAuth"
import React, { useState } from "react"
import {
  ActivityIndicator,
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native"

export function SignupForm({ onSwitchToLogin }: { onSwitchToLogin: () => void }) {
  const [nombres, setNombres] = useState("")
  const [apellidos, setApellidos] = useState("")
  const [email, setEmail] = useState("")
  const [telefono, setTelefono] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [localError, setLocalError] = useState("")
  const [success, setSuccess] = useState(false)
  const { signUp, loading, error } = useAuth()

  const handleSignup = async () => {
    setLocalError("")

    if (!nombres || !apellidos || !email || !telefono || !password || !confirmPassword) {
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

    const result = await signUp({
      nombres,
      apellidos,
      email,
      telefono,
      password,
      confirmPassword,
    })

    if (result?.data && !result?.error) {
      setLocalError("")
      setSuccess(true)
      // Auto switch to login after 2 seconds
      setTimeout(() => {
        onSwitchToLogin()
      }, 2000)
    }
  }

  // Mostrar alerta si hay error
  React.useEffect(() => {
    if (localError || error?.message) {
      Alert.alert("Error", localError || error?.message)
    }
  }, [localError, error])

  if (success) {
    return (
      <View style={styles.successContainer}>
        <View style={styles.successIcon}>
          <Text style={styles.successCheck}>✓</Text>
        </View>
        <Text style={styles.successTitle}>Registro Exitoso</Text>
        <Text style={styles.successText}>Redirigiendo al login...</Text>
      </View>
    )
  }

  return (
    <ScrollView 
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
    >
      {/* Elementos decorativos */}
      <View style={styles.decorativeCircle1} />
      <View style={styles.decorativeCircle2} />
      <View style={styles.decorativeCircle3} />

      <View style={styles.content}>
        {/* Logo */}
        <View style={styles.logoContainer}>
          <View style={styles.logoPlaceholder}>
            <Text style={styles.logoText}>Logo</Text>
          </View>
          <Text style={styles.title}>Crear Cuenta</Text>
          <Text style={styles.subtitle}>Únete a nuestra comunidad</Text>
        </View>

        {/* Formulario */}
        <View style={styles.formContainer}>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Nombres</Text>
            <TextInput
              style={styles.input}
              placeholder="Tu nombre"
              placeholderTextColor="#94a3b8"
              value={nombres}
              onChangeText={setNombres}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Apellidos</Text>
            <TextInput
              style={styles.input}
              placeholder="Tus apellidos"
              placeholderTextColor="#94a3b8"
              value={apellidos}
              onChangeText={setApellidos}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Email</Text>
            <TextInput
              style={styles.input}
              placeholder="tu@email.com"
              placeholderTextColor="#94a3b8"
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              keyboardType="email-address"
              autoComplete="email"
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Teléfono</Text>
            <TextInput
              style={styles.input}
              placeholder="+591 12345678"
              placeholderTextColor="#94a3b8"
              value={telefono}
              onChangeText={setTelefono}
              keyboardType="phone-pad"
              autoComplete="tel"
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Contraseña</Text>
            <TextInput
              style={styles.input}
              placeholder="Mínimo 6 caracteres"
              placeholderTextColor="#94a3b8"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              autoComplete="password"
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Confirmar Contraseña</Text>
            <TextInput
              style={styles.input}
              placeholder="Repite tu contraseña"
              placeholderTextColor="#94a3b8"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry
              autoComplete="password"
            />
          </View>

          <TouchableOpacity
            style={[styles.signupButton, loading && styles.disabledButton]}
            onPress={handleSignup}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#ffffff" />
            ) : (
              <Text style={styles.signupButtonText}>Crear Cuenta</Text>
            )}
          </TouchableOpacity>

          <View style={styles.loginContainer}>
            <Text style={styles.loginText}>¿Ya tienes cuenta? </Text>
            <TouchableOpacity onPress={onSwitchToLogin}>
              <Text style={styles.loginLink}>Inicia Sesión</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#0f172a",
  },
  content: {
    paddingHorizontal: 24,
    paddingVertical: 40,
    minHeight: "100%",
    justifyContent: "center",
  },
  decorativeCircle1: {
    position: "absolute",
    top: 40,
    left: 40,
    width: 128,
    height: 128,
    backgroundColor: "rgba(236, 72, 153, 0.1)",
    borderRadius: 64,
  },
  decorativeCircle2: {
    position: "absolute",
    bottom: 80,
    right: 40,
    width: 160,
    height: 160,
    backgroundColor: "rgba(168, 85, 247, 0.1)",
    borderRadius: 80,
  },
  decorativeCircle3: {
    position: "absolute",
    top: "50%",
    right: 20,
    width: 96,
    height: 96,
    backgroundColor: "rgba(249, 115, 22, 0.1)",
    borderRadius: 48,
  },
  logoContainer: {
    alignItems: "center",
    marginBottom: 40,
    zIndex: 10,
  },
  logoPlaceholder: {
    width: 80,
    height: 80,
    backgroundColor: "#1e293b",
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
  },
  logoText: {
    color: "#cbd5e1",
    fontSize: 14,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#ffffff",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 18,
    color: "#f472b6",
  },
  formContainer: {
    width: "100%",
    maxWidth: 400,
    alignSelf: "center",
    zIndex: 10,
  },
  inputContainer: {
    marginBottom: 16,
  },
  label: {
    color: "#f472b6",
    marginBottom: 8,
    marginLeft: 4,
    fontWeight: "500",
  },
  input: {
    width: "100%",
    backgroundColor: "#1e293b",
    color: "#ffffff",
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: "rgba(236, 72, 153, 0.3)",
    fontSize: 16,
  },
  signupButton: {
    width: "100%",
    backgroundColor: "#ec4899",
    paddingVertical: 16,
    borderRadius: 16,
    marginTop: 24,
    shadowColor: "#ec4899",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.5,
    shadowRadius: 12,
    elevation: 8,
  },
  disabledButton: {
    opacity: 0.5,
  },
  signupButtonText: {
    color: "#ffffff",
    fontWeight: "bold",
    fontSize: 18,
    textAlign: "center",
  },
  loginContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 24,
  },
  loginText: {
    color: "#94a3b8",
  },
  loginLink: {
    color: "#22d3ee",
    fontWeight: "bold",
    marginLeft: 4,
  },
  successContainer: {
    flex: 1,
    backgroundColor: "#0f172a",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 24,
  },
  successIcon: {
    width: 80,
    height: 80,
    backgroundColor: "rgba(34, 197, 94, 0.2)",
    borderRadius: 40,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
  successCheck: {
    fontSize: 32,
    color: "#22c55e",
    fontWeight: "bold",
  },
  successTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#ffffff",
    marginBottom: 8,
    textAlign: "center",
  },
  successText: {
    fontSize: 16,
    color: "#94a3b8",
    textAlign: "center",
  },
})