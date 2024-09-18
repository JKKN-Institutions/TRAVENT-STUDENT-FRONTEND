import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { ArrowLeft } from "lucide-react-native";
import AttendanceCircle from "./AttendanceCircle";

const PickupStatistics = ({
  month,
  year,
  attendance,
  present,
  total,
  onBack,
}) => {
  const pickupData = [
    {
      date: "03-07-2024",
      driver: "Murugan S",
      pickup: "07:55 AM",
      status: "Usual",
    },
    {
      date: "04-07-2024",
      driver: "Murugan S",
      pickup: "07:55 AM",
      status: "Usual",
    },
    {
      date: "05-07-2024",
      driver: "Kumar S",
      pickup: "07:58 AM",
      status: "Slightly Delay",
    },
    {
      date: "06-07-2024",
      driver: "Murugan S",
      pickup: "07:57 AM",
      status: "Slightly Delay",
    },
    {
      date: "07-07-2024",
      driver: "Murugan S",
      pickup: "07:55 AM",
      status: "Usual",
    },
    {
      date: "08-07-2024",
      driver: "Kumar S",
      pickup: "08:02 AM",
      status: "Delay",
    },
    {
      date: "10-07-2024",
      driver: "Murugan S",
      pickup: "07:53 AM",
      status: "Usual",
    },
    {
      date: "11-07-2024",
      driver: "Vel K",
      pickup: "07:56 AM",
      status: "Usual",
    },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case "Usual":
        return "#4CAF50";
      case "Slightly Delay":
        return "#FFC107";
      case "Delay":
        return "#FF5252";
      default:
        return "#fff";
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack}>
          <ArrowLeft color="#fff" size={24} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Statistics</Text>
      </View>

      <AttendanceCircle
        percentage={attendance}
        month={month}
        present={present}
        total={total}
        year={year}
      />
      <View style={styles.tableContainer}>
        <Text style={styles.tableTitle}>Pick-Up Statistics</Text>
        <View style={styles.tableWrapper}>
          <View style={styles.tableHeader}>
            <Text style={[styles.headerCell, styles.slCell]}>SI</Text>
            <Text style={[styles.headerCell, styles.dateCell]}>Date</Text>
            <Text style={[styles.headerCell, styles.driverCell]}>Driver</Text>
            <Text style={[styles.headerCell, styles.pickupCell]}>Pick-Up</Text>
            <Text style={[styles.headerCell, styles.statusCell]}>Status</Text>
          </View>
        </View>
        {pickupData.map((item, index) => (
          <View key={index} style={styles.tableRow}>
            <Text style={[styles.cell, styles.slCell]}>{index + 1}</Text>
            <Text style={[styles.cell, styles.dateCell]}>{item.date}</Text>
            <Text style={[styles.cell, styles.driverCell]}>{item.driver}</Text>
            <Text style={[styles.cell, styles.pickupCell]}>{item.pickup}</Text>
            <Text
              style={[
                styles.cell,
                styles.statusCell,
                { color: getStatusColor(item.status) },
              ]}
            >
              {item.status}
            </Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1E262F",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 40,
    paddingHorizontal: 20,
  },
  headerTitle: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
    marginLeft: 20,
  },
  tableContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  tableWrapper: {
    backgroundColor: "#2C3E50",
    borderRadius: 8,
    overflow: "hidden", // Ensures the border radius is applied to the rows as well
  },
  tableTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 24,
    marginBottom: 16,
  },
  tableHeader: {
    flexDirection: "row",
    backgroundColor: "#2C3E50",
    paddingVertical: 8,
    paddingHorizontal: 14,
  },
  headerCell: {
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
  },
  tableBody: {
    flex: 1,
  },
  tableRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#34495E",
    paddingVertical: 8,
    paddingHorizontal: 14,
    alignItems: "center",
    justifyContent: "center",
  },
  cell: {
    color: "#fff",
    textAlign: "center",
    paddingVertical: 8,
  },
  slCell: {
    width: "6%",
  },
  dateCell: {
    width: "27%",
  },
  driverCell: {
    width: "27%",
  },
  pickupCell: {
    width: "20%",
  },
  statusCell: {
    width: "20%",
  },
});

export default PickupStatistics;
