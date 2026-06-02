import React, { useEffect } from "react";
import { View, Button } from "react-native";

import {
  registerForNotifications,
  sendLocalNotification,
} from "./NotificationService";

export default function App() {

  useEffect(() => {
    registerForNotifications();
  }, []);

  return (
    <View style={{ marginTop: 100 }}>
      <Button
        title="Send Notification"
        onPress={() =>
          sendLocalNotification(
            "Hello User",
            "Notification Working"
          )
        }
      />
    </View>
  );
}