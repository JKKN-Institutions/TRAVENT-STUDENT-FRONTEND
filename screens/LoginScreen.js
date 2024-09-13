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

const LoginScreen = ({ navigation }) => {
  // Add navigation here
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSignIn = () => {
    // Add validation logic here if necessary
    navigation.navigate("Home"); // Navigate to Home screen on sign in
  };

  const handleNewUser = () => {
    navigation.navigate("NewUserForm"); // Navigate to NewUserForm screen
  };

  return (
    <LinearGradient colors={["#353A40", "#16171B"]} style={styles.container}>
      <SafeAreaView style={styles.content}>
        <Image source={require("../assets/splash.png")} style={styles.logo} />
        <Text style={styles.title}>Dive Into an Adventure.</Text>
        <Text style={styles.title}>Experience Authenticity.</Text>
        <View style={styles.inputOverContainer}>
          <InputField
            placeholder="Enter Your Email"
            value={email}
            onChangeText={setEmail}
          />
          <InputField
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!showPassword}
            icon={showPassword ? "eye" : "eye-off"}
            onIconPress={togglePasswordVisibility}
          />
          <TouchableOpacity style={styles.forgotPasswordContainer}>
            <Text style={styles.forgotPassword}>Forgot Password?</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.signInButton} onPress={handleSignIn}>
          <Text style={styles.signInText}>Sign In</Text>
        </TouchableOpacity>

        <View style={styles.divider}>
          <View style={styles.line} />
          <View style={styles.lineFlex}>
            <Text style={styles.orText}>Or sign in with</Text>
            <Image
              source={require("../assets/google-icon.png")}
              style={styles.googleIcon}
            />
          </View>
          <View style={styles.line} />
        </View>

        <View style={styles.signUpContainer}>
          <Text style={styles.newUserText}>New user? </Text>
          <TouchableOpacity onPress={handleNewUser}>
            <Text style={styles.clickHere}>Click here</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
};

// Styles remain the same as in the original code
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
    fontSize: 30,
    fontWeight: "bold",
    color: "#FFFFFF",
    textAlign: "center",
  },
  inputOverContainer: {
    marginTop: height * 0.05,
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
    backgroundColor: "#2E323B", // Soft dark background for input
    borderRadius: 10,
    paddingHorizontal: 10,
    elevation: 4, // Shadow for Android
    shadowColor: "#000", // Shadow for iOS
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
    borderWidth: 0, // Removes any border
    outlineStyle: "none", // For web (if needed)
  },
  inputIcon: {
    marginLeft: 10,
  },
  forgotPasswordContainer: {
    width: "80%",
    alignItems: "flex-end",
  },
  forgotPassword: {
    color: "#FFFFFF",
    marginBottom: height * 0.03,
    fontSize: 14,
    textDecorationLine: "underline",
    textShadowColor: "rgba(0, 0, 0, 0.2)", // Subtle text shadow
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 1,
  },
  signInButton: {
    width: "80%",
    height: 50,
    backgroundColor: "#00A3FF",
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: height * 0.05,
    shadowColor: "#00A3FF", // Glowing shadow effect for button
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 10, // Shadow effect for Android
  },
  signInText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
  },
  divider: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: height * 0.05,
    width: "85%",
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: "#666",
  },
  lineFlex: {
    display: "flex",
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "center",
  },
  orText: {
    color: "#FFFFFF",
    paddingHorizontal: 10,
    fontSize: 14,
  },
  googleIcon: {
    width: 30,
    height: 30,
    elevation: 5, // Add subtle shadow to Google button
  },
  signUpContainer: {
    flexDirection: "row",
  },
  newUserText: {
    color: "#FFFFFF",
  },
  clickHere: {
    color: "#00A3FF",
    fontWeight: "bold",
    textDecorationLine: "underline",
  },
});

export default LoginScreen;
