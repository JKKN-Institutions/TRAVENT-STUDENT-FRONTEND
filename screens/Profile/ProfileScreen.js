import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import {
  ArrowLeft,
  User,
  FileText,
  Bell,
  Star,
  LogOut,
  ChevronLeft,
} from "lucide-react-native";

import Navbar from "../Home/Navbar";
import Logout from "../Profile/Logout";
import { useNavigation } from "@react-navigation/native";

const { width } = Dimensions.get("window");

const ProfileOption = ({ icon: Icon, title, onPress }) => (
  <TouchableOpacity style={styles.optionContainer} onPress={onPress}>
    <Icon color="#999" size={22} />
    <Text style={styles.optionText}>{title}</Text>
    <ChevronLeft color="#888" size={22} style={styles.arrowIcon} />
  </TouchableOpacity>
);

const ProfileScreen = () => {
  const navigation = useNavigation();
  const [showLogoutOverlay, setShowLogoutOverlay] = useState(false);

  const handleLogout = () => {
    setShowLogoutOverlay(true);
  };

  const handleLogoutConfirm = () => {
    setShowLogoutOverlay(false);
    navigation.navigate("Login");
  };

  const handleLogoutCancel = () => {
    setShowLogoutOverlay(false);
  };

  return (
    <LinearGradient colors={["#1E262F", "#16171B"]} style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <ScrollView style={styles.scrollView}>
          <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.navigate("Home")}>
              <ArrowLeft color="#fff" size={24} />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Profile</Text>
          </View>

          <View style={styles.profileInfo}>
            <View style={styles.avatarPlaceholder}>
              <User color="#888" size={48} />
            </View>
            <Text style={styles.userName}>Vinayagar S</Text>
            <Text style={styles.userEmail}>vinayagar@jkkn.ac.in</Text>
          </View>

          <View style={styles.optionsContainer}>
            <ProfileOption
              icon={User}
              title="Your profile"
              onPress={() => navigation.navigate("YourProfile")}
            />
            <ProfileOption
              icon={FileText}
              title="Grievances"
              onPress={() => navigation.navigate("Grievances")}
            />
            <ProfileOption
              icon={Bell}
              title="Notification Control"
              onPress={() => navigation.navigate("NotificationControl")}
            />
            <ProfileOption
              icon={Star}
              title="Rating"
              onPress={() => navigation.navigate("Rating")}
            />
            <ProfileOption
              icon={LogOut}
              title="Logout"
              onPress={handleLogout}
            />
          </View>
        </ScrollView>
        <Navbar />
      </SafeAreaView>
      {showLogoutOverlay && (
        <Logout onConfirm={handleLogoutConfirm} onCancel={handleLogoutCancel} />
      )}
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 40,
  },
  headerTitle: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
    marginLeft: 20,
  },
  profileInfo: {
    alignItems: "center",
    marginTop: 0,
    marginBottom: 40,
  },
  avatarPlaceholder: {
    width: 90,
    height: 90,
    borderRadius: 50,
    backgroundColor: "#353A40",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
  userName: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
  },
  userEmail: {
    color: "#888",
    fontSize: 14,
  },
  optionsContainer: {
    paddingHorizontal: 16,
  },
  optionContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#353A40",
  },
  optionText: {
    color: "#fff",
    fontSize: 14,
    marginLeft: 16,
    flex: 1,
  },
  arrowIcon: {
    transform: [{ rotate: "180deg" }],
  },
});

export default ProfileScreen;
