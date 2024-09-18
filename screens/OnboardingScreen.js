import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Dimensions,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { LinearGradient } from "expo-linear-gradient"; // Import LinearGradient from expo-linear-gradient
import {
  useFonts,
  Inter_400Regular,
  Inter_600SemiBold,
  Inter_700Bold,
} from "@expo-google-fonts/inter";

const { width, height } = Dimensions.get("window");

const Onboarding = ({ navigation }) => {
  const [currentPage, setCurrentPage] = useState(0);

  let [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_600SemiBold,
    Inter_700Bold,
  });

  if (!fontsLoaded) {
    return null;
  }

  const handleNext = () => {
    if (currentPage < 2) {
      setCurrentPage(currentPage + 1);
    } else {
      navigation.navigate("Login");
    }
  };

  const renderContent = () => {
    switch (currentPage) {
      case 0:
        return (
          <>
            <Image
              source={require("../assets/bus.png")}
              style={styles.busImage}
              resizeMode="contain"
            />
            <View style={styles.textContainer}>
              <Text style={styles.title}>Your Commute</Text>
              <Text style={styles.title}>Your Way</Text>
              <Text style={styles.title}>Your Schedule</Text>
              <Text style={styles.description}>
                Quick QR scan for instant attendance and seamless ticketing
                experience.
              </Text>
            </View>
          </>
        );
      case 1:
        return (
          <>
            <Image
              source={require("../assets/bus.png")}
              style={styles.busImage}
              resizeMode="contain"
            />
            <View style={styles.textContainer}>
              <Text style={styles.title}>Navigate Your</Text>
              <Text style={styles.title}>Journey Every</Text>
              <Text style={styles.title}>Step of the Way</Text>
              <Text style={styles.description}>
                Track your bus live, stay informed, and arrive on time, every
                time.
              </Text>
            </View>
          </>
        );
      case 2:
        return (
          <>
            <Image
              source={require("../assets/bus.png")}
              style={styles.busImage}
              resizeMode="contain"
            />
            <View style={styles.textContainer}>
              <Text style={styles.title}>Stay on Track</Text>
              <Text style={styles.title}>with Effortless</Text>
              <Text style={styles.title}>Payments</Text>
              <Text style={styles.description}>
                Simplify payments and stay on top of due dates with personalized
                notifications.
              </Text>
            </View>
          </>
        );
    }
  };

  return (
    <LinearGradient colors={["#1E262F", "#16171B"]} style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.StatusBar}>
          <StatusBar style="light" />
        </View>
        <View style={styles.content}>
          <View style={styles.appNameContainer}>
            <Image
              source={require("../assets/splash.png")}
              style={styles.logo}
            />
            <Text style={styles.appName}>Travent</Text>
          </View>

          <View style={styles.main}>{renderContent()}</View>

          <View style={styles.footer}>
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.button} onPress={handleNext}>
                <Text style={styles.buttonText}>
                  {currentPage === 2 ? "Get Started" : "Next"}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.paginationDots}>
            <View style={[styles.dot, currentPage === 0 && styles.activeDot]} />
            <View style={[styles.dot, currentPage === 1 && styles.activeDot]} />
            <View style={[styles.dot, currentPage === 2 && styles.activeDot]} />
          </View>
        </View>
      </SafeAreaView>
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
  content: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    padding: 20,
    justifyContent: "center",
  },
  appNameContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  logo: {
    width: 60,
    height: 60,
    marginRight: 5,
    borderRadius: 20,
  },
  appName: {
    fontSize: 30,
    color: "#ffffff",
    fontFamily: "Inter_600SemiBold",
  },
  main: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  busImage: {
    width: "100%",
    height: height * 0.3,
    marginBottom: 20,
  },
  textContainer: {
    alignItems: "flex-start",
    paddingHorizontal: 14,
  },
  title: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 34,
    color: "#FFFFFF",
    textAlign: "left",
  },
  description: {
    fontFamily: "Inter_400Regular",
    fontSize: 15,
    color: "#94A3B8",
    textAlign: "left",
    marginTop: 16,
    lineHeight: 30,
  },
  footer: {
    marginTop: 10,
  },
  buttonContainer: {
    width: "100%",
    alignItems: "flex-end",
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#FCD34D",
    paddingVertical: 12,
    paddingHorizontal: 50,
    borderRadius: 30,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 3,
  },
  buttonText: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 16,
    color: "#1E293B",
  },
  paginationDots: {
    flexDirection: "row",
    justifyContent: "center",
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#4B5563",
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: "#FCD34D",
    width: 32,
  },
});

export default Onboarding;
