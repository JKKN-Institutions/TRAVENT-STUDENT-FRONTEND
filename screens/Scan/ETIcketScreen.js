import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ArrowLeft } from 'lucide-react-native';

const ETicketScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <ArrowLeft color="#fff" size={24} />
      </TouchableOpacity>
      <Text style={styles.title}>Your E-Ticket</Text>
      <View style={styles.ticketContainer}>
        <View style={styles.ticketHeader}>
          <Text style={styles.routeNumber}>17</Text>
        </View>
        <View style={styles.ticketContent}>
          <Text style={styles.passengerName}>Vinayagar S</Text>
          <Text style={styles.passengerDetails}>III year CSE</Text>
          <View style={styles.routeDetails}>
            <Text style={styles.routeText}>From: Seelanayakkanpatti Bus Pass</Text>
            <Text style={styles.routeText}>To: JKKN College of Engineering</Text>
          </View>
          <Text style={styles.dateTime}>26/06/2024 - 07:30 AM</Text>
          <Text style={styles.ticketId}>Ticket ID: 12DF45J</Text>
        </View>
      </View>
      <TouchableOpacity style={styles.homeButton} onPress={() => navigation.navigate('Home')}>
        <Text style={styles.homeButtonText}>Go to Home</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1E1E1E',
    padding: 20,
  },
  backButton: {
    marginTop: 40,
    marginBottom: 20,
  },
  title: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
  },
  ticketContainer: {
    backgroundColor: '#2C2C2C',
    borderRadius: 15,
    overflow: 'hidden',
  },
  ticketHeader: {
    backgroundColor: '#00A3FF',
    padding: 15,
    alignItems: 'center',
  },
  routeNumber: {
    color: '#fff',
    fontSize: 36,
    fontWeight: 'bold',
  },
  ticketContent: {
    padding: 20,
  },
  passengerName: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  passengerDetails: {
    color: '#888',
    fontSize: 16,
    marginBottom: 20,
  },
  routeDetails: {
    marginBottom: 20,
  },
  routeText: {
    color: '#fff',
    fontSize: 16,
    marginBottom: 5,
  },
  dateTime: {
    color: '#00A3FF',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  ticketId: {
    color: '#888',
    fontSize: 14,
  },
  homeButton: {
    backgroundColor: '#00A3FF',
    paddingVertical: 15,
    borderRadius: 25,
    marginTop: 30,
  },
  homeButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default ETicketScreen;