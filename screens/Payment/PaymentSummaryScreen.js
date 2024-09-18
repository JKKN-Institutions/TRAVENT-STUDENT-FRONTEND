import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Dimensions,
} from "react-native";
import {
  ArrowLeft,
  Check,
  CreditCard,
  Calendar,
  MapPin,
  School,
  User,
} from "lucide-react-native";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import ProgressBar from "./ProgressBar";
const { width, height } = Dimensions.get("window");

const PaymentSummaryScreen = ({ route }) => {
  const navigation = useNavigation();
  const { feeDetails, selectedTerms, totalAmount, paymentMethod } =
    route.params;
  const [isAgreed, setIsAgreed] = useState(false);

  const SummaryItem = ({ label, value, icon: Icon }) => (
    <View style={styles.summaryItem}>
      <View style={styles.summaryIconContainer}>
        <Icon color="#4a90e2" size={24} />
      </View>
      <View style={styles.summaryTextContainer}>
        <Text style={styles.summaryLabel}>{label}</Text>
        <Text style={styles.summaryValue}>{value}</Text>
      </View>
    </View>
  );
  const handleProceedToPay = () => {
    navigation.navigate("PaymentMethod", { totalAmount });
  };

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient colors={["#1E262F", "#16171B"]} style={styles.gradient}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <ArrowLeft color="#fff" size={24} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Payment Summary</Text>
        </View>

        <ProgressBar currentStep={2} />
        <ScrollView style={styles.content}>
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Summary of Payment</Text>
            <SummaryItem
              icon={CreditCard}
              label="Fee paid for"
              value="JKKN Transport"
            />
            <SummaryItem
              icon={Calendar}
              label="Fee Category"
              value={`${feeDetails.year} - ${
                paymentMethod === "yearly"
                  ? "Full Year"
                  : selectedTerms.join(", ")
              }`}
            />
            <SummaryItem
              icon={Calendar}
              label="Payment date"
              value={new Date().toLocaleDateString()}
            />
            <SummaryItem icon={User} label="Name" value={feeDetails.name} />
            <SummaryItem icon={School} label="Year" value={feeDetails.year} />
            <SummaryItem
              icon={School}
              label="Department"
              value={feeDetails.department}
            />
            <View style={styles.divider} />
            <SummaryItem
              icon={CreditCard}
              label="Fee"
              value={`₹${totalAmount}`}
            />
            <SummaryItem icon={CreditCard} label="Tax" value="₹0.00" />
            <SummaryItem icon={CreditCard} label="Fee Balance" value="₹0.00" />
          </View>

          <View style={styles.totalAmountContainer}>
            <Text style={styles.totalAmountLabel}>Total Amount</Text>
            <Text style={styles.totalAmountValue}>
              ₹{totalAmount.toFixed(2)}
            </Text>
          </View>

          <TouchableOpacity
            style={styles.agreementContainer}
            onPress={() => setIsAgreed(!isAgreed)}
          >
            <View style={[styles.checkbox, isAgreed && styles.checkedCheckbox]}>
              {isAgreed && <Check color="#fff" size={16} />}
            </View>
            <Text style={styles.agreementText}>
              By clicking this, I agree to pay the amount mentioned in the above
              summary and understand that it cannot be refunded.
            </Text>
          </TouchableOpacity>
        </ScrollView>

        <View style={styles.footer}>
          <TouchableOpacity
            style={[styles.payButton, !isAgreed && styles.disabledButton]}
            disabled={!isAgreed}
            onPress={handleProceedToPay}
          >
            <Text style={styles.payButtonText}>
              Proceed to Pay ₹{totalAmount.toFixed(2)}
            </Text>
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
  card: {
    backgroundColor: "rgba(255,255,255,0.05)",
    borderRadius: width * 0.04,
    padding: width * 0.04,
    marginBottom: height * 0.02,
  },
  cardTitle: {
    color: "#fff",
    fontSize: width * 0.05,
    fontWeight: "bold",
    marginBottom: height * 0.02,
  },
  summaryItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: height * 0.015,
  },
  summaryIconContainer: {
    width: width * 0.1,
    height: width * 0.1,
    borderRadius: width * 0.05,
    backgroundColor: "rgba(74, 144, 226, 0.1)",
    justifyContent: "center",
    alignItems: "center",
    marginRight: width * 0.03,
  },
  summaryTextContainer: {
    flex: 1,
  },
  summaryLabel: {
    color: "#888",
    fontSize: width * 0.035,
  },
  summaryValue: {
    color: "#fff",
    fontSize: width * 0.04,
    fontWeight: "bold",
  },
  divider: {
    height: 1,
    backgroundColor: "rgba(255,255,255,0.1)",
    marginVertical: height * 0.015,
  },
  totalAmountContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "rgba(74, 144, 226, 0.1)",
    borderRadius: width * 0.04,
    padding: width * 0.04,
    marginBottom: height * 0.02,
  },
  totalAmountLabel: {
    color: "#fff",
    fontSize: width * 0.05,
    fontWeight: "bold",
  },
  totalAmountValue: {
    color: "#4a90e2",
    fontSize: width * 0.06,
    fontWeight: "bold",
  },
  agreementContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: height * 0.02,
  },
  checkbox: {
    width: width * 0.06,
    height: width * 0.06,
    borderRadius: width * 0.01,
    borderWidth: 2,
    borderColor: "#4a90e2",
    marginRight: width * 0.03,
    justifyContent: "center",
    alignItems: "center",
  },
  checkedCheckbox: {
    backgroundColor: "#4a90e2",
  },
  agreementText: {
    color: "#888",
    fontSize: width * 0.035,
    flex: 1,
  },
  footer: {
    padding: width * 0.04,
    borderTopWidth: 1,
    borderTopColor: "rgba(255,255,255,0.1)",
  },
  payButton: {
    backgroundColor: "#4a90e2",
    padding: width * 0.04,
    borderRadius: width * 0.02,
    alignItems: "center",
  },
  disabledButton: {
    backgroundColor: "#888",
  },
  payButtonText: {
    color: "#fff",
    fontSize: width * 0.04,
    fontWeight: "bold",
  },
});

export default PaymentSummaryScreen;
