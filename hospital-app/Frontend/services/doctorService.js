import { API } from "../api";

export const getPatients = async () => {
  return API.get("/patients");
};
