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
import { ArrowLeft, X } from "lucide-react-native";
import { Picker } from "@react-native-picker/picker";
import { useNavigation } from "@react-navigation/native";
import Toast from "react-native-toast-message";

const { width } = Dimensions.get("window");

const InputField = ({
  label,
  value,
  onChangeText,
  placeholder,
  editable = true,
  icon,
}) => (
  <View style={styles.inputContainer}>
    <Text style={styles.label}>{label}</Text>
    <View style={styles.inputWrapper}>
      <TextInput
        style={[styles.input, !editable && styles.disabledInput]}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor="#999"
        editable={editable}
      />
      {icon && icon}
    </View>
  </View>
);

const CustomToastContent = ({ text1, closeToast, duration }) => {
  const progressAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Reset the progress bar whenever the toast is shown
    progressAnim.setValue(0);
    Animated.timing(progressAnim, {
      toValue: 1,
      duration: duration, // Sync with toast visibility time
      useNativeDriver: false,
    }).start();
  }, [duration]);

  return (
    <LinearGradient
      colors={["#353F54", "#222834"]} // Define your gradient colors here
      start={{ x: 0, y: 0 }} // Gradient start point (top left)
      end={{ x: 1, y: 1 }} // Gradient end point (bottom right)
      style={styles.toastContainer} // Apply styles to the container
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

const Grievances = () => {
  const navigation = useNavigation();
  const [routeNo, setRouteNo] = useState("");
  const [driverName, setDriverName] = useState("");
  const [option, setOption] = useState("");
  const [comments, setComments] = useState("");

  const handleSubmit = () => {
    // Validate required fields (Route No and Driver Name)
    if (routeNo.trim() === "" || driverName.trim() === "") {
      Toast.show({
        type: "custom_success",
        text1: "Please fill out all required fields!",
        visibilityTime: 5000, // Set visibility time to 5 seconds
        position: "top",
        autoHide: true,
        onPress: () => Toast.hide(), // Hide on press (optional)
        renderCustomContent: ({ hide }) => (
          <CustomToastContent
            text1="Please fill out all required fields!"
            closeToast={hide}
            duration={5000}
          />
        ),
      });
      return; // Stop submission if validation fails
    }

    // If validation passes, show success toast
    Toast.show({
      type: "custom_success",
      text1: "Feedback Sent Successfully!",
      visibilityTime: 5000, // Set visibility time to 5 seconds
      position: "top",
      autoHide: true,
      onHide: () => {
        // Navigate to ProfileScreen after toast ends
        navigation.navigate("Profile");
      },
      onPress: () => Toast.hide(), // Hide on press (optional)
      renderCustomContent: ({ hide }) => (
        <CustomToastContent
          text1="Feedback Sent Successfully!"
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
            <Text style={styles.headerTitle}>Grievances</Text>
          </View>

          <View style={styles.formContainer}>
            <InputField
              label="Route No *"
              value={routeNo}
              onChangeText={setRouteNo}
              placeholder="Enter route number"
            />
            <InputField
              label="Driver Name *"
              value={driverName}
              onChangeText={setDriverName}
              placeholder="Enter driver name"
            />
            <View style={styles.inputContainer}>
              <Text style={styles.label}>
                Choose Option that best suits your request
              </Text>
              <View style={styles.pickerWrapper}>
                <Picker
                  selectedValue={option}
                  onValueChange={(itemValue) => setOption(itemValue)}
                  style={styles.picker}
                  dropdownIconColor="#999"
                >
                  <Picker.Item label="Select" value="" />
                  <Picker.Item
                    value="Option 1"
                    label="Are you making a compliment?"
                  />
                  <Picker.Item
                    value="Option 2"
                    label="Are you making a complaint?"
                  />
                  <Picker.Item
                    value="Option 3"
                    label="Are you making a suggestion?"
                  />
                  <Picker.Item
                    value="Option 4"
                    label="Reporting a problem or fix?"
                  />
                  <Picker.Item
                    value="Option 5"
                    label="Are you requesting something new?"
                  />
                </Picker>
              </View>
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Comments</Text>
              <View style={[styles.inputWrapper, styles.textAreaWrapper]}>
                <TextInput
                  style={[styles.input, styles.textArea]}
                  value={comments}
                  onChangeText={setComments}
                  placeholder="Enter your comments"
                  placeholderTextColor="#999"
                  multiline
                  numberOfLines={4}
                />
              </View>
            </View>
          </View>
        </ScrollView>
        <View style={styles.buttonWrapper}>
          <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
            <Text style={styles.submitButtonText}>Submit</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
      <Toast config={toastConfig} />
    </LinearGradient>
  );
};

// Custom toast configuration
const toastConfig = {
  custom_success: ({ text1, hide }) => (
    <CustomToastContent text1={text1} closeToast={hide} duration={5000} />
  ),
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  safeArea: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    paddingHorizontal: 16,
    paddingTop: 40,
    alignItems: "center",
  },
  headerTitle: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
    marginLeft: 20,
  },
  formContainer: {
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    color: "#fff",
    fontSize: 14,
    marginBottom: 8,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#666",
    paddingBottom: 5,
    backgroundColor: "#2E323B",
    borderRadius: 10,
    paddingHorizontal: 10,
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  input: {
    flex: 1,
    height: 40,
    color: "#FFFFFF",
    fontSize: 14,
    paddingVertical: 0,
    paddingHorizontal: 10,
    borderWidth: 0,
  },
  disabledInput: {
    color: "#999",
  },
  pickerWrapper: {
    borderBottomWidth: 1,
    borderBottomColor: "#666",
    backgroundColor: "#2E323B",
    borderRadius: 10,
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  picker: {
    color: "#fff",
    height: 50,
    width: "100%",
  },
  textAreaWrapper: {
    height: 100,
    alignItems: "flex-start",
  },
  textArea: {
    height: 90,
    textAlignVertical: "top",
    paddingTop: 10,
  },
  buttonWrapper: {
    paddingHorizontal: 50,
    paddingVertical: 10,
  },
  submitButton: {
    backgroundColor: "#00A3FF",
    borderRadius: 50,
    paddingVertical: 14,
    paddingHorizontal: 30,
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

export default Grievances;
