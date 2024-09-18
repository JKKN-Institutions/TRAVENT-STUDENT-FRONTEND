import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { ChevronRight } from 'lucide-react-native';

const { width } = Dimensions.get('window');

const PaymentOption = ({ icon: Icon, title, subtitle, onPress }) => (
  <TouchableOpacity style={styles.paymentOption} onPress={onPress}>
    <View style={styles.iconContainer}>
      {Icon && <Icon color="#4a90e2" size={24} />}
    </View>
    <View style={styles.optionTextContainer}>
      <Text style={styles.optionTitle}>{title}</Text>
      {subtitle && <Text style={styles.optionSubtitle}>{subtitle}</Text>}
    </View>
    <ChevronRight color="#888" size={20} />
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  paymentOption: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: width * 0.02,
    padding: width * 0.04,
    marginBottom: width * 0.02,
  },
  iconContainer: {
    width: width * 0.12,
    height: width * 0.12,
    borderRadius: width * 0.06,
    backgroundColor: 'rgba(74, 144, 226, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: width * 0.04,
  },
  optionTextContainer: {
    flex: 1,
  },
  optionTitle: {
    color: '#fff',
    fontSize: width * 0.04,
    fontWeight: 'bold',
  },
  optionSubtitle: {
    color: '#888',
    fontSize: width * 0.035,
  },
});

export default PaymentOption;