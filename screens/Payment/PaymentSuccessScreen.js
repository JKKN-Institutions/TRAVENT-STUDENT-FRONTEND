import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import LottieView from "lottie-react-native";

const { width, height } = Dimensions.get("window");

const PaymentSuccessScreen = ({ route }) => {
  const navigation = useNavigation();
  const { totalAmount, paymentMethod } = route.params;

  return (
    <LinearGradient colors={["#1E262F", "#16171B"]} style={styles.container}>
      <LottieView
        source={require("../../assets/confetti-animation.json")}
        autoPlay
        loop={false}
        style={styles.confetti}
      />

      <Text style={styles.congratsText}>Congratulations!</Text>
      <Text style={styles.successText}>
        You have successfully made your payment.
      </Text>
      <View style={styles.amountContainer}>
        <Text style={styles.amountLabel}>Amount Paid:</Text>
        <Text style={styles.amountValue}>₹{totalAmount}</Text>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("Pay")}
        >
          <Text style={styles.buttonText}>Go to Payment Menu</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.primaryButton]}
          onPress={() =>
            navigation.navigate("EReceipt", { totalAmount, paymentMethod })
          }
        >
          <Text style={styles.buttonText}>View E-Receipt</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: width * 0.05,
  },
  confetti: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  partyPopper: {
    width: width * 0.3,
    height: width * 0.3,
    marginBottom: height * 0.03,
  },
  congratsText: {
    fontSize: width * 0.08,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: height * 0.02,
  },
  successText: {
    fontSize: width * 0.045,
    color: "#ccc",
    textAlign: "center",
    marginBottom: height * 0.04,
  },
  amountContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: height * 0.04,
  },
  amountLabel: {
    fontSize: width * 0.045,
    color: "#ccc",
    marginRight: width * 0.02,
  },
  amountValue: {
    fontSize: width * 0.06,
    fontWeight: "bold",
    color: "#4a90e2",
  },
  buttonContainer: {
    width: "100%",
  },
  button: {
    backgroundColor: "#2C3E50",
    padding: width * 0.04,
    borderRadius: width * 0.02,
    alignItems: "center",
    marginBottom: height * 0.02,
  },
  primaryButton: {
    backgroundColor: "#4a90e2",
  },
  buttonText: {
    color: "#fff",
    fontSize: width * 0.04,
    fontWeight: "bold",
  },
});

export default PaymentSuccessScreen;
