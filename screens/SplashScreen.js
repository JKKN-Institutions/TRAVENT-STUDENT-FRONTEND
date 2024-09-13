import React, { useEffect, useRef, useState } from "react";
import { View, Text, StyleSheet, Image, Animated, Easing } from "react-native";

const SplashScreen = ({ navigation }) => {
  const spinValue = useRef(new Animated.Value(0)).current; // Spin animation
  const scaleValue = useRef(new Animated.Value(1)).current; // Scale animation
  const [title, setTitle] = useState(""); // For letter-by-letter animation
  const fullTitle = "Travent"; // Full title text
  const logoSize = useRef(new Animated.Value(200)).current; // Initial size

  useEffect(() => {
    // Spin and scale the wheel
    Animated.parallel([
      // Spin animation
      Animated.timing(spinValue, {
        toValue: 1,
        duration: 3000,
        easing: Easing.linear,
        useNativeDriver: true, // Spin can use the native driver
      }),
      // Scale the logo from 200 to 70 (no useNativeDriver for size)
      Animated.timing(logoSize, {
        toValue: 70,
        duration: 1500,
        easing: Easing.out(Easing.quad),
        useNativeDriver: false, // Layout properties cannot use native driver
      }),
    ]).start(() => {
      // After the spin animation ends, show the text letter by letter
      revealTitleLetterByLetter();
    });
  }, []);

  // Spin value to degrees conversion
  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  const revealTitleLetterByLetter = () => {
    let currentTitle = "";
    fullTitle.split("").forEach((letter, index) => {
      setTimeout(() => {
        currentTitle += letter;
        setTitle(currentTitle);
      }, index * 50); // Reveal each letter after 50ms
    });

    // Transition to Onboarding after the full animation
    setTimeout(() => {
      navigation.replace("Onboarding");
    }, fullTitle.length * 200 + 1000); // Add delay for smoother transition
  };

  return (
    <View style={styles.container}>
      {/* Animated Wheel Logo */}
      <Animated.View
        style={{
          transform: [{ rotate: spin }],
        }}
      >
        <Animated.Image
          source={require("../assets/splash.png")}
          style={[styles.logo, { width: logoSize, height: logoSize }]}
        />
      </Animated.View>

      {/* Letter by Letter Text */}
      <Text style={styles.title}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1b1d28",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  logo: {
    width: 70,
    height: 70,
  },
  title: {
    marginLeft: 10,
    fontSize: 36,
    color: "#fff",
    fontWeight: "bold",
  },
});

export default SplashScreen;
