import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Bell, MapPin } from "lucide-react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation, useNavigationState } from "@react-navigation/native";

const Header = () => {
  const navigation = useNavigation();

  const handleNavigation = () => {
    navigation.navigate("Notifications");
  };

  return (
    <View style={styles.header}>
      <View style={styles.headerTop}>
        <View style={styles.titleRow}>
          <Text style={styles.headerTitle}>TRAVENT</Text>
          <View style={styles.headerRight}>
            <LinearGradient
              colors={["#1E262F", "#16171B"]}
              style={styles.pointsContainer}
            >
              <View style={styles.pointsDot} />
              <Text style={styles.pointsText}>90</Text>
            </LinearGradient>
            <Bell color="#fff" size={24} onPress={handleNavigation} />
          </View>
        </View>
        {/* Updated row for headerSubtitle and headerRight */}
        <View style={styles.subtitleRow}>
          <Text style={styles.headerSubtitle}>Home</Text>
          <View style={styles.locationContainer}>
            <MapPin color="#3b82f6" size={16} />
            <Text style={styles.locationText}>Seelanaickenpatti</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    paddingVertical: 40,
    paddingHorizontal: 20,
    paddingBottom: 0,
  },
  headerTop: {
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  headerTitle: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "500",
    marginBottom: 5,
  },
  titleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },
  subtitleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },
  headerSubtitle: {
    color: "#fff",
    fontSize: 32,
    fontWeight: "bold",
    marginRight: 10, // Add some spacing between subtitle and headerRight
  },
  headerRight: {
    flexDirection: "row",
    alignItems: "center",
  },
  pointsContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#2c2c2c",
    borderRadius: 20,
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginRight: 10, // Added margin between pointsContainer and Bell
  },
  pointsDot: {
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: "#ffd700",
    marginRight: 5,
  },
  pointsText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  locationContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5, // Slight margin between the subtitle and location
  },
  locationText: {
    color: "#fff",
    marginLeft: 5,
    fontSize: 14,
  },
});

export default Header;
