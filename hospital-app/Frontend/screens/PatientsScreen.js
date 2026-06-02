import React, { useCallback, useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  FlatList,
  RefreshControl,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  Dimensions
} from "react-native";

import { API } from "../services/api"; 
import Header from "../component/Header"; 

const { height } = Dimensions.get("window");

export default function PatientScreen({ navigation }) {
  // 1. STATE MANAGEMENT
  const [patients, setPatients] = useState([]);
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [disease, setDisease] = useState("");

  // Loading States
  const [loading, setLoading] = useState(true);      // Initial loading
  const [refreshing, setRefreshing] = useState(false); // Pull-to-refresh
  const [isAdding, setIsAdding] = useState(false);    // Button loading

  // 2. LOAD DATA (Added missing function)
  const loadPatients = async () => {
    try {
      const response = await API.get("/patients");
      
      if (Array.isArray(response.data)) {
        setPatients(response.data);
      }
    } catch (error) {
      console.log("LOAD ERROR:", error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  // 3. INITIAL FETCH
  useEffect(() => {
    loadPatients();
  }, []);

  // 4. ADD PATIENT
  const handleAdd = async () => {
    if (isAdding) return;

    // Validation
    if (!name.trim() || !age.trim() || !disease.trim()) {
      Alert.alert("Validation", "Please fill all fields");
      return;
    }
    
    if (isNaN(Number(age))) {
      Alert.alert("Error", "Age must be a number");
      return;
    }

    setIsAdding(true);

    const payload = {
      name: name.trim(),
      age: Number(age),
      disease: disease.trim(),
    };

    console.log("SENDING PAYLOAD:", payload);

    try {
      const response = await API.post("/patients", payload);
      console.log("ADD RESPONSE:", response.data);

      Alert.alert("Success", "Patient Added Successfully");

      // Clear Inputs
      setName("");
      setAge("");
      setDisease("");

      // Reload List
      loadPatients();
    } catch (error) {
      console.log("ADD ERROR:", error.response?.data || error.message);
      Alert.alert("Error", "Failed to add patient. Check console.");
    } finally {
      setIsAdding(false);
    }
  };

  // 5. DELETE PATIENT
  const handleDelete = async (id) => {
    Alert.alert(
      "Delete Patient",
      "Are you sure you want to remove this patient?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            try {
              await API.delete(`/patients/${id}`);
              // Optimistic Update: Remove from list immediately without reloading
              setPatients((prev) => prev.filter((p) => p.id !== id));
              Alert.alert("Deleted", "Patient removed.");
            } catch (error) {
              console.log("DELETE ERROR:", error);
              Alert.alert("Error", "Could not delete patient.");
            }
          },
        },
      ]
    );
  };

  // 6. REFRESH HANDLER
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    loadPatients();
  }, []);

  // ------------------------------------------------------
  // RENDER
  // ------------------------------------------------------
  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#4F46E5" />
        <Text style={{ marginTop: 10, color: "#666" }}>Loading Patients...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <Header title="Hospital Management" />

        {/* Use FlatList with ListHeaderComponent is better than ScrollView+FlatList */}
        <FlatList
          data={patients}
          // Handle 'id' or '_id'
          keyExtractor={(item) => (item._id || item.id || Math.random()).toString()}
          
          // The Form is placed at the top of the list
          ListHeaderComponent={
            <View style={styles.form}>
              <Text style={styles.formTitle}>Add New Patient</Text>
              
              <TextInput
                placeholder="Full Name"
                value={name}
                onChangeText={setName}
                style={styles.input}
                placeholderTextColor="#999"
                autoCapitalize="words"
              />

              <TextInput
                placeholder="Age"
                value={age}
                onChangeText={setAge}
                keyboardType="number-pad"
                style={styles.input}
                placeholderTextColor="#999"
              />

              <TextInput
                placeholder="Disease / Condition"
                value={disease}
                onChangeText={setDisease}
                style={styles.input}
                placeholderTextColor="#999"
              />

              <TouchableOpacity 
                style={[styles.addBtn, isAdding && styles.addBtnDisabled]} 
                onPress={handleAdd}
                disabled={isAdding}
              >
                <Text style={styles.btnText}>
                  {isAdding ? "Saving..." : "Add Patient"}
                </Text>
              </TouchableOpacity>
            </View>
          }

          contentContainerStyle={{ paddingBottom: 20 }}
          
          refreshControl={
            <RefreshControl 
              refreshing={refreshing} 
              onRefresh={onRefresh} 
              colors={["#4F46E5"]} 
            />
          }
          
          ListEmptyComponent={
            <Text style={styles.emptyText}>No patients found.</Text>
          }
          
          renderItem={({ item }) => (
            <View style={styles.card}>
              <View style={styles.avatar}>
                <Text style={styles.avatarText}>
                  {item.name ? item.name.charAt(0).toUpperCase() : "P"}
                </Text>
              </View>

              <View style={styles.infoContainer}>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.detail}>Age: {item.age}</Text>
                <Text style={styles.detail}>Disease: {item.disease}</Text>
              </View>

              <TouchableOpacity
                style={styles.deleteBtn}
                // Handle both id and _id for delete
                onPress={() => handleDelete(item.id || item._id)}
              >
                <Text style={styles.deleteText}>Delete</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

// ------------------------------------------------------
// STYLES
// ------------------------------------------------------
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4f6ff",
  },

  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  form: {
    backgroundColor: "#fff",
    margin: 10,
    padding: 12,
    borderRadius: 12,
  },

  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 10,
    marginBottom: 10,
    borderRadius: 8,
  },

  addBtn: {
    backgroundColor: "#1e1b4b",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
  },

  btnText: {
    color: "white",
    fontWeight: "bold",
  },

  card: {
    backgroundColor: "#fff",
    margin: 10,
    padding: 12,
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
  },

  avatar: {
    width: 45,
    height: 45,
    borderRadius: 25,
    backgroundColor: "#1e1b4b",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },

  avatarText: {
    color: "white",
    fontSize: 18,
  },

  name: {
    fontSize: 16,
    fontWeight: "bold",
  },

  sub: {
    color: "#555",
  },

  deleteBtn: {
    marginTop: 8,
    backgroundColor: "red",
    padding: 6,
    borderRadius: 6,
    alignItems: "center",
    width: 70,
  },
});
