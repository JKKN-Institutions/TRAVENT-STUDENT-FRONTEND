import React from "react";
import {
  View,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Dimensions,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Header from "./Header";
import InfoCard from "./InfoCard";
import StatusBar from "./StatusBar";
import ScheduleSection from "./ScheduleSection";
import TrackButton from "./TrackButton";
import Navbar from "./Navbar";

const { height, width } = Dimensions.get("window");

const HomeScreen = () => {
  return (
    <LinearGradient colors={["#1E262F", "#16171B"]} style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollViewContent}
        >
          <Header />
          <View style={styles.content}>
            <View style={styles.infoContainer}>
              <InfoCard title="17" subtitle="Route" />
              <InfoCard title="08:30 AM" subtitle="Time" />
              <InfoCard title="26/07 2024" subtitle="Date" />
            </View>
            <StatusBar />
            <ScheduleSection />
            <TrackButton />
          </View>
        </ScrollView>
        <Navbar />
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
  scrollView: {
    flex: 1,
  },
  scrollViewContent: {
    flexGrow: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: width * 0.015,
    paddingBottom: 20,
  },
  infoContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
});

export default HomeScreen;
