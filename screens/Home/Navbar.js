import React from "react";
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Text,
} from "react-native";
import {
  Home,
  CreditCard,
  ScanLine,
  FileText,
  User,
} from "lucide-react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation, useNavigationState } from "@react-navigation/native";

const { width } = Dimensions.get("window");

const NavItem = ({ icon: Icon, isActive, label, onPress }) => (
  <TouchableOpacity style={styles.navItem} onPress={onPress}>
    <Icon color={isActive ? "#3498db" : "#888"} size={24} />
    <Text style={[styles.navLabel, isActive && styles.activeNavLabel]}>
      {label}
    </Text>
  </TouchableOpacity>
);

const Navbar = () => {
  const navigation = useNavigation();

  // Getting the active route name from the navigation state
  const currentRouteName = useNavigationState(
    (state) => state.routes[state.index].name
  );

  const handleNavigation = (screenName) => {
    navigation.navigate(screenName);
  };

  return (
    <LinearGradient colors={["#353A40", "#16171B"]} style={styles.navbar}>
      <View style={styles.navbarContainer}>
        <View style={styles.container}>
          <NavItem
            icon={Home}
            isActive={currentRouteName === "Home"}
            label="Home"
            onPress={() => handleNavigation("Home")}
          />
          <NavItem
            icon={CreditCard}
            isActive={currentRouteName === "Pay"}
            label="Pay"
            onPress={() => handleNavigation("Pay")}
          />
          {/* Empty space for center button */}
          <View style={styles.centerSpacing} />
          <NavItem
            icon={FileText}
            isActive={currentRouteName === "Report"}
            label="Report"
            onPress={() => handleNavigation("Report")}
          />
          <NavItem
            icon={User}
            isActive={currentRouteName === "Profile"}
            label="Profile"
            onPress={() => handleNavigation("Profile")}
          />
        </View>

        {/* Central Floating Button */}
        <TouchableOpacity
          style={styles.centerButton}
          onPress={() => handleNavigation("Scan")}
        >
          <ScanLine color="#fff" size={32} />
          <Text style={styles.centerButtonLabel}>Scan</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  navbar: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  navbarContainer: {
    bottom: 0,
    left: 0,
    right: 0,
    height: 75,
    backgroundColor: "#1E262F",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  container: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    flex: 1,
  },
  navItem: {
    padding: 10,
    alignItems: "center",
  },
  navLabel: {
    color: "#888",
    fontSize: 12,
    marginTop: 4,
  },
  activeNavLabel: {
    color: "#3498db",
  },
  centerSpacing: {
    width: width * 0.15,
  },
  centerButton: {
    position: "absolute",
    bottom: 25,
    left: "50%",
    transform: [{ translateX: -32 }],
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: "#3498db",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 6,
  },
  centerButtonLabel: {
    color: "#fff",
    fontSize: 12,
    marginTop: 2,
  },
});

export default Navbar;
