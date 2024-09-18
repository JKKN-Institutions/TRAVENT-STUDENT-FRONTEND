import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import SplashScreen from "./screens/SplashScreen";
import OnboardingScreen from "./screens/OnboardingScreen";
import LoginScreen from "./screens/LoginScreen";
import CreateNewPassword from "./screens/CreateNewPassword";
import HomeScreen from "./screens/Home/HomeScreen";
import NewUserForm from "./screens/NewUserForm";
import ProfileScreen from "./screens/Profile/ProfileScreen";
import YourProfile from "./screens/Profile/YourProfile";
import Grievances from "./screens/Profile/Grievances";
import Rating from "./screens/Profile/Rating";
import NotificationControl from "./screens/Profile/Notification Control/NotificationControlScreen";
import NotificationSound from "./screens/Profile/Notification Control/NotificationSoundScreen";
import ScanScreen from "./screens/Scan/ScanScreen";
import ScanSuccessScreen from "./screens/Scan/ScanSuccessScreen";
import ETicketScreen from "./screens/Scan/ETIcketScreen";
import NotificationScreen from "./screens/Notification/NotificationScreen";
import DetailedMessageView from "./screens/Notification/DetailedMessageView";
import PaymentScreen from "./screens/Payment/PaymentScreen";
import PaymentDetailsScreen from "./screens/Payment/PaymentDetailsScreen";
import PaymentSummaryScreen from "./screens/Payment/PaymentSummaryScreen";
import PaymentMethodScreen from "./screens/Payment/PaymentMethodScreen";
import PaymentSuccessScreen from "./screens/Payment/PaymentSuccessScreen";
import EReceiptScreen from "./screens/Payment/EReceiptScreen";
import LiveTracking from "./screens/LiveTracking/LiveTrackingScreen";
import Report from "./screens/Analytics/AnalyticsScreen";

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
          name="CreateNewPassword"
          component={CreateNewPassword}
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
          name="Rating"
          component={Rating}
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
        <Stack.Screen
          name="Pay"
          component={PaymentScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="PaymentDetails"
          component={PaymentDetailsScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="PaymentSummary"
          component={PaymentSummaryScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="PaymentMethod"
          component={PaymentMethodScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="PaymentSuccess"
          component={PaymentSuccessScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="EReceipt"
          component={EReceiptScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="LiveTracking"
          component={LiveTracking}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Report"
          component={Report}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
