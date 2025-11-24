import { RouteCategory } from "@/hooks/useRoutes"
import { ChevronRight } from "lucide-react-native"
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native"

interface SindicateListProps {
  categories: RouteCategory[]
  onSelectCategory: (category: RouteCategory) => void
}

export function SindicateList({ categories, onSelectCategory }: SindicateListProps) {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Categorías de Rutas</Text>
        <Text style={styles.subtitle}>Selecciona una categoría para ver las rutas disponibles</Text>

        {categories.map((category) => (
          <TouchableOpacity
            key={category.id}
            onPress={() => onSelectCategory(category)}
            style={styles.categoryCard}
          >
            <View style={styles.cardContent}>
              <Text style={styles.categoryName}>{category.name}</Text>
              <Text style={styles.categoryDescription}>{category.description}</Text>
              <Text style={styles.routesCount}>{category.routes.length} rutas disponibles</Text>
            </View>
            <ChevronRight size={28} color="#06b6d4" />
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
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#94a3b8',
    marginBottom: 24,
  },
  categoryCard: {
    backgroundColor: '#1e293b',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardContent: {
    flex: 1,
  },
  categoryName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#ffffff',
    marginBottom: 4,
  },
  categoryDescription: {
    fontSize: 14,
    color: '#94a3b8',
    marginBottom: 8,
  },
  routesCount: {
    fontSize: 12,
    color: '#06b6d4',
    fontWeight: '500',
  },
})