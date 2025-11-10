import { ChevronLeft } from "lucide-react-native"
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native"

interface Line {
  id: string
  number: number
  name: string
  color: string
  operator?: string
  stations: string[]
}

interface LinesListProps {
  sindicate: {
    name: string
    lines: Line[]
  }
  onSelectLine: (line: Line) => void
  onBack: () => void
}

export function LinesList({ sindicate, onSelectLine, onBack }: LinesListProps) {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <ChevronLeft size={24} color="#0369A1" />
          <Text style={styles.backText}>Volver</Text>
        </TouchableOpacity>

        <Text style={styles.title}>{sindicate.name}</Text>
        <Text style={styles.subtitle}>Líneas disponibles</Text>

        {sindicate.lines.map((line) => (
          <TouchableOpacity
            key={line.id}
            onPress={() => onSelectLine(line)}
            style={[
              styles.lineCard,
              { 
                borderColor: line.color, 
                backgroundColor: line.color + "15" 
              }
            ]}
          >
            <View style={styles.lineHeader}>
              <View
                style={[
                  styles.lineNumberCircle,
                  { backgroundColor: line.color }
                ]}
              >
                <Text style={styles.lineNumber}>{line.number}</Text>
              </View>
              <View style={styles.lineInfo}>
                <Text style={styles.lineName}>{line.name}</Text>
                {line.operator && (
                  <Text style={styles.operator}>{line.operator}</Text>
                )}
              </View>
            </View>
            <Text style={styles.stationsCount}>
              {line.stations.length} estaciones
            </Text>
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
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  backText: {
    color: '#0369A1',
    marginLeft: 8,
    fontWeight: '600',
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
  lineCard: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 2,
    // Shadow para iOS
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    // Shadow para Android
    elevation: 2,
  },
  lineHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  lineNumberCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  lineNumber: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
  },
  lineInfo: {
    flex: 1,
  },
  lineName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#0F172A',
  },
  operator: {
    color: '#475569',
    fontSize: 14,
  },
  stationsCount: {
    color: '#374151',
    fontSize: 12,
    marginLeft: 60, 
  },
})