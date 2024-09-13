import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Dimensions,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { ArrowLeft, User } from "lucide-react-native";
import { Picker } from "@react-native-picker/picker"; // Add Picker from React Native Picker
import { useNavigation } from "@react-navigation/native";

const { width, height } = Dimensions.get("window");

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

const YourProfile = () => {
  const navigation = useNavigation();
  const [name, setName] = useState("Vinayagar S");
  const [gender, setGender] = useState("Male");
  const [dob, setDob] = useState("02/02/2000");
  const [email, setEmail] = useState("vinayagar@jkkn.ac.in");
  const [phone, setPhone] = useState("1234567890");
  const [address, setAddress] = useState("17, Gandhi Nagar, Salem - 636010");

  return (
    <LinearGradient colors={["#1E262F", "#16171B"]} style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <ScrollView style={styles.scrollView}>
          <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <ArrowLeft color="#fff" size={24} />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Your Profile</Text>
          </View>

          <View style={styles.avatarContainer}>
            <View style={styles.avatar}>
              <User color="#888" size={48} />
            </View>
          </View>

          <View style={styles.formContainer}>
            <InputField
              label="Name"
              value={name}
              onChangeText={setName}
              editable={false} // Name field is disabled
            />
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Gender</Text>
              <View style={styles.pickerWrapper}>
                <Picker
                  selectedValue={gender}
                  onValueChange={(itemValue) => setGender(itemValue)}
                  enabled={false} // Disable the picker (dropdown)
                  style={styles.picker}
                  dropdownIconColor="#999"
                >
                  <Picker.Item label="Male" value="Male" />
                  <Picker.Item label="Female" value="Female" />
                  <Picker.Item label="Other" value="Other" />
                </Picker>
              </View>
            </View>
            <InputField
              label="Date of Birth"
              value={dob}
              onChangeText={setDob}
              editable={false} // Date of Birth field is disabled
            />
            <InputField
              label="Email"
              value={email}
              onChangeText={setEmail}
              editable={false} // Email field is disabled
            />
            <InputField
              label="Phone No"
              value={phone}
              onChangeText={setPhone}
              editable={false} // Phone No field is disabled
            />
            <InputField
              label="Address"
              value={address}
              onChangeText={setAddress}
              editable={false} // Address field is disabled
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
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
  avatarContainer: {
    alignItems: "center",
    marginBottom: 16,
  },
  avatar: {
    width: 90,
    height: 90,
    borderRadius: 50,
    backgroundColor: "#353A40",
    justifyContent: "center",
    alignItems: "center",
  },
  formContainer: {
    paddingHorizontal: 20,
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
    color: "#999",
    height: 50,
    width: "100%",
  },
});

export default YourProfile;
