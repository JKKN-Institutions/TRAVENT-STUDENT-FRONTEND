import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { ArrowLeft, Check } from "lucide-react-native";
import { Audio } from "expo-av";
import { Asset } from "expo-asset"; // Import expo-asset
import Slider from "@react-native-community/slider";
import AsyncStorage from "@react-native-async-storage/async-storage"; // Import AsyncStorage
import Navbar from "../../Home/Navbar";

const NotificationSoundScreen = ({ navigation }) => {
  const [notificationVolume, setNotificationVolume] = useState(0.5);
  const [selectedSound, setSelectedSound] = useState("Beep");
  const [audioSound, setAudioSound] = useState(null);

  // Load and prepare assets using expo-asset
  const sounds = [
    {
      name: "Beep",
      file: Asset.fromModule(require("../../../assets/sounds/beep.mp3")),
    },
    {
      name: "Chime",
      file: Asset.fromModule(require("../../../assets/sounds/chime.mp3")),
    },
    {
      name: "Ding",
      file: Asset.fromModule(require("../../../assets/sounds/ding.mp3")),
    },
    {
      name: "Bell",
      file: Asset.fromModule(require("../../../assets/sounds/bell.mp3")),
    },
  ];

  const playSound = async (sound) => {
    try {
      if (audioSound) {
        await audioSound.unloadAsync(); // Stop any sound already playing
      }
      await sound.file.downloadAsync(); // Make sure the sound file is loaded
      const { sound: newSound } = await Audio.Sound.createAsync(sound.file);
      setAudioSound(newSound);
      await newSound.setVolumeAsync(notificationVolume);
      await newSound.playAsync();
    } catch (error) {
      console.log("Error playing sound:", error);
    }
  };

  // Load saved notification sound and volume from AsyncStorage
  useEffect(() => {
    const loadSettings = async () => {
      try {
        const savedSound = await AsyncStorage.getItem("notificationSound");
        const savedVolume = await AsyncStorage.getItem("notificationVolume");
        if (savedSound) {
          setSelectedSound(savedSound);
        }
        if (savedVolume) {
          setNotificationVolume(parseFloat(savedVolume));
        }
      } catch (error) {
        console.log("Error loading settings:", error);
      }
    };

    loadSettings();
  }, []);

  // Save the selected sound and volume to AsyncStorage
  const saveSettings = async () => {
    try {
      await AsyncStorage.setItem("notificationSound", selectedSound);
      await AsyncStorage.setItem(
        "notificationVolume",
        notificationVolume.toString()
      );
    } catch (error) {
      console.log("Error saving settings:", error);
    }
  };

  useEffect(() => {
    return audioSound
      ? () => {
          audioSound.unloadAsync(); // Unload the sound from memory
        }
      : undefined;
  }, [audioSound]);

  return (
    <LinearGradient colors={["#1E262F", "#16171B"]} style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <ScrollView style={styles.scrollView}>
          <View style={styles.header}>
            <TouchableOpacity
              onPress={() => {
                saveSettings(); // Save settings before going back
                navigation.goBack();
              }}
            >
              <ArrowLeft color="#fff" size={24} />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Notification Sound</Text>
          </View>

          <View style={styles.settingsContainer}>
            <Text style={styles.sectionTitle}>Notification Volume</Text>
            <Slider
              style={styles.slider}
              minimumValue={0}
              maximumValue={1}
              value={notificationVolume}
              onValueChange={(value) => {
                setNotificationVolume(value);
                if (audioSound) {
                  audioSound.setVolumeAsync(value); // Update volume on the current playing sound
                }
              }}
              minimumTrackTintColor="#81b0ff"
              maximumTrackTintColor="#767577"
              thumbTintColor="#f5dd4b"
            />

            <Text style={styles.sectionTitle}>Notification Sound</Text>
            {sounds.map((sound) => (
              <TouchableOpacity
                key={sound.name}
                style={styles.soundItem}
                onPress={() => {
                  setSelectedSound(sound.name);
                  playSound(sound);
                }}
              >
                <Text style={styles.soundName}>{sound.name}</Text>
                {selectedSound === sound.name && (
                  <Check color="#81b0ff" size={22} />
                )}
              </TouchableOpacity>
            ))}
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
  sectionTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 24,
    marginBottom: 16,
  },
  slider: {
    width: "100%",
    height: 40,
  },
  soundItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#353A40",
  },
  soundName: {
    color: "#fff",
    fontSize: 16,
  },
});

export default NotificationSoundScreen;
