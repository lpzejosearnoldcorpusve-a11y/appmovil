"use client"

import { getMinibuses, getTelefericos, type Minibus, type Teleferico } from "@/lib/api/routes"
import { useEffect, useState } from "react"

export interface Route {
  id: string
  type: "minibus" | "teleferico"
  name: string
  color?: string
  stations?: string[]
  origin?: string
  destination?: string
  number?: string
  tarifa?: number
  ruta?: { lat: number; lng: number }[]
  estaciones?: { id: string; nombre: string; lat: number; lng: number; orden: number }[]
}

export interface RouteCategory {
  id: string
  name: string
  type: "minibus" | "teleferico"
  routes: Route[]
  description: string
}

export function useRoutes() {
  const [categories, setCategories] = useState<RouteCategory[]>([])
  const [selectedCategory, setSelectedCategory] = useState<RouteCategory | null>(null)
  const [selectedRoute, setSelectedRoute] = useState<Route | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchRoutes() {
      try {
        setLoading(true)
        const [minibuses, telefericos] = await Promise.all([getMinibuses(), getTelefericos()])

        const minibusCategory: RouteCategory = {
          id: "minibuses",
          name: "Minibuses",
          type: "minibus",
          description: "Rutas de minibuses en La Paz",
          routes: minibuses.map((m: Minibus) => ({
            id: m.id,
            type: "minibus" as const,
            name: m.rutaNombre,
            number: m.linea,
            color: "#6B7280", // Default color for minibuses
            ruta: m.ruta,
          })),
        }

        const telefericoCategory: RouteCategory = {
          id: "telefericos",
          name: "Teleféricos",
          type: "teleferico",
          description: "Red de teleféricos Mi Teleférico",
          routes: telefericos.map((t: Teleferico) => ({
            id: t.id,
            type: "teleferico" as const,
            name: t.nombre,
            color: t.color,
            estaciones: t.estaciones,
          })),
        }

        setCategories([minibusCategory, telefericoCategory])
      } catch (err: any) {
        setError(err.message || "Error al cargar las rutas")
      } finally {
        setLoading(false)
      }
    }

    fetchRoutes()
  }, [])

  return {
    categories,
    selectedCategory,
    setSelectedCategory,
    selectedRoute,
    setSelectedRoute,
    loading,
    error,
  }
}
