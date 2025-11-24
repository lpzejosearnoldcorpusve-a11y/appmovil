import { useAuth } from "@/hooks/useAuth";
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export function LoginForm({ onSwitchToSignup }: { onSwitchToSignup: () => void }) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false) 
  const { signIn, loading, error } = useAuth()
  const router = useRouter()

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Por favor completa todos los campos")
      return
    }
    
    // Validación básica de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      Alert.alert("Error", "Por favor ingresa un email válido")
      return
    }
    
    const result = await signIn({ email, password })
    
    if (result.data) {
      // Redirigir manualmente después del login exitoso
      console.log("✅ Login exitoso, usuario:", result.data.user)
      console.log("🔄 Intentando redirigir a mapas...")
      try {
        await router.replace('/(tabs)/maps')
        console.log("✅ Redirección exitosa")
      } catch (error) {
        console.error("❌ Error en redirección:", error)
      }
    } else {
      console.log("❌ Login falló:", result.error)
    }
  }

  const toggleShowPassword = () => {
    setShowPassword(!showPassword)
  }

  // Mostrar alerta si hay error
  React.useEffect(() => {
    if (error) {
      Alert.alert("Error de Autenticación", error.message)
    }
  }, [error])

  return (
    <ScrollView 
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="handled" // Para mejor manejo del teclado
    >
      {/* Elementos decorativos */}
      <View style={styles.decorativeCircle1} />
      <View style={styles.decorativeCircle2} />

      {/* Logo */}
      <View style={styles.logoContainer}>
        <View style={styles.logoPlaceholder}>
          {/* Reemplaza esto con tu imagen usando expo-image o react-native-fast-image */}
          <Text style={styles.logoText}>Logo</Text>
        </View>
        <Text style={styles.title}>Bienvenido</Text>
        <Text style={styles.subtitle}>Inicia sesión para continuar</Text>
      </View>

      {/* Formulario */}
      <View style={styles.formContainer}>
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
            returnKeyType="next"
            editable={!loading}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Contraseña</Text>
          <View style={styles.passwordInputContainer}>
            <TextInput
              style={styles.passwordInput}
              placeholder="••••••••"
              placeholderTextColor="#94a3b8"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
              autoComplete="password"
              returnKeyType="done"
              onSubmitEditing={handleLogin} // Permite enviar con Enter
              editable={!loading}
            />
            <TouchableOpacity 
              style={styles.eyeIcon}
              onPress={toggleShowPassword}
              disabled={loading}
            >
              <Ionicons 
                name={showPassword ? "eye-off" : "eye"} 
                size={24} 
                color="#94a3b8" 
              />
            </TouchableOpacity>
          </View>
        </View>

        {/* Botón de Iniciar Sesión */}
        <TouchableOpacity
          style={[styles.loginButton, loading && styles.disabledButton]}
          onPress={handleLogin}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#ffffff" />
          ) : (
            <Text style={styles.loginButtonText}>Iniciar Sesión</Text>
          )}
        </TouchableOpacity>

        {/* Enlace a Registro */}
        <View style={styles.signupContainer}>
          <Text style={styles.signupText}>¿No tienes cuenta? </Text>
          <TouchableOpacity onPress={loading ? undefined : onSwitchToSignup}>
            <Text style={styles.signupLink}>Regístrate</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#0f172a",
    paddingHorizontal: 24,
    paddingVertical: 40,
    justifyContent: "center",
  },
  decorativeCircle1: {
    position: "absolute",
    top: 80,
    right: 40,
    width: 128,
    height: 128,
    backgroundColor: "rgba(168, 85, 247, 0.1)",
    borderRadius: 64,
  },
  decorativeCircle2: {
    position: "absolute",
    bottom: 160,
    left: 40,
    width: 160,
    height: 160,
    backgroundColor: "rgba(6, 182, 212, 0.1)",
    borderRadius: 80,
  },
  logoContainer: {
    alignItems: "center",
    marginBottom: 48,
    zIndex: 10,
  },
  logoPlaceholder: {
    width: 96,
    height: 96,
    backgroundColor: "#1e293b",
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
  logoText: {
    color: "#cbd5e1",
    fontSize: 16,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#ffffff",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 18,
    color: "#22d3ee",
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
    color: "#67e8f9",
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
    borderColor: "rgba(6, 182, 212, 0.3)",
    fontSize: 16,
  },
  passwordInputContainer: {
    position: "relative",
    width: "100%",
  },
  passwordInput: {
    width: "100%",
    backgroundColor: "#1e293b",
    color: "#ffffff",
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: "rgba(6, 182, 212, 0.3)",
    fontSize: 16,
    paddingRight: 50, // Espacio para el icono
  },
  eyeIcon: {
    position: "absolute",
    right: 16,
    top: 16,
    padding: 4,
  },
  loginButton: {
    width: "100%",
    backgroundColor: "#06b6d4",
    paddingVertical: 16,
    borderRadius: 16,
    marginTop: 24,
    shadowColor: "#06b6d4",
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
  loginButtonText: {
    color: "#ffffff",
    fontWeight: "bold",
    fontSize: 18,
    textAlign: "center",
  },
  signupContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 24,
  },
  signupText: {
    color: "#94a3b8",
  },
  signupLink: {
    color: "#f472b6",
    fontWeight: "bold",
    marginLeft: 4,
  },
})