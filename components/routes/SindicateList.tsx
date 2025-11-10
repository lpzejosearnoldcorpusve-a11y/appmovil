import { ChevronRight } from "lucide-react-native"
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native"

interface SindicateListProps {
  sindicates: Array<{
    id: string
    name: string
    description: string
    lines: Array<any>
  }>
  onSelectSindicate: (sindicate: any) => void
}

export function SindicateList({ sindicates, onSelectSindicate }: SindicateListProps) {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Sindicatos</Text>
        <Text style={styles.subtitle}>Selecciona un sindicato para ver las líneas disponibles</Text>

        {sindicates.map((sindicate) => (
          <TouchableOpacity
            key={sindicate.id}
            onPress={() => onSelectSindicate(sindicate)}
            style={styles.sindicateCard}
          >
            <View style={styles.cardContent}>
              <Text style={styles.sindicateName}>{sindicate.name}</Text>
              <Text style={styles.sindicateDescription}>{sindicate.description}</Text>
              <Text style={styles.linesCount}>{sindicate.lines.length} líneas disponibles</Text>
            </View>
            <ChevronRight size={28} color="white" />
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  content: {
    padding: 24,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#0F172A',
    marginBottom: 8,
  },
  subtitle: {
    color: '#475569',
    marginBottom: 24,
  },
  sindicateCard: {
    backgroundColor: '#3B82F6', // Color base para el gradiente
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    // Shadow para iOS
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    // Shadow para Android
    elevation: 5,
  },
  cardContent: {
    flex: 1,
  },
  sindicateName: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  sindicateDescription: {
    color: '#DBEAFE',
    marginTop: 4,
  },
  linesCount: {
    color: '#BFDBFE',
    marginTop: 8,
    fontWeight: '600',
  },
})