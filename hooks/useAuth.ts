import { supabase } from "@/lib/supabase"
import type { AuthError, LoginCredentials, SignupCredentials, User } from "@/types/auth.types"
import { useEffect, useState } from "react"

export function useAuth() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<AuthError | null>(null)

  useEffect(() => {
    console.log("🔧 useAuth: Iniciando verificación de sesión...")
    
    // Check active session
    supabase.auth.getSession().then(({ data: { session } }) => {
      console.log("🔧 useAuth: Sesión obtenida:", { 
        hasSession: !!session,
        userEmail: session?.user?.email 
      })
      setUser((session?.user as User) || null)
      setLoading(false)
    })

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      console.log("🔧 useAuth: Estado cambió:", { 
        event: _event,
        hasSession: !!session 
      })
      setUser((session?.user as User) || null)
    })

    return () => subscription.unsubscribe()
  }, [])

  const signIn = async ({ email, password }: LoginCredentials) => {
    try {
      setLoading(true)
      setError(null)
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })
      if (error) throw error
      return { data, error: null }
    } catch (err: any) {
      const authError = { message: err.message }
      setError(authError)
      return { data: null, error: authError }
    } finally {
      setLoading(false)
    }
  }

  const signUp = async ({ email, password }: SignupCredentials) => {
    try {
      setLoading(true)
      setError(null)
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      })
      if (error) throw error
      return { data, error: null }
    } catch (err: any) {
      const authError = { message: err.message }
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
      const { error } = await supabase.auth.signOut()
      if (error) throw error
    } catch (err: any) {
      setError({ message: err.message })
    } finally {
      setLoading(false)
    }
  }

  const verifyOTP = async (email: string, token: string, type: "login" | "signup") => {
    try {
      setLoading(true)
      setError(null)
      const { data, error } = await supabase.auth.verifyOtp({
        email,
        token,
        type: type === "login" ? "email" : "signup",
      })
      if (error) throw error
      return { data, error: null }
    } catch (err: any) {
      const authError = { message: err.message }
      setError(authError)
      return { data: null, error: authError }
    } finally {
      setLoading(false)
    }
  }

  const resendOTP = async (email: string) => {
    try {
      setLoading(true)
      setError(null)
      const { error } = await supabase.auth.resend({
        type: "signup",
        email,
      })
      if (error) throw error
      return { error: null }
    } catch (err: any) {
      const authError = { message: err.message }
      setError(authError)
      return { error: authError }
    } finally {
      setLoading(false)
    }
  }

  return {
    user,
    loading,
    error,
    signIn,
    signUp,
    signOut,
    verifyOTP,
    resendOTP,
  }
}