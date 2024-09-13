import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

const TrackButton = () => {
  return (
    <LinearGradient colors={["#1E262F", "#000000"]} style={styles.trackButton}>
      <View style={styles.contentContainer}>
        <View style={styles.textContainer}>
          <Text style={styles.trackButtonTitle}>TRACK YOUR BUS</Text>
          <Text style={styles.trackButtonTitle}>IN REAL TIME</Text>
          <View style={styles.underline} />
          <Text style={styles.traventText}>TRAVENT</Text>
          <Text style={styles.mapsText}>MAPS</Text>
        </View>
        <View style={styles.mapMarkerImage}>
          <Image
            source={require("../../assets/red-pin.png")}
            style={styles.mapMarker}
          />
        </View>
      </View>
      <TouchableOpacity style={styles.trackButtonContainer}>
        <Text style={styles.trackText}>Track</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  trackButton: {
    borderRadius: 15,
    padding: 15,
    justifyContent: "space-between",
  },
  contentContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },

  textContainer: {
    flex: 1,
  },

  trackButtonTitle: {
    color: "#B8BDC7",
    fontSize: 14,
    fontWeight: "600",
  },

  underline: {
    height: 3,
    width: 60,
    backgroundColor: "#fff",
    marginVertical: 8,
  },
  traventText: {
    color: "#B8BDC7",
    fontSize: 12,
    fontWeight: "bold",
    marginTop: 10,
  },
  mapsText: {
    color: "#fff",
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 8,
  },
  mapMarker: {
    width: 150,
    height: 150,
    resizeMode: "contain",
  },
  trackButtonContainer: {
    backgroundColor: "#1E262F",
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 40,
    alignSelf: "flex-end",
    marginTop: -30,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 3,
  },
  trackText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
  },
});

export default TrackButton;
