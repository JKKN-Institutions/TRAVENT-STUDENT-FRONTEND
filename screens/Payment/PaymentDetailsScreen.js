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

const PaymentDetailsScreen = () => {
  const navigation = useNavigation();
  const [paymentMethod, setPaymentMethod] = useState("term");
  const [selectedTerms, setSelectedTerms] = useState(["Term 1"]);

  const feeDetails = {
    name: "Vinayagar S",
    year: "III Year",
    department: "Mechanical Engineering",
    academicYear: "2024-2025",
    routeNo: "15",
    stoppingName: "Seelanaickanpatti",
    totalYearlyFee: "₹4,500",
  };

  const terms = [
    { id: "Term 1", amount: 1500 },
    { id: "Term 2", amount: 1500 },
    { id: "Term 3", amount: 1500 },
  ];

  const toggleTerm = (termId) => {
    setSelectedTerms((prevSelected) =>
      prevSelected.includes(termId)
        ? prevSelected.filter((id) => id !== termId)
        : [...prevSelected, termId]
    );
  };
  const handleContinueToSummary = () => {
    navigation.navigate("PaymentSummary", {
      feeDetails,
      selectedTerms,
      totalAmount,
      paymentMethod,
    });
  };
  const totalAmount =
    paymentMethod === "yearly"
      ? parseInt(feeDetails.totalYearlyFee.replace(/[^0-9]/g, ""))
      : terms
          .filter((term) => selectedTerms.includes(term.id))
          .reduce((sum, term) => sum + term.amount, 0);

  const FeeDetailItem = ({ icon: Icon, label, value }) => (
    <View style={styles.feeDetailItem}>
      <Icon color="#4a90e2" size={24} />
      <View style={styles.feeDetailText}>
        <Text style={styles.feeDetailLabel}>{label}</Text>
        <Text style={styles.feeDetailValue}>{value}</Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient colors={["#1E262F", "#16171B"]} style={styles.gradient}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <ArrowLeft color="#fff" size={24} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Payment Details</Text>
        </View>

        <ProgressBar currentStep={1} />

        <ScrollView style={styles.content}>
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Fee Details</Text>
            <FeeDetailItem icon={User} label="Name" value={feeDetails.name} />
            <FeeDetailItem
              icon={School}
              label="Year & Department"
              value={`${feeDetails.year}, ${feeDetails.department}`}
            />
            <FeeDetailItem
              icon={Calendar}
              label="Academic Year"
              value={feeDetails.academicYear}
            />
            <FeeDetailItem
              icon={MapPin}
              label="Route & Stop"
              value={`Route ${feeDetails.routeNo}, ${feeDetails.stoppingName}`}
            />
            <FeeDetailItem
              icon={CreditCard}
              label="Total Yearly Fee"
              value={feeDetails.totalYearlyFee}
            />
          </View>

          <View style={styles.card}>
            <Text style={styles.cardTitle}>Choose Payment Method</Text>
            <View style={styles.radioGroup}>
              {["yearly", "term"].map((method) => (
                <TouchableOpacity
                  key={method}
                  style={[
                    styles.radioButton,
                    paymentMethod === method && styles.activeRadio,
                  ]}
                  onPress={() => setPaymentMethod(method)}
                >
                  <View style={styles.radioOuter}>
                    {paymentMethod === method && (
                      <View style={styles.radioInner} />
                    )}
                  </View>
                  <Text
                    style={[
                      styles.radioLabel,
                      paymentMethod === method && styles.activeRadioLabel,
                    ]}
                  >
                    {method === "yearly" ? "Pay Total Amount" : "Pay by Term"}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {paymentMethod === "term" && (
            <View style={styles.card}>
              <Text style={styles.cardTitle}>Select Term</Text>
              {terms.map((term) => (
                <TouchableOpacity
                  key={term.id}
                  style={styles.termButton}
                  onPress={() => toggleTerm(term.id)}
                >
                  <View
                    style={[
                      styles.checkbox,
                      selectedTerms.includes(term.id) && styles.checkedCheckbox,
                    ]}
                  >
                    {selectedTerms.includes(term.id) && (
                      <Check color="#fff" size={16} />
                    )}
                  </View>
                  <Text style={styles.termText}>{term.id}</Text>
                  <Text style={styles.termAmount}>₹{term.amount}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </ScrollView>

        <View style={styles.footer}>
          <TouchableOpacity style={styles.continueButton}>
            <Text
              style={styles.continueButtonText}
              onPress={handleContinueToSummary}
            >
              Continue to Summary ₹{totalAmount}
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
  progressBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: width * 0.04,
    marginBottom: height * 0.02,
  },
  progressStep: {
    alignItems: "center",
  },
  progressDot: {
    width: width * 0.08,
    height: width * 0.08,
    borderRadius: width * 0.04,
    backgroundColor: "rgba(255,255,255,0.2)",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: height * 0.01,
  },
  activeDot: {
    backgroundColor: "#4a90e2",
  },
  progressNumber: {
    color: "#fff",
    fontSize: width * 0.04,
    fontWeight: "bold",
  },
  progressText: {
    color: "#888",
    fontSize: width * 0.03,
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
  feeDetailItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: height * 0.02,
  },
  feeDetailText: {
    marginLeft: width * 0.04,
  },
  feeDetailLabel: {
    color: "#888",
    fontSize: width * 0.035,
  },
  feeDetailValue: {
    color: "#fff",
    fontSize: width * 0.04,
    fontWeight: "bold",
  },
  radioGroup: {
    flexDirection: "column",
  },
  radioButton: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: height * 0.02,
  },
  radioOuter: {
    width: width * 0.06,
    height: width * 0.06,
    borderRadius: width * 0.03,
    borderWidth: 2,
    borderColor: "#888",
    justifyContent: "center",
    alignItems: "center",
    marginRight: width * 0.03,
  },
  radioInner: {
    width: width * 0.03,
    height: width * 0.03,
    borderRadius: width * 0.015,
    backgroundColor: "#4a90e2",
  },
  activeRadio: {
    borderColor: "#4a90e2",
  },
  radioLabel: {
    color: "#888",
    fontSize: width * 0.04,
  },
  activeRadioLabel: {
    color: "#fff",
  },
  termButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.1)",
    padding: width * 0.04,
    borderRadius: width * 0.02,
    marginBottom: height * 0.01,
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
  termText: {
    color: "#fff",
    fontSize: width * 0.04,
    flex: 1,
  },
  termAmount: {
    color: "#4a90e2",
    fontSize: width * 0.04,
    fontWeight: "bold",
  },
  footer: {
    padding: width * 0.04,
    borderTopWidth: 1,
    borderTopColor: "rgba(255,255,255,0.1)",
  },
  continueButton: {
    backgroundColor: "#4a90e2",
    padding: width * 0.04,
    borderRadius: width * 0.02,
    alignItems: "center",
  },
  continueButtonText: {
    color: "#fff",
    fontSize: width * 0.04,
    fontWeight: "bold",
  },
});

export default PaymentDetailsScreen;
