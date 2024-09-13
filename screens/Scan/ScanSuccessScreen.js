import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { CheckCircle } from 'lucide-react-native';

const ScanSuccessScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <CheckCircle color="#00A3FF" size={100} />
      <Text style={styles.title}>Your arrival confirmed successfully!</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('ETicket')}
      >
        <Text style={styles.buttonText}>View E-Ticket</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.button, styles.secondaryButton]}
        onPress={() => navigation.navigate('TrackBus')}
      >
        <Text style={[styles.buttonText, styles.secondaryButtonText]}>Track your bus</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1E1E1E',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 30,
    marginBottom: 50,
  },
  button: {
    backgroundColor: '#00A3FF',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
    marginBottom: 20,
    width: '80%',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  secondaryButton: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: '#00A3FF',
  },
  secondaryButtonText: {
    color: '#00A3FF',
  },
});

export default ScanSuccessScreen;