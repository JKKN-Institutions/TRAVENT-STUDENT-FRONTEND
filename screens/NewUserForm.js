import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  ScrollView,
  Platform,
  Keyboard,
  TouchableWithoutFeedback,
  Animated,
} from "react-native";
import { ArrowLeft } from "lucide-react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { Feather } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useNavigation } from "@react-navigation/native"; // Assuming you're using react-navigation for routing

const { height, width } = Dimensions.get("window");

const institutions = ["JKKN Arts & Science", "XYZ University", "ABC College"];
const departments = {
  student: ["VISCOM", "Computer Science", "Physics", "Mathematics"],
  staff: ["Admin", "Teaching", "Support"],
};
const years = ["I", "II", "III", "IV"];
const sections = ["A", "B", "C"];
const designations = ["Lecturer", "Assistant Professor", "Professor"];

// Default data for location details
const districts = ["Salem", "Coimbatore", "Madurai"];
const cities = ["Kakapalayam", "Erode", "Ooty"];
const stops = ["Murugan Bakery", "Library Stop", "Bus Terminal"];
const routes = ["15 - Salem - Capacity 55/70", "21 - Erode - Capacity 40/60"];

// Dots component for page navigation
const DotsIndicator = ({ currentStep, totalSteps }) => {
  return (
    <View style={styles.dotsContainer}>
      {Array.from({ length: totalSteps }).map((_, index) => (
        <View
          key={index}
          style={[styles.dot, currentStep === index + 1 && styles.activeDot]}
        />
      ))}
    </View>
  );
};

const InputField = ({
  placeholder,
  value,
  onChangeText,
  secureTextEntry,
  multiline,
}) => (
  <View style={[styles.inputContainer, multiline && styles.textAreaContainer]}>
    <TextInput
      style={[styles.input, multiline && styles.textArea]}
      placeholder={placeholder}
      placeholderTextColor="#999"
      value={value}
      onChangeText={onChangeText}
      secureTextEntry={secureTextEntry}
      underlineColorAndroid="transparent"
      multiline={multiline}
    />
  </View>
);

const NewUserForm = () => {
  const navigation = useNavigation(); // Access navigation to navigate to other pages
  const [step, setStep] = useState(1);
  const [keyboardVisible, setKeyboardVisible] = useState(false);
  const dotsAnim = useState(new Animated.Value(0))[0]; // Animation for the dots

  // Monitor keyboard visibility
  useEffect(() => {
    const keyboardDidShow = () => setKeyboardVisible(true);
    const keyboardDidHide = () => setKeyboardVisible(false);

    const keyboardShowListener = Keyboard.addListener(
      "keyboardDidShow",
      keyboardDidShow
    );
    const keyboardHideListener = Keyboard.addListener(
      "keyboardDidHide",
      keyboardDidHide
    );

    return () => {
      // Use the `remove` method instead of `removeListener`
      keyboardShowListener.remove();
      keyboardHideListener.remove();
    };
  }, []);

  useEffect(() => {
    Animated.timing(dotsAnim, {
      toValue: keyboardVisible ? -30 : 0, // Move the dots when keyboard is open
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [keyboardVisible]);

  // Basic details states
  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState(null);
  const [email, setEmail] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [address, setAddress] = useState("");
  const [showDatePicker, setShowDatePicker] = useState(false);

  // Educational details states
  const [userType, setUserType] = useState(""); // No default selection
  const [institution, setInstitution] = useState("");
  const [department, setDepartment] = useState("");
  const [year, setYear] = useState("");
  const [section, setSection] = useState("");
  const [rollNo, setRollNo] = useState("");
  const [registerNo, setRegisterNo] = useState("");
  const [designation, setDesignation] = useState("");
  const [staffId, setStaffId] = useState("");

  // Location details states
  const [district, setDistrict] = useState("");
  const [city, setCity] = useState("");
  const [stopName, setStopName] = useState("");
  const [routeNo, setRouteNo] = useState("");
  const [acceptTerms, setAcceptTerms] = useState(false);

  // Handle Date Change
  const onDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || dateOfBirth;
    setShowDatePicker(false);
    setDateOfBirth(currentDate);
  };

  // Navigation to switch between forms
  const handleNext = () => {
    if (step === 1) {
      setStep(2); // Move to educational details
    } else if (step === 2) {
      setStep(3); // Move to location details
    } else {
      console.log("Submit form"); // Logic for submitting or navigating further
    }
  };

  const handlePrevious = () => {
    if (step === 1) {
      navigation.navigate("Login"); // Navigate to LoginForm page
    } else if (step === 2) {
      setStep(1); // Move back to basic details
    } else if (step === 3) {
      setStep(2); // Move back to educational details
    }
  };

  // Picker styling for web and mobile consistency, including the icon color
  const pickerStyles = {
    backgroundColor: Platform.OS === "web" ? "transparent" : "transparent", // Ensure the background color for web
    paddingHorizontal: Platform.OS === "web" ? 10 : 0, // Add padding for web
    color: "#fff", // Ensure text color for web and mobile
    border: "none",
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <LinearGradient colors={["#1E262F", "#16171B"]} style={styles.container}>
        <SafeAreaView style={styles.content}>
          <ScrollView
            contentContainerStyle={styles.scrollContent}
            keyboardShouldPersistTaps="handled"
          >
            {step === 1 ? (
              <>
                {/* Basic Details Form */}
                <Text style={styles.title}>
                  Provide
                  <Text> </Text>
                  <Text style={styles.subTitle}>Basic Details</Text>
                </Text>

                <View style={styles.inputOverContainer}>
                  <InputField
                    placeholder="Name"
                    value={name}
                    onChangeText={setName}
                  />

                  <View style={styles.inputContainer}>
                    <Picker
                      selectedValue={gender}
                      onValueChange={(itemValue) => setGender(itemValue)}
                      style={[
                        pickerStyles,
                        styles.input,
                        !gender && { color: "#999" },
                      ]}
                      dropdownIconColor="#999" // This ensures the dropdown icon is #999
                    >
                      <Picker.Item label="Select Gender" value="" />
                      <Picker.Item label="Male" value="Male" />
                      <Picker.Item label="Female" value="Female" />
                      <Picker.Item label="Other" value="Other" />
                    </Picker>
                  </View>

                  {/* Date of Birth Field */}
                  <View style={styles.inputContainer}>
                    <TouchableOpacity
                      onPress={() => setShowDatePicker(true)}
                      style={styles.datePickerContainer}
                    >
                      <Text
                        style={[
                          styles.dateText,
                          !dateOfBirth && { color: "#999" }, // Apply placeholder color
                        ]}
                      >
                        {dateOfBirth
                          ? dateOfBirth.toLocaleDateString()
                          : "Select Date of Birth"}
                      </Text>
                      <Feather name="calendar" size={20} color="#999" />
                    </TouchableOpacity>
                    {showDatePicker && (
                      <DateTimePicker
                        value={dateOfBirth || new Date()}
                        mode="date"
                        display="default"
                        onChange={onDateChange}
                      />
                    )}
                  </View>

                  <InputField
                    placeholder="Email"
                    value={email}
                    onChangeText={setEmail}
                  />
                  <InputField
                    placeholder="Phone No"
                    value={phoneNo}
                    onChangeText={setPhoneNo}
                  />
                  <InputField
                    placeholder="Address"
                    value={address}
                    onChangeText={setAddress}
                    multiline={true}
                  />
                </View>
              </>
            ) : step === 2 ? (
              <>
                {/* Educational Details Form */}
                <Text style={styles.title}>
                  Provide
                  <Text> </Text>
                  <Text style={styles.subTitle}>Educational Details</Text>
                </Text>

                <View style={styles.radioGroup}>
                  <TouchableOpacity
                    onPress={() => setUserType("student")}
                    style={styles.radioButton}
                  >
                    <Feather
                      name={userType === "student" ? "check-circle" : "circle"}
                      size={24}
                      color={userType === "student" ? "#00A3FF" : "#999"}
                    />
                    <Text style={styles.radioText}>Student</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => setUserType("staff")}
                    style={styles.radioButton}
                  >
                    <Feather
                      name={userType === "staff" ? "check-circle" : "circle"}
                      size={24}
                      color={userType === "staff" ? "#00A3FF" : "#999"}
                    />
                    <Text style={styles.radioText}>Staff</Text>
                  </TouchableOpacity>
                </View>

                {/* Institution Name */}
                {userType && (
                  <>
                    <View style={styles.inputContainer}>
                      <Picker
                        selectedValue={institution}
                        onValueChange={(itemValue) => setInstitution(itemValue)}
                        style={[
                          pickerStyles,
                          styles.input,
                          !institution && { color: "#999" },
                        ]}
                        dropdownIconColor="#999" // This ensures the dropdown icon is #999
                      >
                        <Picker.Item label="Select Institution" value="" />
                        {institutions.map((inst) => (
                          <Picker.Item key={inst} label={inst} value={inst} />
                        ))}
                      </Picker>
                    </View>

                    {/* Conditionally Render Based on User Type */}
                    {userType === "student" ? (
                      <>
                        {/* Department */}
                        <View style={styles.inputContainer}>
                          <Picker
                            selectedValue={department}
                            onValueChange={(itemValue) =>
                              setDepartment(itemValue)
                            }
                            style={[
                              pickerStyles,
                              styles.input,
                              !department && { color: "#999" },
                            ]}
                            dropdownIconColor="#999" // Dropdown icon color
                          >
                            <Picker.Item label="Select Department" value="" />
                            {departments.student.map((dept) => (
                              <Picker.Item
                                key={dept}
                                label={dept}
                                value={dept}
                              />
                            ))}
                          </Picker>
                        </View>

                        {/* Year */}
                        <View style={styles.inputContainer}>
                          <Picker
                            selectedValue={year}
                            onValueChange={(itemValue) => setYear(itemValue)}
                            style={[
                              pickerStyles,
                              styles.input,
                              !year && { color: "#999" },
                            ]}
                            dropdownIconColor="#999"
                          >
                            <Picker.Item label="Select Year" value="" />
                            {years.map((yr) => (
                              <Picker.Item key={yr} label={yr} value={yr} />
                            ))}
                          </Picker>
                        </View>

                        {/* Section */}
                        <View style={styles.inputContainer}>
                          <Picker
                            selectedValue={section}
                            onValueChange={(itemValue) => setSection(itemValue)}
                            style={[
                              pickerStyles,
                              styles.input,
                              !section && { color: "#999" },
                            ]}
                            dropdownIconColor="#999"
                          >
                            <Picker.Item label="Select Section" value="" />
                            {sections.map((sec) => (
                              <Picker.Item key={sec} label={sec} value={sec} />
                            ))}
                          </Picker>
                        </View>

                        {/* Roll No & Register No */}
                        <InputField
                          placeholder="Roll No"
                          value={rollNo}
                          onChangeText={setRollNo}
                        />
                        <InputField
                          placeholder="Register No"
                          value={registerNo}
                          onChangeText={setRegisterNo}
                        />
                      </>
                    ) : (
                      <>
                        {/* Department */}
                        <View style={styles.inputContainer}>
                          <Picker
                            selectedValue={department}
                            onValueChange={(itemValue) =>
                              setDepartment(itemValue)
                            }
                            style={[
                              pickerStyles,
                              styles.input,
                              !department && { color: "#999" },
                            ]}
                            dropdownIconColor="#999"
                          >
                            <Picker.Item label="Select Department" value="" />
                            {departments.staff.map((dept) => (
                              <Picker.Item
                                key={dept}
                                label={dept}
                                value={dept}
                              />
                            ))}
                          </Picker>
                        </View>

                        {/* Designation */}
                        <View style={styles.inputContainer}>
                          <Picker
                            selectedValue={designation}
                            onValueChange={(itemValue) =>
                              setDesignation(itemValue)
                            }
                            style={[
                              pickerStyles,
                              styles.input,
                              !designation && { color: "#999" },
                            ]}
                            dropdownIconColor="#999"
                          >
                            <Picker.Item label="Select Designation" value="" />
                            {designations.map((desig) => (
                              <Picker.Item
                                key={desig}
                                label={desig}
                                value={desig}
                              />
                            ))}
                          </Picker>
                        </View>

                        {/* Staff ID */}
                        <InputField
                          placeholder="Staff ID"
                          value={staffId}
                          onChangeText={setStaffId}
                        />
                      </>
                    )}
                  </>
                )}
              </>
            ) : (
              <>
                {/* Location Details Form */}
                <Text style={styles.title}>
                  Provide
                  <Text> </Text>
                  <Text style={styles.subTitle}>Location Details</Text>
                </Text>

                <View style={styles.inputOverContainer}>
                  {/* District (Dropdown) */}
                  <View style={styles.inputContainer}>
                    <Picker
                      selectedValue={district}
                      onValueChange={(itemValue) => setDistrict(itemValue)}
                      style={[
                        pickerStyles,
                        styles.input,
                        !district && { color: "#999" },
                      ]}
                      dropdownIconColor="#999"
                    >
                      <Picker.Item label="Select District" value="" />
                      {districts.map((dist) => (
                        <Picker.Item key={dist} label={dist} value={dist} />
                      ))}
                    </Picker>
                  </View>

                  {/* City (Dropdown) */}
                  <View style={styles.inputContainer}>
                    <Picker
                      selectedValue={city}
                      onValueChange={(itemValue) => setCity(itemValue)}
                      style={[
                        pickerStyles,
                        styles.input,
                        !city && { color: "#999" },
                      ]}
                      dropdownIconColor="#999"
                    >
                      <Picker.Item label="Select City" value="" />
                      {cities.map((city) => (
                        <Picker.Item key={city} label={city} value={city} />
                      ))}
                    </Picker>
                  </View>

                  {/* Stop Name */}
                  <View style={styles.inputContainer}>
                    <Picker
                      selectedValue={stopName}
                      onValueChange={(itemValue) => setStopName(itemValue)}
                      style={[
                        pickerStyles,
                        styles.input,
                        !stopName && { color: "#999" },
                      ]}
                      dropdownIconColor="#999"
                    >
                      <Picker.Item label="Select Stop Name" value="" />
                      {stops.map((stop) => (
                        <Picker.Item key={stop} label={stop} value={stop} />
                      ))}
                    </Picker>
                  </View>

                  {/* Route No */}
                  <View style={styles.inputContainer}>
                    <Picker
                      selectedValue={routeNo}
                      onValueChange={(itemValue) => setRouteNo(itemValue)}
                      style={[
                        pickerStyles,
                        styles.input,
                        !routeNo && { color: "#999" },
                      ]}
                      dropdownIconColor="#999"
                    >
                      <Picker.Item label="Select Route No" value="" />
                      {routes.map((route) => (
                        <Picker.Item key={route} label={route} value={route} />
                      ))}
                    </Picker>
                  </View>

                  {/* Terms and Conditions */}
                  <View style={styles.checkboxContainer}>
                    <TouchableOpacity
                      onPress={() => setAcceptTerms(!acceptTerms)}
                      style={styles.checkbox}
                    >
                      <Feather
                        name={acceptTerms ? "check-square" : "square"}
                        size={20}
                        color="#fff"
                      />
                    </TouchableOpacity>
                    <Text style={styles.checkboxText}>
                      I am accepting that all the information I provided will be
                      used solely for processing purposes. If any details are
                      found to be inaccurate, I know my account approval may be
                      declined.
                    </Text>
                  </View>
                </View>
              </>
            )}
          </ScrollView>

          {/* Navigation Buttons (Scrolls along with the content, no fixed positioning) */}
          <View style={styles.navigationButtons}>
            <TouchableOpacity
              onPress={handlePrevious}
              style={styles.leftNavButton}
            >
              <ArrowLeft size={24} color="#fff" />
            </TouchableOpacity>

            <Animated.View style={{ transform: [{ translateY: dotsAnim }] }}>
              <DotsIndicator currentStep={step} totalSteps={3} />
            </Animated.View>

            <TouchableOpacity
              onPress={handleNext}
              style={styles.rightNavButton}
            >
              <ArrowLeft size={24} style={styles.arrowIcon} />
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </LinearGradient>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { flex: 1 },
  scrollContent: {
    flexGrow: 1,
    padding: 20,
    alignItems: "center",
    paddingBottom: 10,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#FFFFFF",
    textAlign: "left",
    marginBottom: 40,
  },
  subTitle: { color: "#00A3FF" },
  inputOverContainer: {
    width: "100%",
    alignItems: "center",
  },
  inputContainer: {
    width: "90%",
    marginBottom: height * 0.045,
    borderBottomColor: "#666",
    borderBottomWidth: 1,
    paddingBottom: 5,
    backgroundColor: "#2E323B",
    borderRadius: 10,
    paddingHorizontal: 10,
    justifyContent: "center",
    paddingVertical: Platform.select({
      ios: 0,
      android: 0,
      web: 20, // Increase padding for web if needed
    }),
  },
  datePickerContainer: {
    paddingHorizontal: 10,
    paddingVertical: Platform.select({
      ios: 10,
      android: 10,
      web: 0, // Increase padding for web if needed
    }),
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    alignItems: "center",
  },
  dateText: {
    color: "#FFFFFF",
    fontSize: 16,
  },
  input: {
    flex: 1,
    height: 40,
    color: "#FFFFFF",
    fontSize: 16,
    paddingHorizontal: Platform.select({
      ios: 10,
      android: 10,
      web: 20, // Increase padding for web if needed
    }),
    justifyContent: "center",
    alignItems: "center",
  },
  textAreaContainer: { height: 100 },
  textArea: { height: 100, textAlignVertical: "top", top: 10 },
  radioGroup: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    marginBottom: 20, // Added margin bottom of 20 between radio buttons and fields
  },
  radioButton: { flexDirection: "row", alignItems: "center" },
  radioText: { marginLeft: 10, color: "#fff", fontSize: 16 },
  navigationButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    paddingHorizontal: 30,
    paddingVertical: 20,
  },
  leftNavButton: {
    backgroundColor: "#00A3FF",
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
  },
  rightNavButton: {
    backgroundColor: "#00A3FF",
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
    paddingHorizontal: 10,
  },
  checkbox: {
    marginRight: 10,
    marginBottom: 30,
  },
  checkboxText: {
    color: "#FFFFFF",
    fontSize: 12,
    flex: 1,
  },
  arrowIcon: {
    transform: [{ rotate: "180deg" }],
    color: "#fff",
  },

  dotsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  dot: {
    width: 10,
    height: 10,
    backgroundColor: "#999",
    borderRadius: 5,
    marginHorizontal: 5,
  },
  activeDot: {
    backgroundColor: "#00A3FF",
  },
});

export default NewUserForm;
