import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { ArrowLeft, ChevronLeft } from "lucide-react-native";
import { LineChart } from "react-native-chart-kit";
import { useNavigation } from "@react-navigation/native";
import Navbar from "../Home/Navbar";
import AttendanceCircle from "./AttendanceCircle";
import StatCard from "./StatCard";
import PickupStatistics from "./PickupStatistics";
import { LinearGradient } from "expo-linear-gradient"; // Import LinearGradient from expo-linear-gradient

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const currentYear = new Date().getFullYear();

const Analytics = () => {
  const navigation = useNavigation();
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [showStatistics, setShowStatistics] = useState(false);

  const monthData = {
    6: {
      attendance: 92,
      present: 24,
      total: 27,
      distance: 54,
      speed: 60,
      duration: 56,
    },
    5: {
      attendance: 60,
      present: 15,
      total: 26,
      distance: 54,
      speed: 62,
      duration: 54,
    },
  };

  const data = monthData[currentMonth] || monthData[6]; // Default to July if no data

  const navigateMonth = (direction) => {
    setCurrentMonth((prev) => {
      const newMonth = (prev + direction + 12) % 12;
      setShowStatistics(false);
      return newMonth;
    });
  };

  const toggleStatistics = () => {
    setShowStatistics(!showStatistics);
  };

  return (
    <LinearGradient colors={["#1E262F", "#16171B"]} style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.contentWrapper}>
          {!showStatistics ? (
            <>
              <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.navigate("Home")}>
                  <ArrowLeft color="#fff" size={24} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Analytics</Text>
              </View>

              <AttendanceCircle
                percentage={data.attendance}
                month={months[currentMonth]}
                present={data.present}
                total={data.total}
                year={currentYear}
              />

              <View style={styles.monthNavigation}>
                <TouchableOpacity
                  onPress={() => navigateMonth(-1)}
                  style={styles.previousMonth}
                >
                  <ChevronLeft color="#888" size={22} />
                  <Text style={styles.monthNavigationText}>
                    {months[(currentMonth - 1 + 12) % 12]}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => navigateMonth(1)}
                  style={styles.nextMonth}
                >
                  <Text style={styles.monthNavigationText}>
                    {months[(currentMonth + 1) % 12]}
                  </Text>
                  <ChevronLeft
                    color="#888"
                    size={22}
                    style={styles.arrowIcon}
                  />
                </TouchableOpacity>
              </View>

              <View style={styles.statsContainer}>
                <StatCard
                  title="Distance"
                  value={`${data.distance}`}
                  unit="Km"
                />
                <StatCard title="Speed" value={`${data.speed}`} unit="km/hr" />
                <StatCard
                  title="Duration"
                  value={`${data.duration}`}
                  unit="min"
                />
              </View>

              <View style={styles.chartContainer}>
                <View style={styles.chartSubContainer}>
                  <View style={styles.chartHeader}>
                    <Text style={styles.chartTitle}>Attendance</Text>
                    <TouchableOpacity onPress={toggleStatistics}>
                      <Text style={styles.statisticText}>
                        {"View Statistics →"}
                      </Text>
                    </TouchableOpacity>
                  </View>
                  <LineChart
                    data={{
                      labels: ["Jan", "Mar", "May", "Jul", "Sep", "Nov"],
                      datasets: [
                        {
                          data: [40, 45, 55, 60, 75, 65],
                          color: (opacity = 1) =>
                            `rgba(131, 167, 234, ${opacity})`,
                        },
                        {
                          data: [30, 70, 80, 90, 85, 70],
                          color: (opacity = 1) =>
                            `rgba(255, 193, 7, ${opacity})`,
                        },
                      ],
                    }}
                    width={300}
                    height={200}
                    chartConfig={{
                      backgroundColor: "#1E262F",
                      backgroundGradientFrom: "#1E262F",
                      backgroundGradientTo: "#1E262F",
                      decimalPlaces: 0,
                      color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                      style: {
                        borderRadius: 16,
                      },
                    }}
                    bezier
                    style={styles.chart}
                  />
                </View>
              </View>
            </>
          ) : (
            <PickupStatistics
              month={months[currentMonth]}
              year={currentYear}
              attendance={data.attendance}
              present={data.present}
              total={data.total}
              onBack={toggleStatistics} // Back to main analytics
            />
          )}
        </View>
      </ScrollView>

      {/* Only show Navbar if not on the PickupStatistics page */}
      {!showStatistics && <Navbar />}
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  contentWrapper: {
    flex: 1,
    paddingBottom: 20, // To allow scroll space beyond content
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
  monthNavigation: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    alignItems: "center",
    marginTop: 25,
  },
  monthNavigationText: {
    color: "#fff",
    fontSize: 16,
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 24,
    paddingHorizontal: 10,
  },
  chartContainer: {
    marginTop: 25,
    paddingHorizontal: 16,
  },
  chartSubContainer: {
    backgroundColor: "rgba(255,255,255,0.05)",
    borderRadius: 8,
    padding: 16,
  },
  chartTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  chart: {
    marginVertical: 8,
    borderRadius: 16,
  },
  viewStatsButton: {
    backgroundColor: "#3498db",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    marginHorizontal: 16,
    marginTop: 24,
    marginBottom: 80,
  },
  viewStatsButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  arrowIcon: {
    transform: [{ rotate: "180deg" }],
  },
  nextMonth: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  previousMonth: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  chartHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  statisticText: {
    color: "#fff",
    fontWeight: "500",
  },
});

export default Analytics;
