import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Check } from "lucide-react-native";

const ConfirmationScreen = ({ date, onGoHome }) => {
  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <Check size={40} color="#fff" />
      </View>
      <Text style={styles.title}>Congratulations!</Text>
      <Text style={styles.message}>
        You have successfully scheduled your bus for {date}
      </Text>
      <Text style={styles.subMessage}>
        You can view your Boarding details after 8:15 PM
      </Text>
      <TouchableOpacity style={styles.button} onPress={onGoHome}>
        <Text style={styles.buttonText}>Go to Home</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#1E262F",
    paddingVertical: 20,
    paddingHorizontal: 50,
  },
  iconContainer: {
    backgroundColor: "#3498db",
    borderRadius: 50,
    padding: 15,
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 30,
  },
  message: {
    fontSize: 16,
    color: "#fff",
    textAlign: "center",
    marginBottom: 20,
  },
  subMessage: {
    fontSize: 16,
    color: "#999",
    textAlign: "center",
    marginBottom: 32,
  },
  button: {
    backgroundColor: "#3498db",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 50,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default ConfirmationScreen;
