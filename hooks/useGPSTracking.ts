'use client'

import { useEffect, useState } from 'react'

export interface GPSData {
  imei: string
  latitud: number
  longitud: number
  altitud: number
  satelites: number
  velocidad: number
  direccion: number
}

export function useGPSTracking(imei?: string, refreshInterval = 5000) {
  const [vehicles, setVehicles] = useState<GPSData[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchGPSData = async () => {
      try {
        setLoading(true)
        const response = await fetch('https://transporte-pearl.vercel.app/api/gps/track')

        if (!response.ok) {
          throw new Error('Error fetching GPS data')
        }

        const data = await response.json()

        // Handle both single object and array responses
        let vehicleData = Array.isArray(data) ? data : [data]

        if (imei) {
          vehicleData = vehicleData.filter((v) => v.imei === imei)
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
  }, [refreshInterval, imei])

  return { vehicles, loading, error }
}
