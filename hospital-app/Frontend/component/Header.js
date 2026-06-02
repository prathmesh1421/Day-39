import React from "react";
import {
  View,
  Text,
  StyleSheet,
} from "react-native";

export default function Header({ title }) {
  return (
    <View style={styles.header}>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
   backgroundColor: "#1e1b4b",
    paddingTop: 50,
    paddingBottom: 15,
    alignItems: "center",
  },

  title: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
  },
});
