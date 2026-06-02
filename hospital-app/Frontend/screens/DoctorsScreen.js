
// src/screens/DoctorsScreen.js

import React, { useState } from "react";

import {
  Alert,
  FlatList,
  Image,
  Linking,
  Modal,
  Platform,
  StyleSheet,
  Text,
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

import {
  pickImage,
  takePhoto,
} from "../component/imageUploader";

// ================= DOCTORS DATA =================

const doctors = [
  {
    id: "1",
    name: "Dr. Prathmesh Joshi",
    department: "Cardiology",
    experience: "8 Years",
    phone: "+91 9876543210",
    email: "prathmesh@hospital.com",
    image:
      "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
  },

  {
    id: "2",
    name: "Dr. Akash Patil",
    department: "Neurology",
    experience: "6 Years",
    phone: "+91 9876543211",
    email: "akash@hospital.com",
    image:
      "https://cdn-icons-png.flaticon.com/512/3774/3774299.png",
  },

  {
    id: "3",
    name: "Dr. Priya Sharma",
    department: "Pediatrics",
    experience: "5 Years",
    phone: "+91 9876543212",
    email: "priya@hospital.com",
    image:
      "https://cdn-icons-png.flaticon.com/512/4140/4140048.png",
  },

  {
    id: "4",
    name: "Dr. Sanjay Kulkarni",
    department: "Orthopedics",
    experience: "10 Years",
    phone: "+91 9876543213",
    email: "sanjay@hospital.com",
    image:
      "https://cdn-icons-png.flaticon.com/512/921/921071.png",
  },
];

// ================= DOCTOR CARD =================

const DoctorCard = ({
  item,
  index,
  onUpdateImage,
}) => {
  const animationEnter = FadeIn.delay(
    index * 100
  ).duration(500);

  const translateX = useSharedValue(0);

  // SWIPE GESTURE

  const panGesture = Gesture.Pan()
    .onUpdate((e) => {
      translateX.value =
        e.translationX > 0
          ? e.translationX
          : 0;
    })

    .onEnd(() => {
      if (translateX.value > 80) {
        Linking.openURL(
          `tel:${item.phone}`
        ).catch(() =>
          Alert.alert(
            "Error",
            "Unable to make call"
          )
        );
      }

      translateX.value = withSpring(0);
    });

  // ANIMATION STYLE

  const animatedStyle =
    useAnimatedStyle(() => ({
      transform: [
        {
          translateX:
            translateX.value,
        },
      ],
    }));

  // CARD PRESS

  const handleCardPress = () => {
    Alert.alert(
      item.name,
      `Department: ${item.department}\nExperience: ${item.experience}`,
      [
        {
          text: "Call",
          onPress: () =>
            Linking.openURL(
              `tel:${item.phone}`
            ),
        },

        {
          text: "Cancel",
          style: "cancel",
        },
      ]
    );
  };

  return (
    <GestureDetector gesture={panGesture}>
      <Animated.View
        entering={animationEnter}
        style={styles.cardContainer}
      >
        {/* SWIPE BG */}

        <View style={styles.swipeBackground}>
          <Text style={styles.swipeText}>
            📞 Swipe to Call
          </Text>
        </View>

        {/* MAIN CARD */}

        <Animated.View
          style={[
            styles.card,
            animatedStyle,
          ]}
        >
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={handleCardPress}
            style={styles.cardContent}
          >
            {/* IMAGE */}

            <View
              style={
                imageStyles.imageContainer
              }
            >
              <Image
                source={{
                  uri: item.image,
                }}
                style={
                  imageStyles.image
                }
              />

              <TouchableOpacity
                style={
                  imageStyles.uploadButton
                }
                onPress={() =>
                  onUpdateImage(item.id)
                }
              >
                <Text
                  style={
                    imageStyles.uploadIcon
                  }
                >
                  📷
                </Text>
              </TouchableOpacity>
            </View>

            {/* INFO */}

            <View
              style={styles.infoContainer}
            >
              <Text style={styles.name}>
                {item.name}
              </Text>

              <Text
                style={styles.department}
              >
                🏥 {item.department}
              </Text>

              <Text
                style={styles.experience}
              >
                ⭐ {item.experience}
              </Text>

              <Text style={styles.email}>
                📧 {item.email}
              </Text>
            </View>

            {/* CALL BUTTON */}

            <TouchableOpacity
              style={styles.iconButton}
              onPress={() =>
                Linking.openURL(
                  `tel:${item.phone}`
                )
              }
            >
              <Text style={styles.icon}>
                📞
              </Text>
            </TouchableOpacity>
          </TouchableOpacity>
        </Animated.View>
      </Animated.View>
    </GestureDetector>
  );
};

// ================= MAIN SCREEN =================

export default function DoctorsScreen({
  navigation,
}) {
  const [doctorsList, setDoctorsList] =
    useState(doctors);

  const [selectedDoctorId, setSelectedDoctorId] =
    useState(null);

  const [modalVisible, setModalVisible] =
    useState(false);

  // LOGOUT

  const handleLogout = () => {
    navigation.replace("Login");
  };

  // OPEN MODAL

  const handleUpdateImage = (
    doctorId
  ) => {
    setSelectedDoctorId(doctorId);
    setModalVisible(true);
  };

  // GALLERY IMAGE

  const handleSelectFromGallery =
    async () => {
      setModalVisible(false);

      const result =
        await pickImage();

      if (result.success) {
        updateDoctorImage(
          result.uri
        );
      } else if (
        result.error !== "Cancelled"
      ) {
        Alert.alert(
          "Error",
          result.error
        );
      }
    };

  // CAMERA PHOTO

  const handleTakePhoto =
    async () => {
      setModalVisible(false);

      const result =
        await takePhoto();

      if (result.success) {
        updateDoctorImage(
          result.uri
        );
      } else if (
        result.error !== "Cancelled"
      ) {
        Alert.alert(
          "Error",
          result.error
        );
      }
    };

  // UPDATE IMAGE

  const updateDoctorImage = (
    newImageUri
  ) => {
    setDoctorsList((prev) =>
      prev.map((doctor) =>
        doctor.id ===
        selectedDoctorId
          ? {
              ...doctor,
              image: newImageUri,
            }
          : doctor
      )
    );

    Alert.alert(
      "Success",
      "Doctor image updated!"
    );
  };

  return (
    <View style={styles.container}>
      {/* HEADER */}

      <View style={styles.header}>
        <View>
          <Text style={styles.headerSub}>
            Hospital Management
          </Text>

          <Text style={styles.headerTitle}>
            Doctors
          </Text>
        </View>

        <TouchableOpacity
          style={styles.logoutBtn}
          onPress={handleLogout}
        >
          <Text style={styles.logoutText}>
            Logout
          </Text>
        </TouchableOpacity>
      </View>

      {/* LIST */}

      <FlatList
        data={doctorsList}
        keyExtractor={(item) =>
          item.id
        }
        renderItem={({
          item,
          index,
        }) => (
          <DoctorCard
            item={item}
            index={index}
            onUpdateImage={
              handleUpdateImage
            }
          />
        )}
        contentContainerStyle={
          styles.listContent
        }
        showsVerticalScrollIndicator={
          false
        }
      />

      {/* MODAL */}

      <Modal
        visible={modalVisible}
        transparent
        animationType="slide"
        onRequestClose={() =>
          setModalVisible(false)
        }
      >
        <View style={modalStyles.overlay}>
          <View
            style={
              modalStyles.modalContent
            }
          >
            <Text
              style={
                modalStyles.modalTitle
              }
            >
              Update Doctor Image
            </Text>

            {/* GALLERY */}

            <TouchableOpacity
              style={
                modalStyles.optionButton
              }
              onPress={
                handleSelectFromGallery
              }
            >
              <Text
                style={
                  modalStyles.optionIcon
                }
              >
                🖼️
              </Text>

              <Text
                style={
                  modalStyles.optionText
                }
              >
                Choose from Gallery
              </Text>
            </TouchableOpacity>

            {/* CAMERA */}

            <TouchableOpacity
              style={
                modalStyles.optionButton
              }
              onPress={handleTakePhoto}
            >
              <Text
                style={
                  modalStyles.optionIcon
                }
              >
                📷
              </Text>

              <Text
                style={
                  modalStyles.optionText
                }
              >
                Take Photo
              </Text>
            </TouchableOpacity>

            {/* CANCEL */}

            <TouchableOpacity
              style={[
                modalStyles.optionButton,
                modalStyles.cancelButton,
              ]}
              onPress={() =>
                setModalVisible(false)
              }
            >
              <Text
                style={
                  modalStyles.cancelText
                }
              >
                Cancel
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

// ================= STYLES =================

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#eef2ff",
  },

  // HEADER

  header: {
    backgroundColor: "#1e1b4b",

    paddingTop: 60,
    paddingBottom: 30,
    paddingHorizontal: 22,

    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,

    flexDirection: "row",
    justifyContent:
      "space-between",
    alignItems: "center",
  },

  headerSub: {
    color: "#c7d2fe",
    fontSize: 13,
    marginBottom: 5,
  },

  headerTitle: {
    color: "#ffffff",
    fontSize: 30,
    fontWeight: "bold",
  },

  logoutBtn: {
    backgroundColor: "#312e81",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },

  logoutText: {
    color: "#ffffff",
    fontWeight: "bold",
  },

  // LIST

  listContent: {
    padding: 20,
    paddingBottom: 100,
  },

  // CARD

  cardContainer: {
    marginBottom: 18,
    borderRadius: 24,
    overflow: "hidden",
  },

  swipeBackground: {
    ...StyleSheet.absoluteFillObject,

    backgroundColor: "#22c55e",

    justifyContent: "center",

    paddingLeft: 30,
  },

  swipeText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "bold",
  },

  card: {
    backgroundColor: "#ffffff",
    borderRadius: 24,
    elevation: 5,
  },

  cardContent: {
    flexDirection: "row",
    alignItems: "center",
    padding: 18,
  },

  // INFO

  infoContainer: {
    flex: 1,
    marginLeft: 16,
  },

  name: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1e1b4b",
    marginBottom: 6,
  },

  department: {
    color: "#475569",
    fontSize: 14,
    marginBottom: 4,
  },

  experience: {
    color: "#f59e0b",
    fontSize: 13,
    fontWeight: "600",
    marginBottom: 4,
  },

  email: {
    color: "#6366f1",
    fontSize: 12,
  },

  // CALL BUTTON

  iconButton: {
    width: 50,
    height: 50,
    borderRadius: 25,

    backgroundColor: "#e0f2fe",

    justifyContent: "center",
    alignItems: "center",
  },

  icon: {
    fontSize: 22,
  },
});

// ================= IMAGE STYLES =================

const imageStyles = StyleSheet.create({
  imageContainer: {
    position: "relative",
  },

  image: {
    width: 85,
    height: 85,
    borderRadius: 42,

    borderWidth: 3,
    borderColor: "#c7d2fe",
  },

  uploadButton: {
    position: "absolute",
    bottom: -4,
    right: -4,

    width: 30,
    height: 30,
    borderRadius: 15,

    backgroundColor: "#1e1b4b",

    justifyContent: "center",
    alignItems: "center",

    borderWidth: 2,
    borderColor: "#ffffff",
  },

  uploadIcon: {
    fontSize: 14,
  },
});

// ================= MODAL STYLES =================

const modalStyles = StyleSheet.create({
  overlay: {
    flex: 1,

    backgroundColor:
      "rgba(0,0,0,0.5)",

    justifyContent: "center",
    alignItems: "center",
  },

  modalContent: {
    width: "85%",

    backgroundColor: "#ffffff",

    borderRadius: 24,

    padding: 24,
  },

  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#1e1b4b",

    marginBottom: 20,
    textAlign: "center",
  },

  optionButton: {
    flexDirection: "row",
    alignItems: "center",

    backgroundColor: "#eef2ff",

    padding: 16,
    borderRadius: 16,

    marginBottom: 14,
  },

  optionIcon: {
    fontSize: 24,
    marginRight: 12,
  },

  optionText: {
    fontSize: 16,
    color: "#1e1b4b",
    fontWeight: "600",
  },

  cancelButton: {
    backgroundColor: "#fee2e2",
  },

  cancelText: {
    color: "#dc2626",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    width: "100%",
  },
});
