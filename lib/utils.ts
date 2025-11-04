import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export function validatePassword(password: string): {
  isValid: boolean
  errors: string[]
} {
  const errors: string[] = []

  if (password.length < 8) {
    errors.push("La contraseña debe tener al menos 8 caracteres")
  }
  if (!/[A-Z]/.test(password)) {
    errors.push("Debe contener al menos una mayúscula")
  }
  if (!/[a-z]/.test(password)) {
    errors.push("Debe contener al menos una minúscula")
  }
  if (!/[0-9]/.test(password)) {
    errors.push("Debe contener al menos un número")
  }

  return {
    isValid: errors.length === 0,
    errors,
  }
}
