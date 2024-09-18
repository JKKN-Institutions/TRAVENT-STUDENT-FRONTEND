import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import {
  ArrowLeft,
  Download,
  Share2,
  CheckCircle,
  User,
  Calendar,
  CreditCard,
  MapPin,
  Info,
} from "lucide-react-native";
import QRCode from "react-native-qrcode-svg";

const { width, height } = Dimensions.get("window");

const EReceiptScreen = ({ route }) => {
  const navigation = useNavigation();
  const { totalAmount, paymentMethod } = route.params;

  const receiptDetails = {
    transactionId: "#RE25664HG23",
    name: "Vinayagar S",
    year: "II Year",
    department: "Mechanical Engineering",
    feeCategory: "II Year - Term 2&3",
    paymentDate: "June 29, 2024 | 10:00 AM",
    paymentMethod: paymentMethod,
    busRoute: "Route 17: Seelanaickenpatti - JKKN College",
    validUntil: "December 31, 2024",
  };

  const DetailCard = ({ icon: Icon, title, value, description }) => (
    <View style={styles.detailCard}>
      <View style={styles.detailIconContainer}>
        <Icon color="#4a90e2" size={24} />
      </View>
      <View style={styles.detailTextContainer}>
        <Text style={styles.detailTitle}>{title}</Text>
        <Text style={styles.detailValue}>{value}</Text>
        {description && (
          <Text style={styles.detailDescription}>{description}</Text>
        )}
      </View>
    </View>
  );

  return (
    <LinearGradient colors={["#1E262F", "#16171B"]} style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <ArrowLeft color="#fff" size={24} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>E-Receipt</Text>
      </View>
      <ScrollView style={styles.content}>
        <View style={styles.receiptContainer}>
          <LinearGradient
            colors={["#4a90e2", "#357abd"]}
            style={styles.gradientHeader}
          >
            <View style={styles.logoContainer}>
              <Image
                source={require("../../assets/splash.png")}
                style={styles.logo}
              />
              <Text style={styles.appName}>Travent</Text>
            </View>
          </LinearGradient>
          <View style={styles.mainContent}>
            <View style={styles.statusContainer}>
              <CheckCircle color="#4CAF50" size={24} />
              <Text style={styles.statusText}>Payment Successful</Text>
            </View>
            <View style={styles.amountContainer}>
              <Text style={styles.amountLabel}>Total Amount Paid</Text>
              <Text style={styles.amountValue}>₹{totalAmount}</Text>
            </View>
            <View style={styles.qrCodeContainer}>
              <QRCode
                value={receiptDetails.transactionId}
                size={width * 0.3}
                color="#1a2a3a"
                backgroundColor="transparent"
              />
              <Text style={styles.transactionId}>
                {receiptDetails.transactionId}
              </Text>
            </View>
            <View style={styles.detailsContainer}>
              <DetailCard
                icon={User}
                title="Student Details"
                value={`${receiptDetails.name}, ${receiptDetails.year}`}
                description={`Department: ${receiptDetails.department}`}
              />
              <DetailCard
                icon={Calendar}
                title="Payment Date"
                value={receiptDetails.paymentDate}
                description={`Valid Until: ${receiptDetails.validUntil}`}
              />
              <DetailCard
                icon={CreditCard}
                title="Payment Method"
                value={receiptDetails.paymentMethod}
                description={`Fee Category: ${receiptDetails.feeCategory}`}
              />
              <DetailCard
                icon={MapPin}
                title="Bus Route"
                value={receiptDetails.busRoute}
              />
              <DetailCard
                icon={Info}
                title="Additional Information"
                value="This e-receipt serves as proof of payment for your bus pass."
                description="Please keep this receipt for your records."
              />
            </View>
          </View>
        </View>
      </ScrollView>
      <View style={styles.footer}>
        <TouchableOpacity style={styles.button}>
          <Share2 color="#fff" size={20} style={styles.buttonIcon} />
          <Text style={styles.buttonText}>Share</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.primaryButton]}>
          <Download color="#fff" size={20} style={styles.buttonIcon} />
          <Text style={styles.buttonText}>Download</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: width * 0.05,
    paddingTop: height * 0.06,
    paddingBottom: height * 0.02,
  },
  backButton: {
    padding: 10,
  },
  headerTitle: {
    color: "#fff",
    fontSize: width * 0.06,
    fontWeight: "bold",
    marginLeft: width * 0.04,
  },
  content: {
    flex: 1,
    padding: width * 0.05,
  },
  receiptContainer: {
    backgroundColor: "#fff",
    borderRadius: width * 0.05,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  gradientHeader: {
    padding: width * 0.08,
  },
  logoContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    width: width * 0.15,
    height: width * 0.12,
    marginRight: width * 0.03,
    tintColor: "#fff",
  },
  appName: {
    fontSize: width * 0.08,
    fontWeight: "bold",
    color: "#fff",
  },
  mainContent: {
    padding: width * 0.04,
  },
  statusContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#e8f5e9",
    padding: width * 0.04,
    borderRadius: width * 0.02,
    marginBottom: height * 0.03,
  },
  statusText: {
    color: "#2e7d32",
    fontSize: width * 0.045,
    fontWeight: "bold",
    marginLeft: width * 0.02,
  },
  amountContainer: {
    alignItems: "center",
    marginBottom: height * 0.04,
  },
  amountLabel: {
    fontSize: width * 0.04,
    color: "#666",
    marginBottom: height * 0.01,
  },
  amountValue: {
    fontSize: width * 0.12,
    fontWeight: "bold",
    color: "#1a2a3a",
  },
  qrCodeContainer: {
    alignItems: "center",
    marginBottom: height * 0.04,
  },
  transactionId: {
    color: "#1a2a3a",
    fontSize: width * 0.04,
    fontWeight: "bold",
    marginTop: height * 0.02,
  },
  detailsContainer: {
    marginBottom: height * 0.03,
  },
  detailCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    borderRadius: width * 0.03,
    padding: width * 0.04,
    marginBottom: height * 0.02,
  },
  detailIconContainer: {
    backgroundColor: "rgba(74, 144, 226, 0.1)",
    borderRadius: width * 0.02,
    padding: width * 0.02,
    marginRight: width * 0.03,
  },
  detailTextContainer: {
    flex: 1,
  },
  detailTitle: {
    color: "#666",
    fontSize: width * 0.035,
    marginBottom: height * 0.005,
  },
  detailValue: {
    color: "#1a2a3a",
    fontSize: width * 0.04,
    fontWeight: "600",
    marginBottom: height * 0.005,
  },
  detailDescription: {
    color: "#666",
    fontSize: width * 0.035,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: width * 0.05,
    backgroundColor: "rgba(255,255,255,0.1)",
  },
  button: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#34495e",
    padding: width * 0.04,
    borderRadius: width * 0.02,
    marginHorizontal: width * 0.02,
  },
  primaryButton: {
    backgroundColor: "#4a90e2",
  },
  buttonIcon: {
    marginRight: width * 0.02,
  },
  buttonText: {
    color: "#fff",
    fontSize: width * 0.04,
    fontWeight: "bold",
  },
});

export default EReceiptScreen;
