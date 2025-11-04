"use client"

import type React from "react"

interface AlertProps {
  type: "success" | "error" | "warning" | "info"
  message: string
  onClose?: () => void
}

export const Alert: React.FC<AlertProps> = ({ type, message, onClose }) => {
  const styles = {
    success: "bg-green-50 border-green-500 text-green-800 dark:bg-green-900/20 dark:text-green-300",
    error: "bg-red-50 border-red-500 text-red-800 dark:bg-red-900/20 dark:text-red-300",
    warning: "bg-yellow-50 border-yellow-500 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300",
    info: "bg-blue-50 border-blue-500 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300",
  }

  return (
    <div className={`flex items-center justify-between p-4 rounded-xl border-l-4 ${styles[type]}`}>
      <p className="font-medium">{message}</p>
      {onClose && (
        <button onClick={onClose} className="ml-4 text-current hover:opacity-70 transition-opacity">
          ✕
        </button>
      )}
    </div>
  )
}
