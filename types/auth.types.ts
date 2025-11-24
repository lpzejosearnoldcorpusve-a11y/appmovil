export interface User {
  id: string
  nombres: string
  apellidos: string
  email: string
  telefono: string
  rol: string
  createdAt: string
  updatedAt?: string
}

export interface AuthError {
  message: string
  status?: number
}

export interface LoginCredentials {
  email: string
  password: string
}

export interface SignupCredentials {
  nombres: string
  apellidos: string
  email: string
  telefono: string
  password: string
  confirmPassword: string
}

export interface AuthState {
  user: User | null
  token: string | null
  loading: boolean
  error: AuthError | null
}
