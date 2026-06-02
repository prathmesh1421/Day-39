import AsyncStorage from "@react-native-async-storage/async-storage";

const KEY = "OFFLINE_QUEUE";

export const addQueue = async (req) => {
  const old = JSON.parse(await AsyncStorage.getItem(KEY)) || [];
  old.push(req);
  await AsyncStorage.setItem(KEY, JSON.stringify(old));
};

export const getQueue = async () =>
  JSON.parse(await AsyncStorage.getItem(KEY)) || [];

export const clearQueue = async () =>
  AsyncStorage.removeItem(KEY);
