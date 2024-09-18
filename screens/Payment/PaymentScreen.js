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
  ArrowRight,
  ChevronDown,
  ChevronUp,
} from "lucide-react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import Svg, { Path } from "react-native-svg";

const { width, height } = Dimensions.get("window");

const WavyBackground = ({ color }) => (
  <Svg height="100%" width="100%" style={StyleSheet.absoluteFillObject}>
    <Path
      d="M0,96L48,112C96,128,192,160,288,186.7C384,213,480,235,576,213.3C672,192,768,128,864,128C960,128,1056,192,1152,208C1248,224,1344,192,1392,176L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
      fill={color}
      fillOpacity="0.5"
    />
  </Svg>
);

const PaymentCard = ({ title, subtitle, amount, isActive }) => (
  <LinearGradient
    colors={isActive ? ["#4a90e2", "#357abd"] : ["#5a6978", "#414e5c"]}
    start={{ x: 0, y: 0 }}
    end={{ x: 1, y: 1 }}
    style={[styles.card, isActive && styles.activeCard]}
  >
    <WavyBackground color={isActive ? "#6ab0ff" : "#7a8997"} />
    <View style={styles.glossOverlay} />
    <View style={styles.cardContent}>
      <Text style={styles.cardTitle}>{title}</Text>
      <Text style={styles.cardSubtitle}>{subtitle}</Text>
      {amount && <Text style={styles.cardAmount}>{amount}</Text>}
    </View>
  </LinearGradient>
);

const PaymentHistoryItem = ({ term, date, amount, paymentId, status }) => (
  <View style={styles.historyItem}>
    <View>
      <Text style={styles.historyTerm}>{term}</Text>
      <Text style={styles.historyDate}>{date}</Text>
      <Text style={styles.paymentId}>Payment ID: {paymentId}</Text>
    </View>
    <View>
      <Text
        style={[
          styles.historyAmount,
          status === "failed" && styles.failedAmount,
        ]}
      >
        {amount}
      </Text>
      <Text
        style={status === "failed" ? styles.failedStatus : styles.successStatus}
      >
        {status === "failed" ? "Failed" : "Success"}
      </Text>
    </View>
  </View>
);

const YearSection = ({ year, payments, isExpanded, onToggle }) => (
  <View style={styles.yearSection}>
    <TouchableOpacity style={styles.yearHeader} onPress={onToggle}>
      <Text style={styles.yearText}>{year}</Text>
      {isExpanded ? (
        <ChevronUp color="#fff" size={20} />
      ) : (
        <ChevronDown color="#fff" size={20} />
      )}
    </TouchableOpacity>
    {isExpanded &&
      payments.map((payment, index) => (
        <PaymentHistoryItem key={index} {...payment} />
      ))}
  </View>
);

const PaymentScreen = () => {
  const navigation = useNavigation();
  const [expandedYear, setExpandedYear] = useState(null);

  const paymentHistory = {
    "Third Year - (2023-2024)": [
      {
        term: "Term 3 (Online Payment)",
        date: "19/07/2024 - 16:24:56",
        amount: "₹1,500",
        paymentId: "24F5ECE2",
        status: "success",
      },
      {
        term: "Term 2 (Online Payment)",
        date: "16/03/2024 - 10:15:30",
        amount: "₹1,500",
        paymentId: "24B4CDE2",
        status: "success",
      },

      {
        term: "Term 2 (Online Payment)",
        date: "15/03/2024 - 14:30:22",
        amount: "₹1,500",
        paymentId: "24A3BCD1",
        status: "failed",
      },
      {
        term: "Term 1 (Online Payment)",
        date: "10/01/2024 - 09:15:47",
        amount: "₹1,500",
        paymentId: "24D2EFA3",
        status: "success",
      },
    ],
    "Second Year - (2022-2023)": [
      {
        term: "Term 3 (Online Payment)",
        date: "19/07/2023 - 16:24:56",
        amount: "₹1,500",
        paymentId: "23F5ECE2",
        status: "success",
      },
      {
        term: "Term 2 (Online Payment)",
        date: "15/03/2023 - 14:30:22",
        amount: "₹1,500",
        paymentId: "23A3BCD1",
        status: "success",
      },
      {
        term: "Term 1 (Online Payment)",
        date: "10/01/2023 - 09:15:47",
        amount: "₹1,500",
        paymentId: "23D2EFA3",
        status: "success",
      },
    ],
    "First Year - (2021-2022)": [
      {
        term: "Term 3 (Online Payment)",
        date: "19/07/2022 - 16:24:56",
        amount: "₹1,500",
        paymentId: "22F5ECE2",
        status: "success",
      },
      {
        term: "Term 2 (Online Payment)",
        date: "15/03/2022 - 14:30:22",
        amount: "₹1,500",
        paymentId: "22A3BCD1",
        status: "success",
      },
      {
        term: "Term 1 (Online Payment)",
        date: "10/01/2022 - 09:15:47",
        amount: "₹1,500",
        paymentId: "22D2EFA3",
        status: "success",
      },
    ],
  };

  const toggleYear = (year) => {
    setExpandedYear(expandedYear === year ? null : year);
  };
  const handlePayNow = () => {
    navigation.navigate("PaymentDetails");
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate("Home")}>
          <ArrowLeft color="#fff" size={24} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Payment Menu</Text>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.cardContainer}>
          <PaymentCard
            title="Current Term"
            subtitle="Term 1 - 1500 , "
            amount="₹1,500"
            isActive
          />
          <PaymentCard
            title="Next Term"
            subtitle="Term 2 - 1500"
            amount="₹1,500"
          />
        </View>

        <TouchableOpacity style={styles.payNowButton} onPress={handlePayNow}>
          <Text style={styles.rupeeSymbol}>₹</Text>
          <Text style={styles.payNowText}>Pay Now</Text>
          <ArrowRight color="#fff" size={16} />
        </TouchableOpacity>

        <Text style={styles.sectionTitle}>Payment History</Text>
        <View style={styles.historyContainer}>
          {Object.entries(paymentHistory).map(([year, payments]) => (
            <YearSection
              key={year}
              year={year}
              payments={payments}
              isExpanded={expandedYear === year}
              onToggle={() => toggleYear(year)}
            />
          ))}
        </View>
      </ScrollView>

      <TouchableOpacity
        style={styles.helpButton}
        onPress={() => navigation.navigate("PaymentHelp")}
      >
        <Text style={styles.helpButtonText}>Need help with payments?</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1E1E1E",
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
    color: "#fff",
    fontSize: width * 0.045,
    fontWeight: "bold",
    marginBottom: height * 0.02,
  },
  cardContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  card: {
    width: width * 0.44,
    aspectRatio: 0.8,
    borderRadius: width * 0.04,
    padding: width * 0.04,
    justifyContent: "space-between",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    overflow: "hidden",
  },
  glossOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderTopLeftRadius: width * 0.04,
    borderTopRightRadius: width * 0.04,
    height: "50%",
  },
  activeCard: {
    elevation: 8,
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
  },
  cardContent: {
    flex: 1,
    justifyContent: "space-between",
    zIndex: 1,
  },
  cardTitle: {
    color: "#ffffff",
    fontSize: width * 0.045,
    fontWeight: "bold",
  },
  cardSubtitle: {
    color: "#ffffff",
    fontSize: width * 0.035,
    opacity: 0.8,
  },
  cardAmount: {
    color: "#ffffff",
    fontSize: width * 0.06,
    fontWeight: "bold",
  },
  payNowButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#4a90e2",
    paddingVertical: height * 0.015,
    paddingHorizontal: width * 0.06,
    borderRadius: width * 0.1,
    marginVertical: height * 0.03,
  },
  rupeeSymbol: {
    color: "#fff",
    fontSize: width * 0.05,
    fontWeight: "bold",
    marginRight: width * 0.02,
  },
  payNowText: {
    color: "#fff",
    fontSize: width * 0.04,
    fontWeight: "bold",
    marginRight: width * 0.02,
  },
  historyContainer: {
    marginTop: height * 0.01,
  },
  yearSection: {
    marginBottom: height * 0.02,
  },
  yearHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#2C2C2C",
    padding: width * 0.03,
    borderRadius: width * 0.02,
    marginBottom: height * 0.01,
  },
  yearText: {
    color: "#fff",
    fontSize: width * 0.04,
    fontWeight: "bold",
  },
  historyItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#2C2C2C",
    borderRadius: width * 0.04,
    padding: width * 0.04,
    marginBottom: width * 0.03,
  },
  historyTerm: {
    color: "#fff",
    fontSize: width * 0.04,
    fontWeight: "bold",
  },
  historyDate: {
    color: "#888",
    fontSize: width * 0.03,
    marginTop: width * 0.01,
  },
  paymentId: {
    color: "#888",
    fontSize: width * 0.03,
    marginTop: width * 0.01,
  },
  historyAmount: {
    color: "#4a90e2",
    fontSize: width * 0.04,
    fontWeight: "bold",
    textAlign: "right",
  },
  failedAmount: {
    color: "#FF3B30",
  },
  successStatus: {
    color: "#4CAF50",
    fontSize: width * 0.03,
    fontWeight: "bold",
    textAlign: "right",
  },
  failedStatus: {
    color: "#FF3B30",
    fontSize: width * 0.03,
    fontWeight: "bold",
    textAlign: "right",
  },
  helpButton: {
    backgroundColor: "#2C2C2C",
    padding: width * 0.04,
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: "#3C3C3C",
  },
  helpButtonText: {
    color: "#4a90e2",
    fontSize: width * 0.04,
    fontWeight: "bold",
  },
});

export default PaymentScreen;
