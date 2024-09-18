import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { X } from "lucide-react-native";

const Logout = ({ onConfirm, onCancel }) => {
  return (
    <View style={styles.overlay}>
      <View style={styles.modal}>
        <TouchableOpacity style={styles.closeButton} onPress={onCancel}>
          <X color="#fff" size={24} />
        </TouchableOpacity>
        <Text style={styles.title}>Logout</Text>
        <Text style={styles.message}>Are you sure you want to logout?</Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.button, styles.cancelButton]}
            onPress={onCancel}
          >
            <Text style={styles.buttonText}>No</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, styles.confirmButton]}
            onPress={onConfirm}
          >
            <Text style={styles.buttonText}>Yes</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modal: {
    backgroundColor: "#1E262F",
    borderRadius: 10,
    padding: 20,
    width: "80%",
    alignItems: "center",
  },
  closeButton: {
    position: "absolute",
    top: 10,
    right: 10,
  },
  title: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  message: {
    color: "#fff",
    fontSize: 16,
    marginBottom: 20,
    textAlign: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 50,
    width: "45%",
  },
  cancelButton: {
    backgroundColor: "#353A40",
  },
  confirmButton: {
    backgroundColor: "#00A3FF",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default Logout;
