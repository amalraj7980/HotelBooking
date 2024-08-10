import axios from "axios";
import {getUserInformation } from "./LocalStorage";
import { API_BASE_URL } from "../config";

const httpClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 360000,
});
httpClient.interceptors.request.use(
  async function (config) {
    try {
      const userToken = await getUserInformation("User_Data");
      console.log("UserToken", userToken);
      if (userToken) {
        const userData = JSON.parse(userToken);
        config.headers.Authorization = `Bearer ${userData.access_token}`;
      }
    } catch (error) {
      console.error("Error setting authorization header:", error);
    }

    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);
httpClient.interceptors.response.use(
  function (response) {
    return response;
  },
  async function (error) {
    if (error.response) {
      console.log('Error -->',error);
    } else if (error.message) {
      console.error("Error", error.message);
    }

    return Promise.reject(error);
  }
);

export default httpClient;
