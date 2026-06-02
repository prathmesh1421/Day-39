import {
  Alert,
  Linking,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";

export default function ProfileScreen({ navigation }) {
  const handleLogout = () => navigation.replace("Login");

  const handleCall = () =>
    Linking.openURL("tel:+919876543210").catch(() =>
      Alert.alert("Error", "Unable to make call")
    );

  const handleEmail = () =>
    Linking.openURL("mailto:hospital@gmail.com").catch(() =>
      Alert.alert("Error", "Unable to send email")
    );

  const handleLocation = () =>
    Linking.openURL("https://maps.google.com/?q=Sangli Hospital").catch(
      () => Alert.alert("Error", "Unable to open maps")
    );

  const infoCards = [
    {
      emoji: "🏥",
      title: "Hospital Address",
      lines: ["Sangli Hospital", "MG Road, Sangli", "Maharashtra - 416416"],
    },
    {
      emoji: "📞",
      title: "Contact Number",
      lines: ["+91 9876543210"],
    },
    {
      emoji: "✉️",
      title: "Email Address",
      lines: ["hospital@gmail.com"],
    },
    {
      emoji: "🕒",
      title: "Working Hours",
      lines: ["Monday - Sunday", "Open 24 Hours"],
    },
  ];

  const actions = [
    { emoji: "📞", label: "Call Hospital", onPress: handleCall },
    { emoji: "✉️", label: "Send Email", onPress: handleEmail },
    { emoji: "📍", label: "Open Location", onPress: handleLocation },
  ];

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.headerSub}>Hospital System</Text>
          <Text style={styles.headerTitle}>Profile</Text>
        </View>
        <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Hospital Banner */}
        {/* <Animated.View
          entering={FadeInDown.delay(0).duration(400)}
          style={styles.banner}
        >
          <View style={styles.bannerIconWrap}>
            <Text style={styles.bannerIcon}>🏥</Text>
          </View>
          <Text style={styles.bannerName}>Sangli Hospital</Text>
          <View style={styles.openBadge}>
            <View style={styles.openDot} />
            <Text style={styles.openText}>Open 24/7</Text>
          </View>
        </Animated.View> */}

        {/* Info Cards */}
        {infoCards.map((card, i) => (
          <Animated.View
            key={card.title}
            entering={FadeInDown.delay(100 + i * 80).duration(400)}
            style={[styles.card, { width: Platform.OS === "web" ? 500 : "100%" }]}
          >
            <View style={styles.cardHeader}>
              <View style={styles.cardIconWrap}>
                <Text style={styles.cardIconEmoji}>{card.emoji}</Text>
              </View>
              <Text style={styles.cardTitle}>{card.title}</Text>
            </View>
            <View style={styles.divider} />
            {card.lines.map((line, j) => (
              <Text key={j} style={styles.cardText}>
                {line}
              </Text>
            ))}
          </Animated.View>
        ))}

        {/* Action Buttons */}
        <Text style={styles.sectionTitle}>Quick Actions</Text>
        {actions.map((action, i) => (
          <Animated.View
            key={action.label}
            entering={FadeInDown.delay(420 + i * 80).duration(400)}
            style={{ width: Platform.OS === "web" ? 500 : "100%" }}
          >
            <TouchableOpacity style={styles.actionBtn} onPress={action.onPress}>
              <View style={styles.actionIconWrap}>
                <Text style={styles.actionEmoji}>{action.emoji}</Text>
              </View>
              <Text style={styles.actionLabel}>{action.label}</Text>
              <Text style={styles.actionArrow}>›</Text>
            </TouchableOpacity>
          </Animated.View>
        ))}

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
    alignItems: "center",
  },

  // ── Banner ──
  // banner: {
  //   width: Platform.OS === "web" ? 500 : "100%",
  //   backgroundColor: "#1e1b4b",
  //   borderRadius: 24,
  //   padding: 28,
  //   alignItems: "center",
  //   marginTop: 8,
  //   marginBottom: 8,
  //   borderWidth: 0.5,
  //   borderColor: "#4338ca",
  // },
  // bannerIconWrap: {
  //   width: 70,
  //   height: 70,
  //   borderRadius: 20,
  //   backgroundColor: "#312e81",
  //   alignItems: "center",
  //   justifyContent: "center",
  //   marginBottom: 14,
  //   borderWidth: 0.5,
  //   borderColor: "#4338ca",
  // },
  // bannerIcon: { fontSize: 36 },
  // bannerName: {
  //   color: "#ffffff",
  //   fontSize: 22,
  //   fontWeight: "bold",
  //   marginBottom: 10,
  // },
  // openBadge: {
  //   flexDirection: "row",
  //   alignItems: "center",
  //   backgroundColor: "#312e81",
  //   paddingHorizontal: 14,
  //   paddingVertical: 6,
  //   borderRadius: 20,
  //   gap: 6,
  //   borderWidth: 0.5,
  //   borderColor: "#4338ca",
  // },
  // openDot: {
  //   width: 8,
  //   height: 8,
  //   borderRadius: 4,
  //   backgroundColor: "#4ade80",
  // },
  // openText: {
  //   color: "#a5b4fc",
  //   fontSize: 13,
  //   fontWeight: "bold",
  // },

  // ── Info Cards ──
  card: {
    backgroundColor: "#ffffff",
    padding: 20,
    borderRadius: 20,
    borderWidth: 0.5,
    borderColor: "#e0e7ff",
    elevation: 3,
    marginTop: 14,
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginBottom: 12,
  },
  cardIconWrap: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: "#e0e7ff",
    alignItems: "center",
    justifyContent: "center",
  },
  cardIconEmoji: { fontSize: 20 },
  cardTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#1e1b4b",
  },
  divider: {
    height: 0.5,
    backgroundColor: "#e0e7ff",
    marginBottom: 12,
  },
  cardText: {
    fontSize: 15,
    color: "#475569",
    marginBottom: 4,
    paddingLeft: 4,
  },

  // ── Section Title ──
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#1e1b4b",
    marginTop: 28,
    marginBottom: 14,
    width: Platform.OS === "web" ? 500 : "100%",
  },

  // ── Action Buttons ──
  actionBtn: {
    backgroundColor: "#ffffff",
    borderRadius: 16,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    marginBottom: 12,
    borderWidth: 0.5,
    borderColor: "#e0e7ff",
    elevation: 2,
  },
  actionIconWrap: {
    width: 42,
    height: 42,
    borderRadius: 12,
    backgroundColor: "#eef2ff",
    alignItems: "center",
    justifyContent: "center",
  },
  actionEmoji: { fontSize: 20 },
  actionLabel: {
    flex: 1,
    fontSize: 16,
    fontWeight: "bold",
    color: "#1e1b4b",
  },
  actionArrow: {
    fontSize: 22,
    color: "#a5b4fc",
    fontWeight: "bold",
  },
});