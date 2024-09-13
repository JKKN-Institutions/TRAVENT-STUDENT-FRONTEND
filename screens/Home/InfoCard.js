import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

const InfoCard = ({ title, subtitle }) => {
  return (
    <LinearGradient colors={["#1E262F", "#000000"]} style={styles.infoCard}>
      <View style={styles.content}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtitle}>{subtitle}</Text>
      </View>
      <View style={styles.dot} />
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  infoCard: {
    width: "32%",
    aspectRatio: 0.8,
    borderRadius: 15,
    padding: 15,
    justifyContent: "flex-end",
    position: "relative",
  },
  content: {
    alignItems: "flex-start",
  },
  title: {
    color: "#ffffff",
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "left",
  },
  subtitle: {
    color: "#aaaaaa",
    fontSize: 14,
    marginTop: 5,
    textAlign: "left",
  },
  dot: {
    position: "absolute",
    top: 10,
    right: 10,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#3b82f6",
  },
});

export default InfoCard;
