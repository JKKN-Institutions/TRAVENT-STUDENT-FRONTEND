import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { ArrowLeft } from "lucide-react-native";

const { width } = Dimensions.get("window");

const ETicketScreen = () => {
  const navigation = useNavigation();

  const generateBarcodeLines = () => {
    const lines = [];
    const availableWidth = width * 0.8; // 80% of screen width
    const totalLines = 40;
    const lineSpacing = 2;
    const maxLineWidth =
      (availableWidth - (totalLines - 1) * lineSpacing) / totalLines;

    for (let i = 0; i < totalLines; i++) {
      const lineWidth = Math.random() * maxLineWidth + 1;
      lines.push(
        <View
          key={i}
          style={[
            styles.barcodeLine,
            {
              width: lineWidth,
              marginRight: i < totalLines - 1 ? lineSpacing : 0,
            },
          ]}
        />
      );
    }
    return lines;
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <ArrowLeft color="#fff" size={24} />
        <Text style={styles.title}>Your E-Ticket</Text>
      </TouchableOpacity>
      <View style={styles.ticketContainer}>
        <View style={styles.ticketHeader}>
          <Text style={styles.routeNumber}>17</Text>
        </View>
        <View style={styles.ticketContent}>
          <Text style={styles.passengerName}>Vinayagar S</Text>
          <Text style={styles.passengerDetails}>III year CSE</Text>
          <View style={styles.routeDetails}>
            <Text style={styles.routeText}>
              From: Seelanayakkanpatti Bus Pass
            </Text>
            <Text style={styles.routeText}>
              To: JKKN College of Engineering
            </Text>
          </View>
          <Text style={styles.dateTime}>26/06/2024 - 07:30 AM</Text>
          <Text style={styles.ticketId}>Ticket ID: 12DF45J</Text>
        </View>
        <View style={styles.barcodeContainer}>
          <View style={styles.barcode}>{generateBarcodeLines()}</View>
        </View>
      </View>
      <TouchableOpacity
        style={styles.homeButton}
        onPress={() => navigation.navigate("Home")}
      >
        <Text style={styles.homeButtonText}>Go to Home</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1E1E1E",
    padding: 20,
  },
  backButton: {
    marginTop: 40,
    marginBottom: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  title: {
    color: "#fff",
    fontSize: 24,
    marginLeft: 20,
    fontWeight: "bold",
  },
  ticketContainer: {
    backgroundColor: "#2C2C2C",
    borderRadius: 15,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  ticketHeader: {
    backgroundColor: "#00A3FF",
    padding: 15,
    alignItems: "center",
  },
  routeNumber: {
    color: "#fff",
    fontSize: 36,
    fontWeight: "bold",
  },
  ticketContent: {
    padding: 20,
  },
  passengerName: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 5,
  },
  passengerDetails: {
    color: "#888",
    fontSize: 16,
    marginBottom: 20,
  },
  routeDetails: {
    marginBottom: 20,
  },
  routeText: {
    color: "#fff",
    fontSize: 16,
    marginBottom: 5,
  },
  dateTime: {
    color: "#00A3FF",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  ticketId: {
    color: "#888",
    fontSize: 14,
  },
  barcodeContainer: {
    backgroundColor: "#fff",
    padding: 15,
    alignItems: "center",
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
  },
  barcode: {
    flexDirection: "row",
    height: 80,
    width: "100%",
    justifyContent: "center",
    alignItems: "flex-end",
  },
  barcodeLine: {
    height: "100%",
    backgroundColor: "#000",
  },
  homeButton: {
    backgroundColor: "#00A3FF",
    paddingVertical: 15,
    borderRadius: 25,
    marginTop: 30,
  },
  homeButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default ETicketScreen;
