import { apiLogin, apiRegister } from "@/lib/api/auth"
import type { AuthError, LoginCredentials, SignupCredentials, User } from "@/types/auth.types"
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useEffect, useState } from "react"

export function useAuth() {
  const [user, setUser] = useState<User | null>(null)
  const [token, setToken] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<AuthError | null>(null)

  useEffect(() => {
    checkAuthStatus()
  }, [])

  const checkAuthStatus = async () => {
    try {
      const [storedToken, storedUser] = await Promise.all([
        AsyncStorage.getItem("auth_token"),
        AsyncStorage.getItem("auth_user")
      ])

      if (storedToken && storedUser) {
        setToken(storedToken)
        setUser(JSON.parse(storedUser))
      }
    } catch (err: any) {
      console.error("Error checking auth status:", err)
    } finally {
      setLoading(false)
    }
  }

  const signIn = async ({ email, password }: LoginCredentials) => {
    try {
      setLoading(true)
      setError(null)

      const response = await apiLogin(email, password)
      
      // Guardar en AsyncStorage en lugar de localStorage
      await Promise.all([
        AsyncStorage.setItem("auth_token", response.token),
        AsyncStorage.setItem("auth_user", JSON.stringify(response.user))
      ])

      setToken(response.token)
      setUser(response.user)

      return { data: response, error: null }
    } catch (err: any) {
      const authError = { message: err.message || "Error al iniciar sesión" }
      setError(authError)
      return { data: null, error: authError }
    } finally {
      setLoading(false)
    }
  }

  const signUp = async (credentials: SignupCredentials) => {
    try {
      setLoading(true)
      setError(null)

      const response = await apiRegister(
        credentials.nombres,
        credentials.apellidos,
        credentials.email,
        credentials.telefono,
        credentials.password,
        credentials.confirmPassword,
      )

      return { data: response, error: null }
    } catch (err: any) {
      const authError = { message: err.message || "Error al registrar usuario" }
      setError(authError)
      return { data: null, error: authError }
    } finally {
      setLoading(false)
    }
  }

  const signOut = async () => {
    try {
      setLoading(true)
      setError(null)

      // Remover de AsyncStorage
      await Promise.all([
        AsyncStorage.removeItem("auth_token"),
        AsyncStorage.removeItem("auth_user")
      ])

      setToken(null)
      setUser(null)
    } catch (err: any) {
      setError({ message: err.message })
    } finally {
      setLoading(false)
    }
  }

  return {
    user,
    token,
    loading,
    error,
    signIn,
    signUp,
    signOut,
  }
}