const API_BASE_URL = "https://miniweb-omega.vercel.app/api/auth"

export interface LoginResponse {
  success: boolean
  user: {
    id: string
    nombres: string
    apellidos: string
    email: string
    telefono: string
    rol: string
    createdAt: string
    updatedAt: string
  }
  token: string
  message: string
}

export interface RegisterResponse {
  success: boolean
  message: string
  user: {
    id: string
    nombres: string
    apellidos: string
    email: string
    telefono: string
    rol: string
    createdAt: string
  }
}

export interface ErrorResponse {
  success: false
  error: string
}

export async function apiLogin(email: string, password: string): Promise<LoginResponse> {
  const res = await fetch(`${API_BASE_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  })

  const data = await res.json()

  if (!res.ok) {
    throw new Error(data.error || "Error al iniciar sesión")
  }

  return data
}

export async function apiRegister(
  nombres: string,
  apellidos: string,
  email: string,
  telefono: string,
  password: string,
  confirmPassword: string,
): Promise<RegisterResponse> {
  const res = await fetch(`${API_BASE_URL}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      nombres,
      apellidos,
      email,
      telefono,
      password,
      confirmPassword,
    }),
  })

  const data = await res.json()

  if (!res.ok) {
    throw new Error(data.error || "Error al registrar usuario")
  }

  return data
}
