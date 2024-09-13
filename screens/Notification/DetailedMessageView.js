import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { ArrowLeft, Send, Bell, User, Coins } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';

const Message = ({ text, isUser, time }) => (
  <View style={[styles.messageBubble, isUser ? styles.userMessage : styles.otherMessage]}>
    <Text style={styles.messageText}>{text}</Text>
    <Text style={styles.messageTime}>{time}</Text>
  </View>
);

const Header = ({ notification, navigation }) => {
  const isOnline = notification.type !== 'manager';
  return (
    <View style={styles.header}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <ArrowLeft color="#fff" size={24} />
      </TouchableOpacity>
      <View style={[styles.iconContainer, styles[`${notification.type}IconContainer`]]}>
        {notification.type === 'system' && <Bell color="#fff" size={24} />}
        {notification.type === 'manager' && <User color="#fff" size={24} />}
        {notification.type === 'amulet' && <Coins color="#fff" size={24} />}
      </View>
      <View style={styles.headerTextContainer}>
        <Text style={styles.headerTitle}>{notification.title}</Text>
        <View style={styles.subtitleContainer}>

          <View style={[styles.statusDot, isOnline ? styles.onlineDot : styles.offlineDot]} />
          <Text style={styles.statusText}>{isOnline ? 'Online' : 'Offline'}</Text>
        </View>
      </View>
    </View>
  );
};

const ReplyInput = ({ replyText, setReplyText, handleSendReply }) => (
  <View style={styles.replyContainer}>
    <TextInput
      style={styles.replyInput}
      placeholder="Type your message..."
      placeholderTextColor="#888"
      value={replyText}
      onChangeText={setReplyText}
      multiline
    />
    <TouchableOpacity style={styles.sendButton} onPress={handleSendReply}>
      <Send color="#fff" size={24} />
    </TouchableOpacity>
  </View>
);

const DetailedMessageView = ({ route }) => {
  const { notification } = route.params;
  const navigation = useNavigation();
  const [replyText, setReplyText] = useState('');

  const handleSendReply = () => {
    console.log('Sending reply:', replyText);
    setReplyText('');
  };

  const getConversations = () => {
    switch (notification.type) {
      case 'system':
        return [
          { text: "Your bus for Vinayagar is scheduled for tomorrow at 8:30 AM.", isUser: false, time: "9:00 AM" },
          { text: "Thank you for the reminder. I'll be ready.", isUser: true, time: "9:05 AM" },
          { text: "Don't forget to bring your student ID for verification.", isUser: false, time: "9:10 AM" },
        ];
      case 'manager':
        return [
          { text: "There might be a change in the bus schedule tomorrow due to road maintenance.", isUser: false, time: "2:00 PM" },
          { text: "What time should I expect the bus?", isUser: true, time: "2:15 PM" },
          { text: "The new pickup time will be 9:00 AM instead of 8:30 AM. We apologize for any inconvenience.", isUser: false, time: "2:20 PM" },
        ];
      case 'amulet':
        return [
          { text: "10 Amulets have been deducted from your account for today's trip.", isUser: false, time: "7:00 PM" },
          { text: "Can you provide a breakdown of the charges?", isUser: true, time: "7:05 PM" },
          { text: "Certainly! The charge includes 8 Amulets for the round trip and 2 Amulets for the express service.", isUser: false, time: "7:10 PM" },
        ];
      default:
        return [{ text: notification.message, isUser: false, time: notification.time }];
    }
  };

  const conversations = getConversations();

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <Header notification={notification} navigation={navigation} />
      
      <ScrollView style={styles.messageContainer}>
        {conversations.map((msg, index) => (
          <Message key={index} {...msg} />
        ))}
      </ScrollView>
      
      <ReplyInput replyText={replyText} setReplyText={setReplyText} handleSendReply={handleSendReply} />
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1E1E1E',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    paddingTop: 40,
    borderBottomWidth: 1,
    borderBottomColor: '#2C2C2C',
  },
  backButton: {
    marginRight: 15,
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  systemIconContainer: {
    backgroundColor: '#4A90E2',
  },
  managerIconContainer: {
    backgroundColor: '#F5A623',
  },
  amuletIconContainer: {
    backgroundColor: '#7ED321',
  },
  headerTextContainer: {
    flex: 1,
  },
  headerTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  subtitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerSubtitle: {
    color: '#888',
    fontSize: 14,
    marginRight: 5,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 5,
  },
  onlineDot: {
    backgroundColor: '#4CAF50',
  },
  offlineDot: {
    backgroundColor: '#FF5722',
  },
  statusText: {
    color: '#888',
    fontSize: 12,
  },
  messageContainer: {
    flex: 1,
    padding: 20,
  },
  messageBubble: {
    maxWidth: '80%',
    padding: 10,
    borderRadius: 20,
    marginBottom: 10,
  },
  userMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#00A3FF',
  },
  otherMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#2C2C2C',
  },
  messageText: {
    color: '#fff',
    fontSize: 16,
  },
  messageTime: {
    color: 'rgba(255, 255, 255, 0.6)',
    fontSize: 12,
    alignSelf: 'flex-end',
    marginTop: 5,
  },
  replyContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: '#2C2C2C',
  },
  replyInput: {
    flex: 1,
    backgroundColor: '#2C2C2C',
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 10,
    color: '#fff',
    marginRight: 10,
    maxHeight: 100,
  },
  sendButton: {
    backgroundColor: '#00A3FF',
    borderRadius: 25,
    padding: 10,
  },
});

export default DetailedMessageView;