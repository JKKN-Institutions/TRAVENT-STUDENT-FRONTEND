import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

const ProgressBar = ({ currentStep }) => {
  const steps = [
    { number: 1, label: 'Category' },
    { number: 2, label: 'Summary' },
    { number: 3, label: 'Payment' },
  ];

  return (
    <View style={styles.progressBar}>
      {steps.map((step, index) => (
        <React.Fragment key={step.number}>
          <View style={styles.progressStep}>
            <View style={[styles.progressDot, currentStep >= step.number && styles.activeDot]}>
              <Text style={styles.progressNumber}>{step.number}</Text>
            </View>
            <Text style={styles.progressText}>{step.label}</Text>
          </View>
          {index < steps.length - 1 && <View style={styles.progressLine} />}
        </React.Fragment>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  progressBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: width * 0.04,
    marginBottom: width * 0.04,
  },
  progressStep: {
    alignItems: 'center',
  },
  progressDot: {
    width: width * 0.08,
    height: width * 0.08,
    borderRadius: width * 0.04,
    backgroundColor: '#2C2C2C',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: width * 0.01,
  },
  activeDot: {
    backgroundColor: '#4a90e2',
  },
  progressNumber: {
    color: '#fff',
    fontSize: width * 0.04,
    fontWeight: 'bold',
  },
  progressText: {
    color: '#888',
    fontSize: width * 0.03,
  },
  progressLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#2C2C2C',
    marginHorizontal: width * 0.02,
  },
});

export default ProgressBar;