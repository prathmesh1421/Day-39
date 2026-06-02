import {
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";

export default function DashboardScreen({ navigation }) {
  const stats = [
    { number: "120+", label: "Patients", emoji: "🧑‍⚕️" },
    { number: "15",   label: "Doctors",  emoji: "👨‍⚕️" },
    { number: "24/7", label: "Support",  emoji: "⏰"   },
  ];

  const actions = [
    { emoji: "👨‍⚕️", title: "Patients",     subtitle: "120 active records", screen: "Patients",     color: "#6366f1" },
    { emoji: "👤",   title: "Doctors",      subtitle: "15 specialists",     screen: "Doctors",      color: "#8b5cf6" },
    { emoji: "📅",   title: "Appointments", subtitle: "Book a slot",        screen: "Appointments", color: "#ec4899" },
    { emoji: "💊",   title: "Pharmacy",     subtitle: "Medicines & stock",  screen: "Pharmacy",     color: "#10b981" },
    { emoji: "🏥",   title: "Profile",      subtitle: "Hospital details",   screen: "Profile",      color: "#f59e0b" },
  ];

  const services = [
    { icon: "🚑", label: "Emergency" },
    { icon: "🩺", label: "OPD"       },
    { icon: "🧪", label: "Lab"       },
    { icon: "💊", label: "Pharmacy"  },
    { icon: "❤️", label: "ICU"       },
    { icon: "📅", label: "Booking"   },
  ];

  return (
    <View style={s.root}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={s.scroll}>

        {/* ── Header ── */}
        <Animated.View entering={FadeInDown.delay(0).duration(500)} style={s.header}>
          <Text style={s.headerEyebrow}>Sangli Hospital</Text>
          <Text style={s.headerTitle}>Welcome back, Doctor👋</Text>
          
        </Animated.View>

        {/* ── Stats ── */}
        <Animated.View entering={FadeInDown.delay(80).duration(500)} style={s.statsRow}>
          {stats.map((st, i) => (
            <View key={i} style={s.statBox}>
              <Text style={s.statEmoji}>{st.emoji}</Text>
              <Text style={s.statNum}>{st.number}</Text>
              <Text style={s.statLbl}>{st.label}</Text>
            </View>
          ))}
        </Animated.View>

        {/* ── Services ── */}
        <Animated.View entering={FadeInDown.delay(160).duration(500)}>
          <Text style={s.section}>Services</Text>
          <View style={s.servGrid}>
            {services.map((sv, i) => (
              <View key={i} style={s.servChip}>
                <Text style={s.servIcon}>{sv.icon}</Text>
                <Text style={s.servLbl}>{sv.label}</Text>
              </View>
            ))}
          </View>
        </Animated.View>

        {/* ── Quick Actions ── */}
        <Animated.View entering={FadeInDown.delay(240).duration(500)}>
          <Text style={s.section}>Quick Actions</Text>
        </Animated.View>

        {actions.map((a, i) => (
          <Animated.View key={i} entering={FadeInDown.delay(280 + i * 70).duration(400)}>
            <TouchableOpacity
              style={s.actionCard}
              activeOpacity={0.85}
              onPress={() => navigation.navigate(a.screen)}
            >
              {/* Color dot */}
              <View style={[s.dot, { backgroundColor: a.color }]} />

              {/* Emoji */}
              <View style={[s.iconBox, { backgroundColor: a.color + "15" }]}>
                <Text style={s.iconEmoji}>{a.emoji}</Text>
              </View>

              {/* Text */}
              <View style={s.actionText}>
                <Text style={s.actionTitle}>{a.title}</Text>
                <Text style={s.actionSub}>{a.subtitle}</Text>
              </View>

              {/* Arrow */}
              <Text style={[s.arrow, { color: a.color }]}>›</Text>
            </TouchableOpacity>
          </Animated.View>
        ))}

        <View style={{ height: 60 }} />
      </ScrollView>
    </View>
  );
}

const s = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#7d8ed1",
  },
  scroll: {
    paddingBottom: 20,
  },

  // ── Header ──
  header: {
    backgroundColor: "#2c285f",
    paddingTop: 56,
    paddingBottom: 32,
    paddingHorizontal: 24,
    borderBottomLeftRadius: 36,
    borderBottomRightRadius: 36,
  },
  headerEyebrow: {
    color: "#818cf8",
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: 1.5,
    textTransform: "uppercase",
    marginBottom: 8,
  },
  headerTitle: {
    color: "#fff",
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 4,
  },
  headerSub: {
    color: "#dadce5",
    fontSize: 14,
  },

  // ── Stats ──
  statsRow: {
    flexDirection: "row",
    marginHorizontal: 20,
    marginTop: -22,
    gap: 12,
  },
  statBox: {
    flex: 1,
    backgroundColor: "#e0e7ff",
    borderRadius: 18,
    paddingVertical: 16,
    alignItems: "center",
    borderWidth: 0.5,
    borderColor: "#e0e7ff",
    elevation: 4,
    shadowColor: "#6366f1",
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
  },
  statEmoji: { fontSize: 20, marginBottom: 6 },
  statNum: { fontSize: 17, fontWeight: "bold", color: "#1e1b4b" },
  statLbl: { fontSize: 10, color: "#94a3b8", marginTop: 2 },

  // ── Section label ──
  section: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#1e1b4b",
    marginTop: 28,
    marginBottom: 14,
    marginHorizontal: 20,
  },

  // ── Services ──
  servGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginHorizontal: 20,
    gap: 10,
  },
  servChip: {
    width: "30%",
    backgroundColor: "#e0e7ff",
    borderRadius: 16,
    paddingVertical: 14,
    alignItems: "center",
    borderWidth: 0.5,
    borderColor: "#e0e7ff",
  },
  servIcon: { fontSize: 24, marginBottom: 6 },
  servLbl: { fontSize: 11, fontWeight: "600", color: "#475569" },

  // ── Action Cards ──
  actionCard: {
    backgroundColor: "#e0e7ff",
    marginHorizontal: 20,
    marginBottom: 10,
    borderRadius: 18,
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
    paddingHorizontal: 14,
    borderWidth: 0.5,
    borderColor: "#e0e7ff",
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.04,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    gap: 12,
  },
  dot: {
    width: 6,
    height: 36,
    borderRadius: 3,
  },
  iconBox: {
    width: 48,
    height: 48,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
  },
  iconEmoji: { fontSize: 24 },
  actionText: { flex: 1 },
  actionTitle: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#0f172a",
    marginBottom: 2,
  },
  actionSub: { fontSize: 12, color: "#94a3b8" },
  arrow: { fontSize: 26, fontWeight: "bold" },
});