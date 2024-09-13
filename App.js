import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import SplashScreen from "./screens/SplashScreen";
import OnboardingScreen from "./screens/OnboardingScreen";
import LoginScreen from "./screens/LoginScreen";
import HomeScreen from "./screens/Home/HomeScreen";
import NewUserForm from "./screens/NewUserForm";
import ProfileScreen from "./screens/Profile/ProfileScreen";
import YourProfile from "./screens/Profile/YourProfile";
import Grievances from "./screens/Profile/Grievances";
import NotificationControl from "./screens/Profile/Notification Control/NotificationControlScreen";
import NotificationSound from "./screens/Profile/Notification Control/NotificationSoundScreen";
import ScanScreen from "./screens/Scan/ScanScreen";
import ScanSuccessScreen from "./screens/Scan/ScanSuccessScreen";
import ETicketScreen from "./screens/Scan/ETIcketScreen";
import NotificationScreen from "./screens/Notification/NotificationScreen";
import DetailedMessageView from "./screens/Notification/DetailedMessageView";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash">
        <Stack.Screen
          name="Splash"
          component={SplashScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Onboarding"
          component={OnboardingScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="NewUserForm"
          component={NewUserForm}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Profile"
          component={ProfileScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="YourProfile"
          component={YourProfile}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Grievances"
          component={Grievances}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="NotificationControl"
          component={NotificationControl}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="NotificationSound"
          component={NotificationSound}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Scan"
          component={ScanScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ScanSuccess"
          component={ScanSuccessScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ETicket"
          component={ETicketScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Notifications"
          component={NotificationScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="DetailedMessage"
          component={DetailedMessageView}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
