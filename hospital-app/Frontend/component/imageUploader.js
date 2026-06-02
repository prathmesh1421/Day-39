// src/utils/imageUploader.js
import * as ImagePicker from "expo-image-picker";

// Request camera permissions
export const requestCameraPermission = async () => {
  const { status } = await ImagePicker.requestCameraPermissionsAsync();
  return status === "granted";
};

// Request media library permissions
export const requestMediaPermission = async () => {
  const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
  return status === "granted";
};

// Pick image from gallery
export const pickImage = async () => {
  try {
    // Request permission
    const hasPermission = await requestMediaPermission();
    if (!hasPermission) {
      return { success: false, error: "Permission denied" };
    }

    // Open image picker
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.5,
    });

    if (result.canceled) {
      return { success: false, error: "Cancelled" };
    }

    return {
      success: true,
      uri: result.assets[0].uri,
      width: result.assets[0].width,
      height: result.assets[0].height,
    };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

// Take photo with camera
export const takePhoto = async () => {
  try {
    // Request camera permission
    const hasPermission = await requestCameraPermission();
    if (!hasPermission) {
      return { success: false, error: "Camera permission denied" };
    }

    // Open camera
    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.5,
    });

    if (result.canceled) {
      return { success: false, error: "Cancelled" };
    }

    return {
      success: true,
      uri: result.assets[0].uri,
      width: result.assets[0].width,
      height: result.assets[0].height,
    };
  } catch (error) {
    return { success: false, error: error.message };
  }
};