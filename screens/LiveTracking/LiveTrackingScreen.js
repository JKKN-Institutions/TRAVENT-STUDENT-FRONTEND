import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Animated,
} from "react-native";
import MapView, { Marker, Polyline } from "react-native-maps";
import { ArrowLeft, ChevronLeft } from "lucide-react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { ScrollView } from "react-native-gesture-handler";

const { width, height } = Dimensions.get("window");
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

// Mock data for steps
const steps = [
  {
    name: "Seelanaikenpatty",
    latitude: 37.78825,
    longitude: -122.4324,
    time: "07:45 AM",
    passengers: 10,
  },
  {
    name: "Kakapalayam",
    latitude: 37.79825,
    longitude: -122.4424,
    time: "08:05 AM",
    passengers: 18,
    distance: 24.8,
  },
  {
    name: "Sankagiri",
    latitude: 37.80825,
    longitude: -122.4524,
    time: "08:25 AM",
    passengers: 20,
  },
  {
    name: "Velayakaranur",
    latitude: 37.81825,
    longitude: -122.4624,
    time: "08:45 AM",
    passengers: 13,
  },
  {
    name: "JKKN Institution",
    latitude: 37.82825,
    longitude: -122.4724,
    time: "08:50 AM",
    description: "Final Destination",
    isDestination: true,
  },
];

const LiveTrackingScreen = () => {
  const navigation = useNavigation();
  const [isExpanded, setIsExpanded] = useState(false);
  const slideAnim = useRef(new Animated.Value(0)).current;
  const [busLocation, setBusLocation] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
  });

  // Simulate bus movement
  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      if (index < steps.length - 1) {
        setBusLocation(steps[index]);
        index += 1;
      } else {
        clearInterval(interval);
      }
    }, 3000); // Move every 3 seconds
    return () => clearInterval(interval);
  }, []);

  const toggleExpand = () => {
    const toValue = isExpanded ? 0 : 2.9;
    Animated.spring(slideAnim, {
      toValue,
      useNativeDriver: true,
    }).start();
    setIsExpanded(!isExpanded);
  };

  const slideInterpolate = slideAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [height - 200, height / 2],
  });

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: busLocation.latitude,
          longitude: busLocation.longitude,
          latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA,
        }}
      >
        {/* Render all step markers */}
        {steps.map((step, index) => (
          <Marker
            key={index}
            coordinate={{ latitude: step.latitude, longitude: step.longitude }}
            title={step.name}
            description={step.description || `Scheduled time: ${step.time}`}
            pinColor={step.isDestination ? "red" : "blue"} // Red for destination, blue for other steps
          />
        ))}

        {/* Bus Marker (Simulating the bus's current location) */}
        <Marker
          coordinate={busLocation}
          title="Bus Location"
          description="Current bus location"
        >
          <View style={styles.busMarker}>
            <Ionicons name="bus" size={24} color="#FFD700" />
          </View>
        </Marker>

        {/* Polyline showing the path */}
        <Polyline
          coordinates={steps.map((step) => ({
            latitude: step.latitude,
            longitude: step.longitude,
          }))}
          strokeColor="#4a90e2"
          strokeWidth={3}
        />
      </MapView>

      {/* Back button */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate("Home")}>
          <ArrowLeft color="#333" size={24} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Live Tracking</Text>
      </View>

      {/* Bottom sheet for steps */}
      <Animated.View
        style={[
          styles.bottomSheet,
          { transform: [{ translateY: slideInterpolate }] },
        ]}
      >
        <LinearGradient
          colors={["#1E262F", "#16171B"]}
          style={styles.bottomSheetContent}
        >
          <View style={styles.handle} />
          <Text style={styles.title}>Steps</Text>
          <ScrollView style={styles.stepsContainer}>
            {steps.map((step, index) => (
              <Step
                key={index}
                name={step.name}
                time={step.time}
                passengers={step.passengers}
                isCompleted={busLocation.latitude > step.latitude}
                isDestination={step.isDestination}
                description={step.description}
              />
            ))}
          </ScrollView>
        </LinearGradient>
      </Animated.View>

      {/* Expand/collapse button */}
      <TouchableOpacity style={styles.expandButton} onPress={toggleExpand}>
        <Ionicons
          name={isExpanded ? "chevron-down" : "chevron-up"}
          size={24}
          color="#fff"
        />
      </TouchableOpacity>
    </View>
  );
};

const Step = ({
  name,
  time,
  passengers,
  isCompleted,
  isDestination,
  description,
}) => (
  <View style={styles.step}>
    <View style={styles.stepIndicator}>
      {isCompleted ? (
        <Ionicons name="checkmark-circle" size={20} color="#4CD964" />
      ) : (
        <View
          style={[
            styles.stepDot,
            isDestination && { backgroundColor: "#FF3B30" },
          ]}
        />
      )}
      {!isDestination && <View style={styles.stepLine} />}
    </View>
    <View style={styles.stepContent}>
      <Text style={styles.stepName}>{name}</Text>
      <Text style={styles.stepTime}>{time}</Text>
      {passengers && (
        <Text style={styles.stepPassengers}>
          Passenger Scheduled: {passengers}
        </Text>
      )}
      {description && <Text style={styles.stepDescription}>{description}</Text>}
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1E262F",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 40,
    paddingHorizontal: 20,
  },
  headerTitle: {
    color: "#333",
    fontSize: 24,
    fontWeight: "bold",
    marginLeft: 20,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  backButton: {
    position: "absolute",
    top: 40,
    left: 20,
    backgroundColor: "rgba(0,0,0,0.5)",
    borderRadius: 20,
    padding: 10,
  },
  bottomSheet: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    height: height - 200,
    backgroundColor: "transparent",
  },
  bottomSheetContent: {
    flex: 1,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
  },
  handle: {
    width: 40,
    height: 5,
    backgroundColor: "#fff",
    borderRadius: 3,
    alignSelf: "center",
    marginBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 20,
  },
  stepsContainer: {
    flex: 1,
  },
  step: {
    flexDirection: "row",
    marginBottom: 20,
  },
  stepIndicator: {
    alignItems: "center",
    marginRight: 15,
  },
  stepDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: "#4a90e2",
  },
  stepLine: {
    width: 2,
    flex: 1,
    backgroundColor: "#4a90e2",
    marginTop: 5,
  },
  stepContent: {
    flex: 1,
  },
  stepName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
  },
  stepTime: {
    fontSize: 14,
    color: "#B8BDC7",
    marginTop: 2,
  },
  stepPassengers: {
    fontSize: 12,
    color: "#B8BDC7",
    marginTop: 2,
  },
  stepDescription: {
    fontSize: 12,
    color: "#B8BDC7",
    marginTop: 2,
  },
  expandButton: {
    position: "absolute",
    bottom: 20,
    alignSelf: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
    borderRadius: 20,
    padding: 10,
  },
  busMarker: {
    backgroundColor: "#1E262F",
    borderRadius: 15,
    padding: 5,
  },
});

export default LiveTrackingScreen;
