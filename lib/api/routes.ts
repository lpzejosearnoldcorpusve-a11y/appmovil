
const API_BASE_URL = "https://miniweb-omega.vercel.app/api"

export interface RoutePoint {
  lat: number
  lng: number
}

export interface Minibus {
  id: string
  sindicato: string
  linea: string
  rutaNombre: string
  tipo: string
  createdAt: string
  ruta: RoutePoint[]
}

export interface TelefericoStation {
  id: string
  telefericoId: string
  nombre: string
  lat: number
  lng: number
  orden: number
  createdAt: string
}

export interface Teleferico {
  id: string
  nombre: string
  color: string
  createdAt: string
  estaciones: TelefericoStation[]
}

export async function getMinibuses(): Promise<Minibus[]> {
  const res = await fetch(`${API_BASE_URL}/minibuses`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  })

  if (!res.ok) {
    throw new Error("Error al obtener minibuses")
  }

  const data = await res.json()
  return data
}

export async function getTelefericos(): Promise<Teleferico[]> {
  const res = await fetch(`${API_BASE_URL}/telefericos`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  })

  if (!res.ok) {
    throw new Error("Error al obtener teleféricos")
  }

  const data = await res.json()
  return data
}
