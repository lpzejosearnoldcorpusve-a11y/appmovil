import type React from "react"

interface SpinnerProps {
  size?: "sm" | "md" | "lg"
  color?: "primary" | "secondary" | "white"
}

export const Spinner: React.FC<SpinnerProps> = ({ size = "md", color = "primary" }) => {
  const sizes = {
    sm: "w-4 h-4 border-2",
    md: "w-6 h-6 border-2",
    lg: "w-8 h-8 border-3",
  }

  const colors = {
    primary: "border-cyan-500 border-t-transparent",
    secondary: "border-pink-500 border-t-transparent",
    white: "border-white border-t-transparent",
  }

  return (
    <div className={`${sizes[size]} ${colors[color]} rounded-full animate-spin`} role="status" aria-label="Loading" />
  )
}
