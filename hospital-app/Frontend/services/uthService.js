import { API } from "../api";

export const loginUser = async (data) => {
  return API.post("/auth/login", data);
};
