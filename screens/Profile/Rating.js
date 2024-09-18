import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Dimensions,
  Animated,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { ArrowLeft, Star, X } from "lucide-react-native";
import { useNavigation } from "@react-navigation/native";
import Toast from "react-native-toast-message";

// Define your custom toast configuration here
const toastConfig = {
  custom_success: ({ text1, hide }) => (
    <CustomToastContent text1={text1} closeToast={hide} duration={5000} />
  ),
};

const RatingItem = ({ title, rating, onRatingChange }) => {
  return (
    <View style={styles.ratingItem}>
      <Text style={styles.ratingTitle}>{title}</Text>
      <View style={styles.starsContainer}>
        {[1, 2, 3, 4, 5].map((star) => (
          <TouchableOpacity key={star} onPress={() => onRatingChange(star)}>
            <Star
              color={star <= rating ? "#00A3FF" : "#353A40"}
              fill={star <= rating ? "#00A3FF" : "none"}
              size={24}
            />
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const ChipButton = ({ title, isSelected, onPress }) => (
  <TouchableOpacity
    style={[styles.chipButton, isSelected && styles.chipButtonSelected]}
    onPress={onPress}
  >
    <Text
      style={[
        styles.chipButtonText,
        isSelected && styles.chipButtonTextSelected,
      ]}
    >
      {title}
    </Text>
  </TouchableOpacity>
);

// Custom Toast Content
const CustomToastContent = ({ text1, closeToast, duration }) => {
  const progressAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    progressAnim.setValue(0);
    Animated.timing(progressAnim, {
      toValue: 1,
      duration: duration,
      useNativeDriver: false,
    }).start();
  }, [duration]);

  return (
    <LinearGradient
      colors={["#353F54", "#222834"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.toastContainer}
    >
      <View style={styles.toastContent}>
        <Text style={styles.toastText}>{text1}</Text>
        <TouchableOpacity onPress={closeToast} style={styles.closeButton}>
          <X color="#fff" size={20} />
        </TouchableOpacity>
      </View>
      <View style={styles.progressBarContainer}>
        <Animated.View
          style={[
            styles.progressBar,
            {
              width: progressAnim.interpolate({
                inputRange: [0, 1],
                outputRange: ["0%", "100%"],
              }),
            },
          ]}
        />
      </View>
    </LinearGradient>
  );
};

const { width } = Dimensions.get("window");

const Rating = () => {
  const navigation = useNavigation();
  const [ratings, setRatings] = useState({
    overall: 0,
    punctuality: 0,
    condition: 0,
    behavior: 0,
    safety: 0,
  });
  const [likes, setLikes] = useState([]);
  const [improvements, setImprovements] = useState([]);
  const [additionalComments, setAdditionalComments] = useState("");

  const handleRatingChange = (category, value) => {
    setRatings((prev) => ({ ...prev, [category]: value }));
  };

  const toggleChip = (array, setArray, item) => {
    setArray((prev) =>
      prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item]
    );
  };

  const handleSubmit = () => {
    // Adjust validation logic to properly check the ratings and arrays
    if (
      Object.values(ratings).some((val) => val === 0) ||
      likes.length === 0 ||
      improvements.length === 0
    ) {
      Toast.show({
        type: "custom_success",
        text1: "Please fill out all required fields!",
        visibilityTime: 5000,
        position: "top",
        autoHide: true,
        onPress: () => Toast.hide(),
        renderCustomContent: ({ hide }) => (
          <CustomToastContent
            text1="Please fill out all required fields!"
            closeToast={hide}
            duration={5000}
          />
        ),
      });
      return;
    }

    // If validation passes, show success toast
    Toast.show({
      type: "custom_success",
      text1: "Rating Submitted Successfully!",
      visibilityTime: 5000,
      position: "top",
      autoHide: true,
      onHide: () => {
        // Navigate to ProfileScreen after toast ends
        navigation.navigate("Profile");
      },
      onPress: () => Toast.hide(),
      renderCustomContent: ({ hide }) => (
        <CustomToastContent
          text1="Rating Submitted Successfully!"
          closeToast={hide}
          duration={5000}
        />
      ),
    });
  };

  return (
    <LinearGradient colors={["#1E262F", "#16171B"]} style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <ScrollView style={styles.scrollView}>
          <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <ArrowLeft color="#fff" size={24} />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Rating</Text>
          </View>

          <View style={styles.content}>
            <RatingItem
              title="Overall Satisfaction"
              rating={ratings.overall}
              onRatingChange={(value) => handleRatingChange("overall", value)}
            />
            <RatingItem
              title="Punctuality of the Bus"
              rating={ratings.punctuality}
              onRatingChange={(value) =>
                handleRatingChange("punctuality", value)
              }
            />
            <RatingItem
              title="Condition and Cleanliness of the Bus"
              rating={ratings.condition}
              onRatingChange={(value) => handleRatingChange("condition", value)}
            />
            <RatingItem
              title="Behavior and Attitude of the Bus Driver"
              rating={ratings.behavior}
              onRatingChange={(value) => handleRatingChange("behavior", value)}
            />
            <RatingItem
              title="Safety and Security on the Bus"
              rating={ratings.safety}
              onRatingChange={(value) => handleRatingChange("safety", value)}
            />

            <Text style={styles.sectionTitle}>What did you like about it?</Text>
            <View style={styles.chipContainer}>
              {[
                "SMOOTH RIDE",
                "FAST TRAVEL",
                "CLEANLINESS",
                "CONVENIENT",
                "GOOD MUSIC SYSTEM",
              ].map((item) => (
                <ChipButton
                  key={item}
                  title={item}
                  isSelected={likes.includes(item)}
                  onPress={() => toggleChip(likes, setLikes, item)}
                />
              ))}
            </View>

            <Text style={styles.sectionTitle}>What could be improved?</Text>
            <View style={styles.chipContainer}>
              {[
                "CLEANLINESS",
                "SEATING",
                "OVERCROWDING",
                "NO SERVICE DURING SPECIAL EVENTS",
              ].map((item) => (
                <ChipButton
                  key={item}
                  title={item}
                  isSelected={improvements.includes(item)}
                  onPress={() =>
                    toggleChip(improvements, setImprovements, item)
                  }
                />
              ))}
            </View>

            <Text style={styles.sectionTitle}>Anything else?</Text>
            <View style={[styles.inputWrapper, styles.textAreaWrapper]}>
              <TextInput
                style={[styles.input, styles.textArea]}
                value={additionalComments}
                onChangeText={setAdditionalComments}
                placeholder="Tell us everything."
                placeholderTextColor="#999"
                multiline
                numberOfLines={4}
              />
            </View>
          </View>
        </ScrollView>
        <View style={styles.buttonWrapper}>
          <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
            <Text style={styles.submitButtonText}>Submit</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
      {/* Include Toast component */}
      <Toast config={toastConfig} />
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
    paddingTop: 40,
    paddingBottom: 20,
  },
  headerTitle: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
    marginLeft: 20,
  },
  content: {
    paddingHorizontal: 16,
  },
  ratingItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  ratingTitle: {
    color: "#fff",
    fontSize: 14,
    flex: 1,
  },
  starsContainer: {
    flexDirection: "row",
  },
  sectionTitle: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 14,
  },
  chipContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 10,
  },
  chipButton: {
    backgroundColor: "#353A40",
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginRight: 8,
    marginBottom: 8,
  },
  chipButtonSelected: {
    backgroundColor: "#00A3FF",
  },
  chipButtonText: {
    color: "#fff",
    fontSize: 12,
  },
  chipButtonTextSelected: {
    fontWeight: "bold",
  },
  inputWrapper: {
    borderBottomWidth: 1,
    borderBottomColor: "#666",
    backgroundColor: "#2E323B",
    borderRadius: 10,
    paddingHorizontal: 10,
  },
  input: {
    color: "#FFFFFF",
    fontSize: 14,
    paddingVertical: 10,
  },
  textAreaWrapper: {
    height: 100,
  },
  textArea: {
    height: 90,
    textAlignVertical: "top",
  },
  buttonWrapper: {
    paddingHorizontal: 50,
    paddingVertical: 20,
  },
  submitButton: {
    backgroundColor: "#00A3FF",
    borderRadius: 50,
    paddingVertical: 14,
    alignItems: "center",
  },
  submitButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  toastContainer: {
    width: width * 0.9,
    paddingVertical: 15,
    paddingHorizontal: 15,
    borderRadius: 10,
    alignSelf: "center",
    justifyContent: "center",
    marginTop: 60,
  },
  toastContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  toastText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  progressBarContainer: {
    marginTop: 10,
    backgroundColor: "#333",
    height: 4,
    borderRadius: 2,
    overflow: "hidden",
  },
  progressBar: {
    height: "100%",
    backgroundColor: "#00A3FF",
    borderRadius: 2,
  },
  closeButton: {
    paddingLeft: 10,
  },
});

export default Rating;
