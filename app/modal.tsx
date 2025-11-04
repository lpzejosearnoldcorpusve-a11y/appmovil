"use client"

import { useAuth } from "@/hooks/useAuth"
import { useRouter } from "expo-router"
import { Text, TouchableOpacity, View } from "react-native"

export default function Modal() {
  const router = useRouter()
  const { user, signOut, loading } = useAuth()

  return (
    <View className="flex-1 bg-slate-900 items-center justify-center px-6">
      <View className="bg-slate-800 rounded-3xl p-8 w-full max-w-md border-2 border-cyan-500/30">
        <Text className="text-3xl font-bold text-white mb-4 text-center">Perfil</Text>

        {user && (
          <View className="mb-6">
            <Text className="text-gray-400 text-center mb-2">Email:</Text>
            <Text className="text-cyan-400 text-lg text-center font-medium">{user.email}</Text>
          </View>
        )}

        <TouchableOpacity
          className="bg-gradient-to-r from-pink-500 to-purple-600 py-4 rounded-2xl mb-4"
          onPress={signOut}
          disabled={loading}
        >
          <Text className="text-white text-center font-bold text-lg">Cerrar Sesión</Text>
        </TouchableOpacity>

        <TouchableOpacity className="bg-slate-700 py-4 rounded-2xl" onPress={() => router.back()}>
          <Text className="text-white text-center font-bold">Cerrar</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}
