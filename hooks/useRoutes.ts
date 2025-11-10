"use client"

import { useState } from "react"

export interface TeleficoLine {
  id: string
  number: number
  name: string
  color: string
  stations: string[]
  operator?: string
}

export interface Sindicate {
  id: string
  name: string
  lines: TeleficoLine[]
  description: string
}

const TELÉFERICO_DATA: Sindicate[] = [
  {
    id: "sindicate-1",
    name: "Mi Teleférico",
    description: "Red de transporte por cable en La Paz y El Alto",
    lines: [
      {
        id: "line-red",
        number: 1,
        name: "Línea Roja",
        color: "#EF4444",
        operator: "Mi Teleférico",
        stations: [
          "Estación Central (Taypi Uta)",
          "Estación Cementerio (Ajayuni)",
          "Estación 16 de Julio (Jach'a Qhatu)",
        ],
      },
      {
        id: "line-yellow",
        number: 2,
        name: "Línea Amarilla",
        color: "#FBBF24",
        operator: "Mi Teleférico",
        stations: [
          "Estación Libertador (Chuqui Apu)",
          "Estación Sopocachi (Suphu Kachi)",
          "Estación Buenos Aires (Quta Uma)",
          "Estación Mirador (Qhana Pata)",
        ],
      },
      {
        id: "line-green",
        number: 3,
        name: "Línea Verde",
        color: "#22C55E",
        operator: "Mi Teleférico",
        stations: [
          "Estación Libertador (Chuqui Apu)",
          "Estación Alto Obrajes (Pata Obrajes)",
          "Estación Obrajes (Aynacha Obrajes)",
          "Estación Irpavi (Irpawi)",
        ],
      },
      {
        id: "line-blue",
        number: 4,
        name: "Línea Azul",
        color: "#3B82F6",
        operator: "Mi Teleférico",
        stations: [
          "Estación 16 de Julio (Jach'a Qhatu)",
          "Estación Plaza Libertad (Pampa Katari)",
          "Estación Plaza La Paz (Suma Qamaña)",
          "Estación UPEA (Yatiña Uta)",
          "Estación Río Seco (Waña Jawira)",
        ],
      },
      {
        id: "line-purple",
        number: 5,
        name: "Línea Púrpura",
        color: "#A855F7",
        operator: "Mi Teleférico",
        stations: [
          "Estación 6 de Marzo (Sartañani)",
          "Estación Faro Murillo (Katari)",
          "Estación Obelisco (Utjawi)",
        ],
      },
      {
        id: "line-cyan",
        number: 6,
        name: "Línea Celeste",
        color: "#06B6D4",
        operator: "Mi Teleférico",
        stations: [
          "Estación Libertador / Curva de Holguín (Chuqui Apu)",
          "Estación San Jorge (Kantutani)",
          "Estación Del Poeta (Jalsuri)",
          "Estación Prado (Chuqi Yapu)",
        ],
      },
    ],
  },
]

export function useRoutes() {
  const [selectedSindicate, setSelectedSindicate] = useState<Sindicate | null>(
    null
  )
  const [selectedLine, setSelectedLine] = useState<TeleficoLine | null>(null)

  return {
    sindicates: TELÉFERICO_DATA,
    selectedSindicate,
    setSelectedSindicate,
    selectedLine,
    setSelectedLine,
  }
}