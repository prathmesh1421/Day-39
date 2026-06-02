// src/screens/AppointmentsScreen.js
import { useState } from "react";
import {
  Alert,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  FadeIn,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

const doctorsList = [
  "Dr. Prathmesh Joshi",
  "Dr. Akash Patil",
  "Dr. Sanjay Kulkarni",
  "Dr. Priya Sharma",
];

// --- ANIMATED APPOINTMENT CARD ---
const AppointmentCard = ({ item, index, onDelete }) => {
  const animationEnter = FadeIn.delay(index * 100).duration(400);
  const translateX = useSharedValue(0);

  const panGesture = Gesture.Pan()
    .onUpdate((e) => {
      const x = e.translationX;
      translateX.value = x < 0 ? x : 0;
    })
    .onEnd(() => {
      if (translateX.value < -80) {
        onDelete();
        translateX.value = withSpring(-500, {}, () => (translateX.value = 0));
      } else {
        translateX.value = withSpring(0);
      }
    });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  return (
    <GestureDetector gesture={panGesture}>
      <Animated.View
        entering={animationEnter}
        style={styles.appointmentContainer}
      >
        {/* Delete Background */}
        <View style={styles.deleteBackground}>
          <Text style={styles.deleteIcon}>🗑️</Text>
          <Text style={styles.deleteText}>Swipe to Delete</Text>
        </View>

        {/* Card Content */}
        <Animated.View style={[styles.appointmentCard, animatedStyle]}>
          <View style={styles.cardTopRow}>
            <View style={styles.avatarCircle}>
              <Text style={styles.avatarText}>👤</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.patientName}>{item.patientName}</Text>
              <Text style={styles.doctorName}>{item.doctor}</Text>
            </View>
            <View style={styles.statusBadge}>
              <Text style={styles.statusText}>Booked</Text>
            </View>
          </View>

          <View style={styles.divider} />

          <View style={styles.dateTimeRow}>
            <View style={styles.dateTimeChip}>
              <Text style={styles.dateTimeIcon}>📅</Text>
              <Text style={styles.dateTimeText}>{item.date}</Text>
            </View>
            <View style={styles.dateTimeChip}>
              <Text style={styles.dateTimeIcon}>🕒</Text>
              <Text style={styles.dateTimeText}>{item.time}</Text>
            </View>
          </View>
        </Animated.View>
      </Animated.View>
    </GestureDetector>
  );
};

export default function AppointmentsScreen({ navigation }) {
  const [patientName, setPatientName] = useState("");
  const [doctor, setDoctor] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [appointments, setAppointments] = useState([]);

  const handleLogout = () => navigation.replace("Login");

  const handleBooking = () => {
    if (!patientName || !doctor || !date || !time) {
      Alert.alert("Error", "Please fill all fields");
      return;
    }
    const newAppointment = { id: Date.now(), patientName, doctor, date, time };
    setAppointments([newAppointment, ...appointments]);
    setPatientName("");
    setDoctor("");
    setDate("");
    setTime("");
    Alert.alert("Success", "Appointment Booked ✅");
  };

  const handleDelete = (id) => {
    const updated = appointments.filter((item) => item.id !== id);
    setAppointments(updated);
  };

  return (
    <View style={styles.container}>

      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.headerSub}>Hospital System</Text>
          <Text style={styles.headerTitle}>Appointments</Text>
        </View>
        <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >

        {/* Booking Card */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <View style={styles.cardIconWrap}>
              <Text style={styles.cardIconEmoji}>📅</Text>
            </View>
            <Text style={styles.cardTitle}>Book Appointment</Text>
          </View>

          {/* Patient Name */}
          <Text style={styles.inputLabel}>Patient Name</Text>
          <TextInput
            placeholder="Enter patient name"
            placeholderTextColor="#a5b4fc"
            style={styles.input}
            value={patientName}
            onChangeText={setPatientName}
          />

          {/* Doctor Picker */}
          <Text style={styles.inputLabel}>Select Doctor</Text>
          <View style={styles.pickerContainer}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {doctorsList.map((doc) => (
                <TouchableOpacity
                  key={doc}
                  style={[
                    styles.pickerItem,
                    doctor === doc && styles.pickerItemActive,
                  ]}
                  onPress={() => setDoctor(doc)}
                >
                  <Text
                    style={[
                      styles.pickerText,
                      doctor === doc && styles.pickerTextActive,
                    ]}
                  >
                    {doc}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>

          {/* Date */}
          <Text style={styles.inputLabel}>Date</Text>
          <TextInput
            placeholder="DD/MM/YYYY"
            placeholderTextColor="#a5b4fc"
            style={styles.input}
            value={date}
            onChangeText={setDate}
          />

          {/* Time */}
          <Text style={styles.inputLabel}>Time</Text>
          <TextInput
            placeholder="10:30 AM"
            placeholderTextColor="#a5b4fc"
            style={styles.input}
            value={time}
            onChangeText={setTime}
          />

          <TouchableOpacity style={styles.button} onPress={handleBooking}>
            <Text style={styles.buttonText}>Book Appointment 🚀</Text>
          </TouchableOpacity>
        </View>

        {/* Appointment List */}
        <Text style={styles.sectionTitle}>Booked Appointments</Text>

        {appointments.length === 0 ? (
          <View style={styles.emptyCard}>
            <Text style={styles.emptyEmoji}>📭</Text>
            <Text style={styles.emptyTitle}>No Appointments Yet</Text>
            <Text style={styles.emptySubtitle}>
              Book your first appointment above
            </Text>
          </View>
        ) : (
          appointments.map((item, index) => (
            <AppointmentCard
              key={item.id}
              item={item}
              index={index}
              onDelete={() => handleDelete(item.id)}
            />
          ))
        )}

        <View style={{ height: 60 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f4ff",
  },

  // ── Header ──
  header: {
    backgroundColor: "#1e1b4b",
    paddingHorizontal: 24,
    paddingTop: 50,
    paddingBottom: 28,
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerSub: {
    color: "#a5b4fc",
    fontSize: 13,
    marginBottom: 4,
  },
  headerTitle: {
    color: "#ffffff",
    fontSize: 28,
    fontWeight: "bold",
  },
  logoutBtn: {
    backgroundColor: "#312e81",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 0.5,
    borderColor: "#4338ca",
  },
  logoutText: {
    color: "#a5b4fc",
    fontSize: 14,
    fontWeight: "bold",
  },

  scrollContent: {
    padding: 20,
    paddingBottom: 100,
    alignItems: "center",
  },

  // ── Booking Card ──
  card: {
    width: Platform.OS === "web" ? 500 : "100%",
    backgroundColor: "#ffffff",
    padding: 24,
    borderRadius: 24,
    borderWidth: 0.5,
    borderColor: "#e0e7ff",
    elevation: 4,
    marginTop: 24,
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 24,
    gap: 12,
  },
  cardIconWrap: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: "#e0e7ff",
    alignItems: "center",
    justifyContent: "center",
  },
  cardIconEmoji: {
    fontSize: 22,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#1e1b4b",
  },

  // ── Inputs ──
  inputLabel: {
    fontSize: 13,
    fontWeight: "bold",
    color: "#4338ca",
    marginBottom: 6,
    marginLeft: 2,
  },
  input: {
    backgroundColor: "#eef2ff",
    padding: 14,
    borderRadius: 14,
    marginBottom: 16,
    fontSize: 15,
    borderWidth: 1,
    borderColor: "#c7d2fe",
    color: "#1e1b4b",
  },

  // ── Doctor Picker ──
  pickerContainer: {
    backgroundColor: "#eef2ff",
    borderRadius: 14,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#c7d2fe",
    padding: 10,
  },
  pickerItem: {
    paddingHorizontal: 14,
    paddingVertical: 9,
    marginRight: 8,
    borderRadius: 20,
    backgroundColor: "#e0e7ff",
  },
  pickerItemActive: {
    backgroundColor: "#1e1b4b",
  },
  pickerText: {
    color: "#4338ca",
    fontWeight: "bold",
    fontSize: 13,
  },
  pickerTextActive: {
    color: "#ffffff",
  },

  // ── Book Button ──
  button: {
    backgroundColor: "#1e1b4b",
    padding: 16,
    borderRadius: 14,
    alignItems: "center",
    marginTop: 6,
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 17,
    fontWeight: "bold",
  },

  // ── Section Title ──
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 32,
    marginBottom: 16,
    color: "#1e1b4b",
    width: Platform.OS === "web" ? 500 : "100%",
  },

  // ── Appointment Cards ──
  appointmentContainer: {
    width: Platform.OS === "web" ? 500 : "100%",
    marginBottom: 14,
    position: "relative",
    overflow: "hidden",
    borderRadius: 20,
  },
  deleteBackground: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "#ef4444",
    justifyContent: "center",
    alignItems: "flex-end",
    paddingRight: 25,
    borderRadius: 20,
    flexDirection: "row",
  },
  deleteIcon: {
    fontSize: 20,
    marginRight: 8,
  },
  deleteText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 14,
  },
  appointmentCard: {
    backgroundColor: "#ffffff",
    padding: 18,
    borderRadius: 20,
    borderWidth: 0.5,
    borderColor: "#e0e7ff",
    elevation: 3,
  },
  cardTopRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  avatarCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#e0e7ff",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 4,
  },
  avatarText: {
    fontSize: 20,
  },
  patientName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#1e1b4b",
    marginBottom: 2,
  },
  doctorName: {
    fontSize: 13,
    color: "#6366f1",
  },
  statusBadge: {
    backgroundColor: "#e0e7ff",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
  },
  statusText: {
    fontSize: 11,
    fontWeight: "bold",
    color: "#4338ca",
  },
  divider: {
    height: 0.5,
    backgroundColor: "#e0e7ff",
    marginVertical: 14,
  },
  dateTimeRow: {
    flexDirection: "row",
    gap: 10,
  },
  dateTimeChip: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#eef2ff",
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 20,
    gap: 6,
  },
  dateTimeIcon: {
    fontSize: 14,
  },
  dateTimeText: {
    fontSize: 13,
    color: "#4338ca",
    fontWeight: "bold",
  },

  // ── Empty State ──
  emptyCard: {
    backgroundColor: "#ffffff",
    padding: 36,
    borderRadius: 20,
    width: Platform.OS === "web" ? 500 : "100%",
    alignItems: "center",
    borderWidth: 0.5,
    borderColor: "#e0e7ff",
  },
  emptyEmoji: {
    fontSize: 40,
    marginBottom: 12,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1e1b4b",
    marginBottom: 6,
  },
  emptySubtitle: {
    fontSize: 13,
    color: "#6366f1",
    textAlign: "center",
  },
});
