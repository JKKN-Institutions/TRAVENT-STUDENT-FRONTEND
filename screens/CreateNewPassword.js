import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Dimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { Feather } from "@expo/vector-icons";

const { height } = Dimensions.get("window");

const InputField = ({
  placeholder,
  value,
  onChangeText,
  secureTextEntry,
  icon,
  onIconPress,
}) => (
  <View style={styles.inputContainer}>
    <TextInput
      style={styles.input}
      placeholder={placeholder}
      placeholderTextColor="#999"
      value={value}
      onChangeText={onChangeText}
      secureTextEntry={secureTextEntry}
      underlineColorAndroid="transparent"
    />
    {icon && (
      <TouchableOpacity onPress={onIconPress}>
        <Feather name={icon} size={20} color="#999" style={styles.inputIcon} />
      </TouchableOpacity>
    )}
  </View>
);

const CreateNewPassword = ({ navigation }) => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const toggleNewPasswordVisibility = () => {
    setShowNewPassword(!showNewPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleSubmit = () => {
    // Add password reset logic here
    // For now, we'll just navigate back to the login screen
    navigation.navigate("Login");
  };

  return (
    <LinearGradient colors={["#1E262F", "#16171B"]} style={styles.container}>
      <SafeAreaView style={styles.content}>
        <Image source={require("../assets/splash.png")} style={styles.logo} />

        <Text style={styles.title}>Create A New Password</Text>
        <Text style={styles.subtitle}>
          Your new password must be different from the previous one
        </Text>
        <View style={styles.inputOverContainer}>
          <InputField
            placeholder="Enter New Password"
            value={newPassword}
            onChangeText={setNewPassword}
            secureTextEntry={!showNewPassword}
            icon={showNewPassword ? "eye" : "eye-off"}
            onIconPress={toggleNewPasswordVisibility}
          />
          <InputField
            placeholder="Confirm Password"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry={!showConfirmPassword}
            icon={showConfirmPassword ? "eye" : "eye-off"}
            onIconPress={toggleConfirmPasswordVisibility}
          />
        </View>

        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitText}>Submit</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: 80,
    height: 80,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FFFFFF",
    textAlign: "center",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 14,
    color: "#CCCCCC",
    textAlign: "center",
    marginBottom: 30,
  },
  inputOverContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginBottom: height * 0.03,
  },
  inputContainer: {
    width: "90%",
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#666",
    marginBottom: height * 0.03,
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
    fontSize: 16,
    paddingVertical: 0,
    paddingHorizontal: 10,
    borderWidth: 0,
    outlineStyle: "none",
  },
  inputIcon: {
    marginLeft: 10,
  },
  submitButton: {
    width: "80%",
    height: 50,
    backgroundColor: "#00A3FF",
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    marginTop: height * 0.05,
    shadowColor: "#00A3FF",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 10,
  },
  submitText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default CreateNewPassword;
