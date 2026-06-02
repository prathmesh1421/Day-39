// src/navigation/AppNavigator.js

import React from "react";

import * as Linking from "expo-linking";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import LoginScreen from "../screens/LoginScreen";
import DashboardScreen from "../screens/DashboardScreen";
import PatientsScreen from "../screens/PatientsScreen";
import DoctorsScreen from "../screens/DoctorsScreen";
import AppointmentsScreen from "../screens/AppointmentsScreen";
import PharmacyScreen from "../screens/PharmacyScreen";
import ProfileScreen from "../screens/ProfileScreen";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const linking = {
  prefixes: [
    Linking.createURL("/"),
    "hospitalapp://",
  ],

  config: {
    screens: {
      Main: {
        screens: {
          Dashboard: "dashboard",
          Patients: "patients",
          Doctors: "doctors",
          Appointments: "appointments",
          Pharmacy: "pharmacy",
          Profile: "profile",
        },
      },
    },
  },
};

function MainTabs() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen
        name="Dashboard"
        component={DashboardScreen}
      />

      <Tab.Screen
        name="Patients"
        component={PatientsScreen}
      />

      <Tab.Screen
        name="Doctors"
        component={DoctorsScreen}
      />

      <Tab.Screen
        name="Appointments"
        component={AppointmentsScreen}
      />

      <Tab.Screen
        name="Pharmacy"
        component={PharmacyScreen}
      />

      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
      />
    </Tab.Navigator>
  );
}

export default function AppNavigator() {
  return (
    <NavigationContainer linking={linking}>
      <Stack.Navigator>

        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="Main"
          component={MainTabs}
          options={{ headerShown: false }}
        />

      </Stack.Navigator>
    </NavigationContainer>
  );
}
