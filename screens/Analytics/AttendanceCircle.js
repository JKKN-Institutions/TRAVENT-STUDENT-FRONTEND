import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Circle } from "react-native-svg";
import { AnimatedCircularProgress } from "react-native-circular-progress";

const AttendanceCircle = ({ percentage, month, present, total, year }) => {
  const tintColor = percentage >= 75 ? "#4CAF50" : "#FF5252";

  return (
    <View style={styles.container}>
      <View style={styles.subContainer}>
        <View style={styles.circleTextContainer}>
          <Text style={styles.monthText}>{`${month}, Attendance`}</Text>
          <Text
            style={styles.presentText}
          >{`Present for ${present} of ${total} days`}</Text>
          <Text style={styles.yearText}>{year}</Text>
        </View>
        <View style={styles.circleContainer}>
          <AnimatedCircularProgress
            size={100}
            width={15}
            fill={percentage}
            tintColor={tintColor}
            backgroundColor="#3d5875"
            rotation={0}
            lineCap="round"
          >
            {(fill) => (
              <View style={styles.innerCircle}>
                <Text style={styles.percentageText}>{`${Math.round(
                  fill
                )}%`}</Text>
              </View>
            )}
          </AnimatedCircularProgress>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 24,
    padding: 14,
  },
  subContainer: {
    backgroundColor: "rgba(255,255,255,0.05)",
    borderRadius: 8,
    padding: 20,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  innerCircle: {
    alignItems: "center",
    justifyContent: "center",
  },
  percentageText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
  },
  monthText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
    marginTop: 16,
  },
  presentText: {
    fontSize: 14,
    color: "#4CAF50",
    marginTop: 8,
  },
  yearText: {
    fontSize: 14,
    color: "#fff",
    marginTop: 4,
  },
});

export default AttendanceCircle;
