import React, { useState, useMemo, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  TextInput,
  Platform,
} from "react-native";
import { ArrowLeft, Search, Bell, User, Coins } from "lucide-react-native";
import { useNavigation } from "@react-navigation/native";
import * as Notifications from "expo-notifications";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Initial notification data with default messages
const notificationsData = {
  all: [
    {
      id: "1",
      title: "Schedule Reminder",
      message: "It's time to schedule your bus for Vinayagar",
      time: "9m ago",
      type: "system",
      isRead: false,
    },
    {
      id: "2",
      title: "Transport Manager",
      message: "Tomorrow there might be change in bus",
      time: "2h ago",
      type: "manager",
      isRead: false,
    },
    {
      id: "3",
      title: "Amulets",
      message: "10 Amulets has been deducted from your account",
      time: "1d ago",
      type: "amulet",
      isRead: true,
    },
    {
      id: "4",
      title: "Route Update",
      message: "New route added for your convenience",
      time: "2d ago",
      type: "route_update",
      isRead: true,
    },
  ],
  unread: [
    {
      id: "1",
      title: "Schedule Reminder",
      message: "It's time to schedule your bus for Vinayagar",
      time: "9m ago",
      type: "system",
      isRead: false,
    },
    {
      id: "2",
      title: "Transport Manager",
      message: "Tomorrow there might be change in bus",
      time: "2h ago",
      type: "manager",
      isRead: false,
    },
  ],
  read: [
    {
      id: "3",
      title: "Amulets",
      message: "10 Amulets has been deducted from your account",
      time: "1d ago",
      type: "amulet",
      isRead: true,
    },
    {
      id: "4",
      title: "Route Update",
      message: "New route added for your convenience",
      time: "2d ago",
      type: "route_update",
      isRead: true,
    },
  ],
};
const NotificationItem = ({
  title,
  message,
  time,
  type,
  isRead,
  onPress,
  unreadCount,
}) => {
  const getIcon = (type) => {
    switch (type) {
      case "system":
        return <Bell color="#fff" size={24} />;
      case "manager":
        return <User color="#fff" size={24} />;
      case "amulet":
        return <Coins color="#fff" size={24} />;
      case "route_update":
        return <Bell color="#fff" size={24} />;
      default:
        return null;
    }
  };

  return (
    <TouchableOpacity
      style={[styles.notificationItem, isRead && styles.readNotification]}
      onPress={onPress}
    >
      {/* Notification icon */}
      <View style={[styles.iconContainer, styles[`${type}IconContainer`]]}>
        {getIcon(type)}
      </View>
      <View style={styles.notificationContent}>
        <Text style={[styles.notificationTitle, isRead && styles.readText]}>
          {title}
        </Text>
        <Text
          style={[styles.notificationMessage, isRead && styles.readText]}
          numberOfLines={1}
        >
          {message}
        </Text>
      </View>
      <Text style={[styles.notificationTime, isRead && styles.readText]}>
        {time}
      </Text>

      {/* Show unread count badge only for Schedule Reminder when it's unread */}
      {!isRead && title === "Schedule Reminder" && unreadCount > 0 && (
        <View style={styles.unreadBadge}>
          <Text style={styles.unreadBadgeText}>{unreadCount}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

const TabButton = ({ label, isActive, onPress, unreadCount }) => (
  <TouchableOpacity
    style={[styles.tab, isActive && styles.activeTab]}
    onPress={onPress}
  >
    <Text style={[styles.tabText, isActive && styles.activeTabText]}>
      {label}
    </Text>
    {unreadCount > 0 && (
      <View style={styles.unreadBadge}>
        <Text style={styles.unreadBadgeText}>{unreadCount}</Text>
      </View>
    )}
  </TouchableOpacity>
);

const NotificationScreen = () => {
  const navigation = useNavigation();
  const [activeTab, setActiveTab] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [notifications, setNotifications] = useState({
    ...notificationsData,
  });

  // Track unread count for all notifications
  const unreadCount = useMemo(
    () => notifications.unread.length,
    [notifications]
  );

  // Track unread count for Schedule Reminder
  const scheduleReminderUnreadCount = useMemo(() => {
    return notifications.unread.filter((n) => n.title === "Schedule Reminder")
      .length;
  }, [notifications]);

  useEffect(() => {
    registerForPushNotificationsAsync();
    configureNotificationHandler();
  }, []);

  const registerForPushNotificationsAsync = async () => {
    if (Platform.OS === "android") {
      await Notifications.setNotificationChannelAsync("default", {
        name: "default",
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: "#FF231F7C",
      });
    }

    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      alert("Failed to get push token for push notification!");
      return;
    }
  };

  const configureNotificationHandler = () => {
    Notifications.setNotificationHandler({
      handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: true,
      }),
    });
  };

  const handleNotificationPress = async (notification) => {
    const updatedNotifications = { ...notifications };

    // Mark notification as read in 'all'
    const allIndex = updatedNotifications.all.findIndex(
      (n) => n.id === notification.id
    );

    if (allIndex !== -1) {
      updatedNotifications.all[allIndex].isRead = true;
    }

    // Move notification from 'unread' to 'read'
    const unreadIndex = updatedNotifications.unread.findIndex(
      (n) => n.id === notification.id
    );

    if (unreadIndex !== -1) {
      const readItem = updatedNotifications.unread.splice(unreadIndex, 1)[0];
      const readExists = updatedNotifications.read.some(
        (n) => n.id === readItem.id
      );

      if (!readExists) {
        updatedNotifications.read.push(readItem); // Add it to read messages
      }
    }

    // Save the updated notifications state
    setNotifications(updatedNotifications);

    await AsyncStorage.setItem(
      "notificationsData",
      JSON.stringify(updatedNotifications)
    );

    // Navigate to detailed message screen
    navigation.navigate("DetailedMessage", { notification });
  };

  const filteredNotifications = notifications[activeTab.toLowerCase()].filter(
    (notification) =>
      notification.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      notification.message.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const testNotification = async () => {
    const notificationContent = {
      title: "Schedule Reminder",
      body: "Time to schedule for tomorrow's travel",
      data: { screen: "DetailedMessage" },
    };

    // Schedule local notification
    await Notifications.scheduleNotificationAsync({
      content: notificationContent,
      trigger: null, // Trigger immediately
    });

    const STORAGE_KEY = "conversations_system"; // Key for system-type conversations

    try {
      const existingConversations = await AsyncStorage.getItem(STORAGE_KEY);
      let conversations = existingConversations
        ? JSON.parse(existingConversations)
        : [];

      // Append the new message to the conversation
      const newMessage = {
        text: notificationContent.body,
        isUser: false, // This is a system-generated message
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };

      // Add new message to conversations array
      conversations.push(newMessage);

      // Save updated conversations back to AsyncStorage
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(conversations));

      // Look for the existing 'Schedule Reminder' notification in both 'all' and 'unread'
      let updatedNotifications = { ...notifications };
      let found = false;

      // Update the notification in the 'all' section
      updatedNotifications.all = updatedNotifications.all.map((n) => {
        if (n.title === "Schedule Reminder") {
          found = true;
          return {
            ...n,
            message: notificationContent.body,
            time: "Just now",
            isRead: false, // Reset to unread
          };
        }
        return n;
      });

      // If the notification is unread, update it in the 'unread' section as well
      if (found) {
        const unreadExists = updatedNotifications.unread.some(
          (n) => n.title === "Schedule Reminder"
        );

        if (!unreadExists) {
          const newUnreadNotification = updatedNotifications.all.find(
            (n) => n.title === "Schedule Reminder"
          );
          updatedNotifications.unread.unshift(newUnreadNotification); // Add to unread
        } else {
          // Update the existing one in unread
          updatedNotifications.unread = updatedNotifications.unread.map((n) => {
            if (n.title === "Schedule Reminder") {
              return {
                ...n,
                message: notificationContent.body,
                time: "Just now",
              };
            }
            return n;
          });
        }
      } else {
        // If it's not found, we treat it as a new notification and add it to both 'all' and 'unread'
        const newNotification = {
          id: String(Date.now()),
          title: notificationContent.title,
          message: notificationContent.body,
          time: "Just now",
          type: "system",
          isRead: false,
        };

        updatedNotifications.all.unshift(newNotification);
        updatedNotifications.unread.unshift(newNotification); // Add to unread as well
      }

      // Update the notifications state
      setNotifications(updatedNotifications);

      // Save updated notifications to AsyncStorage
      await AsyncStorage.setItem(
        "notificationsData",
        JSON.stringify(updatedNotifications)
      );
    } catch (error) {
      console.error("Failed to update conversations in AsyncStorage", error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <ArrowLeft color="#fff" size={24} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Notifications</Text>
      </View>

      <View style={styles.searchContainer}>
        <Search color="#888" size={20} style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search notifications"
          placeholderTextColor="#888"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      <View style={styles.tabContainer}>
        {["All", "Unread", "Read"].map((tab) => (
          <TabButton
            key={tab}
            label={tab}
            isActive={activeTab === tab}
            onPress={() => setActiveTab(tab)}
            unreadCount={tab === "Unread" ? unreadCount : 0}
          />
        ))}
      </View>

      <FlatList
        data={filteredNotifications}
        renderItem={({ item }) => (
          <NotificationItem
            {...item}
            unreadCount={
              item.title === "Schedule Reminder"
                ? scheduleReminderUnreadCount
                : 0
            }
            onPress={() => handleNotificationPress(item)}
          />
        )}
        keyExtractor={(item) => item.id}
      />
      <TouchableOpacity style={styles.testButton} onPress={testNotification}>
        <Text style={styles.testButtonText}>Test</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1E1E1E",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 20,
    paddingTop: 40,
  },
  headerTitle: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
    marginLeft: 20,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#2C2C2C",
    borderRadius: 10,
    margin: 20,
    paddingHorizontal: 10,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    color: "#fff",
    height: 40,
  },
  tabContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 20,
  },
  tab: {
    paddingVertical: 5,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  activeTab: {
    backgroundColor: "#00A3FF50",
    borderRadius: 20,
    borderColor: "#00A3FF",
    borderWidth: 1,
  },
  tabText: {
    color: "#888",
    fontWeight: "bold",
  },
  activeTabText: {
    color: "#fff",
  },
  unreadBadge: {
    backgroundColor: "#FF3B30",
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 5,
    paddingHorizontal: 5,
  },
  unreadBadgeText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "bold",
  },
  notificationItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#2C2C2C",
  },
  readNotification: {
    opacity: 0.6,
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  systemIconContainer: {
    backgroundColor: "#4A90E2",
  },
  managerIconContainer: {
    backgroundColor: "#F5A623",
  },
  amuletIconContainer: {
    backgroundColor: "#7ED321",
  },
  notificationContent: {
    flex: 1,
  },
  notificationTitle: {
    color: "#fff",
    fontWeight: "bold",
    marginBottom: 5,
  },
  notificationMessage: {
    color: "#888",
  },
  notificationTime: {
    color: "#888",
    fontSize: 12,
  },
  readText: {
    color: "#666",
  },
  testButton: {
    backgroundColor: "#00A3FF",
    padding: 15,
    margin: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  testButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default NotificationScreen;
