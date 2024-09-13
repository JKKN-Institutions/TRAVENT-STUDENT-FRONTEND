import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Calendar } from "react-native-calendars";
import { ChevronLeft, ChevronRight } from "lucide-react-native";

const { width } = Dimensions.get("window");

const ScheduleSection = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const renderArrow = (direction) => {
    const Icon = direction === "left" ? ChevronLeft : ChevronRight;
    return <Icon size={24} color="#fff" />;
  };

  const currentDate = new Date();
  const weekDays = ["S", "M", "T", "W", "T", "F", "S"];
  const monthYear = `${currentDate.toLocaleString("default", {
    month: "long",
  })} ${currentDate.getFullYear()}`;

  const weekDates = Array.from({ length: 7 }, (_, i) => {
    const date = new Date(currentDate);
    date.setDate(currentDate.getDate() - currentDate.getDay() + i);
    return {
      day: weekDays[i],
      date: date.getDate(),
      isToday: date.toDateString() === currentDate.toDateString(),
    };
  });

  return (
    <LinearGradient
      colors={["#1E262F", "#000000"]}
      style={styles.scheduleContainer}
    >
      <View style={styles.scheduleHeader}>
        <Text style={styles.scheduleTitle}>Schedules</Text>
        <TouchableOpacity onPress={toggleExpand}>
          <Text style={styles.expandText}>
            {isExpanded ? "Shrink →" : "Expand →"}
          </Text>
        </TouchableOpacity>
      </View>
      {isExpanded ? (
        <Calendar
          style={styles.calendar}
          theme={{
            backgroundColor: "transparent",
            calendarBackground: "transparent",
            textSectionTitleColor: "#b6c1cd",
            selectedDayBackgroundColor: "#3498db",
            selectedDayTextColor: "#ffffff",
            todayTextColor: "#3498db",
            dayTextColor: "#ffffff",
            textDisabledColor: "#4a4a4a",
            dotColor: "#3498db",
            selectedDotColor: "#ffffff",
            arrowColor: "#ffffff",
            monthTextColor: "#ffffff",
            textDayFontSize: 16,
            textMonthFontSize: 18,
            textDayHeaderFontSize: 14,
          }}
          onDayPress={(day) => setSelectedDate(day.dateString)}
          markedDates={{
            [selectedDate]: { selected: true, selectedColor: "#3498db" },
            "2024-07-25": { marked: true, dotColor: "#3498db" },
            "2024-07-26": { marked: true, dotColor: "#ffd700" },
          }}
          renderArrow={renderArrow}
        />
      ) : (
        <View style={styles.miniCalendar}>
          <View style={styles.weekContainer}>
            {weekDates.map((item, index) => (
              <View key={index} style={styles.dayColumn}>
                {item.isToday ? (
                  <View style={styles.todayContainer}>
                    <Text style={styles.todayText}>{item.day}</Text>
                    <Text style={styles.todayDateText}>{item.date}</Text>
                  </View>
                ) : (
                  <>
                    <Text style={styles.dayText}>{item.day}</Text>
                    <Text style={styles.dateText}>{item.date}</Text>
                  </>
                )}
              </View>
            ))}
          </View>
          <Text style={styles.monthYearText}>{monthYear}</Text>
        </View>
      )}
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  scheduleContainer: {
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
  },
  scheduleHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  scheduleTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  expandText: {
    color: "#3498db",
  },
  calendar: {
    height: 350,
  },
  miniCalendar: {
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 10,
  },
  weekContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  dayColumn: {
    alignItems: "center",
    width: (width - 60) / 7,
  },
  dayText: {
    color: "#999999",
    fontSize: 12,
    marginBottom: 5,
  },
  dateText: {
    color: "#fff",
    fontSize: 16,
  },
  todayContainer: {
    backgroundColor: "#3498db",
    borderRadius: 8,
    width: 40,
    height: 60,
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom: 5,
  },
  todayText: {
    color: "#fff",
    fontSize: 14,
  },
  todayDateText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  monthYearText: {
    color: "#fff",
    fontSize: 16,
    textAlign: "center",
    paddingTop: 5,
  },
});

export default ScheduleSection;
