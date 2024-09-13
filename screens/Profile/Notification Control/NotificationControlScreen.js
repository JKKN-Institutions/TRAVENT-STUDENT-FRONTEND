import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Switch,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { ArrowLeft, ChevronRight } from "lucide-react-native";
import Navbar from "../../Home/Navbar";
import AsyncStorage from "@react-native-async-storage/async-storage"; // Import AsyncStorage

const NotificationControlScreen = ({ navigation }) => {
  const [enableNotification, setEnableNotification] = useState(false);
  const [vibrate, setVibrate] = useState(false);
  const [selectedSound, setSelectedSound] = useState("Beep");

  // Load settings from AsyncStorage when the component mounts
  useEffect(() => {
    const loadSettings = async () => {
      try {
        const savedSound = await AsyncStorage.getItem("notificationSound");
        const savedVibrate = await AsyncStorage.getItem("vibrate");
        if (savedSound) {
          setSelectedSound(savedSound);
        }
        if (savedVibrate !== null) {
          setVibrate(JSON.parse(savedVibrate));
        }
      } catch (error) {
        console.log("Error loading settings:", error);
      }
    };

    loadSettings();
  }, []);

  return (
    <LinearGradient colors={["#1E262F", "#16171B"]} style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <ScrollView style={styles.scrollView}>
          <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <ArrowLeft color="#fff" size={24} />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Notification Control</Text>
          </View>

          <View style={styles.settingsContainer}>
            <View style={styles.settingItem}>
              <Text style={styles.settingText}>Enable Notification</Text>
              <Switch
                value={enableNotification}
                onValueChange={setEnableNotification}
                trackColor={{ false: "#767577", true: "#81b0ff" }}
                thumbColor={enableNotification ? "#f5dd4b" : "#f4f3f4"}
              />
            </View>
            <Text style={styles.settingDescription}>
              Get real-time bus updates; turn off notifications to silence
              alerts.
            </Text>

            <TouchableOpacity
              style={styles.settingItem}
              onPress={() => navigation.navigate("NotificationSound")}
            >
              <Text style={styles.settingText}>Notification Sound</Text>
              <View style={styles.soundSelection}>
                <Text style={styles.selectedSound}>{selectedSound}</Text>
                <ChevronRight color="#888" size={22} />
              </View>
            </TouchableOpacity>

            <View style={styles.settingItem}>
              <Text style={styles.settingText}>Vibrate</Text>
              <Switch
                value={vibrate}
                onValueChange={async (value) => {
                  setVibrate(value);
                  try {
                    await AsyncStorage.setItem(
                      "vibrate",
                      JSON.stringify(value)
                    );
                  } catch (error) {
                    console.log("Error saving vibrate setting:", error);
                  }
                }}
                trackColor={{ false: "#767577", true: "#81b0ff" }}
                thumbColor={vibrate ? "#f5dd4b" : "#f4f3f4"}
              />
            </View>
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
  settingsContainer: {
    paddingHorizontal: 16,
  },
  settingItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#353A40",
  },
  settingText: {
    color: "#fff",
    fontSize: 16,
  },
  settingDescription: {
    color: "#888",
    fontSize: 14,
    marginTop: 8,
    marginBottom: 16,
  },
  soundSelection: {
    flexDirection: "row",
    alignItems: "center",
  },
  selectedSound: {
    color: "#888",
    fontSize: 16,
    marginRight: 8,
  },
});

export default NotificationControlScreen;
