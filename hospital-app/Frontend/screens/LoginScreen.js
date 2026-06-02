import { useState } from "react";
import {
  Alert,
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Animated, {
  FadeInDown,
  FadeInUp,
} from "react-native-reanimated";

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const validateForm = () => {
    if (!email.trim()) {
      Alert.alert("Error", "Please enter your email address");
      return false;
    }
    if (!email.includes("@")) {
      Alert.alert("Error", "Please enter a valid email address");
      return false;
    }
    if (!password.trim()) {
      Alert.alert("Error", "Please enter your password");
      return false;
    }
    if (password.length < 6) {
      Alert.alert("Error", "Password must be at least 6 characters");
      return false;
    }
    return true;
  };

  const handleLogin = () => {
    if (validateForm()) {
      navigation.replace("Main");
    }
  };

  const isFormFilled = email.trim().length > 0 && password.trim().length > 0;

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#1e1b4b" />

      {/* Top Header Section */}
      <Animated.View entering={FadeInDown.delay(0).duration(500)} style={styles.topSection}>
        <View style={styles.logoWrap}>
          <Text style={styles.logoEmoji}>🏥</Text>
        </View>
        <Text style={styles.headerSub}>Hospital System</Text>
        <Text style={styles.headerTitle}>Welcome Back</Text>
        <Text style={styles.headerSubtitle}>Sign in to your account</Text>
      </Animated.View>

      {/* Card */}
      <Animated.View entering={FadeInUp.delay(150).duration(500)} style={styles.card}>

        {/* Email */}
        <Text style={styles.inputLabel}>Email Address</Text>
        <TextInput
          placeholder="doctor@hospital.com"
          placeholderTextColor="#a5b4fc"
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
        />

        {/* Password */}
        <Text style={styles.inputLabel}>Password</Text>
        <View style={styles.passwordWrapper}>
          <TextInput
            placeholder="Enter password"
            placeholderTextColor="#a5b4fc"
            secureTextEntry={!showPassword}
            style={[styles.input, styles.passwordInput]}
            value={password}
            onChangeText={setPassword}
          />
          <TouchableOpacity
            style={styles.eyeBtn}
            onPress={() => setShowPassword((v) => !v)}
          >
            <Text style={styles.eyeIcon}>{showPassword ? "🙈" : "👁️"}</Text>
          </TouchableOpacity>
        </View>

        {/* Helper */}
        <Text style={styles.helperText}>
          {!isFormFilled
            ? "⚠️ Please fill email and password"
            : "✅ Ready to login"}
        </Text>

        {/* Login Button */}
        <TouchableOpacity
          style={[styles.button, !isFormFilled && styles.buttonDisabled]}
          onPress={handleLogin}
          disabled={!isFormFilled}
        >
          <Text style={styles.buttonText}>
            {isFormFilled ? "Login 🚀" : "Fill Details First"}
          </Text>
        </TouchableOpacity>

        {/* Divider */}
        <View style={styles.dividerRow}>
          <View style={styles.dividerLine} />
          <Text style={styles.dividerText}>Hospital Portal</Text>
          <View style={styles.dividerLine} />
        </View>

        {/* Info Chips */}
        <View style={styles.chipsRow}>
          <View style={styles.chip}>
            <Text style={styles.chipIcon}>👨‍⚕️</Text>
            <Text style={styles.chipText}>Doctors</Text>
          </View>
          <View style={styles.chip}>
            <Text style={styles.chipIcon}>📅</Text>
            <Text style={styles.chipText}>Appointments</Text>
          </View>
          <View style={styles.chip}>
            <Text style={styles.chipIcon}>🏥</Text>
            <Text style={styles.chipText}>Records</Text>
          </View>
        </View>
      </Animated.View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#594ef4",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },

  // ── Top Section ──
  topSection: {
    alignItems: "center",
    marginBottom: 32,
  },
  logoWrap: {
    width: 80,
    height: 80,
    borderRadius: 24,
    backgroundColor: "#312e81",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
    borderWidth: 0.5,
    borderColor: "#4338ca",
  },
  logoEmoji: {
    fontSize: 40,
  },
  headerSub: {
    color: "#a5b4fc",
    fontSize: 13,
    marginBottom: 6,
    fontWeight: "600",
    letterSpacing: 1,
    textTransform: "uppercase",
  },
  headerTitle: {
    color: "#ffffff",
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 6,
  },
  headerSubtitle: {
    color: "#818cf8",
    fontSize: 15,
  },

  // ── Card ──
  card: {
    width: Platform.OS === "web" ? 460 : "100%",
    backgroundColor: "#ffffff",
    padding: 28,
    borderRadius: 28,
    borderWidth: 0.5,
    borderColor: "#e0e7ff",
    elevation: 10,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 15,
    shadowOffset: { width: 0, height: 5 },
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

  // ── Password ──
  passwordWrapper: {
    position: "relative",
  },
  passwordInput: {
    paddingRight: 52,
  },
  eyeBtn: {
    position: "absolute",
    right: 14,
    top: 14,
  },
  eyeIcon: {
    fontSize: 18,
  },

  // ── Helper ──
  helperText: {
    fontSize: 13,
    color: "#6366f1",
    marginBottom: 12,
    marginLeft: 2,
  },

  // ── Button ──
  button: {
    backgroundColor: "#1e1b4b",
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: "center",
    marginBottom: 20,
    elevation: 4,
    shadowColor: "#1e1b4b",
    shadowOpacity: 0.4,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
  },
  buttonDisabled: {
    backgroundColor: "#94a3b8",
    shadowOpacity: 0.1,
  },
  buttonText: {
    color: "#fff",
    fontSize: 17,
    fontWeight: "bold",
    letterSpacing: 0.5,
  },

  // ── Divider ──
  dividerRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
    gap: 8,
  },
  dividerLine: {
    flex: 1,
    height: 0.5,
    backgroundColor: "#e0e7ff",
  },
  dividerText: {
    fontSize: 12,
    color: "#a5b4fc",
    fontWeight: "600",
    letterSpacing: 0.5,
  },

  // ── Chips ──
  chipsRow: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 10,
  },
  chip: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#eef2ff",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    gap: 6,
    borderWidth: 0.5,
    borderColor: "#c7d2fe",
  },
  chipIcon: { fontSize: 14 },
  chipText: {
    fontSize: 12,
    color: "#4338ca",
    fontWeight: "bold",
  },
});