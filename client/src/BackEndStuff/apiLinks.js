import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as SecureStore from "expo-secure-store";
import jwt_decode from "jwt-decode";
// const baseUrl = "http://192.168.0.113:8000/api/";
const baseUrl = "https://blooddonationru.herokuapp.com/api/";

export const publicRequest = axios.create({
  baseURL: baseUrl,
});

const refreshToken = async () => {
  try {
    const tokens = await SecureStore.getItemAsync("tokens");
    const refreshToken = tokens && JSON.parse(tokens).refreshToken;

    const res = await publicRequest.post("/refresh", { token: refreshToken });

    await SecureStore.setItemAsync("tokens", JSON.stringify(res.data));
    return res.data;
  } catch (err) {
    console.log(err.message);
  }
};

const apiLink = axios.create({
  baseURL: baseUrl,
});

apiLink.interceptors.request.use(
  async (config) => {
    const tokens = await SecureStore.getItemAsync("tokens");
    const accessToken = tokens && JSON.parse(tokens).accessToken;
    let currentDate = new Date();
    const decodedToken = jwt_decode(accessToken);

    if (decodedToken.exp * 1000 < currentDate.getTime()) {
      const data = await refreshToken();
      config.headers["authorization"] = "Bearer " + data?.accessToken;
    } else if (decodedToken.exp * 1000 > currentDate.getTime()) {
      config.headers["authorization"] = "Bearer " + accessToken;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
export default apiLink;
