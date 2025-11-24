'use client'

import { useEffect, useState } from 'react'

export interface GPSDevice {
  imei: string
  nombre: string
  activo: boolean
}

export function useGPSDevices(refreshInterval = 5000) {
  const [devices, setDevices] = useState<GPSDevice[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchDevices = async () => {
      try {
        setLoading(true)
        const response = await fetch('https://transporte-pearl.vercel.app/api/dispositivos-gps')

        if (!response.ok) {
          throw new Error('Error fetching GPS devices')
        }

        const data = await response.json()

        // Handle both single object and array responses
        const deviceData = Array.isArray(data) ? data : [data]
        setDevices(deviceData)
        setError(null)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error')
      } finally {
        setLoading(false)
      }
    }

    fetchDevices()
    const interval = setInterval(fetchDevices, refreshInterval)

    return () => clearInterval(interval)
  }, [refreshInterval])

  return { devices, loading, error }
}
