import { apiError } from "../constant/Strings";
import httpClient from "./httpClient";

export const onApiCall = async ({
  method,
  url,
  data,
  isFileUpload = false,
}) => {
  const constructHeaders = () => {
    if (isFileUpload) {
      return {
        common: { "Content-Type": "multipart/form-data" },
      };
    } else {
      return {
        common: { "Content-Type": "application/json" },
      };
    }
  };
  try {
    const response = await httpClient.request({
      url,
      method,
      data,
      headers: constructHeaders(),
    });

    return {
      data: response?.data,
      status: response?.status,
    };
  } catch (error) {
    console.log(`API error: ${JSON.stringify(error)}`);
    if (error.response) {
      return {
        data: error.response.data,
        status: error.response.status,
      };
    } else {
      return {
        data: "OOPS! Something went wrong, please try again later",
      };
    }
  }
};
