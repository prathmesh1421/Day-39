import axios from "axios";

export const API = axios.create({
  baseURL: "http://192.168.1.105:5000/api",
  timeout: 10000,
});

export default API;
