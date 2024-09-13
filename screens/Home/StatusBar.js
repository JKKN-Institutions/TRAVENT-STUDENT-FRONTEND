import React from "react";
import { View, Text, StyleSheet, ScrollView, Dimensions } from "react-native";

const { width } = Dimensions.get("window");

const statusItems = [
  { title: "Scheduled", time: "Wed, 25 Jul", active: true },
  { title: "Bus Departed", time: "07:05 AM", active: true },
  { title: "Boarded", time: "08:30 AM", active: true },
  { title: "Reached", time: "09:00 AM" },
];

const StatusBar = () => (
  <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.scrollContainer}>
    <View style={styles.container}>
      {statusItems.map((item, index) => (
        <StatusItem
          key={index}
          {...item}
          isFirst={index === 0}
          isLast={index === statusItems.length - 1}
          isGreen={index === 0}
        />
      ))}
    </View>
  </ScrollView>
);

const StatusItem = ({ title, time, active = false, isFirst, isLast, isGreen }) => (
  <View style={styles.statusItem}>
    {!isFirst && (
      <View
        style={[
          styles.line,
          isGreen ? styles.greenLine : active ? styles.activeLine : styles.inactiveLine,
          { left: 0 },
        ]}
      />
    )}
    <View style={styles.dotContainer}>
      <View style={[styles.dot, isGreen ? styles.greenDot : active && styles.activeDot]} />
    </View>
    {!isLast && (
      <View
        style={[
          styles.line,
          active ? styles.activeLine : styles.inactiveLine,
          { right: 0 },
        ]}
      />
    )}
    <View style={styles.textContainer}>
      <Text style={[styles.statusText, active && styles.activeText]}>{title}</Text>
      <Text style={[styles.timeText, active && styles.activeText]}>{time}</Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  scrollContainer: {
    maxWidth: width,
    marginVertical: 20,
  },
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 0,
  },
  statusItem: {
    width: 120,
    alignItems: "center",
    justifyContent: "flex-start",
  },
  dotContainer: {
    width: 24,
    height: 24,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
  },
  dot: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: "#888",
    borderWidth: 2,
    borderColor: "#2c2c2c",
  },
  activeDot: {
    backgroundColor: "#12B76A",
    borderColor: "#12B76A",
  },
  greenDot: {
    backgroundColor: "#12B76A",
    borderColor: "#12B76A",
  },
  line: {
    position: "absolute",
    top: 11,
    height: 2,
    width: 60,
  },
  activeLine: {
    backgroundColor: "#12B76A",
  },
  inactiveLine: {
    backgroundColor: "#888",
  },
  greenLine: {
    backgroundColor: "#00FF00",
  },
  textContainer: {
    alignItems: "center",
  },
  statusText: {
    color: "#888",
    fontSize: 12,
    textAlign: "center",
    marginBottom: 4,
  },
  timeText: {
    color: "#999",
    fontSize: 12,
    textAlign: "center",
  },
  activeText: {
    color: "#fff",
  },
});

export default StatusBar;