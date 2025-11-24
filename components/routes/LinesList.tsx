import { Route, RouteCategory } from "@/hooks/useRoutes"
import { ChevronLeft } from "lucide-react-native"
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native"

interface LinesListProps {
  category: RouteCategory
  onSelectRoute: (route: Route) => void
  onBack: () => void
}

export function LinesList({ category, onSelectRoute, onBack }: LinesListProps) {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <ChevronLeft size={24} color="#06b6d4" />
          <Text style={styles.backText}>Volver</Text>
        </TouchableOpacity>

        <Text style={styles.title}>{category.name}</Text>
        <Text style={styles.subtitle}>Rutas disponibles</Text>

        {category.routes.map((route) => (
          <TouchableOpacity
            key={route.id}
            onPress={() => onSelectRoute(route)}
            style={[
              styles.routeCard,
              {
                borderColor: route.color || "#6B7280",
                backgroundColor: (route.color || "#6B7280") + "15"
              }
            ]}
          >
            <View style={styles.routeHeader}>
              <View
                style={[
                  styles.routeColorCircle,
                  { backgroundColor: route.color || "#6B7280" }
                ]}
              >
                <Text style={styles.routeNumber}>
                  {route.type === "minibus" ? (route.number || "?") : "T"}
                </Text>
              </View>
              <View style={styles.routeInfo}>
                <Text style={styles.routeName}>{route.name}</Text>
                {route.type === "teleferico" && route.estaciones && (
                  <Text style={styles.routeStations}>
                    {route.estaciones.length} estaciones
                  </Text>
                )}
                {route.type === "minibus" && route.ruta && (
                  <Text style={styles.routeStations}>
                    {route.ruta.length} puntos de ruta
                  </Text>
                )}
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f172a',
  },
  content: {
    padding: 24,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  backText: {
    color: '#06b6d4',
    marginLeft: 8,
    fontWeight: '600',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#94a3b8',
    marginBottom: 24,
  },
  routeCard: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  routeHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  routeColorCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  routeNumber: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  routeInfo: {
    flex: 1,
  },
  routeName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#ffffff',
    marginBottom: 4,
  },
  routeStations: {
    fontSize: 14,
    color: '#94a3b8',
  },
})