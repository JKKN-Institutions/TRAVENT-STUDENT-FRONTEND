import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Dimensions,
  Image,
  ActivityIndicator,
} from "react-native";
import { ArrowLeft } from "lucide-react-native";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import PaymentOption from "./PaymentOption";

const { width, height } = Dimensions.get("window");

// Import all icons at the top of the file
import CREDITCARD from "../../assets/CREDITCARD.png";
import UPI from "../../assets/UPI.png";
import GPAY from "../../assets/GPAY.png";
import NETBANKING from "../../assets/NETBANKING.png";
import PAYPAL from "../../assets/PAYPAL.png";
import RAZORPAY from "../../assets/RAZORPAY.png";

const PaymentMethodScreen = ({ route }) => {
  const navigation = useNavigation();
  const { totalAmount } = route.params;
  const [selectedMethod, setSelectedMethod] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handlePaymentOptionPress = (method) => {
    setSelectedMethod(method);
  };

  const renderIcon = (iconSource) => {
    return <Image source={iconSource} style={styles.icon} />;
  };

  const handleProceedToPayment = () => {
    setIsLoading(true);
    // Simulate payment processing
    setTimeout(() => {
      setIsLoading(false);
      navigation.navigate("PaymentSuccess", {
        totalAmount,
        paymentMethod: selectedMethod,
      });
    }, 2000);
  };

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient colors={["#1E262F", "#16171B"]} style={styles.gradient}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <ArrowLeft color="#fff" size={24} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Payment Menu</Text>
        </View>

        <ScrollView style={styles.content}>
          <Text style={styles.sectionTitle}>Payment Methods</Text>
          <PaymentOption
            icon={() => renderIcon(CREDITCARD)}
            title="Credit & Debit Card"
            subtitle="Visa, Mastercard, Rupay"
            onPress={() => handlePaymentOptionPress("card")}
            isSelected={selectedMethod === "card"}
          />
          <PaymentOption
            icon={() => renderIcon(UPI)}
            title="UPI"
            onPress={() => handlePaymentOptionPress("upi")}
            isSelected={selectedMethod === "upi"}
          />
          <PaymentOption
            icon={() => renderIcon(GPAY)}
            title="Google Pay"
            onPress={() => handlePaymentOptionPress("googlepay")}
            isSelected={selectedMethod === "googlepay"}
          />
          <PaymentOption
            icon={() => renderIcon(NETBANKING)}
            title="Net Banking"
            onPress={() => handlePaymentOptionPress("netbanking")}
            isSelected={selectedMethod === "netbanking"}
          />
          <PaymentOption
            icon={() => renderIcon(PAYPAL)}
            title="PayPal"
            onPress={() => handlePaymentOptionPress("paypal")}
            isSelected={selectedMethod === "paypal"}
          />
          <PaymentOption
            icon={() => renderIcon(RAZORPAY)}
            title="Razorpay"
            onPress={() => handlePaymentOptionPress("razorpay")}
            isSelected={selectedMethod === "razorpay"}
          />
        </ScrollView>

        <View style={styles.footer}>
          <View style={styles.totalContainer}>
            <Text style={styles.totalLabel}>Total Amount:</Text>
            <Text style={styles.totalAmount}>₹{totalAmount}</Text>
          </View>
          <TouchableOpacity
            style={[
              styles.proceedButton,
              !selectedMethod && styles.disabledButton,
            ]}
            onPress={handleProceedToPayment}
            disabled={!selectedMethod || isLoading}
          >
            {isLoading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.proceedButtonText}>
                Go To Payment Gateway
              </Text>
            )}
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: width * 0.04,
    paddingTop: height * 0.06,
    paddingBottom: height * 0.02,
  },
  headerTitle: {
    color: "#fff",
    fontSize: width * 0.06,
    fontWeight: "bold",
    marginLeft: width * 0.04,
  },
  content: {
    flex: 1,
    padding: width * 0.04,
  },
  sectionTitle: {
    color: "#888",
    fontSize: width * 0.04,
    marginBottom: height * 0.02,
    marginTop: height * 0.02,
  },
  footer: {
    padding: width * 0.04,
    borderTopWidth: 1,
    borderTopColor: "rgba(255,255,255,0.1)",
  },
  totalContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: height * 0.02,
  },
  totalLabel: {
    color: "#888",
    fontSize: width * 0.04,
  },
  totalAmount: {
    color: "#fff",
    fontSize: width * 0.06,
    fontWeight: "bold",
  },
  proceedButton: {
    backgroundColor: "#4a90e2",
    padding: width * 0.04,
    borderRadius: width * 0.02,
    alignItems: "center",
  },
  disabledButton: {
    backgroundColor: "#888",
  },
  proceedButtonText: {
    color: "#fff",
    fontSize: width * 0.04,
    fontWeight: "bold",
  },
  icon: {
    width: "80%",
    height: "80%",
    resizeMode: "contain",
  },
});

export default PaymentMethodScreen;
