import React from "react";
import { View, Text, StyleSheet } from "react-native";

const StatCard = ({ title, value, unit }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.subContainer}>
        <Text style={styles.value}>{value}</Text>
        <Text style={styles.unit}>{unit}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "rgba(255,255,255,0.05)",
    borderRadius: 8,
    padding: 16,
    paddingVertical: 30,
    alignItems: "left",
    width: "30%",
  },
  subContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  title: {
    color: "#fff",
    fontSize: 18,
    marginBottom: 8,
    fontWeight: "bold",
  },
  value: {
    color: "#4CAF50",
    fontSize: 24,
    fontWeight: "bold",
  },
  unit: {
    color: "#fff",
    fontSize: 16,
    marginTop: 4,
    marginLeft: 4,
  },
});

export default StatCard;
