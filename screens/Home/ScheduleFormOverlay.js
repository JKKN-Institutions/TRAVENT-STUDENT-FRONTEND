import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Platform,
} from "react-native";
import { X, Calendar } from "lucide-react-native";
import DateTimePicker from "@react-native-community/datetimepicker";

const { width, height } = Dimensions.get("window");

const ScheduleFormOverlay = ({
  isVisible,
  onClose,
  selectedDate,
  onScheduleConfirm,
}) => {
  const [category, setCategory] = useState("");
  const [date, setDate] = useState(new Date(selectedDate || Date.now()));
  const [showDatePicker, setShowDatePicker] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(Platform.OS === "ios");
    setDate(currentDate);

    // For Android, the picker closes when the date is selected
    if (Platform.OS === "android") {
      setShowDatePicker(false);
    }
  };

  const openDatePicker = () => {
    setShowDatePicker(true);
  };

  const handleSchedule = () => {
    onScheduleConfirm(date.toLocaleDateString(), category); // Confirm schedule with date and category
  };

  if (!isVisible) return null;

  return (
    <View style={styles.overlay}>
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>Schedule For Bus</Text>
          <TouchableOpacity onPress={onClose}>
            <X color="#fff" size={24} />
          </TouchableOpacity>
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Date</Text>
          <TouchableOpacity style={styles.dateInput} onPress={openDatePicker}>
            <Text style={styles.dateText}>{date.toLocaleDateString()}</Text>
            <Calendar color="#fff" size={20} />
          </TouchableOpacity>
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Select Category</Text>
          <View style={styles.categoryContainer}>
            {["Morning", "Evening", "Both", "Absent"].map((item) => (
              <TouchableOpacity
                key={item}
                style={[
                  styles.categoryButton,
                  category === item && styles.categoryButtonActive,
                ]}
                onPress={() => setCategory(item)}
              >
                <Text
                  style={[
                    styles.categoryText,
                    category === item && styles.categoryTextActive,
                  ]}
                >
                  {item}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <TouchableOpacity
          style={styles.scheduleButton}
          onPress={handleSchedule}
        >
          <Text style={styles.scheduleButtonText}>Schedule</Text>
        </TouchableOpacity>

        {showDatePicker && (
          <DateTimePicker
            value={date}
            mode="date"
            display="default"
            onChange={onChange}
            minimumDate={new Date(2000, 0, 1)} // Optional: Set minimum date
            maximumDate={new Date(2100, 11, 31)} // Optional: Set maximum date
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    height: height * 0.5,
    justifyContent: "flex-end",
  },
  content: {
    backgroundColor: "#1E262F",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingVertical: 30,
    paddingHorizontal: 20,
    height: height * 0.7,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 40,
  },
  title: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
  formGroup: {
    marginBottom: 60,
  },
  label: {
    color: "#fff",
    fontSize: 16,
    marginBottom: 15,
  },
  dateInput: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#2C3540",
    borderRadius: 8,
    padding: 12,
  },
  dateText: {
    color: "#fff",
    fontSize: 16,
  },
  categoryContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  categoryButton: {
    backgroundColor: "#2C3540",
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 16,
    marginBottom: 15,
    width: "48%",
  },
  categoryButtonActive: {
    backgroundColor: "#3498db",
  },
  categoryText: {
    color: "#fff",
    fontSize: 14,
    textAlign: "center",
  },
  categoryTextActive: {
    fontWeight: "bold",
  },
  scheduleButton: {
    backgroundColor: "#3498db",
    borderRadius: 8,
    paddingVertical: 12,
    marginTop: 30,
  },
  scheduleButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default ScheduleFormOverlay;
