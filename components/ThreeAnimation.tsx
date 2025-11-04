import React, { useEffect, useRef } from "react"
import {
  Animated,
  Dimensions,
  Easing,
  StyleSheet,
  View,
} from "react-native"

const { width, height } = Dimensions.get("window")

// Iconos de trufis/rutas en SVG simplificado (usando View)
const TrufiIcon = ({ style }: { style: any }) => (
  <Animated.View style={[styles.trufi, style]}>
    <View style={styles.trufiBody}>
      <View style={styles.trufiWindow} />
      <View style={styles.trufiWindow} />
    </View>
    <View style={styles.trufiWheels}>
      <View style={styles.wheel} />
      <View style={styles.wheel} />
    </View>
  </Animated.View>
)

const RouteMarker = ({ style }: { style: any }) => (
  <Animated.View style={[styles.marker, style]} />
)

interface FloatingElement {
  id: number
  x: Animated.Value
  y: Animated.Value
  rotation: Animated.Value
  scale: Animated.Value
  type: "trufi" | "marker"
}

export function AnimatedBackground() {
  const elements = useRef<FloatingElement[]>([])

  useEffect(() => {
    // Crear elementos flotantes (trufis y marcadores de ruta)
    const createElements = () => {
      const newElements: FloatingElement[] = []
      
      // 8 trufis
      for (let i = 0; i < 8; i++) {
        newElements.push({
          id: i,
          x: new Animated.Value(Math.random() * width),
          y: new Animated.Value(Math.random() * height),
          rotation: new Animated.Value(0),
          scale: new Animated.Value(0.5 + Math.random() * 0.5),
          type: "trufi",
        })
      }

      // 12 marcadores de ruta
      for (let i = 8; i < 20; i++) {
        newElements.push({
          id: i,
          x: new Animated.Value(Math.random() * width),
          y: new Animated.Value(Math.random() * height),
          rotation: new Animated.Value(0),
          scale: new Animated.Value(0.3 + Math.random() * 0.4),
          type: "marker",
        })
      }

      elements.current = newElements
    }

    createElements()

    // Animar cada elemento
    elements.current.forEach((element, index) => {
      // Movimiento horizontal
      const animateX = () => {
        const duration = 15000 + Math.random() * 10000
        const toValue = Math.random() * width

        Animated.timing(element.x, {
          toValue,
          duration,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }).start(() => animateX())
      }

      // Movimiento vertical
      const animateY = () => {
        const duration = 20000 + Math.random() * 10000
        const toValue = Math.random() * height

        Animated.timing(element.y, {
          toValue,
          duration,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }).start(() => animateY())
      }

      // Rotación
      const animateRotation = () => {
        Animated.loop(
          Animated.timing(element.rotation, {
            toValue: 1,
            duration: 20000 + Math.random() * 10000,
            easing: Easing.linear,
            useNativeDriver: true,
          })
        ).start()
      }

      // Escala pulsante
      const animateScale = () => {
        Animated.loop(
          Animated.sequence([
            Animated.timing(element.scale, {
              toValue: (0.5 + Math.random() * 0.5) * 1.2,
              duration: 2000 + Math.random() * 2000,
              easing: Easing.inOut(Easing.ease),
              useNativeDriver: true,
            }),
            Animated.timing(element.scale, {
              toValue: 0.5 + Math.random() * 0.5,
              duration: 2000 + Math.random() * 2000,
              easing: Easing.inOut(Easing.ease),
              useNativeDriver: true,
            }),
          ])
        ).start()
      }

      // Iniciar animaciones con delay escalonado
      setTimeout(() => {
        animateX()
        animateY()
        animateRotation()
        if (element.type === "marker") {
          animateScale()
        }
      }, index * 100)
    })
  }, [])

  return (
    <View style={styles.container}>
      {/* Gradiente de fondo simulado con capas */}
      <View style={styles.gradientLayer1} />
      <View style={styles.gradientLayer2} />
      <View style={styles.gradientLayer3} />

      {/* Elementos flotantes */}
      {elements.current.map((element) => {
        const rotation = element.rotation.interpolate({
          inputRange: [0, 1],
          outputRange: ["0deg", "360deg"],
        })

        const animatedStyle = {
          transform: [
            { translateX: element.x },
            { translateY: element.y },
            { rotate: rotation },
            { scale: element.scale },
          ],
        }

        return element.type === "trufi" ? (
          <TrufiIcon key={element.id} style={animatedStyle} />
        ) : (
          <RouteMarker key={element.id} style={animatedStyle} />
        )
      })}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "#0f172a",
    zIndex: -1,
  },
  gradientLayer1: {
    position: "absolute",
    top: 100,
    right: 50,
    width: 300,
    height: 300,
    backgroundColor: "#06b6d4",
    opacity: 0.05,
    borderRadius: 150,
  },
  gradientLayer2: {
    position: "absolute",
    bottom: 150,
    left: 30,
    width: 350,
    height: 350,
    backgroundColor: "#ec4899",
    opacity: 0.05,
    borderRadius: 175,
  },
  gradientLayer3: {
    position: "absolute",
    top: "50%",
    right: 20,
    width: 200,
    height: 200,
    backgroundColor: "#a855f7",
    opacity: 0.05,
    borderRadius: 100,
  },
  // Estilos del trufi
  trufi: {
    position: "absolute",
    width: 40,
    height: 30,
    opacity: 0.3,
  },
  trufiBody: {
    width: "100%",
    height: 20,
    backgroundColor: "#06b6d4",
    borderRadius: 4,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingHorizontal: 4,
  },
  trufiWindow: {
    width: 8,
    height: 8,
    backgroundColor: "#0f172a",
    borderRadius: 2,
  },
  trufiWheels: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 4,
    marginTop: -3,
  },
  wheel: {
    width: 6,
    height: 6,
    backgroundColor: "#1e293b",
    borderRadius: 3,
  },
  // Estilos del marcador de ruta
  marker: {
    position: "absolute",
    width: 16,
    height: 16,
    backgroundColor: "#ec4899",
    borderRadius: 8,
    opacity: 0.4,
    borderWidth: 2,
    borderColor: "#f9a8d4",
  },
})