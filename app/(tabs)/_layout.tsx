import { Tabs } from "expo-router"
import { Bus, Cable, DollarSign, MapPin, User } from "lucide-react-native"

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#06b6d4",
        tabBarInactiveTintColor: "#64748b",
        tabBarStyle: {
          backgroundColor: "#0f172a",
          borderTopColor: "#1e293b",
        },
        headerStyle: {
          backgroundColor: "#0f172a",
        },
        headerTintColor: "#06b6d4",
        headerTitleStyle: {
          fontWeight: "bold",
        },
      }}
    >
      <Tabs.Screen
        name="maps"
        options={{
          title: "Mapas",
          tabBarIcon: ({ color, size }) => <MapPin size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="minibuses"
        options={{
          title: "Minibuses",
          tabBarIcon: ({ color, size }) => <Bus size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="telefericos"
        options={{
          title: "Teleféricos",
          tabBarIcon: ({ color, size }) => <Cable size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="rates"
        options={{
          title: "Tarifas",
          tabBarIcon: ({ color, size }) => <DollarSign size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Perfil",
          tabBarIcon: ({ color, size }) => <User size={size} color={color} />,
        }}
      />
    </Tabs>
  )
}