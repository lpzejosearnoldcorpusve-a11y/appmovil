import React from "react"
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native"
import { AnimatedBackground } from "../../components/AnimatedBackground"

export default function Index() {
  return (
    <View style={styles.container}>
      {/* Fondo animado */}
      <AnimatedBackground />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Encabezado */}
        <View style={styles.header}>
          <Text style={styles.title}>Bienvenido</Text>
          <Text style={styles.subtitle}>
            Selecciona una opción del menú inferior
          </Text>
        </View>

        {/* Tarjetas de opciones */}
        <View style={styles.cardsContainer}>
          {/* Tarjeta Mapas */}
          <TouchableOpacity
            style={[styles.card, styles.cardCyan]}
            activeOpacity={0.8}
          >
            <Text style={styles.cardTitle}>🗺️ Mapas</Text>
            <Text style={styles.cardDescription}>
              Explora rutas y ubicaciones
            </Text>
          </TouchableOpacity>

          {/* Tarjeta Rutas */}
          <TouchableOpacity
            style={[styles.card, styles.cardPink]}
            activeOpacity={0.8}
          >
            <Text style={styles.cardTitle}>🚌 Rutas</Text>
            <Text style={styles.cardDescription}>
              Planifica tus viajes
            </Text>
          </TouchableOpacity>

          {/* Tarjeta Tarifas */}
          <TouchableOpacity
            style={[styles.card, styles.cardOrange]}
            activeOpacity={0.8}
          >
            <Text style={styles.cardTitle}>💰 Tarifas</Text>
            <Text style={styles.cardDescription}>
              Consulta precios
            </Text>
          </TouchableOpacity>

          {/* Tarjeta Horarios */}
          <TouchableOpacity
            style={[styles.card, styles.cardPurple]}
            activeOpacity={0.8}
          >
            <Text style={styles.cardTitle}>⏰ Horarios</Text>
            <Text style={styles.cardDescription}>
              Revisa los horarios de trufis
            </Text>
          </TouchableOpacity>

          {/* Tarjeta Favoritos */}
          <TouchableOpacity
            style={[styles.card, styles.cardGreen]}
            activeOpacity={0.8}
          >
            <Text style={styles.cardTitle}>⭐ Favoritos</Text>
            <Text style={styles.cardDescription}>
              Tus rutas guardadas
            </Text>
          </TouchableOpacity>

          {/* Tarjeta Noticias */}
          <TouchableOpacity
            style={[styles.card, styles.cardBlue]}
            activeOpacity={0.8}
          >
            <Text style={styles.cardTitle}>📰 Noticias</Text>
            <Text style={styles.cardDescription}>
              Últimas actualizaciones
            </Text>
          </TouchableOpacity>
        </View>

        {/* Información adicional */}
        <View style={styles.infoSection}>
          <Text style={styles.infoTitle}>🚍 Sistema de Transporte</Text>
          <Text style={styles.infoText}>
            Encuentra las mejores rutas de trufis y micros en La Paz.
            Planifica tus viajes de manera eficiente.
          </Text>
        </View>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0f172a",
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 40,
  },
  header: {
    alignItems: "center",
    marginBottom: 48,
  },
  title: {
    color: "#ffffff",
    fontSize: 36,
    fontWeight: "bold",
    marginBottom: 12,
    textAlign: "center",
  },
  subtitle: {
    color: "#67e8f9",
    fontSize: 18,
    textAlign: "center",
    paddingHorizontal: 20,
  },
  cardsContainer: {
    width: "100%",
    maxWidth: 448,
    alignSelf: "center",
    gap: 16,
  },
  card: {
    backgroundColor: "#1e293b",
    padding: 24,
    borderRadius: 16,
    borderWidth: 2,
    marginBottom: 16,
  },
  cardCyan: {
    borderColor: "rgba(6, 182, 212, 0.3)",
  },
  cardPink: {
    borderColor: "rgba(236, 72, 153, 0.3)",
  },
  cardOrange: {
    borderColor: "rgba(249, 115, 22, 0.3)",
  },
  cardPurple: {
    borderColor: "rgba(168, 85, 247, 0.3)",
  },
  cardGreen: {
    borderColor: "rgba(34, 197, 94, 0.3)",
  },
  cardBlue: {
    borderColor: "rgba(59, 130, 246, 0.3)",
  },
  cardTitle: {
    color: "#ffffff",
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
  },
  cardDescription: {
    color: "#9ca3af",
    fontSize: 15,
  },
  infoSection: {
    marginTop: 32,
    backgroundColor: "#1e293b",
    padding: 20,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "rgba(100, 116, 139, 0.3)",
  },
  infoTitle: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  infoText: {
    color: "#94a3b8",
    fontSize: 14,
    lineHeight: 20,
  },
})