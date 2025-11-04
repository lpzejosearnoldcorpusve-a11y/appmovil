import React, { useEffect, useRef, useState } from "react"
import {
  Animated,
  Easing,
  StyleSheet,
  TextInput,
  View,
} from "react-native"

interface OTPInputProps {
  length?: number
  onComplete: (otp: string) => void
  loading?: boolean
}

export function OTPInput({ length = 6, onComplete, loading = false }: OTPInputProps) {
  const [otp, setOtp] = useState<string[]>(new Array(length).fill(""))
  const inputRefs = useRef<(TextInput | null)[]>([])
  
  // Animaciones para los puntos de carga
  const dot1Anim = useRef(new Animated.Value(0)).current
  const dot2Anim = useRef(new Animated.Value(0)).current
  const dot3Anim = useRef(new Animated.Value(0)).current

  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus()
    }
  }, [])

  useEffect(() => {
    if (loading) {
      startLoadingAnimation()
    } else {
      stopLoadingAnimation()
    }
  }, [loading])

  const startLoadingAnimation = () => {
    const createBounceAnimation = (animValue: Animated.Value, delay: number) => {
      return Animated.loop(
        Animated.sequence([
          Animated.delay(delay),
          Animated.timing(animValue, {
            toValue: -10,
            duration: 300,
            easing: Easing.ease,
            useNativeDriver: true,
          }),
          Animated.timing(animValue, {
            toValue: 0,
            duration: 300,
            easing: Easing.ease,
            useNativeDriver: true,
          }),
        ])
      )
    }

    Animated.parallel([
      createBounceAnimation(dot1Anim, 0),
      createBounceAnimation(dot2Anim, 150),
      createBounceAnimation(dot3Anim, 300),
    ]).start()
  }

  const stopLoadingAnimation = () => {
    dot1Anim.setValue(0)
    dot2Anim.setValue(0)
    dot3Anim.setValue(0)
  }

  const handleChange = (index: number, value: string) => {
    // Solo permitir números
    if (value && isNaN(Number(value))) return

    const newOtp = [...otp]
    newOtp[index] = value.substring(value.length - 1)
    setOtp(newOtp)

    // Mover al siguiente input
    if (value && index < length - 1 && inputRefs.current[index + 1]) {
      inputRefs.current[index + 1]?.focus()
    }

    // Verificar si el OTP está completo
    const otpString = newOtp.join("")
    if (otpString.length === length) {
      onComplete(otpString)
    }
  }

  const handleKeyPress = (index: number, key: string) => {
    if (key === "Backspace" && !otp[index] && index > 0 && inputRefs.current[index - 1]) {
      inputRefs.current[index - 1]?.focus()
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        {otp.map((digit, index) => (
          <TextInput
            key={index}
            ref={(ref) => {
              inputRefs.current[index] = ref
            }}
            style={[
              styles.input,
              loading && styles.inputDisabled,
            ]}
            value={digit}
            onChangeText={(value) => handleChange(index, value)}
            onKeyPress={({ nativeEvent: { key } }) => handleKeyPress(index, key)}
            keyboardType="number-pad"
            maxLength={1}
            editable={!loading}
            selectTextOnFocus
            textAlign="center"
          />
        ))}
      </View>
      {loading && (
        <View style={styles.loadingContainer}>
          <Animated.View
            style={[
              styles.dot,
              styles.dot1,
              { transform: [{ translateY: dot1Anim }] },
            ]}
          />
          <Animated.View
            style={[
              styles.dot,
              styles.dot2,
              { transform: [{ translateY: dot2Anim }] },
            ]}
          />
          <Animated.View
            style={[
              styles.dot,
              styles.dot3,
              { transform: [{ translateY: dot3Anim }] },
            ]}
          />
        </View>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  inputContainer: {
    flexDirection: "row",
    gap: 12,
    justifyContent: "center",
    marginBottom: 24,
  },
  input: {
    width: 48,
    height: 56,
    fontSize: 24,
    fontWeight: "bold",
    backgroundColor: "#1e293b",
    color: "#ffffff",
    borderWidth: 2,
    borderColor: "rgba(6, 182, 212, 0.3)",
    borderRadius: 12,
    textAlign: "center",
  },
  inputDisabled: {
    opacity: 0.5,
  },
  loadingContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginTop: 24,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  dot1: {
    backgroundColor: "#67e8f9",
  },
  dot2: {
    backgroundColor: "#f9a8d4",
  },
  dot3: {
    backgroundColor: "#c084fc",
  },
})