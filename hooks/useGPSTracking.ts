'use client'

import { useEffect, useState } from 'react'

export interface Vehicle {
  id: string
  placa: string
  marca: string
  tipoVehiculo: string
}

export interface GPSPosition {
  id: string
  vehiculoId: string
  latitud: number
  longitud: number
  altitud: number
  satelites: number
  velocidad: number
  direccion: number
  estadoMotor: string
  nivelCombustible: number | null
  timestamp: string
  precision: number | null
  proveedor: string
}

export interface GPSData {
  vehiculo: Vehicle
  posicion: GPSPosition
}

export interface GPSResponse {
  success: boolean
  data: GPSData[]
  timestamp: string
}

export function useGPSTracking(vehiculoId?: string, refreshInterval = 5000) {
  const [vehicles, setVehicles] = useState<GPSData[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchGPSData = async () => {
      try {
        setLoading(true)
        const response = await fetch('https://transporte-pearl.vercel.app/api/gps/positions')

        if (!response.ok) {
          throw new Error('Error fetching GPS data')
        }

        const data: GPSResponse = await response.json()

        if (!data.success) {
          throw new Error('API returned unsuccessful response')
        }

        let vehicleData = data.data

        if (vehiculoId) {
          vehicleData = vehicleData.filter((v) => v.vehiculo.id === vehiculoId)
        }

        setVehicles(vehicleData)
        setError(null)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error')
      } finally {
        setLoading(false)
      }
    }

    fetchGPSData()
    const interval = setInterval(fetchGPSData, refreshInterval)

    return () => clearInterval(interval)
  }, [refreshInterval, vehiculoId])

  return { vehicles, loading, error }
}
