import { Text, View } from "react-native"

export default function NotificationsScreen() {
  return (
    <View className="flex-1 bg-slate-900 items-center justify-center">
      <Text className="text-white text-2xl font-bold">Notificaciones</Text>
      <Text className="text-purple-400 mt-2">Próximamente...</Text>
    </View>
  )
}
