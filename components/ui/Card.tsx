import type React from "react"

interface CardProps {
  children: React.ReactNode
  className?: string
  variant?: "default" | "gradient"
}

export const Card: React.FC<CardProps> = ({ children, className = "", variant = "default" }) => {
  const variants = {
    default: "bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700",
    gradient:
      "bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 border border-gray-200 dark:border-gray-700",
  }

  return <div className={`rounded-2xl shadow-xl p-8 ${variants[variant]} ${className}`}>{children}</div>
}
